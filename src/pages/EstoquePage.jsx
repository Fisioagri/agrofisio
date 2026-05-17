import { useEffect, useState, useMemo, Fragment } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AppLayout from '../layouts/AppLayout'
import Spinner from '../components/ui/Spinner'
import DocUpload from '../components/DocUpload'
import ContratoUpload from '../components/ContratoUpload'
import {
  listInsumos, createInsumo, updateInsumo, deleteInsumo,
  listMovimentacoes, createMovimentacao, uploadEstoqueDoc,
  listContratos, createContrato, updateContrato, deleteContrato,
} from '../services/estoquesService'
import { useLanguage } from '../contexts/LanguageContext'

const UNIDADES = ['L', 'mL', 'kg', 'g', 't', 'sc', 'un', 'm³', 'cx']
const EMPTY_INSUMO   = { nome: '', empresa: '', unidade: 'L', quantidade: '', preco_unitario: '', vencimento: '' }
const EMPTY_CONTRATO = { nome_produto: '', empresa: '', volume: '', unidade: 'L', valor_total: '', preco_unit: '', data_inicio: '', data_fim: '', status: 'ativo', notas: '' }

const fld = 'w-full border border-surface-border rounded-sm px-3 py-2.5 font-mono text-xs bg-surface-input focus:outline-none focus:border-brand-700 focus:ring-1 focus:ring-brand-700 transition-colors'
const lbl = 'block font-mono text-[10px] text-ink-400 mb-1 uppercase tracking-wider'

function todayStr() { return new Date().toISOString().slice(0, 10) }

function fmt(n) {
  if (n == null || n === '') return '—'
  return Number(n).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function fmtR(n) {
  return `R$ ${Number(n || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function fmtDate(d) {
  if (!d) return '—'
  return new Date(d + 'T12:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function daysUntil(d) {
  if (!d) return null
  return Math.ceil((new Date(d + 'T12:00:00') - new Date()) / (1000 * 60 * 60 * 24))
}

// ── Status badge ───────────────────────────────────────────────────────────
function StatusBadge({ ins }) {
  const qty    = ins.quantidade || 0
  const days   = daysUntil(ins.vencimento)
  const expired  = days != null && days < 0
  const expiring = days != null && days >= 0 && days <= 30
  if (qty <= 0)   return <span className="px-2 py-0.5 rounded-full font-mono text-[9px] font-bold bg-red-100 text-red-700 border border-red-300">🔴 Zerado</span>
  if (expired)    return <span className="px-2 py-0.5 rounded-full font-mono text-[9px] font-bold bg-red-100 text-red-700 border border-red-300">🔴 Vencido</span>
  if (expiring)   return <span className="px-2 py-0.5 rounded-full font-mono text-[9px] font-bold bg-amber-100 text-amber-700 border border-amber-300">🟠 {days}d</span>
  return            <span className="px-2 py-0.5 rounded-full font-mono text-[9px] font-bold bg-green-100 text-green-700 border border-green-300">🟢 Normal</span>
}

// ── InsumoForm ─────────────────────────────────────────────────────────────
function InsumoForm({ initial, onSave, onCancel, saving }) {
  const [form, setForm] = useState(initial || EMPTY_INSUMO)
  const [docFile, setDocFile] = useState(null)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  return (
    <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }} transition={{ duration: 0.2 }}
      className="bg-white border border-surface-border rounded-card shadow-card p-5">
      <h3 className="font-display font-bold text-sm text-brand-900 mb-4">
        {initial ? '✏️ Editar Insumo' : '➕ Novo Insumo'}
      </h3>
      <form onSubmit={e => { e.preventDefault(); onSave(form, docFile) }} className="space-y-3">
        <div>
          <label className={lbl}>Nome *</label>
          <input className={fld} required value={form.nome} onChange={e => set('nome', e.target.value)} placeholder="Ex: Glifosato 480SL" />
        </div>
        <div>
          <label className={lbl}>Empresa / Marca</label>
          <input className={fld} value={form.empresa} onChange={e => set('empresa', e.target.value)} placeholder="Ex: Bayer" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={lbl}>Unidade *</label>
            <select className={fld} value={form.unidade} onChange={e => set('unidade', e.target.value)}>
              {UNIDADES.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
          <div>
            <label className={lbl}>Qtd. inicial</label>
            <input type="number" step="0.01" className={fld} value={form.quantidade} onChange={e => set('quantidade', e.target.value)} placeholder="0" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={lbl}>Preço unitário (R$)</label>
            <input type="number" step="0.01" className={fld} value={form.preco_unitario} onChange={e => set('preco_unitario', e.target.value)} placeholder="0,00" />
          </div>
          <div>
            <label className={lbl}>Vencimento</label>
            <input type="date" className={fld} value={form.vencimento} onChange={e => set('vencimento', e.target.value)} />
          </div>
        </div>
        <div>
          <label className={lbl}>Foto / PDF</label>
          <DocUpload value={initial?.doc_url} onChange={setDocFile} />
        </div>
        <div className="flex gap-2 pt-1">
          <button type="button" onClick={onCancel}
            className="flex-1 py-2.5 border border-surface-border rounded-sm font-mono text-xs text-ink-600 hover:border-ink-400 transition-colors">
            Cancelar
          </button>
          <button type="submit" disabled={saving}
            className="flex-1 py-2.5 bg-brand-900 text-white rounded-sm font-mono text-xs font-bold hover:bg-brand-700 disabled:opacity-50 transition-colors">
            {saving ? '…' : 'Salvar'}
          </button>
        </div>
      </form>
    </motion.div>
  )
}

// ── MovForm ────────────────────────────────────────────────────────────────
function MovForm({ insumos, initialInsumo, initialTipo, onSave, onCancel, saving }) {
  const [form, setForm] = useState({
    tipo: initialTipo || 'entrada',
    insumo_id: initialInsumo?.id || '',
    quantidade: '', preco_unit: '',
    data_mov: todayStr(), nota: '', empresa: '',
  })
  const [docFile, setDocFile] = useState(null)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const sel = insumos.find(i => i.id === form.insumo_id) || initialInsumo
  const isEntry = form.tipo === 'entrada'

  return (
    <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }} transition={{ duration: 0.2 }}
      className="bg-white border border-surface-border rounded-card shadow-card p-5">
      <h3 className="font-display font-bold text-sm text-brand-900 mb-3">
        {isEntry ? '↑ Nova Entrada' : '↓ Nova Saída'}
      </h3>
      {/* Tipo toggle */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        {['entrada', 'saida'].map(t => (
          <button key={t} type="button" onClick={() => set('tipo', t)}
            className={`py-2.5 rounded-sm font-mono text-xs font-bold border-2 transition-all ${
              form.tipo === t
                ? t === 'entrada' ? 'bg-green-600 text-white border-green-600' : 'bg-red-600 text-white border-red-600'
                : 'bg-white border-surface-border text-ink-400 hover:border-ink-300'
            }`}>
            {t === 'entrada' ? '↑ Entrada' : '↓ Saída'}
          </button>
        ))}
      </div>
      <form onSubmit={e => { e.preventDefault(); onSave(form, docFile) }} className="space-y-3">
        {!initialInsumo ? (
          <div>
            <label className={lbl}>Insumo *</label>
            <select className={fld} required value={form.insumo_id} onChange={e => set('insumo_id', e.target.value)}>
              <option value="">Selecionar insumo…</option>
              {insumos.map(i => <option key={i.id} value={i.id}>{i.nome} ({i.unidade})</option>)}
            </select>
          </div>
        ) : (
          <div className="bg-surface-bg rounded-sm px-3 py-2 border border-surface-border">
            <p className="font-mono text-[9px] text-ink-400 uppercase tracking-wider">Insumo</p>
            <p className="font-display font-bold text-sm text-brand-900">{initialInsumo.nome}</p>
            <p className="font-mono text-[10px] text-ink-400">Saldo atual: {fmt(initialInsumo.quantidade)} {initialInsumo.unidade}</p>
          </div>
        )}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={lbl}>Quantidade *</label>
            <div className="flex">
              <input type="number" step="0.01" min="0.001" required className={fld + ' rounded-r-none border-r-0'}
                value={form.quantidade} onChange={e => set('quantidade', e.target.value)} placeholder="0" />
              <span className="border border-surface-border bg-surface-bg px-2 flex items-center font-mono text-[10px] text-ink-400 rounded-r-sm flex-shrink-0">
                {sel?.unidade || 'un'}
              </span>
            </div>
          </div>
          <div>
            <label className={lbl}>Data *</label>
            <input type="date" className={fld} required value={form.data_mov} onChange={e => set('data_mov', e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={lbl}>R$ / unidade</label>
            <input type="number" step="0.01" className={fld} value={form.preco_unit} onChange={e => set('preco_unit', e.target.value)} placeholder="0,00" />
          </div>
          <div>
            <label className={lbl}>Empresa</label>
            <input className={fld} value={form.empresa} onChange={e => set('empresa', e.target.value)} placeholder="—" />
          </div>
        </div>
        <div>
          <label className={lbl}>{isEntry ? 'Contrato / Observação' : 'Nº NF / Observação'}</label>
          <input className={fld} value={form.nota} onChange={e => set('nota', e.target.value)}
            placeholder={isEntry ? 'Contrato, pedido, obs…' : 'Nº nota fiscal, obs…'} />
        </div>
        <div>
          <label className={lbl}>{isEntry ? '📎 Contrato / Comprovante' : '📎 Nota Fiscal / Comprovante'}</label>
          <DocUpload value={null} onChange={setDocFile} />
        </div>
        {form.quantidade && form.preco_unit && (
          <div className={`rounded-sm px-3 py-2 font-mono text-xs font-bold text-center ${
            isEntry ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            Total: {fmtR(parseFloat(form.quantidade || 0) * parseFloat(form.preco_unit || 0))}
          </div>
        )}
        <div className="flex gap-2 pt-1">
          <button type="button" onClick={onCancel}
            className="flex-1 py-2.5 border border-surface-border rounded-sm font-mono text-xs text-ink-600 hover:border-ink-400 transition-colors">
            Cancelar
          </button>
          <button type="submit" disabled={saving}
            className={`flex-1 py-2.5 text-white rounded-sm font-mono text-xs font-bold disabled:opacity-50 transition-colors ${
              isEntry ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
            }`}>
            {saving ? '…' : isEntry ? '↑ Registrar Entrada' : '↓ Registrar Saída'}
          </button>
        </div>
      </form>
    </motion.div>
  )
}

