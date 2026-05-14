import { useWizard } from '../../hooks/useWizard'
import { useLanguage } from '../../contexts/LanguageContext'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'

const MAX_SC = 200

function ProdInput({ label, required, placeholder, value, onChange }) {
  const num = value !== '' && value !== undefined ? parseFloat(value) : null
  const hasError = num !== null && !isNaN(num) && (num < 0 || num > MAX_SC)
  return (
    <div>
      <Input
        label={label}
        required={required}
        type="number"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        min={0}
        max={MAX_SC}
        className={hasError ? 'border-danger-400 bg-red-50' : ''}
      />
      {hasError && (
        <p className="font-mono text-[10px] text-danger-500 mt-0.5">
          Valor fora do intervalo (0–{MAX_SC} sc/ha)
        </p>
      )}
    </div>
  )
}

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
          <ProdInput label={p.lastProd} placeholder={p.lastPh} {...field('prodUltima')} />
          <ProdInput label={p.expectation} required placeholder={p.expectPh} {...field('prodExpect')} />
        </div>
      </Card>
    </>
  )
}
