'use client'

import { countries } from '@/constants/countries'
import { categories } from '@/constants/projects'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

import { capitalize, cn } from '@/lib/utils'
import {
  createProjectSchema,
  MAX_CATEGORIES,
  socials,
  SUMMARY_MAX_LENGTH,
} from '@/lib/validations/project'
import { CommandItem } from '@/components/ui/command'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { Combobox } from '@/components/combobox'
import { CheckIcon, ImageUploadIcon } from '@/components/icons'
import { useDictionary } from '@/components/providers/dictionary-provider'

interface ProjectInputsProps {
  form: UseFormReturn<z.infer<typeof createProjectSchema>>
  icon_url?: string
  disabled?: boolean
}

export const ProjectInputs = ({
  form,
  icon_url = '',
  disabled,
}: ProjectInputsProps) => {
  const { t } = useDictionary('Projects')
  const { t: categoriesT } = useDictionary('Categories')

  return (
    <>
      <section className="grid grid-cols-3 border-b border-outline/38 p-6">
        <div>
          <p>{t('basic_info')}</p>
        </div>
        <div className="col-span-2 grid grid-cols-1 gap-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('name')}</FormLabel>
                <FormControl>
                  <Input disabled={disabled} variant="card" {...field} />
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
                <FormLabel>{t('summary')}</FormLabel>
                <FormControl>
                  <Input disabled={disabled} variant="card" {...field} />
                </FormControl>
                <FormDescription>
                  {t('summary_description')}
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
      <section className="grid grid-cols-3 border-b border-outline/38 p-6">
        <div>
          <p>{t('details')}</p>
        </div>
        <div className="col-span-2 grid grid-cols-1 gap-3">
          <div className="flex gap-3">
            <div className="grow">
              <FormField
                control={form.control}
                name="file"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>{t('icon')}</FormLabel>
                    <FormControl>
                      <Input
                        disabled={disabled}
                        leftSection={
                          <ImageUploadIcon className="text-outline" />
                        }
                        type="file"
                        accept="image/*"
                        variant="card"
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
                    <FormDescription>{t('icon_description')}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="relative mt-[28px] h-20 w-20 shrink-0 overflow-hidden rounded-md border-2 border-outline/38 bg-onSurface/10">
              {(form.getValues('file') !== undefined || icon_url) && (
                /**
                 * use of <img/> instead of next <Image/> to avoid chaching
                 * and always show the last updated icon
                 */
                <img
                  src={
                    form.getValues('file')
                      ? URL.createObjectURL(form.getValues('file'))
                      : icon_url
                  }
                  alt="preview"
                  sizes="(max-width: 80px) 100vw"
                  className="h-full w-full animate-in zoom-in-50"
                />
              )}
            </div>
          </div>
          <FormField
            control={form.control}
            name="categories"
            render={({ field: { value, ...field } }) => (
              <FormItem>
                <FormLabel>{t('categories')}</FormLabel>
                <FormControl>
                  <Combobox
                    disabled={disabled}
                    value={value}
                    triggerContent={
                      value.length
                        ? value
                            .map(
                              (category) =>
                                categories(categoriesT).find(
                                  (c) => c.value === category
                                )?.label
                            )
                            .join(', ')
                        : t('select_categories')
                    }
                    commandProps={{
                      placeholder: t('search_category'),
                      emptyText: t('no_category_found'),
                      content: (
                        <ScrollArea className="h-72 w-full">
                          {categories(categoriesT).map((category) => (
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
                                  'absolute left-2 flex h-6 w-6',
                                  value.includes(category.value)
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                              {category.label}
                            </CommandItem>
                          ))}
                        </ScrollArea>
                      ),
                    }}
                  />
                </FormControl>
                <FormDescription>{t('categories_max')}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('description')}</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={disabled}
                    variant="card"
                    placeholder={t('description_placeholder')}
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

      <section className="grid grid-cols-3 border-b border-outline/38 p-6">
        <div>
          <p>{t('location')}</p>
        </div>
        <div className="col-span-2 grid grid-cols-1 gap-3">
          <FormField
            control={form.control}
            name="location.country"
            render={({ field: { value, ...field } }) => (
              <FormItem>
                <FormLabel>{t('country')}</FormLabel>
                <FormControl>
                  <Combobox
                    disabled={disabled}
                    value={value}
                    triggerContent={value.length ? value : 'Select a country'}
                    commandProps={{
                      placeholder: t('search_country'),
                      emptyText: t('country_not_found'),
                      content: (
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
                                  'absolute left-2 flex h-6 w-6',
                                  country === value
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                              {country}
                            </CommandItem>
                          ))}
                        </ScrollArea>
                      ),
                    }}
                  />
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
                <FormLabel>{t('city')}</FormLabel>
                <FormControl>
                  <Input variant="card" disabled={disabled} {...field} />
                </FormControl>
                <FormDescription>{t('city_description')}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </section>

      <section className="grid grid-cols-3 border-b border-outline/38 p-6">
        <div>
          <p>{t('links')}</p>
          <p className="text-body-md text-outline">{`(${t('optional')})`}</p>
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
                      disabled={disabled}
                      variant="card"
                      leftSection={<Icon className="text-outline" />}
                      placeholder={name}
                      value={
                        value.find((link) => link.name === name)?.link || ''
                      }
                      onChange={(event) => {
                        const { value: val } = event.target

                        let newValue = [...value]
                        const index = newValue.findIndex((i) => i.name === name)
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
    </>
  )
}
