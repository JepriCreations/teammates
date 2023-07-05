import { getDictionary } from '@/lib/dictionaries'
import { fetchProjects } from '@/lib/fetching/projects'
import { ProjectCard } from '@/components/project-card'

// Revalidate every day
export const revalidate = 86400

interface HomeProps {
  params: { locale: string }
}
export default async function Home({ params: { locale } }: HomeProps) {
  const { t } = await getDictionary(locale)
  const projects = await fetchProjects()

  return (
    <>
      <section className="container mx-auto pt-16">
        <div className="text-center">
          <h1 className="mx-auto mb-4 max-w-3xl font-bold leading-snug">
            {t('Site.title')}
          </h1>
          <p className="mx-auto max-w-lg text-base text-muted-foreground">
            {t('Site.subtitle')}
          </p>
        </div>
        <section className="mx-auto my-8 max-w-4xl">
          {projects.map((project) => (
            <ProjectCard key={project.id} t={t} {...project} />
          ))}
        </section>
      </section>
    </>
  )
}
