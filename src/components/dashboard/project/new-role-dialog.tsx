'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { ExperienceLevel, WorkMode } from '@/types/collections'
import { roleSchema } from '@/lib/validations/role'
import { useRoles } from '@/hooks/use-roles'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { Fab } from '@/components/ui/fab'
import { Form } from '@/components/ui/form'
import { RoleInputs } from '@/components/forms/role-inputs'
import { Icons } from '@/components/icons'
import { useDictionary } from '@/components/providers/dictionary-provider'

const defaultValues = {
  name: undefined,
  exp_level: ExperienceLevel.Intermediate,
  work_mode: WorkMode.Remote,
  description: '',
  rewards: [],
}

interface NewRoleDialogProps {
  projectId: string
  categories: string[]
}

export const NewRoleDialog = ({
  projectId,
  categories,
}: NewRoleDialogProps) => {
  const { toast } = useToast()
  const { t } = useDictionary()
  const [open, setOpen] = useState(false)
  const { create, isPending } = useRoles()

  const form = useForm<z.infer<typeof roleSchema>>({
    resolver: zodResolver(roleSchema),
    defaultValues,
  })

  const onSubmit = async (values: z.infer<typeof roleSchema>) => {
    if (projectId) {
      const { error } = await create(projectId, [values])
      if (error) {
        return toast({
          title: 'Error',
          description: error.message,
          severity: 'error',
        })
      }
      setOpen(false)
    }
  }

  const handleDialogState = (value: boolean) => {
    setOpen(value)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogState}>
      <Dialog.Trigger asChild>
        <Fab className="min-w-[120px]">
          <Fab.Icon>
            <Icons.add />
          </Fab.Icon>
          <Fab.Label>{t('Roles.new_role')}</Fab.Label>
        </Fab>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>{t('Roles.new_role')}</Dialog.Title>
          <Dialog.Description>
            {t('Roles.new_role_description')}
          </Dialog.Description>
        </Dialog.Header>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3">
            <div className="mt-3">
              <RoleInputs
                disabled={isPending}
                form={form}
                categories={categories}
              />
            </div>
            <Dialog.Footer>
              <Button
                disabled={isPending}
                type="submit"
                className="w-full sm:w-fit"
              >
                {isPending ? t('General.saving') + '...' : t('General.save')}
              </Button>
            </Dialog.Footer>
          </form>
        </Form>
      </Dialog.Content>
    </Dialog>
  )
}
