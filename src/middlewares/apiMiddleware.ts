import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from 'next/server'

const whiteList = ['/api/auth/callback']
const appUrl = ['http://localhost:3080', 'https://teammates.buildbuddy.one', 'https://teammates.mov']

export function apiMiddleware(middleware: NextMiddleware) {
  return async (req: NextRequest, event: NextFetchEvent) => {
    const url = req.nextUrl
    const { pathname } = url
    const referer = req.headers.get('referer')

    if (pathname.startsWith(`/api/`) && !whiteList.includes(pathname)) {
      if(!referer || !appUrl.some((url) => referer.startsWith(url))) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
      }
    }

    return middleware(req, event)
  }
}
