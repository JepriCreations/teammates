import { LogoutButton } from '@/components/logout-button'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function SiteLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      Dahsboard layout
      <LogoutButton />
      {children}
    </>
  )
}