// ── ContratoForm ───────────────────────────────────────────────────────────
const EMPTY_PRODUTO = { nome_produto: '', volume: '', unidade: 'kg', preco_unit: '', valor_total: '' }

function ContratoForm({ initial, onSave, onCancel, saving }) {
  const { lang } = useLanguage()
  const statusCls = { ativo: 'bg-green-600', parcial: 'bg-amber-500', encerrado: 'bg-ink-500' }

  const [form, setForm] = useState({
    empresa:     initial?.empresa     || '',
    vencimento:  initial?.vencimento  || '',
    data_inicio: initial?.data_inicio || '',
    data_fim:    initial?.data_fim    || '',
    status:      initial?.status      || 'ativo',
    notas:       initial?.notas       || '',
  })

  // Support editing old single-product contracts and new multi-product ones
  const [produtos, setProdutos] = useState(() => {
    if (initial?.produtos_json?.length) return initial.produtos_json
    if (initial?.nome_produto) return [{
      nome_produto: initial.nome_produto,
      volume:       initial.volume     != null ? String(initial.volume)     : '',
      unidade:      initial.unidade    || 'kg',
      preco_unit:   initial.preco_unit != null ? String(initial.preco_unit) : '',
      valor_total:  initial.valor_total != null ? String(initial.valor_total) : '',
    }]
    return [{ ...EMPTY_PRODUTO }]
  })

  const [docFile, setDocFile]       = useState(null)
  const [autoEntrada, setAutoEntrada] = useState(false)
  const [showManual, setShowManual]   = useState(!!initial)

  const set  = (k, v)      => setForm(f => ({ ...f, [k]: v }))
  const setP = (i, k, v)   => setProdutos(ps => ps.map((p, idx) => idx === i ? { ...p, [k]: v } : p))
  const addP = ()           => setProdutos(ps => [...ps, { ...EMPTY_PRODUTO }])
  const delP = (i)          => setProdutos(ps => ps.filter((_, idx) => idx !== i))

  function handleFill(data) {
    setForm(f => ({
      ...f,
      ...(data.empresa     && { empresa:     String(data.empresa) }),
      ...(data.vencimento  && { vencimento:  String(data.vencimento) }),
      ...(data.data_inicio && { data_inicio: String(data.data_inicio) }),
      ...(data.data_fim    && { data_fim:    String(data.data_fim) }),
      ...(data.notas       && { notas:       String(data.notas) }),
    }))
    if (data.produtos?.length > 0) {
      setProdutos(data.produtos.map(p => ({
        nome_produto: String(p.nome_produto || ''),
        volume:       p.volume     != null ? String(p.volume)     : '',
        unidade:      UNIDADES.includes(p.unidade) ? p.unidade : 'kg',
        preco_unit:   p.preco_unit != null ? String(p.preco_unit) : '',
        valor_total:  p.valor_total != null ? String(p.valor_total) : '',
      })))
    }
    setShowManual(true)
  }

  return (
    <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }} transition={{ duration: 0.2 }}
      className="bg-white border border-surface-border rounded-card shadow-card p-5">
      <h3 className="font-display font-bold text-sm text-brand-900 mb-1">
        {initial ? '✏️ Editar Contrato' : '📋 Novo Contrato Grande'}
      </h3>
      <p className="font-mono text-[10px] text-ink-400 mb-4">
        {lang === 'en'
          ? 'Upload a document to auto-fill, or fill in manually.'
          : 'Envie o documento para preenchimento automático, ou preencha manualmente.'}
      </p>

      <form onSubmit={e => { e.preventDefault(); onSave(form, docFile, autoEntrada, produtos) }} className="space-y-4">

        {/* Upload com IA */}
        <div>
          <label className={lbl}>
            {lang === 'en' ? '📄 Document (auto-fill with AI)' : '📄 Documento (preenchimento automático com IA)'}
          </label>
          <ContratoUpload value={initial?.doc_url} onFill={handleFill} onChange={setDocFile} />
        </div>

        {!showManual && (
          <button type="button" onClick={() => setShowManual(true)}
            className="w-full py-2 border border-dashed border-surface-border rounded-sm font-mono text-[10px] text-ink-500 hover:border-brand-700 hover:text-brand-900 transition-colors">
            ✏️ {lang === 'en' ? 'Fill in manually instead' : 'Preencher manualmente'}
          </button>
        )}

        {showManual && (
          <div className="space-y-4 border-t border-surface-border/60 pt-4">
            <p className="font-mono text-[9px] text-ink-400 uppercase tracking-wider">
              {lang === 'en' ? 'Review / edit extracted data' : 'Revisar / editar dados extraídos'}
            </p>

            {/* Empresa e datas */}
            <div>
              <label className={lbl}>{lang === 'en' ? 'Supplier' : 'Empresa Fornecedora'}</label>
              <input className={fld} value={form.empresa}
                onChange={e => set('empresa', e.target.value)} placeholder="Ex: Agroshop Ltda" />
            </div>
            <div>
              <label className={lbl}>
                📅 {lang === 'en' ? 'Contract Due Date (Vencimento)' : 'Vencimento do Contrato'}
              </label>
              <input type="date" className={fld + ' border-amber-400 focus:border-amber-600'} value={form.vencimento}
                onChange={e => set('vencimento', e.target.value)} />
              <p className="font-mono text-[9px] text-ink-400 mt-0.5">
                {lang === 'en' ? 'This date appears in stock alerts and Finance tab' : 'Esta data aparece nos alertas de estoque e na aba Financeiro'}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={lbl}>{lang === 'en' ? 'Start Date' : 'Retirada a partir de'}</label>
                <input type="date" className={fld} value={form.data_inicio}
                  onChange={e => set('data_inicio', e.target.value)} />
              </div>
              <div>
                <label className={lbl}>{lang === 'en' ? 'End Date' : 'Data limite de retirada'}</label>
                <input type="date" className={fld} value={form.data_fim}
                  onChange={e => set('data_fim', e.target.value)} />
              </div>
            </div>

            {/* Status */}
            <div>
              <label className={lbl}>Status</label>
              <div className="flex gap-2">
                {['ativo', 'parcial', 'encerrado'].map(s => (
                  <button key={s} type="button" onClick={() => set('status', s)}
                    className={`flex-1 py-2 rounded-sm font-mono text-[10px] font-bold border-2 transition-all ${
                      form.status === s ? `${statusCls[s]} text-white border-transparent` : 'bg-white border-surface-border text-ink-400'
                    }`}>
                    {s === 'ativo' ? '🟢 Ativo' : s === 'parcial' ? '🟡 Parcial' : '⚫ Encerrado'}
                  </button>
                ))}
              </div>
            </div>

            {/* Lista de produtos */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className={lbl + ' mb-0'}>
                  {lang === 'en' ? 'Products' : 'Produtos'} ({produtos.length})
                </label>
                <button type="button" onClick={addP}
                  className="font-mono text-[10px] text-brand-700 hover:text-brand-900 px-2 py-1 border border-brand-300 rounded-sm hover:bg-brand-50 transition-colors">
                  + {lang === 'en' ? 'Add' : 'Adicionar'}
                </button>
              </div>

              {produtos.map((p, idx) => (
                <div key={idx} className="border border-surface-border rounded-sm p-3 space-y-2 bg-surface-bg/30">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] text-ink-400 font-bold uppercase tracking-wider">
                      {lang === 'en' ? 'Product' : 'Produto'} {idx + 1}
                    </span>
                    {produtos.length > 1 && (
                      <button type="button" onClick={() => delP(idx)}
                        className="font-mono text-[9px] text-danger-600 hover:text-danger-700">
                        🗑 {lang === 'en' ? 'Remove' : 'Remover'}
                      </button>
                    )}
                  </div>
                  <div>
                    <label className={lbl}>{lang === 'en' ? 'Product name *' : 'Nome do produto *'}</label>
                    <input className={fld} required value={p.nome_produto}
                      onChange={e => setP(idx, 'nome_produto', e.target.value)}
                      placeholder="Ex: Glifosato 480SL" />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <label className={lbl}>{lang === 'en' ? 'Volume' : 'Volume'}</label>
                      <input type="number" step="0.01" className={fld} value={p.volume}
                        onChange={e => setP(idx, 'volume', e.target.value)} placeholder="0" />
                    </div>
                    <div>
                      <label className={lbl}>{lang === 'en' ? 'Unit' : 'Unidade'}</label>
                      <select className={fld} value={p.unidade} onChange={e => setP(idx, 'unidade', e.target.value)}>
                        {UNIDADES.map(u => <option key={u} value={u}>{u}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className={lbl}>R$ / {lang === 'en' ? 'unit' : 'unidade'}</label>
                      <input type="number" step="0.01" className={fld} value={p.preco_unit}
                        onChange={e => setP(idx, 'preco_unit', e.target.value)} placeholder="0,00" />
                    </div>
                    <div>
                      <label className={lbl}>{lang === 'en' ? 'Total (R$)' : 'Valor Total (R$)'}</label>
                      <input type="number" step="0.01" className={fld} value={p.valor_total}
                        onChange={e => setP(idx, 'valor_total', e.target.value)} placeholder="0,00" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Notas */}
            <div>
              <label className={lbl}>{lang === 'en' ? 'Notes / Conditions' : 'Notas / Condições'}</label>
              <textarea className={fld + ' resize-none'} rows={2} value={form.notas}
                onChange={e => set('notas', e.target.value)} placeholder="Condições, observações…" />
            </div>

            {!initial && (
              <label className="flex items-center gap-2 cursor-pointer select-none p-2 bg-green-50 rounded-sm border border-green-200">
                <input type="checkbox" checked={autoEntrada} onChange={e => setAutoEntrada(e.target.checked)}
                  className="w-4 h-4 accent-green-600" />
                <span className="font-mono text-[10px] text-green-700">
                  {lang === 'en' ? 'Auto-register stock entry on save' : 'Registrar entrada automática no estoque ao salvar'}
                </span>
              </label>
            )}
          </div>
        )}

        <div className="flex gap-2 pt-1">
          <button type="button" onClick={onCancel}
            className="flex-1 py-2.5 border border-surface-border rounded-sm font-mono text-xs text-ink-600 hover:border-ink-400 transition-colors">
            {lang === 'en' ? 'Cancel' : 'Cancelar'}
          </button>
          <button type="submit" disabled={saving || !showManual}
            className="flex-1 py-2.5 bg-brand-900 text-white rounded-sm font-mono text-xs font-bold hover:bg-brand-700 disabled:opacity-40 transition-colors">
            {saving ? '…' : (lang === 'en' ? 'Save Contract' : 'Salvar Contrato')}
          </button>
        </div>
      </form>
    </motion.div>
  )
}

// ── Tab 4.1: Visão Geral ───────────────────────────────────────────────────
function VisaoGeral({ insumos, movs, onAddInsumo, onEditInsumo, onDeleteInsumo, onEntry, onExit, deleting }) {
  const [search, setSearch]   = useState('')
  const [filter, setFilter]   = useState('todos')
  const [expandedId, setExpanded] = useState(null)

  const filtered = useMemo(() => {
    let list = insumos
    if (search) list = list.filter(i =>
      i.nome.toLowerCase().includes(search.toLowerCase()) ||
      (i.empresa || '').toLowerCase().includes(search.toLowerCase())
    )
    if (filter === 'com-estoque') list = list.filter(i => (i.quantidade || 0) > 0)
    if (filter === 'zerados')     list = list.filter(i => (i.quantidade || 0) <= 0)
    if (filter === 'vencendo')    list = list.filter(i => { const d = daysUntil(i.vencimento); return d != null && d <= 30 })
    return list
  }, [insumos, search, filter])

  const valorEstoque  = insumos.reduce((s, i) => s + (i.quantidade || 0) * (i.preco_unitario || 0), 0)
  const totalFaturado = movs.filter(m => m.tipo === 'saida').reduce((s, m) => s + (m.quantidade || 0) * (m.preco_unit || 0), 0)
  const totalEntradas = movs.filter(m => m.tipo === 'entrada').reduce((s, m) => s + (m.quantidade || 0) * (m.preco_unit || 0), 0)
  const qtdZerados    = insumos.filter(i => (i.quantidade || 0) <= 0).length
  const qtdVencendo   = insumos.filter(i => { const d = daysUntil(i.vencimento); return d != null && d >= 0 && d <= 30 }).length

  function lastEntry(insumoId) {
    return movs.find(m => m.insumo_id === insumoId && m.tipo === 'entrada')?.data_mov || null
  }

  return (
    <div className="space-y-4">
      {/* Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-brand-900 text-white rounded-card p-4 shadow-card">
          <p className="font-mono text-[9px] opacity-70 uppercase tracking-wider">Valor em Estoque</p>
          <p className="font-display font-bold text-lg mt-1">{fmtR(valorEstoque)}</p>
          <p className="font-mono text-[9px] opacity-60">{insumos.filter(i => (i.quantidade || 0) > 0).length} ativos</p>
        </div>
        <div className="bg-green-600 text-white rounded-card p-4 shadow-card">
          <p className="font-mono text-[9px] opacity-70 uppercase tracking-wider">↑ Total Entradas</p>
          <p className="font-display font-bold text-lg mt-1">{fmtR(totalEntradas)}</p>
          <p className="font-mono text-[9px] opacity-60">{movs.filter(m => m.tipo === 'entrada').length} movs</p>
        </div>
        <div className="bg-red-600 text-white rounded-card p-4 shadow-card">
          <p className="font-mono text-[9px] opacity-70 uppercase tracking-wider">↓ Total Faturado</p>
          <p className="font-display font-bold text-lg mt-1">{fmtR(totalFaturado)}</p>
          <p className="font-mono text-[9px] opacity-60">{movs.filter(m => m.tipo === 'saida').length} saídas</p>
        </div>
        <div className={`${qtdZerados + qtdVencendo > 0 ? 'bg-amber-500' : 'bg-brand-700'} text-white rounded-card p-4 shadow-card`}>
          <p className="font-mono text-[9px] opacity-70 uppercase tracking-wider">⚠️ Alertas</p>
          <p className="font-display font-bold text-lg mt-1">{qtdZerados + qtdVencendo}</p>
          <p className="font-mono text-[9px] opacity-60">{qtdZerados} zerados · {qtdVencendo} vencendo</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-2 items-center">
        <input className="flex-1 min-w-[160px] border border-surface-border rounded-sm px-3 py-2 font-mono text-xs bg-white focus:outline-none focus:border-brand-700 transition-colors"
          placeholder="🔍 Buscar insumo…" value={search} onChange={e => setSearch(e.target.value)} />
        <div className="flex gap-1 flex-wrap">
          {[['todos','Todos'],['com-estoque','Em estoque'],['zerados','🔴 Zerados'],['vencendo','🟠 Vencendo']].map(([k,l]) => (
            <button key={k} onClick={() => setFilter(k)}
              className={`px-3 py-2 rounded-sm font-mono text-[10px] border transition-colors ${
                filter === k ? 'bg-brand-900 text-white border-brand-900' : 'bg-white border-surface-border text-ink-500 hover:border-brand-400'
              }`}>{l}</button>
          ))}
        </div>
        <button onClick={onAddInsumo}
          className="px-4 py-2 bg-brand-900 text-white rounded-sm font-mono text-xs font-bold hover:bg-brand-700 transition-colors flex-shrink-0">
          + Novo Insumo
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-surface-border rounded-card shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono min-w-[860px]">
            <thead>
              <tr className="bg-brand-900 text-white">
                <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider">Nome do Produto</th>
                <th className="px-3 py-3 text-right text-[10px] uppercase tracking-wider">Quantidade</th>
                <th className="px-3 py-3 text-center text-[10px] uppercase tracking-wider">Últ. Entrada</th>
                <th className="px-3 py-3 text-right text-[10px] uppercase tracking-wider">R$/un</th>
                <th className="px-3 py-3 text-right text-[10px] uppercase tracking-wider">Valor Total</th>
                <th className="px-3 py-3 text-center text-[10px] uppercase tracking-wider">Vencimento</th>
                <th className="px-3 py-3 text-left text-[10px] uppercase tracking-wider">Empresa</th>
                <th className="px-3 py-3 text-center text-[10px] uppercase tracking-wider">Status</th>
                <th className="px-3 py-3 text-center text-[10px] uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center font-mono text-xs text-ink-400">
                    {search ? 'Nenhum resultado.' : 'Nenhum insumo cadastrado.'}
                  </td>
                </tr>
              )}
              {filtered.map((ins, idx) => {
                const qty      = ins.quantidade || 0
                const zerado   = qty <= 0
                const days     = daysUntil(ins.vencimento)
                const expired  = days != null && days < 0
                const expiring = days != null && days >= 0 && days <= 30
                const valor    = qty * (ins.preco_unitario || 0)
                const isExp    = expandedId === ins.id
                const rowMovs  = movs.filter(m => m.insumo_id === ins.id).slice(0, 6)

                return (
                  <Fragment key={ins.id}>
                    <tr className={`border-b border-surface-border/60 transition-colors ${
                      zerado ? 'bg-red-50 border-l-4 border-l-red-500'
                      : (expired || expiring) ? 'bg-amber-50/30'
                      : idx % 2 === 0 ? 'bg-white' : 'bg-surface-bg/20'
                    }`}>
                      <td className="px-4 py-3">
                        <div className="flex items-start gap-2">
                          <div>
                            <span className={`font-display font-bold text-sm ${zerado ? 'text-red-600' : 'text-brand-900'}`}>
                              {ins.nome}
                            </span>
                            {ins.vencimento && (
                              <p className={`font-mono text-[9px] mt-0.5 ${
                                expired ? 'text-red-600 font-bold' : expiring ? 'text-amber-600 font-bold' : 'text-ink-400'
                              }`}>
                                📅 {expired ? 'VENCIDO ' : expiring ? `${days}d · ` : ''}{fmtDate(ins.vencimento)}
                              </p>
                            )}
                          </div>
                          {ins.doc_url && (
                            <a href={ins.doc_url} target="_blank" rel="noopener noreferrer"
                              className="text-[9px] px-1.5 py-0.5 bg-brand-50 border border-brand-300 text-brand-700 rounded-full hover:bg-brand-100 transition-colors flex-shrink-0 mt-0.5">📎</a>
                          )}
                        </div>
                      </td>
                      <td className={`px-3 py-3 text-right font-bold ${zerado ? 'text-red-600' : 'text-ink-700'}`}>
                        {zerado ? <span className="text-red-500">—</span> : fmt(qty)}
                        {' '}<span className="font-normal text-ink-400 text-[10px]">{ins.unidade}</span>
                      </td>
                      <td className="px-3 py-3 text-center text-ink-400 text-[10px]">{fmtDate(lastEntry(ins.id))}</td>
                      <td className="px-3 py-3 text-right text-ink-500">
                        {ins.preco_unitario ? `R$ ${fmt(ins.preco_unitario)}` : '—'}
                      </td>
                      <td className={`px-3 py-3 text-right font-bold ${zerado ? 'text-red-400' : 'text-ink-700'}`}>
                        {zerado ? 'R$ 0,00' : `R$ ${fmt(valor)}`}
                      </td>
                      <td className={`px-3 py-3 text-center text-[10px] ${expired ? 'text-red-600 font-bold' : expiring ? 'text-amber-600 font-bold' : 'text-ink-400'}`}>
                        {fmtDate(ins.vencimento)}
                      </td>
                      <td className="px-3 py-3 text-ink-500 text-[10px]">{ins.empresa || '—'}</td>
                      <td className="px-3 py-3 text-center"><StatusBadge ins={ins} /></td>
                      <td className="px-3 py-3">
                        <div className="flex items-center justify-center gap-1">
                          <button onClick={() => onEntry(ins)} title="Entrada"
                            className="px-2 py-1 bg-green-600 text-white rounded-sm font-bold text-sm hover:bg-green-700 transition-colors leading-none">↑</button>
                          <button onClick={() => onExit(ins)} title="Saída"
                            className="px-2 py-1 bg-red-600 text-white rounded-sm font-bold text-sm hover:bg-red-700 transition-colors leading-none">↓</button>
                          <button onClick={() => setExpanded(isExp ? null : ins.id)} title="Histórico"
                            className="px-2 py-1 bg-surface-bg border border-surface-border rounded-sm font-mono text-[10px] text-ink-500 hover:border-ink-300 transition-colors">
                            {isExp ? '▲' : '▼'}
                          </button>
                          <button onClick={() => onEditInsumo(ins)} title="Editar"
                            className="w-7 h-7 flex items-center justify-center rounded-sm text-ink-400 hover:bg-brand-50 hover:text-brand-900 transition-colors">✏️</button>
                          <button onClick={() => onDeleteInsumo(ins.id)} disabled={deleting === ins.id} title="Excluir"
                            className="w-7 h-7 flex items-center justify-center rounded-sm text-ink-300 hover:bg-danger-50 hover:text-danger-600 transition-colors">
                            {deleting === ins.id ? '…' : '🗑'}
                          </button>
                        </div>
                      </td>
                    </tr>
                    {/* Histórico expandido */}
                    {isExp && (
                      <tr className="bg-surface-bg/60 border-b border-surface-border">
                        <td colSpan={9} className="px-5 py-3">
                          <p className="font-mono text-[9px] font-bold text-ink-400 uppercase tracking-wider mb-2">
                            Histórico de movimentações
                          </p>
                          {rowMovs.length === 0 ? (
                            <p className="font-mono text-[10px] text-ink-300">Sem movimentações registradas.</p>
                          ) : (
                            <div className="flex flex-wrap gap-2">
                              {rowMovs.map(m => (
                                <div key={m.id} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border font-mono text-[10px] ${
                                  m.tipo === 'entrada'
                                    ? 'bg-green-50 border-green-200 text-green-700'
                                    : 'bg-red-50 border-red-200 text-red-700'
                                }`}>
                                  <span className="font-bold">{m.tipo === 'entrada' ? '↑' : '↓'}</span>
                                  <span>{fmt(m.quantidade)} {ins.unidade}</span>
                                  {m.preco_unit && <span className="opacity-60">· R$ {fmt(m.preco_unit)}</span>}
                                  <span className="opacity-50">{fmtDate(m.data_mov)}</span>
                                  {m.doc_url && (
                                    <a href={m.doc_url} target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100">📎</a>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </td>
                      </tr>
                    )}
                  </Fragment>
                )
              })}
            </tbody>
            {/* Footer */}
            <tfoot>
              <tr className="bg-brand-900/5 border-t-2 border-brand-900/20">
                <td className="px-4 py-3 font-display font-bold text-sm text-brand-900" colSpan={4}>
                  📊 {filtered.length} insumos
                </td>
                <td className="px-3 py-3 text-right font-bold text-brand-900 text-sm">
                  {fmtR(filtered.reduce((s, i) => s + (i.quantidade || 0) * (i.preco_unitario || 0), 0))}
                </td>
                <td colSpan={4} className="px-4 py-3">
                  <div className="flex gap-4 justify-end flex-wrap">
                    <span className="font-mono text-[10px] text-green-700">
                      ↑ Entradas: <strong>{fmtR(totalEntradas)}</strong>
                    </span>
                    <span className="font-mono text-[10px] text-red-700">
                      ↓ Faturado: <strong>{fmtR(totalFaturado)}</strong>
                    </span>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}

// ── Tab 4.2: Contratos ─────────────────────────────────────────────────────
function Contratos({ contratos, onAdd, onEdit, onDelete, deleting }) {
  const sColor = { ativo: 'bg-green-100 text-green-700 border-green-200', parcial: 'bg-amber-100 text-amber-700 border-amber-200', encerrado: 'bg-ink-100 text-ink-500 border-ink-200' }
  const sLabel = { ativo: '🟢 Ativo', parcial: '🟡 Parcial', encerrado: '⚫ Encerrado' }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] text-ink-400">Contratos e fornecimentos em grande volume</p>
        <button onClick={onAdd}
          className="px-4 py-2.5 bg-brand-900 text-white rounded-sm font-mono text-xs font-bold hover:bg-brand-700 transition-colors">
          + Novo Contrato
        </button>
      </div>

      {contratos.length === 0 ? (
        <div className="bg-white border border-surface-border rounded-card p-12 text-center shadow-card">
          <p className="text-4xl mb-3">📋</p>
          <p className="font-mono text-xs text-ink-400">Nenhum contrato cadastrado.</p>
          <p className="font-mono text-[10px] text-ink-300 mt-1">Registre contratos de fornecimento em grande volume com documentação.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contratos.map(c => (
            <div key={c.id} className="bg-white border border-surface-border rounded-card shadow-card p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="font-display font-bold text-sm text-brand-900 truncate">{c.nome_produto}</p>
                  {c.empresa && <p className="font-mono text-[10px] text-ink-400 mt-0.5">{c.empresa}</p>}
                </div>
                <span className={`px-2 py-0.5 rounded-full font-mono text-[9px] font-bold border flex-shrink-0 ${sColor[c.status] || sColor.ativo}`}>
                  {sLabel[c.status] || c.status}
                </span>
              </div>

              {c.produtos_json?.length > 0 ? (
                <div className="space-y-1">
                  {c.produtos_json.map((p, i) => (
                    <div key={i} className="flex items-center justify-between bg-surface-bg rounded-sm px-2.5 py-1.5 gap-2">
                      <span className="font-mono text-[10px] text-brand-900 font-bold truncate flex-1">{p.nome_produto}</span>
                      <span className="font-mono text-[10px] text-ink-400 flex-shrink-0 text-right">
                        {p.volume ? `${fmt(p.volume)} ${p.unidade}` : '—'}
                        {p.preco_unit ? ` · R$ ${fmt(p.preco_unit)}` : ''}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-surface-bg rounded-sm p-2">
                    <p className="font-mono text-[9px] text-ink-400 uppercase">Volume</p>
                    <p className="font-display font-bold text-sm text-brand-900">{c.volume ? `${fmt(c.volume)} ${c.unidade}` : '—'}</p>
                  </div>
                  <div className="bg-surface-bg rounded-sm p-2">
                    <p className="font-mono text-[9px] text-ink-400 uppercase">R$/un</p>
                    <p className="font-display font-bold text-sm text-brand-900">{c.preco_unit ? `R$ ${fmt(c.preco_unit)}` : '—'}</p>
                  </div>
                  <div className="bg-surface-bg rounded-sm p-2">
                    <p className="font-mono text-[9px] text-ink-400 uppercase">Total</p>
                    <p className="font-display font-bold text-sm text-brand-900">{c.valor_total ? fmtR(c.valor_total) : '—'}</p>
                  </div>
                </div>
              )}

              {(c.data_inicio || c.data_fim) && (
                <p className="font-mono text-[10px] text-ink-400">
                  📅 {fmtDate(c.data_inicio)}{c.data_inicio && c.data_fim ? ' → ' : ''}{fmtDate(c.data_fim)}
                </p>
              )}
              {c.notas && <p className="font-mono text-[10px] text-ink-400 italic line-clamp-2">{c.notas}</p>}

              <div className="flex gap-2 pt-1 border-t border-surface-border/50">
                {c.doc_url && (
                  <a href={c.doc_url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1.5 border border-brand-300 rounded-sm font-mono text-[10px] text-brand-700 hover:bg-brand-50 transition-colors">
                    📎 Ver documento
                  </a>
                )}
                <div className="flex-1" />
                <button onClick={() => onEdit(c)}
                  className="w-8 h-8 flex items-center justify-center rounded-sm text-ink-400 hover:bg-brand-50 hover:text-brand-900 transition-colors">✏️</button>
                <button onClick={() => onDelete(c.id)} disabled={deleting === c.id}
                  className="w-8 h-8 flex items-center justify-center rounded-sm text-ink-300 hover:bg-danger-50 hover:text-danger-600 transition-colors">
                  {deleting === c.id ? '…' : '🗑'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Tab 4.3: Entradas e Saídas ─────────────────────────────────────────────
function EntradaSaida({ movs, insumos, onNewMov }) {
  const [filter, setFilter] = useState('todos')
  const [search, setSearch]  = useState('')

  const filtered = useMemo(() => {
    let list = movs
    if (filter === 'entradas') list = list.filter(m => m.tipo === 'entrada')
    if (filter === 'saidas')   list = list.filter(m => m.tipo === 'saida')
    if (search) list = list.filter(m =>
      (m.insumos?.nome || '').toLowerCase().includes(search.toLowerCase()) ||
      (m.nota || '').toLowerCase().includes(search.toLowerCase()) ||
      (m.empresa || '').toLowerCase().includes(search.toLowerCase())
    )
    return list
  }, [movs, filter, search])

  const totEnt = filtered.filter(m => m.tipo === 'entrada').reduce((s, m) => s + (m.quantidade || 0) * (m.preco_unit || 0), 0)
  const totSai = filtered.filter(m => m.tipo === 'saida').reduce((s, m) => s + (m.quantidade || 0) * (m.preco_unit || 0), 0)

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 items-center">
        <input className="flex-1 min-w-[160px] border border-surface-border rounded-sm px-3 py-2 font-mono text-xs bg-white focus:outline-none focus:border-brand-700 transition-colors"
          placeholder="🔍 Buscar insumo, nota, empresa…" value={search} onChange={e => setSearch(e.target.value)} />
        <div className="flex gap-1">
          {[['todos','Todos'],['entradas','↑ Entradas'],['saidas','↓ Saídas']].map(([k,l]) => (
            <button key={k} onClick={() => setFilter(k)}
              className={`px-3 py-2 rounded-sm font-mono text-[10px] border transition-colors ${
                filter === k ? 'bg-brand-900 text-white border-brand-900' : 'bg-white border-surface-border text-ink-500 hover:border-brand-400'
              }`}>{l}</button>
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={() => onNewMov('entrada')}
            className="px-4 py-2 bg-green-600 text-white rounded-sm font-mono text-xs font-bold hover:bg-green-700 transition-colors">
            ↑ Entrada
          </button>
          <button onClick={() => onNewMov('saida')}
            className="px-4 py-2 bg-red-600 text-white rounded-sm font-mono text-xs font-bold hover:bg-red-700 transition-colors">
            ↓ Saída
          </button>
        </div>
      </div>

      {filtered.length > 0 && (
        <div className="flex gap-3 flex-wrap">
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-sm px-3 py-1.5">
            <span className="text-green-600 font-bold">↑</span>
            <span className="font-mono text-[10px] text-green-700">
              {filtered.filter(m => m.tipo === 'entrada').length} entradas · <strong>{fmtR(totEnt)}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-sm px-3 py-1.5">
            <span className="text-red-600 font-bold">↓</span>
            <span className="font-mono text-[10px] text-red-700">
              {filtered.filter(m => m.tipo === 'saida').length} saídas · <strong>{fmtR(totSai)}</strong>
            </span>
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="bg-white border border-surface-border rounded-card p-12 text-center shadow-card">
          <p className="text-4xl mb-2">↕️</p>
          <p className="font-mono text-xs text-ink-400">
            {search || filter !== 'todos' ? 'Nenhum resultado.' : 'Nenhuma movimentação registrada. Use ↑ Entrada ou ↓ Saída para começar.'}
          </p>
        </div>
      ) : (
        <div className="bg-white border border-surface-border rounded-card shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono min-w-[720px]">
              <thead>
                <tr className="bg-brand-900 text-white">
                  <th className="px-3 py-2.5 text-center w-10 text-[10px] uppercase">Tipo</th>
                  <th className="px-3 py-2.5 text-left text-[10px] uppercase tracking-wider">Insumo</th>
                  <th className="px-3 py-2.5 text-right text-[10px] uppercase tracking-wider">Qtd</th>
                  <th className="px-3 py-2.5 text-right text-[10px] uppercase tracking-wider">R$/un</th>
                  <th className="px-3 py-2.5 text-right text-[10px] uppercase tracking-wider">Total</th>
                  <th className="px-3 py-2.5 text-center text-[10px] uppercase tracking-wider">Data</th>
                  <th className="px-3 py-2.5 text-left text-[10px] uppercase tracking-wider">Empresa</th>
                  <th className="px-3 py-2.5 text-left text-[10px] uppercase tracking-wider">Obs</th>
                  <th className="px-3 py-2.5 text-center w-8">📎</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((m, idx) => {
                  const total   = (m.quantidade || 0) * (m.preco_unit || 0)
                  const isEntry = m.tipo === 'entrada'
                  return (
                    <tr key={m.id} className={`border-b border-surface-border/40 ${
                      isEntry ? 'hover:bg-green-50/30' : 'hover:bg-red-50/30'
                    } ${idx % 2 === 0 ? '' : 'bg-surface-bg/20'}`}>
                      <td className="px-3 py-2.5 text-center">
                        <span className={`text-base font-bold leading-none ${isEntry ? 'text-green-600' : 'text-red-600'}`}>
                          {isEntry ? '↑' : '↓'}
                        </span>
                      </td>
                      <td className="px-3 py-2.5">
                        <p className="font-display font-bold text-brand-900">{m.insumos?.nome || '—'}</p>
                      </td>
                      <td className="px-3 py-2.5 text-right font-bold">
                        {fmt(m.quantidade)} <span className="font-normal text-ink-400">{m.insumos?.unidade}</span>
                      </td>
                      <td className="px-3 py-2.5 text-right text-ink-400">
                        {m.preco_unit ? `R$ ${fmt(m.preco_unit)}` : '—'}
                      </td>
                      <td className={`px-3 py-2.5 text-right font-bold ${isEntry ? 'text-green-700' : 'text-red-700'}`}>
                        {total > 0 ? fmtR(total) : '—'}
                      </td>
                      <td className="px-3 py-2.5 text-center text-ink-400 text-[10px]">{fmtDate(m.data_mov)}</td>
                      <td className="px-3 py-2.5 text-ink-400 text-[10px]">{m.empresa || '—'}</td>
                      <td className="px-3 py-2.5 text-ink-400 text-[10px] max-w-[120px] truncate">{m.nota || '—'}</td>
                      <td className="px-3 py-2.5 text-center">
                        {m.doc_url
                          ? <a href={m.doc_url} target="_blank" rel="noopener noreferrer" className="text-brand-700 hover:text-brand-900">📎</a>
                          : <span className="text-ink-200">—</span>}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Página principal ───────────────────────────────────────────────────────
export default function EstoquePage() {
  const { lang } = useLanguage()
  const [tab, setTab]               = useState('visao-geral')
  const [insumos, setInsumos]       = useState([])
  const [movs, setMovs]             = useState([])
  const [contratos, setContratos]   = useState([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState('')
  const [saving, setSaving]         = useState(false)
  const [deleting, setDeleting]     = useState(null)
  const [insumoPanel, setInsumoPanel]     = useState(null) // null | 'new' | insumo
  const [movPanel, setMovPanel]           = useState(null) // null | { insumo?, tipo }
  const [contratoPanel, setContratoPanel] = useState(null) // null | 'new' | contrato

  useEffect(() => {
    Promise.all([listInsumos(), listMovimentacoes(500), listContratos()])
      .then(([ins, mv, con]) => { setInsumos(ins); setMovs(mv); setContratos(con) })
      .catch(() => setError(lang === 'en' ? 'Error loading data.' : 'Erro ao carregar dados.'))
      .finally(() => setLoading(false))
  }, [])

  const showPanel = insumoPanel !== null || movPanel !== null || contratoPanel !== null

  function closeAll() { setInsumoPanel(null); setMovPanel(null); setContratoPanel(null) }

  async function handleSaveInsumo(form, docFile) {
    setSaving(true); setError('')
    try {
      let doc_url = form.doc_url || null
      if (docFile) doc_url = await uploadEstoqueDoc(docFile, 'insumos')
      const payload = {
        nome: form.nome, empresa: form.empresa || null, unidade: form.unidade,
        quantidade: form.quantidade !== '' ? parseFloat(form.quantidade) : 0,
        preco_unitario: form.preco_unitario !== '' ? parseFloat(form.preco_unitario) : 0,
        vencimento: form.vencimento || null, doc_url,
      }
      if (insumoPanel === 'new') {
        const novo = await createInsumo(payload)
        setInsumos(prev => [...prev, novo].sort((a, b) => a.nome.localeCompare(b.nome)))
      } else {
        const updated = await updateInsumo(insumoPanel.id, payload)
        setInsumos(prev => prev.map(i => i.id === updated.id ? updated : i))
      }
      setInsumoPanel(null)
    } catch { setError(lang === 'en' ? 'Error saving.' : 'Erro ao salvar insumo.') }
    finally { setSaving(false) }
  }

  async function handleDeleteInsumo(id) {
    if (!window.confirm(lang === 'en' ? 'Delete this input?' : 'Excluir este insumo?')) return
    setDeleting(id)
    try {
      await deleteInsumo(id)
      setInsumos(prev => prev.filter(i => i.id !== id))
    } catch { setError(lang === 'en' ? 'Error deleting.' : 'Erro ao excluir.') }
    finally { setDeleting(null) }
  }

  async function handleSaveMov(form, docFile) {
    setSaving(true); setError('')
    try {
      let doc_url = null
      if (docFile) doc_url = await uploadEstoqueDoc(docFile, 'movimentacoes')
      const precoNum = form.preco_unit !== '' ? parseFloat(form.preco_unit) : null
      const { mov, novaQtd } = await createMovimentacao({
        insumo_id: form.insumo_id,
        tipo: form.tipo,
        quantidade: parseFloat(form.quantidade),
        preco_unit: precoNum,
        data_mov: form.data_mov,
        nota: form.nota || null,
        empresa: form.empresa || null,
        doc_url,
      })
      const ins = insumos.find(i => i.id === form.insumo_id)
      // On entrada with price: update preco_unitario so "Valor em Estoque" reflects real cost
      const insumoUpdate = { quantidade: novaQtd }
      if (form.tipo === 'entrada' && precoNum && precoNum > 0) {
        insumoUpdate.preco_unitario = precoNum
        await updateInsumo(form.insumo_id, { preco_unitario: precoNum })
      }
      setInsumos(prev => prev.map(i => i.id === form.insumo_id ? { ...i, ...insumoUpdate } : i))
      setMovs(prev => [{ ...mov, insumos: { nome: ins?.nome, unidade: ins?.unidade } }, ...prev])
      setMovPanel(null)
    } catch { setError(lang === 'en' ? 'Error recording.' : 'Erro ao registrar movimentação.') }
    finally { setSaving(false) }
  }

  async function handleSaveContrato(form, docFile, autoEntrada, produtos) {
    setSaving(true); setError('')
    try {
      let doc_url = form.doc_url || null
      if (docFile) doc_url = await uploadEstoqueDoc(docFile, 'contratos')

      const validProdutos = (produtos || []).filter(p => p.nome_produto?.trim())
      if (validProdutos.length === 0) {
        setError(lang === 'en' ? 'Add at least one product.' : 'Informe ao menos um produto.')
        setSaving(false)
        return
      }

      // Campos compartilhados entre todos os produtos do contrato
      const shared = {
        empresa:     form.empresa     || null,
        vencimento:  form.vencimento  || null,
        data_inicio: form.data_inicio || null,
        data_fim:    form.data_fim    || null,
        status:      form.status,
        notas:       form.notas       || null,
        doc_url,
      }

      // ── Em modo edição: atualiza apenas o contrato existente (1 produto) ─
      // ── Em modo criação: cria 1 contrato por produto ──────────────────────
      const savedPairs = [] // [{ contrato, produto }]

      if (contratoPanel !== 'new') {
        const p0 = validProdutos[0]
        const updated = await updateContrato(contratoPanel.id, {
          ...shared,
          nome_produto: p0.nome_produto,
          volume:       p0.volume      ? parseFloat(p0.volume)      : null,
          unidade:      p0.unidade     || 'kg',
          valor_total:  p0.valor_total ? parseFloat(p0.valor_total) : null,
          preco_unit:   p0.preco_unit  ? parseFloat(p0.preco_unit)  : null,
        })
        setContratos(prev => prev.map(c => c.id === updated.id ? updated : c))
        savedPairs.push({ contrato: updated, produto: p0 })
      } else {
        for (const produto of validProdutos) {
          const saved = await createContrato({
            ...shared,
            nome_produto: produto.nome_produto,
            volume:       produto.volume      ? parseFloat(produto.volume)      : null,
            unidade:      produto.unidade     || 'kg',
            valor_total:  produto.valor_total ? parseFloat(produto.valor_total) : null,
            preco_unit:   produto.preco_unit  ? parseFloat(produto.preco_unit)  : null,
          })
          savedPairs.push({ contrato: saved, produto })
        }
        setContratos(prev => [...[...savedPairs].reverse().map(s => s.contrato), ...prev])
      }

      // ── Sincronizar cada produto com insumos (4.1) ────────────────────
      const createdThisRound = []

      for (const { contrato, produto } of savedPairs) {
        const precoNum  = produto.preco_unit  != null && produto.preco_unit  !== '' ? parseFloat(produto.preco_unit)  : null
        const volumeNum = produto.volume      != null && produto.volume      !== '' ? parseFloat(produto.volume)      : null
        const unidade   = produto.unidade || 'kg'
        const nomeLower = produto.nome_produto.toLowerCase().trim()

        const existingInsumo =
          insumos.find(i => i.nome.toLowerCase().trim() === nomeLower) ||
          createdThisRound.find(i => i.nome.toLowerCase().trim() === nomeLower)

        let targetInsumo = existingInsumo
        const vencimentoInsumo = form.vencimento || form.data_fim || null

        if (!existingInsumo) {
          const novoInsumo = await createInsumo({
            nome: produto.nome_produto,
            empresa: form.empresa || null,
            unidade,
            quantidade: 0,
            preco_unitario: precoNum || 0,
            vencimento: vencimentoInsumo,
            doc_url: null,
          })
          createdThisRound.push(novoInsumo)
          setInsumos(prev => [...prev, novoInsumo].sort((a, b) => a.nome.localeCompare(b.nome)))
          targetInsumo = novoInsumo
        } else if (precoNum && precoNum > 0) {
          const updateFields = { preco_unitario: precoNum }
          if (vencimentoInsumo) updateFields.vencimento = vencimentoInsumo
          const updated = await updateInsumo(existingInsumo.id, updateFields)
          setInsumos(prev => prev.map(i => i.id === updated.id ? updated : i))
          targetInsumo = updated
        }

        if (autoEntrada && volumeNum && volumeNum > 0 && targetInsumo) {
          const { mov, novaQtd } = await createMovimentacao({
            insumo_id: targetInsumo.id,
            tipo: 'entrada',
            quantidade: volumeNum,
            preco_unit: precoNum || null,
            data_mov: form.data_inicio || todayStr(),
            nota: `Contrato ${contrato.id.slice(0, 8)}`,
            empresa: form.empresa || null,
            doc_url,
          })
          setInsumos(prev => prev.map(i =>
            i.id === targetInsumo.id
              ? { ...i, quantidade: novaQtd, ...(precoNum ? { preco_unitario: precoNum } : {}) }
              : i
          ))
          setMovs(prev => [{ ...mov, insumos: { nome: produto.nome_produto, unidade } }, ...prev])
        }
      }

      setContratoPanel(null)
    } catch (e) {
      setError(lang === 'en' ? 'Error saving contract.' : 'Erro ao salvar contrato.')
    }
    finally { setSaving(false) }
  }

  async function handleDeleteContrato(id) {
    if (!window.confirm(lang === 'en' ? 'Delete this contract?' : 'Excluir este contrato?')) return
    setDeleting(id)
    try {
      await deleteContrato(id)
      setContratos(prev => prev.filter(c => c.id !== id))
    } catch { setError(lang === 'en' ? 'Error deleting.' : 'Erro ao excluir contrato.') }
    finally { setDeleting(null) }
  }

  const TABS = [
    { key: 'visao-geral',    label: lang === 'en' ? '4.1 Overview'        : '4.1 Visão Geral' },
    { key: 'contratos',      label: lang === 'en' ? '4.2 Contracts'       : '4.2 Contratos' },
    { key: 'movimentacoes',  label: lang === 'en' ? '4.3 Entries & Exits' : '4.3 Entradas e Saídas' },
  ]

  return (
    <AppLayout>
      <div className="space-y-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-brand-900">
            {lang === 'en' ? '📦 Stock' : '📦 Estoque'}
          </h1>
          <p className="font-mono text-xs text-ink-400 mt-0.5">
            {lang === 'en' ? 'Professional agricultural stock management' : 'Gestão profissional de insumos agrícolas'}
          </p>
        </div>

        {error && (
          <div className="bg-danger-50 border border-danger-600 rounded-sm p-3 font-mono text-xs text-danger-600">{error}</div>
        )}

        {loading ? (
          <div className="flex justify-center py-20"><Spinner /></div>
        ) : (
          <>
            {/* Tab nav */}
            {!showPanel && (
              <div className="flex border-b border-surface-border">
                {TABS.map(t => (
                  <button key={t.key} onClick={() => setTab(t.key)}
                    className={`px-5 py-2.5 font-mono text-xs border-b-2 -mb-px transition-all ${
                      tab === t.key
                        ? 'border-brand-900 text-brand-900 font-bold bg-brand-50/30'
                        : 'border-transparent text-ink-400 hover:text-ink-700 hover:border-ink-200'
                    }`}>
                    {t.label}
                  </button>
                ))}
              </div>
            )}

            <div className={showPanel ? 'flex flex-col lg:flex-row gap-5' : ''}>
              {/* Main content */}
              <div className={showPanel ? 'flex-1 min-w-0' : 'w-full'}>
                {tab === 'visao-geral' && (
                  <VisaoGeral
                    insumos={insumos} movs={movs}
                    onAddInsumo={() => { setInsumoPanel('new'); setMovPanel(null); setContratoPanel(null) }}
                    onEditInsumo={ins => { setInsumoPanel(ins); setMovPanel(null); setContratoPanel(null) }}
                    onDeleteInsumo={handleDeleteInsumo}
                    onEntry={ins => { setMovPanel({ insumo: ins, tipo: 'entrada' }); setInsumoPanel(null); setContratoPanel(null) }}
                    onExit={ins =>  { setMovPanel({ insumo: ins, tipo: 'saida'  }); setInsumoPanel(null); setContratoPanel(null) }}
                    deleting={deleting}
                  />
                )}
                {tab === 'contratos' && (
                  <Contratos
                    contratos={contratos}
                    onAdd={() => { setContratoPanel('new'); setInsumoPanel(null); setMovPanel(null) }}
                    onEdit={c =>  { setContratoPanel(c); setInsumoPanel(null); setMovPanel(null) }}
                    onDelete={handleDeleteContrato}
                    deleting={deleting}
                  />
                )}
                {tab === 'movimentacoes' && (
                  <EntradaSaida
                    movs={movs} insumos={insumos}
                    onNewMov={tipo => { setMovPanel({ insumo: null, tipo }); setInsumoPanel(null); setContratoPanel(null) }}
                  />
                )}
              </div>

              {/* Side panels */}
              <AnimatePresence>
                {insumoPanel !== null && (
                  <div key="insumo-panel" className="lg:w-[360px] lg:flex-shrink-0">
                    <InsumoForm
                      initial={insumoPanel === 'new' ? null : insumoPanel}
                      onSave={handleSaveInsumo}
                      onCancel={() => setInsumoPanel(null)}
                      saving={saving}
                    />
                  </div>
                )}
                {movPanel !== null && (
                  <div key="mov-panel" className="lg:w-[380px] lg:flex-shrink-0">
                    <MovForm
                      insumos={insumos}
                      initialInsumo={movPanel.insumo}
                      initialTipo={movPanel.tipo}
                      onSave={handleSaveMov}
                      onCancel={() => setMovPanel(null)}
                      saving={saving}
                    />
                  </div>
                )}
                {contratoPanel !== null && (
                  <div key="contrato-panel" className="lg:w-[400px] lg:flex-shrink-0">
                    <ContratoForm
                      initial={contratoPanel === 'new' ? null : contratoPanel}
                      onSave={handleSaveContrato}
                      onCancel={() => setContratoPanel(null)}
                      saving={saving}
                    />
                  </div>
                )}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </AppLayout>
  )
}
