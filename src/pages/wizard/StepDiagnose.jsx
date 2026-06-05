import { useRef, useState } from 'react'
import { useWizard } from '../../hooks/useWizard'
import { useLanguage } from '../../contexts/LanguageContext'
import { PHENO } from '../../constants/wizard'
import { REF_SOLO, REF_FOLIAR } from '../../data/referencias'
import { HORMONE_STYLE, STAGE_ICON, FASE_LABEL, getHormonesForStage } from '../../constants/hormones'
import { callClaude } from '../../services/api'
import { buildDiagnoseOption01Prompt } from '../../services/prompts'
import { exportToPdf } from '../../utils/exportPdf'
import LaudoView from '../../components/LaudoView'
import Spinner from '../../components/ui/Spinner'

// ─── Mapeamentos ───────────────────────────────────────────────────────────
const FOLIAR_MAP = {
  nFoliar: 'N', pFoliar: 'P', kFoliar: 'K', caFoliar: 'Ca',
  mgFoliar: 'Mg', sFoliar: 'S', bFoliar: 'B', znFoliar: 'Zn',
  cuFoliar: 'Cu', mnFoliar: 'Mn', feFoliar: 'Fe', moFoliar: 'Mo',
}
const SOLO_MAP = {
  ph: 'pH', mo: 'MO', pSolo: 'P', caSolo: 'Ca', mgSolo: 'Mg',
  sSolo: 'S', vSolo: 'V', bSolo: 'B', znSolo: 'Zn',
  cuSolo: 'Cu', mnSolo: 'Mn', feSolo: 'Fe',
}

// ─── Dados do desenho por estádio ──────────────────────────────────────────
const STAGE_DRAW = {
  VE:    { title: 'Emergência',                group: 'seed',         obs: 'Cotilédones acima do solo — hipocótilo ereto',                  physio: 'Mobilização de reservas cotiledonares. Transição heterotrofia → autotrofia.' },
  VC:    { title: 'Cotilédones Expandidos',    group: 'seed',         obs: 'Cotilédones planos — unifólios ainda fechados',                physio: 'Início da fotossíntese. Absorção mineral ativa pelas raízes.' },
  V1:    { title: '1ª Folha Trifoliolada',     group: 'veg_early',    obs: '1ª folha trifoliolada completamente aberta',                   physio: 'Fotossíntese líquida positiva. Crescimento exponencial de raízes.' },
  V2:    { title: '2ª Folha — Engalhamento',  group: 'veg_early',    obs: '2ª trifoliolada aberta — nódulos visíveis nas raízes',         physio: 'FBN iniciando (Bradyrhizobium). Giberelinas ativam elongação.' },
  V3:    { title: '3º Nó',                    group: 'veg_mid',      obs: '3ª trifoliolada aberta — crescimento rápido do caule',         physio: 'Máximo crescimento vegetativo. Alta demanda de N, Zn, B.' },
  V4:    { title: '4º Nó',                    group: 'veg_mid',      obs: '4ª trifoliolada — ramificações laterais iniciando',            physio: 'Definição do número de ramos. Brassinosteroides ativam elongação.' },
  V5:    { title: '5º Nó',                    group: 'veg_late',     obs: '5 folhas — canopeia próxima do fechamento',                    physio: 'Interceptação máxima de luz. IAA controla dominância apical.' },
  V6:    { title: '6º Nó — Pré-florescimento',group: 'veg_late',     obs: '6 folhas — primórdios florais visíveis nas axilas',            physio: 'Fotoperíodo induz florescimento. Alta demanda de B para botões florais.' },
  R1:    { title: 'Início do Florescimento',  group: 'flower_early', obs: 'Primeiro flor aberta em qualquer nó — anteras com pólen',      physio: 'GA + AUX governam embriões. B essencial para elongação do tubo polínico.' },
  R2:    { title: 'Florescimento Pleno',       group: 'flower_full',  obs: 'Flores abertas nos terços médio e superior — estames visíveis', physio: 'Pico de FBN. CK das raízes sustenta vagens. Alta demanda Mo, B, Co.' },
  R3:    { title: 'Formação de Vagens',        group: 'pod_early',    obs: 'Vagens com 5 mm nos 4 nós superiores — pétalas caindo',       physio: 'Transição source/sink para vagens. Alta demanda Ca, K, B.' },
  R4:    { title: 'Vagens Desenvolvidas',      group: 'pod_late',     obs: 'Vagens com 2 cm — sementes iniciando formação',               physio: 'Vagens como drenos dominantes. Início mobilização de N foliar.' },
  R5:    { title: 'Início do Enchimento',      group: 'fill',         obs: 'Grãos 1/4 do tamanho final — acúmulo de MS iniciando',        physio: 'Dreno intenso de N, S, K para grãos. ABA acumula proteínas de reserva.' },
  'R5.1':{ title: 'Enchimento 10%',           group: 'fill',         obs: 'Sementes com ~10% da matéria seca final',                     physio: 'Fluxo máximo no floema. S crítico para aminoácidos sulfurados.' },
  'R5.2':{ title: 'Enchimento 25%',           group: 'fill',         obs: 'Sementes com ~25% MS — vagens mais pesadas',                  physio: 'Acúmulo acelerado de globulinas (glicinina + β-conglicinina).' },
  'R5.3':{ title: 'Enchimento 50%',           group: 'fill',         obs: 'Sementes com 50% do peso final — vagens bem cheias',          physio: 'Pico de acúmulo de proteína e óleo. Jasmonato inicia senescência.' },
  'R5.4':{ title: 'Enchimento 75%',           group: 'fill_late',    obs: 'Sementes com 75% — folhas inferiores amarelando',             physio: 'Senescência foliar ativa. ABA em ascensão. Remobilização de Cl.' },
  'R5.5':{ title: 'Enchimento 87,5%',         group: 'fill_late',    obs: 'Sementes quase no tamanho final — última janela de intervenção', physio: 'Etileno inicia maturação. Última aplicação K/Ca foliar possível.' },
  R6:    { title: 'Granação Máxima',           group: 'mature',       obs: 'Sementes no tamanho máximo — vagens verdes e firmes',         physio: 'Grãos com umidade >70%. Etileno e ABA dominam. Remobilização completa.' },
  R7:    { title: 'Início da Maturação',       group: 'mature',       obs: '1 vagem madura (amarela/marrom) na planta',                   physio: 'Desidratação rápida dos grãos. Senescência foliar quase completa.' },
  R8:    { title: 'Plena Maturação — Colheita',group: 'mature',       obs: '95% das vagens maduras — pronto para colheita mecânica',     physio: 'Umidade ≤ 15%. Lignificação completa do tegumento.' },
}

