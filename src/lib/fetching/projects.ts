import 'server-only'

import { createServerClient } from '@/lib/supabase-server'

export const fetchProjects = async () => {
  const supabase = createServerClient()

  const { data: projects, error } = await supabase
    .from('projects')
    .select(
      `id, updated_at, name, summary, categories, icon_url, 
      roles(name, exp_level, rewards, work_mode, status)`
    )
    .eq('roles.status', 'open')
    .order('updated_at', { ascending: false })

  if (error) {
    //  TODO: Handle error
    return []
  }

  return projects?.filter((project) => project.roles.length > 0)
}
