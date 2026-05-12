import { useLanguage } from '../contexts/LanguageContext'

export default function BoolSelect({ value, onChange, children }) {
  const { t } = useLanguage()

  return (
    <div>
      <div className="flex gap-2.5">
        <button
          type="button"
          onClick={() => onChange(true)}
          className={`flex-1 py-3 border-2 rounded-sm text-center font-bold text-sm transition-all
            ${value === true
              ? 'border-brand-700 bg-brand-100 text-brand-900'
              : 'border-surface-border bg-surface-input text-ink-600'}`}
        >
          {t.boolSelect.yes}
        </button>
        <button
          type="button"
          onClick={() => onChange(false)}
          className={`flex-1 py-3 border-2 rounded-sm text-center font-bold text-sm transition-all
            ${value === false
              ? 'border-danger-600 bg-danger-50 text-danger-600'
              : 'border-surface-border bg-surface-input text-ink-600'}`}
        >
          {t.boolSelect.no}
        </button>
      </div>
      {value === true && children && (
        <div className="mt-3">{children}</div>
      )}
    </div>
  )
}
