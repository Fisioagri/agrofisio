import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { useSignOut } from '../hooks/useSignOut'

function Icon({ path, path2, size = 16 }) {
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
    to: '/wizard',
    key: 'analise',
    icon: 'M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5',
  },
  {
    to: '/estoque',
    key: 'estoque',
    icon: 'M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z',
  },
  {
    to: '/financeiro',
    key: 'financeiro',
    icon: 'M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
]

const SETTINGS_ICON = 'M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z'
const SETTINGS_ICON2 = 'M15 12a3 3 0 11-6 0 3 3 0 016 0z'
const LOGOUT_ICON = 'M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75'

export default function Sidebar() {
  const { lang, setLang, t } = useLanguage()
  const { pathname } = useLocation()
  const signOut = useSignOut()

  const isActive = (to) => to === '/' ? pathname === '/' : pathname.startsWith(to)

  return (
    <aside className="
      w-14 md:w-[220px] flex-shrink-0 h-screen sticky top-0
      bg-brand-900 md:bg-white md:border-r md:border-surface-border
      flex flex-col z-40 overflow-hidden
    ">
      {/* Logo */}
      <div className="bg-brand-900 flex items-center gap-2.5 px-3 md:px-4 py-4 md:py-5 flex-shrink-0">
        <div className="w-8 h-8 bg-brand-700 rounded-lg flex items-center justify-center text-base flex-shrink-0">
          🌱
        </div>
        <div className="hidden md:block min-w-0">
          <div className="font-display font-extrabold text-white text-sm leading-tight">AgroFísio</div>
          <div className="font-mono text-[9px] text-brand-400 mt-0.5">Plataforma Agrícola</div>
        </div>
      </div>

      {/* Nav principal */}
      <nav className="flex-1 py-3 px-1.5 md:px-2 space-y-0.5 overflow-y-auto">
        {NAV_ROUTES.map(item => {
          const active = isActive(item.to)
          return (
            <motion.div key={item.to} whileHover={{ x: active ? 0 : 2 }} transition={{ duration: 0.12 }}>
              <Link
                to={item.to}
                title={t.nav[item.key]}
                className={[
                  'flex items-center justify-center md:justify-start gap-2.5 px-2 md:px-3 py-2.5 rounded-lg text-[11px] font-mono transition-colors',
                  active
                    ? 'bg-white/20 text-white md:bg-brand-50 md:text-brand-900 md:font-medium md:border-l-[3px] md:border-brand-900 md:pl-[9px]'
                    : 'text-white/60 md:text-ink-400 hover:bg-white/10 md:hover:bg-surface-bg md:hover:text-ink-600',
                ].join(' ')}
              >
                <Icon path={item.icon} size={17} />
                <span className="hidden md:block">{t.nav[item.key]}</span>
              </Link>
            </motion.div>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-white/10 md:border-surface-border px-1.5 md:px-2 py-2 space-y-0.5 flex-shrink-0">
        <Link
          to="/settings"
          title={t.nav.settings}
          className={[
            'flex items-center justify-center md:justify-start gap-2.5 px-2 md:px-3 py-2 rounded-lg text-[11px] font-mono transition-colors',
            pathname === '/settings'
              ? 'bg-white/20 text-white md:bg-brand-50 md:text-brand-900'
              : 'text-white/60 md:text-ink-400 hover:bg-white/10 md:hover:bg-surface-bg md:hover:text-ink-600',
          ].join(' ')}
        >
          <Icon path={SETTINGS_ICON} path2={SETTINGS_ICON2} size={17} />
          <span className="hidden md:block">{t.nav.settings}</span>
        </Link>

        {/* Language toggle */}
        <div className="flex items-center justify-center md:justify-start gap-1.5 px-2 md:px-3 py-1.5">
          <span className="hidden md:block font-mono text-[10px] text-ink-300 flex-1">
            {lang === 'pt' ? 'Idioma' : 'Language'}
          </span>
          <button
            onClick={() => setLang('pt')}
            title="Português"
            className={`text-base leading-none transition-opacity ${lang === 'pt' ? 'opacity-100' : 'opacity-30 hover:opacity-60'}`}
          >🇧🇷</button>
          <button
            onClick={() => setLang('en')}
            title="English"
            className={`text-base leading-none transition-opacity ${lang === 'en' ? 'opacity-100' : 'opacity-30 hover:opacity-60'}`}
          >🇺🇸</button>
        </div>

        <button
          onClick={signOut}
          title={t.nav.logout}
          className="w-full flex items-center justify-center md:justify-start gap-2.5 px-2 md:px-3 py-2 rounded-lg text-[11px] font-mono text-white/50 md:text-ink-400 hover:bg-red-500/20 md:hover:bg-danger-50 hover:text-white md:hover:text-danger-600 transition-colors"
        >
          <Icon path={LOGOUT_ICON} size={17} />
          <span className="hidden md:block">{t.nav.logout}</span>
        </button>
      </div>
    </aside>
  )
}
