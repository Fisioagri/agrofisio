import { useWizard } from '../../hooks/useWizard'
import { useLanguage } from '../../contexts/LanguageContext'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Textarea from '../../components/ui/Textarea'
import CropSelector from '../../components/CropSelector'

export default function StepCultura() {
  const { data, update } = useWizard()
  const { t } = useLanguage()
  const c = t.cultura

  function field(key) {
    return { value: data[key], onChange: e => update({ [key]: e.target.value }) }
  }

  return (
    <>
      <div className="mb-4">
        <h2 className="font-display font-bold text-xl text-brand-900">{c.title}</h2>
        <p className="font-mono text-[11px] text-ink-400 mt-0.5">{c.subtitle}</p>
      </div>

      <Card title={c.cardCrop}>
        <CropSelector
          value={data.cultura}
          onChange={v => update({ cultura: v, estadio: '' })}
        />
      </Card>

      <Card title={c.cardPlanting}>
        <div className="grid grid-cols-2 gap-2.5">
          <Input label={c.season} required placeholder={c.seasonPh} {...field('safra')} />
          <Input label={c.plantingDate} required type="date" {...field('dataPlantio')} />
        </div>
        <Input label={c.variety} required placeholder={c.varietyPh} {...field('hibrido')} />
        <Textarea
          label={c.fertilization}
          required
          placeholder={c.fertPh}
          {...field('adubacao')}
        />
      </Card>
    </>
  )
}
