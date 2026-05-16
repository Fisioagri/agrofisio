import Sidebar from '../components/Sidebar'

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-surface-bg flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        <main className="flex-1 p-3 md:p-8 w-full max-w-5xl">
          {children}
        </main>
      </div>
    </div>
  )
}
