'use server'

import { redirect } from 'next/navigation'
import { routes } from '@/constants/routes'

import { RoleStatus } from '@/types/collections'
import { PostgressError } from '@/lib/errors'
import { createServerClient } from '@/lib/supabase-server'

export const fetchProjects = async () => {
  const supabase = createServerClient()

  const { data: projects, error } = await supabase
    .from('projects')
    .select(
      `id, slug, updated_at, name, summary, categories, icon_url, public,
      roles(name, exp_level, rewards, work_mode, status)`
    )
    .match({ public: true, 'roles.status': RoleStatus.Open })
    .order('updated_at', { ascending: false })

  if (error) {
    return {
      data: null,
      error: new PostgressError('Has been an error retrieving projects.', {
        details: error.message,
      }),
    }
  }

  return {
    data: projects?.filter((project) => project.roles.length > 0),
    error: null,
  }
}

export const fetchProjectBySlug = async (slug: string) => {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from('projects')
    .select(
      `id, updated_at, name, summary, categories, icon_url, description,
  roles(name, exp_level, rewards, work_mode, status, description)`
    )
    .eq('slug', slug)
    .eq('roles.status', RoleStatus.Open)
    .single()

  if (error) {
    return {
      data: null,
      error: new PostgressError('Has been an error retrieving the project.', {
        details: error.message,
      }),
    }
  }

  return { data, error: null }
}

export const fetchUserProjects = async () => {
  const supabase = createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect(routes.HOME)
  }

  const { data, error } = await supabase
    .from('projects')
    .select(
      `id, updated_at, name, public,
      roles(status),
      views:project_views_statistics(total_views)`
    )
    .eq('created_by', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    return {
      data: null,
      error: new PostgressError('Has been an error retrieving the project.', {
        details: error.message,
      }),
    }
  }

  return { data, error: null }
}

export const fetchUserProject = async (projectId: string) => {
  const supabase = createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect(routes.HOME)
  }

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .match({ id: projectId, created_by: user.id })
    .single()

  if (error) {
    return {
      data: null,
      error: new PostgressError('Has been an error retrieving the project.', {
        details: error.message,
      }),
    }
  }

  return { data, error: null }
}

export const fetchProjectName = async (projectId: string) => {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from('projects')
    .select('name')
    .eq('id', projectId)
    .single()

  if (error) {
    return {
      data: null,
      error: new PostgressError('Has been an error retrieving the project.', {
        details: error.message,
      }),
    }
  }

  return { data, error: null }
}

export const fetchProjectStatistics = async (projectId: string) => {
  const supabase = createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect(routes.HOME)
  }

  const totalViewsPromise = supabase
    .from('projects')
    .select('views:project_views_statistics(total_views)')
    .match({ id: projectId, created_by: user.id })
    .single()

  const viewsByDatePromise = supabase
    .from('project_views')
    .select('date, count, projects(created_by)')
    .eq('project_id', projectId)
    .eq('projects.created_by', user.id)

  const [totalViews, viewsByDate] = await Promise.all([
    totalViewsPromise,
    viewsByDatePromise,
  ])

  const error = totalViews.error || viewsByDate.error
  const data = {
    total_views: totalViews.data?.views[0]?.total_views ?? 0,
    views: viewsByDate.data?.map(({ date, count }) => ({ date, count })),
  }

  if (error) {
    return {
      data: null,
      error: new PostgressError(
        'Has been an error retrieving the project statistics.',
        {
          details: error.message,
        }
      ),
    }
  }

  if (!data) {
    return {
      data: null,
      error: new PostgressError('Unautorized'),
    }
  }

  return { data, error: null }
}

export const fetchProjectRoles = async (projectId: string) => {
  const supabase = createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect(routes.HOME)
  }

  const { data, error } = await supabase
    .from('projects')
    .select('roles(*)')
    .eq('id', projectId)
    .neq('roles.status', RoleStatus.Archived)
    .single()

  if (error) {
    return {
      data: null,
      error: new PostgressError('Has been an error retrieving the roles.', {
        details: error.message,
      }),
    }
  }

  const roles = data.roles
  return { data: roles, error: null }
}
