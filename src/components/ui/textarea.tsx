import * as React from 'react'
import { cva, VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const textareaVariants = cva(
  'flex min-h-[80px] w-full items-center border-2 border-border bg-transparent px-4 py-2 outline-none ring-2 ring-transparent ring-offset-0 transition-all file:border-0 file:bg-transparent file:py-2.5 file:text-sm file:font-medium file:text-foreground/60 placeholder:text-muted-foreground focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-error-foreground aria-[invalid=true]:placeholder:text-error-foreground/80',
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

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant = 'default', error, ...props }, ref) => {
    return (
      <textarea
        className={cn(textareaVariants({ variant, error, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
