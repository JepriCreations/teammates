import { Database } from './supabase'

export type Profile = Database['public']['Tables']['profiles']['Row'] & {
  avatar: string | undefined | null
}
