export default function NutrientsGrid({ fields, values, onChange }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {fields.map(f => {
        const val = values[f.id]
        const num = val !== '' && val !== undefined ? parseFloat(val) : null
        const hasError = num !== null && !isNaN(num) && (
          (f.min !== undefined && num < f.min) ||
          (f.max !== undefined && num > f.max)
        )
        return (
          <div
            key={f.id}
            className={`border rounded-sm px-3 py-2.5 bg-surface-input transition-colors
              ${hasError ? 'border-danger-400 bg-red-50' : 'border-surface-border'}`}
          >
            <div className="font-mono text-[11px] font-bold text-ink-600 mb-1 flex items-center justify-between">
              <span>{f.label}</span>
              {hasError && <span className="text-danger-500 text-[10px]">fora do intervalo</span>}
            </div>
            <input
              type="number"
              step={f.step || 'any'}
              min={f.min}
              max={f.max}
              placeholder={f.placeholder}
              value={val || ''}
              onChange={e => onChange(f.id, e.target.value)}
              className="w-full border-none bg-transparent text-sm text-ink-900 outline-none font-sans"
            />
          </div>
        )
      })}
    </div>
  )
}
