import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signIn } from '../services/authService'
import { useLanguage } from '../contexts/LanguageContext'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

export default function LoginPage() {
  const { t } = useLanguage()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const navigate                = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn(email, password)
      navigate('/')
    } catch (err) {
      setError(err.message || t.login.error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-surface-bg flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brand-900 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
            🌱
          </div>
          <h1 className="font-display font-extrabold text-2xl text-brand-900">AgroFísio</h1>
          <p className="font-mono text-xs text-ink-400 mt-1">{t.login.subtitle}</p>
        </div>

        <div className="bg-white border border-surface-border rounded-card shadow-card p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label={t.login.email}
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
            />
            <Input
              label={t.login.password}
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
            {error && (
              <p className="text-danger-600 font-mono text-xs bg-danger-50 px-3 py-2 rounded-sm">
                ⚠️ {error}
              </p>
            )}
            <Button type="submit" loading={loading} fullWidth>
              {t.login.submit}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
