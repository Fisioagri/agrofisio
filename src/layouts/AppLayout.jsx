import { useLanguage } from '../contexts/LanguageContext'
import { useSignOut } from '../hooks/useSignOut'
import Sidebar from '../components/Sidebar'
import AppMobileNav from '../components/AppMobileNav'

export default function AppLayout({ children }) {
  const { lang, setLang } = useLanguage()
  const signOut = useSignOut()

  return (
    <div className="min-h-screen bg-surface-bg flex">
      {/* Sidebar — desktop only */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Content column */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Mobile header */}
        <header className="md:hidden bg-brand-900 px-4 py-3 flex items-center gap-3 sticky top-0 z-50 flex-shrink-0">
          <div className="w-8 h-8 bg-brand-700 rounded-lg flex items-center justify-center text-base flex-shrink-0">🌱</div>
          <div className="flex-1">
            <div className="font-display font-extrabold text-white text-base leading-tight">AgroFísio</div>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setLang('pt')}
              className={`px-2 py-0.5 rounded font-mono text-[10px] transition-all
                ${lang === 'pt' ? 'bg-white text-brand-900 font-bold' : 'text-brand-400 hover:text-white'}`}
            >🇧🇷</button>
            <button
              onClick={() => setLang('en')}
              className={`px-2 py-0.5 rounded font-mono text-[10px] transition-all
                ${lang === 'en' ? 'bg-white text-brand-900 font-bold' : 'text-brand-400 hover:text-white'}`}
            >🇺🇸</button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8 w-full max-w-5xl">
          {children}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <div className="md:hidden">
        <AppMobileNav />
      </div>
    </div>
  )
}
