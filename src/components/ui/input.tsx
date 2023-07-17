import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  leftSection?: React.ReactNode
  rightSection?: React.ReactNode
  srlabel?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      className,
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
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          {leftSection}
        </span>
        <input
          type={type}
          className={cn(
            'border-input flex h-10 w-full border bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-error',
            error && 'border-error',
            leftSection && 'pl-12',
            rightSection && 'pr-12',
            className
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
