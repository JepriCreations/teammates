import { NextRequest, NextResponse } from 'next/server'
import { routes } from '@/constants/routes'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

import type { Database } from '@/types/supabase'

import { getLocale, privatesRoutes, supportedLocales } from './utils'

export async function authMiddleware(req: NextRequest) {
  const locale = getLocale(req)
  const pathname = req.nextUrl.pathname
  const res = NextResponse.next()

  const matcher = [...privatesRoutes, routes.LOGIN]

  const depensOnSession = matcher.some((path) =>
    supportedLocales.some((loc) => pathname.startsWith(`/${loc}` + path))
  )

  if (!depensOnSession) return res

  const isAuthPage = supportedLocales.some((loc) =>
    pathname.startsWith(`/${loc}` + routes.LOGIN)
  )
  const isPrivatePage = privatesRoutes.some((path) => {
    return supportedLocales.some((loc) => pathname.startsWith(`/${loc}` + path))
  })

  const supabase = createMiddlewareClient<Database>({ req, res })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (isAuthPage) {
    if (session) {
      return NextResponse.redirect(
        new URL(`/${locale + routes.PROJECTS}`, req.url)
      )
    }
  }

  if (!session && isPrivatePage) {
    let from = pathname
    if (req.nextUrl.search) {
      from += req.nextUrl.search
    }

    return NextResponse.redirect(
      new URL(
        `/${locale + routes.LOGIN}?from=${encodeURIComponent(from)}`,
        req.url
      )
    )
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
