import { useRef, useState } from 'react'
import { useWizard } from '../../hooks/useWizard'
import { REF_SOLO, REF_FOLIAR, DOSES_CORRETIVAS } from '../../data/referencias'
import { exportToPdf } from '../../utils/exportPdf'

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

function calcDeficiencias(data, cultura) {
  const cult = (cultura || 'soja').toLowerCase().replace('ã', 'a').replace('é', 'e')
  const refFol = REF_FOLIAR[cult] || REF_FOLIAR.soja
  const refSol = REF_SOLO[cult]   || REF_SOLO.soja

  const defFoliar = new Set()
  for (const [field, nut] of Object.entries(FOLIAR_MAP)) {
    const val = parseFloat(data[field])
    if (isNaN(val)) continue
    const ref = refFol[nut]
    if (!ref) continue
    if (val < ref.min) defFoliar.add(nut)
  }

  const defSolo = new Set()
  for (const [field, nut] of Object.entries(SOLO_MAP)) {
    const val = parseFloat(data[field])
    if (isNaN(val)) continue
    const ref = refSol[nut]
    if (!ref) continue
    const cmpVal = field === 'kSolo' ? val * 391 : val
    if (cmpVal < ref.min) defSolo.add(nut)
  }

  return { defSolo, defFoliar }
}

function hasSoloValues(data) {
  return Object.keys(SOLO_MAP).some(k => data[k] && data[k] !== '')
}
function hasFoliarValues(data) {
  return Object.keys(FOLIAR_MAP).some(k => data[k] && data[k] !== '')
}

const NUTRIENT_ORDER = ['N', 'P', 'K', 'Ca', 'Mg', 'S', 'B', 'Zn', 'Cu', 'Mn', 'Fe', 'Mo', 'pH', 'MO', 'V']

function buildRows(defSolo, defFoliar) {
  const nuts = new Set([...defSolo, ...defFoliar])
  return NUTRIENT_ORDER
    .filter(n => nuts.has(n))
    .map(nut => ({
      nut,
      inSolo:   defSolo.has(nut),
      inFoliar: defFoliar.has(nut),
      dose:     DOSES_CORRETIVAS[nut],
    }))
}

