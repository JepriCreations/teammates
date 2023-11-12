'use server'

import { redirect } from 'next/navigation'
import { ROUTES } from '@/constants/routes'

import { ApplicationStatus, Role, RoleStatus } from '@/types/collections'
import { newError, PostgresError } from '@/lib/errors'
import { updateProjectViews } from '@/lib/mutations/projects'
import { createServerClient } from '@/lib/supabase-server'
import { DEBUG } from '@/lib/utils'

const LIMIT = 15

export type FetchProjectParams = {
  search?: string
  work_mode?: string[]
  experience?: string[]
  rewards?: string[]
  roles?: string[]
  country?: string
  category?: string
  page?: number
}

export const fetchProjects = async ({
  search,
  work_mode,
  experience,
  rewards,
  roles,
  country,
  category,
  page = 0,
}: FetchProjectParams) => {
  try {
    const supabase = createServerClient()

    const matchingObject = { public: true, 'roles.status': RoleStatus.Open }

    const projectsPromise = supabase.rpc(
      'get_projects',
      {
        search,
        work_mode_filter: work_mode,
        experience,
        rewards_filter: rewards,
        roles_filter: roles,
        country,
        category: category !== '' ? category : undefined,
        page,
        result_offset: LIMIT,
      },
      { count: 'exact' }
    )

    const countProjectsPromise = supabase
      .rpc('get_projects_count', {
        search,
        work_mode_filter: work_mode,
        experience,
        rewards_filter: rewards,
        roles_filter: roles,
        country,
        category: category !== '' ? category : undefined,
      })
      .single()

    const totalProjects = supabase
      .from('projects')
      .select('id, public, roles(status)', { count: 'exact', head: true })
      .match(matchingObject)

    const [projectsData, countData, countProjects] = await Promise.all([
      projectsPromise,
      totalProjects,
      countProjectsPromise,
    ])

    const error = projectsData.error || countData.error

    if (error) {
      console.log({ error })
      throw new PostgresError('Has been an error retrieving projects.', {
        details: error.message,
      })
    }

    const projects = projectsData.data.map((project) => {
      let roles: Partial<Role>[] = []
      const projectRoles = project.roles
      if (Array.isArray(projectRoles)) {
        roles = ([...projectRoles] as Role[]).map(
          ({ id, name, exp_level, rewards, work_mode }) => ({
            id,
            name,
            exp_level,
            rewards,
            work_mode,
          })
        )
      }

      return { ...project, roles }
    })

    let projectCount = countProjects.data?.count ?? 0
    const totalNumberOfProjects = countData.count ?? 0
    const isLast = (page + 1) * LIMIT >= projectCount
    const nextPage = isLast ? null : page + 1

    // console.dir(
    //   { projects, count: projectsData.count, totalCount: totalNumberOfProjects },
    //   { depth: null, color: true }
    // )

    return {
      data: {
        projects,
        projectCount,
        totalNumberOfProjects,
        nextPage,
        isLast,
      },
    }
  } catch (error) {
    return { error: newError(error) }
  }
}

export const fetchProjectBySlug = async (slug: string) => {
  try {
    const supabase = createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const { data: projectData, error } = await supabase
      .from('projects')
      .select(
        `id, updated_at, name, summary, categories, icon_url, description, links, location->>city, location->>country`
      )
      .match({
        slug,
        public: true,
      })
      .single()

    if (error) {
      // The result contains 0 rows
      if (error.code === 'PGRST116') {
        return { data: null }
      }

      throw new PostgresError('Has been an error retrieving the project.', {
        details: error.message,
      })
    }

    const likesPromise = supabase
      .from('project_statistics')
      .select('likes_count')
      .eq('project_id', projectData.id)
      .single()

    const userLikesPromise =
      user &&
      supabase
        .from('project_likes')
        .select('*', { count: 'exact', head: true })
        .match({ user_id: user.id, project_id: projectData.id })
        .single()

    const [likes, userLikes] = await Promise.all([
      likesPromise,
      userLikesPromise,
    ])

    const data = {
      ...projectData,
      likes: likes.data?.likes_count ?? 0,
      liked: Boolean(userLikes?.count && userLikes.count > 0),
    }

    if (!DEBUG) updateProjectViews(data.id)

    return { data }
  } catch (error) {
    return { error: newError(error) }
  }
}

export const fetchSimilarProjects = async ({
  slug,
  categories,
}: {
  slug: string
  categories: string[]
}) => {
  try {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('projects')
      .select('slug, name, categories, icon_url')
      .eq('public', true)
      .overlaps('categories', categories)
      .neq('slug', slug)
      .limit(4)

    if (error) {
      throw new PostgresError('Has been an error retrieving the projects.', {
        details: error.message,
      })
    }

    return { data }
  } catch (error) {
    return { error: newError(error) }
  }
}

