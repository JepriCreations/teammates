'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { type Category } from '@/constants/projects'
import { ROUTES } from '@/constants/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Project } from '@/types/collections'
import { ERROR_CODES } from '@/lib/errors'
import { cn } from '@/lib/utils'
import { defaultSocialLinks } from '@/lib/validations/global'
import {
  createProjectSchema,
  projectSchema,
  updateProjectSchema,
} from '@/lib/validations/project'
import { useProjects } from '@/hooks/use-projects'
import { useToast } from '@/hooks/use-toast'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { ProjectInputs } from '@/components/forms/project-inputs'
import { useDictionary } from '@/components/providers/dictionary-provider'
import { useNewProjectFormState } from '@/components/providers/new-project-form-provider'

type ProjectSchemaType =
  | z.infer<typeof createProjectSchema>
  | z.infer<typeof updateProjectSchema>

interface ProjectForm {
  action?: 'update' | 'create'
  defaultValues?: z.infer<typeof projectSchema>
  projectData?: Partial<Project>
  children?: React.ReactNode
}

export const ProjectForm = ({
  action = 'create',
  defaultValues,
  projectData,
  children,
}: ProjectForm) => {
  const { t } = useDictionary()
  const { toast } = useToast()
  const { onNext } = useNewProjectFormState()
  const router = useRouter()
  const { isPending, create, update } = useProjects()
  const [error, setError] = useState<string | null>(null)
  const isUpdating = action === 'update'

  const form = useForm<z.infer<typeof createProjectSchema>>({
    resolver: zodResolver(
      isUpdating ? updateProjectSchema : createProjectSchema
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

  // Watch when the icon changes to show the preview in the thumbnail
  form.watch('file')

  const onSubmit = async (values: ProjectSchemaType) => {
    if (isUpdating) return onUpdate(values)

    const validation = createProjectSchema.safeParse(values)
    if (validation.success) {
      return onCreate(validation.data)
    }
  }

  const onCreate = async (values: z.infer<typeof createProjectSchema>) => {
    const { error, data } = await create(values)

    if (error) {
      if (error.code === ERROR_CODES.DUPLICATE_NAME) {
        form.setError(
          'name',
          {
            type: 'custom',
            message: t('Projects.Errors.duplicate_name'),
          },
          { shouldFocus: true }
        )
      } else {
        setError(t('Projects.Errors.saving'))
      }
      return
    }

    toast({
      title: t('General.success'),
      description: t('Projects.success_create'),
      severity: 'success',
    })

    onNext({ projectId: data.id, categories: values.categories as Category[] })
  }

  const onUpdate = async (values: z.infer<typeof updateProjectSchema>) => {
    if (!projectData?.id) return

    const { error } = await update(projectData.id, values)

    if (error) {
      return toast({
        title: t('General.ups'),
        description: t('Projects.Errors.updating'),
        severity: 'error',
      })
    }

    return toast({
      title: t('General.success'),
      description: t('Projects.success_update'),
      severity: 'success',
    })
  }

  const onCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    router.push(ROUTES.PROJECTS)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <ProjectInputs
          form={form}
          icon_url={projectData?.icon_url ?? ''}
          disabled={isPending}
        />

        {children}

        <div
          className={cn(
            'space-y-2',
            isUpdating &&
              'sticky bottom-20 z-10 bg-surface py-3 shadow-[0px_-4px_12px_4px_hsl(var(--surface))] md:bottom-0'
          )}
        >
          {error && (
            <Alert variant="error">
              <Alert.Title>{t('General.ups')}</Alert.Title>
              <Alert.Description>{error}</Alert.Description>
            </Alert>
          )}
          <section className="flex justify-end gap-6">
            {!isUpdating && (
              <Button onClick={onCancel} variant="text" disabled={isPending}>
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
        </div>
      </form>
    </Form>
  )
}
