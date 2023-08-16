export const routes = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  PROJECTS: '/dashboard/projects',
  PROFILE: '/dashboard/profile',
  NEW_PROJECT: '/dashboard/project/new',
  STATISTICS: (id: string) => `/dashboard/project/${id}`,
  DETAILS: (id: string) => `/dashboard/project/${id}/details`,
  ROLES: (id: string) => `/dashboard/project/${id}/roles`,
  APPLICATIONS: (project_id: string, role_id: string) =>
    `/dashboard/project/${project_id}/roles/${role_id}/applications`,
  PREFERENCES: '/dashboard/preferences',
  CONTACT: '/contact',
  PRIVACY: '/privacy',
  BLOG: '/blog',
  ABOUT: '/about',
  PROJECT: (name: string) => `/projects/${name}`,

  // Externals
  GITHUB: 'https://github.com/jepricreations/teammates',
}

export const slugs = {
  DETAILS: 'details',
  ROLES: 'roles',
}
