'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { createSafeContext } from '@/lib/createSafeContext'
import { cn } from '@/lib/utils'
import { CircularProgress } from '@/components/ui/circular-progress'

const fabVariants = cva(
  'relative group w-fit overflow-hidden rounded-lg transition outline-none disabled:pointer-events-none disabled:text-onSurface/38 disabled:shadow-none',
  {
    variants: {
      size: {
        default: 'h-14 px-6 min-w-[100px]',
      },
      variant: {
        default:
          'bg-primaryContainer shadow-md text-onPrimaryContainer hover:shadow-sm focus-visible:shadow-none active:shadow-none disabled:bg-onSurface/12 active:scale-[0.98]',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
  }
)

const stateLayerVariants = cva(
  'transition-opacity absolute inset-0 z-0 opacity-0 group-hover:opacity-8 group-focus:opacity-12 group-active:opacity-12',
  {
    variants: {
      variant: {
        default: 'bg-primary',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface FabProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof fabVariants> {
  asChild?: boolean
  loading?: boolean
}

interface FabContextValue {
  loading?: boolean
}

export const [FabProvider, useFabContext] = createSafeContext<FabContextValue>({
  name: 'FabContextValue',
})

const FabRoot = React.forwardRef<HTMLButtonElement, FabProps>(
  ({ className, variant, size, loading, asChild = false, ...props }, ref) => {
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
      <FabProvider value={{ loading }}>
        <Comp
          ref={ref}
          disabled={props.disabled || loading}
          className={cn(
            fabVariants({ size, variant, className }),
            asChild && childClassName
          )}
          {...childProps}
        >
          <span className="relative z-10 flex h-full w-full items-center justify-center gap-x-2">
            {children}
          </span>
          <span className={cn(stateLayerVariants({ variant }))} />
        </Comp>
      </FabProvider>
    )
  }
)
FabRoot.displayName = 'FabRoot'

const FabIcon = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, children, ...props }, ref) => {
  const { loading } = useFabContext()
  return (
    <span ref={ref} className={cn('flex h-fit shrink-0', className)} {...props}>
      {loading ? (
        <CircularProgress className="h-6 w-6 text-onSurface/38" />
      ) : (
        children
      )}
    </span>
  )
})
FabIcon.displayName = 'FabIcon'

const FabLabel = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span ref={ref} className={cn('text-label-lg', className)} {...props} />
))
FabLabel.displayName = 'FabLabel'

const Fab = Object.assign(FabRoot, {
  Icon: FabIcon,
  Label: FabLabel,
})

export { Fab, FabIcon, FabLabel, fabVariants, stateLayerVariants }
