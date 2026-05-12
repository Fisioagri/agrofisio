import Header from '../components/Header'
import ProgressBar from '../components/ProgressBar'
import StepsNav from '../components/StepsNav'
import BottomNav from '../components/BottomNav'

export default function WizardLayout({ children }) {
  return (
    <div className="min-h-screen bg-surface-bg flex flex-col">
      <Header />
      <ProgressBar />
      <StepsNav />
      <div className="flex-1 px-3.5 pt-3.5 pb-24 max-w-2xl mx-auto w-full">
        {children}
      </div>
      <BottomNav />
    </div>
  )
}
