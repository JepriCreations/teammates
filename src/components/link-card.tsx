import Link, { LinkProps } from 'next/link'

import { cn } from '@/lib/utils'

import { ArrowUpRightIcon } from './icons'

interface LinkCardProps extends LinkProps {
  children?: React.ReactNode
  className?: string
}

export const LinkCard = ({ children, className, ...rest }: LinkCardProps) => {
  return (
    <Link className={cn(className, 'group bg-outline')} {...rest}>
      <div className="card relative translate-x-0 translate-y-0 rounded-lg text-onSurface transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:bg-surfaceContainerLow group-active:translate-x-0 group-active:translate-y-0 group-active:shadow-none">
        {children}
        <ArrowUpRightIcon className="absolute right-2 top-0 m-3 hidden duration-300 animate-in fade-in slide-in-from-bottom-2 slide-in-from-left-2 group-hover:block" />
      </div>
    </Link>
  )
}
