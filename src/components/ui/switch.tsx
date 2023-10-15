'use client'

import * as React from 'react'
import * as SwitchPrimitives from '@radix-ui/react-switch'

import { cn } from '@/lib/utils'
import { Icons } from '@/components/icons'

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
    widthIconOnSelected?: boolean
    withIcons?: boolean
  }
>(({ className, widthIconOnSelected, withIcons, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      'group peer inline-flex h-8 w-[52px] shrink-0 cursor-pointer items-center rounded-lg border-2 border-outline bg-surfaceContainerHighest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/38 focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:cursor-not-allowed disabled:border-onSurface/12 disabled:bg-surfaceContainerHighest/12 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:disabled:border-transparent data-[state=checked]:disabled:bg-onSurface/12',
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        'pointer-events-none flex aspect-square h-4 items-center justify-center rounded-xl bg-outline ring-0 transition-[transform,width,height] group-active:scale-110 group-disabled:bg-onSurface/38 data-[state=checked]:h-6 data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-1.5 data-[state=checked]:bg-onPrimary data-[state=checked]:group-disabled:bg-surface',
        withIcons && 'h-6 data-[state=unchecked]:translate-x-0.5'
      )}
    >
      {(widthIconOnSelected || withIcons) && (
        <>
          <span className="hidden text-onPrimaryContainer animate-in zoom-in-0 group-disabled:text-onSurface group-disabled:opacity-38 group-data-[state=checked]:block">
            <Icons.check size={16} />
          </span>
          {withIcons && (
            <span className="hidden text-surfaceContainerHighest animate-in zoom-in-0 group-disabled:text-surface group-data-[state=unchecked]:block">
              <Icons.close size={16} />
            </span>
          )}
        </>
      )}
    </SwitchPrimitives.Thumb>
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
