'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { countries } from '@/constants/countries'
import { categories } from '@/constants/projects'
import { routes } from '@/constants/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Project } from '@/types/collections'
import { capitalize, cn } from '@/lib/utils'
import {
  createProjectSquema,
  MAX_CATEGORIES,
  projectSquema,
  socials,
  SUMMARY_MAX_LENGTH,
  updateProjectSquema,
} from '@/lib/validations/project'
import { useProjects } from '@/hooks/useProjects'
import { useToast } from '@/hooks/useToast'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import {
  AngleDownSmallIcon,
  CheckIcon,
  ImageUploadIcon,
} from '@/components/icons'
import { useDictionary } from '@/components/providers/dictionary-provider'
import { useNewProjectFormState } from '@/components/providers/new-project-form-provider'

const defaultSocialLinks = socials.map((s) => ({
  name: s.name,
  link: '',
}))

type ProjectSchemaType =
  | z.infer<typeof createProjectSquema>
  | z.infer<typeof updateProjectSquema>

interface ProjectForm {
  action: 'update' | 'create'
  defaultValues?: z.infer<typeof projectSquema>
  projectData?: Partial<Project>
}

export const ProjectForm = ({
  action,
  defaultValues,
  projectData,
}: ProjectForm) => {
  const { t } = useDictionary()
  const { toast } = useToast()
  const { onNext } = useNewProjectFormState()
  const router = useRouter()
  const { isPending, create, update } = useProjects()
  const [error, setError] = useState(null)
  const isUpdating = action === 'update'

  const form = useForm<ProjectSchemaType>({
    resolver: zodResolver(
      isUpdating ? updateProjectSquema : createProjectSquema
    ),
    defaultValues: defaultValues ?? {
      name: '',
      summary: '',
      categories: [],
      description: '',
      file: undefined,
      location: {
        country: '',
        city: '',
      },
      links: defaultSocialLinks,
    },
  })

  // Whatch when the icon changes to show the preview in the thumbnail
  form.watch('file')

  const onSubmit = async (values: z.infer<typeof projectSquema>) => {
    const { error, data } =
      isUpdating && projectData?.id
        ? await update(values, projectData.id)
        : await create(values)

    if (error || !data) {
      setError(error?.message ?? t('Projects.errors.saving'))
      return
    }

    toast({
      title: t('General.success'),
      description: isUpdating ? t('success_update') : t('success_create'),
      severity: 'success',
    })

    if (!isUpdating && 'id' in data) {
      onNext(data.id)
    }
  }

  const onCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    router.push(routes.PROJECTS)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="grid grid-cols-3 border-b border-muted p-6">
          <div>
            <p>{t('Projects.basic_info')}</p>
          </div>
          <div className="col-span-2 grid grid-cols-1 gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('Projects.name')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('Projects.summary')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    {t('Projects.summary_description')}
                    <span
                      className={cn(
                        'block',
                        field.value.length > SUMMARY_MAX_LENGTH && 'text-error'
                      )}
                    >
                      {`${field.value.length} / ${SUMMARY_MAX_LENGTH}`}
                    </span>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>
        <section className="grid grid-cols-3 border-b border-muted p-6">
          <div>
            <p>{t('Projects.details')}</p>
          </div>
          <div className="col-span-2 grid grid-cols-1 gap-3">
            <div className="flex gap-3">
              <div className="grow">
                <FormField
                  control={form.control}
                  name="file"
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>{t('Projects.icon')}</FormLabel>
                      <FormControl>
                        <Input
                          leftSection={<ImageUploadIcon />}
                          type="file"
                          accept="image/*"
                          onChange={(event) => {
                            const file =
                              event.target.files && event.target.files[0]
                            if (file) {
                              onChange(file)
                              form.clearErrors(field.name)
                            } else {
                              form.resetField(field.name)
                            }
                          }}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        {t('Projects.icon_description')}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="relative mt-[28px] h-20 w-20 shrink-0 overflow-hidden border border-border bg-foreground/10">
                {(form.getValues('file') !== undefined ||
                  projectData?.icon_url) && (
                  /**
                   * use of <img/> instead of next <Image/> to avoid chaching
                   * and always show the last updated icon
                   */
                  <img
                    src={
                      form.getValues('file')
                        ? URL.createObjectURL(form.getValues('file'))
                        : projectData?.icon_url || ''
                    }
                    alt="preview"
                    sizes="(max-width: 80px) 100vw"
                    className="animate-in zoom-in-50"
                  />
                )}
              </div>
            </div>
            <FormField
              control={form.control}
              name="categories"
              render={({ field: { value, ...field } }) => (
                <FormItem>
                  <FormLabel>{t('Projects.categories')}</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            fullWidth
                            className={cn(
                              'justify-between font-normal aria-[invalid=true]:border-error',
                              !value && 'text-muted-foreground'
                            )}
                          >
                            <div className="flex grow items-center justify-between">
                              {value.length
                                ? value
                                    .map(
                                      (category) =>
                                        categories(t).find(
                                          (c) => c.value === category
                                        )?.label
                                    )
                                    .join(', ')
                                : t('Projects.select_categories')}
                              <AngleDownSmallIcon className="ml-2 h-5 w-5 shrink-0 opacity-50" />
                            </div>
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent align="end" className="w-[200px] p-0">
                        <Command>
                          <CommandInput
                            placeholder={t('Projects.search_category')}
                          />
                          <CommandEmpty>
                            {t('Projects.no_category_found')}
                          </CommandEmpty>
                          <CommandGroup>
                            {categories(t).map((category) => (
                              <CommandItem
                                value={category.value}
                                key={category.value}
                                onSelect={(val) => {
                                  const index = value.indexOf(val)
                                  if (index !== -1) {
                                    form.setValue(
                                      'categories',
                                      value.filter((v) => v !== val)
                                    )
                                  } else {
                                    if (value.length >= MAX_CATEGORIES) return
                                    form.clearErrors(field.name)
                                    form.setValue('categories', [...value, val])
                                  }
                                }}
                              >
                                <CheckIcon
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    value.includes(category.value)
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                                {category.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormDescription>
                    {t('Projects.categories_max')}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('Projects.description')}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t('Projects.description_placeholder')}
                      className="min-h-[240px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>

        <section className="grid grid-cols-3 border-b border-muted p-6">
          <div>
            <p>{t('Projects.location')}</p>
          </div>
          <div className="col-span-2 grid grid-cols-1 gap-3">
            <FormField
              control={form.control}
              name="location.country"
              render={({ field: { value, ...field } }) => (
                <FormItem>
                  <FormLabel>{t('Projects.country')}</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            fullWidth
                            className={cn(
                              'justify-between px-3 font-normal aria-[invalid=true]:border-error',
                              !value && 'text-muted-foreground'
                            )}
                          >
                            <div className="flex grow items-center justify-between">
                              {value.length ? value : 'Select a country'}
                              <AngleDownSmallIcon className="ml-2 h-5 w-5 shrink-0 opacity-50" />
                            </div>
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent align="end" className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search country..." />
                          <CommandEmpty>
                            {t('Projects.country_not_found')}
                          </CommandEmpty>
                          <CommandGroup>
                            <ScrollArea className="h-72 w-full">
                              {countries.map((country) => (
                                <CommandItem
                                  value={country}
                                  key={country}
                                  onSelect={(val) => {
                                    form.clearErrors(field.name)
                                    form.setValue(
                                      'location.country',
                                      capitalize(val)
                                    )
                                  }}
                                >
                                  <CheckIcon
                                    className={cn(
                                      'mr-2 h-4 w-4',
                                      country === value
                                        ? 'opacity-100'
                                        : 'opacity-0'
                                    )}
                                  />
                                  {country}
                                </CommandItem>
                              ))}
                            </ScrollArea>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location.city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('Projects.city')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    {t('Projects.city_description')}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>

        <section className="grid grid-cols-3 border-b border-muted p-6">
          <div>
            <p>{t('Projects.links')}</p>
            <p className="text-sm text-muted-foreground">{`(${t(
              'General.optional'
            )})`}</p>
          </div>
          <div className="col-span-2 grid grid-cols-1 gap-3">
            {socials.map(({ name, icon: Icon }, index) => (
              <FormField
                key={name}
                control={form.control}
                name="links"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormControl nested index={index}>
                      <Input
                        leftSection={<Icon />}
                        placeholder={name}
                        value={
                          value.find((link) => link.name === name)?.link || ''
                        }
                        onChange={(event) => {
                          const { value: val } = event.target

                          let newValue = [...value]
                          const index = newValue.findIndex(
                            (i) => i.name === name
                          )
                          newValue.splice(index, 1, {
                            name,
                            link: !val ? undefined : val,
                          })
                          onChange(newValue)
                        }}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage nested index={index} />
                  </FormItem>
                )}
              />
            ))}
          </div>
        </section>

        {error && (
          <section className="p-3">
            <Alert variant="destructive">
              <AlertTitle>{t('Projects.errors.title')}</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </section>
        )}

        <section className="flex justify-end gap-6 p-6">
          <Button onClick={onCancel} variant="ghost" disabled={isPending}>
            {t('General.cancel')}
          </Button>
          <Button
            type="submit"
            loading={isPending}
            disabled={!form.formState.isDirty}
          >
            {isPending
              ? t('General.saving') + '...'
              : action === 'create'
              ? t('General.continue')
              : t('General.saving_changes') + '...'}
          </Button>
        </section>
      </form>
    </Form>
  )
}
