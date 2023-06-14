export const routes = {
  HOME: '/',
  LOGIN: '/login',
  ACCOUNT: '/account',
  PROJECTS: '/projects',
  NEW_PROJECT: '/projects/new',
  CONTACT: '/contact',
  PRIVACY: '/privacy',
  PROJECT: (id: string) => `/project/${id}`,

  // Externals
  GITHUB: 'https://github.com/jepricreations/teammates',
}
