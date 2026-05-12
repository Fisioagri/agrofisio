import { useLanguage } from '../contexts/LanguageContext'

const CROPS = [
  { id: 'soja',   ico: '🫘', key: 'soja'   },
  { id: 'milho',  ico: '🌽', key: 'milho'  },
  { id: 'feijao', ico: '🫛', key: 'feijao' },
]

export default function CropSelector({ value, onChange }) {
  const { t } = useLanguage()

  return (
    <div className="flex gap-2 flex-wrap">
      {CROPS.map(c => (
        <button
          key={c.id}
          type="button"
          onClick={() => onChange(c.id)}
          className={`flex-1 min-w-[80px] py-3 px-2 border-2 rounded-card text-center transition-all
            ${value === c.id
              ? 'border-brand-700 bg-brand-100'
              : 'border-surface-border bg-surface-input hover:border-ink-400'}`}
        >
          <span className="block text-2xl mb-1">{c.ico}</span>
          <span className={`font-mono text-[11px] font-bold ${value === c.id ? 'text-brand-900' : 'text-ink-600'}`}>
            {t.cultura[c.key]}
          </span>
        </button>
      ))}
    </div>
  )
}
