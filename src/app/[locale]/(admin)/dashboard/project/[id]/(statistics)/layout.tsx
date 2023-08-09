import { getDictionary } from '@/lib/dictionaries'

interface ProjectStatisticsLayoutProps {
  children: React.ReactNode
  params: { locale: string; id: string }
}

export default async function ProjectStatisticsLayout({
  children,
  params: { locale },
}: ProjectStatisticsLayoutProps) {
  const { t } = await getDictionary(locale, 'Projects')
  return (
    <>
      <h1 className="mb-10">{t('project_statistics')}</h1>
      {children}
    </>
  )
}
