import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { signOut } from '../services/authService'

const NAV = [
  { to: '/',        icon: '🏠', label: 'Dashboard' },
  { to: '/wizard',  icon: '🌱', label: 'Nova Análise' },
  { to: '/settings',icon: '⚙️', label: 'Configurações' },
]

export default function AppLayout({ children }) {
  const { isAdmin } = useAuth()
  const { pathname } = useLocation()

  return (
    <div className="min-h-screen bg-surface-bg flex flex-col">
      <header className="bg-brand-900 px-4 py-3 flex items-center gap-3 sticky top-0 z-50">
        <div className="w-8 h-8 bg-brand-700 rounded-lg flex items-center justify-center text-base flex-shrink-0">
          🌱
        </div>
        <div className="flex-1">
          <div className="font-display font-extrabold text-white text-base leading-tight">AgroFísio</div>
          <div className="font-mono text-[9px] text-brand-400 mt-0.5">protocolo de manejo fisiológico · v4.0</div>
        </div>
        <button
          onClick={signOut}
          className="font-mono text-[10px] text-brand-400 hover:text-white transition-colors"
        >
          sair
        </button>
      </header>

      <nav className="bg-white border-b border-surface-border flex px-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {[...NAV, ...(isAdmin ? [{ to: '/users', icon: '👥', label: 'Usuários' }] : [])].map(item => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex-shrink-0 px-3 py-2.5 font-mono text-[10px] flex items-center gap-1.5
              border-b-2 transition-all whitespace-nowrap
              ${pathname === item.to
                ? 'text-brand-900 border-brand-700 font-medium'
                : 'text-ink-400 border-transparent hover:text-ink-600'}`}
          >
            {item.icon} {item.label}
          </Link>
        ))}
      </nav>

      <main className="flex-1 p-4 max-w-2xl mx-auto w-full">
        {children}
      </main>
    </div>
  )
}
