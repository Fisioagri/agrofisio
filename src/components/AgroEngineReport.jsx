/**
 * AgroEngineReport — Relatório técnico do Motor de IA Offline
 * Exibe os 9 campos do diagnóstico estruturado do AgroEngine
 */
import { useMemo, useState } from 'react'
import { runDiagnostic } from '../engine/agroEngine'
import { NUTRIENT_PROFILES } from '../engine/knowledgeBase'

const GRAVIDADE_COR = {
  severo:   'bg-red-100 text-red-700 border-red-200',
  moderado: 'bg-orange-100 text-orange-700 border-orange-200',
  leve:     'bg-yellow-100 text-yellow-700 border-yellow-200',
}
const GRAVIDADE_DOT = {
  severo:   'bg-red-500',
  moderado: 'bg-orange-500',
  leve:     'bg-yellow-500',
}
const STATUS_LABEL = { def: 'Deficiente', ok: 'Adequado', alto: 'Elevado', toxico: 'Tóxico', nd: '—' }
const STATUS_COR   = {
  def:   'text-red-700 bg-red-50 border-red-200',
  ok:    'text-green-700 bg-green-50 border-green-200',
  alto:  'text-amber-700 bg-amber-50 border-amber-200',
  toxico:'text-purple-700 bg-purple-50 border-purple-200',
  nd:    'text-ink-400 bg-surface-muted border-surface-border',
}

function Badge({ label, color }) {
  return <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold border ${color}`}>{label}</span>
}

function Section({ n, title, subtitle, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="bg-white border border-surface-border rounded-card shadow-card overflow-hidden pdf-no-break">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-surface-muted transition-colors text-left"
      >
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-full bg-brand-900 text-white flex items-center justify-center font-mono text-[10px] font-bold flex-shrink-0">{n}</span>
          <div>
            <p className="font-display font-bold text-sm text-brand-900">{title}</p>
            {subtitle && <p className="font-mono text-[9px] text-ink-400">{subtitle}</p>}
          </div>
        </div>
        <span className={`font-mono text-ink-400 text-sm transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>
      {open && <div className="border-t border-surface-border px-4 py-3 space-y-2">{children}</div>}
    </div>
  )
}

