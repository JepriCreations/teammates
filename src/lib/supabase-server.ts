import { cookies } from 'next/headers'
import {
  createServerComponentClient,
  createRouteHandlerClient as supabaseCreateRouteHandlerClient,
} from '@supabase/auth-helpers-nextjs'

import { Database } from '@/types/supabase'

export const createServerClient = () =>
  createServerComponentClient<Database>({
    cookies,
  })
export const createRouteHandlerClient = () =>
  supabaseCreateRouteHandlerClient<Database>({ cookies })
