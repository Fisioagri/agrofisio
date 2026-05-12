export default function Modal({ open, onClose, title, children }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-t-2xl sm:rounded-card w-full max-w-sm mx-auto p-5 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold text-lg text-brand-900">{title}</h2>
          <button onClick={onClose} className="text-ink-400 hover:text-ink-900 text-xl leading-none">×</button>
        </div>
        {children}
      </div>
    </div>
  )
}
