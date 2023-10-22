'use client'

import { COUNTRIES } from '@/constants/countries'
import { categories } from '@/constants/projects'
import { ErrorCode } from 'react-dropzone'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

import { Translator } from '@/lib/dictionaries'
import { cn } from '@/lib/utils'
import { SOCIALS } from '@/lib/validations/global'
import {
  createProjectSchema,
  MAX_CATEGORIES,
  MAX_FILE_SIZE,
  SUMMARY_MAX_LENGTH,
} from '@/lib/validations/project'
import { Divider } from '@/components/ui/divider'
import { Dropzone, IMAGE_MIME_TYPE } from '@/components/ui/drop-zone'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { TextField } from '@/components/ui/text-field'
import { Textarea } from '@/components/ui/textarea'
import { Combobox } from '@/components/combobox'
import { Icons } from '@/components/icons'
import { useDictionary } from '@/components/providers/dictionary-provider'

interface ProjectInputsProps {
  form: UseFormReturn<z.infer<typeof createProjectSchema>>
  icon_url?: string
  disabled?: boolean
}

type Category = {
  value: string
  label: string
}

const customFileErrorMessages = (t: Translator): Record<ErrorCode, string> => ({
  [ErrorCode.FileTooLarge]: t('Errors.file_too_large'),
  [ErrorCode.FileTooSmall]: t('Errors.file_too_small'),
  [ErrorCode.FileInvalidType]: t('Errors.file_invalid_type'),
  [ErrorCode.TooManyFiles]: t('Errors.too_many_files'),
})

