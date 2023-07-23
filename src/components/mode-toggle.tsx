'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LaptopIcon, MoonIcon, SunIcon } from '@/components/icons'
import { useDictionary } from '@/components/providers/dictionary-provider'

export function ModeToggle() {
  const { setTheme } = useTheme()
  const { t } = useDictionary('Theme')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-2">
          <MoonIcon className="hidden animate-in zoom-in-50 spin-in-45 dark:block" />
          <SunIcon className="block animate-in zoom-in-50 spin-in-45 dark:hidden" />
          <span className="sr-only">{t('toggle_theme')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          <SunIcon className="mr-3 h-5 w-5" />
          <span className="leading-none">{t('light')}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <MoonIcon className="mr-3 h-5 w-5" />
          <span className="leading-none">{t('dark')}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          <LaptopIcon className="mr-3 h-5 w-5" />
          <span className="leading-none">{t('system')}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
