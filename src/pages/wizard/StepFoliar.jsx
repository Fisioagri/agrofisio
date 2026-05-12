import { useWizard } from '../../hooks/useWizard'
import Card from '../../components/ui/Card'
import InfoBox from '../../components/ui/InfoBox'
import NutrientsGrid from '../../components/NutrientsGrid'

const MACRO = [
  { id: 'nFoliar',  label: 'N (g/kg)',  placeholder: 'Ref: 40-50',  step: '0.1' },
  { id: 'pFoliar',  label: 'P (g/kg)',  placeholder: 'Ref: 2.5-4.0',step: '0.1' },
  { id: 'kFoliar',  label: 'K (g/kg)',  placeholder: 'Ref: 17-27',  step: '0.1' },
  { id: 'caFoliar', label: 'Ca (g/kg)', placeholder: 'Ref: 6-20',   step: '0.1' },
  { id: 'mgFoliar', label: 'Mg (g/kg)', placeholder: 'Ref: 2.5-5.0',step: '0.1' },
  { id: 'sFoliar',  label: 'S (g/kg)',  placeholder: 'Ref: 2.0-4.0',step: '0.1' },
]

const MICRO = [
  { id: 'bFoliar',  label: 'B (mg/kg)',  placeholder: 'Ref: 30-80',  step: '0.1'  },
  { id: 'znFoliar', label: 'Zn (mg/kg)', placeholder: 'Ref: 25-60',  step: '0.1'  },
  { id: 'cuFoliar', label: 'Cu (mg/kg)', placeholder: 'Ref: 5-20',   step: '0.1'  },
  { id: 'mnFoliar', label: 'Mn (mg/kg)', placeholder: 'Ref: 20-150', step: '0.1'  },
  { id: 'feFoliar', label: 'Fe (mg/kg)', placeholder: 'Ref: 50-350', step: '0.1'  },
  { id: 'moFoliar', label: 'Mo (mg/kg)', placeholder: 'Ref: 0.5-5',  step: '0.01' },
]

export default function StepFoliar() {
  const { data, update } = useWizard()

  return (
    <>
      <div className="mb-4">
        <h2 className="font-display font-bold text-xl text-brand-900">Análise Foliar</h2>
        <p className="font-mono text-[11px] text-ink-400 mt-0.5">opcional — dados do estado nutricional da planta</p>
      </div>

      <InfoBox>
        🍃 Coleta: 30-50 folhas da 4ª-5ª posição a partir do ápice, no florescimento pleno.
        Referência: laborsolo.com.br/laudo/quimica-de-solo
      </InfoBox>

      <Card title="🌿 Macronutrientes Foliares (g/kg)">
        <NutrientsGrid fields={MACRO} values={data} onChange={(id, v) => update({ [id]: v })} />
      </Card>

      <Card title="🔬 Micronutrientes Foliares (mg/kg)">
        <NutrientsGrid fields={MICRO} values={data} onChange={(id, v) => update({ [id]: v })} />
      </Card>
    </>
  )
}
