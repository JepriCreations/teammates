'use client'

import { useDictionary } from '@/components/providers/dictionary-provider'

import { RolesForm } from './roles-form'

export const ProjectRolesForm = () => {
  const { t } = useDictionary('Projects')

  return (
    <main className="min-h-[calc(100dvh)] pb-16 pt-28">
      <section className="sticky top-[63px] z-40 mx-auto max-w-2xl border border-b border-border border-b-muted bg-card p-6">
        <p className="mb-2 text-lg font-medium">{t('add_available_roles')}</p>
        <p className="text-muted-foreground">
          {t('add_available_roles_description')}
        </p>
      </section>
      <div className="relative mx-auto max-w-2xl border border-border border-t-transparent bg-card">
        <RolesForm />
      </div>
    </main>
  )
}
