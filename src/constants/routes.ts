export const routes = {
  HOME: '/',
  LOGIN: '/login',
  ACCOUNT: '/account',
  PROJECTS: '/projects',
  NEW_PROJECT: '/new',
  PREFERENCES: '/preferences',
  CONTACT: '/contact',
  PRIVACY: '/privacy',
  BLOG: '/blog',
  ABOUT: '/about',
  PROJECT: (id: string) => `/project/${id}`,

  // Externals
  GITHUB: 'https://github.com/jepricreations/teammates',
}
