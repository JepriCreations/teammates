import { DashboardAppbar } from '@/components/dashboard/appbar'
import { Sidebar } from '@/components/dashboard/sidebar'
import { Logo } from '@/components/logo'
import { ModeToggle } from '@/components/mode-toggle'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default async function SiteLayout({ children }: DashboardLayoutProps) {
  return (
    <main className="min-h-[100dvh] pb-20">
      <Sidebar />
      <div className="flex flex-col md:pl-24">
        <DashboardAppbar>
          <Logo />
          <section className="flex grow items-center justify-end gap-1">
            <ModeToggle />
          </section>
        </DashboardAppbar>
        {children}
      </div>
    </main>
  )
}
