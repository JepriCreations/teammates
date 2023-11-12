'use client'

import { ApplicationStatus } from '@/types/collections'
import { createSafeContext } from '@/lib/createSafeContext'
import { useSetSearchParams } from '@/hooks/use-set-search-params'
import { Chip } from '@/components/ui/chip'
import { Icons } from '@/components/icons'

export const ApplicationsStatusNav = ({
  status,
}: {
  status?: ApplicationStatus
}) => {
  const setSearchParams = useSetSearchParams()

  const handleChange = (value: string) => {
    setSearchParams({ name: 'status', value })
  }

  return (
    <ChipGroup value={status as string} onChange={handleChange}>
      <ChipItem value={ApplicationStatus.StandBy} label="Stand by" />
      <ChipItem value={ApplicationStatus.Granted} label="Granted" />
      <ChipItem value={ApplicationStatus.Rejected} label="Rejected" />
    </ChipGroup>
  )
}

type ChipGroupType = {
  value: string
  onChange: (value: string) => void
}
const [ChipGroupProvider, useChipGroup] = createSafeContext<ChipGroupType>({
  name: 'ChipGroup',
})

const ChipGroup = ({
  value,
  onChange,
  children,
}: {
  value: string
  onChange: (value: string) => void
  children: React.ReactNode
}) => {
  return (
    <ChipGroupProvider value={{ value, onChange }}>
      <div className="flex flex-wrap items-center gap-4">{children}</div>
    </ChipGroupProvider>
  )
}

const ChipItem = ({ value, label }: { value: string; label: string }) => {
  const { value: status, onChange } = useChipGroup()
  const isSelected = status === value

  const handleChange = () => {
    onChange && onChange(value)
  }
  return (
    <Chip onClick={handleChange} selected={isSelected}>
      {isSelected && (
        <Chip.Icon className="animate-in zoom-in-0">
          <Icons.check className="h-full" />
        </Chip.Icon>
      )}
      <Chip.Label>{label}</Chip.Label>
    </Chip>
  )
}
