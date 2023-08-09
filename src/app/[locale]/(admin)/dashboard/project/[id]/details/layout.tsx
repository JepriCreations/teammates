import { getDictionary } from '@/lib/dictionaries'

interface ProjectDetailsLayoutProps {
  children: React.ReactNode
  params: { locale: string; id: string }
}

export default async function ProjectDetailLayout({
  children,
  params: { locale },
}: ProjectDetailsLayoutProps) {
  const { t } = await getDictionary(locale, 'Projects')
  return (
    <>
      <h1 className="mb-10">{t('project_details')}</h1>
      {children}
    </>
  )
}
