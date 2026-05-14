import { useEffect, useRef, useState } from 'react'
import { useWizard } from '../../hooks/useWizard'
import { useLanguage } from '../../contexts/LanguageContext'
import { useAuth } from '../../hooks/useAuth'
import { callClaude } from '../../services/api'
import { buildLaudoPrompt1, buildLaudoPrompt2, buildLaudoPrompt3 } from '../../services/prompts'
import { saveLaudo } from '../../services/laudoService'
import LoadingLaudo from '../../components/LoadingLaudo'
import LaudoView from '../../components/LaudoView'
import Button from '../../components/ui/Button'

export default function StepLaudo() {
  const { data, laudoFinalHtml, laudoDiagnoseHtml, setFinalHtml } = useWizard()
  const { t, lang } = useLanguage()
  const { user } = useAuth()
  const [loading, setLoading]         = useState(false)
  const [error, setError]             = useState(null)
  const [saveError, setSaveError]     = useState(false)
  const [observations, setObservations] = useState('')
  const [obsAdded, setObsAdded]       = useState(false)
  const started                       = useRef(false)

  useEffect(() => {
    if (laudoFinalHtml || started.current) return
    started.current = true
    generate()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function generate() {
    setError(null)
    setSaveError(false)
    setLoading(true)
    setFinalHtml('__loading__')
    try {
      const [html1, html2, html3] = await Promise.all([
        callClaude(buildLaudoPrompt1(data, t.promptLang), null, 3500),
        callClaude(buildLaudoPrompt2(data, t.promptLang), null, 3500),
        callClaude(buildLaudoPrompt3(data, t.promptLang), null, 3500),
      ])
      const finalHtml = html1 + html2 + html3
      setFinalHtml(finalHtml)
      saveLaudo({ userId: user.id, data, diagnoseHtml: laudoDiagnoseHtml, laudoHtml: finalHtml })
        .catch(() => setSaveError(true))
    } catch (e) {
      setFinalHtml(null)
      started.current = false
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  function addObservations() {
    if (!observations.trim()) return
    const obsHtml = `<h3>📝 Observações do Agrônomo</h3><p style="white-space:pre-wrap">${observations.trim()}</p>`
    setFinalHtml(laudoFinalHtml + obsHtml)
    setObsAdded(true)
  }

  const isLoading = loading || laudoFinalHtml === '__loading__'

  const steps = [
    { label: t.laudo.loadingSteps[0], status: 'done' },
    { label: t.laudo.loadingSteps[1], status: 'done' },
    { label: t.laudo.loadingSteps[2], status: isLoading ? 'current' : 'done' },
    { label: t.laudo.loadingSteps[3], status: isLoading ? 'current' : 'done' },
    { label: t.laudo.loadingSteps[4], status: isLoading ? 'current' : 'done' },
  ]

  return (
    <>
      <div className="mb-4">
        <h2 className="font-display font-bold text-xl text-brand-900">{t.laudo.title}</h2>
        <p className="font-mono text-[11px] text-ink-400 mt-0.5">{t.laudo.subtitle}</p>
      </div>

      {error ? (
        <div className="bg-white border border-danger-600 rounded-card p-5 shadow-card text-center space-y-3">
          <p className="text-2xl">⚠️</p>
          <p className="font-mono text-xs text-danger-600">{error}</p>
          <Button onClick={generate} fullWidth>🔄 Tentar novamente</Button>
        </div>
      ) : isLoading ? (
        <div className="bg-white border border-surface-border rounded-card shadow-card">
          <LoadingLaudo
            title={t.laudo.loading}
            subtitle={t.laudo.loadingSub}
            steps={steps}
          />
        </div>
      ) : (
        <>
          {saveError && (
            <div className="mb-3 bg-amber-50 border border-amber-300 rounded-card px-4 py-2.5 flex items-center gap-2">
              <span className="text-amber-600 text-sm">⚠️</span>
              <p className="font-mono text-[11px] text-amber-700">
                {lang === 'en'
                  ? 'Report generated but could not be saved to history.'
                  : 'Laudo gerado, mas não foi possível salvar no histórico.'}
              </p>
            </div>
          )}

          <LaudoView
            title="📄 Protocolo Fisiológico"
            subtitle={`${data.prodNome} · ${(data.cultura||'').toUpperCase()} ${data.hibrido ? '· '+data.hibrido : ''} · Estádio ${data.estadio}`}
            badge="📚 Marschner · Taiz & Zeiger · Kerbauy · Embrapa"
            html={laudoFinalHtml}
            showPrint
          />

          {/* Observações do Agrônomo */}
          {!obsAdded && (
            <div className="mt-3 bg-white border border-surface-border rounded-card p-4 shadow-card">
              <p className="font-mono text-[10px] font-bold text-ink-400 uppercase tracking-wider mb-2">
                📝 {lang === 'en' ? 'Agronomist Notes (optional)' : 'Observações do Agrônomo (opcional)'}
              </p>
              <textarea
                value={observations}
                onChange={e => setObservations(e.target.value)}
                placeholder={lang === 'en'
                  ? 'Add complementary comments or adjustments before sharing...'
                  : 'Adicione comentários ou ajustes complementares antes de compartilhar...'}
                className="w-full border border-surface-border rounded-sm p-3 text-sm font-mono
                  text-ink-700 resize-none h-24 outline-none focus:border-brand-700 transition-colors"
              />
              {observations.trim() && (
                <button
                  onClick={addObservations}
                  className="mt-2 w-full py-2.5 bg-brand-900 text-white rounded-sm font-mono text-xs
                    hover:bg-brand-700 transition-colors"
                >
                  {lang === 'en' ? '✅ Add to Report' : '✅ Adicionar ao Laudo'}
                </button>
              )}
            </div>
          )}
          {obsAdded && (
            <div className="mt-2 bg-green-50 border border-green-200 rounded-card px-4 py-2.5">
              <p className="font-mono text-[11px] text-green-700">
                ✅ {lang === 'en' ? 'Notes added to the report.' : 'Observações adicionadas ao laudo.'}
              </p>
            </div>
          )}
        </>
      )}
    </>
  )
}
