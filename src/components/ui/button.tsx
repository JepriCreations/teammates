import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { LoadingIcon } from '@/components/icons'

const buttonVariants = cva(
  'inline-flex items-center justify-center w-full gap-3 text-base font-semibold outline-none transition-all focus-visible:outline-none focus-visible:ring-0 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-foreground hover:bg-hover focus:bg-hover active:translate-x-0 active:translate-y-0 disabled:translate-x-0 disabled:translate-y-0 -translate-x-0.5 -translate-y-0.5 border border-border disabled:bg-muted',
        secondary:
          'bg-secondary text-secondary-foreground border border-border hover:bg-hover focus:bg-hover active:scale-95',
        ghost:
          'hover:bg-foreground/5 active:scale-95 focus:bg-foreground/5 disabled:bg-muted',
        link: 'underline-offset-4 hover:underline text-foreground active:scale-95 focus:underline disabled:text-muted-foreground',
        destructive:
          'bg-destructive text-destructive-foreground active:translate-x-0 active:translate-y-0 disabled:translate-x-0 disabled:translate-y-0 -translate-x-0.5 -translate-y-0.5 border border-border hover:bg-red-600 focus:bg-red-600',
      },
      size: {
        default: 'px-4 py-2',
        sm: 'py-1 px-3',
        lg: 'py-3 px-8',
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
  wrapperClassName?: string
  asChild?: boolean
  fullWidth?: boolean
  loading?: boolean
  icon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      wrapperClassName,
      className,
      variant = 'default',
      fullWidth = false,
      loading = false,
      size,
      children,
      asChild = false,
      disabled,
      icon,
      ...props
    },
    ref
  ) => {
    let Comp: React.ElementType = 'button'
    let childrenProps: { [x: string]: any } = {}

    if (asChild) {
      const child = React.Children.toArray(children)[0]
      if (React.isValidElement(child)) {
        Comp = child.type as React.ElementType
        childrenProps = child.props
      }
    }

    return (
      <div
        className={cn(
          ButtonContainerVariants({
            variant,
            fullWidth,
            className: wrapperClassName,
          }),
          disabled && 'opacity-50'
        )}
      >
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          disabled={disabled}
          {...(asChild ? { ...childrenProps } : { ...props })}
        >
          <div className="relative flex items-center gap-3">
            {loading ? <LoadingIcon className="h-6 w-6 animate-spin" /> : icon}
            {asChild ? childrenProps.children : children}
          </div>
        </Comp>
      </div>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
