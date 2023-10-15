import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'

import { cn } from '@/lib/utils'
import { IconButton } from '@/components/ui/icon-button'

export interface ButtonChipProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean
}

const ChipRoot = React.forwardRef<HTMLButtonElement, ButtonChipProps>(
  ({ className, children, selected, ...props }, ref) => {
    const asButton = props.onClick ? true : false

    if (asButton) {
      return (
        <button
          ref={ref}
          data-selected={selected}
          className={cn(
            'group relative h-8 overflow-hidden rounded-xs border border-outline px-2 disabled:pointer-events-none disabled:border-onSurface/12',
            selected &&
              'border-0 bg-secondaryContainer disabled:bg-onSurfaceVariant/12',
            className
          )}
          {...props}
        >
          <span className="relative z-10 flex h-full w-full items-center justify-center group-disabled:text-onSurface/38">
            {children}
          </span>
          <span
            className={
              'absolute inset-0 z-0 bg-onSurface opacity-0 transition-opacity group-hover:opacity-8 group-focus:opacity-12 group-active:opacity-12'
            }
          />
        </button>
      )
    }

    return (
      <Slot
        ref={ref}
        data-selected={selected}
        aria-disabled={props.disabled}
        className={cn(
          'group relative h-8 overflow-hidden rounded-xs border border-outline px-2 aria-disabled:pointer-events-none aria-disabled:border-onSurface/12',
          selected &&
            'border-0 bg-secondaryContainer aria-disabled:bg-onSurfaceVariant/12',
          className
        )}
        {...props}
      >
        <div>
          <span className="relative z-10 flex h-full w-full items-center justify-center group-aria-disabled:text-onSurface/38">
            {children}
          </span>
        </div>
      </Slot>
    )
  }
)
ChipRoot.displayName = 'Chip'

const ChipLabel = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        'truncate whitespace-nowrap px-2 text-label-lg text-onSurface group-disabled:text-onSurface/38 group-aria-disabled:text-onSurface/38  group-data-[selected=true]:text-onSecondaryContainer group-data-[selected=true]:group-disabled:text-onSurface/38 group-data-[selected=true]:group-aria-disabled:text-onSurface/38',
        className
      )}
      {...props}
    />
  )
})
ChipLabel.displayName = 'ChipLabel'

const ChipIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'h-[18px] w-[18px] text-primary group-disabled:text-onSurface/38 group-aria-disabled:text-onSurface/38 group-data-[selected=true]:text-onSurfaceVariant group-data-[selected=true]:group-disabled:text-onSurface/38  group-data-[selected=true]:group-aria-disabled:text-onSurface/38',
        className
      )}
      {...props}
    />
  )
})
ChipIcon.displayName = 'ChipIcon'

const ChipButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  return (
    <IconButton
      ref={ref}
      variant="standard"
      className={cn(
        'm-0 h-[24px] w-[24px] rounded-xl text-onSurfaceVariant transition group-disabled:text-onSurface/38 group-aria-disabled:text-onSurface/38 group-data-[selected=true]:group-aria-disabled:text-onSurface/38',
        className
      )}
      {...props}
    />
  )
})

ChipButton.displayName = 'ChipButton'

const Chip = Object.assign(ChipRoot, {
  Label: ChipLabel,
  Icon: ChipIcon,
  Button: ChipButton,
})

export { Chip }
