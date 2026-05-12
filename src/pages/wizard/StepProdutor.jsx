import { useWizard } from '../../hooks/useWizard'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'

export default function StepProdutor() {
  const { data, update } = useWizard()

  function field(key) {
    return { value: data[key], onChange: e => update({ [key]: e.target.value }) }
  }

  return (
    <>
      <div className="mb-4">
        <h2 className="font-display font-bold text-xl text-brand-900">Produtor Rural</h2>
        <p className="font-mono text-[11px] text-ink-400 mt-0.5">cadastro do produtor e talhão</p>
      </div>

      <Card title="👨‍🌾 Identificação">
        <Input label="Nome do Produtor" required placeholder="Ex: João Silva" {...field('prodNome')} />
        <div className="grid grid-cols-2 gap-2.5">
          <Input label="Cidade" required placeholder="Ex: Sorriso - MT" {...field('prodCidade')} />
          <Input label="Talhão" placeholder="Ex: Talhão 3A" {...field('prodTalhao')} />
        </div>
      </Card>

      <Card title="📊 Produtividade">
        <div className="grid grid-cols-2 gap-2.5">
          <Input
            label="Última prod. (sc/ha)"
            type="number"
            placeholder="Ex: 62"
            {...field('prodUltima')}
          />
          <Input
            label="Expectativa (sc/ha)"
            required
            type="number"
            placeholder="Ex: 70"
            {...field('prodExpect')}
          />
        </div>
      </Card>
    </>
  )
}
