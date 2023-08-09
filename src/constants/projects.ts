import { ExperienceLevel, Rewards, Roles, WorkMode } from '@/types/collections'
import { Translator } from '@/lib/dictionaries'

export const ROLES = (t: Translator) =>
  Object.values(Roles).map((role) => ({
    value: role,
    label: t(role),
  }))

export const EXPERIENCE_LEVEL = (t: Translator) =>
  Object.values(ExperienceLevel).map((level) => ({
    value: level,
    label: t(`Levels.${level}`),
  }))

export const WORK_MODE = (t: Translator) =>
  Object.values(WorkMode).map((mode) => ({
    value: mode,
    label: t(`Workmode.${mode}`),
  }))

export const REWARDS = (t: Translator) =>
  Object.values(Rewards).map((mode) => ({
    value: mode,
    label: t(`Rewards.${mode}`),
  }))

export const categories = (t: Translator) =>
  [
    { value: 'technology', label: t('technology') },
    { value: 'science', label: t('science') },
    { value: 'literature', label: t('literature') },
    { value: 'art', label: t('art') },
  ] as const
