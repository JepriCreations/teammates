'use client'

import {
  EXPERIENCE_LEVEL,
  REWARDS,
  ROLES,
  WORK_MODE,
} from '@/constants/projects'
import { type UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

import { ExperienceLevel, Rewards, Roles, WorkMode } from '@/types/collections'
import { Translator } from '@/lib/dictionaries'
import { cn } from '@/lib/utils'
import { roleSchema } from '@/lib/validations/project'
import { Checkbox } from '@/components/ui/checkbox'
import { CommandItem } from '@/components/ui/command'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Combobox } from '@/components/combobox'
import { CheckIcon } from '@/components/icons'
import { useDictionary } from '@/components/providers/dictionary-provider'

const rewardsDescriptions = (t: Translator) => ({
  [Rewards.Percent]: t('Rewards.percent_description'),
  [Rewards.Contract]: t('Rewards.contract_description'),
  [Rewards.Credit]: t('Rewards.credit_description'),
})

interface RoleInputsProps {
  form: UseFormReturn<z.infer<typeof roleSchema>>
  disabled?: boolean
}

export const RoleInputs = ({ form, disabled }: RoleInputsProps) => {
  const { t } = useDictionary('Roles')

  return (
    <div className="grid gap-3">
      <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field: { value: fieldValue, ...field } }) => (
            <FormItem>
              <FormLabel>{t('role')}</FormLabel>
              <FormControl>
                <Combobox
                  disabled={disabled}
                  value={fieldValue}
                  triggerContent={
                    fieldValue?.length ? t(fieldValue) : t('select_a_role')
                  }
                  commandProps={{
                    placeholder: t('search_category'),
                    emptyText: t('no_category_found'),
                    content: (
                      <ScrollArea className="h-64 w-full">
                        {ROLES(t).map(({ value, label }) => (
                          <CommandItem
                            key={value}
                            value={value}
                            onSelect={(val) => {
                              form.clearErrors(field.name)
                              field.onChange(val as Roles)
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                'absolute left-2 flex h-6 w-6',
                                value === fieldValue
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                            {label}
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
          name="exp_level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('experience_level')}</FormLabel>
              <FormControl>
                <Select
                  disabled={disabled}
                  onValueChange={(value) =>
                    field.onChange(value as ExperienceLevel)
                  }
                  value={field.value}
                >
                  <SelectTrigger>
                    {field.value ? (
                      <span>{t(`Levels.${field.value}`)}</span>
                    ) : (
                      <span className="text-outline">{t('select_level')}</span>
                    )}
                  </SelectTrigger>
                  <SelectContent>
                    {EXPERIENCE_LEVEL(t).map(({ value, label }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
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
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('role_description')}</FormLabel>
            <FormControl>
              <Textarea
                disabled={disabled}
                className="min-h-[150px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
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
