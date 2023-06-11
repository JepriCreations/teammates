import 'server-only'
import { createServerClient } from '@/lib/supabase-server'

export const fetchProjects = async () => {
  const supabase = createServerClient()

  const projectInfo = 'id, updated_at, name, summary, categories, icon_url'
  const rolesInfo = 'name, exp_level, rewards, work_mode, status'
  const { data: projects, error } = await supabase
    .from('projects')
    .select(`${projectInfo}, roles(${rolesInfo})'`)

  //  TODO: Handle error

  return projects
}
