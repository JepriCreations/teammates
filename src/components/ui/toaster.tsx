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
          success: <SuccessIcon className="shrink-0 text-successContainer" />,
          error: <ErrorIcon className="shrink-0 text-errorContainer" />,
          info: <InfoIcon className="shrink-0 text-infoContainer" />,
          warning: <WarningIcon className="shrink-0 text-warningContainer" />,
        } as const

        return (
          <Toast key={id} {...props}>
            <div className="flex items-start gap-6">
              {severity && icons[severity]}
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