function ScoreRing({ score, label, cor, corClass }) {
  const colorMap = {
    green: '#16a34a', lime: '#65a30d', amber: '#d97706', orange: '#ea580c', red: '#dc2626'
  }
  const c = colorMap[corClass] || '#d97706'
  const r = 38, circ = 2 * Math.PI * r
  const progress = circ - (score / 100) * circ
  return (
    <div className="flex items-center gap-4">
      <div className="relative w-24 h-24 flex-shrink-0">
        <svg width="96" height="96" viewBox="0 0 96 96">
          <circle cx="48" cy="48" r={r} fill="none" stroke="#e5e7eb" strokeWidth="8" />
          <circle cx="48" cy="48" r={r} fill="none" stroke={c} strokeWidth="8"
            strokeDasharray={circ} strokeDashoffset={progress}
            strokeLinecap="round" transform="rotate(-90 48 48)" style={{ transition: 'stroke-dashoffset 0.6s ease' }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display font-extrabold text-xl" style={{ color: c }}>{score}</span>
          <span className="font-mono text-[8px] text-ink-400">/ 100</span>
        </div>
      </div>
      <div>
        <p className="font-display font-bold text-base" style={{ color: c }}>{label}</p>
        <p className="font-mono text-[10px] text-ink-500 mt-0.5">Score de sanidade nutricional</p>
        <p className="font-mono text-[9px] text-ink-400 mt-1">Baseado em análise foliar + solo<br />Fontes: Marschner (2012), Embrapa (2013)</p>
      </div>
    </div>
  )
}

export default function AgroEngineReport({ data, cultura, estadio, clima }) {
  const result = useMemo(() => {
    if (!data) return null
    try {
      return runDiagnostic({ data, cultura, estadio, clima })
    } catch (e) {
      console.error('AgroEngine error:', e)
      return null
    }
  }, [data, cultura, estadio, clima])

  if (!result) return null

  const defs   = result.diagnosticos.filter(d => d.status === 'def')
  const altos  = result.diagnosticos.filter(d => d.status === 'alto' || d.status === 'toxico')
  const temDados = defs.length > 0 || altos.length > 0

  const nutsFoliar = result.foliarNuts.filter(n => n.status !== 'nd')
  const nutsSolo   = result.soloNuts.filter(n => n.status !== 'nd')

  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="bg-brand-900 rounded-card px-4 py-3 flex items-center justify-between">
        <div>
          <p className="font-display font-extrabold text-white text-sm">🧠 AgroEngine · IA Offline</p>
          <p className="font-mono text-[9px] text-brand-300 mt-0.5">
            Motor de diagnóstico agronômico · Offline · v1.0
          </p>
        </div>
        <div className="text-right">
          <p className="font-mono text-[9px] text-brand-300">{(cultura || 'Soja').toUpperCase()} · {estadio || '—'}</p>
          <p className="font-mono text-[8px] text-brand-400 mt-0.5">Marschner · Taiz & Zeiger · Embrapa</p>
        </div>
      </div>

      {/* Score */}
      <div className="bg-white border border-surface-border rounded-card shadow-card p-4">
        <ScoreRing score={result.score} label={result.label} cor={result.cor} corClass={result.corClass} />
        {result.deducoes.length > 0 && (
          <div className="mt-3 space-y-1">
            {result.deducoes.slice(0, 5).map((d, i) => (
              <div key={i} className="flex items-center justify-between text-[9px] font-mono">
                <span className="text-ink-500">{d.motivo}</span>
                <span className="text-red-600 font-semibold">{d.pontos} pts</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Alerta principal */}
      {result.resumo.alertaPrincipal && (
        <div className={`px-4 py-3 rounded-card border font-mono text-[11px] ${result.score < 55 ? 'bg-red-50 border-red-200 text-red-700' : result.score < 70 ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-green-50 border-green-200 text-green-700'}`}>
          ⚠️ {result.resumo.alertaPrincipal}
        </div>
      )}

      {/* 1. Diagnóstico Principal */}
      <Section n="1" title="Diagnóstico Principal" subtitle={`${defs.length} deficiência(s) · ${altos.length} excesso(s)`} defaultOpen={temDados}>
        {!temDados && (
          <p className="font-mono text-[11px] text-green-700 py-1">✅ Todos os nutrientes dentro da faixa adequada de referência.</p>
        )}
        {defs.map(d => (
          <div key={d.nut + d.fonte} className="flex items-start gap-2.5 py-2 border-b border-surface-border last:border-0">
            <span className={`flex-shrink-0 w-8 h-8 rounded-lg border flex items-center justify-center font-mono font-bold text-xs ${GRAVIDADE_COR[d.grav] || 'bg-red-100 text-red-700 border-red-200'}`}>{d.nut}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <Badge label={`Def. ${d.grav || ''}`} color={GRAVIDADE_COR[d.grav] || ''} />
                <Badge label={d.fonte} color="text-ink-600 bg-surface-muted border-surface-border" />
                {d.estadioPeso >= 9 && <Badge label="Crítico neste estádio" color="text-red-700 bg-red-100 border-red-200" />}
              </div>
              <p className="font-mono text-[10px] text-ink-600 mt-1">
                {d.ref && `Faixa adequada: ${d.ref.min}–${d.ref.max} ${d.ref.unit}`}
                {d.valor !== null && ` · Valor: ${d.valor}`}
              </p>
            </div>
          </div>
        ))}
        {altos.map(d => (
          <div key={d.nut + d.fonte} className="flex items-start gap-2.5 py-2 border-b border-surface-border last:border-0">
            <span className={`flex-shrink-0 w-8 h-8 rounded-lg border flex items-center justify-center font-mono font-bold text-xs ${d.status === 'toxico' ? 'bg-purple-100 text-purple-700 border-purple-200' : 'bg-amber-100 text-amber-700 border-amber-200'}`}>{d.nut}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <Badge label={d.status === 'toxico' ? 'Tóxico' : `Elevado`} color={STATUS_COR[d.status]} />
                <Badge label={d.fonte} color="text-ink-600 bg-surface-muted border-surface-border" />
              </div>
              <p className="font-mono text-[10px] text-ink-600 mt-1">Valor: {d.valor} · Max ref: {d.ref?.max} {d.ref?.unit}</p>
            </div>
          </div>
        ))}
      </Section>

      {/* 2. Evidências Analíticas */}
      <Section n="2" title="Evidências Encontradas" subtitle="Dados de análise foliar e solo">
        {nutsFoliar.length > 0 && (
          <>
            <p className="font-mono text-[9px] text-ink-500 uppercase tracking-wider">Análise Foliar</p>
            <div className="grid grid-cols-3 gap-1.5">
              {nutsFoliar.map(n => (
                <div key={n.nut} className={`px-2 py-1.5 rounded border text-center ${STATUS_COR[n.status]}`}>
                  <p className="font-mono font-bold text-[11px]">{n.nut}</p>
                  <p className="font-mono text-[8px] mt-0.5">{n.valor ?? '—'}</p>
                  <p className="font-mono text-[8px]">{STATUS_LABEL[n.status]}</p>
                </div>
              ))}
            </div>
          </>
        )}
        {nutsSolo.length > 0 && (
          <>
            <p className="font-mono text-[9px] text-ink-500 uppercase tracking-wider mt-2">Análise de Solo</p>
            <div className="grid grid-cols-3 gap-1.5">
              {nutsSolo.map(n => (
                <div key={n.nut} className={`px-2 py-1.5 rounded border text-center ${STATUS_COR[n.status]}`}>
                  <p className="font-mono font-bold text-[11px]">{n.nut}</p>
                  <p className="font-mono text-[8px] mt-0.5">{n.valor ?? '—'}</p>
                  <p className="font-mono text-[8px]">{STATUS_LABEL[n.status]}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </Section>

      {/* 2b. Balanço CTC — Ca%, Mg%, K% */}
      {(() => {
        const ca  = parseFloat(data?.caSolo  || 0)
        const mg  = parseFloat(data?.mgSolo  || 0)
        const k   = parseFloat(data?.kSolo   || 0)  // cmolc/dm³ (valor bruto)
        const ctc = parseFloat(data?.ctcSolo || 0)
        if (!ctc || ctc <= 0) return null

        const caP  = (ca  / ctc * 100)
        const mgP  = (mg  / ctc * 100)
        const kP   = (k   / ctc * 100)
        const hAlP = Math.max(0, 100 - caP - mgP - kP)

        function status(val, min, max) {
          if (val < min) return 'def'
          if (val > max) return 'alto'
          return 'ok'
        }
        const caStatus = status(caP,  45, 70)
        const mgStatus = status(mgP,  15, 25)
        const kStatus  = status(kP,    3,  6)

        const cor = { def: 'bg-red-50 border-red-200 text-red-700', ok: 'bg-green-50 border-green-200 text-green-700', alto: 'bg-amber-50 border-amber-200 text-amber-700' }
        const lbl = { def: '↓ Baixo', ok: '✓ Adequado', alto: '↑ Alto' }

        return (
          <div className="bg-white border border-surface-border rounded-card shadow-card overflow-hidden">
            <div className="px-4 py-2.5 border-b border-surface-border bg-surface-muted">
              <p className="font-display font-bold text-sm text-brand-900">Balanço de Cátions na CTC</p>
              <p className="font-mono text-[9px] text-ink-400">Relações Ca / Mg / K — CTC = {ctc} cmolc/dm³</p>
            </div>
            <div className="p-3 grid grid-cols-3 gap-2">
              {[
                { nut: 'Ca', val: caP, min: 45, max: 70, st: caStatus },
                { nut: 'Mg', val: mgP, min: 15, max: 25, st: mgStatus },
                { nut: 'K',  val: kP,  min:  3, max:  6, st: kStatus  },
              ].map(({ nut, val, min, max, st }) => (
                <div key={nut} className={`rounded-lg border p-2.5 text-center ${cor[st]}`}>
                  <p className="font-mono font-extrabold text-base leading-none">{nut}</p>
                  <p className="font-mono font-bold text-lg mt-1">{val.toFixed(1)}%</p>
                  <p className="font-mono text-[8px] mt-0.5 opacity-70">ref {min}–{max}%</p>
                  <p className={`font-mono text-[8px] font-semibold mt-1 border rounded px-1 py-0.5 inline-block ${cor[st]}`}>{lbl[st]}</p>
                </div>
              ))}
            </div>
            <div className="px-3 pb-3 flex gap-3">
              <div className="flex-1 bg-surface-muted rounded px-3 py-1.5">
                <p className="font-mono text-[8px] text-ink-500">H+Al: {hAlP.toFixed(1)}%</p>
                <p className="font-mono text-[8px] text-ink-400">V% calculado: {(caP + mgP + kP).toFixed(1)}%</p>
              </div>
              <div className="flex-1 bg-surface-muted rounded px-3 py-1.5">
                <p className="font-mono text-[8px] text-ink-500">Ca/Mg: {mg > 0 ? (ca/mg).toFixed(1) : '—'}</p>
                <p className="font-mono text-[8px] text-ink-400">Ideal: 2–5</p>
              </div>
            </div>
          </div>
        )
      })()}

      {/* 3. Interpretação Nutricional */}
      <Section n="3" title="Interpretação Nutricional" subtitle="Funções e impacto das deficiências detectadas">
        {defs.length === 0 && altos.length === 0 && (
          <p className="font-mono text-[11px] text-ink-500">Nenhuma alteração nutricional significativa detectada.</p>
        )}
        {[...defs, ...altos].map(d => {
          // NUTRIENT_PROFILES imported at top
          const prof = NUTRIENT_PROFILES[d.nut]
          if (!prof) return null
          return (
            <div key={d.nut + d.fonte} className="border border-surface-border rounded-lg p-3 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-sm text-brand-900">{prof.nome} ({d.nut})</span>
                <Badge label={STATUS_LABEL[d.status]} color={STATUS_COR[d.status]} />
              </div>
              <div className="space-y-1">
                <p className="font-mono text-[10px] text-ink-600">
                  <span className="font-semibold text-ink-700">Impacto: </span>
                  {d.status === 'def' ? prof.deficiencia.impacto_produtivo : prof.toxicidade?.mecanismo}
                </p>
                <p className="font-mono text-[10px] text-ink-600">
                  <span className="font-semibold text-ink-700">Sintoma esperado: </span>
                  {d.status === 'def' ? prof.deficiencia.sintomas_visuais[0] : prof.toxicidade?.sintomas_visuais[0]}
                </p>
                <p className="font-mono text-[10px] text-ink-500">
                  <span className="font-semibold">Mobilidade: </span>{prof.mobilidade} ·{' '}
                  <span className="font-semibold">Folhas afetadas: </span>
                  {d.status === 'def' ? prof.deficiencia.folhas_afetadas : '—'}
                </p>
              </div>
              <p className="font-mono text-[9px] text-ink-400">{prof.fonte_ref}</p>
            </div>
          )
        })}
      </Section>

      {/* 4. Risco Produtivo */}
      <Section n="4" title="Risco Produtivo" subtitle="Impacto estimado no rendimento">
        {defs.length === 0 && !result.interacoes.some(i => i.tipo === 'ph_acido') && (
          <p className="font-mono text-[11px] text-green-700">Baixo risco produtivo com base nos dados inseridos.</p>
        )}
        {defs.filter(d => d.estadioPeso >= 7).map(d => {
          // NUTRIENT_PROFILES imported at top
          const prof = NUTRIENT_PROFILES[d.nut]
          return (
            <div key={d.nut + d.fonte} className="flex items-start gap-2 py-1.5 border-b border-surface-border last:border-0">
              <span className={`w-6 h-6 rounded font-mono font-bold text-[10px] flex items-center justify-center flex-shrink-0 ${GRAVIDADE_COR[d.grav]}`}>{d.nut}</span>
              <div>
                <p className="font-mono text-[10px] text-ink-700 font-semibold">{prof?.nome || d.nut} — Estádio: {d.estadioPeso >= 9 ? 'crítico' : 'importante'}</p>
                <p className="font-mono text-[10px] text-ink-600">{prof?.deficiencia?.impacto_produtivo}</p>
              </div>
            </div>
          )
        })}
        {/* Estresse climático */}
        {result.recomendacoes.filter(r => r.tipo === 'estresse_climatico').map((r, i) => (
          <div key={i} className="bg-orange-50 border border-orange-200 rounded p-2 font-mono text-[10px] text-orange-700">
            ⚠ {r.justificativa}
          </div>
        ))}
      </Section>

      {/* 5. Fontes da Base de Conhecimento */}
      <Section n="5" title="Fontes da Base de Conhecimento" subtitle="Referências bibliográficas utilizadas">
        <div className="space-y-1">
          {result.resumo.fontesPrimarias.map((f, i) => (
            <p key={i} className="font-mono text-[9px] text-ink-500 border-b border-surface-border pb-1 last:border-0">
              [{i + 1}] {f}
            </p>
          ))}
        </div>
        <div className="mt-2 bg-surface-muted rounded px-3 py-2">
          <p className="font-mono text-[9px] text-ink-400">
            Motor AgroEngine v1.0 — Diagnóstico gerado localmente sem conexão com internet.
            Base de conhecimento codificada de 7 fontes primárias de agronomia tropical.
            Confirme recomendações com engenheiro agrônomo responsável.
          </p>
        </div>
      </Section>
    </div>
  )
}
