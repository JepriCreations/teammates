'use client'

import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cva, VariantProps } from 'class-variance-authority'
import {
  useDropzone,
  type Accept,
  type DropzoneProps as PrimitiveDropzoneProps,
} from 'react-dropzone'

import { createSafeContext } from '@/lib/createSafeContext'
import { cn, createComponentWithStatics } from '@/lib/utils'
import { Label } from '@/components/ui/label'

/**
 * Based on Mantine dropzone
 * https://github.com/mantinedev/mantine/blob/master/src/mantine-dropzone/src/mime-types.ts
 */
export const MIME_TYPES = {
  // Images
  png: 'image/png',
  gif: 'image/gif',
  jpeg: 'image/jpeg',
  svg: 'image/svg+xml',
  webp: 'image/webp',
  avif: 'image/avif',

  // Documents
  mp4: 'video/mp4',
  zip: 'application/zip',
  csv: 'text/csv',
  pdf: 'application/pdf',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ppt: 'application/vnd.ms-powerpoint',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  exe: 'application/vnd.microsoft.portable-executable',
}

export const IMAGE_MIME_TYPE = [
  MIME_TYPES.png,
  MIME_TYPES.gif,
  MIME_TYPES.jpeg,
  MIME_TYPES.svg,
  MIME_TYPES.webp,
  MIME_TYPES.avif,
]

export const PDF_MIME_TYPE = [MIME_TYPES.pdf]
export const MS_WORD_MIME_TYPE = [MIME_TYPES.doc, MIME_TYPES.docx]
export const MS_EXCEL_MIME_TYPE = [MIME_TYPES.xls, MIME_TYPES.xlsx]
export const MS_POWERPOINT_MIME_TYPE = [MIME_TYPES.ppt, MIME_TYPES.pptx]
export const EXE_MIME_TYPE = [MIME_TYPES.exe]

type DropzoneContextValue = {
  loading: boolean
  idle: boolean
  accepted: boolean
  rejected: boolean
}

const [DropZoneProvider, useDropzoneState] = createSafeContext<
  DropzoneContextValue & { id: string }
>({ name: 'DropzoneContext' })

export interface DropzoneProps
  extends Omit<PrimitiveDropzoneProps, 'children' | 'accept'>,
    VariantProps<typeof dropzoneVariants> {
  className?: string
  loading?: boolean
  name?: string
  children?: React.ReactNode | ((state: DropzoneContextValue) => JSX.Element)
  accept?: Accept | string[]

  /** Get open function as ref. Useful for open the files dialog from an external button */
  openRef?: React.ForwardedRef<() => void | undefined>
}

const dropzoneVariants = cva(
  'group relative cursor-pointer overflow-hidden rounded-sm p-4 outline-none transition-all active:scale-[0.98] peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
  {
    variants: {
      variant: {
        filled:
          'bg-surfaceContainer data-[accepted=true]:bg-primary/12 data-[rejected=true]:bg-error/12',
        outlined:
          'outline-[1px] outline-offset-0 outline-outline data-[accepted=true]:outline-2 data-[rejected=true]:outline-2 data-[accepted=true]:outline-primary data-[rejected=true]:outline-error',
      },
    },
    defaultVariants: {
      variant: 'filled',
    },
  }
)

const DropzoneLoading = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const { loading } = useDropzoneState()
  if (!loading) return null
  return <div ref={ref} {...props} />
})
DropzoneLoading.displayName = 'DropzoneLoading'

const DropzoneIdle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { idle } = useDropzoneState()
  if (!idle) return null
  return (
    <div
      ref={ref}
      className={cn('animate-in zoom-in-50', className)}
      {...props}
    />
  )
})
DropzoneIdle.displayName = 'DropzoneIdle'

const DropzoneAccept = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { accepted } = useDropzoneState()
  if (!accepted) return null
  return (
    <div
      ref={ref}
      className={cn('text-onPrimaryContainer animate-in zoom-in-50', className)}
      {...props}
    />
  )
})
DropzoneAccept.displayName = 'DropzoneAccept'

