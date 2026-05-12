import { useState, useEffect } from 'react'
import AppLayout from '../layouts/AppLayout'
import { useLanguage } from '../contexts/LanguageContext'
import { listUsers, createUser } from '../services/authService'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Modal from '../components/ui/Modal'
import Spinner from '../components/ui/Spinner'

const EMPTY_FORM = { name: '', email: '', password: '', role: 'user' }

export default function UsersPage() {
  const { t } = useLanguage()
  const u = t.users
  const [users, setUsers]       = useState([])
  const [loading, setLoading]   = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm]         = useState(EMPTY_FORM)
  const [error, setError]       = useState('')
  const [saving, setSaving]     = useState(false)

  useEffect(() => { fetchUsers() }, [])

  async function fetchUsers() {
    try {
      setUsers(await listUsers())
    } finally {
      setLoading(false)
    }
  }

  async function handleCreate(e) {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      await createUser(form.email, form.password, form.name, form.role)
      setShowModal(false)
      setForm(EMPTY_FORM)
      await fetchUsers()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  function field(key) {
    return { value: form[key], onChange: e => setForm(f => ({ ...f, [key]: e.target.value })) }
  }

  return (
    <AppLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display font-bold text-2xl text-brand-900">{u.title}</h1>
            <p className="font-mono text-xs text-ink-400 mt-1">{u.subtitle}</p>
          </div>
          <Button size="sm" onClick={() => setShowModal(true)}>{u.newBtn}</Button>
        </div>

        <div className="bg-white border border-surface-border rounded-card shadow-card overflow-hidden">
          {loading ? (
            <div className="p-8 flex justify-center"><Spinner /></div>
          ) : users.length === 0 ? (
            <div className="p-6 text-center font-mono text-xs text-ink-400">{u.empty}</div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand-100 border-b border-surface-border">
                  {[u.colName, u.colEmail, u.colRole].map(h => (
                    <th key={h} className="text-left px-4 py-3 font-mono text-[10px] text-ink-600 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((usr, i) => (
                  <tr key={usr.id} className={i % 2 === 0 ? 'bg-white' : 'bg-brand-50'}>
                    <td className="px-4 py-3">{usr.name || '—'}</td>
                    <td className="px-4 py-3 font-mono text-xs">{usr.email}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded-full font-mono text-[10px] font-semibold
                        ${usr.role === 'admin' ? 'bg-amber-50 text-amber-600' : 'bg-brand-100 text-brand-900'}`}>
                        {usr.role}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)} title={u.modalTitle}>
        <form onSubmit={handleCreate} className="space-y-3">
          <Input label={u.fieldName}  placeholder={u.fieldName}   {...field('name')} />
          <Input label={u.fieldEmail} type="email" placeholder="email@exemplo.com" required {...field('email')} />
          <Input label={u.fieldPassword} type="password" placeholder="••••••••" required {...field('password')} />
          <div>
            <label className="block text-xs font-bold text-ink-900 mb-1">{u.fieldRole}</label>
            <select
              {...field('role')}
              className="w-full px-3 py-2.5 border-[1.5px] border-surface-border rounded-sm text-sm
                text-ink-900 bg-surface-input focus:border-brand-700 outline-none appearance-none"
            >
              <option value="user">{u.roleUser}</option>
              <option value="admin">{u.roleAdmin}</option>
            </select>
          </div>
          {error && (
            <p className="text-danger-600 font-mono text-xs bg-danger-50 px-3 py-2 rounded-sm">⚠️ {error}</p>
          )}
          <div className="flex gap-2 pt-1">
            <Button variant="outline" onClick={() => setShowModal(false)} type="button" fullWidth>
              {t.common.cancel}
            </Button>
            <Button type="submit" loading={saving} fullWidth>{t.common.create}</Button>
          </div>
        </form>
      </Modal>
    </AppLayout>
  )
}
