'use client'

import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { cva, VariantProps } from 'class-variance-authority'

import { createSafeContext } from '@/lib/createSafeContext'
import { cn, createComponentWithStatics } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { Icons } from '@/components/icons'

const selectTriggerVariants = cva(
  'group peer relative z-0 h-full h-14 w-full grow rounded-[calc(var(--radius)-10px)] px-4 text-body-md text-onSurface caret-primary outline-none outline-0 transition-[color,border] focus:outline-0 disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-onSurface/38 aria-[invalid=true]:caret-error text-start data-[placeholder]:text-onSurfaceVariant/50 [&>#select-value]:data-[placeholder]:data-[state=closed]:data-[label]:hidden',
  {
    variants: {
      variant: {
        filled:
          'pb-2 pt-3 bg-surfaceContainer border-b-2 border-onSurfaceVariant/12 hover:border-b-[3px] focus:border-b-[3px] focus:border-primary aria-[invalid=true]:!border-error disabled:!border-onSurface/12 disabled:bg-surfaceContainer/38 data-[label]:pt-5 data-[state=open]:border-primary data-[state=open]:border-b-[3px]',
        outlined: [
          'rounded-tl-[calc(min(var(--radius)-10px,6px))] border border-outline data-[label]:border-t-transparent bg-transparent py-2',

          'focus:border-2 focus:border-primary focus:data-[label]:border-t-transparent',

          'data-[placeholder]:data-[state=closed]:border-t-outline data-[placeholder]:data-[state=closed]:focus:border-primary',

          'data-[state=open]:border-2 data-[state=open]:border-primary data-[state=open]:data-[label]:border-t-transparent',

          'aria-[invalid=true]:border-2 aria-[invalid=true]:border-error aria-[invalid=true]:data-[state=closed]:border-t-error aria-[invalid=true]:data-[state=open]:border-error aria-[invalid=true]:data-[state=open]:data-[label]:border-t-transparent aria-[invalid=true]:data-[state=closed]:data-[placeholder]:focus:border-error aria-[invalid=true]:data-[label]:data-[state=closed]:border-t-transparent aria-[invalid=true]:data-[label]:data-[state=closed]:data-[placeholder]:border-t-error',

          'disabled:data-[placeholder]:data-[state=closed]:border-onSurface/12 disabled:border-onSurface/12 disabled:border-t-transparent',
        ],
      },
    },
    defaultVariants: {
      variant: 'filled',
    },
  }
)

const outlinedLabel = [
  'h-full w-full left-0 top-[-6px] peer-data-[state=closed]:peer-data-[placeholder]:leading-[4.2]',

  /** Before */
  'before:pointer-events-none before:mr-1 before:mt-[6px] before:box-border before:block before:h-1.5 before:w-3.5 before:rounded-tl-[calc(var(--radius)-10px)] before:border-l before:border-t before:border-outline before:transition-all',

  'peer-data-[placeholder]:peer-data-[state=closed]:before:border-transparent',

  'peer-focus:before:border-primary peer-focus:before:border-l-2 peer-focus:before:border-t-2',

  'peer-data-[state=open]:before:border-primary peer-data-[state=open]:before:border-l-2 peer-data-[state=open]:before:border-t-2',

  'peer-aria-[invalid=true]:before:!border-error peer-aria-[invalid=true]:before:border-l-2 peer-aria-[invalid=true]:before:border-t-2',

  'peer-disabled:before:border-onSurface/12 peer-disabled:before:border-l-onSurface/4',

  /** After */
  'after:h-full after:pointer-events-none after:ml-1 after:mt-[6px] after:box-border after:block after:flex-grow after:rounded-r-[calc(var(--radius)-10px)] after:border-r after:border-t after:border-outline after:transition-all',

  'peer-data-[placeholder]:peer-data-[state=closed]:after:border-transparent',

  'peer-focus:after:border-primary peer-focus:after:border-r-2 peer-focus:after:border-t-2',

  'peer-data-[state=open]:after:border-primary peer-data-[state=open]:after:border-r-2 peer-data-[state=open]:after:border-t-2',

  'peer-aria-[invalid=true]:after:!border-error peer-aria-[invalid=true]:after:border-r-2 peer-aria-[invalid=true]:after:border-t-2',

  'peer-disabled:after:border-onSurface/12 peer-disabled:after:border-r-onSurface/4',
]