const GROUP_STYLE = {
  seed:         { bg: 'from-emerald-50 via-green-50 to-teal-50',       badge: 'bg-emerald-700' },
  veg_early:    { bg: 'from-green-100 via-lime-50 to-emerald-50',      badge: 'bg-green-700' },
  veg_mid:      { bg: 'from-lime-100 via-green-50 to-lime-50',         badge: 'bg-green-700' },
  veg_late:     { bg: 'from-lime-100 via-emerald-50 to-green-100',     badge: 'bg-green-700' },
  flower_early: { bg: 'from-pink-50 via-rose-50 to-fuchsia-50',        badge: 'bg-pink-600' },
  flower_full:  { bg: 'from-pink-100 via-fuchsia-50 to-rose-50',       badge: 'bg-pink-600' },
  pod_early:    { bg: 'from-emerald-100 via-green-50 to-teal-50',      badge: 'bg-emerald-700' },
  pod_late:     { bg: 'from-green-100 via-teal-50 to-emerald-100',     badge: 'bg-emerald-700' },
  fill:         { bg: 'from-amber-50 via-yellow-50 to-orange-50',      badge: 'bg-amber-600' },
  fill_late:    { bg: 'from-amber-100 via-orange-50 to-yellow-100',    badge: 'bg-amber-700' },
  mature:       { bg: 'from-yellow-100 via-amber-100 to-orange-100',   badge: 'bg-amber-800' },
}

