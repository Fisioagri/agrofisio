import { useEffect, useRef, useState } from 'react'
import { useWizard } from '../../hooks/useWizard'
import { useLanguage } from '../../contexts/LanguageContext'
import { callClaude } from '../../services/api'
import { buildDiagnosePrompt1, buildDiagnosePrompt2 } from '../../services/prompts'
import LoadingLaudo from '../../components/LoadingLaudo'
import LaudoView from '../../components/LaudoView'
import InfoBox from '../../components/ui/InfoBox'
import Button from '../../components/ui/Button'

export default function StepDiagnose() {
  const { data, laudoDiagnoseHtml, setDiagnoseHtml } = useWizard()
  const { t } = useLanguage()
  const started = useRef(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (laudoDiagnoseHtml || started.current) return
    started.current = true
    generate()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function generate() {
    setError(null)
    setLoading(true)
    setDiagnoseHtml('__loading__')
    try {
      const [html1, html2] = await Promise.all([
        callClaude(buildDiagnosePrompt1(data, t.promptLang), data.fotoB64 || null, 3500),
        callClaude(buildDiagnosePrompt2(data, t.promptLang), null, 3500),
      ])
      setDiagnoseHtml(html1 + html2)
    } catch (e) {
      setDiagnoseHtml(null)
      started.current = false
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const isLoading = loading || laudoDiagnoseHtml === '__loading__'

  const steps = [
    { label: t.diagnose.loadingSteps[0], status: 'done' },
    { label: t.diagnose.loadingSteps[1], status: isLoading ? 'current' : 'done' },
    { label: t.diagnose.loadingSteps[2], status: isLoading ? 'current' : 'done' },
    { label: t.diagnose.loadingSteps[3], status: isLoading ? 'pending' : 'done' },
    { label: t.diagnose.loadingSteps[4], status: isLoading ? 'pending' : 'done' },
  ]

  return (
    <>
      <div className="mb-4">
        <h2 className="font-display font-bold text-xl text-brand-900">{t.diagnose.title}</h2>
        <p className="font-mono text-[11px] text-ink-400 mt-0.5">{t.diagnose.subtitle}</p>
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
            title={t.diagnose.loading}
            subtitle={t.diagnose.loadingSub}
            steps={steps}
          />
        </div>
      ) : (
        <>
          <LaudoView
            title={`🔬 Diagnose — ${(data.cultura || '').toUpperCase()}`}
            subtitle={`${data.prodNome} · ${data.prodCidade} · Estádio ${data.estadio}`}
            badge="📚 Marschner (2012) · Taiz & Zeiger (2017) · Kerbauy · Embrapa"
            html={laudoDiagnoseHtml}
          />
          <InfoBox variant="amber">
            {t.diagnose.done}
          </InfoBox>
        </>
      )}
    </>
  )
}
