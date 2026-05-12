import { useState } from 'react'
import { useWizard } from '../../hooks/useWizard'
import { useLanguage } from '../../contexts/LanguageContext'
import Card from '../../components/ui/Card'
import InfoBox from '../../components/ui/InfoBox'
import NutrientsGrid from '../../components/NutrientsGrid'
import AnalysisPhotoUpload from '../../components/AnalysisPhotoUpload'

const MACRO = [
  { id: 'ph',        label: 'pH (CaCl₂)',      placeholder: 'Ex: 6.0',  step: '0.1'  },
  { id: 'mo',        label: 'MO (%)',           placeholder: 'Ex: 3.5',  step: '0.1'  },
  { id: 'pSolo',     label: 'P (mg/dm³)',       placeholder: 'Ex: 25'                 },
  { id: 'kSolo',     label: 'K (cmolc/dm³)',    placeholder: 'Ex: 0.35', step: '0.01' },
  { id: 'caSolo',    label: 'Ca (cmolc/dm³)',   placeholder: 'Ex: 5.0',  step: '0.1'  },
  { id: 'mgSolo',    label: 'Mg (cmolc/dm³)',   placeholder: 'Ex: 1.5',  step: '0.1'  },
  { id: 'sSolo',     label: 'S (mg/dm³)',       placeholder: 'Ex: 10'                 },
  { id: 'alSolo',    label: 'Al (cmolc/dm³)',   placeholder: 'Ex: 0.1',  step: '0.1'  },
  { id: 'hAlSolo',   label: 'H+Al (cmolc/dm³)',placeholder: 'Ex: 4.5',  step: '0.1'  },
  { id: 'ctcSolo',   label: 'CTC (cmolc/dm³)',  placeholder: 'Ex: 12.5', step: '0.1'  },
  { id: 'vSolo',     label: 'V% (sat. bases)',  placeholder: 'Ex: 65'                 },
  { id: 'satAlSolo', label: 'Sat. Al (%)',      placeholder: 'Ex: 2'                  },
  { id: 'argilaSolo',label: 'Argila (%)',        placeholder: 'Ex: 55'                 },
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
  const { t } = useLanguage()
  const s = t.solo
  const [tab, setTab] = useState('photo')

  function handleFill(extracted) {
    update(extracted)
    setTab('manual')
  }

  return (
    <>
      <div className="mb-4">
        <h2 className="font-display font-bold text-xl text-brand-900">{s.title}</h2>
        <p className="font-mono text-[11px] text-ink-400 mt-0.5">{s.subtitle}</p>
      </div>

      <TabSwitcher tab={tab} onChange={setTab} labels={[s.photoTab, s.manualTab]} />

      {tab === 'photo' && (
        <Card title={s.photoCard}>
          <AnalysisPhotoUpload type="solo" onFill={handleFill} />
        </Card>
      )}

      {tab === 'manual' && (
        <>
          <InfoBox>{s.info}</InfoBox>
          <Card title={s.cardMacro}>
            <NutrientsGrid fields={MACRO} values={data} onChange={(id, v) => update({ [id]: v })} />
          </Card>
          <Card title={s.cardMicro}>
            <NutrientsGrid fields={MICRO} values={data} onChange={(id, v) => update({ [id]: v })} />
          </Card>
        </>
      )}
    </>
  )
}

function TabSwitcher({ tab, onChange, labels }) {
  const tabs = [
    { id: 'photo',  label: labels[0] },
    { id: 'manual', label: labels[1] },
  ]
  return (
    <div className="flex gap-1 bg-surface-border rounded-card p-1 mb-4">
      {tabs.map(t => (
        <button
          key={t.id}
          type="button"
          onClick={() => onChange(t.id)}
          className={`flex-1 py-2 rounded-sm font-mono text-xs transition-all
            ${tab === t.id ? 'bg-white shadow-sm text-brand-900 font-semibold' : 'text-ink-400 hover:text-ink-600'}`}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}
