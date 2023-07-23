'use client'

import { cn } from '@/lib/utils'
import { useToast } from '@/hooks/useToast'
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast'
import {
  ErrorIcon,
  InfoIcon,
  SuccessIcon,
  WarningIcon,
} from '@/components/icons'

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        severity,
        ...props
      }) {
        const icons = {
          success: {
            icon: <SuccessIcon />,
            colors: 'bg-success text-success-foreground',
          },
          error: {
            icon: <ErrorIcon />,
            colors: 'bg-error text-error-foreground',
          },
          info: {
            icon: <InfoIcon />,
            colors: 'bg-info text-info-foreground',
          },
          warning: {
            icon: <WarningIcon />,
            colors: 'bg-warning text-warning-foreground',
          },
        } as const

        return (
          <Toast key={id} {...props}>
            <div className="flex items-start gap-6">
              {severity && (
                <div
                  className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
                    icons[severity].colors
                  )}
                >
                  {icons[severity].icon}
                </div>
              )}
              <div className="grid grow gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
