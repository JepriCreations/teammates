export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  PROJECTS: '/dashboard/projects',
  ACCOUNT: '/dashboard/account',
  PROFILE: '/dashboard/account/tabs/profile',
  USER_APPLICATIONS: '/dashboard/account/tabs/applications',
  USER_LIKES: '/dashboard/account/tabs/likes',
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
  PROJECT: (slug: string) => `/projects/${slug}`,

  // Externals
  GITHUB: 'https://github.com/jepricreations/teammates',
}

export const API_ROUTES = {
  PROFILES: '/api/profiles',
  APPLICATIONS: '/api/applications',
  PROJECTS: '/api/projects',
  LIKES: '/api/projects/likes',
  ROLES: '/api/roles',
}

export const PARAMS_KEYS = {
  WORK_MODE: 'wm',
  EXPERIENCE: 'exp',
  REWARDS: 'rew',
  CATEGORY: 'ca',
  PAGE: 'page',
}
