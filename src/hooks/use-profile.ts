import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { API_ROUTES } from '@/constants/routes'

import { fetcher } from '@/lib/fetcher'

export const useProfile = () => {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)

  const update = async ({ data }: { data: any }) => {
    try {
      setIsPending(true)
      await fetcher.patch({
        url: location.origin + API_ROUTES.PROFILES,
        data,
      })
      router.refresh()
    } catch (error) {
      console.log({ error })
    } finally {
      setIsPending(false)
    }
  }

  return {
    mutation: { update },
    isPending,
  }
}
