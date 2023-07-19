'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Project, Role } from '@/types/collections'
import { useProjects } from '@/hooks/useProjects'
import { useToast } from '@/hooks/useToast'
import { Switch } from '@/components/ui/switch'
import { useDictionary } from '@/components/providers/dictionary-provider'

import { ProjectForm } from '../new-project/project-form'
import { RolesForm } from './roles-form'

interface ProjectFormType extends Project {
  roles: Role[]
}

export const PostForm = (data: ProjectFormType) => {
  const { t } = useDictionary('Projects')
  const router = useRouter()
  const { toast } = useToast()
  const { update } = useProjects()
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

  const updatePublicState = async (value: boolean) => {
    setPublish(value)
    const { error } = await update({ public: value }, data.id)
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

  return (
    <>
      <div className="m-6">
        <p className="text-xl font-semibold">{t('project_details')}</p>
      </div>
      <section className="grid grid-cols-3 border-b border-muted p-6">
        <div>
          <p>{t('project_status')}</p>
        </div>
        <div className="col-span-2 flex items-center gap-3">
          <p>{publish ? t('public') : t('hidden')}</p>
          <Switch checked={publish} onCheckedChange={updatePublicState} />
        </div>
      </section>
      <ProjectForm
        defaultValues={defaultValues}
        action="update"
        projectData={{ id: data.id, icon_url: data.icon_url }}
      />
      <section className="border-y border-border p-6">
        <div className="mb-6">
          <p className="text-xl font-semibold">Roles</p>
        </div>
        <RolesForm data={data.roles} />
      </section>
    </>
  )
}
