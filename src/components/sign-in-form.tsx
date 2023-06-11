'use client'
import {
  AppleIcon,
  FacebookIcon,
  GithubIcon,
  GoogleIcon,
  LinkedinIcon,
  TwitterIcon,
} from '@/components/icons'
import { useAuth } from '@/components/providers/supabase-auth-provider'
import { Button } from '@/components/ui/button'

export const SignInForm = () => {
  const { signInWithGithub } = useAuth()

  return (
    <div className="mx-auto grid max-w-xs grid-cols-2 gap-5">
      <Button className="justify-start" fullWidth>
        <GoogleIcon /> Google
      </Button>
      <Button className="justify-start" fullWidth>
        <AppleIcon /> Apple ID
      </Button>
      <Button className="justify-start" fullWidth>
        <TwitterIcon /> Twitter
      </Button>
      <Button className="justify-start" fullWidth>
        <FacebookIcon /> Facebook
      </Button>
      <Button className="justify-start" fullWidth onClick={signInWithGithub}>
        <GithubIcon /> Github
      </Button>
      <Button className="justify-start" fullWidth>
        <LinkedinIcon /> Linkedin
      </Button>
    </div>
  )
}
