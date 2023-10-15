'use client'

import * as React from 'react'
import { VariantProps } from 'class-variance-authority'

import { createSafeContext } from '@/lib/createSafeContext'
import { cn } from '@/lib/utils'
import { useControllableState } from '@/hooks/use-controllable-state'
import { Command } from '@/components/ui/command'
import { Label } from '@/components/ui/label'
import { Popover } from '@/components/ui/popover'
import {
  selectLabelVariants,
  selectTriggerVariants,
} from '@/components/ui/select'
import { Icons } from '@/components/icons'

interface ComboboxContextValue {
  isSelected: (value: any) => boolean
  onSelect: (value: any) => void
}

export const [ComboboxProvider, useComboboxContext] =
  createSafeContext<ComboboxContextValue>({
    name: 'ComboboxContext',
  })

interface ComboboxCommonProps<TValue> {
  children: React.ReactNode
  closeOnSelect?: boolean
  defaultOpen?: boolean
  disabled?: boolean
  displayValue?: (item: TValue) => string
  emptyState?: React.ReactNode
  inputPlaceholder?: string
  label?: string
  onOpenChange?: (open: boolean) => void
  onSearchChange?: (search: string) => void
  onValueChange?(value: TValue | null): void
  open?: boolean
  placeholder?: string
  search?: string
  value?: TValue | null
  variant?: VariantProps<typeof selectTriggerVariants>['variant']
  error?: string
}

type ComboboxFilterProps =
  | {
      shouldFilter?: true
      filterFn?: React.ComponentProps<typeof Command>['filter']
    }
  | {
      shouldFilter: false
      filterFn?: never
    }

type ComboboxValueProps<TValue> =
  | {
      multiple?: false
      maxItems?: undefined | null
      defaultValue?: TValue | null
    }
  | {
      multiple: true
      maxItems?: number
      defaultValue?: TValue | TValue[] | null
    }

export type ComboboxProps<TValue> = ComboboxCommonProps<TValue> &
  ComboboxValueProps<TValue> &
  ComboboxFilterProps

export interface ComboboxTriggerProps {
  children: React.ReactNode
  className?: string
  disabled?: boolean
  label?: string
  error?: string
  placeholder?: string
  variant?: VariantProps<typeof selectTriggerVariants>['variant']
}

const Trigger = ({
  label,
  error,
  variant,
  children,
  className,
  placeholder,
  disabled,
}: ComboboxTriggerProps) => {
  const hasLabel = !!label
  const hasPlaceholder = !!placeholder
  const isInvalid = !!error
  return (
    <div className="relative w-full min-w-[200px]">
      <Popover.Trigger
        disabled={disabled}
        data-label={hasLabel ? '' : undefined}
        data-placeholder={hasPlaceholder ? '' : undefined}
        aria-invalid={isInvalid}
        className={cn(
          selectTriggerVariants({ variant, className }),
          'text-start'
        )}
      >
        {children}
        <div
          aria-label="Combobox Icon"
          className="absolute right-2 top-2/4 grid -translate-y-2/4 place-items-center text-onSurfaceVariant/70 transition-transform group-disabled:text-onSurface/38 group-data-[state=open]:rotate-180"
        >
          <Icons.angleDownSmall className={cn('h-5 w-5')} />
        </div>
      </Popover.Trigger>
      {hasLabel && (
        <Label className={cn(selectLabelVariants({ variant }))}>{label}</Label>
      )}
    </div>
  )
}

export const ComboboxRoot = <TValue,>({
  children,
  closeOnSelect = true,
  defaultOpen,
  defaultValue,
  disabled,
  displayValue,
  emptyState = 'Nothing found.',
  filterFn,
  inputPlaceholder = '',
  label,
  maxItems,
  multiple = false,
  onOpenChange,
  onSearchChange,
  onValueChange,
  open: openProp,
  placeholder = '',
  search,
  shouldFilter = true,
  value: valueProp,
  variant,
  error,
}: ComboboxProps<TValue>) => {
  const [open = false, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  })
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: (state) => {
      onValueChange?.(state as unknown as TValue)
    },
  })

  const isSelected = (selectedValue: unknown) => {
    if (Array.isArray(value)) {
      return value
        .map((i) => JSON.stringify(i))
        .includes(JSON.stringify(selectedValue))
    }
    return value === selectedValue
  }

  const handleSelect = (selectedValue: TValue) => {
    let newValue: TValue | TValue[] | null = selectedValue

    if (multiple) {
      if (Array.isArray(value)) {
        if (isSelected(selectedValue)) {
          newValue = value.filter(
            (val) => JSON.stringify(val) !== JSON.stringify(selectedValue)
          )
        } else {
          if (maxItems && value.length >= maxItems) {
            return
          }
          newValue = [...value, selectedValue]
        }
      } else {
        newValue = [selectedValue]
      }
    } else if (value === selectedValue) {
      newValue = null
    }

    setValue(newValue)
    if (closeOnSelect) setOpen(false)
  }

  const renderValue = (): string | undefined => {
    if (value) {
      if (displayValue !== undefined) {
        return displayValue(value as unknown as TValue[] & TValue)
      }
      if (Array.isArray(value)) {
        return `${value.length} selected`
      }
      return String(value)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Trigger
        variant={variant}
        label={label}
        disabled={disabled}
        error={error}
        placeholder={Boolean(renderValue()) ? undefined : placeholder}
      >
        <span id="select-value">
          {renderValue() ?? (
            <span className="text-body-md text-onSurfaceVariant/50">
              {placeholder}
            </span>
          )}
        </span>
      </Trigger>
      <Popover.Content
        className="w-full min-w-[var(--radix-popover-trigger-width)] p-0"
        align="start"
      >
        <Command filter={filterFn} shouldFilter={shouldFilter}>
          <Command.Input
            placeholder={inputPlaceholder}
            autoFocus
            value={search}
            onValueChange={onSearchChange}
          />
          <Command.List className="max-h-[240px]">
            <Command.Empty>{emptyState}</Command.Empty>
            <ComboboxProvider value={{ isSelected, onSelect: handleSelect }}>
              {children}
            </ComboboxProvider>
          </Command.List>
        </Command>
      </Popover.Content>
    </Popover>
  )
}

interface ComboboxItemOptions<TValue> {
  value: TValue
}

export interface ComboboxItemProps<TValue>
  extends ComboboxItemOptions<TValue>,
    Omit<
      React.ComponentProps<typeof Command.Item>,
      keyof ComboboxItemOptions<TValue> | 'onSelect' | 'role'
    > {
  onSelect?(value: TValue): void
}

type ComboboxType = typeof ComboboxRoot & {
  Item: typeof ComboboxItem
}

export const ComboboxItem = <
  TValue extends Parameters<ComboboxType>[0]['value'],
>({
  children,
  className,
  value,
  onSelect,
}: ComboboxItemProps<TValue>) => {
  const context = useComboboxContext()

  return (
    <Command.Item
      className={className}
      role="option"
      onSelect={() => {
        context.onSelect(value)
        onSelect?.(value)
      }}
    >
      <span className="mr-2 h-5 w-5">
        {context.isSelected(value) && (
          <Icons.check className="h-full w-full animate-in zoom-in-50" />
        )}
      </span>
      {children}
    </Command.Item>
  )
}

const Combobox = ComboboxRoot as ComboboxType
Combobox.Item = ComboboxItem

export { Combobox }
