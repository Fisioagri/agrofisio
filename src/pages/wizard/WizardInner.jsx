import { useWizard } from '../../hooks/useWizard'
import WizardLayout from '../../layouts/WizardLayout'
import StepProdutor   from './StepProdutor'
import StepCultura    from './StepCultura'
import StepSolo       from './StepSolo'
import StepFoliar     from './StepFoliar'
import StepPlanta     from './StepPlanta'
import StepDiagnose   from './StepDiagnose'
import StepCorrecao   from './StepCorrecao'
import StepFisiologia from './StepFisiologia'

const SCREENS = [
  StepProdutor,
  StepCultura,
  StepSolo,
  StepFoliar,
  StepPlanta,
  StepDiagnose,
  StepCorrecao,
  StepFisiologia,
]

export default function WizardInner() {
  const { step } = useWizard()
  const Screen = SCREENS[step]

  return (
    <WizardLayout>
      <Screen />
    </WizardLayout>
  )
}
