import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { useSignOut } from '../hooks/useSignOut'
import { useAuth } from '../hooks/useAuth'

function Icon({ path, path2, size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      className="flex-shrink-0">
      <path d={path} />
      {path2 && <path d={path2} />}
    </svg>
  )
}

const NAV_ROUTES = [
  {
    to: '/',
    key: 'home',
    icon: 'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25',
  },
  {
    to: '/produtores',
    key: 'produtores',
    icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z',
  },
  {
    to: '/talhoes',
    key: 'talhoes',
    icon: 'M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z',
  },
  {
    to: '/analise',
    key: 'analise',
    extraPaths: ['/wizard', '/laudos'],
    icon: 'M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5',
  },
  // estoque e financeiro ocultos temporariamente — dados preservados no banco
  // { to: '/estoque', key: 'estoque', adminOnly: true, icon: '...' },
  // { to: '/financeiro', key: 'financeiro', adminOnly: true, icon: '...' },
  {
    to: '/users',
    key: 'addUser',
    adminOnly: true,
    icon: 'M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z',
  },
]

const ICON_SETTINGS = {
  path: 'M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z',
  path2: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z',
}
const ICON_LOGOUT = 'M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75'

export default function Sidebar() {
  const { t } = useLanguage()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const signOut = useSignOut()
  const { isAdmin } = useAuth()
  const sidebarRef = useRef(null)

  // tip: { key, label, top, to } — positioned relative to the aside element
  const [tip, setTip] = useState(null)

  const visibleRoutes = NAV_ROUTES.filter(item => !item.adminOnly || isAdmin)

  const isActive = (item) => {
    if (item.to === '/') return pathname === '/'
    if (pathname.startsWith(item.to)) return true
    return item.extraPaths?.some(p => pathname.startsWith(p)) ?? false
  }

  // Dismiss tooltip when clicking/touching outside the sidebar
  useEffect(() => {
    function dismiss(e) {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setTip(null)
      }
    }
    document.addEventListener('mousedown', dismiss)
    document.addEventListener('touchstart', dismiss, { passive: true })
    return () => {
      document.removeEventListener('mousedown', dismiss)
      document.removeEventListener('touchstart', dismiss)
    }
  }, [])

  // Dismiss tooltip on route change
  useEffect(() => { setTip(null) }, [pathname])

  // Check if the sidebar is in icon-rail (narrow) mode by reading its actual rendered width
  const isIconRail = () => (sidebarRef.current?.offsetWidth ?? 999) < 100

  function handleNavClick(e, item) {
    e.preventDefault()
    if (!isIconRail()) {
      navigate(item.to)
      return
    }
    if (tip?.key === item.key) {
      // Second tap → navigate
      setTip(null)
      navigate(item.to)
    } else {
      // First tap → show label balloon
      const btnRect = e.currentTarget.getBoundingClientRect()
      const asideRect = sidebarRef.current.getBoundingClientRect()
      const top = btnRect.top - asideRect.top + btnRect.height / 2
      setTip({ key: item.key, label: t.nav[item.key], top, to: item.to })
    }
  }

  function handleBottomClick(e, key, to, label) {
    e.preventDefault()
    if (!isIconRail()) {
      navigate(to)
      return
    }
    if (tip?.key === key) {
      setTip(null)
      navigate(to)
    } else {
      const btnRect = e.currentTarget.getBoundingClientRect()
      const asideRect = sidebarRef.current.getBoundingClientRect()
      const top = btnRect.top - asideRect.top + btnRect.height / 2
      setTip({ key, label, top, to })
    }
  }

  return (
    <aside
      ref={sidebarRef}
      className="w-14 md:w-[220px] flex-shrink-0 h-screen sticky top-0 bg-brand-900 md:bg-white md:border-r md:border-surface-border flex flex-col z-40 relative"
    >
      {/* ── Logo + language ─────────────────────────── */}
      <div className="bg-brand-900 flex-shrink-0">
        {/* Mobile */}
        <div className="md:hidden flex flex-col items-center pt-3 pb-2 gap-2">
          <div className="w-8 h-8 bg-brand-700 rounded-lg flex items-center justify-center text-base">🌱</div>
        </div>
        {/* Desktop */}
        <div className="hidden md:flex items-center gap-2.5 px-4 py-4">
          <div className="w-8 h-8 bg-brand-700 rounded-lg flex items-center justify-center text-base flex-shrink-0">🌱</div>
          <div className="flex-1 min-w-0">
            <div className="font-display font-extrabold text-white text-sm leading-tight">AgroFísio</div>
            <div className="font-mono text-[9px] text-brand-400 mt-0.5">Plataforma Agrícola</div>
          </div>
        </div>
      </div>

      {/* ── Nav principal ───────────────────────────── */}
      <nav className="flex-1 py-3 px-1.5 md:px-2 space-y-0.5">
        {visibleRoutes.map(item => {
          const active = isActive(item)
          return (
            <motion.div key={item.to} whileHover={{ x: active ? 0 : 2 }} transition={{ duration: 0.12 }}>
              <button
                onClick={e => handleNavClick(e, item)}
                className={[
                  'w-full flex items-center justify-center md:justify-start gap-2.5 px-2 md:px-3 py-2.5 rounded-lg text-[11px] font-mono transition-colors',
                  active
                    ? 'bg-white/20 text-white md:bg-brand-50 md:text-brand-900 md:font-medium md:border-l-[3px] md:border-brand-900 md:pl-[9px]'
                    : 'text-white/60 md:text-ink-400 hover:bg-white/10 md:hover:bg-surface-bg md:hover:text-ink-600',
                ].join(' ')}
              >
                <Icon path={item.icon} />
                <span className="hidden md:block">{t.nav[item.key]}</span>
              </button>
            </motion.div>
          )
        })}
      </nav>

      {/* ── Bottom ──────────────────────────────────── */}
      <div className="border-t border-white/10 md:border-surface-border px-1.5 md:px-2 py-2 space-y-0.5 flex-shrink-0">
        <button
          onClick={e => handleBottomClick(e, '__settings', '/settings', t.nav.settings)}
          className={[
            'w-full flex items-center justify-center md:justify-start gap-2.5 px-2 md:px-3 py-2 rounded-lg text-[11px] font-mono transition-colors',
            pathname === '/settings'
              ? 'bg-white/20 text-white md:bg-brand-50 md:text-brand-900'
              : 'text-white/60 md:text-ink-400 hover:bg-white/10 md:hover:bg-surface-bg md:hover:text-ink-600',
          ].join(' ')}
        >
          <Icon path={ICON_SETTINGS.path} path2={ICON_SETTINGS.path2} />
          <span className="hidden md:block">{t.nav.settings}</span>
        </button>

        <button
          onClick={signOut}
          className="w-full flex items-center justify-center md:justify-start gap-2.5 px-2 md:px-3 py-2 rounded-lg text-[11px] font-mono text-white/50 md:text-ink-400 hover:bg-red-500/20 md:hover:bg-danger-50 hover:text-white md:hover:text-danger-600 transition-colors"
        >
          <Icon path={ICON_LOGOUT} />
          <span className="hidden md:block">{t.nav.logout}</span>
        </button>
      </div>

      {/* ── Floating tooltip (rendered at aside level, never clipped) ── */}
      <AnimatePresence>
        {tip && (
          <motion.button
            key={tip.key}
            initial={{ opacity: 0, x: -8, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -8, scale: 0.92 }}
            transition={{ duration: 0.15 }}
            style={{ top: tip.top }}
            onClick={() => { navigate(tip.to); setTip(null) }}
            className="md:hidden absolute left-full ml-3 -translate-y-1/2 z-[200]
              bg-brand-900 text-white font-mono text-sm font-semibold
              px-5 py-3 rounded-2xl whitespace-nowrap shadow-2xl
              border border-white/15 hover:bg-brand-700 active:scale-95
              transition-colors select-none cursor-pointer"
          >
            {/* Arrow pointing left */}
            <span className="absolute right-full top-1/2 -translate-y-1/2
              border-y-[6px] border-y-transparent border-r-[7px] border-r-brand-900 pointer-events-none" />
            {tip.label}
          </motion.button>
        )}
      </AnimatePresence>
    </aside>
  )
}
