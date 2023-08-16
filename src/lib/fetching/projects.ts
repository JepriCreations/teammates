'use server'

import { redirect } from 'next/navigation'
import { routes } from '@/constants/routes'

import { RoleStatus } from '@/types/collections'
import { PostgresError } from '@/lib/errors'
import { updateProjectViews } from '@/lib/mutations/projects'
import { createServerClient } from '@/lib/supabase-server'
import { DEBUG } from '@/lib/utils'

export const fetchProjects = async () => {
  const supabase = createServerClient()

  const location = undefined

  const matchingObject = { public: true, 'roles.status': RoleStatus.Open }
  if (location)
    Object.assign(matchingObject, { 'location->>country': location })

  const {
    data: projects,
    error,
    count,
  } = await supabase
    .from('projects')
    .select(
      `id, slug, updated_at, name, summary, categories, icon_url, public,
      roles(name, exp_level, rewards, work_mode, status)`,
      { count: 'exact' }
    )
    .match(matchingObject)
    .order('updated_at', { ascending: false })

  if (error) {
    return {
      error: new PostgresError('Has been an error retrieving projects.', {
        details: error.message,
      }),
    }
  }

  return {
    data: {
      projects: projects?.filter((project) => project.roles.length > 0),
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

  let doesUserLike = false

  if (user && projectData) {
    const userLikeCheck = await supabase
      .from('project_likes')
      .select('*', { count: 'exact', head: true })
      .match({ profile_id: user.id, project_id: projectData.id })
      .single()

    doesUserLike = Boolean(userLikeCheck.count && userLikeCheck.count > 0)
  }

  if (error) {
    return {
      error: new PostgresError('Has been an error retrieving the project.', {
        details: error.message,
      }),
    }
  }

  const data = { ...projectData, liked: doesUserLike }
  if (!DEBUG) await updateProjectViews(data.id)

  return { data }
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
      error: new PostgresError('Has been an error retrieving the project.', {
        details: error.message,
      }),
    }
  }

  return { data }
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
    redirect(routes.HOME)
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
  })

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
  const hitsWIthData =
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
      const foundView = hitsWIthData.find((view) => view.date === dateString)
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
  const supabase = createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect(routes.HOME)
  }

  const { data, error } = await supabase
    .from('projects')
    .select('roles(*, applications(created_at))')
    .eq('id', projectId)
    .neq('roles.status', RoleStatus.Archived)
    .single()

  if (error) {
    return {
      error: new PostgresError('Has been an error retrieving the roles.', {
        details: error.message,
      }),
    }
  }

  const roles = data.roles.map((role) => ({
    ...role,
    applications: role.applications.length,
  }))

  return { data: roles }
}

// SQL

// CREATE OR REPLACE VIEW project_statistics AS
// WITH all_total_views AS (
//     SELECT
//         project_id,
//         SUM(count) AS total_views
//     FROM project_views
//     GROUP BY project_id
// ),
// current_month_views AS (
//     SELECT
//         project_id,
//         SUM(count) AS current_month_views
//     FROM project_views
//     WHERE date_trunc('month', date) = date_trunc('month', NOW())
//     GROUP BY project_id
// ),
// previous_month_views AS (
//     SELECT
//         project_id,
//         SUM(count) AS prev_month_views
//     FROM project_views
//     WHERE date_trunc('month', date) = date_trunc('month', NOW()) - INTERVAL '1 month'
//     GROUP BY project_id
// ),
// all_total_hits AS (
//     SELECT
//         project_id,
//         COUNT(*) AS total_hits
//     FROM applications
//     GROUP BY project_id
// ),
// current_month_hits AS (
//     SELECT
//         project_id,
//         COUNT(*) AS current_month_hits
//     FROM applications
//     WHERE date_trunc('month', created_at) = date_trunc('month', NOW())
//     GROUP BY project_id
// ),
// previous_month_hits AS (
//     SELECT
//         project_id,
//         COUNT(*) AS prev_month_hits
//     FROM applications
//     WHERE date_trunc('month', created_at) = date_trunc('month', NOW()) - INTERVAL '1 month'
//     GROUP BY project_id
// ),
// comparison AS (
//     SELECT
//         tv.project_id,
//         tv.total_views AS total_views,
//         cv.current_month_views AS current_month_views,
//         pv.prev_month_views AS prev_month_views,
//         th.total_hits AS total_hits,
//         ch.current_month_hits AS current_month_hits,
//         ph.prev_month_hits AS prev_month_hits
//     FROM all_total_views tv
//     LEFT JOIN current_month_views cv ON tv.project_id = cv.project_id
//     LEFT JOIN previous_month_views pv ON tv.project_id = pv.project_id
//     LEFT JOIN all_total_hits th ON tv.project_id = th.project_id
//     LEFT JOIN current_month_hits ch ON tv.project_id = ch.project_id
//     LEFT JOIN previous_month_hits ph ON tv.project_id = ph.project_id
// )
// SELECT
//     c.project_id,
//     COALESCE(c.total_views, 0) AS total_views,
//     COALESCE(c.current_month_views, 0) AS current_month_views,
//     COALESCE(c.prev_month_views, 0) AS prev_month_views,
//     COALESCE(c.total_hits, 0) AS total_hits,
//     COALESCE(c.current_month_hits, 0) AS current_month_hits,
//     COALESCE(c.prev_month_hits, 0) AS prev_month_hits,
//     CASE
//         WHEN c.prev_month_views IS NULL OR c.prev_month_views = 0 THEN NULL
//         ELSE ROUND(((c.current_month_views - c.prev_month_views) * 100.0) / c.prev_month_views, 2)
//     END AS percent_views,
//     CASE
//         WHEN c.prev_month_hits IS NULL OR c.prev_month_hits = 0 THEN NULL
//         ELSE ROUND(((c.current_month_hits - c.prev_month_hits) * 100.0) / c.prev_month_hits, 2)
//     END AS percent_hits
// FROM comparison c;
