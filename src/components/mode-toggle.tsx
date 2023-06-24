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
import { useDictionary } from '@/components/providers/dictionary-provider'

import { LaptopIcon, MoonIcon, SunIcon } from './icons'

export function ModeToggle() {
  const { setTheme, resolvedTheme: theme } = useTheme()
  const { dict } = useDictionary('Theme')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-2">
          {theme === 'dark' ? (
            <MoonIcon className="animate-in zoom-in-50 spin-in-45" />
          ) : (
            <SunIcon className="animate-in zoom-in-50 spin-in-45" />
          )}
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
