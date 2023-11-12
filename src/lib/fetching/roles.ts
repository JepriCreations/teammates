'use server'

import { redirect } from 'next/navigation'
import { ROUTES } from '@/constants/routes'

import { ApplicationStatus } from '@/types/collections'
import { newError, PostgresError } from '@/lib/errors'
import { createServerClient } from '@/lib/supabase-server'

export const fetchRole = async ({ role_id }: { role_id: string }) => {
  try {
    const supabase = createServerClient()
    const { error, data } = await supabase
      .from('roles')
      .select(`*, applications(count)`)
      .eq('id', role_id)
      .single()

    if (error) {
      throw new PostgresError('Has been an error retrieving the roles.', {
        details: error.message,
      })
    }

    // Hack for a Supabase Bug recognizing count
    const applicationsCount = data.applications[0] as unknown as {
      count: number
    }

    const role = {
      ...data,
      applications: applicationsCount.count,
    }

    return { data: role }
  } catch (error) {
    return { error: newError(error) }
  }
}

export const fetchRoleApplications = async ({
  role_id,
  status,
}: {
  role_id: string
  status?: ApplicationStatus
}) => {
  try {
    const supabase = createServerClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      redirect(ROUTES.LOGIN)
    }

    const query = supabase
      .from('applications')
      .select('*, profile:profiles(name, about, links)')
      .eq('role_id', role_id)

    if (status) {
      query.eq('status', status)
    }

    const { data, error } = await query.order('created_at', {
      ascending: false,
    })

    if (error) {
      throw new PostgresError('Has been an error retrieving the roles.', {
        details: error.message,
      })
    }

    return { data }
  } catch (error) {
    return { error: newError(error) }
  }
}
