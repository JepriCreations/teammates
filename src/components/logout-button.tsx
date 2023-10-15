'use client'

import { Icons } from '@/components/icons'
import { useAuth } from '@/components/providers/supabase-auth-provider'

export const LogoutButton = () => {
  const { signOut, isAuthenticating } = useAuth()

  return (
    <button
      onClick={signOut}
      className="flex items-center gap-2 opacity-60 transition hover:opacity-100"
    >
      {isAuthenticating ? (
        <Icons.spinner className="h-5 w-5 animate-spin" />
      ) : (
        <Icons.logout className="h-5 w-5" />
      )}
      Logout
    </button>
  )
}
