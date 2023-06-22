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
        'relative block px-2 before:absolute before:inset-x-0 before:bottom-[-1px] before:-z-10 before:h-3 before:origin-left before:scale-x-0 before:bg-accent before:opacity-0 before:transition-transform',
        isActive && 'before:scale-x-1 before:opacity-100'
      )}
    >
      {children}
    </Link>
  )
}
