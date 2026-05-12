import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import AdminRoute     from './AdminRoute'
import LoginPage      from '../pages/LoginPage'
import DashboardPage  from '../pages/DashboardPage'
import WizardPage     from '../pages/wizard/WizardPage'
import UsersPage      from '../pages/UsersPage'
import SettingsPage   from '../pages/SettingsPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/"         element={<DashboardPage />} />
        <Route path="/wizard"   element={<WizardPage />} />
        <Route path="/settings" element={<SettingsPage />} />

        <Route element={<AdminRoute />}>
          <Route path="/users" element={<UsersPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