const filledLabel = [
  'h-fit w-full left-0 pl-4 pt-2 top-0 peer-data-[state=closed]:peer-data-[placeholder]:leading-[2.5]',
]

const selectLabelVariants = cva(
  [
    'pointer-events-none absolute z-10 flex select-none text-label-sm leading-tight text-onSurfaceVariant transition-all',

    'peer-focus:text-label-sm peer-focus:leading-tight peer-focus:text-primary',

    'peer-data-[state=closed]:peer-data-[placeholder]:text-body-md peer-data-[state=closed]:peer-data-[placeholder]:text-onSurfaceVariant/70',

    'peer-data-[state=open]:text-primary',

    'peer-aria-[invalid=true]:!text-error',

    'peer-disabled:!text-onSurface/38',
  ],
  {
    variants: {
      variant: {
        filled: filledLabel,
        outlined: outlinedLabel,
      },
    },
    defaultVariants: {
      variant: 'filled',
    },
  }
)

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

interface SelectContextValue {
  variant?: VariantProps<typeof selectTriggerVariants>['variant']
  error?: string
}

export const [SelectProvider, useSelectProvider] =
  createSafeContext<SelectContextValue>({
    name: 'SelectContext',
  })

const SelectRoot = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root> &
    SelectContextValue
>(({ children, variant, error, ...props }, ref) => (
  <SelectPrimitive.Root {...props}>
    <div className="relative w-full min-w-[200px]">
      <SelectProvider value={{ variant, error }}>{children}</SelectProvider>
    </div>
  </SelectPrimitive.Root>
))
SelectRoot.displayName = SelectPrimitive.Root.displayName

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
    label?: string
  }
>(({ className, children, placeholder, label, id, ...props }, ref) => {
  const { variant, error } = useSelectProvider()
  const hasLabel = !!label
  const isInvalid = !!error

  return (
    <>
      <SelectPrimitive.Trigger
        ref={ref}
        id={id}
        data-label={hasLabel ? '' : undefined}
        aria-invalid={isInvalid}
        className={cn(selectTriggerVariants({ variant, className }))}
        {...props}
      >
        <SelectValue id="select-value" placeholder={placeholder} />
        {children}
        <SelectPrimitive.Icon className="absolute right-2 top-2/4 grid -translate-y-2/4 place-items-center text-onSurfaceVariant/70 transition-transform group-disabled:text-onSurface/38 group-data-[state=open]:rotate-180">
          <Icons.angleDownSmall className="h-full w-full" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      {hasLabel && (
        <Label
          htmlFor={id}
          className={cn(selectLabelVariants({ variant, className }))}
        >
          {label}
        </Label>
      )}
    </>
  )
})
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectSubheader = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => {
  return (
    <SelectPrimitive.Label
      ref={ref}
      className={cn(
        'px-3 py-2 text-label-sm text-onSurfaceVariant/70',
        className
      )}
      {...props}
    />
  )
})
SelectSubheader.displayName = SelectPrimitive.Label.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        'relative z-50 min-w-[8rem] overflow-hidden rounded-md bg-surfaceContainer text-onSurfaceVariant shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-0 data-[side=left]:-translate-x-0 data-[side=right]:translate-x-0 data-[side=top]:-translate-y-0',
        className
      )}
      position={position}
      {...props}
    >
      <SelectPrimitive.Viewport
        className={cn(
          'py-2',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'group relative flex h-12 cursor-pointer select-none items-center rounded-none px-3 py-2 text-body-sm text-onSurface outline-none transition-colors hover:bg-onSurface/8 focus:bg-onSurface/8 active:bg-onSurface/12 aria-selected:bg-onSurface/8 data-[disabled]:pointer-events-none data-[disabled]:text-onSurface/38',
      className
    )}
    {...props}
  >
    <span className="mr-2 flex h-5 w-5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Icons.check className="h-full w-full text-onSurfaceVariant group-disabled:text-onSurface/38" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-outlineVariant/38', className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

const staticComponents = {
  Group: SelectGroup,
  Value: SelectValue,
  Trigger: SelectTrigger,
  Content: SelectContent,
  Item: SelectItem,
  Separator: SelectSeparator,
  Subheader: SelectSubheader,
}

const Select = createComponentWithStatics(SelectRoot, staticComponents)
export { Select, selectTriggerVariants, selectLabelVariants }
