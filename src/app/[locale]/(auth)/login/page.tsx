import Link from 'next/link'
import { ROUTES } from '@/constants/routes'

import { siteConfig } from '@/config/site'
import { getDictionary } from '@/lib/dictionaries'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { SignInForm } from '@/components/forms/sign-in-form'
import { Logo } from '@/components/logo'

interface LoginProps {
  params: { locale: string }
}
export default async function Login({ params: { locale } }: LoginProps) {
  const { t } = await getDictionary(locale, 'Auth')

  return (
    <>
      <div className="mx-auto mb-4 flex h-16 w-full max-w-5xl flex-wrap items-center justify-between gap-3 px-3 sm:px-6">
        <Link href={ROUTES.HOME} className="mx-auto sm:mx-0">
          <Logo />
        </Link>
        <Button asChild variant="tonal" className="hidden sm:block">
          <Link href={ROUTES.HOME}>{t('discover')}</Link>
        </Button>
      </div>
      <main className="mx-3 flex min-h-[calc(100dvh-64px)] max-w-5xl flex-col items-center justify-center sm:mx-auto">
        <div className="relative">
          <Card
            variant="filled"
            className="relative z-10 p-7 text-center shadow-lg sm:p-14"
          >
            <h2 className="mb-3">{t('welcome')}</h2>
            <p className="muted max-w-sm text-body-lg">{t('subtitle')}</p>
            <p className="my-8 font-medium">{t('login_with')}</p>
            <SignInForm />
            <p className="muted mt-11 max-w-sm text-body-sm">
              {t('an_account_will_be_created')}
            </p>
          </Card>
        </div>
        <div className="mb-2 mt-11 flex items-center gap-3">
          <Link href={ROUTES.HOME} className="hover:opacity-70">
            {siteConfig.links.website}
          </Link>
          <div>|</div>
          <Link href={ROUTES.PRIVACY} className="hover:opacity-70">
            {t('privacy')}
          </Link>
        </div>
      </main>
    </>
  )
}
