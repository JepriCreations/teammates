'use client'

import { useDictionary } from '@/components/providers/dictionary-provider'

import { RolesForm } from './roles-form'

export const ProjectRolesForm = () => {
  const { t } = useDictionary('Projects')

  return (
    <main className="min-h-[calc(100dvh)] pb-16 pt-28">
      <section className="sticky top-[63px] z-40 mx-auto max-w-3xl border-b border-outline/38 bg-surface">
        <div className="card p-6">
          <p className="mb-2 text-lg font-medium">{t('add_available_roles')}</p>
          <p className="text-outline">{t('add_available_roles_description')}</p>
        </div>
      </section>
      <div className="card relative mx-auto max-w-3xl">
        <RolesForm />
      </div>
    </main>
  )
}
