import { useWizard } from '../../hooks/useWizard'
import Card from '../../components/ui/Card'
import InfoBox from '../../components/ui/InfoBox'
import ObjectivesGrid from '../../components/ObjectivesGrid'
import TagGroup from '../../components/TagGroup'

const FERRAMENTAS = [
  'Macronutrientes',
  'Micronutrientes (Fe, Zn, Cu, Mn, B)',
  'Extrato de algas',
  'Aminoácidos (prolina, betaína, glicina)',
  'Silício foliar',
  'Ácido húmico/fúlvico',
]

export default function StepObjetivos() {
  const { data, update } = useWizard()

  return (
    <>
      <div className="mb-4">
        <h2 className="font-display font-bold text-xl text-brand-900">Objetivos Fisiológicos</h2>
        <p className="font-mono text-[11px] text-ink-400 mt-0.5">selecione os manejos desejados para este estádio</p>
      </div>

      <InfoBox>
        {data.estadio
          ? `📊 Estádio atual: ${data.estadio} — objetivos disponíveis destacados`
          : 'Os objetivos disponíveis são filtrados pelo estádio fenológico atual.'}
      </InfoBox>

      <Card title="🎯 Selecione os objetivos">
        <ObjectivesGrid
          estadio={data.estadio}
          selected={data.objetivos}
          onChange={v => update({ objetivos: v })}
        />
      </Card>

      <Card title="💊 Ferramentas Fisiológicas">
        <InfoBox>Os manejos abaixo serão usados no protocolo conforme os objetivos selecionados:</InfoBox>
        <div className="flex flex-wrap gap-1.5 mt-1">
          {FERRAMENTAS.map(f => (
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
