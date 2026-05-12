import { PHENO } from '../constants/wizard'

export default function PhenoSelector({ cultura, value, onChange }) {
  const stages = PHENO[cultura] || PHENO.soja

  return (
    <div className="flex flex-wrap gap-1.5">
      {stages.map(p => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          className={`px-2.5 py-1.5 border-[1.5px] rounded font-mono text-[11px] transition-all
            ${value === p
              ? 'bg-amber-50 border-amber-600 text-amber-600 font-semibold'
              : 'bg-white border-surface-border text-ink-600 hover:border-ink-400'}`}
        >
          {p}
        </button>
      ))}
    </div>
  )
}
