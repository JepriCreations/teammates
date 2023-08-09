import { ExperienceLevel, Rewards, WorkMode } from '@/types/collections'
import { cn } from '@/lib/utils'
import {
  ContractIcon,
  ExperienceLevelIcon,
  PercentCircleIcon,
  PresentialIcon,
  RemoteIcon,
} from '@/components/icons'

const workModeIcon = (workmode: string, className?: string) => {
  switch (workmode) {
    case WorkMode.Presential: {
      return <PresentialIcon className={cn('h-4 w-4', className)} />
    }
    case WorkMode.Remote: {
      return <RemoteIcon className={cn('h-4 w-4', className)} />
    }
    default:
      break
  }
}

const rewardIcon = (rewards: string[], className?: string) => {
  if (rewards.includes(Rewards.Percent) && rewards.includes(Rewards.Contract)) {
    return <PercentCircleIcon className={cn('h-4 w-4', className)} />
  }
  //   TODO: Change Combo Icon

  if (rewards.includes(Rewards.Percent)) {
    return <PercentCircleIcon className={cn('h-4 w-4', className)} />
  }

  if (rewards.includes(Rewards.Contract)) {
    return <ContractIcon className={cn('h-4 w-4', className)} />
  }

  return null
}

const experienceLevelIcon = (exp_level: string, className?: string) => {
  return (
    <ExperienceLevelIcon
      level={(exp_level as ExperienceLevel) ?? ExperienceLevel.Entry}
      className={cn('h-4 w-4', className)}
    />
  )
}

export const RoleIcon = {
  workModeIcon,
  rewardIcon,
  experienceLevelIcon,
}
