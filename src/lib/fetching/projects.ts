'use server'

import { redirect } from 'next/navigation'
import { ROUTES } from '@/constants/routes'

import { ApplicationStatus, RoleStatus } from '@/types/collections'
import { isPostgresError, PostgresError } from '@/lib/errors'
import { updateProjectViews } from '@/lib/mutations/projects'
import { createServerClient } from '@/lib/supabase-server'
import { DEBUG } from '@/lib/utils'

export const fetchProjects = async ({
  search,
  work_mode,
  experience,
  rewards,
  location,
}: {
  search?: string
  work_mode?: string[]
  experience?: string[]
  rewards?: string[]
  location?: string
}) => {
  const supabase = createServerClient()

  let query = supabase.from('projects').select(
    `id, slug, updated_at, name, summary, categories, icon_url, public,
    roles(name, exp_level, rewards, work_mode, status)`,
    { count: 'exact' }
  )

  const matchingObject = { public: true, 'roles.status': RoleStatus.Open }
  if (location)
    Object.assign(matchingObject, { 'location->>country': location })

  // if (search)
  //   query = query.or(
  //     `name.ilike.%${search ?? ''}%,summary.ilike.%${search ?? ''}%`
  //   )

  if (work_mode) query = query.in('roles.work_mode', work_mode)
  if (experience) query = query.in('roles.exp_level', experience)
  if (rewards) query = query.containedBy('roles.rewards', rewards)

  const {
    data: projects,
    error,
    count,
  } = await query
    .match(matchingObject)
    .order('updated_at', { ascending: false })

  if (error) {
    return {
      error: new PostgresError('Has been an error retrieving projects.', {
        details: error.message,
      }),
    }
  }

  let filteredResult = projects.filter((project) => project.roles.length > 0)

  if (search) {
    filteredResult = filteredResult.filter((project) => {
      return (
        project.name.toLowerCase().includes(search.toLowerCase()) ||
        project.summary.toLowerCase().includes(search.toLowerCase()) ||
        project.categories.some((category) =>
          category.toLowerCase().includes(search.toLowerCase())
        ) ||
        project.roles.some((role) => {
          return role.name.replaceAll('_', ' ').includes(search.toLowerCase())
        })
      )
    })
  }

  return {
    data: {
      projects: filteredResult,
      count,
    },
  }
}

export const fetchProjectBySlug = async (slug: string) => {
  const supabase = createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: projectData, error } = await supabase
    .from('projects')
    .select(
      `id, updated_at, name, summary, categories, icon_url, description, links, location->>city, location->>country, likes,
  roles(id, name, exp_level, rewards, work_mode, status, description)`
    )
    .eq('slug', slug)
    .eq('roles.status', RoleStatus.Open)
    .single()

  if (error) {
    return {
      error: new PostgresError('Has been an error retrieving the project.', {
        details: error.message,
      }),
    }
  }

  const { data: similarProjects } = await supabase
    .from('projects')
    .select('slug, name, categories, icon_url')
    .eq('public', true)
    .overlaps('categories', projectData.categories)
    .neq('slug', slug)
    .limit(4)

  let doesUserLike = false

  if (user && projectData) {
    const userLikeCheck = await supabase
      .from('project_likes')
      .select('*', { count: 'exact', head: true })
      .match({ user_id: user.id, project_id: projectData.id })
      .single()

    doesUserLike = Boolean(userLikeCheck.count && userLikeCheck.count > 0)
  }

  const data = {
    ...projectData,
    liked: doesUserLike,
    similarProjects: similarProjects ?? [],
  }
  if (!DEBUG) await updateProjectViews(data.id)

  return { data }
}

export const fetchUserProjects = async () => {
  const supabase = createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect(ROUTES.LOGIN)
  }

  const { data, error } = await supabase
    .from('projects')
    .select(
      `id, updated_at, name, public,
      roles(status),
      views:project_statistics(total_views)`
    )
    .eq('created_by', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    return {
      error: new PostgresError('Has been an error retrieving the project.', {
        details: error.message,
      }),
    }
  }

  return { data }
}

