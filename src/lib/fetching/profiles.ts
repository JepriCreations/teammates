'use server'

import { redirect } from 'next/navigation'
import { ROUTES } from '@/constants/routes'

import { newError, PostgresError } from '@/lib/errors'
import { createServerClient } from '@/lib/supabase-server'

export const fetchUserProfile = async () => {
  try {
    const supabase = createServerClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      redirect(ROUTES.LOGIN)
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('name, about, links, nationality')
      .eq('id', user.id)
      .single()

    if (error) {
      throw new PostgresError('Has been an error retrieving the profile.', {
        details: error.message,
      })
    }

    return {
      data: {
        name: data.name,
        about: data.about,
        nationality: data.nationality,
        links: JSON.parse(JSON.stringify(data.links)),
        provider: user.app_metadata.provider,
      },
    }
  } catch (error) {
    return { error: newError(error) }
  }
}

export const fetchUserApplications = async () => {
  try {
    const supabase = createServerClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      redirect(ROUTES.LOGIN)
    }

    const { data: fetchData, error } = await supabase
      .from('applications')
      .select(
        '*, project:projects(slug, name, summary, location->>city, location->>country), role:roles(name, exp_level, work_mode, rewards)'
      )
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .order('created_at_time', { ascending: false })

    if (error) {
      throw new PostgresError(
        'Has been an error retrieving the user applications.',
        {
          details: error.message,
        }
      )
    }

    let data = []

    for (const application of fetchData) {
      if (application.project && application.role) {
        data.push({
          ...application,
          project: application.project,
          role: application.role,
        })
      }
    }

    return { data }
  } catch (error) {
    return { error: newError(error) }
  }
}

type Project = {
  slug: string
  name: string
  summary: string
  city: string
  country: string
  icon_url: string | null
}

export const fetchUserLikes = async () => {
  try {
    const supabase = createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      redirect(ROUTES.LOGIN)
    }

    const { data, error } = await supabase
      .from('project_likes')
      .select(
        'project:projects(slug, name, summary, location->>city, location->>country, icon_url)'
      )
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      throw new PostgresError('Has been an error retrieving the user likes.', {
        details: error.message,
      })
    }

    const projects: Project[] = []
    data.forEach((like) => {
      if (like.project) projects.push(like.project)
    })

    return { data: projects }
  } catch (error) {
    return { error: newError(error) }
  }
}