export const ProjectInputs = ({
  form,
  icon_url = '',
  disabled,
}: ProjectInputsProps) => {
  const { t } = useDictionary()
  const { t: tCategories } = useDictionary('Categories')

  return (
    <>
      <section className="grid grid-cols-1 gap-y-3 md:grid-cols-3">
        <div>
          <p className="text-label-lg">{t('Projects.basic_info')}</p>
        </div>
        <div className="col-span-2 grid grid-cols-1 gap-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <TextField
                    label={t('Projects.name')}
                    disabled={disabled}
                    {...field}
                  />
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
                <FormControl>
                  <TextField
                    label={t('Projects.summary')}
                    disabled={disabled}
                    {...field}
                  />
                </FormControl>
                <FormDescription className="flex gap-4">
                  {t('Projects.summary_description')}
                  <span
                    className={cn(
                      'ml-auto block shrink-0',
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
      <Divider />
      <section className="grid grid-cols-1 gap-y-3 md:grid-cols-3">
        <div>
          <p className="text-label-lg">{t('Projects.details')}</p>
        </div>
        <div className="col-span-2 grid grid-cols-1 gap-3">
          <div className="flex gap-3">
            <div className="grow">
              <FormField
                control={form.control}
                name="file"
                render={({ field: { onChange, ...field } }) => (
                  <FormItem>
                    <FormControl>
                      <Dropzone
                        disabled={disabled}
                        accept={IMAGE_MIME_TYPE}
                        className="flex gap-3"
                        maxSize={MAX_FILE_SIZE}
                        maxFiles={1}
                        onDropAccepted={(files) => {
                          const file = files[0]
                          if (file) {
                            onChange(file)
                            form.clearErrors(field.name)
                          } else {
                            form.resetField(field.name)
                          }
                        }}
                        onDropRejected={(fileRejections) => {
                          if (fileRejections.length > 0) {
                            form.setError(field.name, {
                              message:
                                customFileErrorMessages(t)[
                                  fileRejections[0].errors[0].code as ErrorCode
                                ],
                            })
                          }
                        }}
                        {...field}
                      >
                        <Dropzone.Preview>
                          {form.getValues('file') !== undefined || icon_url ? (
                            /**
                             * use of <img/> instead of next <Image/> to avoid caching
                             * and always show the last updated icon
                             */
                            <img
                              src={
                                form.getValues('file')
                                  ? URL.createObjectURL(form.getValues('file'))
                                  : icon_url
                              }
                              alt="preview"
                              className="h-full w-full object-fill animate-in zoom-in-50"
                            />
                          ) : (
                            <>
                              <Dropzone.Idle>
                                <Icons.imageUpload />
                              </Dropzone.Idle>
                              <Dropzone.Accept>
                                <Icons.checkSquare />
                              </Dropzone.Accept>
                              <Dropzone.Reject>
                                <Icons.errorSquare />
                              </Dropzone.Reject>
                            </>
                          )}
                        </Dropzone.Preview>
                        <Dropzone.Content>
                          <Dropzone.Label>{t('Projects.icon')}</Dropzone.Label>
                          <p>
                            <span className="font-medium underline">
                              {t('General.click_to_upload')}
                            </span>{' '}
                            <span className="opacity-50">
                              {t('General.or_drag')}
                            </span>
                          </p>
                          <p className="text-body-sm opacity-50">
                            {`PNG, JPG or WEBP (max. ${
                              MAX_FILE_SIZE / 1024
                            }kb)`}
                          </p>
                        </Dropzone.Content>
                      </Dropzone>
                    </FormControl>
                    <FormDescription>
                      {t('Projects.icon_description')}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="categories"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Combobox
                    disabled={disabled}
                    multiple
                    label={t('Projects.categories')}
                    placeholder={t('Projects.select_categories')}
                    emptyState={t('Projects.nothing_found')}
                    displayValue={(categories: Category[]) =>
                      categories.map((c: Category) => c.label).join(' & ')
                    }
                    defaultValue={categories(tCategories).filter((c) =>
                      field.value.includes(c.value)
                    )}
                    maxItems={MAX_CATEGORIES}
                    closeOnSelect={false}
                    onValueChange={(newValue) => {
                      if (newValue) {
                        form.setValue(
                          'categories',
                          newValue.map((v: Category) => v.value)
                        )
                        form.clearErrors(field.name)
                      }
                    }}
                  >
                    {categories(tCategories).map((category) => (
                      <Combobox.Item key={category.value} value={category}>
                        {category.label}
                      </Combobox.Item>
                    ))}
                  </Combobox>
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
                <FormControl>
                  <Textarea
                    disabled={disabled}
                    label={t('Projects.description')}
                    placeholder={t('Projects.description_placeholder')}
                    className="min-h-[280px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </section>
      <Divider />
      <section className="grid grid-cols-1 gap-y-3 md:grid-cols-3">
        <div>
          <p className="text-label-lg">{t('Projects.location')}</p>
        </div>
        <div className="col-span-2 grid grid-cols-1 gap-3">
          <FormField
            control={form.control}
            name="location.country"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Combobox
                    disabled={disabled}
                    label={t('Projects.country')}
                    placeholder={t('Projects.select_country')}
                    emptyState={t('Projects.nothing_found')}
                    displayValue={(country: string) =>
                      COUNTRIES[country as keyof typeof COUNTRIES]?.name
                    }
                    defaultValue={
                      COUNTRIES[field.value as keyof typeof COUNTRIES]?.name ??
                      ''
                    }
                    onValueChange={(newValue) => {
                      if (newValue) {
                        form.setValue('location.country', newValue)
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
                <FormControl>
                  <TextField
                    label={t('Projects.city')}
                    disabled={disabled}
                    {...field}
                  />
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
      <Divider />
      <section className="grid grid-cols-1 gap-y-3 md:grid-cols-3">
        <div>
          <p className="text-label-lg">{t('Projects.links')}</p>
          <p className="muted text-body-sm">{`(${t('Projects.optional')})`}</p>
        </div>
        <div className="col-span-2 grid grid-cols-1 gap-3">
          {SOCIALS.map(({ name, icon: Icon }, index) => (
            <FormField
              key={name}
              control={form.control}
              name="links"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormControl nested index={index}>
                    <TextField
                      disabled={disabled}
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
