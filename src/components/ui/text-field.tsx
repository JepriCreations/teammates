import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'

import { cn } from '@/lib/utils'

const commonStyle =
  'pointer-events-none absolute z-10 flex select-none text-label-sm font-normal leading-tight text-onSurfaceVariant duration-200 peer-placeholder-shown/input:text-body-lg peer-placeholder-shown/input:text-onSurfaceVariant/70 peer-focus/input:text-label-sm peer-focus/input:leading-tight peer-focus/input:text-primary peer-disabled/input:!text-onSurfaceVariant/38 group-data-[invalid]/container:text-error'

const outlinedLabel = [
  'h-full w-full left-0 top-[-6px] mr-1 peer-placeholder-shown/input:leading-[3.8]',
  'peer-focus/input:before:mr-1 peer-has-[*]/icon:peer-placeholder-shown/input:before:mr-9 peer-has-[*]/icon:peer-focus/input:before:mr-1',

  /** Before **/
  'before:pointer-events-none before:mr-1 before:mt-[6px] before:box-border before:block before:h-full before:w-3.5 before:rounded-l-sm before:border-outline before:duration-200 before:transition-all before:border-t before:border-l',

  'peer-placeholder-shown/input:before:border-transparent',

  'peer-focus/input:before:border-primary peer-focus/input:before:border-l-2 peer-focus/input:before:border-t-2',

  'group-data-[invalid]/container:before:border-error group-data-[invalid]/container:before:border-l-2 group-data-[invalid]/container:before:border-t-2',

  'peer-disabled/input:before:border-t-onSurface/12 peer-disabled/input:before:border-l-onSurface/12 peer-disabled/input:peer-placeholder-shown/input:before:border-transparent',

  /** After **/
  'after:h-full after:pointer-events-none after:ml-1 after:mt-[6px] after:box-border after:block after:flex-grow after:rounded-r-sm after:border-r after:border-t after:border-outline duration-200 after:transition-all',

  'peer-placeholder-shown/input:after:border-transparent',

  'peer-focus/input:after:border-primary peer-focus/input:after:border-r-2 peer-focus/input:after:border-t-2',

  'group-data-[invalid]/container:after:border-error group-data-[invalid]/container:after:border-r-2 group-data-[invalid]/container:after:border-t-2',

  'peer-disabled/input:after:border-t-onSurface/12 peer-disabled/input:after:border-r-onSurface/12 peer-disabled/input:peer-placeholder-shown/input:after:border-transparent',
]

const FilledTextFieldRoot = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { error?: boolean }
>(({ className, error, ...props }, ref) => (
  <div
    ref={ref}
    data-invalid={error ? '' : undefined}
    className={cn(
      'group/container relative z-0 flex w-full items-center rounded-sm bg-surfaceContainer px-2',

      'before:absolute before:inset-0 before:z-[-1] before:rounded-sm before:border-b before:border-onSurfaceVariant/12 before:transition-[color,border]',

      'focus-within:before:border-b-[2px] focus-within:before:border-primary',

      'has-[:disabled]:bg-surfaceContainer/38 has-[:disabled]:before:border-onSurface/12',

      Boolean(error) && 'before:border-error focus-within:before:border-error',
      className
    )}
    {...props}
  />
))
FilledTextFieldRoot.displayName = 'FilledTextFieldRoot'

