import { fetchProjectBySlug } from '@/lib/fetching/projects'

interface ProjectProps {
  params: { slug: string }
}
export default async function ProjectPage({ params }: ProjectProps) {
  const { data, error } = await fetchProjectBySlug(params.slug)
  return (
    <main className="p-16">
      <pre>{JSON.stringify(data, undefined, 2)}</pre>
    </main>
  )
}
