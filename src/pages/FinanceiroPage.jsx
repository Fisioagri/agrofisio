import AppLayout from '../layouts/AppLayout'

export default function FinanceiroPage() {
  return (
    <AppLayout>
      <div className="space-y-5">
        <div>
          <h1 className="font-display font-bold text-2xl text-brand-900">💰 Financeiro</h1>
          <p className="font-mono text-xs text-ink-400 mt-1">Vencimentos, compromissos e fluxo de caixa agrícola</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: '📅', title: 'Calendário de Vencimentos', desc: 'Visualize todos os compromissos financeiros por data, com alertas automáticos' },
            { icon: '📈', title: 'Valores Faturados vs. A Faturar', desc: 'Dashboard com saldo já realizado e projeções futuras por produto e talhão' },
            { icon: '💳', title: 'Contratos a Liquidar', desc: 'Integrado com os contratos de insumos do módulo de Estoque' },
            { icon: '📊', title: 'Relatórios Financeiros', desc: 'Exportação de relatórios em PDF com visão consolidada por safra' },
          ].map(item => (
            <div key={item.title} className="bg-white border border-surface-border rounded-card p-5 shadow-card">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-display font-bold text-sm text-brand-900 mb-1">{item.title}</h3>
              <p className="font-mono text-[11px] text-ink-400 leading-relaxed mb-3">{item.desc}</p>
              <span className="inline-block font-mono text-[9px] px-2 py-0.5 bg-amber-50 border border-amber-600 text-amber-600 rounded-full">
                Em breve
              </span>
            </div>
          ))}
        </div>
        <div className="bg-brand-50 border border-brand-400 rounded-card p-4">
          <p className="font-mono text-[11px] text-brand-900">
            🚧 <strong>Módulo em desenvolvimento.</strong> O painel financeiro será integrado automaticamente com os
            dados do Estoque — entradas, saídas e contratos alimentarão o calendário de vencimentos sem retrabalho.
          </p>
        </div>
      </div>
    </AppLayout>
  )
}
