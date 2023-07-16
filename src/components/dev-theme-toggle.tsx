'use client'

import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import { MoonIcon, SunIcon } from '@/components/icons'

export const DevThemeTogle = () => {
  const { setTheme, resolvedTheme } = useTheme()

  if (process.env.NODE_ENV === 'production') return null

  return (
    <div className="fixed bottom-1 right-1">
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
