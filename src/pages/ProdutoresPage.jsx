import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AppLayout from '../layouts/AppLayout'
import Spinner from '../components/ui/Spinner'
import { useLanguage } from '../contexts/LanguageContext'
import {
  listProdutores, createProdutor, updateProdutor, deleteProdutor,
  validateCPF, formatCPF,
} from '../services/produtoresService'

const EMPTY = { nome: '', cpf: '', data_nasc: '', cidade: '', telefone: '', email: '' }

function PanelForm({ initial, onSave, onCancel, saving }) {
  const { t } = useLanguage()
  const s = t.produtoresPage
  const [form, setForm] = useState(initial || EMPTY)
  const [cpfErr, setCpfErr] = useState(false)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  function handleCPF(v) {
    const fmt = formatCPF(v)
    set('cpf', fmt)
    const raw = fmt.replace(/\D/g, '')
    setCpfErr(raw.length === 11 && !validateCPF(raw))
  }

  async function submit(e) {
    e.preventDefault()
    if (cpfErr) return
    await onSave(form)
  }

  const field = 'w-full border border-surface-border rounded-sm px-3 py-2.5 font-mono text-xs bg-surface-input focus:outline-none focus:border-brand-700 focus:ring-1 focus:ring-brand-700 transition-colors'
  const label = 'block font-mono text-[10px] text-ink-400 mb-1 uppercase tracking-wider'

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.2 }}
      className="bg-white border border-surface-border rounded-card shadow-card p-6"
    >
      <h3 className="font-display font-bold text-base text-brand-900 mb-5">
        {initial ? s.editTitle : s.newTitle}
      </h3>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className={label}>{s.fieldName}</label>
          <input className={field} required value={form.nome}
            onChange={e => set('nome', e.target.value)} placeholder="João da Silva" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={label}>{s.fieldCPF}</label>
            <input className={`${field} ${cpfErr ? 'border-danger-600 ring-1 ring-danger-600' : ''}`}
              value={form.cpf} onChange={e => handleCPF(e.target.value)}
              placeholder="000.000.000-00" maxLength={14} />
            {cpfErr && <p className="font-mono text-[10px] text-danger-600 mt-1">{s.cpfInvalid}</p>}
          </div>
          <div>
            <label className={label}>{s.fieldBirth}</label>
            <input type="date" className={field} value={form.data_nasc}
              onChange={e => set('data_nasc', e.target.value)} />
          </div>
        </div>
        <div>
          <label className={label}>{s.fieldCity}</label>
          <input className={field} required value={form.cidade}
            onChange={e => set('cidade', e.target.value)} placeholder="Londrina – PR" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={label}>{s.fieldPhone}</label>
            <input className={field} value={form.telefone}
              onChange={e => set('telefone', e.target.value)} placeholder="(43) 99999-0000" />
          </div>
          <div>
            <label className={label}>{s.fieldEmail}</label>
            <input type="email" className={field} value={form.email}
              onChange={e => set('email', e.target.value)} placeholder="joao@email.com" />
          </div>
        </div>
        <div className="flex gap-2 pt-2">
          <button type="button" onClick={onCancel}
            className="flex-1 py-2.5 border border-surface-border rounded-sm font-mono text-xs text-ink-600 hover:border-ink-400 transition-colors">
            {s.cancel}
          </button>
          <button type="submit" disabled={saving}
            className="flex-1 py-2.5 bg-brand-900 text-white rounded-sm font-mono text-xs font-bold hover:bg-brand-700 disabled:opacity-50 transition-colors">
            {saving ? s.saving : s.save}
          </button>
        </div>
      </form>
    </motion.div>
  )
}

