import { getDictionary } from '@/lib/dictionaries'
import { fetchProjects } from '@/lib/fetching/projects'
import { ProjectCard } from '@/components/project-card'

// Revalidate every day
export const revalidate = 86400

interface HomeProps {
  params: { locale: string }
}
export default async function Home({ params: { locale } }: HomeProps) {
  const { dict } = await getDictionary(locale)
  const projects = await fetchProjects()

  return (
    <>
      <section className="container mx-auto pt-16">
        <div className="text-center">
          <h1 className="mb-4 font-bold leading-snug">{dict.Site.title}</h1>
          <p className="mx-auto max-w-lg text-base text-muted-foreground">
            {dict.Site.subtitle}
          </p>
        </div>
        <section className="my-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </section>
      </section>
    </>
  )
}
