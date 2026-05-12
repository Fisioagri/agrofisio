export default function InfoBox({ children, variant = 'green' }) {
  const styles = {
    green: 'bg-brand-100 border-brand-400 text-brand-900',
    amber: 'bg-amber-50 border-amber-600 text-amber-600',
    red:   'bg-danger-50 border-danger-600 text-danger-600',
  }
  return (
    <div className={`${styles[variant]} border rounded-sm px-3 py-2.5 font-mono text-xs mb-2.5 leading-relaxed`}>
      {children}
    </div>
  )
}
