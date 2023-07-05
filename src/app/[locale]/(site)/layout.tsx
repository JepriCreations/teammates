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
  const { dict } = await getDictionary(locale, 'Menus')

  return (
    <>
      <Appbar dict={dict} session={session} />
      <main className="pt-16">{children}</main>
    </>
  )
}
