import { useNavigate } from 'react-router-dom'
import { useWizard } from '../hooks/useWizard'
import { useLanguage } from '../contexts/LanguageContext'
import { STEPS } from '../constants/wizard'

function canProceed(step, data) {
  if (step === 0) return data.prodNome?.trim() && data.prodCidade?.trim() && data.prodExpect?.trim()
  if (step === 1) return data.cultura && data.safra?.trim() && data.dataPlantio && data.hibrido?.trim() && data.adubacao?.trim()
  if (step === 4) return data.fotoB64 && data.estadio
  if (step === 6) return data.objetivos?.length > 0
  return true
}

function shareReport(data, laudoFinalHtml, shareTitle) {
  const text = laudoFinalHtml
    ? laudoFinalHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    : 'Laudo gerado pelo AgroFísio v4.0'

  const msg = `🌱 PROTOCOLO FISIOLÓGICO — ${(data.cultura || '').toUpperCase()}\n\n` +
    `Produtor: ${data.prodNome} | ${data.prodCidade}\n` +
    `Safra: ${data.safra} | Estádio: ${data.estadio}\n` +
    `Expectativa: ${data.prodExpect} sc/ha\n\n${text}\n\n— AgroFísio v4.0`

  if (navigator.share) {
    navigator.share({ title: shareTitle, text: msg }).catch(() => {})
  } else {
    navigator.clipboard.writeText(msg)
      .then(() => alert('Laudo copiado! Cole no WhatsApp ou onde preferir.'))
      .catch(() => alert('Use o botão de copiar do seu navegador.'))
  }
}

export default function BottomNav() {
  const { step, setStep, data, laudoFinalHtml, reset } = useWizard()
  const { t } = useLanguage()
  const navigate = useNavigate()
  const ok = canProceed(step, data)

  const base = 'flex-1 py-3 px-5 rounded-sm font-display font-bold text-sm flex items-center justify-center gap-1.5 transition-all'

  if (step === 5) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-surface-border p-3 flex gap-2.5 max-w-2xl mx-auto z-50">
        <button onClick={() => setStep(4)} className={`${base} bg-transparent border-[1.5px] border-surface-border text-ink-600`}>
          {t.common.back}
        </button>
        <button onClick={() => setStep(6)} className={`${base} bg-brand-900 text-white hover:bg-brand-700`}>
          {t.bottomNav.objectives}
        </button>
      </div>
    )
  }

  if (step === 7) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-surface-border p-3 flex gap-2.5 max-w-2xl mx-auto z-50">
        <button
          onClick={() => { reset(); navigate('/') }}
          className={`${base} bg-transparent border-[1.5px] border-surface-border text-ink-600`}
        >
          {t.bottomNav.newAnalysis}
        </button>
        <button
          onClick={() => shareReport(data, laudoFinalHtml, 'AgroFísio Report')}
          className={`${base} bg-[#25D366] text-white hover:opacity-90`}
        >
          {t.bottomNav.share}
        </button>
      </div>
    )
  }

  const nextLabel =
    step === 4 ? t.bottomNav.generateDiagnose :
    step === 6 ? t.bottomNav.generateReport :
    t.common.next

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-surface-border p-3 flex gap-2.5 max-w-2xl mx-auto z-50">
      {step > 0 && (
        <button onClick={() => setStep(step - 1)} className={`${base} bg-transparent border-[1.5px] border-surface-border text-ink-600`}>
          {t.common.back}
        </button>
      )}
      <button
        onClick={() => ok && setStep(step + 1)}
        disabled={!ok}
        className={`${base} bg-brand-900 text-white hover:bg-brand-700 disabled:bg-ink-400 disabled:cursor-not-allowed`}
      >
        {nextLabel}
      </button>
    </div>
  )
}
