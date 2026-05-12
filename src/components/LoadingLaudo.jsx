import Spinner from './ui/Spinner'

export default function LoadingLaudo({ title, subtitle, steps }) {
  return (
    <div className="text-center py-10 px-5">
      <Spinner size="lg" />
      <h3 className="font-display font-bold text-base text-brand-900 mt-4 mb-1">{title}</h3>
      <p className="font-mono text-xs text-ink-400">{subtitle}</p>
      {steps && (
        <div className="mt-4 text-left max-w-[280px] mx-auto space-y-1">
          {steps.map((s, i) => (
            <div key={i} className={`flex items-center gap-2 font-mono text-[11px]
              ${s.status === 'done' ? 'text-brand-700' : ''}
              ${s.status === 'current' ? 'text-brand-900 font-semibold' : ''}
              ${s.status === 'pending' ? 'text-ink-400' : ''}`}>
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0
                ${s.status === 'done'    ? 'bg-brand-700' : ''}
                ${s.status === 'current' ? 'bg-brand-900 animate-pulse' : ''}
                ${s.status === 'pending' ? 'bg-surface-border' : ''}`}
              />
              {s.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
