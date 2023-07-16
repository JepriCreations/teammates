'use client'

import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

interface NavLinkProps extends LinkProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export const NavLink = ({
  href,
  className,
  style,
  children,
  ...rest
}: NavLinkProps) => {
  const currentRoute = usePathname()
  const currentSlug = currentRoute.split('/')[2] ?? ''
  const isActive = currentSlug === String(href).replace('/', '')

  return (
    <Link
      href={href}
      className={cn(
        className,
        'relative block opacity-50 transition-opacity before:absolute before:-bottom-1 before:left-0 before:h-[5px] before:w-5 before:origin-left before:scale-x-0 before:bg-accent before:opacity-0 before:transition-transform hover:opacity-100',
        isActive && 'before:scale-x-1 opacity-100 before:opacity-100'
      )}
      style={style}
      {...rest}
    >
      {children}
    </Link>
  )
}
