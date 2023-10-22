'use client'

import {
  EXPERIENCE_LEVEL,
  REWARDS,
  ROLES,
  WORK_MODE,
  type Category,
} from '@/constants/projects'
import { type UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

import { ExperienceLevel, Rewards, WorkMode } from '@/types/collections'
import { Translator } from '@/lib/dictionaries'
import { roleSchema } from '@/lib/validations/role'
import { Checkbox } from '@/components/ui/checkbox'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Combobox } from '@/components/combobox'
import { useDictionary } from '@/components/providers/dictionary-provider'

const rewardsDescriptions = (t: Translator) => ({
  [Rewards.Percent]: t('Rewards.percent_description'),
  [Rewards.Contract]: t('Rewards.contract_description'),
  [Rewards.Credit]: t('Rewards.credit_description'),
})

interface RoleInputsProps {
  form: UseFormReturn<z.infer<typeof roleSchema>>
  categories: string[]
  disabled?: boolean
}

export const RoleInputs = ({ form, categories, disabled }: RoleInputsProps) => {
  const { t } = useDictionary('Roles')

  return (
    <div className="grid gap-3">
      <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field: { value: fieldValue, ...field } }) => (
            <FormItem>
              <FormControl>
                <Combobox
                  disabled={disabled}
                  label={t('role')}
                  placeholder={t('select_a_role')}
                  emptyState={t('no_category_found')}
                  displayValue={(role: { label: string; value: string }) =>
                    role.label
                  }
                  onValueChange={(newValue) => {
                    if (newValue) {
                      form.setValue('name', newValue.value)
                      form.clearErrors(field.name)
                    }
                  }}
                >
                  {ROLES(t, categories as Category[]).map((role) => (
                    <Combobox.Item key={role.value} value={role}>
                      {role.label}
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
          name="exp_level"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select
                  disabled={disabled}
                  onValueChange={(value) =>
                    field.onChange(value as ExperienceLevel)
                  }
                  value={field.value}
                >
                  <Select.Trigger
                    placeholder={t('select_level')}
                    label={t('experience_level')}
                  />
                  <Select.Content>
                    {EXPERIENCE_LEVEL(t).map(({ value, label }) => (
                      <Select.Item key={value} value={value}>
                        {label}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="work_mode"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('work_mode')}</FormLabel>
            <FormControl>
              <RadioGroup
                disabled={disabled}
                onValueChange={(value) => field.onChange(value as WorkMode)}
                value={field.value}
                className="flex gap-6"
              >
                {WORK_MODE(t).map((mode) => (
                  <FormItem
                    key={mode.value}
                    className="flex items-center space-x-3 space-y-0"
                  >
                    <FormControl>
                      <RadioGroupItem value={mode.value} />
                    </FormControl>
                    <FormLabel className="text-body-lg font-normal text-onSurface">
                      {mode.label}
                    </FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="mt-3">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  disabled={disabled}
                  className="min-h-[150px]"
                  label={t('role_description')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="rewards"
        render={() => (
          <FormItem>
            <FormLabel>{t('rewards')}</FormLabel>
            {REWARDS(t).map((reward) => (
              <FormField
                key={reward.value}
                control={form.control}
                name="rewards"
                render={({ field }) => {
                  return (
                    <FormItem
                      key={reward.value}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          disabled={disabled}
                          checked={field.value?.includes(reward.value)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange(
                                  field?.value
                                    ? [...field?.value, reward.value]
                                    : [reward.value]
                                )
                              : field.onChange(
                                  field.value?.filter(
                                    (value) => value !== reward.value
                                  )
                                )
                          }}
                        />
                      </FormControl>
                      <div className="pb-2">
                        <FormLabel className="block text-base leading-none text-onSurface">
                          {reward.label}
                        </FormLabel>
                        <FormDescription>
                          {rewardsDescriptions(t)[reward.value as Rewards]}
                        </FormDescription>
                      </div>
                    </FormItem>
                  )
                }}
              />
            ))}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
