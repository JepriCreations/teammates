import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { LoadingIcon } from '@/components/icons'

const buttonVariants = cva(
  'flex items-center min-w-[120px] justify-center gap-3 rounded-md text-label-lg font-medium outline-none transition-all focus-visible:ring-0 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default:
          '-translate-x-0.5 -translate-y-0.5 border border-outline bg-surface text-onSurface shadow-[2px_2px_0px_hsl(var(--onSurface))] hover:bg-onSurface/5 focus:bg-onSurface/5 active:translate-x-0 active:translate-y-0 active:shadow-none disabled:translate-x-0 disabled:translate-y-0 disabled:bg-onSurface/12 disabled:border-onSurface/12 disabled:text-onSurface/38 disabled:shadow-none',
        accent:
          'bg-primary text-onPrimary hover:bg-primary/80 focus:bg-primary/80 disabled:bg-onSurface/12 disabled:text-onSurface/38 active:scale-95',
        secondary:
          'bg-secondaryContainer text-onSecondaryContainer hover:bg-secondaryContainer/80 focus:bg-secondaryContainer/80 disabled:bg-onSurface/12 disabled:text-onSurface/38 active:scale-95',
        ghost:
          'text-onSurface hover:bg-onSurface/5 active:scale-95 focus:bg-onSurface/5 disabled:text-onSurface/38 disabled:bg-onSurface/12',
        link: 'font-normal opacity-60 text-onSurface active:scale-95 focus:opacity-100 focus:bg-onSurface/5 disabled:text-outline hover:opacity-100 active:opacity-100',
        outline:
          'bg-surface border-2 text-onSurface hover:bg-onSurface/5 bg-transparent focus:bg-onSurface/5 border-outline/38 disabled:text-onSurface/38 disabled:bg-onSurface/12 disabled:border-onSurface/12 aria-[invalid=true]:border-error',
        destructive:
          '-translate-x-0.5 -translate-y-0.5 bg-errorContainer text-onErrorContainer shadow-[2px_2px_0px_hsl(var(--onSurface))]  hover:bg-errorContainer/80 focus:bg-errorContainer/80 active:translate-x-0 active:translate-y-0 active:shadow-none disabled:translate-x-0  disabled:translate-y-0 disabled:bg-onSurface/12 disabled:text-onSurface/38',
      },
      size: {
        default: 'px-4 py-2 h-10',
        sm: 'py-1 px-3',
        lg: 'py-3 px-8',
        icon: 'p-2 min-w-0',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-fit',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  fullWidth?: boolean
  loading?: boolean
  icon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'default',
      fullWidth = false,
      loading = false,
      size = 'default',
      asChild = false,
      icon,
      ...props
    },
    ref
  ) => {
    const childrenArray = React.Children.toArray(props.children)
    const firstChild = childrenArray[0]
    const isValidChild =
      React.isValidElement(firstChild) && childrenArray.length === 1

    if (asChild && !isValidChild) return React.Children.only(null)

    const Comp = asChild && isValidChild ? firstChild.type : 'button'

    const {
      children,
      className: childClassName = '',
      ...childProps
    } = asChild && isValidChild
      ? (firstChild.props as Record<string, any>)
      : { ...props }

    return (
      <Comp
        ref={ref}
        className={cn(
          buttonVariants({ size, variant, className }),
          asChild && childClassName,
          fullWidth ? 'w-full' : 'w-fit'
        )}
        disabled={props.disabled || loading}
        {...childProps}
      >
        {loading ? <LoadingIcon className="h-6 w-6 animate-spin" /> : icon}
        {children}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
