import { useWizard } from '../../hooks/useWizard'
import Card from '../../components/ui/Card'
import InfoBox from '../../components/ui/InfoBox'
import NutrientsGrid from '../../components/NutrientsGrid'

const MACRO = [
  { id: 'ph',        label: 'pH (CaCl₂)',      placeholder: 'Ex: 6.0',  step: '0.1' },
  { id: 'mo',        label: 'MO (%)',           placeholder: 'Ex: 3.5',  step: '0.1' },
  { id: 'pSolo',     label: 'P (mg/dm³)',       placeholder: 'Ex: 25'               },
  { id: 'kSolo',     label: 'K (cmolc/dm³)',    placeholder: 'Ex: 0.35', step: '0.01'},
  { id: 'caSolo',    label: 'Ca (cmolc/dm³)',   placeholder: 'Ex: 5.0',  step: '0.1' },
  { id: 'mgSolo',    label: 'Mg (cmolc/dm³)',   placeholder: 'Ex: 1.5',  step: '0.1' },
  { id: 'vSolo',     label: 'V% (sat. bases)',  placeholder: 'Ex: 65'               },
  { id: 'argilaSolo',label: 'Argila (%)',        placeholder: 'Ex: 55'               },
  { id: 'sSolo',     label: 'S (mg/dm³)',       placeholder: 'Ex: 10'               },
  { id: 'ctcSolo',   label: 'CTC (cmolc/dm³)',  placeholder: 'Ex: 12.5', step: '0.1' },
]

const MICRO = [
  { id: 'bSolo',  label: 'B (mg/dm³)',  placeholder: 'Ex: 0.5',  step: '0.1'  },
  { id: 'znSolo', label: 'Zn (mg/dm³)', placeholder: 'Ex: 1.6',  step: '0.1'  },
  { id: 'cuSolo', label: 'Cu (mg/dm³)', placeholder: 'Ex: 1.0',  step: '0.1'  },
  { id: 'mnSolo', label: 'Mn (mg/dm³)', placeholder: 'Ex: 5.0',  step: '0.1'  },
  { id: 'feSolo', label: 'Fe (mg/dm³)', placeholder: 'Ex: 35',   step: '0.1'  },
  { id: 'moSolo', label: 'Mo (mg/dm³)', placeholder: 'Ex: 0.1',  step: '0.01' },
]

export default function StepSolo() {
  const { data, update } = useWizard()

  function handleChange(id, value) {
    update({ [id]: value })
  }

  return (
    <>
      <div className="mb-4">
        <h2 className="font-display font-bold text-xl text-brand-900">Análise de Solo</h2>
        <p className="font-mono text-[11px] text-ink-400 mt-0.5">opcional — preencha os dados disponíveis</p>
      </div>

      <InfoBox>📋 Insira os dados da sua análise de solo. Campos opcionais — preencha o que tiver disponível.</InfoBox>

      <Card title="⚗️ Macronutrientes e pH">
        <NutrientsGrid fields={MACRO} values={data} onChange={handleChange} />
      </Card>

      <Card title="🔬 Micronutrientes">
        <NutrientsGrid fields={MICRO} values={data} onChange={handleChange} />
      </Card>
    </>
  )
}
