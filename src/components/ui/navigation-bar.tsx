'use client'

import React from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'

const NavigationBarRoot = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'fixed inset-x-0 bottom-0 z-30 flex justify-between bg-surfaceContainerLow py-4 pt-3 dark:bg-surfaceContainerHigh md:-inset-x-px md:inset-y-0 md:w-24 md:flex-col md:px-0 md:py-5',
      className
    )}
    {...props}
  />
))
NavigationBarRoot.displayName = 'NavigationBarRoot'

const NavigationContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <nav
    ref={ref}
    className={cn(
      'flex grow justify-around md:h-fit md:w-full md:grow-0 md:flex-col md:space-y-5',
      className
    )}
    {...props}
  />
))
NavigationContainer.displayName = 'NavigationContainer'

const NavigationItem = React.forwardRef<
  HTMLAnchorElement,
  React.HTMLAttributes<HTMLAnchorElement> & {
    href: string
    label: string
    active?: boolean
    icon: React.ReactElement<any>
  }
>(({ className, active, label, icon, ...props }, ref) => {
  return (
    <Link
      ref={ref}
      data-active={active ? '' : undefined}
      className={cn(
        'group grid w-full place-items-center gap-y-1 font-normal outline-none transition md:p-0.5',
        className
      )}
      {...props}
    >
      <span className="relative grid h-8 w-16 place-items-center gap-y-1 rounded-lg bg-transparent text-onSurface transition-all before:absolute before:inset-0 before:z-[-1] before:hidden before:animate-zoom-in-x before:rounded-full before:bg-secondaryContainer before:transition-all group-hover:bg-onSurfaceVariant/8 group-focus:bg-onSurfaceVariant/8 group-data-[active]:before:block md:w-14">
        {React.cloneElement(icon, {
          className: cn(
            'stroke-transparent transition-all duration-300 group-hover:stroke-current group-data-[active]:stroke-current',
            icon.props.className
          ),
        })}
      </span>
      <span className="w-full truncate text-center text-label-md font-normal text-onSurface group-hover:font-medium group-data-[active]:font-medium">
        {label}
      </span>
    </Link>
  )
})
NavigationItem.displayName = 'NavigationItem'

const NavigationBar = Object.assign(NavigationBarRoot, {
  Container: NavigationContainer,
  Item: NavigationItem,
})

export { NavigationBar }
