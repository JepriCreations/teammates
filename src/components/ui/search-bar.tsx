'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

const SearchBarRoot = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={cn(
      'relative flex h-14 w-full min-w-[360px] items-center rounded-4xl bg-surfaceContainerHigh',
      className
    )}
    {...props}
    ref={ref}
  />
))
SearchBarRoot.displayName = 'SearchBarRoot'

const SearchBarInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    type="search"
    className={cn(
      'h-full w-full grow bg-transparent px-4 text-body-lg text-onSurface outline-none placeholder:text-body-lg placeholder:text-onSurfaceVariant disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-onSurface/38 disabled:placeholder:text-onSurface/38',
      className
    )}
    {...props}
  />
))
SearchBarInput.displayName = 'SearchBarInput'

const SearchBarLeftSection = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={cn('flex items-center gap-2 pl-4 text-onSurface', className)}
    {...props}
    ref={ref}
  />
))
SearchBarLeftSection.displayName = 'SearchBarLeftSection'

const SearchBarRightSection = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={cn('flex items-center gap-2 pr-4 text-onSurface', className)}
    {...props}
    ref={ref}
  />
))
SearchBarRightSection.displayName = 'SearchBarRightSection'

const SearchBar = Object.assign(SearchBarRoot, {
  Input: SearchBarInput,
  LeftSection: SearchBarLeftSection,
  RightSection: SearchBarRightSection,
})

export {
  SearchBar,
  SearchBarInput,
  SearchBarLeftSection,
  SearchBarRightSection,
}
