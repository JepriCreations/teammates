import { Database } from './supabase'

export enum ExperienceLevel {
  Entry = 'entry',
  Intermediate = 'intermediate',
  Expert = 'expert',
}

export enum WorkMode {
  Remote = 'remote',
  Presential = 'presential',
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

export enum RoleStatus {
  Open = 'open',
  Closed = 'closed',
}

export type Profile = Database['public']['Tables']['profiles']['Row'] & {
  avatar: string | undefined | null
}

export type Role = Database['public']['Tables']['roles']['Row']
export type Project = Database['public']['Tables']['projects']['Row']

export type ProjectInsert = Database['public']['Tables']['projects']['Insert']
export type ProjectUpdate = Database['public']['Tables']['projects']['Update']
