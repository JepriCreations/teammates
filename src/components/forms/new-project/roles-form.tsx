'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  EXPERIENCE_LEVEL,
  REWARDS,
  ROLES,
  WORK_MODE,
} from '@/constants/projects'
import { routes } from '@/constants/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { ExperienceLevel, Rewards, Roles, WorkMode } from '@/types/collections'
import { Translator } from '@/lib/dictionaries'
import { cn } from '@/lib/utils'
import { roleSquema } from '@/lib/validations/project'
import { useRoles } from '@/hooks/useRoles'
import { useToast } from '@/hooks/useToast'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import {
  AddIcon,
  AngleDownSmallIcon,
  CheckIcon,
  TrashIcon,
} from '@/components/icons'
import { useDictionary } from '@/components/providers/dictionary-provider'
import { useNewProjectFormState } from '@/components/providers/new-project-form-provider'

const defaultValues = {
  name: undefined,
  exp_level: ExperienceLevel.Intermediate,
  work_mode: WorkMode.Remote,
  description: '',
  rewards: [],
}

const rewardsDescriptions = (t: Translator) => ({
  [Rewards.Percent]: t('Roles.Rewards.percent_description'),
  [Rewards.Contract]: t('Roles.Rewards.contract_description'),
  [Rewards.Credit]: t('Roles.Rewards.credit_description'),
})

export const RolesForm = () => {
  const { toast } = useToast()
  const { t } = useDictionary()
  const { projectId } = useNewProjectFormState()
  const [error, setError] = useState(null)
  const { isPending, addRoles } = useRoles()
  const [roles, setRoles] = useState<z.infer<typeof roleSquema>[]>([])
  const router = useRouter()

  const roleForm = useForm<z.infer<typeof roleSquema>>({
    resolver: zodResolver(roleSquema),
    defaultValues,
  })

  const onSubmitRole = (values: z.infer<typeof roleSquema>) => {
    setRoles((prev) => [...prev, values])
    roleForm.reset(defaultValues)
  }

  const onSubmit = async () => {
    if (projectId) {
      const { error } = await addRoles(roles, projectId)
      if (error) {
        setError(error?.message ?? t('Roles.errors.saving'))
      }
      toast({
        title: t('General.success'),
        description: t('Roles.the_roles_has_been_added'),
        severity: 'success',
      })
      router.replace(routes.PROJECTS)
    }
  }

  const onOmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    router.replace(routes.PROJECTS)
  }

  return (
    <>
      <section className="relative overflow-hidden border-b border-muted p-6">
        <Form {...roleForm}>
          <form
            onSubmit={roleForm.handleSubmit(onSubmitRole)}
            className="grid gap-3"
          >
            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={roleForm.control}
                name="name"
                render={({ field: { value: fieldValue, ...field } }) => (
                  <FormItem>
                    <FormLabel>{t('Roles.role')}</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              fullWidth
                              className={cn(
                                'h-10 justify-between px-3 py-2 font-normal aria-[invalid=true]:border-error',
                                !fieldValue && 'text-muted-foreground'
                              )}
                            >
                              <div className="flex grow items-center justify-between">
                                {fieldValue?.length
                                  ? t(`Roles.${fieldValue}`)
                                  : t('Roles.select_a_role')}
                                <AngleDownSmallIcon className="ml-2 h-5 w-5 shrink-0 opacity-50" />
                              </div>
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent align="end" className="p-0">
                          <Command>
                            <CommandInput
                              placeholder={t('Roles.search_role')}
                            />
                            <CommandEmpty>
                              {t('Roles.no_role_found')}
                            </CommandEmpty>
                            <CommandGroup>
                              <ScrollArea className="h-64 w-full">
                                {ROLES(t).map(({ value, label }) => (
                                  <CommandItem
                                    key={value}
                                    value={value}
                                    onSelect={(val) => {
                                      roleForm.clearErrors(field.name)
                                      field.onChange(val as Roles)
                                    }}
                                  >
                                    <CheckIcon
                                      className={cn(
                                        'mr-2 h-4 w-4',
                                        value === fieldValue
                                          ? 'opacity-100'
                                          : 'opacity-0'
                                      )}
                                    />
                                    {label}
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
                control={roleForm.control}
                name="exp_level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Roles.experience_level')}</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) =>
                          field.onChange(value as ExperienceLevel)
                        }
                        value={field.value}
                      >
                        <SelectTrigger>
                          {field.value ? (
                            <span>{t(`Roles.Levels.${field.value}`)}</span>
                          ) : (
                            <span className="text-muted-foreground">
                              {t('Roles.select_level')}
                            </span>
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
              control={roleForm.control}
              name="work_mode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('Roles.work_mode')}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) =>
                        field.onChange(value as WorkMode)
                      }
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
                          <FormLabel className="text-base font-normal text-foreground">
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
              control={roleForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('Roles.role_description')}</FormLabel>
                  <FormControl>
                    <Textarea className="min-h-[150px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={roleForm.control}
              name="rewards"
              render={() => (
                <FormItem>
                  <FormLabel>{t('Roles.rewards')}</FormLabel>
                  {REWARDS(t).map((reward) => (
                    <FormField
                      key={reward.value}
                      control={roleForm.control}
                      name="rewards"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={reward.value}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
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
                              <FormLabel className="block text-base leading-none text-foreground">
                                {reward.label}
                              </FormLabel>
                              <FormDescription>
                                {
                                  rewardsDescriptions(t)[
                                    reward.value as Rewards
                                  ]
                                }
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
            <footer>
              <Button
                type="submit"
                wrapperClassName="ml-auto"
                icon={<AddIcon />}
              >
                {t('Roles.add_role')}
              </Button>
            </footer>
          </form>
        </Form>
      </section>
      <section className="relative overflow-hidden border-b border-muted p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[30%]">{t('Roles.role')}</TableHead>
              <TableHead>{t('Roles.experience_level')}</TableHead>
              <TableHead>{t('Roles.work_mode')}</TableHead>
              <TableHead className="text-right">{t('Roles.rewards')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.length === 0 && (
              <TableRow>
                <TableCell className="w-[30%] font-medium">
                  {t('Roles.no_roles_created')}
                </TableCell>
              </TableRow>
            )}
            {roles.map(({ name, exp_level, work_mode, rewards }, index) => (
              <TableRow key={`role-${name}-${index}`}>
                <TableCell className="w-[25%] font-medium">{t(name)}</TableCell>
                <TableCell>{t(`Roles.Levels.${exp_level}`)}</TableCell>
                <TableCell>{t(`Roles.Workmode.${work_mode}`)}</TableCell>
                <TableCell className="text-right">
                  {rewards
                    .map((reward) => t(`Roles.Rewards.${reward}`))
                    .join(', ')}
                </TableCell>
                <TableCell className="w-fit">
                  <Button
                    onClick={() =>
                      setRoles((prev) => {
                        const rolesList = [...prev]
                        rolesList.splice(index, 1)
                        return rolesList
                      })
                    }
                    icon={<TrashIcon />}
                    variant="ghost"
                    className="p-2"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      {error && (
        <section className="p-3">
          <Alert variant="destructive">
            <AlertTitle>{t('General.ups')}</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </section>
      )}

      <section className="flex justify-end gap-6 p-6">
        <Button onClick={onOmit} variant="ghost" disabled={isPending}>
          {t('Roles.omit')}
        </Button>
        <Button
          onClick={onSubmit}
          loading={isPending}
          disabled={!Boolean(roles.length)}
        >
          {isPending ? `${t('General.saving')}...` : t('Roles.save_roles')}
        </Button>
      </section>
    </>
  )
}
