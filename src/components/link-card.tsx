import Link, { LinkProps } from 'next/link'

import { cn } from '@/lib/utils'

import { ArrowUpRightIcon } from './icons'

interface LinkCardProps extends LinkProps {
  children?: React.ReactNode
  className?: string
}

export const LinkCard = ({ children, className, ...rest }: LinkCardProps) => {
  return (
    <Link className={cn(className, 'group relative')} {...rest}>
      <div className="card translate-x-0 translate-y-0 rounded-lg text-onSurface transition group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:bg-surfaceContainer/70 group-hover:shadow-[4px_4px_0px_hsl(var(--onSurface))] group-active:translate-x-0 group-active:translate-y-0 group-active:shadow-none">
        {children}
      </div>
      <ArrowUpRightIcon className="absolute right-2 top-0 m-3 hidden animate-in fade-in slide-in-from-bottom-1 slide-in-from-left-1 duration-300 group-hover:block" />
    </Link>
  )
}
