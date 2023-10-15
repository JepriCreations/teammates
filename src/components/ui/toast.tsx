import * as React from 'react'
import * as ToastPrimitives from '@radix-ui/react-toast'
import { cva, VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { IconButton } from '@/components/ui/icon-button'
import { Icons } from '@/components/icons'

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      'fixed bottom-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:flex-col sm:gap-3 md:bottom-[inherit] md:right-0 md:top-0 md:max-w-[420px]',
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  'bg-inverseSurface text-inverseOnSurface data-[swipe=move]:transition-none rounded-xs group relative pointer-events-auto flex w-full items-stretch justify-between gap-2 overflow-hidden p-2 shadow-lg transition-all data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=open]:slide-in-from-bottom-full data-[state=open]:md:slide-in-from-right-full data-[state=open]:md:slide-in-from-bottom-0 data-[state=closed]:slide-out-to-bottom data-[state=closed]:md:slide-out-to-right-full data-[state=closed]:md:slide-out-to-bottom-0 data-[swipe=end]:slide-out-to-right-full data-[swipe=end]:slide-out-to-bottom-0 before:inset-y-0 before:w-1 before:left-0 before:m-2 before:rounded-full',
  {
    variants: {
      severity: {
        default: 'before:hidden',
        success: 'pl-6 before:absolute before:bg-successContainer',
        error: 'pl-6 before:absolute before:bg-errorContainer',
        info: 'pl-6 before:absolute before:bg-infoContainer',
        warning: 'pl-6 before:absolute before:bg-warningContainer',
      },
    },
    defaultVariants: {
      severity: 'default',
    },
  }
)

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, severity, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ severity }), className)}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <Button
    variant="text"
    size="small"
    asChild
    className="flex-shrink-0 text-inversePrimary"
  >
    <ToastPrimitives.Action
      ref={ref}
      className={cn('', className)}
      {...props}
    />
  </Button>
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <IconButton
    asChild
    variant="standard"
    size="small"
    className={cn(
      'text-inverseOnSurface hover:bg-inverseOnSurface/10',
      className
    )}
  >
    <ToastPrimitives.Close ref={ref} toast-close="" {...props}>
      <Icons.close size="18" />
    </ToastPrimitives.Close>
  </IconButton>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn('text-sm font-semibold', className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn('text-sm opacity-90', className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}
