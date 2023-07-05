import { NextRequest, NextResponse } from 'next/server'
import { routes } from '@/constants/routes'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

import type { Database } from '@/types/supabase'

import { getLocale, privatesRoutes } from './utils'

export async function authMiddleware(req: NextRequest) {
  const locale = getLocale(req)
  const pathname = req.nextUrl.pathname
  const res = NextResponse.next()

  const matcher = [...privatesRoutes, routes.LOGIN]

  const depensOnSession = matcher.some((path) =>
    pathname.startsWith(`/${locale}` + path)
  )

  if (!depensOnSession) return res

  const isAuthPage = pathname.startsWith(`/${locale}` + routes.LOGIN)
  const isPrivatePage = privatesRoutes.some((path) => {
    return pathname.startsWith(`/${locale}` + path)
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

  //   console.log({ pathname, session, isPrivatePage })

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
