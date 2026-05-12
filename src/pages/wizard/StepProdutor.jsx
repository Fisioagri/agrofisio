import { useWizard } from '../../hooks/useWizard'
import { useLanguage } from '../../contexts/LanguageContext'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'

export default function StepProdutor() {
  const { data, update } = useWizard()
  const { t } = useLanguage()
  const p = t.produtor

  function field(key) {
    return { value: data[key], onChange: e => update({ [key]: e.target.value }) }
  }

  return (
    <>
      <div className="mb-4">
        <h2 className="font-display font-bold text-xl text-brand-900">{p.title}</h2>
        <p className="font-mono text-[11px] text-ink-400 mt-0.5">{p.subtitle}</p>
      </div>

      <Card title={p.cardId}>
        <Input label={p.name} required placeholder={p.namePh} {...field('prodNome')} />
        <div className="grid grid-cols-2 gap-2.5">
          <Input label={p.city} required placeholder={p.cityPh} {...field('prodCidade')} />
          <Input label={p.plot} placeholder={p.plotPh} {...field('prodTalhao')} />
        </div>
      </Card>

      <Card title={p.cardProd}>
        <div className="grid grid-cols-2 gap-2.5">
          <Input
            label={p.lastProd}
            type="number"
            placeholder={p.lastPh}
            {...field('prodUltima')}
          />
          <Input
            label={p.expectation}
            required
            type="number"
            placeholder={p.expectPh}
            {...field('prodExpect')}
          />
        </div>
      </Card>
    </>
  )
}