const OutlinedTextFieldRoot = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { error?: boolean }
>(({ className, error, ...props }, ref) => (
  <div
    ref={ref}
    data-invalid={error ? '' : undefined}
    className={cn(
      'group/container relative z-0 flex w-full items-center bg-transparent px-2',

      'before:absolute before:inset-0 before:z-[-1] before:rounded-sm before:border before:border-outline before:transition-[color,border]',

      'focus-within:before:border-2 focus-within:before:border-primary',

      'has-[label]:has-[:placeholder-shown]:before:border-outline has-[label]:before:border-t-transparent has-[label]:focus-within:before:border-b-primary has-[label]:focus-within:before:border-t-transparent',

      'has-[:disabled]:before:border-onSurface/12 has-[:disabled]:has-[:placeholder-shown]:before:border-onSurface/12 has-[label]:has-[:disabled]:before:border-transparent has-[:disabled]:before:border-t-transparent has-[label]:has-[:disabled]:before:border-b-onSurface/12 has-[label]:has-[:disabled]:before:border-t-transparent',

      Boolean(error) &&
        'before:border-2 before:border-error has-[label]:has-[:placeholder-shown]:before:border-error has-[label]:focus-within:before:border-b-error',
      className
    )}
    {...props}
  />
))
OutlinedTextFieldRoot.displayName = 'OutlinedTextFieldRoot'

const FilledTextfieldLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      commonStyle,
      'left-0 top-0 h-fit w-full pl-4 pt-2 peer-placeholder-shown/input:leading-[2.5] peer-has-[*]/icon:left-9',
      className
    )}
    {...props}
  />
))
FilledTextfieldLabel.displayName = 'FilledTextfieldLabel'

const OutlinedTextfieldLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(commonStyle, outlinedLabel, className)}
    {...props}
  />
))
OutlinedTextfieldLabel.displayName = 'OutlinedTextfieldLabel'

const FilledTextFieldInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, placeholder = '', ...props }, ref) => {
  return (
    <input
      ref={ref}
      placeholder={placeholder}
      className={cn(
        'peer/input h-14 grow bg-transparent px-2 text-body-lg text-onSurface caret-primary outline-none transition-opacity placeholder:text-onSurfaceVariant/50 focus:outline-0 disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-onSurface/38 group-has-[label]/container:pt-2 group-has-[:focus]/container:placeholder:opacity-100 group-has-[label]/container:placeholder:opacity-0 group-data-[invalid]/container:caret-error',
        className
      )}
      {...props}
    />
  )
})

FilledTextFieldInput.displayName = 'FilledTextFieldInput'

const OutlinedTextFieldInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, placeholder = '', ...props }, ref) => {
  return (
    <input
      ref={ref}
      placeholder={placeholder}
      className={cn(
        'peer/input h-14 grow bg-transparent px-2 text-body-lg text-onSurface caret-primary outline-none transition-opacity placeholder:text-onSurfaceVariant/50 focus:outline-0 disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-onSurface/38 group-has-[label]/container:placeholder:opacity-0 group-has-[label]/container:focus:placeholder:opacity-100 group-data-[invalid]/container:caret-error',
        className
      )}
      {...props}
    />
  )
})

OutlinedTextFieldInput.displayName = 'OutlinedTextFieldInput'

const InputDecoration = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        'peer/icon grid h-full shrink-0 place-items-center pl-1 pr-2 text-onSurfaceVariant/70 peer-first-of-type/input:pl-2 peer-first-of-type/input:pr-1 group-has-[:disabled]/container:text-onSurface/38',
        className
      )}
      {...props}
    />
  )
})

InputDecoration.displayName = 'InputDecoration'

const SupportingText = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn('mt-1 px-4 text-body-sm text-onSurfaceVariant', className)}
      {...props}
    />
  )
})
SupportingText.displayName = 'SupportingText'

const FilledTextField = Object.assign(FilledTextFieldRoot, {
  Label: FilledTextfieldLabel,
  Input: FilledTextFieldInput,
  Decoration: InputDecoration,
  SupportingText,
})

const OutlinedTextField = Object.assign(OutlinedTextFieldRoot, {
  Label: OutlinedTextfieldLabel,
  Input: OutlinedTextFieldInput,
  Decoration: InputDecoration,
  SupportingText,
})

export {
  FilledTextField,
  OutlinedTextField,
  FilledTextFieldRoot,
  OutlinedTextFieldRoot,
  FilledTextfieldLabel,
  OutlinedTextfieldLabel,
  FilledTextFieldInput,
  OutlinedTextFieldInput,
  InputDecoration,
  SupportingText,
}
