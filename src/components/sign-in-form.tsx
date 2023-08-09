'use client'

import { Button } from '@/components/ui/button'
import {
  AppleIcon,
  FacebookIcon,
  GithubIcon,
  GoogleIcon,
  LinkedinIcon,
  TwitterIcon,
} from '@/components/icons'
import { useAuth } from '@/components/providers/supabase-auth-provider'

export const SignInForm = () => {
  const { signInWithGithub, isAuthenticating } = useAuth()

  return (
    <div className="mx-auto grid max-w-xs grid-cols-2 gap-5">
      <Button className="justify-start" fullWidth icon={<GoogleIcon />}>
        Google
      </Button>
      <Button className="justify-start" fullWidth icon={<AppleIcon />}>
        Apple ID
      </Button>
      <Button
        className="justify-start"
        fullWidth
        icon={<TwitterIcon className="text-blue-400" />}
      >
        Twitter
      </Button>
      <Button
        className="justify-start"
        fullWidth
        icon={<FacebookIcon className="text-blue-500" />}
      >
        Facebook
      </Button>
      <Button
        className="justify-start"
        fullWidth
        onClick={signInWithGithub}
        icon={<GithubIcon />}
        loading={isAuthenticating}
      >
        Github
      </Button>
      <Button
        className="justify-start"
        fullWidth
        icon={<LinkedinIcon className="text-blue-600 dark:text-onSurface" />}
      >
        Linkedin
      </Button>
    </div>
  )
}
