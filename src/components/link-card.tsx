import Link, { LinkProps } from 'next/link'

import { cn } from '@/lib/utils'

import { ArrowUpRightIcon } from './icons'

interface LinkCardProps extends LinkProps {
  children?: React.ReactNode
  className?: string
}

export const LinkCard = ({ children, className, ...rest }: LinkCardProps) => {
  return (
    <Link
      className={cn(
        className,
        'group relative translate-x-0 translate-y-0 bg-card transition hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_hsl(var(--card-foreground))] active:translate-x-0 active:translate-y-0 active:shadow-none disabled:translate-x-0 disabled:translate-y-0 disabled:bg-muted/50 disabled:shadow-none'
      )}
      {...rest}
    >
      {children}
      <ArrowUpRightIcon className="absolute right-0 top-0 m-3 hidden animate-in fade-in slide-in-from-bottom-1 slide-in-from-left-1 duration-300 group-hover:block" />
    </Link>
  )
}
