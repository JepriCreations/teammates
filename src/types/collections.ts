import { Database } from './supabase'

export enum ExperienceLevel {
  Entry = 'entry',
  Intermediate = 'intermediate',
  Expert = 'expert',
}

export enum WorkMode {
  Presential = 'presential',
  Remote = 'remote',
}

export enum Rewards {
  Percent = 'percent',
  Contract = 'contract',
  Credit = 'credit',
}

export enum Roles {
  ContentCreator = 'content_creator',
  Designer = 'designer',
}

export type Profile = Database['public']['Tables']['profiles']['Row'] & {
  avatar: string | undefined | null
}

export type Role = Database['public']['Tables']['roles']['Row']
