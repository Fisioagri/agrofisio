import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AppLayout from '../layouts/AppLayout'
import Spinner from '../components/ui/Spinner'
import { useLanguage } from '../contexts/LanguageContext'
import { listProdutores } from '../services/produtoresService'
import { listTalhoes, createTalhao, updateTalhao, deleteTalhao } from '../services/talhoesService'

const CULTURAS = ['soja', 'milho', 'feijao', 'trigo', 'sorgo', 'algodao', 'cana', 'cafe', 'outro']
const EMPTY = { nome: '', area_ha: '', cultura: '', car: '', safra: '', produtor_id: '' }

function PanelForm({ initial, produtores, onSave, onCancel, saving }) {
  const { t } = useLanguage()
  const s = t.talhoesPage
  const [form, setForm] = useState(initial || EMPTY)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

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
      <form onSubmit={e => { e.preventDefault(); onSave(form) }} className="space-y-4">
        <div>
          <label className={label}>{s.fieldProdutor}</label>
          <select className={field} value={form.produtor_id} onChange={e => set('produtor_id', e.target.value)}>
            <option value="">{s.noneOpt}</option>
            {produtores.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
          </select>
        </div>
        <div>
          <label className={label}>{s.fieldNome}</label>
          <input className={field} required value={form.nome}
            onChange={e => set('nome', e.target.value)} placeholder="Talhão 01 — Fundo" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={label}>{s.fieldArea}</label>
            <input type="number" step="0.01" className={field} value={form.area_ha}
              onChange={e => set('area_ha', e.target.value)} placeholder="45.5" />
          </div>
          <div>
            <label className={label}>{s.fieldSafra}</label>
            <input className={field} value={form.safra}
              onChange={e => set('safra', e.target.value)} placeholder="2024/25" />
          </div>
        </div>
        <div>
          <label className={label}>{s.fieldCultura}</label>
          <select className={field} value={form.cultura} onChange={e => set('cultura', e.target.value)}>
            <option value="">{s.selectOpt}</option>
            {CULTURAS.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
          </select>
        </div>
        <div>
          <label className={label}>{s.fieldCAR}</label>
          <input className={field} value={form.car}
            onChange={e => set('car', e.target.value)} placeholder="BR-0000000-0000000000000000" />
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

const CROP_ICO = { soja: '🫘', milho: '🌽', feijao: '🫛', trigo: '🌾', sorgo: '🌿', algodao: '☁️', cana: '🎋', cafe: '☕', outro: '🌱' }

export default function TalhoesPage() {
  const { t } = useLanguage()
  const s = t.talhoesPage
  const [talhoes, setTalhoes]       = useState([])
  const [produtores, setProdutores] = useState([])
  const [loading, setLoading]       = useState(true)
  const [search, setSearch]         = useState('')
  const [filterProd, setFilterProd] = useState('')
  const [panel, setPanel]           = useState(null)
  const [saving, setSaving]         = useState(false)
  const [deleting, setDeleting]     = useState(null)
  const [error, setError]           = useState('')

  useEffect(() => {
    Promise.all([listTalhoes(), listProdutores()])
      .then(([tl, pr]) => { setTalhoes(tl); setProdutores(pr) })
      .catch(() => setError(s.errLoad))
      .finally(() => setLoading(false))
  }, [])

  const filtered = talhoes.filter(tl => {
    const matchSearch = tl.nome.toLowerCase().includes(search.toLowerCase()) ||
      (tl.cultura || '').toLowerCase().includes(search.toLowerCase())
    const matchProd = !filterProd || tl.produtor_id === filterProd
    return matchSearch && matchProd
  })

  const totalHa = filtered.reduce((sum, tl) => sum + (parseFloat(tl.area_ha) || 0), 0)

  async function handleSave(form) {
    setSaving(true)
    try {
      const payload = { ...form, area_ha: form.area_ha ? parseFloat(form.area_ha) : null, produtor_id: form.produtor_id || null }
      if (panel === 'new') {
        const novo = await createTalhao(payload)
        setTalhoes(prev => [...prev, novo].sort((a, b) => a.nome.localeCompare(b.nome)))
      } else {
        const updated = await updateTalhao(panel.id, payload)
        setTalhoes(prev => prev.map(tl => tl.id === updated.id ? updated : tl))
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
      await deleteTalhao(id)
      setTalhoes(prev => prev.filter(tl => tl.id !== id))
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
              {s.subtitle(talhoes.length, totalHa.toLocaleString('pt-BR', { maximumFractionDigits: 1 }))}
            </p>
          </div>
          {!showForm && (
            <button
              onClick={() => setPanel('new')}
              className="flex-shrink-0 bg-brand-900 text-white px-4 py-2.5 rounded-sm font-mono text-xs font-bold hover:bg-brand-700 transition-colors"
            >
              {s.newBtn}
            </button>
          )}
        </div>

        {error && (
          <div className="bg-danger-50 border border-danger-600 rounded-sm p-3 font-mono text-xs text-danger-600">{error}</div>
        )}

        <div className={`gap-5 ${showForm ? 'flex flex-col lg:flex-row' : ''}`}>
          {/* Lista */}
          <div className={showForm ? 'flex-1 min-w-0' : 'w-full'}>
            {/* Filtros */}
            {!showForm && (
              <div className="flex gap-2 mb-3">
                <input
                  className="flex-1 border border-surface-border rounded-sm px-3 py-2.5 font-mono text-xs bg-white focus:outline-none focus:border-brand-700 transition-colors"
                  placeholder={s.searchPh}
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                {produtores.length > 0 && (
                  <select
                    className="border border-surface-border rounded-sm px-3 py-2.5 font-mono text-xs bg-white focus:outline-none focus:border-brand-700 transition-colors"
                    value={filterProd}
                    onChange={e => setFilterProd(e.target.value)}
                  >
                    <option value="">{s.filterAll}</option>
                    {produtores.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
                  </select>
                )}
              </div>
            )}

            {loading ? (
              <div className="flex justify-center py-12"><Spinner /></div>
            ) : filtered.length === 0 ? (
              <div className="bg-white border border-surface-border rounded-card p-8 text-center">
                <p className="text-3xl mb-2">🗺️</p>
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
                  {filtered.map(tl => (
                    <motion.div
                      key={tl.id}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className={`bg-white border rounded-card p-4 shadow-card flex items-center gap-3 transition-colors
                        ${panel?.id === tl.id ? 'border-brand-700' : 'border-surface-border hover:border-brand-400'}`}
                    >
                      <div className="w-10 h-10 rounded-lg bg-brand-100 flex items-center justify-center text-xl flex-shrink-0">
                        {CROP_ICO[tl.cultura] || '🌱'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-display font-bold text-sm text-brand-900 truncate">{tl.nome}</p>
                        <p className="font-mono text-[10px] text-ink-400 mt-0.5">
                          {[
                            tl.cultura && tl.cultura.charAt(0).toUpperCase() + tl.cultura.slice(1),
                            tl.area_ha && `${parseFloat(tl.area_ha).toLocaleString('pt-BR')} ha`,
                            tl.safra,
                          ].filter(Boolean).join(' · ')}
                        </p>
                        {tl.produtores?.nome && (
                          <p className="font-mono text-[10px] text-ink-300 mt-0.5">👤 {tl.produtores.nome}</p>
                        )}
                      </div>
                      <div className="flex gap-1.5 flex-shrink-0">
                        <button
                          onClick={() => setPanel(panel?.id === tl.id ? null : tl)}
                          className="w-8 h-8 flex items-center justify-center rounded-md text-ink-400 hover:bg-brand-50 hover:text-brand-900 transition-colors text-sm"
                        >✏️</button>
                        <button
                          onClick={() => handleDelete(tl.id)}
                          disabled={deleting === tl.id}
                          className="w-8 h-8 flex items-center justify-center rounded-md text-ink-300 hover:bg-danger-50 hover:text-danger-600 transition-colors text-sm"
                        >{deleting === tl.id ? '…' : '🗑'}</button>
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
                  produtores={produtores}
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
