'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { routes } from '@/constants/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { ExperienceLevel, WorkMode } from '@/types/collections'
import { roleSquema } from '@/lib/validations/project'
import { useRoles } from '@/hooks/useRoles'
import { useToast } from '@/hooks/useToast'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { RoleInputs } from '@/components/forms/role-inputs'
import { AddIcon, TrashIcon } from '@/components/icons'
import { useDictionary } from '@/components/providers/dictionary-provider'
import { useNewProjectFormState } from '@/components/providers/new-project-form-provider'

const defaultValues = {
  name: undefined,
  exp_level: ExperienceLevel.Intermediate,
  work_mode: WorkMode.Remote,
  description: '',
  rewards: [],
}

export const RolesForm = () => {
  const { toast } = useToast()
  const { t } = useDictionary()
  const { projectId } = useNewProjectFormState()
  const [error, setError] = useState(null)
  const { isPending, addRoles } = useRoles()
  const [roles, setRoles] = useState<z.infer<typeof roleSquema>[]>([])
  const router = useRouter()

  const form = useForm<z.infer<typeof roleSquema>>({
    resolver: zodResolver(roleSquema),
    defaultValues,
  })

  const onSubmitRole = (values: z.infer<typeof roleSquema>) => {
    setRoles((prev) => [...prev, values])
    form.reset(defaultValues)
  }

  const onSubmit = async () => {
    if (projectId) {
      const { error } = await addRoles(roles, projectId)
      if (error) {
        setError(error?.message ?? t('Roles.errors.saving'))
      }
      toast({
        title: t('General.success'),
        description: t('Roles.the_roles_has_been_added'),
        severity: 'success',
      })
      router.replace(routes.PROJECTS)
    }
  }

  const onOmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    router.replace(routes.PROJECTS)
  }

  return (
    <>
      <section className="relative overflow-hidden border-b border-muted p-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitRole)}
            className="grid gap-3"
          >
            <RoleInputs form={form} />
            <footer>
              <Button
                variant="accent"
                type="submit"
                className="ml-auto"
                icon={<AddIcon />}
              >
                {t('Roles.add_role')}
              </Button>
            </footer>
          </form>
        </Form>
      </section>
      <section className="relative overflow-hidden border-b border-muted p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[30%]">{t('Roles.role')}</TableHead>
              <TableHead>{t('Roles.experience_level')}</TableHead>
              <TableHead>{t('Roles.work_mode')}</TableHead>
              <TableHead className="text-right">{t('Roles.rewards')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.length === 0 && (
              <TableRow>
                <TableCell className="w-[30%] font-medium">
                  {t('Roles.no_roles_created')}
                </TableCell>
              </TableRow>
            )}
            {roles.map(({ name, exp_level, work_mode, rewards }, index) => (
              <TableRow key={`role-${name}-${index}`}>
                <TableCell className="w-[25%] font-medium">{t(name)}</TableCell>
                <TableCell>{t(`Roles.Levels.${exp_level}`)}</TableCell>
                <TableCell>{t(`Roles.Workmode.${work_mode}`)}</TableCell>
                <TableCell className="text-right">
                  {rewards
                    .map((reward) => t(`Roles.Rewards.${reward}`))
                    .join(', ')}
                </TableCell>
                <TableCell className="w-fit">
                  <Button
                    onClick={() =>
                      setRoles((prev) => {
                        const rolesList = [...prev]
                        rolesList.splice(index, 1)
                        return rolesList
                      })
                    }
                    icon={<TrashIcon />}
                    variant="ghost"
                    className="p-2"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      {error && (
        <section className="p-3">
          <Alert variant="error">
            <AlertTitle>{t('General.ups')}</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </section>
      )}

      <section className="flex justify-end gap-6 p-6">
        <Button onClick={onOmit} variant="ghost" disabled={isPending}>
          {t('Roles.omit')}
        </Button>
        <Button
          onClick={onSubmit}
          loading={isPending}
          disabled={!Boolean(roles.length)}
        >
          {isPending ? `${t('General.saving')}...` : t('Roles.save_roles')}
        </Button>
      </section>
    </>
  )
}
