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
  BellExclamationIcon,
  CheckIcon,
  CloseIcon,
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
            icon: <CheckIcon size={20} />,
            colors: 'bg-green-500/20 text-green-500 dark:text-green-300',
          },
          error: {
            icon: <CloseIcon size={20} />,
            colors: 'bg-red-500/20 text-red-500 dark:text-red-300',
          },
          info: {
            icon: <BellExclamationIcon size={20} />,
            colors: 'bg-blue-500/20 text-blue-500 dark:text-blue-300',
          },
          warning: {
            icon: <WarningIcon size={20} />,
            colors: 'bg-amber-500/20 text-amber-500 dark:text-amber-300',
          },
        } as const

        return (
          <Toast key={id} {...props}>
            <div className="flex items-start gap-6">
              {severity && (
                <div
                  className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center',
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
