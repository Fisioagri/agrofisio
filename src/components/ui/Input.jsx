export default function Input({
  label,
  required,
  id,
  className = '',
  ...props
}) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="mb-3">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-bold text-ink-900 mb-1">
          {label} {required && <span className="text-danger-600">*</span>}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full px-3 py-2.5 border-[1.5px] border-surface-border rounded-sm text-sm font-sans
          text-ink-900 bg-surface-input focus:border-brand-700 focus:bg-white outline-none transition-colors ${className}`}
        {...props}
      />
    </div>
  )
}
