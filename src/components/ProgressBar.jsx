import { useWizard } from '../hooks/useWizard'
import { STEPS } from '../constants/wizard'

export default function ProgressBar() {
  const { step } = useWizard()
  const pct = (step / (STEPS.length - 1)) * 100

  return (
    <div className="h-[3px] bg-white/15 relative">
      <div
        className="h-full bg-brand-400 transition-[width] duration-400 ease-in-out rounded-r-sm"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
