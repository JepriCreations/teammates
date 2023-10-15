'use client'

import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'

import { cn } from '@/lib/utils'

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {}

const LinearProgress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, ...props }, ref) => {
  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        'relative h-1 w-full overflow-hidden bg-surfaceContainerHighest',
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          'data-[state=indeterminate]:animate-linear-progress h-full w-full flex-1 bg-primary transition-all'
        )}
        style={{ transform: `translateX(-${value || 0}%)` }}
      />
    </ProgressPrimitive.Root>
  )
})
LinearProgress.displayName = 'LinearProgress'

export { LinearProgress }
