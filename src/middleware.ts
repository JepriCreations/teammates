import { type NextRequest } from 'next/server'
import { authMiddleware } from '@/middlewares/authMiddleware'
import { intlMiddleware } from '@/middlewares/intlMiddleware'

export async function middleware(req: NextRequest) {
  // Call the intlMiddleware first
  const intlResponse = await intlMiddleware(req)

  // If intlMiddleware fails return
  if (!intlResponse.ok) {
    return intlResponse
  }

  // Call the authMiddleware
  const authResponse = await authMiddleware(req)

  // Return the response from authMiddleware
  return authResponse
}

export const config = {
  // Paths where middleware should not be initialized
  matcher: ['/((?!_next).*)'],
}
