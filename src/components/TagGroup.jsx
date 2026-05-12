export default function TagGroup({ tags, selected, onChange }) {
  function toggle(tag) {
    const next = selected.includes(tag)
      ? selected.filter(t => t !== tag)
      : [...selected, tag]
    onChange(next)
  }

  return (
    <div className="flex flex-wrap gap-1.5 mt-1.5">
      {tags.map(tag => (
        <button
          key={tag}
          type="button"
          onClick={() => toggle(tag)}
          className={`px-2.5 py-1.5 border-[1.5px] rounded-xl font-mono text-[11px] transition-all
            ${selected.includes(tag)
              ? 'bg-brand-100 border-brand-700 text-brand-900 font-semibold'
              : 'bg-white border-surface-border text-ink-600 hover:border-ink-400'}`}
        >
          {tag}
        </button>
      ))}
    </div>
  )
}
