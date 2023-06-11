'use client'

import { useAuth } from '@/components/providers/supabase-auth-provider'

import { Button } from './ui/button'

export const LogoutButton = () => {
  const { signOut, isAuthenticating } = useAuth()

  return (
    <Button variant="destructive" onClick={signOut} loading={isAuthenticating}>
      Logout
    </Button>
  )
}
