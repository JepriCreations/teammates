import React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const cardVariants = cva(
  'transition w-full relative rounded-md overflow-hidden',
  {
    variants: {
      variant: {
        elevated: 'bg-surfaceContainerLow shadow-sm',
        filled: 'bg-surfaceContainerHigh',
        outlined: 'bg-surface border border-outline',
      },
    },
    defaultVariants: {
      variant: 'filled',
    },
  }
)

const actionCardVariants = cva('', {
  variants: {
    variant: {
      elevated: 'hover:shadow-md [&.disabled]:bg-surfaceVariant',
      filled: 'hover:shadow-sm [&.disabled]:bg-surface',
      outlined: '[&.disabled]:border-outline/70',
    },
  },
  defaultVariants: {
    variant: 'filled',
  },
})

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const CardRoot = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, className }), '')}
        {...props}
      />
    )
  }
)
CardRoot.displayName = 'CardRoot'

const ActionCardRoot = React.forwardRef<
  HTMLDivElement,
  CardProps & { disabled?: boolean }
>(({ variant, className, disabled, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        cardVariants({ variant, className }),
        actionCardVariants({ variant, className }),
        disabled &&
          'disabled opacity-38 shadow-none hover:shadow-none [&>a]:pointer-events-none'
      )}
      {...props}
    >
      <Slot className="peer relative z-10 outline-none">{children}</Slot>
      <span className="absolute inset-0 z-0 transition-colors peer-hover:bg-onSurface/4 peer-focus:bg-onSurface/8 peer-active:bg-onSurface/8" />
    </div>
  )
})
ActionCardRoot.displayName = 'ActionCard'

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-4 text-onSurface', className)}
    {...props}
  />
))
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn('text-title-lg', className)} {...props} />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('muted text-title-sm', className)} {...props} />
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('p-4 pt-0 text-onSurface', className)}
    {...props}
  />
))
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-4', className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

const ActionCard = Object.assign(ActionCardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
})

const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
})

export {
  Card,
  ActionCard,
  CardRoot,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
}
