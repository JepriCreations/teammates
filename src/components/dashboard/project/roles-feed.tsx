'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  ExperienceLevel,
  Role,
  RoleStatus,
  WorkMode,
} from '@/types/collections'
import { formatDate } from '@/lib/utils'
import { roleSchema } from '@/lib/validations/role'
import { useRoles } from '@/hooks/useRoles'
import { useToast } from '@/hooks/useToast'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import { RoleInputs } from '@/components/forms/role-inputs'
import { ArchiveIcon, LoadingIcon } from '@/components/icons'
import { useDictionary } from '@/components/providers/dictionary-provider'

const defaultValues = {
  name: undefined,
  exp_level: ExperienceLevel.Intermediate,
  work_mode: WorkMode.Remote,
  description: '',
  rewards: [],
}

const getStaus = (input: boolean) => {
  return input === true ? RoleStatus.Open : RoleStatus.Closed
}

interface RolesFeed {
  projectId: string
  data: Role[]
}

export const RolesFeed = ({ projectId, data }: RolesFeed) => {
  const { toast } = useToast()
  const router = useRouter()
  const { t } = useDictionary()
  const [open, setOpen] = useState(false)
  const [roles, setRoles] = useState(data)
  const { addRoles, updateRoleStatus, isPending } = useRoles()
  const [updating, setUpdating] = useState<string | null>(null)

  useEffect(() => {
    setRoles(data)
  }, [data])

  const form = useForm<z.infer<typeof roleSchema>>({
    resolver: zodResolver(roleSchema),
    defaultValues,
  })

  const onSubmit = async (values: z.infer<typeof roleSchema>) => {
    if (projectId) {
      const { error } = await addRoles([values], projectId)
      if (error) {
        return toast({
          title: 'Error',
          description: error.message,
          severity: 'error',
        })
      }
      setOpen(false)
    }
    router.refresh()
  }

  const onArchive = async (role_id: string) => {
    setUpdating(role_id)
    const { error } = await updateRoleStatus({
      role_id,
      status: RoleStatus.Archived,
    })
    if (error) {
      setUpdating(null)
      return toast({
        title: 'Error',
        description: error.message,
        severity: 'error',
      })
    }
    router.refresh()
  }

  const updateStatus = (index: number, newStatus: RoleStatus) => {
    setRoles((prev) => {
      const prevArray = prev.slice(0)
      prevArray.splice(index, 1, { ...prev[index], status: newStatus })
      return prevArray
    })
  }

  const onStatusChange = async (value: boolean, role_id: string) => {
    const index = roles.findIndex((role) => role.id === role_id)
    const status = getStaus(value)
    updateStatus(index, status)

    const { error } = await updateRoleStatus({
      role_id,
      status,
    })

    if (error) {
      updateStatus(index, getStaus(!value))
      return toast({
        title: 'Error',
        description: error.message,
        severity: 'error',
      })
    }

    router.refresh()
  }

  const handleDialogState = (value: boolean) => {
    setOpen(value)
    form.reset()
  }

  return (
    <>
      <section className="mb-4 flex justify-end gap-3">
        <Dialog open={open} onOpenChange={handleDialogState}>
          <DialogTrigger asChild>
            <Button className="min-w-[120px]">{t('Roles.new_role')}</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-3xl">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-3"
              >
                <DialogHeader>
                  <DialogTitle>{t('Roles.new_role')}</DialogTitle>
                  <DialogDescription>
                    {t('Roles.new_role_description')}
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-3">
                  <RoleInputs disabled={isPending} form={form} />
                  <DialogFooter>
                    <Button variant="accent" disabled={isPending} type="submit">
                      {isPending
                        ? t('General.saving') + '...'
                        : t('General.save')}
                    </Button>
                  </DialogFooter>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </section>
      <section className="grid grid-cols-1 gap-3">
        {roles.map(
          ({
            id,
            name,
            description,
            exp_level,
            work_mode,
            rewards,
            status,
            created_at,
          }) => {
            return (
              <div key={id} className="flex transition-all">
                <button
                  onClick={() => onArchive(id)}
                  className="group peer relative h-[100px] min-w-[24px] shrink-0 basis-[24px] overflow-hidden bg-tertiary transition-all duration-300 hover:basis-[80px]"
                >
                  <div className="absolute inset-y-0 left-0 flex w-full">
                    <div className="mx-auto flex h-full translate-x-[100%] scale-90 items-center justify-center transition-all duration-300 group-hover:translate-x-0 group-hover:scale-100">
                      <div className="flex flex-col items-center justify-center p-2 text-onTertiary">
                        {updating === id ? (
                          <LoadingIcon className="animate-spin" />
                        ) : (
                          <ArchiveIcon />
                        )}
                        <p className="text-sm">Archive</p>
                      </div>
                    </div>
                  </div>
                </button>

                <Card className="overflow-hidden px-6 py-4">
                  <div className="relative mb-3">
                    <p className="text-xl font-medium">{t(`Roles.${name}`)}</p>
                    <div className="absolute right-0 top-0">
                      <div className="flex items-center gap-3 animate-in zoom-in-0">
                        <label>{t(`Roles.Status.${status}`)}</label>
                        <Switch
                          onCheckedChange={(value) => onStatusChange(value, id)}
                          checked={status === RoleStatus.Open}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-3 flex gap-3">
                    <div className="bg-[#edd6f9] px-3 py-1 text-[#482f55] dark:bg-[#5e5265] dark:text-[#edd6f9]">
                      {t(`Roles.Levels.${exp_level}`)}
                    </div>
                    <div className="bg-[#DCE9D9] px-3 py-1 text-[#39534b] dark:bg-[#4c534a] dark:text-[#DCE9D9]">
                      {t(`Roles.Workmode.${work_mode}`)}
                    </div>
                    <div className="bg-[#F7C9BB] px-3 py-1 text-[#673c31] dark:bg-[#5d5250] dark:text-[#F7C9BB]">
                      {rewards
                        .map((rew) => t(`Roles.Rewards.${rew}`))
                        .join(', ')}
                    </div>
                  </div>

                  <p className="mb-6 flex">{description}</p>
                  <div className="flex justify-between">
                    <a href="#" className="hover:underline">
                      10 Applications
                    </a>
                    <p className="text-outline">{formatDate(created_at)}</p>
                  </div>
                </Card>
              </div>
            )
          }
        )}
      </section>
    </>
  )
}
