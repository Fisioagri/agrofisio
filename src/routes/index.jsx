import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute   from './ProtectedRoute'
import AdminRoute       from './AdminRoute'
import LoginPage        from '../pages/LoginPage'
import LandingPage      from '../pages/LandingPage'
import DashboardPage    from '../pages/DashboardPage'
import WizardPage       from '../pages/wizard/WizardPage'
import UsersPage        from '../pages/UsersPage'
import SettingsPage     from '../pages/SettingsPage'
import LaudoDetailPage  from '../pages/LaudoDetailPage'
import ProdutoresPage   from '../pages/ProdutoresPage'
import TalhoesPage      from '../pages/TalhoesPage'
import EstoquePage      from '../pages/EstoquePage'
import FinanceiroPage   from '../pages/FinanceiroPage'
import AnalysePage      from '../pages/AnalysePage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/login"   element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/"            element={<DashboardPage />} />
        <Route path="/analise"     element={<AnalysePage />} />
        <Route path="/wizard"      element={<WizardPage />} />
        <Route path="/produtores"  element={<ProdutoresPage />} />
        <Route path="/talhoes"     element={<TalhoesPage />} />
        <Route element={<AdminRoute />}>
          <Route path="/estoque"    element={<EstoquePage />} />
          <Route path="/financeiro" element={<FinanceiroPage />} />
        </Route>
        <Route path="/settings"    element={<SettingsPage />} />
        <Route path="/laudos/:id"  element={<LaudoDetailPage />} />

        <Route element={<AdminRoute />}>
          <Route path="/users" element={<UsersPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
