import Spinner from './Spinner'

const base = 'inline-flex items-center justify-center gap-1.5 font-display font-bold rounded-sm transition-all cursor-pointer border-none'

const variants = {
  primary: 'bg-brand-900 text-white hover:bg-brand-700 disabled:bg-ink-400 disabled:cursor-not-allowed',
  outline: 'bg-transparent border-[1.5px] border-surface-border text-ink-600 hover:border-ink-400',
  green:   'bg-brand-700 text-white hover:bg-brand-900',
  danger:  'bg-danger-600 text-white hover:opacity-90',
  whatsapp:'bg-[#25D366] text-white hover:opacity-90',
}

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-3 text-sm',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  type = 'button',
  onClick,
  className = '',
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {loading ? <Spinner size="sm" /> : children}
    </button>
  )
}
