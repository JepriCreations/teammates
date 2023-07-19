import { ExperienceLevel, Rewards, Roles, WorkMode } from '@/types/collections'
import { Translator } from '@/lib/dictionaries'

export const ROLES = (t: Translator) =>
  Object.values(Roles).map((role) => ({
    value: role,
    label: t(`Roles.${role}`),
  }))

export const EXPERIENCE_LEVEL = (t: Translator) =>
  Object.values(ExperienceLevel).map((level) => ({
    value: level,
    label: t(`Roles.Levels.${level}`),
  }))

export const WORK_MODE = (t: Translator) =>
  Object.values(WorkMode).map((mode) => ({
    value: mode,
    label: t(`Roles.Workmode.${mode}`),
  }))

export const REWARDS = (t: Translator) =>
  Object.values(Rewards).map((mode) => ({
    value: mode,
    label: t(`Roles.Rewards.${mode}`),
  }))

export const categories = (t: Translator) =>
  [
    { value: 'technology', label: 'Technology' },
    { value: 'cience', label: 'Cience' },
    { value: 'literature', label: 'Literature' },
    { value: 'art', label: 'Art' },
  ] as const
