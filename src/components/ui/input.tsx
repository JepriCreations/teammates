import * as React from 'react'
import { cva, VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const inputVariants = cva(
  'flex h-14 w-full items-center border-2 text-body-lg rounded-md border-outline/38 bg-transparent px-4 py-2 outline-none ring-2 ring-transparent ring-offset-0 transition-all file:border-0 file:bg-transparent file:py-2.5 file:text-sm file:font-medium file:text-onSurface/60 placeholder:text-onSurface/38 focus:ring-primary/38 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-38 aria-[invalid=true]:border-error aria-[invalid=true]:placeholder:text-error/38 [&.invalid]:border-error [&.invalid]:placeholder:text-error/38 aria-[invalid=true]:focus:ring-error/60 [&.invalid]:focus:ring-error/60',
  {
    variants: {
      variant: {
        default: 'ring-offset-background',
        card: 'ring-offset-surfaceContainerHighest',
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
  error?: string
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
            inputVariants({ variant, className }),
            error && 'invalid',
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
