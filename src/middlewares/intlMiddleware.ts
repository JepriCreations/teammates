import { NextRequest, NextResponse } from 'next/server'
import { getLocale, supportedLocales } from './utils'

export async function intlMiddleware(req: NextRequest) {
  const locale = getLocale(req)
  const pathname = req.nextUrl.pathname
  const pathnameIsMissingLocale = supportedLocales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(new URL(`/${locale}/${pathname}`, req.url))
  }

  return NextResponse.next()
}