export const fetchProjectRolesBySlug = async ({ slug }: { slug: string }) => {
  try {
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from('roles')
      .select(
        `id, name, exp_level, rewards, work_mode, status, description,
        projects!inner(slug, public)`
      )
      .eq('status', 'open')
      .eq('projects.slug', slug)
      .eq('projects.public', true)

    if (error) {
      throw new PostgresError('Has been an error retrieving the projects.', {
        details: error.message,
      })
    }

    return { data }
  } catch (error) {
    return { error: newError(error) }
  }
}

export const fetchUserProjects = async () => {
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
      .select(
        `id, updated_at, name, public,
      roles(status)`
      )
      .match({ created_by: user.id, archive: false })
      .order('created_at', { ascending: false })

    if (error) {
      throw new PostgresError('Has been an error retrieving the projects.', {
        details: error.message,
      })
    }

    const projectsData = data.map(async (project) => {
      const totalViewsPromise = supabase
        .from('project_statistics')
        .select('total_views')
        .eq('project_id', project.id)
        .single()

      const { data: totalViewsData, error: totalViewsError } =
        await totalViewsPromise

      if (totalViewsError) {
        return { ...project, total_views: 0 }
      } else {
        return { ...project, total_views: totalViewsData?.total_views ?? 0 }
      }
    })

    const projects = await Promise.all(projectsData)

    return { data: projects }
  } catch (error) {
    return { error: newError(error) }
  }
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
      throw new PostgresError('Has been an error retrieving the project.', {
        details: error.message,
      })
    }

    return { data }
  } catch (error) {
    return { error: newError(error) }
  }
}

export const fetchProjectName = async (projectId: string) => {
  try {
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from('projects')
      .select('id, name')
      .eq('id', projectId)
      .single()

    if (error) {
      throw new PostgresError('Has been an error retrieving the project.', {
        details: error.message,
      })
    }

    return { data }
  } catch (error) {
    return { error: newError(error) }
  }
}

const parsePercent = (n: number) => {
  if (isNaN(n)) return 0
  if (n === Infinity) return 100

  return parseFloat(n.toFixed(1))
}

export const fetchProjectStatistics = async (projectId: string) => {
  try {
    const supabase = createServerClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      redirect(ROUTES.LOGIN)
    }

    const projectStatisticsPromise = supabase
      .from('project_statistics')
      .select(
        'total_views, total_hits, likes_count, prev_month_hits, current_month_hits, prev_month_views, current_month_views'
      )
      .eq('project_id', projectId)
      .single()

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - 6)

    const viewsByDatePromise = supabase
      .from('project_views')
      .select('date, count, projects(created_by)')
      .eq('project_id', projectId)
      .eq('projects.created_by', user.id)
      .gte('date', startDate.toISOString())
      .order('date', { ascending: false })
      .limit(7)

    const hitsByDatePromise = supabase.rpc('get_application_counts', {
      project_id: projectId,
    }) as unknown as Promise<{
      data: { created_at: string; count: number }[]
    }>

    const [projectStatistics, viewsByDate, hitsByDate] = await Promise.all([
      projectStatisticsPromise,
      viewsByDatePromise,
      hitsByDatePromise,
    ])

    const error = projectStatistics.error || viewsByDate.error

    if (error) {
      throw new PostgresError(
        'Has been an error retrieving the project statistics.',
        {
          details: error.message,
        }
      )
    }

    const statistics = projectStatistics.data

    const total_views = statistics?.total_views ?? 0
    const total_hits = statistics?.total_hits ?? 0
    const prev_month_hits = statistics?.prev_month_hits ?? 0
    const current_month_hits = statistics?.current_month_hits ?? 0
    let percent_hits = parsePercent(
      ((current_month_hits - prev_month_hits) / prev_month_hits) * 100
    )
    const current_month_views = statistics?.current_month_views ?? 0
    const prev_month_views = statistics?.prev_month_views ?? 0
    let percent_views = parsePercent(
      ((current_month_views - prev_month_views) / prev_month_views) * 100
    )

    const likes = statistics?.likes_count ?? 0
    const viewsWithData =
      viewsByDate.data?.map(({ date, count }) => ({ date, count })) || []
    const hitsWithData =
      hitsByDate.data?.map(({ created_at, count }) => ({
        date: created_at,
        count,
      })) || []

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
      percent_views,
      percent_hits,
      views,
      hits,
      likes,
    }

    return { data }
  } catch (error) {
    return { error: newError(error) }
  }
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
      .select('categories, roles(*, applications(created_at, status))')
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
        (ap) => ap.status === ApplicationStatus.StandBy
      ).length,
    }))

    return { data: { roles, categories: data.categories } }
  } catch (error: any) {
    return { error: newError(error) }
  }
}
