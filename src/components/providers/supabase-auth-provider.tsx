'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Session } from '@supabase/supabase-js'
import useSWR from 'swr'

import { Profile } from '@/types/collections'
import { useSupabase } from '@/components/providers/supabase-provider'

interface ContextI {
  user: Profile | null | undefined
  error: any
  isLoading: boolean
  isAuthenticating: string | boolean
  signOut: () => Promise<void>
  signInWithGithub: () => Promise<string | undefined>
  signInWithGoogle: () => Promise<string | undefined>
  signInWithOtp: (email: string) => Promise<string | undefined>
}
const Context = createContext<ContextI>({
  user: null,
  error: false,
  isLoading: true,
  isAuthenticating: false,
  signOut: async () => {},
  signInWithGithub: async () => undefined,
  signInWithGoogle: async () => undefined,
  signInWithOtp: async () => undefined,
})

export const SupabaseAuthProvider = ({
  serverSession,
  children,
}: {
  serverSession?: Session | null
  children: React.ReactNode
}) => {
  const { supabase } = useSupabase()
  const [isAuthenticating, setIsAuthenticating] = useState<string | boolean>(
    false
  )
  const router = useRouter()
  const searchParams = useSearchParams()
  const from = searchParams.get('from')

  const getProfile = async (): Promise<Profile | null> => {
    if (!serverSession) return null

    const { data: profile, error } = await supabase
      .from('profiles')
      .select()
      .eq('id', serverSession.user.id)
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

  // Sign-In with Github
  const signInWithGithub = async () => {
    setIsAuthenticating('github')
    const baseUrl = `${location.origin}/api/auth/callback`
    const url = from ? baseUrl + `?from=${from}` : baseUrl

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: url,
      },
    })

    if (error) {
      console.log({ error })
      setIsAuthenticating(false)
      return error.message
    }
  }

  // Sign-In with Google
  const signInWithGoogle = async () => {
    setIsAuthenticating('google')
    const baseUrl = `${location.origin}/api/auth/callback`
    const url = from ? baseUrl + `?from=${from}` : baseUrl

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        redirectTo: url,
      },
    })

    if (error) {
      console.log({ error })
      setIsAuthenticating(false)
      return error.message
    }
  }

  // Sign-In with Magic Link
  const signInWithOtp = async (email: string) => {
    setIsAuthenticating('otp')
    const baseUrl = `${location.origin}/api/auth/callback`
    const url = from ? baseUrl + `?from=${from}` : baseUrl

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: url,
      },
    })

    if (error) {
      console.log({ error })
      setIsAuthenticating(false)
      return error.message
    }
  }

  // Sign Out
  const signOut = async () => {
    setIsAuthenticating(true)
    await supabase.auth.signOut()
  }

  // Refresh the Page to Sync Server and Client
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token !== serverSession?.access_token) {
        router.refresh()
      }
      setIsAuthenticating(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router, supabase, serverSession?.access_token])

  const exposed: ContextI = {
    user,
    error,
    isLoading,
    isAuthenticating,
    signOut,
    signInWithGithub,
    signInWithGoogle,
    signInWithOtp,
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
