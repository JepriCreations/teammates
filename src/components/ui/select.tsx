'use client'

import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import * as SelectPrimitive from '@radix-ui/react-select'

import { cn } from '@/lib/utils'
import { Icon } from '@/components/ui/icon'

export const outlinedSelectLabelStyle = [
  'pointer-events-none absolute left-0 top-[-6px] z-10 mr-1 flex h-full w-full select-none text-label-sm font-normal leading-tight text-onSurfaceVariant duration-200',

  'group-data-[placeholder]/input:text-body-lg group-data-[placeholder]/input:leading-[3.8] group-data-[placeholder]/input:text-onSurfaceVariant/70',

  'group-focus/input:text-primary group-data-[placeholder]/input:group-focus/input:text-label-sm group-data-[placeholder]/input:group-focus/input:leading-tight group-data-[placeholder]/input:group-focus/input:text-primary',

  'group-data-[state=open]/input:text-label-sm group-data-[state=open]/input:leading-tight group-data-[state=open]/input:text-primary',

  'group-data-[placeholder]/input:group-data-[state=open]/input:text-label-sm group-data-[placeholder]/input:group-data-[state=open]/input:leading-tight group-data-[placeholder]/input:group-data-[state=open]/input:text-primary',

  'group-disabled/input:!text-onSurfaceVariant/38 group-data-[invalid]/container:text-error',

  'group-aria-[invalid=true]/input:!text-error',

  /** Before **/
  'before:pointer-events-none before:mr-1 before:mt-[6px] before:box-border before:block before:h-full before:w-3.5 before:rounded-l-sm before:border-outline before:duration-200 before:transition-all before:border-t before:border-l',

  'group-data-[placeholder]/input:before:border-transparent',

  'group-data-[state=open]/input:before:border-t-2 group-data-[state=open]/input:before:border-l-2 group-data-[state=open]/input:before:border-primary',

  'group-focus/input:before:border-t-2 group-focus/input:before:border-l-2 group-focus/input:before:!border-primary',

  'group-aria-[invalid=true]/input:before:!border-error group-aria-[invalid=true]/input:before:border-l-2 group-aria-[invalid=true]/input:before:border-t-2',

  'group-disabled/input:before:border-t-onSurface/12 group-disabled/input:before:border-l-onSurface/12 group-disabled/input:group-data-[placeholder]/input:before:border-transparent',

  /** After **/
  'after:h-full after:pointer-events-none after:ml-1 after:mt-[6px] after:box-border after:block after:flex-grow after:rounded-r-sm after:border-outline after:duration-200 after:transition-all after:border-r after:border-t',

  'group-data-[placeholder]/input:after:border-transparent',

  'group-data-[state=open]/input:after:border-t-2 group-data-[state=open]/input:after:border-r-2 group-data-[state=open]/input:after:border-primary',

  'group-focus/input:after:border-t-2 group-focus/input:after:border-r-2 group-focus/input:after:!border-primary',

  'group-aria-[invalid=true]/input:after:!border-error group-aria-[invalid=true]/input:after:border-r-2 group-aria-[invalid=true]/input:after:border-t-2',

  'group-disabled/input:after:border-t-onSurface/12 group-disabled/input:after:border-r-onSurface/12 group-disabled/input:group-data-[placeholder]/input:after:border-transparent',
]

export const filledSelectTriggerStyle = [
  'group/input peer/input relative z-0 h-14 w-full grow rounded-sm bg-surfaceContainer px-4 py-2 text-start text-body-lg text-onSurface outline-none transition-colors focus:outline-0 disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-onSurface/38 data-[placeholder]:text-onSurfaceVariant/50',

  'disabled:!border-onSurface/12 disabled:bg-surfaceContainer/38 data-[label]:pt-5',

  'before:border-b-1 before:absolute before:inset-0 before:z-[-1] before:rounded-sm before:border-onSurfaceVariant/12 before:transition-[color,border] hover:before:border-b-[2px] focus:before:border-b-[2px] focus:before:border-primary aria-[invalid=true]:before:border-b-[2px] aria-[invalid=true]:before:!border-error data-[state=open]:before:border-b-[2px] data-[state=open]:before:border-primary',

  'has-[label]:pt-3 has-[label]:data-[placeholder]:data-[state=open]:text-onSurfaceVariant/50 has-[label]:data-[placeholder]:text-transparent has-[label]:data-[placeholder]:focus:text-onSurfaceVariant/50',
]

export const filledSelectLabelStyle = [
  'pointer-events-none absolute left-0 top-0 z-10 flex h-fit w-full select-none pl-4 pt-1 text-label-sm font-normal text-onSurfaceVariant duration-200',

  'group-data-[placeholder]/input:pt-4 group-data-[placeholder]/input:text-body-lg group-data-[placeholder]/input:text-onSurfaceVariant/70 group-data-[placeholder]/input:group-focus/input:text-primary',

  'group-focus/input:!pt-1 group-focus/input:!text-label-sm group-focus/input:text-primary',

  'group-data-[state=open]/input:pt-1 group-data-[state=open]/input:!text-label-sm group-data-[state=open]/input:text-primary',

  'group-disabled/input:!text-onSurfaceVariant/38 group-aria-[invalid=true]/input:!text-error',
]

