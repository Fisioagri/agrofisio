import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { LanguageProvider } from './contexts/LanguageContext'
import { WizardProvider } from './contexts/WizardContext'
import AppRoutes from './routes'

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <WizardProvider>
            <AppRoutes />
          </WizardProvider>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  )
}
