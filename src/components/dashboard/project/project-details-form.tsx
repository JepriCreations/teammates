'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { Project } from '@/types/collections'
import { useProjects } from '@/hooks/useProjects'
import { useToast } from '@/hooks/useToast'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
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
      <section className="grid grid-cols-3 border-b border-outline/38 p-6">
        <div>
          <p>{t('project_status')}</p>
        </div>
        <div className="col-span-2 flex items-center gap-3">
          <Switch checked={publish} onCheckedChange={updatePublicState} />
          <p>{publish ? t('public') : t('hidden')}</p>
        </div>
      </section>
      <ProjectForm
        defaultValues={defaultValues}
        action="update"
        projectData={{ id: data.id, icon_url: data.icon_url }}
      >
        <Accordion type="multiple" className="w-full px-6">
          <AccordionItem value="danger-zone" className="border-none">
            <AccordionTrigger>{t('show_danger_zone')}</AccordionTrigger>
            <AccordionContent>
              <section className="grid grid-cols-3 py-3">
                <div>
                  <p className="text-error">{t('danger_zone')}</p>
                </div>
                <div className="col-span-2 flex items-center gap-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="destructive">
                        {t('remove_project')}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{t('remove_title')}</DialogTitle>
                        <DialogDescription>
                          {t('remove_description')}
                        </DialogDescription>
                      </DialogHeader>
                      <Form {...form}>
                        <form>
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t('name')}</FormLabel>
                                <FormControl>
                                  <Input
                                    disabled={isRemoving}
                                    variant="card"
                                    placeholder={data.name}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </form>
                      </Form>
                      <DialogFooter>
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
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </section>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ProjectForm>
    </>
  )
}

export const LoadingForm = () => {
  return <div>Loading form...</div>
}