export const outlineSelectTriggerStyle = [
  'peer/input group/input relative z-0 h-14 w-full grow rounded-sm bg-transparent px-4 py-2 text-start text-body-lg text-onSurface outline-none transition-colors focus:outline-0 disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-onSurface/38 data-[placeholder]:text-onSurfaceVariant/50',

  'before:absolute before:inset-0 before:z-[-1] before:rounded-sm before:border before:border-outline before:transition-[color,border]',

  'focus:before:border-2 focus:before:border-primary has-[label]:focus:before:border-t-transparent has-[label]:focus:data-[placeholder]:before:border-t-transparent',

  'data-[state=open]:before:border-2 data-[state=open]:before:border-primary has-[label]:data-[state=open]:before:border-t-transparent has-[label]:data-[state=open]:data-[placeholder]:before:border-t-transparent',

  'has-[label]:before:border-t-transparent has-[label]:data-[placeholder]:before:border-t-outline',

  'disabled:before:border-onSurface/12 disabled:before:border-t-transparent has-[label]:disabled:before:border-transparent has-[label]:disabled:before:border-b-onSurface/12 has-[label]:disabled:before:border-t-transparent disabled:data-[placeholder]:before:border-onSurface/12',

  'has-[label]:data-[placeholder]:data-[state=open]:text-onSurfaceVariant/50 has-[label]:data-[placeholder]:text-transparent has-[label]:data-[placeholder]:focus:text-onSurfaceVariant/50',

  'aria-[invalid=true]:before:border-2 aria-[invalid=true]:before:border-error aria-[invalid=true]:before:border-t-transparent aria-[invalid=true]:data-[state=open]:before:border-error aria-[invalid=true]:has-[label]:data-[placeholder]:before:border-t-error aria-[invalid=true]:has-[label]:data-[placeholder]:data-[state=open]:before:border-t-transparent aria-[invalid=true]:has-[label]:data-[placeholder]:focus:before:border-t-transparent',
]

export const selectIconStyle =
  'absolute right-2 top-2/4 grid -translate-y-2/4 place-items-center text-onSurfaceVariant/70 transition-transform group-disabled/input:text-onSurface/38 group-data-[state=open]/input:rotate-180 [&>i]:text-[20px] [&>svg]:h-5 [&>svg]:w-5'

const SelectGroup = SelectPrimitive.Group
const SelectValue = SelectPrimitive.Value

const FilledSelectRoot = (
  props: React.ComponentProps<typeof SelectPrimitive.Root>
) => {
  return <SelectPrimitive.Root {...props} />
}

const OutlinedSelectRoot = (
  props: React.ComponentProps<typeof SelectPrimitive.Root>
) => {
  return <SelectPrimitive.Root {...props} />
}

const FilledSelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
    error?: boolean
  }
>(({ className, children, error, ...props }, ref) => {
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      aria-invalid={error ? 'true' : undefined}
      className={cn(filledSelectTriggerStyle, className)}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild className={selectIconStyle}>
        <Icon symbol="expand_more" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
})
FilledSelectTrigger.displayName = 'FilledSelectTrigger'

const FilledSelectLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(filledSelectLabelStyle, className)}
    {...props}
  />
))
FilledSelectLabel.displayName = 'FilledSelectLabel'

const OutlinedSelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
    error?: boolean
  }
>(({ className, children, error, ...props }, ref) => {
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      aria-invalid={error ? 'true' : undefined}
      className={cn(outlineSelectTriggerStyle, className)}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild className={selectIconStyle}>
        <Icon symbol="expand_more" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
})
OutlinedSelectTrigger.displayName = 'OutlinedSelectTrigger'

const OutlinedSelectLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(outlinedSelectLabelStyle, className)}
    {...props}
  />
))
OutlinedSelectLabel.displayName = 'OutlinedSelectLabel'

const SelectSubheader = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => {
  return (
    <SelectPrimitive.Label
      ref={ref}
      className={cn(
        'px-3 py-2 text-label-md text-onSurfaceVariant/70',
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
        'relative z-50 max-h-80 min-w-[8rem] overflow-x-hidden rounded-md bg-surfaceContainer text-onSurfaceVariant shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-0 data-[side=left]:-translate-x-0 data-[side=right]:translate-x-0 data-[side=top]:-translate-y-0',
        className
      )}
      position={position}
      {...props}
    >
      <ScrollArea.Root className="h-full w-full" type="auto">
        <SelectPrimitive.Viewport
          asChild
          className={cn(
            'py-2',
            position === 'popper' &&
              'h-full w-full min-w-[var(--radix-select-trigger-width)]'
          )}
        >
          <ScrollArea.Viewport className="h-full w-full">
            {children}
          </ScrollArea.Viewport>
        </SelectPrimitive.Viewport>
      </ScrollArea.Root>
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
      'group relative flex h-12 cursor-pointer select-none items-center rounded-none px-3 py-2 text-body-lg text-onSurface outline-none transition-colors hover:bg-onSurface/8 focus:bg-onSurface/8 active:bg-onSurface/12 aria-selected:bg-onSurface/8 data-[disabled]:pointer-events-none data-[state=checked]:bg-primary/12 data-[disabled]:text-onSurface/38',
      className
    )}
    {...props}
  >
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

const FilledSelect = Object.assign(FilledSelectRoot, {
  Group: SelectGroup,
  Value: SelectValue,
  Trigger: FilledSelectTrigger,
  Label: FilledSelectLabel,
  Content: SelectContent,
  Item: SelectItem,
  Separator: SelectSeparator,
  Subheader: SelectSubheader,
})

const OutlinedSelect = Object.assign(OutlinedSelectRoot, {
  Group: SelectGroup,
  Value: SelectValue,
  Trigger: OutlinedSelectTrigger,
  Label: OutlinedSelectLabel,
  Content: SelectContent,
  Item: SelectItem,
  Separator: SelectSeparator,
  Subheader: SelectSubheader,
})

export {
  FilledSelect,
  OutlinedSelect,
  FilledSelectTrigger,
  FilledSelectLabel,
  OutlinedSelectTrigger,
  OutlinedSelectLabel,
  SelectGroup,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectSubheader,
}