export default function ProdutoresPage() {
  const { t } = useLanguage()
  const s = t.produtoresPage
  const [produtores, setProdutores] = useState([])
  const [loading, setLoading]       = useState(true)
  const [search, setSearch]         = useState('')
  const [panel, setPanel]           = useState(null)
  const [saving, setSaving]         = useState(false)
  const [deleting, setDeleting]     = useState(null)
  const [error, setError]           = useState('')

  useEffect(() => {
    listProdutores()
      .then(setProdutores)
      .catch(() => setError(s.errLoad))
      .finally(() => setLoading(false))
  }, [])

  const filtered = produtores.filter(p =>
    p.nome.toLowerCase().includes(search.toLowerCase()) ||
    (p.cidade || '').toLowerCase().includes(search.toLowerCase())
  )

  async function handleSave(form) {
    setSaving(true)
    try {
      if (panel === 'new') {
        const novo = await createProdutor(form)
        setProdutores(prev => [...prev, novo].sort((a, b) => a.nome.localeCompare(b.nome)))
      } else {
        const updated = await updateProdutor(panel.id, form)
        setProdutores(prev => prev.map(p => p.id === updated.id ? updated : p))
      }
      setPanel(null)
    } catch {
      setError(s.errSave)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    if (!window.confirm(s.confirmDelete)) return
    setDeleting(id)
    try {
      await deleteProdutor(id)
      setProdutores(prev => prev.filter(p => p.id !== id))
    } catch {
      setError(s.errDelete)
    } finally {
      setDeleting(null)
    }
  }

  const showForm = panel !== null

  return (
    <AppLayout>
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-display font-bold text-2xl text-brand-900">{s.title}</h1>
            <p className="font-mono text-xs text-ink-400 mt-1">
              {s.registered(produtores.length)}
            </p>
          </div>
          {!showForm && (
            <button
              onClick={() => setPanel('new')}
              className="flex-shrink-0 bg-brand-900 text-white px-4 py-2.5 rounded-sm font-mono text-xs font-bold hover:bg-brand-700 transition-colors flex items-center gap-1.5"
            >
              {s.newBtn}
            </button>
          )}
        </div>

        {error && (
          <div className="bg-danger-50 border border-danger-600 rounded-sm p-3 font-mono text-xs text-danger-600">
            {error}
          </div>
        )}

        <div className={`gap-5 ${showForm ? 'flex flex-col lg:flex-row' : ''}`}>
          {/* Lista */}
          <div className={showForm ? 'flex-1 min-w-0' : 'w-full'}>
            {/* Search */}
            {!showForm && (
              <div className="mb-3">
                <input
                  className="w-full border border-surface-border rounded-sm px-3 py-2.5 font-mono text-xs bg-white focus:outline-none focus:border-brand-700 transition-colors"
                  placeholder={s.searchPh}
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
            )}

            {loading ? (
              <div className="flex justify-center py-12"><Spinner /></div>
            ) : filtered.length === 0 ? (
              <div className="bg-white border border-surface-border rounded-card p-8 text-center">
                <p className="text-3xl mb-2">👤</p>
                <p className="font-mono text-xs text-ink-400">
                  {search ? s.emptySearch : s.emptyAll}
                </p>
                {!search && (
                  <button onClick={() => setPanel('new')}
                    className="mt-3 font-mono text-xs text-brand-700 underline">
                    {s.firstRegister}
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <AnimatePresence>
                  {filtered.map(p => (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className={`bg-white border rounded-card p-4 shadow-card flex items-center gap-3 transition-colors
                        ${panel?.id === p.id ? 'border-brand-700' : 'border-surface-border hover:border-brand-400'}`}
                    >
                      <div className="w-10 h-10 rounded-lg bg-brand-100 flex items-center justify-center text-lg flex-shrink-0">
                        👤
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-display font-bold text-sm text-brand-900 truncate">{p.nome}</p>
                        <p className="font-mono text-[10px] text-ink-400 mt-0.5">
                          {[p.cidade, p.cpf].filter(Boolean).join(' · ')}
                        </p>
                        {p.telefone && (
                          <p className="font-mono text-[10px] text-ink-300 mt-0.5">{p.telefone}</p>
                        )}
                      </div>
                      <div className="flex gap-1.5 flex-shrink-0">
                        <button
                          onClick={() => setPanel(panel?.id === p.id ? null : p)}
                          className="w-8 h-8 flex items-center justify-center rounded-md text-ink-400 hover:bg-brand-50 hover:text-brand-900 transition-colors text-sm"
                        >✏️</button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          disabled={deleting === p.id}
                          className="w-8 h-8 flex items-center justify-center rounded-md text-ink-300 hover:bg-danger-50 hover:text-danger-600 transition-colors text-sm"
                        >{deleting === p.id ? '…' : '🗑'}</button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Formulário lateral */}
          <AnimatePresence>
            {showForm && (
              <div className="lg:w-[380px] lg:flex-shrink-0">
                <PanelForm
                  initial={panel === 'new' ? null : panel}
                  onSave={handleSave}
                  onCancel={() => setPanel(null)}
                  saving={saving}
                />
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </AppLayout>
  )
}
