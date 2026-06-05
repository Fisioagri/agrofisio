import { useRef, useState } from 'react'
import { useWizard } from '../../hooks/useWizard'
import { useLanguage } from '../../contexts/LanguageContext'
import { useAuth } from '../../hooks/useAuth'
import { callClaude } from '../../services/api'
import { buildManipPrompt } from '../../services/prompts'
import { saveLaudo } from '../../services/laudoService'
import { exportToPdf } from '../../utils/exportPdf'
import LaudoView from '../../components/LaudoView'
import Button from '../../components/ui/Button'
import Spinner from '../../components/ui/Spinner'

const SOJA_STAGES = ['VE','VC','V1','V2','V3','V4','V5','V6','R1','R2','R3','R4','R5','R5.1','R5.2','R5.3','R5.4','R5.5','R6','R7','R8']
const STAGE_IDX = Object.fromEntries(SOJA_STAGES.map((s, i) => [s, i]))

const MANIP_OPTIONS = [
  { id: 'raiz',         icon: '🌱', label: 'Crescimento de Raiz',             from: 2, to: 9  }, // V1–R2
  { id: 'protecao',     icon: '🛡️', label: 'Proteção Celular',                from: 0, to: 20 }, // todo ciclo
  { id: 'oxidativo',    icon: '⚡', label: 'Prevenção de Estresse Oxidativo', from: 0, to: 20 }, // todo ciclo
  { id: 'engalhamento', icon: '🌿', label: 'Engalhamento',                    from: 2, to: 9  }, // V1–R2
  { id: 'enchimento',   icon: '🌾', label: 'Enchimento de Grão',              from: 8, to: 17 }, // R1–R5.5
]

export default function StepFisiologia() {
  const { data, update, manipHtml, setManipHtml } = useWizard()
  const { t } = useLanguage()
  const { user } = useAuth()
  const laudoRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [saveError, setSaveError] = useState(false)
  const [pdfLoading, setPdfLoading] = useState(false)

  async function handleExportPdf() {
    if (!laudoRef.current) return
    setPdfLoading(true)
    try {
      await exportToPdf(
        laudoRef.current,
        `fisiologia-${(data.cultura || 'soja').toLowerCase()}-${data.estadio || 'VE'}`
      )
    } finally {
      setPdfLoading(false)
    }
  }

  const selected = data.manipOptions || []
  const estadioIdx = STAGE_IDX[data.estadio]
  const isSoja = (data.cultura || '').toLowerCase() === 'soja'

  const visibleOptions = (isSoja && estadioIdx !== undefined)
    ? MANIP_OPTIONS.filter(o => estadioIdx >= o.from && estadioIdx <= o.to)
    : MANIP_OPTIONS

  function toggleOption(id) {
    const next = selected.includes(id)
      ? selected.filter(o => o !== id)
      : [...selected, id]
    update({ manipOptions: next })
  }

  async function handleGenerate() {
    if (selected.length === 0) return
    setError(null)
    setSaveError(false)
    setLoading(true)
    try {
      const html = await callClaude(
        await buildManipPrompt(data, selected, t.promptLang),
        null,
        4000
      )
      setManipHtml(html)
      saveLaudo({
        userId: user.id,
        data,
        diagnoseHtml: '',
        laudoHtml: html,
      }).catch(() => setSaveError(true))
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const hasResult = !!manipHtml

  return (
    <>
      <div className="mb-4">
        <h2 className="font-display font-bold text-xl text-brand-900">🧬 Manipulação Fisiológica</h2>
        <p className="font-mono text-[11px] text-ink-400 mt-0.5">Selecione seus objetivos fisiológicos</p>
      </div>

      {!hasResult && (
        <>
          <div className="space-y-3 mb-4">
            {visibleOptions.map(opt => {
              const isSelected = selected.includes(opt.id)
              return (
                <button
                  key={opt.id}
                  onClick={() => !loading && toggleOption(opt.id)}
                  disabled={loading}
                  className={`w-full text-left p-4 rounded-card border-2 transition-all
                    ${isSelected
                      ? 'border-brand-900 bg-brand-50'
                      : 'border-surface-border bg-white hover:border-brand-700'}
                    ${loading ? 'opacity-60 cursor-not-allowed' : ''}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0
                      ${isSelected ? 'border-brand-900 bg-brand-900' : 'border-ink-300'}`}>
                      {isSelected && <span className="text-white text-[10px] font-bold">✓</span>}
                    </div>
                    <span className="text-xl">{opt.icon}</span>
                    <span className="font-display font-bold text-sm text-brand-900">{opt.label}</span>
                  </div>
                </button>
              )
            })}
          </div>

          {visibleOptions.length === 0 && (
            <div className="bg-surface-muted border border-surface-border rounded-card p-4 text-center">
              <p className="font-mono text-sm text-ink-500">
                Nenhuma opção disponível para o estádio <strong>{data.estadio}</strong>.
              </p>
            </div>
          )}

          {error && (
            <div className="mb-3 bg-white border border-danger-600 rounded-card p-4 shadow-card text-center space-y-2">
              <p className="text-2xl">⚠️</p>
              <p className="font-mono text-xs text-danger-600">{error}</p>
            </div>
          )}

          {loading ? (
            <div className="flex items-center gap-3 p-4 bg-brand-50 rounded-card border border-brand-400">
              <Spinner size="sm" />
              <div>
                <p className="font-mono text-xs font-semibold text-brand-900">Gerando protocolo...</p>
                <p className="font-mono text-[10px] text-ink-400">Isso pode levar alguns segundos</p>
              </div>
            </div>
          ) : (
            <Button
              onClick={handleGenerate}
              disabled={selected.length === 0}
              fullWidth
            >
              ⚡ Gerar Protocolo
            </Button>
          )}
        </>
      )}

      {hasResult && (
        <>
          {saveError && (
            <div className="mb-3 bg-amber-50 border border-amber-300 rounded-card px-4 py-2.5 flex items-center gap-2">
              <span className="text-amber-600 text-sm">⚠️</span>
              <p className="font-mono text-[11px] text-amber-700">
                Protocolo gerado, mas não foi possível salvar no histórico.
              </p>
            </div>
          )}

          <div ref={laudoRef}>
            <LaudoView
              title="🧬 Protocolo de Manipulação Fisiológica"
              subtitle={`${data.prodNome} · ${(data.cultura || '').toUpperCase()} · Estádio ${data.estadio}`}
              badge="📚 Kerbauy (2008) · Taiz & Zeiger (2017) · Marschner (2012)"
              html={manipHtml}
              showPrint
            />
          </div>

          <div className="mt-3 space-y-2">
            <button
              onClick={handleExportPdf}
              disabled={pdfLoading}
              className="w-full py-2.5 px-4 bg-brand-900 text-white rounded-lg font-mono text-xs font-semibold hover:bg-brand-700 disabled:bg-ink-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {pdfLoading ? '⏳ Gerando PDF...' : '📄 Exportar Protocolo em PDF'}
            </button>
            <button
              onClick={() => setManipHtml(null)}
              className="font-mono text-[11px] text-brand-700 underline"
            >
              ↩ Refazer protocolo
            </button>
          </div>
        </>
      )}
    </>
  )
}
