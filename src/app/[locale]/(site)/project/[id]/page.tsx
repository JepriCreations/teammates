import { fetchProject } from '@/lib/fetching/projects'

interface ProjectProps {
  params: { id: string }
}
export default async function ProjectPage({ params }: ProjectProps) {
  const data = await fetchProject(params.id)
  return (
    <main className="p-16">
      <pre>{JSON.stringify(data, undefined, 2)}</pre>
    </main>
  )
}
