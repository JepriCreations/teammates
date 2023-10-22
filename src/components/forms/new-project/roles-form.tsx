'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/constants/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { ExperienceLevel, WorkMode } from '@/types/collections'
import { roleSchema } from '@/lib/validations/role'
import { useRoles } from '@/hooks/use-roles'
import { useToast } from '@/hooks/use-toast'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { IconButton } from '@/components/ui/icon-button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { RoleInputs } from '@/components/forms/role-inputs'
import { Icons } from '@/components/icons'
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
  const { projectId, categories } = useNewProjectFormState()
  const [error, setError] = useState(null)
  const { isPending, addRoles } = useRoles()
  const [roles, setRoles] = useState<z.infer<typeof roleSchema>[]>([])
  const router = useRouter()

  const form = useForm<z.infer<typeof roleSchema>>({
    resolver: zodResolver(roleSchema),
  })

  const onSubmitRole = (values: z.infer<typeof roleSchema>) => {
    setRoles((prev) => [...prev, values])
    form.reset(defaultValues)
  }

  const onSubmit = async () => {
    if (projectId) {
      const { error } = await addRoles(projectId, roles)

      if (error) {
        return setError(error?.message ?? t('Roles.errors.saving'))
      }

      toast({
        title: t('General.success'),
        description: t('Roles.the_roles_has_been_added'),
        severity: 'success',
      })
      router.replace(ROUTES.PROJECTS)
    }
  }

  const onOmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    router.replace(ROUTES.PROJECTS)
  }

  return (
    <>
      <section className="relative overflow-hidden border-b border-outline/38 p-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitRole)}
            className="grid gap-3"
          >
            <RoleInputs form={form} categories={categories} />
            <footer>
              <Button
                variant="outlined"
                type="submit"
                className="ml-auto block"
                disabled={isPending}
                icon={<Icons.add />}
              >
                {t('Roles.add_role')}
              </Button>
            </footer>
          </form>
        </Form>
      </section>
      <section className="relative overflow-hidden border-b border-outline/38 p-6">
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
                <TableCell className="w-[25%] font-medium">
                  {t(`Roles.${name}`)}
                </TableCell>
                <TableCell>{t(`Roles.Levels.${exp_level}`)}</TableCell>
                <TableCell>{t(`Roles.Workmode.${work_mode}`)}</TableCell>
                <TableCell className="text-right">
                  {rewards
                    .map((reward) => t(`Roles.Rewards.${reward}`))
                    .join(', ')}
                </TableCell>
                <TableCell className="w-fit">
                  <IconButton
                    onClick={() =>
                      setRoles((prev) => {
                        const rolesList = [...prev]
                        rolesList.splice(index, 1)
                        return rolesList
                      })
                    }
                    variant="standard"
                  >
                    <Icons.trash />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      {error && (
        <section className="p-3">
          <Alert variant="error">
            <Alert.Title>{t('General.ups')}</Alert.Title>
            <Alert.Description>{error}</Alert.Description>
          </Alert>
        </section>
      )}

      <section className="flex justify-end gap-6 p-6">
        <Button onClick={onOmit} variant="text" disabled={isPending}>
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
