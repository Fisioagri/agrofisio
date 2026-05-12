import { OBJETIVOS_DEF } from '../constants/wizard'

export default function ObjectivesGrid({ estadio, selected, onChange }) {
  function toggle(id) {
    const next = selected.includes(id)
      ? selected.filter(x => x !== id)
      : [...selected, id]
    onChange(next)
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      {OBJETIVOS_DEF.map(o => {
        const available = o.fases.length === 0 || o.fases.includes(estadio) || !estadio
        const isSel = selected.includes(o.id)
        const phaseLabel = o.fases.length === 0 ? 'Todo o ciclo' : `${o.fases[0]}→${o.fases[o.fases.length - 1]}`

        return (
          <button
            key={o.id}
            type="button"
            onClick={() => available && toggle(o.id)}
            disabled={!available}
            className={`p-3 border-2 rounded-sm text-left transition-all
              ${isSel    ? 'border-brand-700 bg-brand-100' : 'border-surface-border bg-surface-input'}
              ${!available ? 'opacity-35 cursor-not-allowed' : 'cursor-pointer hover:border-ink-400'}`}
          >
            <div className={`font-display text-xs font-bold ${isSel ? 'text-brand-900' : 'text-ink-900'}`}>
              {o.t}
            </div>
            <div className="font-mono text-[10px] text-ink-400 mt-0.5">{o.d}</div>
            <span className={`inline-block mt-1 font-mono text-[9px] px-1.5 py-0.5 rounded
              ${isSel ? 'bg-brand-700/15 text-brand-700' : 'bg-surface-border text-ink-400'}`}>
              {phaseLabel}
            </span>
          </button>
        )
      })}
    </div>
  )
}
