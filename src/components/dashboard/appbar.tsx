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
    <header
      className={cn(
        'sticky top-0 z-50 flex h-16 items-center gap-3 border-b border-border bg-background px-5',
        className
      )}
    >
      {children}
    </header>
  )
}
