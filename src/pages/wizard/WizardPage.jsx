import { WizardProvider } from '../../contexts/WizardContext'
import WizardInner from './WizardInner'

// WizardPage instancia o Provider; WizardInner consome.
// Separação necessária porque o Provider precisa envolver o componente que usa o contexto.
export default function WizardPage() {
  return (
    <WizardProvider>
      <WizardInner />
    </WizardProvider>
  )
}
