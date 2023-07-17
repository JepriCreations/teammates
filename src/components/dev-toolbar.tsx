'use client'

import { useTheme } from 'next-themes'

import { useToast } from '@/hooks/useToast'
import { Button } from '@/components/ui/button'
import { BellExclamationIcon, MoonIcon, SunIcon } from '@/components/icons'

export const DevToolbar = () => {
  const { toast } = useToast()
  const { setTheme, resolvedTheme } = useTheme()

  if (process.env.NODE_ENV === 'production') return null

  return (
    <div className="fixed bottom-1 right-1 z-50 flex items-center gap-3">
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 p-3 font-mono text-xs text-white">
        <div className="block sm:hidden">xs</div>
        <div className="hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">
          sm
        </div>
        <div className="hidden md:block lg:hidden xl:hidden 2xl:hidden">md</div>
        <div className="hidden lg:block xl:hidden 2xl:hidden">lg</div>
        <div className="hidden xl:block 2xl:hidden">xl</div>
        <div className="hidden 2xl:block">2xl</div>
      </div>
      <Button
        variant="ghost"
        className="p-2"
        onClick={() =>
          toast({
            title: 'Test toast',
            description:
              'Cupidatat sunt commodo ad. Adipisicing mollit minim quis officia in exercitation ea nisi fugiat quis pariatur exercitation officia.',
            severity: 'info',
          })
        }
      >
        <BellExclamationIcon />
      </Button>
      <Button
        variant="ghost"
        className="p-2"
        onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      >
        <MoonIcon className="hidden animate-in zoom-in-50 spin-in-45 dark:block" />
        <SunIcon className="block animate-in zoom-in-50 spin-in-45 dark:hidden" />
      </Button>
    </div>
  )
}
