import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Logo } from './logo'
import { createServerClient } from '@/lib/supabase-server'
import { routes } from '@/constants/routes'

export const Appbar = async () => {
  const supabase = createServerClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <div className="flex items-center justify-between gap-3 px-8 py-3">
      <div className="hidden sm:block">
        <Logo height={24} />
      </div>
      <div className="sm:hidden">
        <Logo height={24} withText={false} />
      </div>
      <div className="ml-6 flex gap-6 font-medium">
        <a>Discover</a>
        <a>Blog</a>
        <a>About</a>
      </div>
      <div className="grow" />
      <div className="flex gap-3">
        {session ? (
          <Button asChild>
            <Link href={routes.PROJECTS}>Dashboard</Link>
          </Button>
        ) : (
          <Button asChild>
            <Link href={routes.LOGIN}>Login</Link>
          </Button>
        )}
      </div>
    </div>
  )
}
