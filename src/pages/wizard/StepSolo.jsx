import { useState } from 'react'
import { useWizard } from '../../hooks/useWizard'
import { useLanguage } from '../../contexts/LanguageContext'
import Card from '../../components/ui/Card'
import InfoBox from '../../components/ui/InfoBox'
import NutrientsGrid from '../../components/NutrientsGrid'
import AnalysisPhotoUpload from '../../components/AnalysisPhotoUpload'
import TabSwitcher from '../../components/ui/TabSwitcher'

const MACRO = [
  { id: 'ph',        label: 'pH (CaCl₂)',       placeholder: 'Ex: 6.0',  step: '0.1',  min: 3,   max: 9    },
  { id: 'mo',        label: 'MO (%)',            placeholder: 'Ex: 3.5',  step: '0.1',  min: 0,   max: 100  },
  { id: 'pSolo',     label: 'P (mg/dm³)',        placeholder: 'Ex: 25',                 min: 0,   max: 500  },
  { id: 'kSolo',     label: 'K (cmolc/dm³)',     placeholder: 'Ex: 0.35', step: '0.01', min: 0,   max: 5    },
  { id: 'caSolo',    label: 'Ca (cmolc/dm³)',    placeholder: 'Ex: 5.0',  step: '0.1',  min: 0,   max: 30   },
  { id: 'mgSolo',    label: 'Mg (cmolc/dm³)',    placeholder: 'Ex: 1.5',  step: '0.1',  min: 0,   max: 15   },
  { id: 'sSolo',     label: 'S (mg/dm³)',        placeholder: 'Ex: 10',                 min: 0,   max: 200  },
  { id: 'alSolo',    label: 'Al (cmolc/dm³)',    placeholder: 'Ex: 0.1',  step: '0.1',  min: 0,   max: 10   },
  { id: 'hAlSolo',   label: 'H+Al (cmolc/dm³)', placeholder: 'Ex: 4.5',  step: '0.1',  min: 0,   max: 30   },
  { id: 'ctcSolo',   label: 'CTC (cmolc/dm³)',   placeholder: 'Ex: 12.5', step: '0.1',  min: 0,   max: 80   },
  { id: 'vSolo',     label: 'V% (sat. bases)',   placeholder: 'Ex: 65',                 min: 0,   max: 100  },
  { id: 'satAlSolo', label: 'Sat. Al (%)',        placeholder: 'Ex: 2',                  min: 0,   max: 100  },
  { id: 'argilaSolo',label: 'Argila (%)',         placeholder: 'Ex: 55',                 min: 0,   max: 100  },
]

const MICRO = [
  { id: 'bSolo',  label: 'B (mg/dm³)',  placeholder: 'Ex: 0.5',  step: '0.1',  min: 0, max: 10   },
  { id: 'znSolo', label: 'Zn (mg/dm³)', placeholder: 'Ex: 1.6',  step: '0.1',  min: 0, max: 50   },
  { id: 'cuSolo', label: 'Cu (mg/dm³)', placeholder: 'Ex: 1.0',  step: '0.1',  min: 0, max: 50   },
  { id: 'mnSolo', label: 'Mn (mg/dm³)', placeholder: 'Ex: 5.0',  step: '0.1',  min: 0, max: 200  },
  { id: 'feSolo', label: 'Fe (mg/dm³)', placeholder: 'Ex: 35',   step: '0.1',  min: 0, max: 1000 },
  { id: 'moSolo', label: 'Mo (mg/dm³)', placeholder: 'Ex: 0.1',  step: '0.01', min: 0, max: 5    },
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
