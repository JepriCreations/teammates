import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ROUTES } from '@/constants/routes'

import { createRouteHandlerClient } from '@/lib/supabase-server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const from = requestUrl.searchParams.get('from')
  const redirectTo = requestUrl.origin + (from ?? ROUTES.PROJECTS)

  if (code) {
    const supabase = createRouteHandlerClient()
    await supabase.auth.exchangeCodeForSession(code)
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(redirectTo)
}
