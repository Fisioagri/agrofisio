export default function Card({ title, children, className = '' }) {
  return (
    <div className={`bg-white border border-surface-border rounded-card shadow-card p-4 mb-2.5 ${className}`}>
      {title && (
        <div className="font-display text-xs font-bold text-ink-600 uppercase tracking-[0.8px] mb-3 flex items-center gap-1.5">
          {title}
        </div>
      )}
      {children}
    </div>
  )
}
