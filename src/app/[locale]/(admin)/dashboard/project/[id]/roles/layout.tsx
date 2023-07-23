import { getDictionary } from '@/lib/dictionaries'

interface ProjectRolesProps {
  children: React.ReactNode
  params: { id: string; locale: string }
}

export default async function ProjectRolesPage({
  children,
  params: { locale },
}: ProjectRolesProps) {
  const { t } = await getDictionary(locale, 'Projects')

  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="mb-10">{t('project_roles')}</h1>
      {children}
    </main>
  )
}
