export default function LaudoView({ title, subtitle, badge, html }) {
  return (
    <div>
      <div className="bg-gradient-to-br from-brand-900 to-brand-700 rounded-card p-4 mb-2.5 text-white">
        <h2 className="font-display font-extrabold text-[19px] mb-0.5">{title}</h2>
        <p className="font-mono text-xs opacity-80">{subtitle}</p>
        {badge && (
          <span className="inline-block bg-white/15 border border-white/25 px-2.5 py-1 rounded-full
            font-mono text-[10px] mt-2">
            {badge}
          </span>
        )}
      </div>
      <div className="bg-white border border-surface-border rounded-card shadow-card p-4">
        <div
          className="laudo-body text-sm text-ink-900 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  )
}