export default function StepCorrecao() {
  const { data } = useWizard()
  const { cultura } = data
  const contentRef  = useRef(null)
  const [pdfLoading, setPdfLoading] = useState(false)

  const temSolo   = hasSoloValues(data)
  const temFoliar = hasFoliarValues(data)
  const { defSolo, defFoliar } = calcDeficiencias(data, cultura)
  const rows = buildRows(defSolo, defFoliar)

  const semDados = !temSolo && !temFoliar

  async function handleExportPdf() {
    if (!contentRef.current) return
    setPdfLoading(true)
    try {
      await exportToPdf(
        contentRef.current,
        `correcao-${(data.cultura || 'soja').toLowerCase()}-${data.estadio || 'VE'}`
      )
    } finally {
      setPdfLoading(false)
    }
  }

  return (
    <div className="space-y-3">
      <div ref={contentRef} className="space-y-3">
        <div>
          <h2 className="font-display font-bold text-xl text-brand-900">💊 Correção Nutricional</h2>
          <p className="font-mono text-[11px] text-ink-400 mt-0.5">Doses corretivas por nutriente deficiente</p>
        </div>

        {semDados && (
          <div className="bg-white border border-surface-border rounded-card shadow-card p-5 text-center space-y-2">
            <p className="text-2xl">ℹ️</p>
            <p className="font-mono text-sm text-ink-500">
              Nenhuma análise de solo ou foliar foi inserida.<br />
              Insira valores nas etapas anteriores para ver as correções.
            </p>
          </div>
        )}

        {!semDados && rows.length === 0 && (
          <div className="bg-white border border-surface-border rounded-card shadow-card p-5 text-center space-y-2">
            <p className="text-2xl">✅</p>
            <p className="font-mono text-sm text-green-700">
              Todos os nutrientes analisados estão dentro da faixa adequada.
            </p>
          </div>
        )}

        {rows.length > 0 && (
          <div className="bg-white border border-surface-border rounded-card shadow-card overflow-hidden">
            <div className="px-4 py-2.5 border-b border-surface-border bg-surface-muted flex items-center justify-between">
              <p className="font-mono text-[10px] text-ink-500 uppercase tracking-wider">
                {rows.length} nutriente{rows.length > 1 ? 's' : ''} com deficiência detectada
              </p>
              <p className="font-mono text-[9px] text-ink-400 italic">← deslize para ler →</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left border-collapse">
                <thead>
                  <tr className="bg-surface-muted border-b-2 border-surface-border">
                    <th className="px-4 py-2 font-mono text-[9px] uppercase tracking-wider text-ink-500 w-28 sticky left-0 bg-surface-muted z-10 shadow-[2px_0_4px_-2px_rgba(0,0,0,0.08)]">Nutriente</th>
                    <th className="px-4 py-2 font-mono text-[9px] uppercase tracking-wider text-ink-500 min-w-[200px]">Correção de Solo</th>
                    <th className="px-4 py-2 font-mono text-[9px] uppercase tracking-wider text-ink-500 min-w-[180px]">Correção Foliar</th>
                    <th className="px-4 py-2 font-mono text-[9px] uppercase tracking-wider text-ink-500 w-32">Fonte</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(({ nut, inSolo, inFoliar, dose }, i) => (
                    <tr key={nut} className={`align-top border-b border-surface-border ${i % 2 === 1 ? 'bg-surface-muted/30' : 'bg-white'}`}>
                      <td className={`px-4 py-3 sticky left-0 z-10 shadow-[2px_0_4px_-2px_rgba(0,0,0,0.08)] ${i % 2 === 1 ? 'bg-surface-muted/30' : 'bg-white'}`}>
                        <span className="font-mono font-extrabold text-sm text-brand-900 block">{nut}</span>
                        <div className="flex flex-col gap-0.5 mt-1">
                          {inSolo   && <span className="text-[8px] font-mono bg-red-100 text-red-700 border border-red-200 rounded px-1.5 py-0.5 w-fit leading-none">SOLO ↓</span>}
                          {inFoliar && <span className="text-[8px] font-mono bg-amber-100 text-amber-700 border border-amber-200 rounded px-1.5 py-0.5 w-fit leading-none">FOLIAR ↓</span>}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {dose?.solo && dose.solo !== '—'
                          ? <p className="font-mono text-[11px] text-ink-700 leading-relaxed">{dose.solo}</p>
                          : <p className="font-mono text-[11px] text-ink-400 italic">—</p>}
                      </td>
                      <td className="px-4 py-3">
                        {dose?.foliar
                          ? <p className="font-mono text-[11px] text-ink-700 leading-relaxed">{dose.foliar}</p>
                          : <p className="font-mono text-[11px] text-ink-400 italic">—</p>}
                      </td>
                      <td className="px-4 py-3">
                        {dose?.fonte
                          ? <p className="font-mono text-[9px] text-ink-500 leading-relaxed">{dose.fonte}</p>
                          : <p className="font-mono text-[11px] text-ink-400 italic">—</p>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="bg-surface-muted border border-surface-border rounded-lg px-3 py-2">
          <p className="font-mono text-[9px] text-ink-400 leading-relaxed">
            📚 Doses indicativas — Embrapa, CQFS RS/SC, Malavolta et al., Marschner (2012).
            Confirme com engenheiro agrônomo responsável.
          </p>
        </div>
      </div>

      <button
        onClick={handleExportPdf}
        disabled={pdfLoading}
        className="w-full py-2.5 px-4 bg-brand-900 text-white rounded-lg font-mono text-xs font-semibold hover:bg-brand-700 disabled:bg-ink-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        {pdfLoading ? '⏳ Gerando PDF...' : '📄 Exportar Correção em PDF'}
      </button>
    </div>
  )
}
