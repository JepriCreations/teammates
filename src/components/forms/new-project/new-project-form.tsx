'use client'

import { useDictionary } from '@/components/providers/dictionary-provider'

import { ProjectForm } from './project-form'

export const NewProjectForm = () => {
  const { t } = useDictionary('Projects')
  return (
    <main className="min-h-[calc(100dvh)] pb-16 pt-28">
      <section className="sticky top-[63px] z-40 mx-auto max-w-3xl rounded-t-lg border-b border-outline/38 bg-surface">
        <div className="card p-6">
          <p className="mb-2 text-lg font-medium">{t('create_new_project')}</p>
          <p className="text-outline">{t('new_project_description')}</p>
        </div>
      </section>
      <div className="card relative mx-auto max-w-3xl">
        <ProjectForm action="create" />
      </div>
    </main>
  )
}
