'use client'

import { useTheme } from 'next-themes'

import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { IconButton } from '@/components/ui/icon-button'
import { Icons } from '@/components/icons'
import { useDictionary } from '@/components/providers/dictionary-provider'

export function ModeToggle({
  side = 'bottom',
}: {
  side?: 'top' | 'right' | 'bottom' | 'left'
}) {
  const { setTheme } = useTheme()
  const { t } = useDictionary('Theme')

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <IconButton variant="standard">
          <Icons.darkMode className="hidden animate-in zoom-in-50 spin-in-45 dark:block" />
          <Icons.lightMode className="block animate-in zoom-in-50 spin-in-45 dark:hidden" />
          <span className="sr-only">{t('toggle_theme')}</span>
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end" side={side}>
        <DropdownMenu.MenuItem onClick={() => setTheme('light')}>
          <Icons.lightMode className="mr-4 h-5 w-5 text-onSurfaceVariant" />
          <span className="leading-none">{t('light')}</span>
        </DropdownMenu.MenuItem>
        <DropdownMenu.MenuItem onClick={() => setTheme('dark')}>
          <Icons.darkMode className="mr-4 h-5 w-5 text-onSurfaceVariant" />
          <span className="leading-none">{t('dark')}</span>
        </DropdownMenu.MenuItem>
        <DropdownMenu.MenuItem onClick={() => setTheme('system')}>
          <Icons.systemMode className="mr-4 h-5 w-5 text-onSurfaceVariant" />
          <span className="leading-none">{t('system')}</span>
        </DropdownMenu.MenuItem>
      </DropdownMenu.Content>
    </DropdownMenu>
  )
}
