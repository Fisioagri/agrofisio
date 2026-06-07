import { useRef, useState } from 'react'
import { useWizard } from '../../hooks/useWizard'
import { useLanguage } from '../../contexts/LanguageContext'
import { PHENO } from '../../constants/wizard'
import { REF_SOLO, REF_FOLIAR } from '../../data/referencias'
import { HORMONE_STYLE, STAGE_ICON, FASE_LABEL, getHormonesForStage } from '../../constants/hormones'
import { callClaude } from '../../services/api'
import { buildDiagnoseOption01Prompt } from '../../services/prompts'
import { exportToPdf } from '../../utils/exportPdf'
import { calcScore } from '../../utils/calcScore'
import ScoreCard from '../../components/ScoreCard'
import PlantSVG from '../../components/PlantSVG'
import LaudoView from '../../components/LaudoView'
import Spinner from '../../components/ui/Spinner'
import AgroEngineReport from '../../components/AgroEngineReport'

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

// ─── Dados do desenho por estádio — MILHO ──────────────────────────────────
const STAGE_DRAW_MILHO = {
  VE:  { title: 'Emergência',                   group: 'seed',         obs: 'Coleóptilo rompe o solo; mesocótilo posicionou a coroa a ~2 cm de profundidade; raízes nodais iniciando',         physio: 'Giberelina elongua o coleóptilo; Auxina orienta a radícula; Citocinina ativa raízes nodais. P e Zn críticos.' },
  V1:  { title: 'V1 — 1ª Folha com Colar',     group: 'veg_early',    obs: '1ª folha com COLAR visível (dobra entre bainha e lâmina); folha com ponta arredondada (identificador único de V1)',  physio: 'Raízes nodais dominam absorção. P máxima demanda por unidade de biomassa. Zn para prevenção de mancha branca.' },
  V2:  { title: 'V2 — Alerta: Mancha Branca',   group: 'veg_early',    obs: '2ª folha com colar visível; RISCO DE MANCHA BRANCA (faixas esbranquiçadas paralelas à nervura) se Zn baixo',       physio: 'Mancha branca = deficiência de Zn (IAA via triptofano sintase comprometido). Corrigir Zn imediatamente.' },
  V3:  { title: 'V3 — Crescimento Inicial',     group: 'veg_early',    obs: '3ª folha com colar; ponto de crescimento ~2 cm abaixo do solo; protegido de geada e granizo',                       physio: 'Demanda de N cresce. Milho NÃO faz FBN — todo N vem do solo. P para energia celular.' },
  V4:  { title: 'V4 — Crescimento Acelerado',   group: 'veg_mid',      obs: '4ª folha com colar; raiz seminal completamente inativa; raízes escora (brace roots) começam a aparecer',             physio: 'K absorção começa a crescer rumo ao pico em V6-VT. Zn: última chance eficiente de correção foliar.' },
  V5:  { title: 'V5 — Pré-Fase Rápida',        group: 'veg_mid',      obs: '5ª folha com colar; raízes escora visíveis; ponto de crescimento prestes a emergir acima do solo em ~V6',             physio: 'Todas as folhas e espigas potenciais foram iniciadas. N disponível no solo deve ser garantido antes de V6.' },
  V6:  { title: 'V6 — Ponto de Crescimento Acima do Solo',group:'veg_mid', obs: '6ª folha com colar; PONTO DE CRESCIMENTO ACIMA DO SOLO — planta vulnerável a granizo, geada e herbicidas', physio: '>60% do N total do ciclo é absorvido entre V6-R1. Topdress de N deve estar no solo AGORA. K absorção escala.' },
  V7:  { title: 'V7 — Definição de Fileiras',   group: 'veg_late',     obs: '7ª folha com colar; número de FILEIRAS DA ESPIGA definido em V7 (sempre par: 14-16-18); internós em elongação rápida', physio: 'ESTÁDIO MAIS CRÍTICO para rendimento: estresse de N, K, seca ou calor aqui = menos fileiras permanentemente.' },
  V8:  { title: 'V8 — Grãos por Fileira',       group: 'veg_late',     obs: '8ª folha com colar; início da determinação de grãos por fileira; espiga primária visível em dissecção',               physio: 'Citocinina define grãos por fileira. N e K adequados = mais grãos. B preventivo antes de VT é essencial.' },
  V9:  { title: 'V9 — Espiga Primária Visível', group: 'veg_late',     obs: '9ª folha com colar; espiga primária de ~5-7 cm visível em dissecção; máxima taxa de crescimento se aproxima',          physio: 'N absorção em pico. Seca em V9-V12 = maior impacto em produtividade. Mg para fotossíntese C4.' },
  V10: { title: 'V10 — Crescimento Máximo',     group: 'veg_late',     obs: '10ª folha com colar; planta pode crescer 8-12 cm/dia; lignificação de internós basais iniciando',                       physio: 'N absorção máxima. B+Ca+Zn foliar deve ser aplicado antes de VT. K para qualidade do colmo.' },
  V11: { title: 'V11 — Fase Mais Rápida',       group: 'veg_late',     obs: '11ª folha com colar; internós medianos em elongação máxima; pendão em formação interna; colmo cresce visivelmente', physio: 'B CRÍTICO PREVENTIVO — pendão em formação; deficiência agora = falha de polinização em VT. Aplique B+Ca+Zn.' },
  V12: { title: 'V12 — Primórdios Florais',     group: 'veg_late',     obs: '12ª folha com colar; primórdios florais femininos visíveis na espiga em dissecção; elongação do pedúnculo da espiga inicia', physio: 'Número final de grãos por fileira próximo do definitivo. B+Ca+Zn foliar obrigatório antes de VT.' },
  V13: { title: 'V13 — Comprimento da Espiga',  group: 'veg_late',     obs: '13ª folha com colar; comprimento final da espiga sendo determinado; silk (estigmas) em desenvolvimento interno',        physio: 'Última chance de aplicação foliar de B+Ca+Zn antes de VT. N para desenvolvimento do silk.' },
  V14: { title: 'V14 — Pré-Pendoamento',        group: 'veg_late',     obs: '14ª folha com colar; pendão quase completo internamente; silk prestes a emergir; elongação dos últimos internós',      physio: 'Seca aqui = silk atrasado = NICK comprometido (assincronia com liberação de pólen). Irrigar se necessário.' },
  V15: { title: 'V15 — Pendão Emergindo',       group: 'veg_late',     obs: '15ª folha com colar; pendão emergindo ou já emergido; início da liberação de pólen em 1-3 dias',                        physio: 'Temperatura > 35°C inibe germinação do grão de pólen (viável por apenas ~20 min). Irrigar.' },
  V16: { title: 'V16 — Pendão Pleno / Silk',    group: 'flower_early', obs: '16+ folhas; pendão completamente expandido; silk emergindo pela palha; plena altura da planta atingida',                physio: 'ESTA SEMANA = MAIS CRÍTICA DO CICLO. Silk receptivo por 3-5 dias. Seca = silk desseca = grain gaps.' },
  VT:  { title: 'VT — Pendoamento',             group: 'flower_early', obs: 'Último ramo do pendão emergido; pico de liberação de pólen = meio da manhã; >1 milhão grãos pólen/planta; vida do pólen = 20 min', physio: 'B para tubo polínico. Ca para reconhecimento no silk. Temperatura > 35°C = falha de polinização.' },
  R1:  { title: 'R1 — Silking — Fertilização',  group: 'flower_full',  obs: 'Silk emergem ao longo de 3-5 dias (base → ponta); grão de pólen → tubo polínico em 24h → fertiliza óvulo → grain set', physio: '2 semanas após R1 = MÁXIMA SENSIBILIDADE a aborto. B+Ca essenciais. Irrigação prioritária.' },
  R2:  { title: 'R2 — Blister (85% umidade)',   group: 'pod_early',    obs: 'Grãos com aspecto de bolha; 85% umidade; endosperma claro; comprimento máximo da espiga atingido',                     physio: 'K co-transportado com sacarose. N para zeínas do endosperma. Aborto ainda possível.' },
  R3:  { title: 'R3 — Milk (80% umidade)',      group: 'pod_late',     obs: 'Fluido leitoso branco (amido em suspensão); 80% umidade; cor final do grão visível; embrião distinguível',              physio: 'K máxima demanda. S para zeínas (proteínas sulfuradas do milho). Proteger área foliar!' },
  R4:  { title: 'R4 — Dough (70% umidade)',     group: 'fill',         obs: 'Consistência pastosa; 70% umidade; ~50% do peso seco final; cor do sabugo definida; palha começa a escurecer',           physio: 'ABA dominant — acúmulo de amido. K e N para qualidade final do grão. Estresse = grão mais leve.' },
  R5:  { title: 'R5 — Dent — Milk Line',        group: 'fill',         obs: 'Dent visível; milk line avança (coroa → base); R5.5 = 90% MS final; 35-55% umidade; folhas inferiores amarelando',       physio: 'Maturação irreversível. Milk line = indicador de maturidade. Colheita: aguardar black layer.' },
  R6:  { title: 'R6 — Maturidade Fisiológica',  group: 'mature',       obs: 'Camada negra (black layer) na ponta do grão; milk line na base; ~35% umidade; peso seco máximo; senescência completa',   physio: 'Black layer = barreira impermeável. Peso de grão definitivo. Colheita ideal com 15-18% umidade.' },
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

// PlantDiagram agora usa SVG vetorial via PlantSVG component

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
  const draw = cultura === 'milho'
    ? (STAGE_DRAW_MILHO[estadio] || STAGE_DRAW[estadio])
    : STAGE_DRAW[estadio]
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
        {/* Planta — ilustração vetorial SVG */}
        <div className="absolute inset-0 p-2">
          <PlantSVG group={group} />
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

const CTC_RANGES_SOLO = { caSolo: [45, 70], mgSolo: [15, 25], kSolo: [3, 6] }

function calcNutrientsSolo(data, cultura) {
  const cult = (cultura || 'soja').toLowerCase().replace('ã', 'a').replace('é', 'e')
  const refSol = REF_SOLO[cult] || REF_SOLO.soja
  const ctc    = parseFloat(data.ctcSolo) || 0

  return Object.entries(SOLO_MAP).map(([field, nut]) => {
    const val = parseFloat(data[field])
    if (isNaN(val)) return { nut, val: null, ref: refSol[nut], status: 'nd' }
    const ref = refSol[nut]
    if (!ref) return { nut, val, ref: null, status: 'nd' }

    let status
    if (ctc > 0 && CTC_RANGES_SOLO[field]) {
      const pct = val / ctc * 100
      const [minPct, maxPct] = CTC_RANGES_SOLO[field]
      status = pct < minPct ? 'def' : pct > maxPct ? 'alto' : 'ok'
    } else {
      status = val < ref.min ? 'def' : val > ref.max ? 'alto' : 'ok'
    }
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
  const [diagnoseTab, setDiagnoseTab] = useState('engine') // 'engine' | 'ai'

  const foliarNuts = calcNutrientsFoliar(data, cultura)
  const soloNuts   = calcNutrientsSolo(data, cultura)

  const clima = {
    diasSemChuva: parseFloat(data.diasSemChuva) || 0,
    tempMax: parseFloat(data.tempMax) || 28,
  }

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

        {/* Score AgroFísio */}
        <ScoreCard foliarNuts={foliarNuts} soloNuts={soloNuts} data={data} />

        <StageCard estadio={estadio} cultura={cultura} />
        <HormonasCard estadio={estadio} cultura={cultura} />
        <NutrientCard title="Análise Foliar" icon="🌿" nuts={foliarNuts} />
        <NutrientCard title="Análise de Solo" icon="🌍" nuts={soloNuts} />

        {/* Tabs: Motor de IA Offline | IA Claude (online) */}
        <div className="bg-white border border-surface-border rounded-card shadow-card overflow-hidden">
          {/* Tab switcher */}
          <div className="flex border-b border-surface-border">
            <button
              onClick={() => setDiagnoseTab('engine')}
              className={`flex-1 py-2.5 px-3 font-mono text-[11px] font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                diagnoseTab === 'engine'
                  ? 'bg-brand-900 text-white'
                  : 'bg-surface-muted text-ink-500 hover:bg-surface-bg'
              }`}
            >
              🧠 Motor Offline
              <span className={`text-[8px] px-1.5 py-0.5 rounded-full font-bold ${diagnoseTab === 'engine' ? 'bg-white/20 text-white' : 'bg-green-100 text-green-700'}`}>
                SEMPRE DISPONÍVEL
              </span>
            </button>
            <button
              onClick={() => setDiagnoseTab('ai')}
              className={`flex-1 py-2.5 px-3 font-mono text-[11px] font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                diagnoseTab === 'ai'
                  ? 'bg-brand-900 text-white'
                  : 'bg-surface-muted text-ink-500 hover:bg-surface-bg'
              }`}
            >
              🤖 IA Claude
              <span className={`text-[8px] px-1.5 py-0.5 rounded-full font-bold ${diagnoseTab === 'ai' ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-700'}`}>
                ONLINE
              </span>
            </button>
          </div>

          {/* Conteúdo da tab */}
          <div className="p-3">
            {diagnoseTab === 'engine' ? (
              <AgroEngineReport
                data={data}
                cultura={cultura}
                estadio={estadio}
                clima={clima}
              />
            ) : (
              <AiDiagnoseCard data={data} t={t} />
            )}
          </div>
        </div>
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
