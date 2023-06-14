import { Button } from '@/components/ui/button'
import { routes } from '@/constants/routes'
import Link from 'next/link'

export default function Projects() {
  return (
    <div className="p-16">
      <Button asChild>
        <Link href={routes.NEW_PROJECT}>New project</Link>
      </Button>
    </div>
  )
}
