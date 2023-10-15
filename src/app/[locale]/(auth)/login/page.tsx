import Image from 'next/image'
import Link from 'next/link'
import { ROUTES } from '@/constants/routes'

import { getDictionary } from '@/lib/dictionaries'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Logo } from '@/components/logo'
import { SignInForm } from '@/components/sign-in-form'

interface LoginProps {
  params: { locale: string }
}
export default async function Login({ params: { locale } }: LoginProps) {
  const { t } = await getDictionary(locale, 'Auth')

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between p-6">
          <Link href={ROUTES.HOME}>
            <Logo height={32} />
          </Link>
          <Button asChild variant="tonal">
            <Link href={ROUTES.HOME}>{t('discover')}</Link>
          </Button>
        </div>
      </div>
      <main className="mx-auto flex min-h-[100dvh] max-w-5xl flex-col items-center justify-center py-20">
        <div className="relative">
          <Card
            variant="filled"
            className="relative z-10 p-14 text-center shadow-lg"
          >
            <h2 className="mb-3">{t('welcome')}</h2>
            <p className="muted max-w-sm text-body-lg">{t('subtitle')}</p>
            <p className="my-8 font-medium">{t('login_with')}</p>
            <SignInForm />
            <p className="muted mt-11 max-w-sm text-body-sm">
              {t('an_account_will_be_created')}
            </p>
          </Card>
          <Image
            src="/images/il-login-1.png"
            alt="entrepreneur"
            width={461 / 1.3}
            height={552 / 1.3}
            className="absolute right-0 top-0 z-0 translate-x-3/4 translate-y-[10%] dark:hidden"
          />
          <Image
            src="/images/il-login-2.png"
            alt="entrepreneur"
            width={238 / 1.3}
            height={380 / 1.3}
            className="absolute left-0 top-0 z-0 -translate-x-3/4 dark:hidden"
          />
          <Image
            src="/images/il-login-3.png"
            alt="entrepreneur"
            width={167 / 1.3}
            height={173 / 1.3}
            className="absolute bottom-0 left-0 z-0 -translate-x-3/4 dark:hidden"
          />
        </div>
        <div className="mb-2 mt-11 flex items-center gap-3">
          <Link href={ROUTES.HOME} className="hover:opacity-70">
            teammates.mov
          </Link>
          <div>|</div>
          <Link href={ROUTES.PRIVACY} className="hover:opacity-70">
            {t('privacy')}
          </Link>
        </div>
        <div className="text-sm">
          {t('illustrations_by', [
            <a
              href="https://popsy.co"
              target="_blank"
              className="hover:text-orange-400"
            >
              popsy.co
            </a>,
          ])}
        </div>
      </main>
    </>
  )
}
