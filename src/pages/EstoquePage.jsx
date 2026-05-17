import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AppLayout from '../layouts/AppLayout'
import Spinner from '../components/ui/Spinner'
import {
  listInsumos, createInsumo, updateInsumo, deleteInsumo,
  listMovimentacoes, createMovimentacao,
} from '../services/estoquesService'
import { useLanguage } from '../contexts/LanguageContext'

const UNIDADES = ['L', 'mL', 'kg', 'g', 't', 'sc', 'un', 'm³', 'cx']

const EMPTY_INSUMO = { nome: '', empresa: '', unidade: 'L', quantidade: '', preco_unitario: '', vencimento: '' }
const EMPTY_MOV    = { tipo: 'entrada', quantidade: '', preco_unit: '', data_mov: new Date().toISOString().slice(0, 10), nota: '', empresa: '' }

const field = 'w-full border border-surface-border rounded-sm px-3 py-2.5 font-mono text-xs bg-surface-input focus:outline-none focus:border-brand-700 focus:ring-1 focus:ring-brand-700 transition-colors'
const label = 'block font-mono text-[10px] text-ink-400 mb-1 uppercase tracking-wider'

function fmt(n) {
  if (n == null || n === '') return '—'
  return Number(n).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function fmtDate(d) {
  if (!d) return '—'
  const dt = new Date(d + 'T12:00:00')
  return dt.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function daysUntil(dateStr) {
  if (!dateStr) return null
  const diff = (new Date(dateStr + 'T12:00:00') - new Date()) / (1000 * 60 * 60 * 24)
  return Math.ceil(diff)
}

// ── Painel: formulário insumo ──────────────────────────────────────────────
function InsumoForm({ initial, onSave, onCancel, saving }) {
  const { lang } = useLanguage()
  const [form, setForm] = useState(initial || EMPTY_INSUMO)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }} transition={{ duration: 0.2 }}
      className="bg-white border border-surface-border rounded-card shadow-card p-5"
    >
      <h3 className="font-display font-bold text-sm text-brand-900 mb-4">
        {initial ? (lang === 'en' ? '✏️ Edit Input' : '✏️ Editar Insumo') : (lang === 'en' ? '➕ New Input' : '➕ Novo Insumo')}
      </h3>
      <form onSubmit={e => { e.preventDefault(); onSave(form) }} className="space-y-3">
        <div>
          <label className={label}>{lang === 'en' ? 'Name *' : 'Nome *'}</label>
          <input className={field} required value={form.nome}
            onChange={e => set('nome', e.target.value)} placeholder={lang === 'en' ? 'e.g. Glyphosate 480SL' : 'Ex: Glifosato 480SL'} />
        </div>
        <div>
          <label className={label}>{lang === 'en' ? 'Supplier / Brand' : 'Empresa / Marca'}</label>
          <input className={field} value={form.empresa}
            onChange={e => set('empresa', e.target.value)} placeholder={lang === 'en' ? 'e.g. Bayer' : 'Ex: Bayer'} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={label}>{lang === 'en' ? 'Unit *' : 'Unidade *'}</label>
            <select className={field} value={form.unidade} onChange={e => set('unidade', e.target.value)}>
              {UNIDADES.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
          <div>
            <label className={label}>{lang === 'en' ? 'Initial stock' : 'Qtd. inicial'}</label>
            <input type="number" step="0.01" className={field} value={form.quantidade}
              onChange={e => set('quantidade', e.target.value)} placeholder="0" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={label}>{lang === 'en' ? 'Unit price (R$)' : 'Preço unitário (R$)'}</label>
            <input type="number" step="0.01" className={field} value={form.preco_unitario}
              onChange={e => set('preco_unitario', e.target.value)} placeholder="0,00" />
          </div>
          <div>
            <label className={label}>{lang === 'en' ? 'Expiry date' : 'Vencimento'}</label>
            <input type="date" className={field} value={form.vencimento}
              onChange={e => set('vencimento', e.target.value)} />
          </div>
        </div>
        <div className="flex gap-2 pt-1">
          <button type="button" onClick={onCancel}
            className="flex-1 py-2.5 border border-surface-border rounded-sm font-mono text-xs text-ink-600 hover:border-ink-400 transition-colors">
            {lang === 'en' ? 'Cancel' : 'Cancelar'}
          </button>
          <button type="submit" disabled={saving}
            className="flex-1 py-2.5 bg-brand-900 text-white rounded-sm font-mono text-xs font-bold hover:bg-brand-700 disabled:opacity-50 transition-colors">
            {saving ? '…' : (lang === 'en' ? 'Save' : 'Salvar')}
          </button>
        </div>
      </form>
    </motion.div>
  )
}

