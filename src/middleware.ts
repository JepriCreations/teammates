import { apiMiddleware } from '@/middlewares/apiMiddleware'
import { authMiddleware } from '@/middlewares/authMiddleware'
import { chain } from '@/middlewares/chain'
import { intlMiddleware } from '@/middlewares/intlMiddleware'

const middlewares = [apiMiddleware, intlMiddleware, authMiddleware]
export default chain(middlewares)

export const config = { matcher: ['/((?!_next|favicon.*).*)'] }
