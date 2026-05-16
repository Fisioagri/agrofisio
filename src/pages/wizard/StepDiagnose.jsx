import { useState, useEffect } from 'react'
import { useWizard } from '../../hooks/useWizard'
import { useLanguage } from '../../contexts/LanguageContext'
import { callClaude } from '../../services/api'
import {
  buildDiagnoseOption01Prompt,
  buildDiagnoseOption02Prompt,
} from '../../services/prompts'
import LaudoView from '../../components/LaudoView'
import LoadingLaudo from '../../components/LoadingLaudo'
import Button from '../../components/ui/Button'

export default function StepDiagnose() {
  const { data, update, laudoDiagnoseHtml, setDiagnoseHtml } = useWizard()
  const { t, lang } = useLanguage()
  const en = lang === 'en'
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const hasSoloData   = Object.keys(data).some(k => k.endsWith('Solo')   && data[k])
  const hasFoliarData = Object.keys(data).some(k => k.endsWith('Foliar') && data[k])
  const hasPhoto      = !!data.fotoB64

  // Auto-select all available options on first arrival
  useEffect(() => {
    if ((data.diagnoseOptions || []).length > 0) return
    const auto = []
    if (hasSoloData && hasFoliarData && hasPhoto) auto.push('01')
    auto.push('02')
    update({ diagnoseOptions: auto })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const OPTIONS = [
    {
      id: '01',
      icon: '🔬',
      label:   en ? 'Deficiency / Toxicity'    : 'Deficiência / Toxidez',
      desc:    en ? 'Compares measured values to crop references. Identifies nutritional deficiencies and visual correlations.'
                  : 'Compara valores medidos com referências da cultura. Identifica deficiências nutricionais e correlações visuais.',
      badge:   en ? 'Soil + Foliar + Photo'     : 'Solo + Foliar + Foto',
      enabled: hasSoloData && hasFoliarData && hasPhoto,
      missing: [
        !hasSoloData   && (en ? 'soil analysis'   : 'análise de solo'),
        !hasFoliarData && (en ? 'foliar analysis'  : 'análise foliar'),
        !hasPhoto      && (en ? 'plant photo'      : 'foto da planta'),
      ].filter(Boolean),
    },
    {
      id: '02',
      icon: '🧬',
      label:   en ? 'Hormonal Map'              : 'Mapa Hormonal',
      desc:    en ? 'Maps current hormonal status (Auxin, Cytokinin, Gibberellin, Ethylene, ABA, Brassinosteroid) and management implications.'
                  : 'Mapeia o status hormonal atual (Auxina, Citocinina, Giberelina, Etileno, ABA, Brassinoesteroide) e implicações de manejo.',
      badge:   en ? 'Always available'           : 'Sempre disponível',
      enabled: true,
      missing: [],
    },
  ]

  function toggleOption(id) {
    const cur  = data.diagnoseOptions || []
    const next = cur.includes(id) ? cur.filter(o => o !== id) : [...cur, id]
    update({ diagnoseOptions: next })
  }

  async function handleGenerate() {
    const selected = data.diagnoseOptions || []
    if (selected.length === 0) return
    setError(null)
    setLoading(true)
    setDiagnoseHtml('__loading__')
    try {
      const promises = selected.map(async id => {
        if (id === '01') return callClaude(await buildDiagnoseOption01Prompt(data, t.promptLang), data.fotoB64 || null, 4000)
        if (id === '02') return callClaude(await buildDiagnoseOption02Prompt(data, t.promptLang), null, 4000)
        return ''
      })
      const results = await Promise.all(promises)
      const combined = results.join('')
      if (!combined.trim()) throw new Error(en ? 'No content was generated. Please try again.' : 'Nenhum conteúdo gerado. Tente novamente.')
      setDiagnoseHtml(combined)
    } catch (e) {
      setDiagnoseHtml(null)
      setError(e.message || String(e))
    } finally {
      setLoading(false)
    }
  }

  const selected   = data.diagnoseOptions || []
  const isLoading  = loading || laudoDiagnoseHtml === '__loading__'
  const hasResult  = !!laudoDiagnoseHtml && laudoDiagnoseHtml !== '__loading__'

  const loadingSteps = [
    { label: en ? 'Crop data loaded'          : 'Dados da lavoura carregados',     status: 'done' },
    { label: en ? 'Running selected analyses' : 'Executando análises selecionadas', status: 'current' },
    { label: en ? 'Comparing to references'   : 'Comparando com referências',       status: isLoading ? 'current' : 'done' },
    { label: en ? 'Building report'           : 'Montando laudo',                   status: isLoading ? 'pending' : 'done' },
  ]

  return (
    <>
      <div className="mb-4">
        <h2 className="font-display font-bold text-xl text-brand-900">
          {en ? '🔬 Physiological Diagnosis' : '🔬 Diagnose Fisiológica'}
        </h2>
        <p className="font-mono text-[11px] text-ink-400 mt-0.5">
          {en ? 'Select the analyses to generate' : 'Selecione as análises a gerar'}
        </p>
      </div>

      {!hasResult && (
        <>
          {/* Option cards */}
          <div className="space-y-3 mb-5">
            {OPTIONS.map(opt => {
              const isSel = selected.includes(opt.id)
              return (
                <button
                  key={opt.id}
                  onClick={() => opt.enabled && !isLoading && toggleOption(opt.id)}
                  disabled={!opt.enabled || isLoading}
                  className={[
                    'w-full text-left rounded-card border-2 transition-all overflow-hidden',
                    isSel && opt.enabled  ? 'border-brand-900 bg-brand-50 shadow-sm'   : '',
                    !isSel && opt.enabled ? 'border-surface-border bg-white hover:border-brand-700 hover:shadow-sm' : '',
                    !opt.enabled          ? 'border-surface-border bg-surface-bg opacity-50 cursor-not-allowed' : '',
                  ].join(' ')}
                >
                  {/* Coloured top strip when selected */}
                  {isSel && opt.enabled && (
                    <div className="h-1 bg-brand-900 w-full" />
                  )}
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      {/* Checkbox */}
                      <div className={[
                        'mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors',
                        isSel && opt.enabled ? 'border-brand-900 bg-brand-900' : 'border-ink-300',
                      ].join(' ')}>
                        {isSel && opt.enabled && (
                          <span className="text-white text-[10px] font-bold leading-none">✓</span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        {/* Header row */}
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <div className="flex items-center gap-1.5">
                            <span className="text-lg leading-none">{opt.icon}</span>
                            <span className="font-display font-bold text-sm text-brand-900">{opt.label}</span>
                          </div>
                          <span className={[
                            'font-mono text-[9px] px-2 py-0.5 rounded-full border flex-shrink-0',
                            opt.enabled
                              ? 'bg-brand-100 border-brand-400 text-brand-900'
                              : 'bg-surface-bg border-surface-border text-ink-400',
                          ].join(' ')}>
                            {opt.badge}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="font-mono text-[11px] text-ink-500 mt-1.5 leading-relaxed">
                          {opt.desc}
                        </p>

                        {/* Missing data */}
                        {opt.missing.length > 0 && (
                          <p className="font-mono text-[10px] text-danger-600 mt-1.5 flex items-center gap-1">
                            <span>⚠</span>
                            {en ? 'Missing: ' : 'Faltando: '}
                            {opt.missing.join(', ')}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Selected summary badge */}
          {selected.length > 0 && !isLoading && (
            <div className="mb-3 flex items-center gap-2 bg-brand-50 border border-brand-400 rounded-sm px-3 py-2">
              <span className="text-brand-900 text-sm">✓</span>
              <p className="font-mono text-[11px] text-brand-900">
                {selected.length === 1
                  ? (en ? '1 analysis selected' : '1 análise selecionada')
                  : (en ? `${selected.length} analyses selected` : `${selected.length} análises selecionadas`)}
                {' — '}
                {selected.map(id => OPTIONS.find(o => o.id === id)?.label).join(' + ')}
              </p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mb-3 bg-white border border-danger-600 rounded-card p-4 shadow-card text-center space-y-2">
              <p className="text-2xl">⚠️</p>
              <p className="font-mono text-xs text-danger-600">{error}</p>
              <Button onClick={handleGenerate} disabled={selected.length === 0} fullWidth>
                🔄 {en ? 'Try again' : 'Tentar novamente'}
              </Button>
            </div>
          )}

          {/* Loading */}
          {isLoading ? (
            <div className="bg-white border border-surface-border rounded-card shadow-card">
              <LoadingLaudo
                title={en ? 'Generating diagnosis...' : 'Gerando diagnose...'}
                subtitle={en ? `Running ${selected.length} analysis${selected.length > 1 ? 'es' : ''}` : `Executando ${selected.length} análise${selected.length > 1 ? 's' : ''}`}
                steps={loadingSteps}
              />
            </div>
          ) : (
            !error && (
              <Button
                onClick={handleGenerate}
                disabled={selected.length === 0}
                fullWidth
              >
                ⚡ {en ? 'Generate Diagnosis' : 'Gerar Diagnose'}
              </Button>
            )
          )}
        </>
      )}

      {/* Result */}
      {hasResult && (
        <>
          <LaudoView
            title={`📊 ${en ? 'Physiological Diagnosis' : 'Diagnose Fisiológica'} — ${(data.cultura || '').toUpperCase()}`}
            subtitle={`${data.prodNome} · ${data.prodCidade} · ${en ? 'Stage' : 'Estádio'} ${data.estadio}`}
            badge="📚 Marschner (2012) · Taiz & Zeiger (2017) · Embrapa · Bataglia et al. (2004)"
            html={laudoDiagnoseHtml}
          />
          <div className="mt-3">
            <button
              onClick={() => setDiagnoseHtml(null)}
              className="font-mono text-[11px] text-brand-700 underline"
            >
              {en ? '↩ Redo diagnosis' : '↩ Refazer diagnose'}
            </button>
          </div>
        </>
      )}
    </>
  )
}
