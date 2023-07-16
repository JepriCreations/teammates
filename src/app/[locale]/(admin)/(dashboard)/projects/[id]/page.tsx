interface ProjectProps {
  params: { id: string }
}

export default function Project({ params }: ProjectProps) {
  return <div>Project page id: {params.id}</div>
}
