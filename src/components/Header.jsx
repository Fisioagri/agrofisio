import { useNavigate } from 'react-router-dom'
import { useWizard } from '../hooks/useWizard'
import { STEPS } from '../constants/wizard'

export default function Header() {
  const { step } = useWizard()
  const navigate = useNavigate()

  return (
    <header className="bg-brand-900 px-4 pt-3.5 pb-2.5 sticky top-0 z-50 flex items-center gap-2.5">
      <button
        onClick={() => navigate('/')}
        className="w-8 h-8 bg-brand-700 rounded-lg flex items-center justify-center text-base flex-shrink-0"
      >
        🌱
      </button>
      <div className="flex-1 min-w-0">
        <div className="font-display font-extrabold text-[17px] text-white leading-tight tracking-[-0.3px]">
          AgroFísio
        </div>
        <div className="font-mono text-[9px] text-brand-400 mt-0.5">
          protocolo de manejo fisiológico · v4.0
        </div>
      </div>
      <div className="font-mono text-[10px] text-brand-400 bg-white/10 px-2 py-1 rounded-full flex-shrink-0">
        {step + 1}/{STEPS.length}
      </div>
    </header>
  )
}
