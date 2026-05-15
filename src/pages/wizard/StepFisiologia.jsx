import { useState } from 'react'
import { useWizard } from '../../hooks/useWizard'
import { useLanguage } from '../../contexts/LanguageContext'
import { useAuth } from '../../hooks/useAuth'
import { callClaude } from '../../services/api'
import { buildManipPrompt } from '../../services/prompts'
import { saveLaudo } from '../../services/laudoService'
import LaudoView from '../../components/LaudoView'
import Button from '../../components/ui/Button'
import Spinner from '../../components/ui/Spinner'

const MANIP_OPTIONS = [
  { id: 'raiz',       icon: '🌱', labelPt: 'Crescimento de Raiz',   labelEn: 'Root Growth' },
  { id: 'defesa',     icon: '🛡️', labelPt: 'Defesa Celular',        labelEn: 'Cell Defense' },
  { id: 'prestresse', icon: '⚡', labelPt: 'Manejo Pré-Estresse',   labelEn: 'Pre-Stress Management' },
  { id: 'enchimento', icon: '🌾', labelPt: 'Enchimento de Grão',    labelEn: 'Grain Filling' },
  { id: 'floral',     icon: '🌸', labelPt: 'Pegamento Floral',      labelEn: 'Floral Setting' },
]

export default function StepFisiologia() {
  const { data, update, laudoDiagnoseHtml, correcaoHtml, manipHtml, setManipHtml } = useWizard()
  const { t, lang } = useLanguage()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [saveError, setSaveError] = useState(false)

  const selected = data.manipOptions || []

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
        buildManipPrompt(data, selected, t.promptLang),
        null,
        3000
      )
      setManipHtml(html)
      // Save to Supabase
      saveLaudo({
        userId: user.id,
        data,
        diagnoseHtml: laudoDiagnoseHtml,
        laudoHtml: (correcaoHtml || '') + html,
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
        <h2 className="font-display font-bold text-xl text-brand-900">
          {lang === 'en' ? '🧬 Physiological Manipulation' : '🧬 Manipulação Fisiológica'}
        </h2>
        <p className="font-mono text-[11px] text-ink-400 mt-0.5">
          {lang === 'en'
            ? 'Select your physiological objectives'
            : 'Selecione seus objetivos fisiológicos'}
        </p>
      </div>

      {!hasResult && (
        <>
          <div className="space-y-3 mb-4">
            {MANIP_OPTIONS.map(opt => {
              const isSelected = selected.includes(opt.id)
              const label = lang === 'en' ? opt.labelEn : opt.labelPt
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
                    <span className="font-display font-bold text-sm text-brand-900">{label}</span>
                  </div>
                </button>
              )
            })}
          </div>

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
                <p className="font-mono text-xs font-semibold text-brand-900">
                  {lang === 'en' ? 'Generating protocol...' : 'Gerando protocolo...'}
                </p>
                <p className="font-mono text-[10px] text-ink-400">
                  {lang === 'en' ? 'This may take a few seconds' : 'Isso pode levar alguns segundos'}
                </p>
              </div>
            </div>
          ) : (
            <Button
              onClick={handleGenerate}
              disabled={selected.length === 0}
              fullWidth
            >
              {lang === 'en' ? '⚡ Generate Protocol' : '⚡ Gerar Protocolo'}
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
                {lang === 'en'
                  ? 'Report generated but could not be saved to history.'
                  : 'Protocolo gerado, mas não foi possível salvar no histórico.'}
              </p>
            </div>
          )}

          <LaudoView
            title={`🧬 ${lang === 'en' ? 'Physiological Manipulation Protocol' : 'Protocolo de Manipulação Fisiológica'}`}
            subtitle={`${data.prodNome} · ${(data.cultura || '').toUpperCase()} · ${lang === 'en' ? 'Stage' : 'Estádio'} ${data.estadio}`}
            badge="📚 Kerbauy (2008) · Taiz & Zeiger (2017) · Marschner (2012)"
            html={manipHtml}
            showPrint
          />

          <div className="mt-3">
            <button
              onClick={() => setManipHtml(null)}
              className="font-mono text-[11px] text-brand-700 underline"
            >
              {lang === 'en' ? '↩ Redo protocol' : '↩ Refazer protocolo'}
            </button>
          </div>
        </>
      )}
    </>
  )
}
