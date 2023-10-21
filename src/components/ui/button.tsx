import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { CircularProgress } from '@/components/ui/circular-progress'

const buttonVariants = cva(
  'relative select-none group w-fit overflow-hidden text-label-lg font-medium rounded-2xl transition outline-none disabled:pointer-events-none disabled:text-onSurface/38 disabled:shadow-none',
  {
    variants: {
      size: {
        default: 'h-10 px-6 min-w-[100px]',
        small: 'h-8 px-4',
      },
      variant: {
        filled:
          'bg-primary text-onPrimary hover:shadow-sm focus-visible:shadow-none active:shadow-none disabled:bg-onSurface/12 active:scale-[0.98]',
        tonal:
          'bg-secondaryContainer text-onSecondaryContainer disabled:bg-onSurface/12 active:scale-[0.98]',
        elevated:
          'bg-surfaceContainerLow shadow-sm text-primary  hover:shadow-md focus-visible:shadow-sm active:shadow-sm disabled:bg-onSurface/12 active:scale-[0.98]',
        outlined:
          'border border-outline text-primary bg-surface focus-visible:border-primary active:border-outline disabled:border-onSurface/12 active:scale-[0.98]',
        text: 'px-3 text-onSurface active:scale-[0.98]',
        brutalist:
          '-translate-x-0.5 -translate-y-0.5 border-2 border-onSurface bg-surface text-onSurface shadow-[2px_2px_0px_hsl(var(--onSurface))] active:translate-x-0 active:translate-y-0 active:shadow-none disabled:translate-x-0 disabled:translate-y-0 disabled:bg-onSurface/12 disabled:border-onSurface/12 disabled:text-onSurface/38 disabled:shadow-none',
        destructive:
          'bg-error text-onError hover:shadow-sm focus-visible:shadow-none active:shadow-none disabled:bg-onSurface/12 active:scale-[0.98]',
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
        elevated: 'bg-primary',
        outlined: 'bg-primary',
        text: 'bg-primary',
        brutalist: 'bg-onSurface',
        destructive: 'bg-onError',
      },
    },
    defaultVariants: {
      variant: 'filled',
    },
  }
)

interface IconProps {
  className?: string
}
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  icon?: React.ReactElement<IconProps>
  fullWidth?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      icon,
      fullWidth,
      loading,
      asChild = false,
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
          (icon || loading) && (variant !== 'text' ? 'pl-4' : 'pr-4'),
          fullWidth && 'w-full'
        )}
        disabled={props.disabled || loading}
        {...childProps}
      >
        <span className="relative z-10 flex h-full w-full items-center justify-center">
          {loading && (
            <CircularProgress className="mr-2 h-6 w-6 text-onSurface/38" />
          )}
          {icon &&
            !loading &&
            React.cloneElement(icon as React.ReactElement<any>, {
              className: cn(
                'mr-2 text-[18px] flex-shrink-0',
                icon.props.className
              ),
            })}
          {children}
        </span>
        <span className={cn(stateLayerVariants({ variant }))} />
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants, stateLayerVariants }
