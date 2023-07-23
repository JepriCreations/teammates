import * as React from 'react'
import { cva, VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const inputVariants = cva(
  'flex h-14 w-full items-center border-2 border-border bg-transparent px-4 py-2 outline-none ring-2 ring-transparent ring-offset-0 transition-all file:border-0 file:bg-transparent file:py-2.5 file:text-sm file:font-medium file:text-foreground/60 placeholder:text-muted-foreground focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-error-foreground aria-[invalid=true]:placeholder:text-error-foreground/80',
  {
    variants: {
      variant: {
        default: 'ring-offset-background',
        card: 'ring-offset-card',
      },
      error: {
        true: 'border-error-foreground placeholder:text-error-foreground/80',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  leftSection?: React.ReactNode
  rightSection?: React.ReactNode
  srlabel?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      className,
      variant = 'default',
      srlabel,
      type,
      error,
      leftSection,
      rightSection,
      ...props
    },
    ref
  ) => {
    return (
      <label className="relative block">
        {srlabel && <span className="sr-only">{srlabel}</span>}
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          {leftSection}
        </span>
        <input
          type={type}
          className={cn(
            inputVariants({ variant, error, className }),
            leftSection && 'pl-[52px]',
            rightSection && 'pr-[52px]'
          )}
          ref={ref}
          {...props}
        />
        <span className="absolute inset-y-0 right-0 flex items-center pr-2">
          {rightSection}
        </span>
      </label>
    )
  }
)
Input.displayName = 'Input'

export { Input }
