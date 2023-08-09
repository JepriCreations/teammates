import * as React from 'react'
import { cva, VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const textareaVariants = cva(
  'flex min-h-[80px] w-full text-body-lg rounded-md items-center border-2 border-outline/38 bg-transparent px-4 py-2 outline-none ring-2 ring-transparent ring-offset-0 transition-all placeholder:text-onSurface/38 focus:ring-primary/38 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-38 aria-[invalid=true]:border-error aria-[invalid=true]:placeholder:text-error/38 aria-[invalid=true]:focus:ring-error/60 [&.invalid]:border-error [&.invalid]:placeholder:text-error/38 [&.invalid]:focus:ring-error/60',
  {
    variants: {
      variant: {
        default: 'ring-offset-surface',
        card: 'ring-offset-surfaceContainerHighest',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  error?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant = 'default', error, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          textareaVariants({ variant, className }),
          error && 'invalid'
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
