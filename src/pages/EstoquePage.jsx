import AppLayout from '../layouts/AppLayout'

export default function EstoquePage() {
  return (
    <AppLayout>
      <div className="space-y-5">
        <div>
          <h1 className="font-display font-bold text-2xl text-brand-900">📦 Estoque</h1>
          <p className="font-mono text-xs text-ink-400 mt-1">Gestão de insumos, entradas e saídas</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: '📊', title: 'Visão Geral', desc: 'Saldo atual por produto com histórico de movimentações', soon: true },
            { icon: '📄', title: 'Contratos de Insumos', desc: 'Upload e gestão de contratos com fornecedores', soon: true },
            { icon: '↕️', title: 'Entradas e Saídas', desc: 'Registrar compras, emergenciais e notas de saída', soon: true },
          ].map(item => (
            <div key={item.title} className="bg-white border border-surface-border rounded-card p-5 shadow-card">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-display font-bold text-sm text-brand-900 mb-1">{item.title}</h3>
              <p className="font-mono text-[11px] text-ink-400 leading-relaxed mb-3">{item.desc}</p>
              {item.soon && (
                <span className="inline-block font-mono text-[9px] px-2 py-0.5 bg-amber-50 border border-amber-600 text-amber-600 rounded-full">
                  Em breve
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="bg-brand-50 border border-brand-400 rounded-card p-4">
          <p className="font-mono text-[11px] text-brand-900">
            🚧 <strong>Módulo em desenvolvimento.</strong> O sistema de estoque incluirá controle automático de saldos,
            alertas de vencimento, rastreabilidade por talhão e integração financeira.
          </p>
        </div>
      </div>
    </AppLayout>
  )
}
