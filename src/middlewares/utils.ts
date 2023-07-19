import { NextRequest } from 'next/server'
import { routes } from '@/constants/routes'

export const supportedLocales = ['en', 'es']
export const defaultLocale = 'en'
export const privatesRoutes = [routes.DASHBOARD]

export const getLocale = (request: NextRequest) => {
  // Get the user's preferred locale from the browser's Accept-Language header
  const locale = request.headers.get('Accept-Language')

  // If the user has not specified a preferred locale, use the default locale
  if (!locale) {
    return defaultLocale
  }

  // Split the locale string into language codes
  const [language] = locale.split('-')

  // Check if the requested locale is supported
  if (!supportedLocales.includes(language)) {
    return defaultLocale
  }

  // Return the requested language code
  return language
}
