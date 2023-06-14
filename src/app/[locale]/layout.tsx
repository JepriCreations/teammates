import '@/styles/globals.css'
import { Metadata } from 'next'

import { siteConfig } from '@/config/site'
import { fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { createServerClient } from '@/lib/supabase-server'
import { SupabaseProvider } from '@/components/providers/supabase-provider'
import { SupabaseAuthProvider } from '@/components/providers/supabase-auth-provider'
import { getDictionary } from '@/lib/dictionaries'
import { DictionaryProvider } from '@/components/providers/dictionary-provider'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  icons: {
    icon: '/favicon.ico',
    // shortcut: "/favicon-16x16.png",
    // apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
  params: { locale: string }
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const supabase = createServerClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { dict } = await getDictionary(params.locale)

  return (
    <html
      lang={params.locale}
      suppressHydrationWarning
      className={cn(fontSans.variable)}
    >
      <body className="min-h-[100dvh] bg-background font-sans antialiased">
        <DictionaryProvider dict={dict}>
          <SupabaseProvider>
            <SupabaseAuthProvider serverSession={session}>
              {children}
            </SupabaseAuthProvider>
          </SupabaseProvider>
        </DictionaryProvider>
      </body>
    </html>
  )
}
