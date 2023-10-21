import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from 'next/server'

import { getLocale, supportedLocales } from './utils'

export function intlMiddleware(middleware: NextMiddleware) {
  return async (req: NextRequest, event: NextFetchEvent) => {
    const locale = getLocale(req)
    const pathname = req.nextUrl.pathname
    const search = req.nextUrl.search

    if (pathname.startsWith(`/api/`)) {
      return middleware(req, event)
    }

    const pathnameIsMissingLocale = supportedLocales.every(
      (locale) =>
        !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    )

    if (pathnameIsMissingLocale) {
      const redirectUrl = new URL(`/${locale}/${pathname}`, req.url)
      if (search) {
        redirectUrl.search = search
      }

      return NextResponse.redirect(redirectUrl)
    }

    return middleware(req, event)
  }
}
