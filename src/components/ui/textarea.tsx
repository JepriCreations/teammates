import * as React from 'react'
import { cva, VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'

const textareaVariants = cva(
  'peer/input relative z-0 min-h-[80px] w-full grow rounded-[calc(var(--radius)-10px)] px-4 text-body-md text-onSurface caret-primary outline-none outline-0 transition-[color,border] placeholder:text-onSurfaceVariant/50 focus:outline-0 disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-onSurface/38 aria-[invalid=true]:caret-error data-[label]:placeholder:opacity-0 data-[label]:focus:placeholder:opacity-100',
  {
    variants: {
      variant: {
        filled:
          'pb-2 pt-3 bg-surfaceContainer border-b-2 border-onSurfaceVariant/12 hover:border-b-[3px] focus:border-b-[3px] focus:border-primary aria-[invalid=true]:border-error disabled:!border-onSurface/12 disabled:bg-surfaceContainer/38 data-[label]:pt-5',
        outlined: [
          'rounded-tl-[calc(min(var(--radius)-10px,6px))] border border-outline data-[label]:border-t-transparent bg-transparent py-2',

          'focus:border-2 focus:border-primary focus:data-[label]:border-t-transparent',

          'placeholder-shown:border-t-outline placeholder-shown:data-[label]:border-t-outline',

          'aria-[invalid=true]:border-2 aria-[invalid=true]:border-error aria-[invalid=true]:placeholder-shown:border-t-error aria-[invalid=true]:data-[label]:border-t-transparent aria-[invalid=true]:data-[label]:placeholder-shown:border-t-error aria-[invalid=true]:data-[label]:focus:border-t-transparent',

          'disabled:border-onSurface/12 disabled:border-t-transparent disabled:placeholder-shown:border-t-onSurface/12',

          'disabled:aria-[invalid=true]:border disabled:aria-[invalid=true]:border-onSurface/12 disabled:aria-[invalid=true]:border-t-transparent disabled:aria-[invalid=true]:placeholder-shown:border-t-onSurface/12 disabled:aria-[invalid=true]:data-[label]:placeholder-shown:border-t-onSurface/12 disabled:placeholder-shown:data-[label]:border-t-onSurface/12',
        ],
      },
    },
    defaultVariants: {
      variant: 'filled',
    },
  }
)

const filledLabel = [
  'h-6 w-[calc(100%-10px)] bg-surfaceContainer left-0 top-0 pl-4 pt-2 rounded-tl-[calc(var(--radius)-10px)]',
  'peer-placeholder-shown/input:leading-[2.5] peer-placeholder-shown/input:bg-transparent',
  'peer-[]/leading:before:mr-9',
  'peer-disabled/input:bg-transparent',
]

const outlinedLabel = [
  'h-full w-full left-0 top-[-6px] peer-placeholder-shown/input:leading-[4.2]',
  'peer-placeholder-shown/input:peer-[]/leading:before:mr-9 peer-focus/input:peer-[]/leading:before:mr-1',

  /** Before */
  'before:pointer-events-none before:mr-1 before:mt-[6px] before:box-border before:block before:h-1.5 before:w-3.5 before:rounded-tl-[calc(var(--radius)-10px)] before:border-l before:border-t before:border-outline before:transition-all',

  'peer-placeholder-shown/input:before:border-transparent',

  'peer-focus/input:before:border-primary peer-focus/input:before:border-l-2 peer-focus/input:before:border-t-2',

  'peer-aria-[invalid=true]/input:before:border-error peer-aria-[invalid=true]/input:before:border-l-2 peer-aria-[invalid=true]/input:before:border-t-2',

  'peer-disabled/input:before:border-t-onSurface/12 peer-disabled/input:before:border-l-onSurface/4 peer-disabled/input:peer-placeholder-shown/input:before:border-transparent',

  'peer-disabled/input:peer-aria-[invalid=true]/input:before:border-l peer-disabled/input:peer-aria-[invalid=true]/input:before:border-t peer-disabled/input:peer-aria-[invalid=true]/input:before:border-l-onSurface/4 peer-disabled/input:peer-aria-[invalid=true]/input:before:border-t-onSurface/12 peer-disabled/input:peer-aria-[invalid=true]/input:peer-placeholder-shown/input:before:border-transparent',

  /** After */
  'after:pointer-events-none after:ml-1 after:mt-[6px] after:box-border after:block after:flex-grow after:rounded-r-[calc(var(--radius)-10px)] after:border-r after:border-t after:border-outline after:transition-all',

  'peer-placeholder-shown/input:after:border-transparent',

  'peer-focus/input:after:border-primary peer-focus/input:after:border-r-2 peer-focus/input:after:border-t-2',

  'peer-aria-[invalid=true]/input:after:border-error peer-aria-[invalid=true]/input:after:border-r-2 peer-aria-[invalid=true]/input:after:border-t-2',

  'peer-disabled/input:after:border-t-onSurface/12 peer-disabled/input:after:border-r-onSurface/4 peer-disabled/input:peer-placeholder-shown/input:after:border-transparent',

  'peer-disabled/input:peer-aria-[invalid=true]/input:after:border-r peer-disabled/input:peer-aria-[invalid=true]/input:after:border-t peer-disabled/input:peer-aria-[invalid=true]/input:after:border-r-onSurface/4 peer-disabled/input:peer-aria-[invalid=true]/input:after:border-t-onSurface/12 peer-disabled/input:peer-aria-[invalid=true]/input:peer-placeholder-shown/input:after:border-transparent',
]

const textFieldLabelVariants = cva(
  'pointer-events-none absolute z-10 flex select-none text-label-sm leading-tight text-onSurfaceVariant transition-all peer-focus/input:text-label-sm peer-focus/input:leading-tight peer-focus/input:text-primary peer-disabled/input:text-onSurface/38 peer-placeholder-shown/input:text-body-md peer-placeholder-shown/input:text-onSurfaceVariant/70 peer-disabled/input:!text-onSurfaceVariant/38 peer-aria-[invalid=true]/input:text-error',
  {
    variants: {
      variant: {
        filled: filledLabel,
        outlined: outlinedLabel,
      },
    },
    defaultVariants: {
      variant: 'filled',
    },
  }
)

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  label?: string
  error?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { className, variant, error, name, label, placeholder = '', ...props },
    ref
  ) => {
    const id = React.useId()
    const inputId = name ?? id
    const isInvalid = !!error
    const hasLabel = !!label

    return (
      <div
        aria-label="Textarea Container"
        className="relative w-full min-w-[200px]"
      >
        <textarea
          ref={ref}
          id={inputId}
          name={inputId}
          className={cn(textareaVariants({ variant, className }))}
          aria-invalid={isInvalid}
          data-label={hasLabel ? '' : undefined}
          placeholder={placeholder}
          {...props}
        />
        <Label
          aria-label="Textarea Label"
          htmlFor={inputId}
          className={cn(textFieldLabelVariants({ variant }))}
        >
          {label}
        </Label>
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
