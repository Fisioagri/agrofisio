import { useEffect, useState } from 'react'
import AppLayout from '../layouts/AppLayout'
import Spinner from '../components/ui/Spinner'
import { listInsumos } from '../services/estoquesService'
import { listMovimentacoes } from '../services/estoquesService'
import { useLanguage } from '../contexts/LanguageContext'

function fmt(n) {
  if (n == null || n === 0) return 'R$ 0,00'
  return `R$ ${Number(n).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function fmtDate(d) {
  if (!d) return '—'
  return new Date(d + 'T12:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function daysUntil(dateStr) {
  if (!dateStr) return null
  return Math.ceil((new Date(dateStr + 'T12:00:00') - new Date()) / (1000 * 60 * 60 * 24))
}

function StatCard({ label, value, sub, color = 'brand' }) {
  const colors = {
    brand:  'bg-brand-900 text-white',
    green:  'bg-green-600 text-white',
    red:    'bg-red-600 text-white',
    amber:  'bg-amber-500 text-white',
  }
  return (
    <div className={`${colors[color]} rounded-card p-4 shadow-card`}>
      <p className="font-mono text-[10px] opacity-70 uppercase tracking-wider">{label}</p>
      <p className="font-display font-bold text-xl mt-1">{value}</p>
      {sub && <p className="font-mono text-[10px] opacity-60 mt-0.5">{sub}</p>}
    </div>
  )
}

export default function FinanceiroPage() {
  const { lang } = useLanguage()
  const [insumos, setInsumos] = useState([])
  const [movs, setMovs]       = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState('')

  useEffect(() => {
    Promise.all([listInsumos(), listMovimentacoes(200)])
      .then(([ins, mv]) => { setInsumos(ins); setMovs(mv) })
      .catch(() => setError(lang === 'en' ? 'Error loading data.' : 'Erro ao carregar dados.'))
      .finally(() => setLoading(false))
  }, [])

  // ── Derived stats ──────────────────────────────────────────────────────
  const estoqueValor = insumos.reduce((s, i) => s + (i.quantidade || 0) * (i.preco_unitario || 0), 0)

  const entradasValor = movs
    .filter(m => m.tipo === 'entrada')
    .reduce((s, m) => s + (m.quantidade || 0) * (m.preco_unit || 0), 0)

  const saidasValor = movs
    .filter(m => m.tipo === 'saida')
    .reduce((s, m) => s + (m.quantidade || 0) * (m.preco_unit || 0), 0)

  const vencimentos = insumos
    .filter(i => { const d = daysUntil(i.vencimento); return d != null && d <= 60 })
    .sort((a, b) => new Date(a.vencimento) - new Date(b.vencimento))

  const recent = movs.slice(0, 20)

  return (
    <AppLayout>
      <div className="space-y-5">
        <div>
          <h1 className="font-display font-bold text-2xl text-brand-900">
            {lang === 'en' ? '💰 Finance' : '💰 Financeiro'}
          </h1>
          <p className="font-mono text-xs text-ink-400 mt-0.5">
            {lang === 'en' ? 'stock value · movements · expiry alerts' : 'valor em estoque · movimentações · vencimentos'}
          </p>
        </div>

        {error && (
          <div className="bg-danger-50 border border-danger-600 rounded-sm p-3 font-mono text-xs text-danger-600">{error}</div>
        )}

        {loading ? (
          <div className="flex justify-center py-12"><Spinner /></div>
        ) : (
          <>
            {/* Summary cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <StatCard
                color="brand"
                label={lang === 'en' ? 'Stock value' : 'Valor em estoque'}
                value={fmt(estoqueValor)}
                sub={`${insumos.length} ${lang === 'en' ? 'inputs' : 'insumos'}`}
              />
              <StatCard
                color="green"
                label={lang === 'en' ? 'Total entries' : 'Total entradas'}
                value={fmt(entradasValor)}
                sub={`${movs.filter(m => m.tipo === 'entrada').length} mov.`}
              />
              <StatCard
                color="red"
                label={lang === 'en' ? 'Total exits' : 'Total saídas'}
                value={fmt(saidasValor)}
                sub={`${movs.filter(m => m.tipo === 'saida').length} mov.`}
              />
              <StatCard
                color={vencimentos.filter(i => (daysUntil(i.vencimento) ?? 99) <= 30).length > 0 ? 'amber' : 'brand'}
                label={lang === 'en' ? 'Expiring (60d)' : 'Vencendo (60d)'}
                value={vencimentos.length}
                sub={lang === 'en' ? 'inputs at risk' : 'insumos em alerta'}
              />
            </div>

            {/* Vencimentos próximos */}
            {vencimentos.length > 0 && (
              <div>
                <div className="font-mono text-[10px] font-bold text-ink-400 uppercase tracking-wider mb-2">
                  {lang === 'en' ? '⚠️ Expiring soon (60 days)' : '⚠️ Vencimentos próximos (60 dias)'}
                </div>
                <div className="space-y-1.5">
                  {vencimentos.map(i => {
                    const d = daysUntil(i.vencimento)
                    const expired = d != null && d < 0
                    return (
                      <div key={i.id} className={`flex items-center gap-3 bg-white border rounded-card px-4 py-3 shadow-card ${expired ? 'border-red-400' : 'border-amber-400'}`}>
                        <div className={`text-sm flex-shrink-0 ${expired ? 'text-red-600' : 'text-amber-600'}`}>
                          {expired ? '🔴' : d <= 7 ? '🟠' : '🟡'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-display font-bold text-sm text-brand-900 truncate">{i.nome}</p>
                          <p className="font-mono text-[10px] text-ink-400">
                            {fmt(i.quantidade)} {i.unidade}
                            {i.empresa ? ` · ${i.empresa}` : ''}
                          </p>
                        </div>
                        <div className="flex-shrink-0 text-right">
                          <p className={`font-mono text-xs font-bold ${expired ? 'text-red-600' : 'text-amber-600'}`}>
                            {expired
                              ? (lang === 'en' ? 'Expired' : 'Vencido')
                              : `${d}d`}
                          </p>
                          <p className="font-mono text-[10px] text-ink-400">{fmtDate(i.vencimento)}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Movimentações recentes */}
            <div>
              <div className="font-mono text-[10px] font-bold text-ink-400 uppercase tracking-wider mb-2">
                {lang === 'en' ? 'Recent movements' : 'Movimentações recentes'}
              </div>
              {recent.length === 0 ? (
                <div className="bg-white border border-surface-border rounded-card p-6 text-center shadow-card">
                  <p className="font-mono text-xs text-ink-400">
                    {lang === 'en' ? 'No movements yet. Register entries and exits in Stock.' : 'Nenhuma movimentação. Registre entradas e saídas no Estoque.'}
                  </p>
                </div>
              ) : (
                <div className="bg-white border border-surface-border rounded-card shadow-card overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs font-mono">
                      <thead>
                        <tr className="bg-brand-900 text-white">
                          <th className="px-3 py-2 text-left text-[10px] uppercase tracking-wider">{lang === 'en' ? 'Date' : 'Data'}</th>
                          <th className="px-3 py-2 text-left text-[10px] uppercase tracking-wider">{lang === 'en' ? 'Type' : 'Tipo'}</th>
                          <th className="px-3 py-2 text-left text-[10px] uppercase tracking-wider">{lang === 'en' ? 'Input' : 'Insumo'}</th>
                          <th className="px-3 py-2 text-right text-[10px] uppercase tracking-wider">{lang === 'en' ? 'Qty' : 'Qtd'}</th>
                          <th className="px-3 py-2 text-right text-[10px] uppercase tracking-wider">{lang === 'en' ? 'Unit R$' : 'R$/un'}</th>
                          <th className="px-3 py-2 text-right text-[10px] uppercase tracking-wider">{lang === 'en' ? 'Total R$' : 'Total R$'}</th>
                          <th className="px-3 py-2 text-left text-[10px] uppercase tracking-wider">{lang === 'en' ? 'Note' : 'Obs'}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recent.map((m, idx) => {
                          const total = (m.quantidade || 0) * (m.preco_unit || 0)
                          return (
                            <tr key={m.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-surface-bg'}>
                              <td className="px-3 py-2 text-ink-500">{fmtDate(m.data_mov)}</td>
                              <td className="px-3 py-2">
                                <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold ${
                                  m.tipo === 'entrada' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                }`}>
                                  {m.tipo === 'entrada' ? (lang === 'en' ? '↑ Entry' : '↑ Ent.') : (lang === 'en' ? '↓ Exit' : '↓ Saí.')}
                                </span>
                              </td>
                              <td className="px-3 py-2 text-brand-900 font-semibold">{m.insumos?.nome || '—'}</td>
                              <td className="px-3 py-2 text-right">{Number(m.quantidade).toLocaleString('pt-BR', { maximumFractionDigits: 2 })} {m.insumos?.unidade}</td>
                              <td className="px-3 py-2 text-right text-ink-400">
                                {m.preco_unit ? `R$ ${Number(m.preco_unit).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '—'}
                              </td>
                              <td className="px-3 py-2 text-right font-bold text-ink-700">
                                {total > 0 ? `R$ ${Number(total).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '—'}
                              </td>
                              <td className="px-3 py-2 text-ink-400 max-w-[120px] truncate">{m.nota || '—'}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </AppLayout>
  )
}
