'use client'

import * as React from 'react'

import { createSafeContext } from '@/lib/createSafeContext'
import { cn } from '@/lib/utils'
import { useControllableState } from '@/hooks/use-controllable-state'
import { Command } from '@/components/ui/command'
import { Icon } from '@/components/ui/icon'
import { Label } from '@/components/ui/label'
import { Popover } from '@/components/ui/popover'
import {
  filledSelectLabelStyle,
  filledSelectTriggerStyle,
  outlinedSelectLabelStyle,
  outlineSelectTriggerStyle,
  selectIconStyle,
} from '@/components/ui/select'

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
  variant?: 'filled' | 'outlined'
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
  variant?: 'filled' | 'outlined'
}

const selectStyles = {
  outlined: outlineSelectTriggerStyle,
  filled: filledSelectTriggerStyle,
}

const labelStyles = {
  outlined: outlinedSelectLabelStyle,
  filled: filledSelectLabelStyle,
}

const Trigger = ({
  label,
  error,
  variant = 'filled',
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
        className={cn(selectStyles[variant], className)}
      >
        {children}
        <div aria-label="Combobox Icon" className={selectIconStyle}>
          <Icon symbol="expand_more" />
        </div>
        {hasLabel && (
          <Label className={cn(labelStyles[variant])}>{label}</Label>
        )}
      </Popover.Trigger>
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
            <span className="text-body-md text-onSurfaceVariant/50 group-has-[label]/input:group-data-[state=closed]/input:text-transparent">
              {placeholder}
            </span>
          )}
        </span>
      </Trigger>
      <Popover.Content
        className="-mt-4 w-full min-w-[var(--radix-popover-trigger-width)] p-0"
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

const ComboboxItem = <TValue extends Parameters<ComboboxType>[0]['value']>({
  children,
  className,
  value,
  onSelect,
}: ComboboxItemProps<TValue>) => {
  const context = useComboboxContext()

  if (!context) {
    return null
  }

  return (
    <Command.Item
      className={cn('', className)}
      role="option"
      data-active={context.isSelected(value) ? true : undefined}
      onSelect={() => {
        context.onSelect(value)
        onSelect?.(value)
      }}
    >
      {children}
    </Command.Item>
  )
}

const Combobox = Object.assign(ComboboxRoot, {
  Item: ComboboxItem,
})

export { Combobox, ComboboxItem }