// ── Painel: movimentação ───────────────────────────────────────────────────
function MovForm({ insumo, onSave, onCancel, saving }) {
  const { lang } = useLanguage()
  const [form, setForm] = useState({ ...EMPTY_MOV })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }} transition={{ duration: 0.2 }}
      className="bg-white border border-surface-border rounded-card shadow-card p-5"
    >
      <h3 className="font-display font-bold text-sm text-brand-900 mb-1">
        {lang === 'en' ? '↕ Stock Movement' : '↕ Movimentação'}
      </h3>
      <p className="font-mono text-[10px] text-ink-400 mb-4">{insumo.nome} · {lang === 'en' ? 'current' : 'saldo'}: {fmt(insumo.quantidade)} {insumo.unidade}</p>
      <form onSubmit={e => { e.preventDefault(); onSave({ ...form, insumo_id: insumo.id }) }} className="space-y-3">
        <div>
          <label className={label}>{lang === 'en' ? 'Type *' : 'Tipo *'}</label>
          <div className="grid grid-cols-2 gap-2">
            {['entrada', 'saida'].map(tipo => (
              <button key={tipo} type="button"
                onClick={() => set('tipo', tipo)}
                className={`py-2.5 rounded-sm font-mono text-xs font-bold border transition-colors ${
                  form.tipo === tipo
                    ? tipo === 'entrada'
                      ? 'bg-green-600 text-white border-green-600'
                      : 'bg-red-600 text-white border-red-600'
                    : 'bg-white border-surface-border text-ink-500 hover:border-ink-400'
                }`}>
                {tipo === 'entrada' ? (lang === 'en' ? '↑ Entry' : '↑ Entrada') : (lang === 'en' ? '↓ Exit' : '↓ Saída')}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={label}>{lang === 'en' ? 'Quantity *' : 'Quantidade *'}</label>
            <input type="number" step="0.01" className={field} required value={form.quantidade}
              onChange={e => set('quantidade', e.target.value)} placeholder="0" />
          </div>
          <div>
            <label className={label}>{lang === 'en' ? 'Date *' : 'Data *'}</label>
            <input type="date" className={field} required value={form.data_mov}
              onChange={e => set('data_mov', e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={label}>{lang === 'en' ? 'Unit price (R$)' : 'Preço unit. (R$)'}</label>
            <input type="number" step="0.01" className={field} value={form.preco_unit}
              onChange={e => set('preco_unit', e.target.value)} placeholder="0,00" />
          </div>
          <div>
            <label className={label}>{lang === 'en' ? 'Supplier' : 'Empresa'}</label>
            <input className={field} value={form.empresa}
              onChange={e => set('empresa', e.target.value)} placeholder="—" />
          </div>
        </div>
        <div>
          <label className={label}>{lang === 'en' ? 'Note' : 'Observação'}</label>
          <input className={field} value={form.nota}
            onChange={e => set('nota', e.target.value)} placeholder="—" />
        </div>
        <div className="flex gap-2 pt-1">
          <button type="button" onClick={onCancel}
            className="flex-1 py-2.5 border border-surface-border rounded-sm font-mono text-xs text-ink-600 hover:border-ink-400 transition-colors">
            {lang === 'en' ? 'Cancel' : 'Cancelar'}
          </button>
          <button type="submit" disabled={saving}
            className="flex-1 py-2.5 bg-brand-900 text-white rounded-sm font-mono text-xs font-bold hover:bg-brand-700 disabled:opacity-50 transition-colors">
            {saving ? '…' : (lang === 'en' ? 'Record' : 'Registrar')}
          </button>
        </div>
      </form>
    </motion.div>
  )
}

// ── Página principal ───────────────────────────────────────────────────────
export default function EstoquePage() {
  const { lang } = useLanguage()
  const [insumos, setInsumos]   = useState([])
  const [movs, setMovs]         = useState([])
  const [loading, setLoading]   = useState(true)
  const [search, setSearch]     = useState('')
  const [panel, setPanel]       = useState(null)   // null | 'new' | insumo obj
  const [movPanel, setMovPanel] = useState(null)   // null | insumo obj
  const [saving, setSaving]     = useState(false)
  const [deleting, setDeleting] = useState(null)
  const [error, setError]       = useState('')
  const [tab, setTab]           = useState('insumos') // 'insumos' | 'movs'

  useEffect(() => {
    Promise.all([listInsumos(), listMovimentacoes()])
      .then(([ins, mv]) => { setInsumos(ins); setMovs(mv) })
      .catch(() => setError(lang === 'en' ? 'Error loading data.' : 'Erro ao carregar dados.'))
      .finally(() => setLoading(false))
  }, [])

  const filtered = insumos.filter(i =>
    i.nome.toLowerCase().includes(search.toLowerCase()) ||
    (i.empresa || '').toLowerCase().includes(search.toLowerCase())
  )

  const totalValor = insumos.reduce((s, i) => s + (i.quantidade || 0) * (i.preco_unitario || 0), 0)
  const vencendo   = insumos.filter(i => { const d = daysUntil(i.vencimento); return d != null && d <= 30 && d >= 0 }).length

  async function handleSaveInsumo(form) {
    setSaving(true)
    setError('')
    try {
      const payload = {
        nome: form.nome,
        empresa: form.empresa || null,
        unidade: form.unidade,
        quantidade: form.quantidade !== '' ? parseFloat(form.quantidade) : 0,
        preco_unitario: form.preco_unitario !== '' ? parseFloat(form.preco_unitario) : 0,
        vencimento: form.vencimento || null,
      }
      if (panel === 'new') {
        const novo = await createInsumo(payload)
        setInsumos(prev => [...prev, novo].sort((a, b) => a.nome.localeCompare(b.nome)))
      } else {
        const updated = await updateInsumo(panel.id, payload)
        setInsumos(prev => prev.map(i => i.id === updated.id ? updated : i))
      }
      setPanel(null)
    } catch {
      setError(lang === 'en' ? 'Error saving. Try again.' : 'Erro ao salvar. Tente novamente.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    if (!window.confirm(lang === 'en' ? 'Delete this input?' : 'Excluir este insumo?')) return
    setDeleting(id)
    try {
      await deleteInsumo(id)
      setInsumos(prev => prev.filter(i => i.id !== id))
    } catch {
      setError(lang === 'en' ? 'Error deleting.' : 'Erro ao excluir.')
    } finally {
      setDeleting(null)
    }
  }

  async function handleSaveMov(form) {
    setSaving(true)
    setError('')
    try {
      const { mov, novaQtd } = await createMovimentacao({
        insumo_id: form.insumo_id,
        tipo: form.tipo,
        quantidade: parseFloat(form.quantidade),
        preco_unit: form.preco_unit !== '' ? parseFloat(form.preco_unit) : null,
        data_mov: form.data_mov,
        nota: form.nota || null,
        empresa: form.empresa || null,
      })
      // Update insumo quantidade in state
      setInsumos(prev => prev.map(i => i.id === form.insumo_id ? { ...i, quantidade: novaQtd } : i))
      // Prepend to movs list
      const enriched = { ...mov, insumos: { nome: movPanel.nome, unidade: movPanel.unidade } }
      setMovs(prev => [enriched, ...prev])
      setMovPanel(null)
    } catch {
      setError(lang === 'en' ? 'Error recording movement.' : 'Erro ao registrar movimentação.')
    } finally {
      setSaving(false)
    }
  }

  const showPanel = panel !== null || movPanel !== null

  return (
    <AppLayout>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="font-display font-bold text-2xl text-brand-900">
              {lang === 'en' ? '📦 Stock' : '📦 Estoque'}
            </h1>
            <p className="font-mono text-xs text-ink-400 mt-0.5">
              {insumos.length} {lang === 'en' ? 'inputs' : 'insumos'} · R$ {fmt(totalValor)} em estoque
              {vencendo > 0 && (
                <span className="ml-2 text-amber-600">⚠️ {vencendo} {lang === 'en' ? 'expiring in 30d' : 'vencem em 30d'}</span>
              )}
            </p>
          </div>
          {!showPanel && (
            <button
              onClick={() => setPanel('new')}
              className="flex-shrink-0 bg-brand-900 text-white px-4 py-2.5 rounded-sm font-mono text-xs font-bold hover:bg-brand-700 transition-colors"
            >
              + {lang === 'en' ? 'New Input' : 'Novo Insumo'}
            </button>
          )}
        </div>

        {error && (
          <div className="bg-danger-50 border border-danger-600 rounded-sm p-3 font-mono text-xs text-danger-600">{error}</div>
        )}

        {/* Tabs */}
        {!showPanel && (
          <div className="flex gap-1 border-b border-surface-border">
            {[['insumos', lang === 'en' ? 'Inputs' : 'Insumos'], ['movs', lang === 'en' ? 'Movements' : 'Movimentações']].map(([k, l]) => (
              <button key={k} onClick={() => setTab(k)}
                className={`px-4 py-2 font-mono text-xs border-b-2 -mb-px transition-colors ${
                  tab === k ? 'border-brand-900 text-brand-900 font-bold' : 'border-transparent text-ink-400 hover:text-ink-600'
                }`}>
                {l}
              </button>
            ))}
          </div>
        )}

        <div className={showPanel ? 'flex flex-col lg:flex-row gap-4' : ''}>
          {/* Left column */}
          <div className={showPanel ? 'flex-1 min-w-0' : 'w-full'}>

            {/* Tab: Insumos */}
            {(!showPanel || panel !== null) && tab === 'insumos' && (
              <>
                {!showPanel && (
                  <input
                    className="w-full border border-surface-border rounded-sm px-3 py-2.5 font-mono text-xs bg-white focus:outline-none focus:border-brand-700 transition-colors mb-3"
                    placeholder={lang === 'en' ? '🔍 Search inputs...' : '🔍 Buscar insumo...'}
                    value={search} onChange={e => setSearch(e.target.value)}
                  />
                )}
                {loading ? (
                  <div className="flex justify-center py-12"><Spinner /></div>
                ) : filtered.length === 0 ? (
                  <div className="bg-white border border-surface-border rounded-card p-8 text-center">
                    <p className="text-3xl mb-2">📦</p>
                    <p className="font-mono text-xs text-ink-400">
                      {search
                        ? (lang === 'en' ? 'No results.' : 'Nenhum resultado.')
                        : (lang === 'en' ? 'No inputs registered yet.' : 'Nenhum insumo cadastrado ainda.')}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <AnimatePresence>
                      {filtered.map(ins => {
                        const days = daysUntil(ins.vencimento)
                        const expired  = days != null && days < 0
                        const expiring = days != null && days >= 0 && days <= 30
                        return (
                          <motion.div key={ins.id}
                            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                            className={`bg-white border rounded-card p-4 shadow-card transition-colors ${
                              panel?.id === ins.id || movPanel?.id === ins.id ? 'border-brand-700' : 'border-surface-border hover:border-brand-400'
                            }`}>
                            <div className="flex items-start gap-3">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <p className="font-display font-bold text-sm text-brand-900">{ins.nome}</p>
                                  {expired  && <span className="font-mono text-[9px] px-1.5 py-0.5 bg-red-50 border border-red-500 text-red-600 rounded-full">Vencido</span>}
                                  {expiring && !expired && <span className="font-mono text-[9px] px-1.5 py-0.5 bg-amber-50 border border-amber-500 text-amber-600 rounded-full">{days}d</span>}
                                </div>
                                <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1">
                                  {ins.empresa && <span className="font-mono text-[10px] text-ink-400">{ins.empresa}</span>}
                                  {ins.vencimento && <span className="font-mono text-[10px] text-ink-300">Venc: {fmtDate(ins.vencimento)}</span>}
                                </div>
                              </div>
                              <div className="flex-shrink-0 text-right">
                                <p className="font-display font-bold text-sm text-brand-900">
                                  {fmt(ins.quantidade)} <span className="font-mono text-[10px] text-ink-400">{ins.unidade}</span>
                                </p>
                                {ins.preco_unitario > 0 && (
                                  <p className="font-mono text-[10px] text-ink-400">R$ {fmt(ins.preco_unitario)}/{ins.unidade}</p>
                                )}
                              </div>
                            </div>
                            <div className="flex gap-1.5 mt-3 flex-wrap">
                              <button
                                onClick={() => { setMovPanel(ins); setPanel(null) }}
                                className="px-3 py-1.5 bg-green-600 text-white rounded-sm font-mono text-[10px] font-bold hover:bg-green-700 transition-colors">
                                ↑ {lang === 'en' ? 'Entry' : 'Entrada'}
                              </button>
                              <button
                                onClick={() => { setMovPanel(ins); setPanel(null) }}
                                className="px-3 py-1.5 bg-red-600 text-white rounded-sm font-mono text-[10px] font-bold hover:bg-red-700 transition-colors">
                                ↓ {lang === 'en' ? 'Exit' : 'Saída'}
                              </button>
                              <div className="flex-1" />
                              <button
                                onClick={() => { setPanel(ins); setMovPanel(null) }}
                                className="w-8 h-8 flex items-center justify-center rounded-md text-ink-400 hover:bg-brand-50 hover:text-brand-900 transition-colors">✏️</button>
                              <button
                                onClick={() => handleDelete(ins.id)}
                                disabled={deleting === ins.id}
                                className="w-8 h-8 flex items-center justify-center rounded-md text-ink-300 hover:bg-danger-50 hover:text-danger-600 transition-colors">
                                {deleting === ins.id ? '…' : '🗑'}
                              </button>
                            </div>
                          </motion.div>
                        )
                      })}
                    </AnimatePresence>
                  </div>
                )}
              </>
            )}

            {/* Tab: Movimentações */}
            {!showPanel && tab === 'movs' && (
              <div className="space-y-2">
                {movs.length === 0 ? (
                  <div className="bg-white border border-surface-border rounded-card p-8 text-center">
                    <p className="text-3xl mb-2">↕️</p>
                    <p className="font-mono text-xs text-ink-400">
                      {lang === 'en' ? 'No movements yet.' : 'Nenhuma movimentação registrada.'}
                    </p>
                  </div>
                ) : movs.map(m => (
                  <div key={m.id} className="bg-white border border-surface-border rounded-card p-3.5 shadow-card flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0 font-bold ${
                      m.tipo === 'entrada' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {m.tipo === 'entrada' ? '↑' : '↓'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-bold text-sm text-brand-900 truncate">{m.insumos?.nome}</p>
                      <p className="font-mono text-[10px] text-ink-400 mt-0.5">
                        {fmt(m.quantidade)} {m.insumos?.unidade}
                        {m.preco_unit ? ` · R$ ${fmt(m.preco_unit)}` : ''}
                        {m.nota ? ` · ${m.nota}` : ''}
                      </p>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <p className="font-mono text-[10px] text-ink-400">{fmtDate(m.data_mov)}</p>
                      {m.empresa && <p className="font-mono text-[10px] text-ink-300">{m.empresa}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right panel */}
          <AnimatePresence>
            {panel !== null && (
              <div className="lg:w-[360px] lg:flex-shrink-0">
                <InsumoForm
                  initial={panel === 'new' ? null : panel}
                  onSave={handleSaveInsumo}
                  onCancel={() => setPanel(null)}
                  saving={saving}
                />
              </div>
            )}
            {movPanel !== null && (
              <div className="lg:w-[360px] lg:flex-shrink-0">
                <MovForm
                  insumo={movPanel}
                  onSave={handleSaveMov}
                  onCancel={() => setMovPanel(null)}
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
