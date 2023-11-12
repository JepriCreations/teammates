'use client'

import React from 'react'

import { cn } from '@/lib/utils'

interface DashboardAppbarProps {
  project?: { id: string; name: string }
  className?: string
  children?: React.ReactNode
}
export const DashboardAppbar = ({
  className,
  children,
}: DashboardAppbarProps) => {
  return (
    <>
      <div></div>
      <header
        className={cn(
          'sticky top-0 z-40 flex h-20 items-center gap-3 bg-gradient-to-t from-transparent to-background to-[16px] px-4 pb-4 sm:px-12 md:h-24',
          className
        )}
      >
        {children}
      </header>
    </>
  )
}
