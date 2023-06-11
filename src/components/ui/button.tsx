import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { IconProps, LoadingIcon } from '@/components/icons'

const buttonVariants = cva(
  'inline-flex items-center justify-center w-full gap-3 text-base font-semibold transition-all focus-visible:outline-none focus-visible:ring-0 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default:
          'bg-background text-foreground hover:bg-hover focus:bg-hover disabled:bg-background/95 active:translate-x-0 active:translate-y-0 disabled:translate-x-0 disabled:translate-y-0 -translate-x-0.5 -translate-y-0.5 border border-border',
        secondary:
          'bg-background border-2 border-border text-foreground hover:bg-foreground/5 rounded-full active:scale-95',
        ghost: 'hover:bg-foreground/5 active:scale-95 focus:bg-foreground/5',
        link: 'underline-offset-4 hover:underline text-foreground active:scale-95 focus:underline',
        destructive:
          'bg-destructive text-foreground hover:bg-destructive/90 focus:bg-destructive/90 active:translate-x-0 active:translate-y-0 disabled:translate-x-0 disabled:translate-y-0 -translate-x-0.5 -translate-y-0.5 border border-border',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

const ButtonContainerVariants = cva('min-w-fit', {
  variants: {
    variant: {
      default: 'bg-foreground',
      secondary: 'bg-transparent',
      ghost: 'bg-transparent',
      link: 'bg-transparent',
      destructive: 'bg-foreground',
    },
    fullWidth: {
      true: 'w-full',
      false: 'w-fit',
    },
  },
  defaultVariants: {
    variant: 'default',
    fullWidth: false,
  },
})

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  fullWidth?: boolean
  loading?: boolean
  icon?: React.ComponentType<IconProps>
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'default',
      fullWidth = false,
      loading = false,
      size,
      children,
      asChild = false,
      disabled,
      icon: ButtonIcon,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <div
        className={cn(
          ButtonContainerVariants({ variant, fullWidth }),
          disabled && 'opacity-50'
        )}
      >
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          disabled={disabled}
          {...props}
        >
          <div className="flex items-center gap-3">
            {(() => {
              if (loading)
                return <LoadingIcon className="h-5 w-5 animate-spin" />
              if (ButtonIcon) return <ButtonIcon />
              return null
            })()}
            {children}
          </div>
        </Comp>
      </div>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
