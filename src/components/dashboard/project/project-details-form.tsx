'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { Project } from '@/types/collections'
import { useProjects } from '@/hooks/use-projects'
import { useToast } from '@/hooks/use-toast'
import { Accordion } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { CircularProgress } from '@/components/ui/circular-progress'
import { Dialog } from '@/components/ui/dialog'
import { Divider } from '@/components/ui/divider'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import { TextField } from '@/components/ui/text-field'
import { ProjectForm } from '@/components/forms/new-project/project-form'
import { useDictionary } from '@/components/providers/dictionary-provider'

interface ProjectDetailsFormProps {
  data: Project
}

export const ProjectDetailsForm = ({ data }: ProjectDetailsFormProps) => {
  const { t } = useDictionary('Projects')
  const router = useRouter()
  const { toast } = useToast()
  const { update, remove, isRemoving } = useProjects()
  const [publish, setPublish] = useState(data.public)

  const location = data.location as { country: string; city: string }

  const defaultValues = {
    name: data.name,
    summary: data.summary,
    categories: data.categories,
    description: data.description,
    file: undefined,
    location: {
      country: location.country,
      city: location.city,
    },
    links: JSON.parse(JSON.stringify(data.links)),
  }

  const form = useForm({
    defaultValues: {
      name: '',
    },
  })

  const updatePublicState = async (value: boolean) => {
    setPublish(value)
    const { error } = await update({ id: data.id, public: value })
    if (error) {
      setPublish((prev) => !prev)
      return toast({
        title: 'Upss!',
        description: t('errors.updating'),
        severity: 'error',
      })
    }
    router.refresh()
  }

  const handleRemove = ({ name }: { name: string }) => {
    if (name !== data.name) {
      return form.setError('name', { message: t('errors.incorrect_name') })
    }
    remove(data.id)
  }

  return (
    <>
      {/* Project status */}
      <section className="grid grid-cols-1 gap-y-3 md:grid-cols-3">
        <div>
          <p className="text-label-lg">{t('project_status')}</p>
        </div>
        <div className="flex items-center gap-3 md:col-span-2">
          <Switch checked={publish} onCheckedChange={updatePublicState} />
          <p>{publish ? t('public') : t('hidden')}</p>
        </div>
      </section>
      <Divider />
      <ProjectForm
        defaultValues={defaultValues}
        action="update"
        projectData={{ id: data.id, icon_url: data.icon_url }}
      >
        <Accordion type="multiple" className="w-full">
          <Accordion.Item value="danger-zone" className="border-none">
            <Accordion.Trigger>{t('show_danger_zone')}</Accordion.Trigger>
            <Accordion.Content>
              <section className="grid grid-cols-1 gap-y-3 py-3 sm:grid-cols-3">
                <div>
                  <p className="text-label-lg text-error">{t('danger_zone')}</p>
                </div>
                <div className="col-span-2 flex items-center gap-3">
                  <Dialog>
                    <Dialog.Trigger asChild>
                      <Button variant="destructive">
                        {t('remove_project')}
                      </Button>
                    </Dialog.Trigger>
                    <Dialog.Content>
                      <Dialog.Header>
                        <Dialog.Title>{t('remove_title')}</Dialog.Title>
                        <Dialog.Description>
                          {t('remove_description')}
                        </Dialog.Description>
                      </Dialog.Header>
                      <Form {...form}>
                        <form>
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <TextField
                                    disabled={isRemoving}
                                    placeholder={data.name}
                                    label={t('name')}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </form>
                      </Form>
                      <Dialog.Footer>
                        <Button
                          onClick={(e) => {
                            e.preventDefault()
                            handleRemove(form.getValues())
                          }}
                          loading={isRemoving}
                          variant="destructive"
                        >
                          {t('remove_project')}
                        </Button>
                      </Dialog.Footer>
                    </Dialog.Content>
                  </Dialog>
                </div>
              </section>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </ProjectForm>
    </>
  )
}

export const LoadingForm = () => {
  return (
    <>
      <section className="grid h-[calc(100dvh-96px)] place-items-center px-3 sm:px-12">
        <CircularProgress />
      </section>
    </>
  )
}
