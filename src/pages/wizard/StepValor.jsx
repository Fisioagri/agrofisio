import { useRef, useState } from 'react'
import { useWizard } from '../../hooks/useWizard'
import { REF_SOLO, REF_FOLIAR } from '../../data/referencias'
import { calcROI, getDeficiencias } from '../../utils/calcROI'
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

function calcNuts(data, cultura) {
  const cult    = (cultura || 'soja').toLowerCase().replace('ã', 'a').replace('é', 'e')
  const refFol  = REF_FOLIAR[cult] || REF_FOLIAR.soja
  const refSol  = REF_SOLO[cult]   || REF_SOLO.soja

  const foliar = Object.entries(FOLIAR_MAP).map(([field, nut]) => {
    const val = parseFloat(data[field])
    if (isNaN(val)) return { nut, status: 'nd' }
    const ref = refFol[nut]
    if (!ref) return { nut, status: 'nd' }
    return { nut, status: val < ref.min ? 'def' : val > ref.max ? 'alto' : 'ok' }
  })

  const solo = Object.entries(SOLO_MAP).map(([field, nut]) => {
    const val = parseFloat(data[field])
    if (isNaN(val)) return { nut, status: 'nd' }
    const ref = refSol[nut]
    if (!ref) return { nut, status: 'nd' }
    const cmpVal = field === 'kSolo' ? val * 391 : val
    return { nut, status: cmpVal < ref.min ? 'def' : cmpVal > ref.max ? 'alto' : 'ok' }
  })

  return { foliar, solo }
}

function fmt(n) {
  return n?.toLocaleString('pt-BR') ?? '—'
}

