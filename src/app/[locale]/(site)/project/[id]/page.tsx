interface ProjectProps {
  params: { id: string }
}
export default async function ProjectPage({ params }: ProjectProps) {
  return <main className="p-16">Project: {params.id}</main>
}
