'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

interface NavLinkProps {
  slug: string
  children: React.ReactNode
}

export const NavLink = ({ slug, children }: NavLinkProps) => {
  const currentRoute = usePathname()
  const currentSlug = currentRoute.split('/')[2] ?? ''
  const isActive = currentSlug === slug.replace('/', '')

  return (
    <Link
      href={slug}
      className={cn(
        'relative block before:absolute before:-bottom-1 before:left-0 before:h-[5px] before:w-5 before:origin-left before:scale-x-0 before:bg-accent before:opacity-0 before:transition-transform',
        isActive && 'before:scale-x-1 before:opacity-100'
      )}
    >
      {children}
    </Link>
  )
}
