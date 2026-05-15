import { useState, useEffect } from 'react'
import { useWizard } from '../../hooks/useWizard'
import { useLanguage } from '../../contexts/LanguageContext'
import { callClaude } from '../../services/api'
import {
  buildDiagnoseOption01Prompt,
  buildDiagnoseOption02Prompt,
  buildDiagnoseOption03Prompt,
} from '../../services/prompts'
import LaudoView from '../../components/LaudoView'
import Button from '../../components/ui/Button'
import Spinner from '../../components/ui/Spinner'

export default function StepDiagnose() {
  const { data, update, laudoDiagnoseHtml, setDiagnoseHtml } = useWizard()
  const { t, lang } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const hasSoloData = Object.keys(data).some(k => k.endsWith('Solo') && data[k])
  const hasFoliarData = Object.keys(data).some(k => k.endsWith('Foliar') && data[k])
  const hasPhoto = !!data.fotoB64

  // Auto-select available options when arriving at this step
  useEffect(() => {
    if ((data.diagnoseOptions || []).length > 0) return
    const auto = []
    if (hasSoloData && hasFoliarData && hasPhoto) auto.push('01')
    auto.push('02')
    if (hasSoloData && hasFoliarData) auto.push('03')
    update({ diagnoseOptions: auto })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const options = [
    {
      id: '01',
      icon: '🔬',
      label: lang === 'en' ? 'Deficiency/Toxicity Diagnosis' : 'Diagnose de Deficiência/Toxidez',
      desc: lang === 'en'
        ? 'Requires soil + foliar + photo'
        : 'Requer solo + foliar + foto',
      enabled: hasSoloData && hasFoliarData && hasPhoto,
      missing: [
        !hasSoloData  && (lang === 'en' ? 'soil analysis' : 'análise de solo'),
        !hasFoliarData && (lang === 'en' ? 'foliar analysis' : 'análise foliar'),
        !hasPhoto      && (lang === 'en' ? 'plant photo' : 'foto da planta'),
      ].filter(Boolean),
    },
    {
      id: '02',
      icon: '🧬',
      label: lang === 'en' ? 'Hormonal Map' : 'Mapa Hormonal',
      desc: lang === 'en' ? 'Always available' : 'Sempre disponível',
      enabled: true,
      missing: [],
    },
    {
      id: '03',
      icon: '🗺️',
      label: lang === 'en' ? 'Nutritional Map' : 'Mapa Nutricional',
      desc: lang === 'en'
        ? 'Requires soil + foliar'
        : 'Requer solo + foliar',
      enabled: hasSoloData && hasFoliarData,
      missing: [
        !hasSoloData   && (lang === 'en' ? 'soil analysis' : 'análise de solo'),
        !hasFoliarData && (lang === 'en' ? 'foliar analysis' : 'análise foliar'),
      ].filter(Boolean),
    },
  ]

  function toggleOption(id) {
    const current = data.diagnoseOptions || []
    const next = current.includes(id)
      ? current.filter(o => o !== id)
      : [...current, id]
    update({ diagnoseOptions: next })
  }

  async function handleGenerate() {
    const selected = data.diagnoseOptions || []
    if (selected.length === 0) return
    setError(null)
    setLoading(true)
    setDiagnoseHtml('__loading__')
    try {
      const promises = selected.map(id => {
        if (id === '01') return callClaude(buildDiagnoseOption01Prompt(data, t.promptLang), data.fotoB64 || null, 4000)
        if (id === '02') return callClaude(buildDiagnoseOption02Prompt(data, t.promptLang), null, 4000)
        if (id === '03') return callClaude(buildDiagnoseOption03Prompt(data, t.promptLang), null, 4000)
        return Promise.resolve('')
      })
      const results = await Promise.all(promises)
      const combined = results.join('')
      if (!combined.trim()) {
        throw new Error(lang === 'en' ? 'No content was generated. Please try again.' : 'Nenhum conteúdo foi gerado. Tente novamente.')
      }
      setDiagnoseHtml(combined)
    } catch (e) {
      setDiagnoseHtml(null)
      setError(e.message || String(e) || (lang === 'en' ? 'Unknown error' : 'Erro desconhecido'))
    } finally {
      setLoading(false)
    }
  }

  const isLoading = loading || laudoDiagnoseHtml === '__loading__'
  const selected = data.diagnoseOptions || []
  const hasResult = laudoDiagnoseHtml && laudoDiagnoseHtml !== '__loading__'

  return (
    <>
      <div className="mb-4">
        <h2 className="font-display font-bold text-xl text-brand-900">
          {lang === 'en' ? '🔬 Physiological Diagnosis' : '🔬 Diagnose Fisiológica'}
        </h2>
        <p className="font-mono text-[11px] text-ink-400 mt-0.5">
          {lang === 'en'
            ? 'Select the analyses you want to generate'
            : 'Selecione as análises que deseja gerar'}
        </p>
      </div>

      {!hasResult && (
        <>
          <div className="space-y-3 mb-4">
            {options.map(opt => {
              const isSelected = selected.includes(opt.id)
              return (
                <button
                  key={opt.id}
                  onClick={() => opt.enabled && toggleOption(opt.id)}
                  disabled={!opt.enabled || isLoading}
                  className={`w-full text-left p-4 rounded-card border-2 transition-all
                    ${isSelected
                      ? 'border-brand-900 bg-brand-50'
                      : opt.enabled
                        ? 'border-surface-border bg-white hover:border-brand-700'
                        : 'border-surface-border bg-ink-50 opacity-60 cursor-not-allowed'}
                  `}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0
                      ${isSelected ? 'border-brand-900 bg-brand-900' : 'border-ink-300'}`}>
                      {isSelected && <span className="text-white text-[10px] font-bold">✓</span>}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-lg">{opt.icon}</span>
                        <span className="font-display font-bold text-sm text-brand-900">{opt.label}</span>
                      </div>
                      <p className="font-mono text-[11px] text-ink-400 mt-0.5">{opt.desc}</p>
                      {opt.missing.length > 0 && (
                        <p className="font-mono text-[10px] text-danger-600 mt-1">
                          {lang === 'en' ? 'Missing: ' : 'Faltando: '}{opt.missing.join(', ')}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {error && (
            <div className="mb-3 bg-white border border-danger-600 rounded-card p-4 shadow-card text-center space-y-2">
              <p className="text-2xl">⚠️</p>
              <p className="font-mono text-xs text-danger-600">{error}</p>
              <Button onClick={handleGenerate} disabled={selected.length === 0} fullWidth>
                🔄 {lang === 'en' ? 'Try again' : 'Tentar novamente'}
              </Button>
            </div>
          )}

          {isLoading ? (
            <div className="flex items-center gap-3 p-4 bg-brand-50 rounded-card border border-brand-400">
              <Spinner size="sm" />
              <div>
                <p className="font-mono text-xs font-semibold text-brand-900">
                  {lang === 'en' ? 'Generating diagnosis...' : 'Gerando diagnose...'}
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
              {lang === 'en' ? '⚡ Generate Diagnosis' : '⚡ Gerar Diagnose'}
            </Button>
          )}
        </>
      )}

      {hasResult && (
        <>
          <LaudoView
            title={`📊 ${lang === 'en' ? 'Physiological Diagnosis' : 'Diagnose Fisiológica'} — ${(data.cultura || '').toUpperCase()}`}
            subtitle={`${data.prodNome} · ${data.prodCidade} · ${lang === 'en' ? 'Stage' : 'Estádio'} ${data.estadio}`}
            badge="📚 Marschner (2012) · Taiz & Zeiger (2017) · Kerbauy · Embrapa"
            html={laudoDiagnoseHtml}
          />
          <div className="mt-3">
            <button
              onClick={() => setDiagnoseHtml(null)}
              className="font-mono text-[11px] text-brand-700 underline"
            >
              {lang === 'en' ? '↩ Redo diagnosis' : '↩ Refazer diagnose'}
            </button>
          </div>
        </>
      )}
    </>
  )
}
