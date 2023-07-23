import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { LoadingIcon } from '@/components/icons'

const buttonVariants = cva(
  'flex items-center justify-center gap-3 text-base font-semibold outline-none transition-all focus-visible:ring-0 disabled:pointer-events-none disabled:opacity-60',
  {
    variants: {
      variant: {
        default:
          '-translate-x-0.5 -translate-y-0.5 border border-border bg-primary text-primary-foreground shadow-[2px_2px_0px_hsl(var(--primary-foreground))] hover:bg-hover focus:bg-hover active:translate-x-0 active:translate-y-0 active:shadow-none disabled:translate-x-0 disabled:translate-y-0 disabled:bg-muted disabled:text-muted-foreground disabled:opacity-50 disabled:shadow-none',
        accent:
          '-translate-x-0.5 -translate-y-0.5 border border-black bg-accent text-black shadow-[2px_2px_0px_hsl(var(--black))] hover:bg-accent/80 focus:bg-accent/80 active:translate-x-0 active:translate-y-0 active:shadow-none disabled:translate-x-0 disabled:translate-y-0 disabled:bg-muted disabled:text-muted-foreground disabled:opacity-50 disabled:shadow-none dark:disabled:opacity-80',
        secondary:
          '-translate-x-0.5 -translate-y-0.5 border border-black bg-secondary text-secondary-foreground shadow-[2px_2px_0px_hsl(var(--black))] hover:bg-secondary/80 focus:bg-secondary/80 active:translate-x-0 active:translate-y-0 active:shadow-none disabled:translate-x-0 disabled:translate-y-0 disabled:bg-muted disabled:text-muted-foreground disabled:opacity-50 disabled:shadow-none dark:disabled:opacity-80',
        ghost:
          'hover:bg-foreground/5 active:scale-95 focus:bg-foreground/5 disabled:text-muted-foreground disabled:opacity-50',
        link: 'font-normal opacity-60 text-foreground active:scale-95 focus:opacity-100 focus:bg-foreground/5 disabled:text-muted-foreground hover:opacity-100 active:opacity-100',
        outline:
          'bg-primary border-2 text-foregorund hover:bg-hover bg-transparent hover:bg-foreground/5 focus:bg-hover border-border disabled:text-muted-foreground disabled:opacity-50 aria-[invalid=true]:border-error-foreground',
        destructive:
          '-translate-x-0.5 -translate-y-0.5 border border-foreground bg-destructive text-destructive-foreground shadow-[2px_2px_0px_hsl(var(--foreground))] hover:bg-destructive/80 focus:bg-destructive/80 active:translate-x-0 active:translate-y-0 active:shadow-none disabled:translate-x-0 disabled:translate-y-0 disabled:shadow-none dark:border-destructive-foreground dark:shadow-[2px_2px_0px_hsl(var(--destructive-foreground))]',
      },
      size: {
        default: 'px-4 py-2 h-10',
        sm: 'py-1 px-3',
        lg: 'py-3 px-8',
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
      children,
      asChild = false,
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
      <Comp
        className={cn(
          buttonVariants({ variant, size, fullWidth, className }),
          icon && size === 'default' && 'pl-2'
        )}
        ref={ref}
        {...(asChild ? { ...childrenProps } : { ...props })}
      >
        {loading ? <LoadingIcon className="h-6 w-6 animate-spin" /> : icon}
        {asChild ? childrenProps.children : children}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
