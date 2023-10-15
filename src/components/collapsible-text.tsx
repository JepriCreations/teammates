'use client'

import * as React from 'react'

import { Collapsible } from '@/components/ui/collapsible'

import { useDictionary } from './providers/dictionary-provider'

export const CollapsibleText = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { t } = useDictionary()
  const [open, setOpen] = React.useState(false)

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="group">
      <div
        className={`overflow-hidden text-ellipsis transition-all ${
          open ? 'line-clamp-none' : 'line-clamp-2'
        }`}
      >
        {children}
      </div>
      <Collapsible.Trigger className="ml-auto mt-2 block text-label-lg italic text-primary transition-opacity hover:opacity-70">
        {open ? t('General.show_less') : t('General.show_more')}
      </Collapsible.Trigger>
    </Collapsible>
  )
}
