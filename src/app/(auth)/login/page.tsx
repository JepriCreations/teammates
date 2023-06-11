import Link from 'next/link'
import { Logo } from '@/components/logo'
import { SignInForm } from '@/components/sign-in-form'
import { Button } from '@/components/ui/button'
import { routes } from '@/constants/routes'
import Image from 'next/image'

export default function Login() {
  return (
    <main className="relative z-10 mx-auto flex min-h-[100dvh] max-w-5xl flex-col items-center justify-center pb-20">
      <div className="mb-14 flex w-full items-center justify-between p-6">
        <Logo />
        <Button asChild>
          <Link href={routes.HOME}>See projects</Link>
        </Button>
      </div>
      <div className="relative z-10 border border-border bg-background p-14 text-center shadow-xl">
        <h1>Welcome</h1>
        <p className="secondary max-w-sm text-lg">
          Unlock the Power of Collaboration and Connect with Your Dream Team!
        </p>
        <p className="my-8">Sign in with</p>
        <SignInForm />
        <p className="secondary mt-11 max-w-sm text-lg">
          An account will be created if you don’t have one.
        </p>
      </div>
      <div className="mb-2 mt-11 flex items-center gap-3">
        <p>teammates.mov</p>
        <div>|</div>
        <Link href={routes.PRIVACY}>Privacy Policy</Link>
      </div>
      <div className="text-sm">
        Illustrations by <Link href="https://popsy.co">popsy.co</Link>
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
