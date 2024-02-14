'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number | null
}

const CircularProgress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ value = null, className }, ref) => {
    const state = React.useMemo(() => {
      if (value === undefined || value === null) return 'indeterminate'
      if (value === 100) return 'complete'
      return 'loading'
    }, [value])

    return (
      <span
        ref={ref}
        data-state={state}
        className={cn(
          'group inline-block aspect-square h-12 shrink-0 text-primary',
          className
        )}
      >
        <svg
          className="block h-full w-full -rotate-90 group-data-[state=indeterminate]:animate-progress-spin"
          viewBox="22 22 44 44"
        >
          <circle
            className="stroke-current transition-[stroke-dashoffset] duration-300 group-data-[state=indeterminate]:animate-circular-progress"
            cx="44"
            cy="44"
            r="14"
            fill="none"
            strokeWidth="4"
            {...(value && {
              style: {
                strokeDasharray: '100, 200',
                strokeDashoffset: 100 - value,
              },
            })}
          />
        </svg>
      </span>
    )
  }
)
CircularProgress.displayName = 'CircularProgress'

export { CircularProgress }