const DropzoneReject = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { rejected } = useDropzoneState()
  if (!rejected) return null
  return (
    <div
      ref={ref}
      className={cn('text-onErrorContainer animate-in zoom-in-50', className)}
      {...props}
    />
  )
})
DropzoneReject.displayName = 'DropzoneReject'

const DropzoneContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { accepted, rejected } = useDropzoneState()

  return (
    <div
      ref={ref}
      className={cn(
        'relative z-10 text-onSurface',
        accepted && 'text-onPrimaryContainer',
        rejected && 'text-onErrorContainer',
        className
      )}
      {...props}
    />
  )
})
DropzoneContent.displayName = 'DropzoneContent'

const DropzonePreview = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { accepted, rejected } = useDropzoneState()

  return (
    <div
      ref={ref}
      className={cn(
        'relative mr-2 grid aspect-square h-20 shrink-0 place-items-center overflow-hidden rounded-xs border border-outline/12 bg-surface text-onSurfaceVariant transition',
        accepted && 'bg-primary/12 text-onPrimaryContainer',
        rejected && 'bg-error/12 text-onErrorContainer',
        className
      )}
      {...props}
    />
  )
})
DropzonePreview.displayName = 'DropzonePreview'

const DropzoneLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { accepted, rejected, id } = useDropzoneState()

  return (
    <Label
      ref={ref}
      className={cn(
        'mb-3 text-label-md text-onSurfaceVariant',
        accepted && 'text-primary',
        rejected && 'text-error',
        className
      )}
      htmlFor={id}
      {...props}
    />
  )
})
DropzoneLabel.displayName = 'DropzoneLabel'

export const defaultProps: Partial<DropzoneProps> = {
  loading: false,
  multiple: false,
  /** Maximum file size (in bytes)*/
  maxSize: Infinity,
  autoFocus: false,
  noClick: false,
  noDrag: false,
  noDragEventsBubbling: false,
  noKeyboard: false,
  useFsAccessApi: true,
}

const DropzoneRoot = React.forwardRef<HTMLInputElement, DropzoneProps>(
  (
    {
      accept,
      children,
      className,
      disabled,
      loading = false,
      name,
      variant,
      openRef,
      ...props
    },
    ref
  ) => {
    const randomId = React.useId()
    const id = name ?? randomId
    const isDisabled = disabled || loading

    const { getRootProps, getInputProps, isDragAccept, isDragReject, open } =
      useDropzone({
        disabled: isDisabled,
        accept: Array.isArray(accept)
          ? accept.reduce((r, key) => ({ ...r, [key]: [] }), {})
          : accept,
        ...defaultProps,
        ...props,
      })

    if (
      typeof openRef === 'object' &&
      openRef !== null &&
      'current' in openRef
    ) {
      openRef.current = open
    }

    const isIdle = !isDragAccept && !isDragReject
    const dropzoneState = {
      loading,
      accepted: isDragAccept,
      rejected: isDragReject,
      idle: isIdle,
    }

    return (
      <DropZoneProvider value={{ id, ...dropzoneState }}>
        <input
          ref={ref}
          {...getInputProps()}
          id={id}
          name={name}
          className="peer"
          disabled={isDisabled}
        />
        <div
          {...getRootProps()}
          data-accepted={dropzoneState.accepted}
          data-rejected={dropzoneState.rejected}
          data-idle={dropzoneState.idle}
          data-loading={dropzoneState.loading}
          className={cn(dropzoneVariants({ variant, className }))}
        >
          {typeof children === 'function' ? children(dropzoneState) : children}
          {isIdle && !isDisabled && (
            <span
              className={cn(
                'absolute inset-0 z-0 bg-onSurface opacity-0 transition-opacity group-hover:opacity-4 group-active:opacity-8'
              )}
            />
          )}
        </div>
      </DropZoneProvider>
    )
  }
)
DropzoneRoot.displayName = 'Dropzone'

const Dropzone = Object.assign(DropzoneRoot, {
  Loading: DropzoneLoading,
  Idle: DropzoneIdle,
  Accept: DropzoneAccept,
  Reject: DropzoneReject,
  Content: DropzoneContent,
  Preview: DropzonePreview,
  Label: DropzoneLabel,
})

export { Dropzone }
