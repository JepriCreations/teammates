'use client'

import * as React from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'

import { cn } from '@/lib/utils'
import { Icons } from '@/components/icons'

const DropdownMenuRoot = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50 min-w-[8rem] overflow-hidden rounded-xs bg-surfaceContainer py-2 text-onSurface shadow-md data-[state=closed]:duration-100 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex h-12 cursor-pointer select-none items-center px-3 py-2 text-body-sm text-onSurface outline-none transition-colors focus:bg-onSurface/8 active:bg-onSurface/12 data-[disabled]:pointer-events-none data-[disabled]:text-onSurface/38 [&>svg]:text-onSurfaceVariant [&>svg]:data-[disabled]:text-onSurface/38',
      inset && 'pl-8',
      className
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      'relative flex h-12 cursor-pointer select-none items-center px-3 py-2 text-label-lg text-onSurface outline-none transition-colors focus:bg-onSurface/8 active:bg-onSurface/12 data-[disabled]:pointer-events-none data-[disabled]:text-onSurface/38 [&>svg]:text-onSurfaceVariant [&>svg]:data-[disabled]:text-onSurface/38',
      inset && 'pl-8',
      className
    )}
    {...props}
  >
    {children}
    <Icons.angleRightSmall className="ml-auto h-6 w-6" />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      'z-50 min-w-[8rem] overflow-hidden rounded-xs bg-surfaceContainer py-2 text-onSurface shadow-md data-[state=closed]:duration-100 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1',
      className
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      'group relative ml-auto flex h-12 cursor-pointer select-none items-center px-3 py-2 text-body-sm text-onSurface outline-none transition-colors hover:bg-onSurface/8 focus:bg-onSurface/8 active:bg-onSurface/12 data-[disabled]:pointer-events-none data-[disabled]:text-onSurface/38',
      className
    )}
    {...props}
  >
    <div
      className={cn(
        'peer mr-2 h-5 w-5 shrink-0 rounded-[calc(var(--radius)-12px)] border-2 border-outline text-onPrimary outline-none ring-offset-surface transition-all group-disabled:cursor-not-allowed group-disabled:opacity-38 group-disabled:data-[state=checked]:bg-outline group-data-[state=checked]:border-0 group-data-[state=checked]:bg-primary'
      )}
    >
      <DropdownMenuPrimitive.ItemIndicator
        className={cn(
          'flex h-full w-full items-center justify-center text-current transition-transform duration-200 animate-in data-[state=unchecked]:animate-out data-[state=checked]:zoom-in-0 data-[state=unchecked]:zoom-out-0'
        )}
      >
        <Icons.check className="h-[18px] w-[18px]" />
      </DropdownMenuPrimitive.ItemIndicator>
    </div>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      'relative flex h-12 cursor-pointer select-none items-center px-3 py-2 text-label-lg text-onSurface outline-none transition-colors focus:bg-onSurface/8 active:bg-onSurface/12 data-[disabled]:pointer-events-none data-[disabled]:text-onSurface/38 [&>svg]:text-onSurfaceVariant [&>svg]:data-[disabled]:text-onSurface/38',
      className
    )}
    {...props}
  >
    <span className="mr-4 h-5 w-5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator className="grid h-full w-full place-items-center">
        <span className="block h-2 w-2 rounded-full bg-onSurfaceVariant" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn('px-2 py-1.5 text-label-md', inset && 'pl-8', className)}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuDivider = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-outlineVariant', className)}
    {...props}
  />
))
DropdownMenuDivider.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        'ml-auto text-label-lg tracking-widest text-onSurfaceVariant/50',
        className
      )}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut'

const DropdownMenu = Object.assign(DropdownMenuRoot, {
  Portal: DropdownMenuPortal,
  Trigger: DropdownMenuTrigger,
  Group: DropdownMenuGroup,
  SubMenu: DropdownMenuSub,
  RadioGroup: DropdownMenuRadioGroup,
  SubTrigger: DropdownMenuSubTrigger,
  SubContent: DropdownMenuSubContent,
  Content: DropdownMenuContent,
  MenuItem: DropdownMenuItem,
  CheckBoxItem: DropdownMenuCheckboxItem,
  RadioItem: DropdownMenuRadioItem,
  Label: DropdownMenuLabel,
  Divider: DropdownMenuDivider,
  Shortcut: DropdownMenuShortcut,
})

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuRadioGroup,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuDivider,
  DropdownMenuShortcut,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}
