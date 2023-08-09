'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ERROR_CODES } from '@/constants/errors'
import { routes } from '@/constants/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Project } from '@/types/collections'
import { cn } from '@/lib/utils'
import {
  createProjectSquema,
  projectSquema,
  socials,
  updateProjectSquema,
} from '@/lib/validations/project'
import { useProjects } from '@/hooks/useProjects'
import { useToast } from '@/hooks/useToast'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { ProjectInputs } from '@/components/forms/project-inputs'
import { useDictionary } from '@/components/providers/dictionary-provider'
import { useNewProjectFormState } from '@/components/providers/new-project-form-provider'

const defaultSocialLinks = socials.map((s) => ({
  name: s.name,
  link: '',
}))

type ProjectSchemaType =
  | z.infer<typeof createProjectSquema>
  | z.infer<typeof updateProjectSquema>

interface ProjectForm {
  action: 'update' | 'create'
  defaultValues?: z.infer<typeof projectSquema>
  projectData?: Partial<Project>
  children?: React.ReactNode
}

export const ProjectForm = ({
  action,
  defaultValues,
  projectData,
  children,
}: ProjectForm) => {
  const { t } = useDictionary()
  const { toast } = useToast()
  const { onNext } = useNewProjectFormState()
  const router = useRouter()
  const { isPending, create, update } = useProjects()
  const [error, setError] = useState(null)
  const isUpdating = action === 'update'

  const form = useForm<z.infer<typeof createProjectSquema>>({
    resolver: zodResolver(
      isUpdating ? updateProjectSquema : createProjectSquema
    ),
    defaultValues: defaultValues ?? {
      name: '',
      summary: '',
      categories: [],
      description: '',
      file: undefined,
      location: {
        country: '',
        city: '',
      },
      links: defaultSocialLinks,
    },
  })

  // Whatch when the icon changes to show the preview in the thumbnail
  form.watch('file')

  const onSubmit = async (values: ProjectSchemaType) => {
    if (isUpdating) return onUpdate(values)

    const validation = createProjectSquema.safeParse(values)
    if (validation.success) {
      return onCreate(validation.data)
    }
  }

  const onCreate = async (values: z.infer<typeof createProjectSquema>) => {
    const { error, data } = await create(values)

    if (error || !data) {
      if (error.code === ERROR_CODES.DUPLICATE_NAME) {
        form.setError(
          'name',
          {
            type: 'custom',
            message: t('Projects.errors.duplicate_name'),
          },
          { shouldFocus: true }
        )
      } else {
        setError(error?.message ?? t('Projects.errors.saving'))
      }
      return
    }

    toast({
      title: t('General.success'),
      description: t('Projects.success_create'),
      severity: 'success',
    })

    onNext(data.id)
  }

  const onUpdate = async (values: z.infer<typeof updateProjectSquema>) => {
    if (!projectData?.id) return

    const { data } = await update({ id: projectData.id, ...values })

    if (data?.success) {
      return toast({
        title: t('General.success'),
        description: t('Projects.success_update'),
        severity: 'success',
      })
    }

    return toast({
      title: t('General.ups'),
      description: t('Projects.errors.updating'),
      severity: 'error',
    })
  }

  const onCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    router.push(routes.PROJECTS)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <ProjectInputs
          form={form}
          icon_url={projectData?.icon_url ?? ''}
          disabled={isPending}
        />

        {error && (
          <section className="p-3">
            <Alert variant="error">
              <AlertTitle>{t('General.ups')}</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </section>
        )}

        {children}

        <section
          className={cn(
            'flex justify-end gap-6 p-6',
            isUpdating &&
              'sticky bottom-0 bg-surface shadow-[0px_-4px_12px_4px_hsl(var(--surface))]'
          )}
        >
          {!isUpdating && (
            <Button onClick={onCancel} variant="ghost" disabled={isPending}>
              {t('General.cancel')}
            </Button>
          )}

          <Button
            type="submit"
            loading={isPending}
            disabled={!form.formState.isDirty || isPending}
          >
            {isPending
              ? t('General.saving') + '...'
              : action === 'create'
              ? t('General.continue')
              : t('General.save_changes')}
          </Button>
        </section>
      </form>
    </Form>
  )
}
