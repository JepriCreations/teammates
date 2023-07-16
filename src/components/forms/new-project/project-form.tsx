'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { countries } from '@/constants/countries'
import { routes } from '@/constants/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { capitalize, cn } from '@/lib/utils'
import {
  MAX_CATEGORIES,
  projectSquema,
  socials,
  SUMMARY_MAX_LENGTH,
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
import { useNewProjectFormState } from '@/components/providers/new-project-form-provider'

const categories = [
  { value: 'technology', label: 'Technology' },
  { value: 'cience', label: 'Cience' },
  { value: 'literature', label: 'Literature' },
  { value: 'art', label: 'Art' },
] as const

const defaultSocialLinks = socials.map((s) => ({
  name: s.name,
  link: '',
}))

export const ProjectForm = () => {
  const { toast } = useToast()
  const { onNext } = useNewProjectFormState()
  const router = useRouter()
  const { isPending, create } = useProjects()
  const [error, setError] = useState(null)
  const form = useForm<z.infer<typeof projectSquema>>({
    resolver: zodResolver(projectSquema),
    defaultValues: {
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

  const onSubmit = async (values: z.infer<typeof projectSquema>) => {
    const { error, data } = await create(values)
    if (error || !data?.id) {
      setError(error?.message ?? 'Error saving data.')
      return
    }
    toast({
      title: 'Success!',
      description: 'The project has been created.',
      severity: 'success',
    })
    onNext(data?.id)
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
            <p>Basic Info</p>
          </div>
          <div className="col-span-2 grid grid-cols-1 gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project name</FormLabel>
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
                  <FormLabel>Summary</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Summarize what your project aims to achieve in one line.
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
            <p>Project details</p>
          </div>
          <div className="col-span-2 grid grid-cols-1 gap-3">
            <div className="flex gap-3">
              <div className="grow">
                <FormField
                  control={form.control}
                  name="file"
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>Icon</FormLabel>
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
                        The icon image should have an aspect ratio of 1/1 for a
                        better looking. The formats allowed are .png, .jpg,
                        .webp
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="relative mt-[28px] h-20 w-20 shrink-0 overflow-hidden border border-border bg-foreground/10">
                {form.watch('file') && form.getValues('file') !== undefined && (
                  <Image
                    src={URL.createObjectURL(form.getValues('file')!)}
                    fill
                    alt="preview"
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
                  <FormLabel>Categories</FormLabel>
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
                                        categories.find(
                                          (cate) => cate.value === category
                                        )?.label
                                    )
                                    .join(', ')
                                : 'Select categories'}
                              <AngleDownSmallIcon className="ml-2 h-5 w-5 shrink-0 opacity-50" />
                            </div>
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent align="end" className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search category..." />
                          <CommandEmpty>No category found.</CommandEmpty>
                          <CommandGroup>
                            {categories.map((category) => (
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
                    Choose a maximum of 2 categories that represent your
                    project.
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Craft a captivating and concise description that showcases the core of your project. Clearly convey your project's purpose, goals, and any specific requirements to attract potential teammates. A well-written description will help others visualize themselves joining your project and contribute their skills and passion. By providing a clear and engaging summary, you increase the likelihood of finding like-minded individuals eager to collaborate and bring your project to life."
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
            <p>Location</p>
          </div>
          <div className="col-span-2 grid grid-cols-1 gap-3">
            <FormField
              control={form.control}
              name="location.country"
              render={({ field: { value, ...field } }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
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
                          <CommandEmpty>No country found.</CommandEmpty>
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
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Specialy usefull when you project require teammates near
                    you.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>

        <section className="grid grid-cols-3 border-b border-muted p-6">
          <div>
            <p>Links</p>
            <p className="text-sm text-muted-foreground">{'(optional)'}</p>
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
              <AlertTitle>Upps! This is embarrasing.</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </section>
        )}

        <section className="flex justify-end gap-6 p-6">
          <Button onClick={onCancel} variant="ghost" disabled={isPending}>
            Cancel
          </Button>
          <Button type="submit" loading={isPending}>
            {isPending ? 'Saving...' : 'Continue'}
          </Button>
        </section>
      </form>
    </Form>
  )
}
