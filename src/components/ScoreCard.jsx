import { calcScore } from '../utils/calcScore'

export default function ScoreCard({ foliarNuts, soloNuts, data }) {
  const result = calcScore({ foliarNuts, soloNuts, data })
  const { score, scoreProjecao, label, emoji, corClass, detalhes, semDados } = result

  const pct       = score
  const pctProj   = scoreProjecao
  const showProj  = !semDados && scoreProjecao > score

  return (
    <div className={`bg-white border rounded-card shadow-card overflow-hidden ${corClass.border}`}>
      {/* Header */}
      <div className={`px-4 py-3 ${corClass.bg} border-b ${corClass.border} flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          <span className="text-base">{emoji}</span>
          <div>
            <p className="font-display font-extrabold text-sm text-brand-900">Score AgroFísio</p>
            <p className={`font-mono text-[10px] ${corClass.text}`}>{label}</p>
          </div>
        </div>
        <div className="text-right">
          <span className={`font-display font-extrabold text-3xl leading-none ${corClass.text}`}>{score}</span>
          <span className="font-mono text-[11px] text-ink-400">/100</span>
        </div>
      </div>

      {/* Barra de progresso */}
      <div className="px-4 pt-3 pb-2">
        <div className="relative">
          {/* Barra atual */}
          <div className="h-3 bg-surface-border rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${corClass.bar}`}
              style={{ width: `${pct}%` }}
            />
          </div>
          {/* Marcador de projeção */}
          {showProj && (
            <div
              className="absolute top-0 h-3 w-0.5 bg-green-500 opacity-70"
              style={{ left: `${pctProj}%` }}
            />
          )}
        </div>

        {/* Legenda da projeção */}
        {showProj && (
          <div className="flex items-center gap-1.5 mt-2">
            <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
            <p className="font-mono text-[10px] text-green-700">
              Corrigindo deficiências → Score <strong>{scoreProjecao}</strong>
              {' '}(+{scoreProjecao - score} pts)
            </p>
          </div>
        )}

        {semDados && (
          <p className="font-mono text-[10px] text-ink-400 mt-1">
            Insira dados de solo ou foliar para score mais preciso
          </p>
        )}
      </div>

      {/* Detalhes colapsáveis — mostra se tem perdas */}
      {detalhes.length > 0 && (
        <div className="border-t border-surface-border px-4 py-2.5">
          <p className="font-mono text-[9px] text-ink-400 uppercase tracking-wider mb-1.5">Deduções</p>
          <div className="space-y-1">
            {detalhes.slice(0, 5).map((d, i) => (
              <div key={i} className="flex items-center justify-between gap-2">
                <p className="font-mono text-[10px] text-ink-600 leading-tight">{d.label}</p>
                <span className="font-mono text-[10px] text-red-600 flex-shrink-0 font-semibold">
                  {d.impacto} pts
                </span>
              </div>
            ))}
            {detalhes.length > 5 && (
              <p className="font-mono text-[9px] text-ink-400 italic">
                +{detalhes.length - 5} outros fatores
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
