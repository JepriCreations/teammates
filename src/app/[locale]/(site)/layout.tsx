import { getDictionary } from '@/lib/dictionaries'
import { createServerClient } from '@/lib/supabase-server'
import { Appbar } from '@/components/appbar'

interface SiteLayoutProps {
  params: { locale: string }
  children: React.ReactNode
}

export default async function SiteLayout({
  children,
  params: { locale },
}: SiteLayoutProps) {
  const supabase = createServerClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()
  const { t } = await getDictionary(locale, 'Menus')

  return (
    <>
      <Appbar t={t} session={session} />
      <main className="pt-16">{children}</main>
    </>
  )
}
