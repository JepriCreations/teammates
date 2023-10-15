'use client'

import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'

import { useToast } from '@/hooks/use-toast'
import { IconButton } from '@/components/ui/icon-button'
import { ToastAction } from '@/components/ui/toast'
import { Icons } from '@/components/icons'

export const DevToolbar = () => {
  const { toast } = useToast()
  const { setTheme, resolvedTheme } = useTheme()
  const router = useRouter()

  if (process.env.NODE_ENV === 'production') return null

  const handleRefresh = () => {
    router.refresh()
    toast({
      description: 'The cache in this page has been clean up.',
      severity: 'info',
    })
  }

  return (
    <div className="fixed bottom-0 right-0 z-[53] m-1 flex translate-x-[80%] items-center gap-0.5 rounded-sm bg-onSurface/10 p-1 backdrop-blur-sm transition-transform hover:translate-x-0">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-onSurface/5 p-3 font-mono text-body-sm text-onSurface">
        <div className="block sm:hidden">xs</div>
        <div className="hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">
          sm
        </div>
        <div className="hidden md:block lg:hidden xl:hidden 2xl:hidden">md</div>
        <div className="hidden lg:block xl:hidden 2xl:hidden">lg</div>
        <div className="hidden xl:block 2xl:hidden">xl</div>
        <div className="hidden 2xl:block">2xl</div>
      </div>
      <IconButton
        variant="standard"
        onClick={() =>
          toast({
            title: 'Test toast',
            description:
              'Cupidatat sunt commodo ad. Adipisicing mollit minim quis officia in exercitation ea nisi fugiat quis pariatur exercitation officia.',
            severity: 'success',
            duration: Infinity,
            action: (
              <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
            ),
          })
        }
      >
        <Icons.notification />
      </IconButton>
      <IconButton
        variant="standard"
        onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      >
        <Icons.darkMode className="hidden animate-in zoom-in-50 spin-in-45 dark:block" />
        <Icons.lightMode className="block animate-in zoom-in-50 spin-in-45 dark:hidden" />
      </IconButton>
      <IconButton variant="standard" onClick={handleRefresh}>
        <Icons.refresh />
      </IconButton>
    </div>
  )
}
