'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Divider } from '@/components/ui/divider'
import { Form } from '@/components/ui/form'
import { TextField } from '@/components/ui/text-field'
import { Icons } from '@/components/icons'
import { useDictionary } from '@/components/providers/dictionary-provider'
import { useAuth } from '@/components/providers/supabase-auth-provider'

const formSchema = z.object({
  email: z.string().email({
    message: 'Forms.Errors.invalid_email',
  }),
})

export const SignInForm = () => {
  const { t } = useDictionary()
  const {
    signInWithGithub,
    signInWithGoogle,
    signInWithOtp,
    isAuthenticating,
  } = useAuth()
  const [submitted, setSubmitted] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const error = await signInWithOtp(data.email)
    if (error) {
      form.setError('email', {
        message: t('Forms.Errors.otp'),
      })
      return
    }
    setSubmitted(true)
  }

  return (
    <div className="space-y-4">
      <section className="mx-auto grid max-w-xs grid-cols-2 gap-5">
        <Button
          className="justify-start"
          variant="brutalist"
          fullWidth
          onClick={signInWithGoogle}
          icon={<Icons.google />}
          disabled={Boolean(isAuthenticating) || submitted}
          loading={isAuthenticating === 'google'}
        >
          Google
        </Button>
        <Button
          className="justify-start"
          variant="brutalist"
          fullWidth
          onClick={signInWithGithub}
          icon={<Icons.github />}
          disabled={Boolean(isAuthenticating) || submitted}
          loading={isAuthenticating === 'github'}
        >
          Github
        </Button>
      </section>

      <div className="flex items-center gap-3">
        <Divider className="shrink bg-outlineVariant/70" />
        <p className="muted">{t('Auth.or')}</p>
        <Divider className="shrink bg-outlineVariant/70" />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Form.Field
            control={form.control}
            name="email"
            render={({ field }) => (
              <Form.Item>
                <Form.Control>
                  <TextField
                    variant="outlined"
                    label={t('Auth.email')}
                    type="email"
                    disabled={Boolean(isAuthenticating) || submitted}
                    {...field}
                  />
                </Form.Control>
                <Form.Message />

                <Form.Description className="text-start">
                  {t('Auth.description')}
                </Form.Description>
              </Form.Item>
            )}
          />
          {!submitted ? (
            <Button
              type="submit"
              className="w-full"
              disabled={Boolean(isAuthenticating) || submitted}
              loading={isAuthenticating === 'otp'}
            >
              {t('Auth.signInSubmit')}
            </Button>
          ) : (
            <Alert variant="success" className="max-w-sm text-start">
              <Icons.mailCheck className="h-4 w-4" />
              <Alert.Title>{t('Auth.submitted_title')}</Alert.Title>
              <Alert.Description>
                {t('Auth.submitted_description')}
              </Alert.Description>
            </Alert>
          )}
        </form>
      </Form>
    </div>
  )
}
