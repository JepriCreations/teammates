import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

import { CircularProgress } from './circular-progress'

const iconButtonVariants = cva(
  'flex-shrink-0 relative group overflow-hidden grid place-items-center rounded-xl transition outline-none disabled:pointer-events-none disabled:text-onSurface/38 active:scale-[0.98]',
  {
    variants: {
      size: {
        default: 'h-10 w-10 m-1',
        small: 'h-8 w-8 m-1 [&>i]:text-sm',
      },
      variant: {
        filled: 'bg-primary text-onPrimary disabled:bg-onSurface/12',
        tonal:
          'bg-secondaryContainer text-onSecondaryContainer disabled:bg-onSurface/12',
        outlined:
          'border border-outline text-onSurfaceVariant disabled:border-onSurface/12',
        standard: 'text-onSurfaceVariant',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'filled',
    },
  }
)

const stateLayerVariants = cva(
  'transition-opacity absolute inset-0 z-0 opacity-0 group-hover:opacity-8 group-focus:opacity-12 group-active:opacity-12',
  {
    variants: {
      variant: {
        filled: 'bg-onPrimary',
        tonal: 'bg-onSecondaryContainer',
        outlined: 'bg-onSurfaceVariant',
        standard: 'bg-onSurfaceVariant',
      },
    },
  }
)

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  asChild?: boolean
  loading?: boolean
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, asChild, loading, ...props }, ref) => {
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
          iconButtonVariants({ size, variant, className }),
          asChild && childClassName
        )}
        disabled={props.disabled || loading}
        {...childProps}
      >
        {loading ? (
          <CircularProgress className="h-6 w-6 text-onSurface/38" />
        ) : (
          children
        )}
        <span className={cn(stateLayerVariants({ variant }))} />
      </Comp>
    )
  }
)

IconButton.displayName = 'IconButton'

export { IconButton, iconButtonVariants }
