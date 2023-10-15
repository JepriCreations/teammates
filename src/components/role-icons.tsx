import { ExperienceLevel, Rewards, WorkMode } from '@/types/collections'
import { cn } from '@/lib/utils'
import { Icons } from '@/components/icons'

const workModeIcon = (workmode: string, className?: string) => {
  switch (workmode) {
    case WorkMode.Presential: {
      return <Icons.presential className={cn('h-4 w-4', className)} />
    }
    case WorkMode.Remote: {
      return <Icons.remote className={cn('h-4 w-4', className)} />
    }
    default:
      break
  }
}

const rewardIcon = (rewards: string[], className?: string) => {
  if (rewards.includes(Rewards.Percent) && rewards.includes(Rewards.Contract)) {
    return <Icons.percentCircle className={cn('h-4 w-4', className)} />
  }
  //   TODO: Change Combo Icon

  if (rewards.includes(Rewards.Percent)) {
    return <Icons.percentCircle className={cn('h-4 w-4', className)} />
  }

  if (rewards.includes(Rewards.Contract)) {
    return <Icons.contract className={cn('h-4 w-4', className)} />
  }

  if (rewards.includes(Rewards.Credit)) {
    return <Icons.credit className={cn('h-4 w-4', className)} />
  }

  return null
}

const experienceLevelIcon = (
  exp_level: ExperienceLevel,
  className?: string
) => {
  switch (exp_level) {
    case ExperienceLevel.Entry:
      return <Icons.expLevelEntry className={cn('h-4 w-4', className)} />
    case ExperienceLevel.Intermediate:
      return <Icons.expLevelIntermediate className={cn('h-4 w-4', className)} />
    case ExperienceLevel.Expert:
      return <Icons.expLevelExpert className={cn('h-4 w-4', className)} />
    default:
      break
  }
}

export const RoleIcon = {
  workModeIcon,
  rewardIcon,
  experienceLevelIcon,
}
