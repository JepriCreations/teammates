'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
} from '@/components/ui/command'
import { FormControl } from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { AngleDownSmallIcon } from '@/components/icons'

interface ComboboxProps {
  disabled?: boolean
  value?: any
  triggerContent?: any
  commandProps?: {
    placeholder?: string
    emptyText?: string
    content?: React.ReactNode
  }
}

export const Combobox = ({
  disabled,
  value,
  triggerContent,
  commandProps,
}: ComboboxProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            disabled={disabled}
            variant="outline"
            role="combobox"
            fullWidth
            className={cn(
              'h-14 justify-between font-normal',
              (!value || (Array.isArray(value) && !value.length)) &&
                'text-muted-foreground'
            )}
          >
            <div className="flex grow items-center justify-between">
              {triggerContent}
              <AngleDownSmallIcon className="ml-2 h-6 w-6 shrink-0 opacity-50" />
            </div>
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent align="end" className="p-0">
        <Command>
          <CommandInput
            disabled={disabled}
            placeholder={commandProps?.placeholder}
          />
          <CommandEmpty>{commandProps?.emptyText}</CommandEmpty>
          <CommandGroup>{commandProps?.content}</CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
