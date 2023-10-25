'use client'

import { useState } from 'react'

import { DEBUG } from '@/lib/utils'
import { useApplication } from '@/hooks/use-applications'
import { useToast } from '@/hooks/use-toast'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { IconButton } from '@/components/ui/icon-button'
import { Icons } from '@/components/icons'
import { useDictionary } from '@/components/providers/dictionary-provider'

interface ApplicationDropdownMenuProps {
  userId: string
  roleId: string
}

export const ApplicationDropdownMenu = ({
  userId,
  roleId,
}: ApplicationDropdownMenuProps) => {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const { t } = useDictionary()
  const { remove, isPending } = useApplication()

  const handleRemove = async (e: React.MouseEvent) => {
    e.preventDefault()
    const { error } = await remove({ user_id: userId, role_id: roleId })

    if (error) {
      if (DEBUG) {
        console.log({ error })
      }
      toast({
        title: 'Error',
        description: t('Applications.Errors.removing'),
        severity: 'error',
      })
    }

    setOpen(false)
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger asChild>
        <IconButton variant="standard">
          <Icons.more />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content>
          <DropdownMenu.MenuItem
            disabled={isPending}
            onClick={handleRemove}
            className="focus:bg-error/5 active:bg-error/10"
          >
            {isPending ? (
              <Icons.spinner className="mr-4 h-5 w-5 animate-spin" />
            ) : (
              <Icons.trash className="mr-4 h-5 w-5 !text-error" />
            )}
            <span className={`leading-none ${!isPending ? 'text-error' : ''}`}>
              {t('Applications.delete')}
            </span>
          </DropdownMenu.MenuItem>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu>
  )
}
