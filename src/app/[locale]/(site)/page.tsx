import { fetchProjects } from '@/lib/fetching/projects'
import { ProjectCard } from '@/components/project-card'
import { getDictionary } from '@/lib/dictionaries'

// TODO: modify the revalidation time
export const revalidate = 60

interface HomeProps {
  params: { locale: string }
}
export default async function Home({ params: { locale } }: HomeProps) {
  const { dict } = await getDictionary(locale)
  const projects = await fetchProjects()

  return (
    <main className="p-16">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="mb-4 font-bold leading-snug">
          {/* Find the next project to be part of. */}
          {dict.Site.title}
        </h1>
        <p className="mx-auto max-w-lg text-base">
          {/* The Powerhouse Platform for Connecting Visionaries and Cultivating
          Success. Step into a World of Collaboration and Innovation. */}
          {dict.Site.subtitle}
        </p>
      </div>
      <section className="mx-auto mt-8 max-w-4xl">
        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </section>
    </main>
  )
}