export const fetchUserProject = async (projectId: string) => {
  try {
    const supabase = createServerClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      redirect(ROUTES.LOGIN)
    }

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .match({ id: projectId, created_by: user.id })
      .single()

    if (error) {
      return {
        error: new PostgresError('Has been an error retrieving the project.', {
          details: error.message,
        }),
      }
    }

    return { data }
  } catch (error: any) {
    if (isPostgresError(error)) {
      console.log({ error })
      return { error }
    }

    return { error }
  }
}

export const fetchProjectName = async (projectId: string) => {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from('projects')
    .select('id, name')
    .eq('id', projectId)
    .single()

  if (error) {
    return {
      error: new PostgresError('Has been an error retrieving the project.', {
        details: error.message,
      }),
    }
  }

  return { data }
}

export const fetchProjectStatistics = async (projectId: string) => {
  const supabase = createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect(ROUTES.LOGIN)
  }

  const totalViewsPromise = supabase
    .from('projects')
    .select(
      'views:project_statistics(total_views, total_hits, percent_views, percent_hits)'
    )
    .match({ id: projectId, created_by: user.id })
    .single()

  const viewsByDatePromise = supabase
    .from('project_views')
    .select('date, count, projects(created_by)')
    .eq('project_id', projectId)
    .eq('projects.created_by', user.id)
    .order('date', { ascending: true })
    .limit(7)

  const hitsByDatePromise = supabase.rpc('get_application_counts', {
    project_id: projectId,
  }) as unknown as Promise<{
    data: { created_at: string; count: number }[]
  }>

  const [totalViews, viewsByDate, hitsByDate] = await Promise.all([
    totalViewsPromise,
    viewsByDatePromise,
    hitsByDatePromise,
  ])

  const error = totalViews.error || viewsByDate.error

  const total_views = totalViews.data?.views[0]?.total_views ?? 0
  const total_hits = totalViews.data?.views[0]?.total_hits ?? 0
  const viewsWithData =
    viewsByDate.data?.map(({ date, count }) => ({ date, count })) || []
  const hitsWithData =
    hitsByDate.data?.map(({ created_at, count }) => ({
      date: created_at,
      count,
    })) || []

  const startDate = new Date(viewsWithData[viewsWithData.length - 1].date)
  startDate.setDate(startDate.getDate() - 6)

  const views = [
    ...Array.from({ length: 7 }, (_, index) => {
      const date = new Date(startDate)
      date.setDate(date.getDate() + index)
      const dateString = date.toISOString().substring(0, 10)
      const foundView = viewsWithData.find((view) => view.date === dateString)
      return foundView || { date: dateString, count: 0 }
    }),
  ]

  const hits = [
    ...Array.from({ length: 7 }, (_, index) => {
      const date = new Date(startDate)
      date.setDate(date.getDate() + index)
      const dateString = date.toISOString().substring(0, 10)
      const foundView = hitsWithData.find((view) => view.date === dateString)
      return foundView || { date: dateString, count: 0 }
    }),
  ]

  const data = {
    total_views,
    total_hits,
    percent_views:
      totalViews.data?.views[0]?.percent_views ?? (total_views > 0 ? 100 : 0),
    percent_hits:
      totalViews.data?.views[0]?.percent_hits ?? (total_hits > 0 ? 100 : 0),
    views,
    hits,
  }

  if (error) {
    return {
      error: new PostgresError(
        'Has been an error retrieving the project statistics.',
        {
          details: error.message,
        }
      ),
    }
  }

  if (!data) {
    return {
      error: new PostgresError('Unauthorized'),
    }
  }

  return { data }
}

export const fetchProjectRoles = async (projectId: string) => {
  try {
    const supabase = createServerClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      redirect(ROUTES.LOGIN)
    }

    const { data, error } = await supabase
      .from('projects')
      .select('roles(*, applications(created_at, status))')
      .eq('id', projectId)
      .neq('roles.status', RoleStatus.Archived)
      .order('created_at', { foreignTable: 'roles', ascending: false })
      .single()

    if (error) {
      throw new PostgresError('Has been an error retrieving the roles.', {
        details: error.message,
      })
    }

    const roles = data.roles.map((role) => ({
      ...role,
      applications: role.applications.filter(
        (ap) => ap.status !== ApplicationStatus.Rejected
      ).length,
    }))

    return { data: roles }
  } catch (error: any) {
    if (isPostgresError(error)) {
      console.log({ error })
      return { error }
    }
    return { error }
  }
}
