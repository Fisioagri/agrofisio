import AppLayout from '../layouts/AppLayout'
import { useAuth } from '../hooks/useAuth'
import { useLanguage } from '../contexts/LanguageContext'
import { useSignOut } from '../hooks/useSignOut'

export default function SettingsPage() {
  const { user, profile } = useAuth()
  const { t } = useLanguage()
  const signOut = useSignOut()

  return (
    <AppLayout>
      <div className="space-y-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-brand-900">{t.settings.title}</h1>
          <p className="font-mono text-xs text-ink-400 mt-1">{t.settings.subtitle}</p>
        </div>

        <div className="bg-white border border-surface-border rounded-card p-4 shadow-card space-y-4">
          <div className="font-mono text-[10px] font-bold text-ink-400 uppercase tracking-wider">{t.settings.account}</div>
          <Row label={t.settings.email} value={user?.email} />
          {profile?.name && <Row label={t.settings.name} value={profile.name} />}
          <Row label={t.settings.role} value={profile?.role || 'user'} capitalize />
        </div>

        <button
          onClick={signOut}
          className="w-full py-3 border-2 border-danger-600 text-danger-600 rounded-sm
            font-display font-bold text-sm hover:bg-danger-50 transition-colors"
        >
          {t.settings.logoutBtn}
        </button>
      </div>
    </AppLayout>
  )
}

function Row({ label, value, capitalize }) {
  return (
    <div>
      <span className="font-mono text-xs text-ink-400 block">{label}</span>
      <p className={`text-sm text-ink-900 mt-0.5 ${capitalize ? 'capitalize' : ''}`}>{value}</p>
    </div>
  )
}
