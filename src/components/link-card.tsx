import Link, { LinkProps } from 'next/link'

import { cn } from '@/lib/utils'

import { ArrowUpRightIcon } from './icons'

interface LinkCardProps extends LinkProps {
  children?: React.ReactNode
  className?: string
}

export const LinkCard = ({ children, className, ...rest }: LinkCardProps) => {
  return (
    <div id="card-shadow" className="bg-foreground">
      <Link className={cn(className, 'group')} {...rest}>
        <div
          id="content-container"
          className="relative translate-x-0 translate-y-0 border border-border bg-card transition group-hover:-translate-x-1 group-hover:-translate-y-1 group-active:translate-x-0 group-active:translate-y-0"
        >
          {children}
          <ArrowUpRightIcon className="absolute right-0 top-0 m-3 hidden animate-in fade-in slide-in-from-bottom-1 slide-in-from-left-1 duration-300 group-hover:block" />
        </div>
      </Link>
    </div>
  )
}
