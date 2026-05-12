import { useWizard } from '../../hooks/useWizard'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Textarea from '../../components/ui/Textarea'
import CropSelector from '../../components/CropSelector'

export default function StepCultura() {
  const { data, update } = useWizard()

  function field(key) {
    return { value: data[key], onChange: e => update({ [key]: e.target.value }) }
  }

  return (
    <>
      <div className="mb-4">
        <h2 className="font-display font-bold text-xl text-brand-900">Cultura e Plantio</h2>
        <p className="font-mono text-[11px] text-ink-400 mt-0.5">informações da lavoura</p>
      </div>

      <Card title="🌾 Cultura *">
        <CropSelector
          value={data.cultura}
          onChange={v => update({ cultura: v, estadio: '' })}
        />
      </Card>

      <Card title="📋 Dados do Plantio">
        <div className="grid grid-cols-2 gap-2.5">
          <Input label="Safra" required placeholder="Ex: 25/26" {...field('safra')} />
          <Input label="Data de plantio" required type="date" {...field('dataPlantio')} />
        </div>
        <Input label="Variedade / Híbrido" required placeholder="Ex: DM 5958 IPRO" {...field('hibrido')} />
        <Textarea
          label="Adubação realizada"
          required
          placeholder="Ex: 300 kg/ha MAP no plantio + 150 kg/ha KCl + 30 kg/ha ureia em V4..."
          {...field('adubacao')}
        />
      </Card>
    </>
  )
}
