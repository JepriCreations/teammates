import { NextResponse, NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { getLocale, privatesRoutes } from './utils'
import type { Database } from '@/types/supabase'
import { routes } from '@/constants/routes'

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
    return null
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

  return res
}
