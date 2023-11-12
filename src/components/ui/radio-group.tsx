'use client'

import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'

import { cn } from '@/lib/utils'

const RadioGroupRoot = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn('grid gap-2', className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroupRoot.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, children, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'group aspect-square h-5 w-5 rounded-full border-2 border-outline ring-offset-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/38 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-38 data-[state=checked]:border-primary disabled:data-[state=checked]:border-outline',
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center data-[state=unchecked]:duration-100 data-[state=checked]:animate-in data-[state=unchecked]:animate-out data-[state=checked]:zoom-in-0 data-[state=unchecked]:zoom-out-0">
        <span className="h-2.5 w-2.5 rounded-full bg-primary group-disabled:bg-outline" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

const RadioGroup = Object.assign(RadioGroupRoot, {
  Item: RadioGroupItem,
})

export { RadioGroup, RadioGroupItem }
