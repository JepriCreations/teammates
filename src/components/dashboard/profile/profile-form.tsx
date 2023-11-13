'use client'

import { COUNTRIES } from '@/constants/countries'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { LinkType, Profile } from '@/types/collections'
import { cn } from '@/lib/utils'
import { defaultSocialLinks, SOCIALS } from '@/lib/validations/global'
import { ABOUT_MAX_LENGTH, profileSchema } from '@/lib/validations/profile'
import { useProfile } from '@/hooks/use-profile'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Divider } from '@/components/ui/divider'
import { Form } from '@/components/ui/form'
import { TextField } from '@/components/ui/text-field'
import { Textarea } from '@/components/ui/textarea'
import { Combobox } from '@/components/combobox'
import { Icons } from '@/components/icons'
import { useDictionary } from '@/components/providers/dictionary-provider'
import { useAuth } from '@/components/providers/supabase-auth-provider'

interface ProfileFormProps {
  profile: Omit<Partial<Profile>, 'links'> & {
    provider?: string
    links?: LinkType[]
  }
}

export const ProfileForm = ({ profile }: ProfileFormProps) => {
  const { t } = useDictionary()
  const { update, isPending } = useProfile()
  const { toast } = useToast()
  const { signOut, isAuthenticating } = useAuth()

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: profile?.name ?? '',
      about: profile?.about ?? '',
      links: defaultSocialLinks.map((link) => {
        return (
          (profile?.links && profile.links.find((l) => l.name === link.name)) ??
          link
        )
      }),
      nationality: profile?.nationality ?? '',
      email:
        profile?.links
          ?.find((link) => link.name === 'email')
          ?.url.replace('mailto:', '') ?? '',
    },
  })

  const onSubmit = async (values: z.infer<typeof profileSchema>) => {
    const parsedValues = {
      name: values.name,
      about: values.about,
      nationality: values.nationality,
      links: values.links.concat({
        name: 'email',
        url: `mailto:${values.email ?? ''}`,
      }),
    }
    const { error } = await update({ data: parsedValues })

    if (error) {
      return toast({
        description: t('Profile.Errors.updating'),
        severity: 'error',
      })
    }

    toast({
      title: t('General.success'),
      description: t('Profile.success_update'),
      severity: 'success',
    })
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <Form.Field
            control={form.control}
            name="name"
            render={({ field }) => (
              <Form.Item>
                <Form.Control>
                  <TextField
                    label={t('Profile.name')}
                    disabled={isPending}
                    {...field}
                  />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />
          <Form.Field
            control={form.control}
            name="about"
            render={({ field }) => (
              <Form.Item>
                <Form.Control>
                  <Textarea
                    className="min-h-[300px]"
                    label={t('Profile.about')}
                    placeholder={t('Profile.about_placeholder')}
                    disabled={isPending}
                    {...field}
                  />
                </Form.Control>
                <div className="flex justify-between gap-3">
                  <div className="grow">
                    <Form.Message />
                  </div>
                  <Form.Description className="flex gap-4">
                    <span
                      className={cn(
                        'ml-auto',
                        field.value.length > ABOUT_MAX_LENGTH && 'text-error'
                      )}
                    >
                      {`${field.value.length} / ${ABOUT_MAX_LENGTH}`}
                    </span>
                  </Form.Description>
                </div>
              </Form.Item>
            )}
          />
          <Form.Field
            control={form.control}
            name="nationality"
            render={({ field }) => (
              <Form.Item>
                <Form.Control>
                  <Combobox
                    disabled={isPending}
                    label={t('Profile.nationality')}
                    placeholder={t('Profile.select_nationality')}
                    displayValue={(country: string) =>
                      COUNTRIES[country as keyof typeof COUNTRIES]?.name ??
                      COUNTRIES[field.value as keyof typeof COUNTRIES]?.name
                    }
                    defaultValue={
                      COUNTRIES[field.value as keyof typeof COUNTRIES]?.name ??
                      ''
                    }
                    onValueChange={(newValue) => {
                      if (newValue) {
                        form.setValue('nationality', newValue)
                        form.clearErrors(field.name)
                      }
                    }}
                  >
                    {Object.entries(COUNTRIES).map(([key, country]) => (
                      <Combobox.Item key={key} value={key}>
                        {country.name}
                      </Combobox.Item>
                    ))}
                  </Combobox>
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />
          <div className="py-3">
            <Divider />
          </div>
          <p className="text-label-lg">{t('Profile.social_links')}</p>
          {SOCIALS.map(({ name, icon: Icon }, index) => (
            <Form.Field
              key={name}
              control={form.control}
              name="links"
              render={({ field: { value, onChange, ...field } }) => (
                <Form.Item>
                  <Form.Control nested index={index}>
                    <TextField
                      disabled={isPending}
                      label={name}
                      leadingIcon={<Icon />}
                      value={
                        value.find((link) => link.name === name)?.url || ''
                      }
                      onChange={(event) => {
                        const { value: val } = event.target

                        let newValue = [...value]
                        const index = newValue.findIndex((i) => i.name === name)
                        newValue.splice(index, 1, {
                          name,
                          url: !val ? undefined : val,
                        })
                        onChange(newValue)
                      }}
                      {...field}
                    />
                  </Form.Control>
                  <Form.Message nested index={index} />
                </Form.Item>
              )}
            />
          ))}
          <Form.Field
            control={form.control}
            name="email"
            render={({ field }) => (
              <Form.Item>
                <Form.Control>
                  <TextField
                    disabled={isPending}
                    label={t('Profile.email')}
                    leadingIcon={<Icons.email />}
                    {...field}
                  />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />
          <Button
            type="submit"
            className="ml-auto block"
            loading={isPending}
            disabled={!form.formState.isDirty}
          >
            {t('General.save_changes')}
          </Button>
        </form>
      </Form>
      <section className="block space-y-6 md:hidden">
        <Divider />
        <Button
          icon={<Icons.logout />}
          disabled={Boolean(isAuthenticating) || isPending}
          loading={Boolean(isAuthenticating)}
          variant="brutalist"
          onClick={signOut}
          className="mx-auto block"
        >
          {t('Auth.sign_out')}
        </Button>
      </section>
    </div>
  )
}
