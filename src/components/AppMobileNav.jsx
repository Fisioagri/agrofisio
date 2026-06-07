import { Link, useLocation } from 'react-router-dom'

const TABS = [
  { to: '/',           icon: '🏠', label: 'Home' },
  { to: '/produtores', icon: '👤', label: 'Produtores' },
  { to: '/talhoes',    icon: '🗺️', label: 'Talhões' },
  { to: '/wizard',     icon: '🔬', label: 'Análise' },
  // estoque oculto temporariamente — reativar quando pronto
  // { to: '/estoque', icon: '📦', label: 'Estoque' },
]

export default function AppMobileNav() {
  const { pathname } = useLocation()
  const isActive = (to) => to === '/' ? pathname === '/' : pathname.startsWith(to)

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-surface-border z-40 flex safe-area-pb">
      {TABS.map(tab => {
        const active = isActive(tab.to)
        return (
          <Link
            key={tab.to}
            to={tab.to}
            className={`flex-1 py-2.5 flex flex-col items-center gap-0.5 transition-colors
              ${active ? 'text-brand-900' : 'text-ink-400'}`}
          >
            <span className="text-[18px] leading-none">{tab.icon}</span>
            <span className={`font-mono text-[9px] ${active ? 'font-bold' : ''}`}>{tab.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
