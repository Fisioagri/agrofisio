export default function TabSwitcher({ tab, onChange, labels }) {
  const tabs = [
    { id: 'photo',  label: labels[0] },
    { id: 'manual', label: labels[1] },
  ]
  return (
    <div className="flex gap-1 bg-surface-border rounded-card p-1 mb-4">
      {tabs.map(t => (
        <button
          key={t.id}
          type="button"
          onClick={() => onChange(t.id)}
          className={`flex-1 py-2 rounded-sm font-mono text-xs transition-all
            ${tab === t.id ? 'bg-white shadow-sm text-brand-900 font-semibold' : 'text-ink-400 hover:text-ink-600'}`}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}
