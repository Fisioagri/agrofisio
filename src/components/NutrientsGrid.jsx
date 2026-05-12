export default function NutrientsGrid({ fields, values, onChange }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {fields.map(f => (
        <div key={f.id} className="border border-surface-border rounded-sm px-3 py-2.5 bg-surface-input">
          <div className="font-mono text-[11px] font-bold text-ink-600 mb-1">{f.label}</div>
          <input
            type="number"
            step={f.step || 'any'}
            placeholder={f.placeholder}
            value={values[f.id] || ''}
            onChange={e => onChange(f.id, e.target.value)}
            className="w-full border-none bg-transparent text-sm text-ink-900 outline-none font-sans"
          />
        </div>
      ))}
    </div>
  )
}
