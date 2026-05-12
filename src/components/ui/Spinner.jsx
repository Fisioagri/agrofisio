const sizes = {
  sm: 'w-5 h-5 border-2',
  md: 'w-8 h-8 border-3',
  lg: 'w-11 h-11 border-4',
}

export default function Spinner({ size = 'md' }) {
  return (
    <div
      className={`${sizes[size]} border-brand-100 border-t-brand-700 rounded-full animate-spin`}
    />
  )
}
