import Link from 'next/link'
import { Logo } from '@/components/logo'
import { SignInForm } from '@/components/sign-in-form'
import { Button } from '@/components/ui/button'
import { routes } from '@/constants/routes'
import Image from 'next/image'
import { getDictionary } from '@/lib/dictionaries'

interface LoginProps {
  params: { locale: string }
}
export default async function Login({ params: { locale } }: LoginProps) {
  const { dict, t } = await getDictionary(locale, 'Auth')

  return (
    <main className="relative z-10 mx-auto flex min-h-[100dvh] max-w-5xl flex-col items-center justify-center pb-20">
      <div className="mb-14 flex w-full items-center justify-between p-6">
        <Logo />
        <Button asChild>
          <Link href={routes.HOME}>{dict.discover}</Link>
        </Button>
      </div>
      <div className="relative z-10 border border-border bg-background p-14 text-center shadow-xl">
        <h1>{dict.welcome}</h1>
        <p className="secondary max-w-sm text-lg">{dict.subtitle}</p>
        <p className="my-8 font-medium">{dict.login_with}</p>
        <SignInForm />
        <p className="secondary mt-11 max-w-sm text-lg">
          {dict.an_account_will_be_created}
        </p>
      </div>
      <div className="mb-2 mt-11 flex items-center gap-3">
        <p>teammates.mov</p>
        <div>|</div>
        <Link href={routes.PRIVACY}>{dict.privacy}</Link>
      </div>
      <div className="text-sm">
        {t('illustrations_by', [
          <a href="https://popsy.co" target="_blank">
            popsy.co
          </a>,
        ])}
      </div>
      <Image
        src="/images/il-login-1.png"
        alt="entrepeneur"
        width={461 / 1.3}
        height={552 / 1.3}
        className="absolute z-0 translate-x-[350px]"
      />
      <Image
        src="/images/il-login-2.png"
        alt="entrepeneur"
        width={238 / 1.3}
        height={380 / 1.3}
        className="absolute z-0 translate-x-[-350px] translate-y-[-120px]"
      />
      <Image
        src="/images/il-login-3.png"
        alt="entrepeneur"
        width={167 / 1.3}
        height={173 / 1.3}
        className="absolute z-0 translate-x-[-300px] translate-y-[220px]"
      />
    </main>
  )
}