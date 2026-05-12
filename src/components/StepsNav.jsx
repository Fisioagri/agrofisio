import { useWizard } from '../hooks/useWizard'
import { STEPS } from '../constants/wizard'

export default function StepsNav() {
  const { step, setStep } = useWizard()

  return (
    <nav className="bg-white border-b border-surface-border px-2 overflow-x-auto flex [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {STEPS.map(s => {
        const isActive = s.id === step
        const isDone   = s.id < step

        return (
          <button
            key={s.id}
            onClick={() => s.id < step && setStep(s.id)}
            className={`flex-shrink-0 px-2.5 py-2.5 font-mono text-[10px] border-b-2 flex items-center gap-1.5
              whitespace-nowrap transition-all cursor-pointer
              ${isActive ? 'text-brand-900 border-brand-700 font-medium' : ''}
              ${isDone   ? 'text-brand-400 border-transparent' : ''}
              ${!isActive && !isDone ? 'text-ink-400 border-transparent' : ''}`}
          >
            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold flex-shrink-0 transition-all
              ${isActive ? 'bg-brand-700 text-white' : ''}
              ${isDone   ? 'bg-brand-400 text-white' : ''}
              ${!isActive && !isDone ? 'bg-surface-border text-ink-400' : ''}`}>
              {s.id + 1}
            </span>
            {s.ico} {s.lbl}
          </button>
        )
      })}
    </nav>
  )
}
