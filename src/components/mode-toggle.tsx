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
  const { dict } = useDictionary('Theme')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-2">
          <MoonIcon className="hidden animate-in zoom-in-50 spin-in-45 dark:block" />
          <SunIcon className="block animate-in zoom-in-50 spin-in-45 dark:hidden" />
          <span className="sr-only">{dict.toggle_theme}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          <SunIcon className="mr-2 h-4 w-4" />
          <span className="leading-none">{dict.light}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <MoonIcon className="mr-2 h-4 w-4" />
          <span className="leading-none">{dict.dark}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          <LaptopIcon className="mr-2 h-4 w-4" />
          <span className="leading-none">{dict.system}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
