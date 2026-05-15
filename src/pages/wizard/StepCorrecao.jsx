import { useEffect, useRef, useState } from 'react'
import { useWizard } from '../../hooks/useWizard'
import { useLanguage } from '../../contexts/LanguageContext'
import { callClaude } from '../../services/api'
import { buildCorrecaoPrompt } from '../../services/prompts'
import LoadingLaudo from '../../components/LoadingLaudo'
import LaudoView from '../../components/LaudoView'
import Button from '../../components/ui/Button'

export default function StepCorrecao() {
  const { data, laudoDiagnoseHtml, correcaoHtml, setCorrecaoHtml, setStep } = useWizard()
  const { t, lang } = useLanguage()
  const started = useRef(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  // Only applicable if option 01 or 03 was selected
  const diagnoseOptions = data.diagnoseOptions || []
  const isApplicable = diagnoseOptions.includes('01') || diagnoseOptions.includes('03')

  useEffect(() => {
    if (!isApplicable) return
    if (correcaoHtml || started.current) return
    started.current = true
    generate()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function generate() {
    setError(null)
    setLoading(true)
    setCorrecaoHtml('__loading__')
    try {
      const html = await callClaude(
        await buildCorrecaoPrompt(data, laudoDiagnoseHtml || '', t.promptLang),
        null,
        4000
      )
      setCorrecaoHtml(html)
    } catch (e) {
      setCorrecaoHtml(null)
      started.current = false
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const isLoading = loading || correcaoHtml === '__loading__'

  const loadingSteps = [
    { label: lang === 'en' ? 'Reading diagnosis' : 'Lendo diagnose',                status: 'done' },
    { label: lang === 'en' ? 'Identifying deficiencies' : 'Identificando deficiências', status: isLoading ? 'current' : 'done' },
    { label: lang === 'en' ? 'Building protocol' : 'Montando protocolo',              status: isLoading ? 'current' : 'done' },
    { label: lang === 'en' ? 'Finalizing' : 'Finalizando',                            status: isLoading ? 'pending' : 'done' },
  ]

  if (!isApplicable) {
    return (
      <>
        <div className="mb-4">
          <h2 className="font-display font-bold text-xl text-brand-900">
            {lang === 'en' ? '💊 Nutritional Correction' : '💊 Correção Nutricional'}
          </h2>
        </div>
        <div className="bg-white border border-surface-border rounded-card p-5 shadow-card text-center space-y-3">
          <p className="text-3xl">ℹ️</p>
          <p className="font-mono text-sm text-ink-600">
            {lang === 'en'
              ? 'This step is not applicable because no nutritional analysis was selected in the previous step.'
              : 'Esta etapa não é aplicável pois nenhuma análise nutricional foi selecionada na etapa anterior.'}
          </p>
          <Button onClick={() => setStep(7)} fullWidth>
            {lang === 'en' ? 'Skip to Physiology →' : 'Avançar para Fisiologia →'}
          </Button>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="mb-4">
        <h2 className="font-display font-bold text-xl text-brand-900">
          {lang === 'en' ? '💊 Nutritional Correction' : '💊 Correção Nutricional'}
        </h2>
        <p className="font-mono text-[11px] text-ink-400 mt-0.5">
          {lang === 'en'
            ? 'Correction protocol based on diagnosis'
            : 'Protocolo de correção baseado na diagnose'}
        </p>
      </div>

      {error ? (
        <div className="bg-white border border-danger-600 rounded-card p-5 shadow-card text-center space-y-3">
          <p className="text-2xl">⚠️</p>
          <p className="font-mono text-xs text-danger-600">{error}</p>
          <Button onClick={generate} fullWidth>🔄 {lang === 'en' ? 'Try again' : 'Tentar novamente'}</Button>
        </div>
      ) : isLoading ? (
        <div className="bg-white border border-surface-border rounded-card shadow-card">
          <LoadingLaudo
            title={lang === 'en' ? 'Generating correction protocol...' : 'Gerando protocolo de correção...'}
            subtitle={lang === 'en' ? 'Analyzing deficiencies' : 'Analisando deficiências'}
            steps={loadingSteps}
          />
        </div>
      ) : correcaoHtml ? (
        <LaudoView
          title={`💊 ${lang === 'en' ? 'Nutritional Correction' : 'Correção Nutricional'} — ${(data.cultura || '').toUpperCase()}`}
          subtitle={`${data.prodNome} · ${data.prodCidade} · ${lang === 'en' ? 'Stage' : 'Estádio'} ${data.estadio}`}
          badge="📚 Marschner (2012) · Taiz & Zeiger (2017) · Embrapa"
          html={correcaoHtml}
        />
      ) : null}
    </>
  )
}
