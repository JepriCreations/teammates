import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from 'next/server'
import { ROUTES } from '@/constants/routes'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

import type { Database } from '@/types/supabase'

import { getLocale, privatesRoutes, supportedLocales } from './utils'

export function authMiddleware(middleware: NextMiddleware) {
  return async (req: NextRequest, event: NextFetchEvent) => {
    const locale = getLocale(req)
    const pathname = req.nextUrl.pathname
    const res = NextResponse.next()

    const matcher = [...privatesRoutes, ROUTES.LOGIN]

    const dependsOnSession = matcher.some((path) =>
      supportedLocales.some((loc) => pathname.startsWith(`/${loc}` + path))
    )

    if (!dependsOnSession) return middleware(req, event)

    const supabase = createMiddlewareClient<Database>({ req, res })
    const {
      data: { session },
    } = await supabase.auth.getSession()

    const isAuthPage = supportedLocales.some((loc) =>
      pathname.startsWith(`/${loc}` + ROUTES.LOGIN)
    )

    if (!session && !isAuthPage) {
      let from = pathname
      if (req.nextUrl.search) {
        from += req.nextUrl.search
      }

      return NextResponse.redirect(
        new URL(
          `/${locale + ROUTES.LOGIN}?from=${encodeURIComponent(from)}`,
          req.url
        )
      )
    }

    if (session) {
      if (isAuthPage) {
        return NextResponse.redirect(
          new URL(`/${locale + ROUTES.PROJECTS}`, req.url)
        )
      }
    }

    /**
     * Retrieve the pathname and route to use in server side components using next/headers
     * On server component:
     * const headersList = headers() (from "next/headers")
     * const route = headersList.get('x-route') || ''
     */
    const requestHeaders = new Headers(req.headers)
    requestHeaders.set('x-url', req.nextUrl.pathname)

    const parts = req.nextUrl.pathname.split('/')
    const route = parts.slice(2).join('/')
    requestHeaders.set('x-route', '/' + route)

    return NextResponse.next({
      request: {
        // Apply new request headers
        headers: requestHeaders,
      },
    })
  }
}
