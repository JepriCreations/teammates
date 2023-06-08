'use client'

import { createContext, useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Session } from '@supabase/supabase-js'
import useSWR from 'swr'

import { Profile } from '@/types/collections'

import { useSupabase } from './supabase-provider'

interface ContextI {
  user: Profile | null | undefined
  error: any
  isLoading: boolean
  signOut: () => Promise<void>
  signInWithGithub: () => Promise<string | undefined>
}
const Context = createContext<ContextI>({
  user: null,
  error: false,
  isLoading: true,
  signOut: async () => {},
  signInWithGithub: async () => undefined,
})

export const SupabaseAuthProvider = ({
  serverSession,
  children,
}: {
  serverSession?: Session | null
  children: React.ReactNode
}) => {
  const { supabase } = useSupabase()
  const router = useRouter()

  const getProfile = async (): Promise<Profile | null> => {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select()
      .eq('id', serverSession?.user.id)
      .single()

    const avatar = profile?.avatar_url
      ? supabase.storage.from('avatars').getPublicUrl(profile?.avatar_url).data
          .publicUrl
      : null

    if (error) {
      console.log(error)
      return null
    } else {
      return { avatar, ...profile }
    }
  }

  const {
    data: user,
    error,
    isLoading,
  } = useSWR(serverSession ? 'profile-context' : null, getProfile)

  const options = {
    redirectTo: `${location.origin}/auth/callback`,
  }

  // Sign-In with Github
  const signInWithGithub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options,
    })

    if (error) {
      return error.message
    }

    router.refresh()
  }

  // Sign Out
  const signOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  // Refresh the Page to Sync Server and Client
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token !== serverSession?.access_token) {
        router.refresh()
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router, supabase, serverSession?.access_token])

  const exposed: ContextI = {
    user,
    error,
    isLoading,
    signOut,
    signInWithGithub,
  }

  return <Context.Provider value={exposed}>{children}</Context.Provider>
}

export const useAuth = () => {
  let context = useContext(Context)
  if (context === undefined) {
    throw new Error('useAuth must be used inside SupabaseAuthProvider')
  } else {
    return context
  }
}
