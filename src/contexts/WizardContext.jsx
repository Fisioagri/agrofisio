import { createContext, useState } from 'react'
import { INITIAL_STATE } from '../constants/wizard'

export const WizardContext = createContext(null)

export function WizardProvider({ children }) {
  const [step, setStep]                       = useState(0)
  const [data, setData]                       = useState(INITIAL_STATE)
  const [laudoDiagnoseHtml, setDiagnoseHtml]  = useState(null)
  const [laudoFinalHtml, setFinalHtml]        = useState(null)

  function update(fields) {
    setData(prev => ({ ...prev, ...fields }))
  }

  function reset() {
    setStep(0)
    setData(INITIAL_STATE)
    setDiagnoseHtml(null)
    setFinalHtml(null)
  }

  return (
    <WizardContext.Provider value={{
      step, setStep,
      data, update,
      laudoDiagnoseHtml, setDiagnoseHtml,
      laudoFinalHtml,    setFinalHtml,
      reset,
    }}>
      {children}
    </WizardContext.Provider>
  )
}