export default function StepValor() {
  const { data }           = useWizard()
  const contentRef         = useRef(null)
  const [pdfLoading, setPdfLoading] = useState(false)
  const [precoSoja, setPrecoSoja]   = useState('')

  const { foliar, solo } = calcNuts(data, data.cultura)
  const deficiencias     = getDeficiencias(foliar, solo)
  const area             = parseFloat(data.areaHa) || 1

  const roi = calcROI({
    deficiencias,
    prodExpect: data.prodExpect,
    areaHa: area,
    precoSoja: precoSoja || undefined,
  })

  async function handleExportPdf() {
    if (!contentRef.current) return
    setPdfLoading(true)
    try {
      await exportToPdf(
        contentRef.current,
        `valor-agrofisio-${(data.cultura || 'soja').toLowerCase()}-${data.estadio || 'VE'}`
      )
    } finally {
      setPdfLoading(false)
    }
  }

  return (
    <div className="space-y-3">
      {/* Preço da soja */}
      <div className="bg-white border border-surface-border rounded-card px-4 py-3 flex items-center gap-3">
        <span className="font-mono text-[11px] text-ink-600 whitespace-nowrap">Preço da soja (R$/sc):</span>
        <input
          type="number"
          min="1"
          max="9999"
          step="1"
          placeholder={`${roi.precoSoja} (padrão)`}
          value={precoSoja}
          onChange={e => setPrecoSoja(e.target.value)}
          className="flex-1 px-3 py-1.5 border-[1.5px] border-surface-border rounded-sm text-sm font-mono
            text-ink-900 bg-surface-input focus:border-brand-700 outline-none"
        />
      </div>

      <div ref={contentRef} className="space-y-3">
        <div>
          <h2 className="font-display font-bold text-xl text-brand-900">💰 Impacto Econômico</h2>
          <p className="font-mono text-[11px] text-ink-400 mt-0.5">
            {(data.cultura || 'Soja').toUpperCase()} · Estádio {data.estadio} · {data.prodNome}
          </p>
        </div>

        {roi.semDeficiencias ? (
          <div className="bg-white border border-green-200 rounded-card shadow-card p-6 text-center space-y-2">
            <p className="text-3xl">🌟</p>
            <p className="font-display font-bold text-green-700">Nutrição dentro da faixa</p>
            <p className="font-mono text-[11px] text-ink-500">
              Nenhuma deficiência detectada nas análises inseridas.
              Mantenha o monitoramento ao longo do ciclo.
            </p>
          </div>
        ) : (
          <>
            {/* Card principal de impacto */}
            <div className="bg-white border-2 border-red-200 rounded-card shadow-card overflow-hidden">
              <div className="bg-red-50 border-b border-red-200 px-4 py-3">
                <p className="font-mono text-[9px] text-red-700 uppercase tracking-wider">
                  Risco de perda sem correção
                </p>
                <p className="font-display font-extrabold text-2xl text-red-700 mt-0.5">
                  {roi.perdaMinHa}–{roi.perdaMaxHa} sc/ha
                </p>
                <p className="font-mono text-xs text-red-600">
                  R$ {fmt(roi.valorMinHa)}–{fmt(roi.valorMaxHa)} por hectare
                </p>
              </div>

              {/* Grid de métricas */}
              <div className="grid grid-cols-3 divide-x divide-surface-border border-b border-surface-border">
                {[
                  { label: 'Deficiências', value: `${deficiencias.length}`, unit: 'nutrientes', color: 'text-red-700' },
                  { label: 'Custo correção', value: `R$ ${fmt(roi.custoHa)}`, unit: '/ha', color: 'text-ink-700' },
                  { label: 'ROI estimado', value: `${roi.roiMin}–${roi.roiMax}x`, unit: 'retorno', color: 'text-green-700' },
                ].map(m => (
                  <div key={m.label} className="px-3 py-3 text-center">
                    <p className={`font-display font-extrabold text-lg leading-none ${m.color}`}>{m.value}</p>
                    <p className="font-mono text-[8px] text-ink-400 mt-0.5">{m.unit}</p>
                    <p className="font-mono text-[9px] text-ink-500 mt-0.5">{m.label}</p>
                  </div>
                ))}
              </div>

              {/* Área total se tiver */}
              {area > 1 && (
                <div className="px-4 py-2.5 bg-surface-muted border-b border-surface-border">
                  <p className="font-mono text-[10px] text-ink-500">
                    Para {area} ha:
                    <span className="font-semibold text-red-700 ml-2">
                      R$ {fmt(roi.valorMinTotal)}–{fmt(roi.valorMaxTotal)} em risco
                    </span>
                    <span className="text-ink-400 ml-2">·</span>
                    <span className="text-ink-600 ml-2">
                      Correção estimada: R$ {fmt(roi.custoTotal)}
                    </span>
                  </p>
                </div>
              )}

              {/* Lista de deficiências com impacto */}
              <div className="divide-y divide-surface-border">
                {roi.itens.map(item => (
                  <div key={item.nut} className="px-4 py-2.5 flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-red-100 border border-red-200">
                        <span className="font-mono font-extrabold text-xs text-red-700">{item.nut}</span>
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-[11px] text-ink-700 leading-relaxed">{item.desc}</p>
                      <p className="font-mono text-[9px] text-red-600 mt-0.5">
                        Perda estimada: {item.pMin}–{item.pMax} sc/ha
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Nota de ROI positivo */}
            {roi.roiMin >= 5 && (
              <div className="bg-green-50 border border-green-200 rounded-card px-4 py-3 flex items-start gap-2">
                <span className="text-lg flex-shrink-0">📈</span>
                <div>
                  <p className="font-mono text-xs font-semibold text-green-700">
                    ROI de {roi.roiMin}–{roi.roiMax}x sobre o investimento
                  </p>
                  <p className="font-mono text-[10px] text-green-600 mt-0.5">
                    Para cada R$ 1,00 aplicado na correção, estimativa de R$ {roi.roiMin}–{roi.roiMax} de retorno em produtividade.
                  </p>
                </div>
              </div>
            )}
          </>
        )}

        {/* Disclaimer */}
        <div className="bg-surface-muted border border-surface-border rounded-lg px-3 py-2">
          <p className="font-mono text-[9px] text-ink-400 leading-relaxed">
            📊 Estimativas baseadas em Embrapa, CQFS RS/SC e literatura de resposta nutricional.
            Preço de referência: R$ {roi.precoSoja}/sc. Variações de campo podem alterar significativamente os resultados.
            Confirme com engenheiro agrônomo responsável.
          </p>
        </div>
      </div>

      <button
        onClick={handleExportPdf}
        disabled={pdfLoading}
        className="w-full py-2.5 px-4 bg-brand-900 text-white rounded-lg font-mono text-xs font-semibold hover:bg-brand-700 disabled:bg-ink-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        {pdfLoading ? '⏳ Gerando PDF...' : '📄 Exportar Análise de Valor em PDF'}
      </button>
    </div>
  )
}
