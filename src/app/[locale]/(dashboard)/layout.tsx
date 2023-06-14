interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function SiteLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      Dahsboard layout
      {children}
    </>
  )
}
