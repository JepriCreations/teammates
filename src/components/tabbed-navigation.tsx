'use client'

import * as React from 'react'
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

const TabbedNavigationRoot = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'bg-gradient-to-t from-transparent to-background to-[16px]',
        className
      )}
      {...props}
    />
  )
})
TabbedNavigationRoot.displayName = 'TabbedNavigationRoot'

const TabbedNavigationList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <nav
      ref={ref}
      className={cn(
        'flex h-16 w-full flex-nowrap items-center overflow-auto rounded-4xl bg-surfaceContainerLow text-center dark:bg-surfaceContainerHigh sm:h-20',
        className
      )}
      {...props}
    />
  )
})
TabbedNavigationList.displayName = 'TabbedNavigationList'

interface TabbedNavigationTriggerProps extends LinkProps {
  className?: string
  children: React.ReactNode | ((isActive: boolean) => React.ReactNode)
}

const TabbedNavigationTrigger = React.forwardRef<
  HTMLAnchorElement,
  TabbedNavigationTriggerProps
>(({ className, href, children, ...props }, ref) => {
  const pathname = usePathname()
  const isActive =
    pathname.split('/').pop() === href.toString().split('/').pop()

  return (
    <Link
      ref={ref}
      href={href}
      data-active={isActive ? '' : undefined}
      className={cn(
        'group relative inline-flex h-full max-w-[50%] grow cursor-pointer text-onSurfaceVariant outline-none transition',
        'before:absolute before:inset-0 before:hidden before:animate-zoom-in-x before:rounded-full before:bg-secondaryContainer before:transition-all',
        isActive && 'before:block',
        className
      )}
      {...props}
    >
      <div className="z-[1] inline-flex h-full w-full  items-center justify-center gap-2 rounded-4xl px-6 text-center align-middle transition group-hover:bg-onSurfaceVariant/8 group-focus:bg-onSurfaceVariant/8 [&>svg]:stroke-transparent [&>svg]:transition-all [&>svg]:duration-300 [&>svg]:group-hover:stroke-current group-data-[active]:[&>svg]:stroke-current">
        {typeof children === 'function' ? children(isActive) : children}
      </div>
    </Link>
  )
})
// The function children only works on client side component
TabbedNavigationTrigger.displayName = 'TabbedNavigationTrigger'

const TabbedNavigationLabel = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        'max-w-full truncate text-title-md font-normal text-onSurfaceVariant transition group-hover:font-medium group-data-[active]:font-medium',
        className
      )}
      {...props}
    />
  )
})
TabbedNavigationLabel.displayName = 'TabbedNavigationLabel'

const TabbedNavigation = Object.assign(TabbedNavigationRoot, {
  List: TabbedNavigationList,
  Trigger: TabbedNavigationTrigger,
  Label: TabbedNavigationLabel,
})

export {
  TabbedNavigation,
  TabbedNavigationList,
  TabbedNavigationTrigger,
  TabbedNavigationLabel,
}
