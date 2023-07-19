import { cn } from '@/lib/utils'

interface DashboardAppbarProps {
  children?: React.ReactNode
  className?: string
}
export const DashboardAppbar = ({
  children,
  className,
}: DashboardAppbarProps) => {
  return (
    <section
      className={cn(
        'flex h-16 items-center gap-3 border-b border-border px-5',
        className
      )}
    >
      {children}
    </section>
  )
}
