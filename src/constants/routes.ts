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
  PREFERENCES: '/dashboard/preferences',
  CONTACT: '/contact',
  PRIVACY: '/privacy',
  BLOG: '/blog',
  ABOUT: '/about',
  PROJECT: (id: string) => `/project/${id}`,

  // Externals
  GITHUB: 'https://github.com/jepricreations/teammates',
}