// ─── Desenho da planta ─────────────────────────────────────────────────────
function PlantDiagram({ group }) {
  const diagrams = {
    seed: (
      <div className="flex flex-col items-center justify-end h-full pb-2 gap-0.5">
        <div className="text-4xl leading-none">🌱</div>
        <div className="w-0.5 h-5 bg-green-700 rounded" />
        <div className="w-16 border-t-2 border-dashed border-amber-800/40" />
        <div className="flex gap-4 text-sm mt-0.5 opacity-50">🌿 🌿</div>
      </div>
    ),
    veg_early: (
      <div className="flex flex-col items-center justify-end h-full pb-2 gap-0.5">
        <div className="flex gap-2 text-base leading-none">🌿 🌿</div>
        <div className="text-3xl leading-none mt-0.5">🌱</div>
        <div className="w-0.5 h-5 bg-green-700 rounded" />
        <div className="w-20 border-t-2 border-dashed border-amber-800/40" />
        <div className="flex gap-3 text-sm mt-0.5 opacity-50">🫚 🫚</div>
      </div>
    ),
    veg_mid: (
      <div className="flex flex-col items-center justify-end h-full pb-2 gap-0.5">
        <div className="flex gap-1.5 text-base leading-none">🌿 🌿 🌿</div>
        <div className="flex gap-2 text-xl leading-none mt-0.5">🌿 🌿</div>
        <div className="w-0.5 h-6 bg-green-700 rounded" />
        <div className="w-20 border-t-2 border-dashed border-amber-800/40" />
        <div className="flex gap-2 text-sm mt-0.5 opacity-50">🫚 🫚 🫚</div>
      </div>
    ),
    veg_late: (
      <div className="flex flex-col items-center justify-end h-full pb-2 gap-0.5">
        <div className="flex gap-1 text-sm leading-none">🌿 🌿 🌿 🌿</div>
        <div className="flex gap-1.5 text-base leading-none mt-0.5">🌿 🌿 🌿</div>
        <div className="flex gap-2 text-xl leading-none mt-0.5">🌿 🌿</div>
        <div className="w-0.5 h-5 bg-green-700 rounded" />
        <div className="w-24 border-t-2 border-dashed border-amber-800/40" />
        <div className="flex gap-1.5 text-sm mt-0.5 opacity-50">🫚 🫚 🫚 🫚</div>
      </div>
    ),
    flower_early: (
      <div className="flex flex-col items-center justify-end h-full pb-2 gap-0.5">
        <div className="flex gap-2 text-base leading-none">🌸 🌿</div>
        <div className="flex gap-1.5 text-lg leading-none mt-0.5">🌿 🌿 🌿</div>
        <div className="flex gap-2 text-xl leading-none mt-0.5">🌿 🌿</div>
        <div className="w-0.5 h-5 bg-green-700 rounded" />
        <div className="w-24 border-t-2 border-dashed border-amber-800/40" />
        <div className="flex gap-1.5 text-sm mt-0.5 opacity-50">🫚 🫚 🫚 🫚</div>
      </div>
    ),
    flower_full: (
      <div className="flex flex-col items-center justify-end h-full pb-2 gap-0.5">
        <div className="flex gap-1.5 text-base leading-none">🌸 🌸 🌸</div>
        <div className="flex gap-1.5 text-lg leading-none mt-0.5">🌿 🌸 🌿</div>
        <div className="flex gap-1.5 text-xl leading-none mt-0.5">🌿 🌿 🌿</div>
        <div className="w-0.5 h-5 bg-green-700 rounded" />
        <div className="w-24 border-t-2 border-dashed border-amber-800/40" />
        <div className="flex gap-1.5 text-sm mt-0.5 opacity-50">🫚 🫚 🫚 🫚</div>
      </div>
    ),
    pod_early: (
      <div className="flex flex-col items-center justify-end h-full pb-2 gap-0.5">
        <div className="flex gap-1.5 text-base leading-none">🫛 🌿 🫛</div>
        <div className="flex gap-1.5 text-lg leading-none mt-0.5">🌿 🌿 🌿</div>
        <div className="flex gap-2 text-xl leading-none mt-0.5">🌿 🌿</div>
        <div className="w-0.5 h-5 bg-green-700 rounded" />
        <div className="w-24 border-t-2 border-dashed border-amber-800/40" />
        <div className="flex gap-1.5 text-sm mt-0.5 opacity-50">🫚 🫚 🫚 🫚</div>
      </div>
    ),
    pod_late: (
      <div className="flex flex-col items-center justify-end h-full pb-2 gap-0.5">
        <div className="flex gap-1.5 text-base leading-none">🫛 🫛 🫛</div>
        <div className="flex gap-1.5 text-lg leading-none mt-0.5">🌿 🫛 🌿</div>
        <div className="flex gap-2 text-xl leading-none mt-0.5">🌿 🌿</div>
        <div className="w-0.5 h-5 bg-green-700 rounded" />
        <div className="w-24 border-t-2 border-dashed border-amber-800/40" />
        <div className="flex gap-1.5 text-sm mt-0.5 opacity-50">🫚 🫚 🫚 🫚</div>
      </div>
    ),
    fill: (
      <div className="flex flex-col items-center justify-end h-full pb-2 gap-0.5">
        <div className="flex gap-1 text-lg leading-none">🫛 🫛 🫛</div>
        <div className="flex gap-1 text-xl leading-none mt-0.5">🫛 🌿 🫛</div>
        <div className="flex gap-1.5 text-lg leading-none mt-0.5">🌿 🌿 🌿</div>
        <div className="w-0.5 h-4 bg-green-700 rounded" />
        <div className="w-24 border-t-2 border-dashed border-amber-800/40" />
        <div className="flex gap-1.5 text-sm mt-0.5 opacity-40">🫚 🫚 🫚</div>
      </div>
    ),
    fill_late: (
      <div className="flex flex-col items-center justify-end h-full pb-2 gap-0.5">
        <div className="flex gap-1 text-xl leading-none">🫛 🫛 🫛</div>
        <div className="flex gap-1 text-lg leading-none mt-0.5">🍂 🫛 🍂</div>
        <div className="flex gap-1.5 text-base leading-none mt-0.5">🍂 🍂 🍂</div>
        <div className="w-0.5 h-4 bg-amber-700 rounded" />
        <div className="w-24 border-t-2 border-dashed border-amber-800/40" />
        <div className="flex gap-2 text-sm mt-0.5 opacity-30">🫚 🫚</div>
      </div>
    ),
    mature: (
      <div className="flex flex-col items-center justify-end h-full pb-2 gap-0.5">
        <div className="flex gap-1 text-xl leading-none">🌾 🌾 🌾</div>
        <div className="flex gap-1 text-lg leading-none mt-0.5">🍂 🌾 🍂</div>
        <div className="flex gap-1.5 text-base leading-none mt-0.5">🍂 🍂 🍂</div>
        <div className="w-0.5 h-4 bg-amber-800 rounded" />
        <div className="w-20 border-t-2 border-dashed border-amber-800/40" />
        <div className="flex gap-3 text-sm mt-0.5 opacity-25">🫚 🫚</div>
      </div>
    ),
  }
  return diagrams[group] || diagrams.veg_mid
}

