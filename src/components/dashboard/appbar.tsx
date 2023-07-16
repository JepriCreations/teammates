interface DashboardAppbarProps {
  children?: React.ReactNode
}
export const DashboardAppbar = ({ children }: DashboardAppbarProps) => {
  return (
    <section className="flex h-16 items-center gap-3 border-b border-border px-5">
      {children}
    </section>
  )
}
