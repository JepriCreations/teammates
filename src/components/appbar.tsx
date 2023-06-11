'use client'
import { useAuth } from '@/components/providers/supabase-auth-provider'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Logo } from './logo'

export const Appbar = () => {
  const { signOut, user } = useAuth()

  return (
    <div className="flex items-center justify-between gap-3 px-8 py-3">
      <div className="hidden sm:block">
        <Logo height={24} />
      </div>
      <div className="sm:hidden">
        <Logo height={24} withText={false} />
      </div>
      <div className="ml-6 flex gap-6 font-medium">
        <a>Projects</a>
        <a>Blog</a>
        <a>About</a>
      </div>
      <div className="grow" />
      <div className="flex gap-3">
        {user ? (
          <Button variant="destructive" onClick={signOut}>
            Logout
          </Button>
        ) : (
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>
    </div>
  )
}
