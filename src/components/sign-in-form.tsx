'use client'

import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { useAuth } from '@/components/providers/supabase-auth-provider'

export const SignInForm = () => {
  const { signInWithGithub, isAuthenticating } = useAuth()

  return (
    <div className="mx-auto grid max-w-xs grid-cols-2 gap-5">
      <Button
        variant="brutalist"
        className="justify-start"
        fullWidth
        icon={<Icons.google />}
      >
        Google
      </Button>
      <Button
        variant="brutalist"
        className="justify-start"
        fullWidth
        icon={<Icons.apple />}
      >
        Apple ID
      </Button>
      <Button
        variant="brutalist"
        className="justify-start"
        fullWidth
        icon={<Icons.twitter />}
      >
        X (Twitter)
      </Button>
      <Button
        className="justify-start"
        variant="brutalist"
        fullWidth
        icon={<Icons.facebook className="text-blue-500" />}
      >
        Facebook
      </Button>
      <Button
        className="justify-start"
        variant="brutalist"
        fullWidth
        onClick={signInWithGithub}
        icon={<Icons.github />}
        loading={isAuthenticating}
      >
        Github
      </Button>
      <Button
        variant="brutalist"
        className="justify-start"
        fullWidth
        icon={<Icons.linkedin className="text-blue-600 dark:text-onSurface" />}
      >
        Linkedin
      </Button>
    </div>
  )
}
