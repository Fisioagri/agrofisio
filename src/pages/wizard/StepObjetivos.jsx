import { useWizard } from '../../hooks/useWizard'
import { useLanguage } from '../../contexts/LanguageContext'
import Card from '../../components/ui/Card'
import InfoBox from '../../components/ui/InfoBox'
import ObjectivesGrid from '../../components/ObjectivesGrid'

export default function StepObjetivos() {
  const { data, update } = useWizard()
  const { t } = useLanguage()
  const o = t.objetivos

  return (
    <>
      <div className="mb-4">
        <h2 className="font-display font-bold text-xl text-brand-900">{o.title}</h2>
        <p className="font-mono text-[11px] text-ink-400 mt-0.5">{o.subtitle}</p>
      </div>

      <InfoBox>{o.info(data.estadio)}</InfoBox>

      <Card title={o.cardObj}>
        <ObjectivesGrid
          estadio={data.estadio}
          selected={data.objetivos}
          onChange={v => update({ objetivos: v })}
        />
      </Card>

      <Card title={o.cardTools}>
        <InfoBox>{o.toolsInfo}</InfoBox>
        <div className="flex flex-wrap gap-1.5 mt-1">
          {o.ferramentas.map(f => (
            <span
              key={f}
              className="px-2.5 py-1.5 bg-brand-100 border border-brand-700 rounded-xl
                font-mono text-[11px] text-brand-900 font-semibold"
            >
              {f}
            </span>
          ))}
        </div>
      </Card>
    </>
  )
}