// ─── PhenoBar ─────────────────────────────────────────────────────────────
function PhenoBar({ estadio, cultura }) {
  const stages = PHENO[cultura] || PHENO.soja
  const selIdx = stages.indexOf(estadio)
  return (
    <div className="overflow-x-auto pb-1 -mx-1">
      <div className="flex items-center gap-1 px-1 min-w-max">
        {stages.map((s, i) => {
          const isSel = s === estadio
          const isPast = i < selIdx
          return (
            <div key={s} className={[
              'rounded-full flex items-center justify-center font-mono font-bold transition-all flex-shrink-0',
              isSel  ? 'w-8 h-8 bg-brand-900 text-white text-[9px] shadow-md ring-2 ring-brand-400 ring-offset-1' : '',
              isPast ? 'w-5 h-5 bg-brand-200 text-brand-900 text-[7px]' : '',
              !isSel && !isPast ? 'w-5 h-5 bg-surface-border text-ink-400 text-[7px]' : '',
            ].join(' ')}>
              {isSel ? s : s.replace('R5.', '').slice(0, 3)}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Stage card com desenho ────────────────────────────────────────────────
function StageCard({ estadio, cultura }) {
  const draw = STAGE_DRAW[estadio]
  const group = draw?.group || 'veg_mid'
  const style = GROUP_STYLE[group] || GROUP_STYLE.veg_mid
  const icon = STAGE_ICON[estadio] || '🌿'
  const fase = FASE_LABEL(estadio)

  return (
    <div className="bg-white border-2 border-brand-900 rounded-card shadow-card overflow-hidden">
      {/* Ilustração da planta */}
      <div className={`relative bg-gradient-to-b ${style.bg} overflow-hidden`} style={{ height: 160 }}>
        {/* Solo */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-amber-900/25 to-transparent" />
        {/* Planta */}
        <div className="absolute inset-0">
          <PlantDiagram group={group} />
        </div>
        {/* Badge estádio */}
        <div className="absolute top-2 left-2">
          <span className={`text-[10px] font-mono font-bold text-white px-2.5 py-0.5 rounded-full ${style.badge}`}>
            {(cultura || 'Soja').toUpperCase()} · Estádio {estadio}
          </span>
        </div>
        {/* Ícone */}
        <div className="absolute top-2 right-2 text-3xl">{icon}</div>
      </div>

      {/* Info */}
      <div className="px-4 py-3 space-y-1.5">
        <div>
          <p className="font-display font-extrabold text-lg text-brand-900">{draw?.title || fase}</p>
          <p className="font-mono text-[10px] text-brand-700 uppercase tracking-wider">{fase}</p>
        </div>
        {draw && (
          <>
            <p className="font-mono text-[11px] text-ink-700 leading-relaxed">
              <span className="text-ink-400">📍 </span>{draw.obs}
            </p>
            <p className="font-mono text-[10px] text-ink-500 leading-relaxed">
              <span>⚗️ </span>{draw.physio}
            </p>
          </>
        )}
      </div>

      {/* PhenoBar */}
      <div className="px-4 pb-3 border-t border-brand-100 pt-2">
        <p className="font-mono text-[9px] text-ink-400 mb-1.5 uppercase tracking-wider">Posição no ciclo</p>
        <PhenoBar estadio={estadio} cultura={cultura} />
      </div>
    </div>
  )
}

// ─── Hormônios (compact) ──────────────────────────────────────────────────
function HormonasCard({ estadio, cultura }) {
  const info = getHormonesForStage(cultura, estadio)
  if (!info?.ativos?.length) return null

  return (
    <div className="bg-white border border-surface-border rounded-card shadow-card overflow-hidden">
      <div className="px-4 py-2.5 border-b border-surface-border bg-surface-muted flex items-center gap-2">
        <span className="text-sm">🧬</span>
        <h3 className="font-display font-bold text-sm text-brand-900">Hormônios ativos — Estádio {estadio}</h3>
      </div>

      {/* Pills */}
      <div className="px-4 pt-3 pb-2 flex flex-wrap gap-1.5">
        {info.ativos.map(h => {
          const style = HORMONE_STYLE[h] || {}
          return (
            <span key={h} className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-mono font-semibold ${style.bg} ${style.border} ${style.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${style.dot}`} />
              {h} <span className="opacity-60">({style.sigla})</span>
            </span>
          )
        })}
      </div>

      {/* Descriptions */}
      <div className="px-3 pb-3 space-y-1.5">
        {info.ativos.map(h => {
          const style = HORMONE_STYLE[h] || {}
          return (
            <div key={h} className={`rounded-lg border px-3 py-2 ${style.bg} ${style.border}`}>
              <p className={`font-mono font-bold text-[10px] uppercase tracking-wide ${style.text}`}>{h} · {style.sigla}</p>
              <p className="font-mono text-[11px] text-ink-600 mt-0.5 leading-relaxed">{info.detalhes?.[h] || ''}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Cell de nutriente ─────────────────────────────────────────────────────
const STATUS_STYLE = {
  def:  { cell: 'bg-red-50 border-red-200',    name: 'text-red-800',    badge: 'bg-red-100 text-red-700 border-red-300',    icon: '↓', lbl: 'Abaixo',  val: 'text-red-700' },
  alto: { cell: 'bg-amber-50 border-amber-200', name: 'text-amber-800', badge: 'bg-amber-100 text-amber-700 border-amber-300', icon: '↑', lbl: 'Acima', val: 'text-amber-700' },
  ok:   { cell: 'bg-green-50 border-green-200', name: 'text-green-800', badge: 'bg-green-100 text-green-700 border-green-300', icon: '✓', lbl: 'OK',     val: 'text-green-700' },
  nd:   { cell: 'bg-gray-50 border-gray-200',   name: 'text-gray-500',  badge: 'bg-gray-100 text-gray-400 border-gray-200',    icon: '—', lbl: 'Sem dado', val: 'text-gray-400' },
}

function NutrientCell({ nut, val, ref, status }) {
  const s = STATUS_STYLE[status] || STATUS_STYLE.nd
  return (
    <div className={`rounded-lg border px-3 py-2 ${s.cell}`}>
      <div className="flex items-start justify-between gap-1">
        <span className={`font-mono font-extrabold text-base leading-none ${s.name}`}>{nut}</span>
        <span className={`text-[9px] font-mono font-semibold border rounded-full px-1.5 py-0.5 flex-shrink-0 ${s.badge}`}>
          {s.icon} {s.lbl}
        </span>
      </div>
      {status !== 'nd' ? (
        <>
          <p className={`font-mono text-xs font-semibold ${s.val} mt-1`}>{val} <span className="font-normal opacity-70">{ref?.unit}</span></p>
          <p className="font-mono text-[9px] text-ink-400 mt-0.5">ref {ref?.min}–{ref?.max}</p>
        </>
      ) : (
        <p className="font-mono text-[9px] text-ink-400 mt-1">Não informado</p>
      )}
    </div>
  )
}

// ─── Card de análise nutricional (só excessos/deficiências) ───────────────
function NutrientCard({ title, icon, nuts }) {
  const issues  = nuts.filter(n => n.status === 'def' || n.status === 'alto')
  const hasData = nuts.some(n => n.status !== 'nd')
  const defCount  = nuts.filter(n => n.status === 'def').length
  const altoCount = nuts.filter(n => n.status === 'alto').length

  return (
    <div className="bg-white border border-surface-border rounded-card shadow-card overflow-hidden">
      <div className="px-4 py-2.5 border-b border-surface-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-base">{icon}</span>
          <h3 className="font-display font-bold text-sm text-brand-900">{title}</h3>
        </div>
        <div className="flex gap-1">
          {defCount  > 0 && <span className="text-[9px] font-mono bg-red-100 text-red-700 border border-red-200 rounded-full px-2 py-0.5">{defCount} ↓</span>}
          {altoCount > 0 && <span className="text-[9px] font-mono bg-amber-100 text-amber-700 border border-amber-200 rounded-full px-2 py-0.5">{altoCount} ↑</span>}
          {hasData && issues.length === 0 && <span className="text-[9px] font-mono bg-green-100 text-green-700 border border-green-200 rounded-full px-2 py-0.5">✓ Tudo OK</span>}
        </div>
      </div>

      {!hasData && (
        <p className="font-mono text-[11px] text-ink-400 italic px-4 py-3">Sem dados inseridos — etapa opcional.</p>
      )}
      {hasData && issues.length === 0 && (
        <div className="flex items-center gap-2 px-4 py-3">
          <span>✅</span>
          <p className="font-mono text-[11px] text-green-700">Todos os nutrientes dentro da faixa adequada.</p>
        </div>
      )}
      {issues.length > 0 && (
        <div className="p-3 grid grid-cols-2 gap-2">
          {issues.map(n => <NutrientCell key={n.nut} {...n} />)}
        </div>
      )}
    </div>
  )
}

// ─── Diagnose IA ───────────────────────────────────────────────────────────
function AiDiagnoseCard({ data, t }) {
  const [loading, setLoading] = useState(false)
  const [result,  setResult]  = useState(null)
  const [error,   setError]   = useState(null)

  const temDados = !!(data.fotoB64 || Object.keys(FOLIAR_MAP).some(k => data[k]) || Object.keys(SOLO_MAP).some(k => data[k]))

  async function run() {
    setError(null)
    setLoading(true)
    try {
      const prompt = await buildDiagnoseOption01Prompt(data, t.promptLang)
      const html = await callClaude(prompt, data.fotoB64 || null, 5000)
      if (!html?.trim()) throw new Error('Resposta vazia. Tente novamente.')
      setResult(html)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  if (result) {
    return (
      <div className="space-y-2">
        <LaudoView
          title="🔬 Diagnose IA — Deficiências e Toxidez"
          subtitle={`${data.prodNome} · ${(data.cultura || '').toUpperCase()} · Estádio ${data.estadio}`}
          badge="📚 Marschner (2012) · Embrapa · Base de conhecimento"
          html={result}
          showPrint
        />
        <button onClick={() => setResult(null)} className="font-mono text-[11px] text-brand-700 underline">
          ↩ Nova análise IA
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white border border-surface-border rounded-card shadow-card p-4 space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-base">🤖</span>
        <div>
          <h3 className="font-display font-bold text-sm text-brand-900">Diagnose por IA</h3>
          <p className="font-mono text-[10px] text-ink-500">
            {data.fotoB64
              ? 'Analisa foto + dados de solo e foliar para identificar deficiências'
              : 'Analisa dados de solo e foliar com base no material de apoio'}
          </p>
        </div>
      </div>

      {error && (
        <p className="font-mono text-xs text-danger-600 bg-red-50 border border-red-200 rounded px-3 py-2">⚠️ {error}</p>
      )}

      {loading ? (
        <div className="flex items-center gap-3 p-3 bg-brand-50 rounded-lg border border-brand-200">
          <Spinner size="sm" />
          <div>
            <p className="font-mono text-xs font-semibold text-brand-900">Analisando dados...</p>
            <p className="font-mono text-[10px] text-ink-400">Consultando base de conhecimento</p>
          </div>
        </div>
      ) : (
        <button
          onClick={run}
          disabled={!temDados}
          className="w-full py-2.5 px-4 bg-brand-900 text-white rounded-lg font-mono text-xs font-semibold hover:bg-brand-700 disabled:bg-ink-300 disabled:cursor-not-allowed transition-colors"
        >
          🔍 Analisar com IA
          {!temDados && <span className="ml-2 opacity-70">(insira dados nas etapas anteriores)</span>}
        </button>
      )}
    </div>
  )
}

// ─── Cálculo de todos os nutrientes ───────────────────────────────────────
function calcNutrientsFoliar(data, cultura) {
  const cult = (cultura || 'soja').toLowerCase().replace('ã', 'a').replace('é', 'e')
  const refFol = REF_FOLIAR[cult] || REF_FOLIAR.soja
  return Object.entries(FOLIAR_MAP).map(([field, nut]) => {
    const val = parseFloat(data[field])
    if (isNaN(val)) return { nut, val: null, ref: refFol[nut], status: 'nd' }
    const ref = refFol[nut]
    if (!ref) return { nut, val, ref: null, status: 'nd' }
    const status = val < ref.min ? 'def' : val > ref.max ? 'alto' : 'ok'
    return { nut, val, ref, status }
  })
}

function calcNutrientsSolo(data, cultura) {
  const cult = (cultura || 'soja').toLowerCase().replace('ã', 'a').replace('é', 'e')
  const refSol = REF_SOLO[cult] || REF_SOLO.soja
  return Object.entries(SOLO_MAP).map(([field, nut]) => {
    const val = parseFloat(data[field])
    if (isNaN(val)) return { nut, val: null, ref: refSol[nut], status: 'nd' }
    const ref = refSol[nut]
    if (!ref) return { nut, val, ref: null, status: 'nd' }
    const cmpVal = field === 'kSolo' ? val * 391 : val
    const status = cmpVal < ref.min ? 'def' : cmpVal > ref.max ? 'alto' : 'ok'
    return { nut, val, ref, status }
  })
}

// ─── Componente principal ──────────────────────────────────────────────────
export default function StepDiagnose() {
  const { data } = useWizard()
  const { t }   = useLanguage()
  const { estadio, cultura } = data
  const contentRef  = useRef(null)
  const [pdfLoading, setPdfLoading] = useState(false)

  const foliarNuts = calcNutrientsFoliar(data, cultura)
  const soloNuts   = calcNutrientsSolo(data, cultura)

  async function handleExportPdf() {
    if (!contentRef.current) return
    setPdfLoading(true)
    try {
      await exportToPdf(
        contentRef.current,
        `diagnose-${(data.cultura || 'soja').toLowerCase()}-${data.estadio || 'VE'}`
      )
    } finally {
      setPdfLoading(false)
    }
  }

  return (
    <div className="space-y-3">
      <div ref={contentRef} className="space-y-3">
        <div>
          <h2 className="font-display font-bold text-xl text-brand-900">🔬 Diagnose Fisiológica</h2>
          <p className="font-mono text-[11px] text-ink-400 mt-0.5">{FASE_LABEL(estadio)}</p>
        </div>

        <StageCard estadio={estadio} cultura={cultura} />
        <HormonasCard estadio={estadio} cultura={cultura} />
        <NutrientCard title="Análise Foliar" icon="🌿" nuts={foliarNuts} />
        <NutrientCard title="Análise de Solo" icon="🌍" nuts={soloNuts} />
        <AiDiagnoseCard data={data} t={t} />
      </div>

      <button
        onClick={handleExportPdf}
        disabled={pdfLoading}
        className="w-full py-2.5 px-4 bg-brand-900 text-white rounded-lg font-mono text-xs font-semibold hover:bg-brand-700 disabled:bg-ink-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        {pdfLoading ? '⏳ Gerando PDF...' : '📄 Exportar Diagnose em PDF'}
      </button>
    </div>
  )
}
