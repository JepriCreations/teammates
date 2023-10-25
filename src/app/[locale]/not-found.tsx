'use client'

import { Appbar } from '@/components/appbar'
import { useDictionary } from '@/components/providers/dictionary-provider'
import { useAuth } from '@/components/providers/supabase-auth-provider'

export default function NotFound() {
  const { user } = useAuth()
  const { t } = useDictionary()

  return (
    <>
      <Appbar t={t} loggedIn={Boolean(user)} />
      <main className="flex min-h-[100dvh] flex-col items-center justify-center py-24 md:container">
        <p className="text-display-lg font-bold">404</p>
        <p>{t('General.page_not_found')}</p>
      </main>
    </>
  )
}
