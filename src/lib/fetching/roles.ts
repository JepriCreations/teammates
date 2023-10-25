'use server'

import { redirect } from 'next/navigation'
import { ROUTES } from '@/constants/routes'

import { ApplicationStatus } from '@/types/collections'
import { newError, PostgresError } from '@/lib/errors'
import { createServerClient } from '@/lib/supabase-server'

export const fetchRoleApplications = async (roleId: string) => {
  try {
    const supabase = createServerClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      redirect(ROUTES.LOGIN)
    }

    const { data: rol, error } = await supabase
      .from('roles')
      .select('*, applications(*, profile:profiles(name, about, links))')
      .eq('id', roleId)
      .neq('applications.status', ApplicationStatus.Rejected)
      .single()

    if (error) {
      throw new PostgresError('Has been an error retrieving the roles.', {
        details: error.message,
      })
    }

    const sortApplication = rol.applications.sort((a, b) => {
      const dateA = new Date(a.created_at)
      const dateB = new Date(b.created_at)
      if (dateA.getTime() !== dateB.getTime()) {
        return dateA.getTime() - dateB.getTime()
      } else {
        const timeA = new Date(a.created_at_time)
        const timeB = new Date(b.created_at_time)
        return timeA.getTime() - timeB.getTime()
      }
    })

    const data = { ...rol, applications: sortApplication }

    return { data }
  } catch (error: any) {
    return { error: newError(error) }
  }
}
