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
        const severityAccent = {
          success: 'bg-success',
          error: 'bg-error',
          info: 'bg-info',
          warning: 'bg-warning',
        } as const

        return (
          <Toast key={id} {...props}>
            <div className="flex items-start gap-6">
              {severity && (
                <span
                  className={cn(
                    'absolute inset-y-0 left-0 w-1',
                    severityAccent[severity]
                  )}
                />
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
