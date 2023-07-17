import '@/styles/globals.css'

import { Metadata } from 'next'

import { siteConfig } from '@/config/site'
import { getDictionary } from '@/lib/dictionaries'
import { fontSans } from '@/lib/fonts'
import { createServerClient } from '@/lib/supabase-server'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'
import { DevToolbar } from '@/components/dev-toolbar'
import { DictionaryProvider } from '@/components/providers/dictionary-provider'
import { SupabaseAuthProvider } from '@/components/providers/supabase-auth-provider'
import { SupabaseProvider } from '@/components/providers/supabase-provider'
import { ThemeProvider } from '@/components/providers/theme-provider'

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

  const { dict, defaultDict } = await getDictionary(params.locale)

  return (
    <html
      lang={params.locale}
      suppressHydrationWarning
      className={cn(fontSans.variable)}
    >
      <head />
      <body className="min-h-[100dvh] overflow-x-hidden bg-background font-sans antialiased selection:bg-accent dark:selection:text-background">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <DictionaryProvider dict={dict} defaultDict={defaultDict}>
            <SupabaseProvider>
              <SupabaseAuthProvider
                serverSession={session}
                locale={params.locale}
              >
                {children}
              </SupabaseAuthProvider>
            </SupabaseProvider>
          </DictionaryProvider>
          <DevToolbar />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
