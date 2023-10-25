import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { API_ROUTES } from '@/constants/routes'

import { fetcher } from '@/lib/fetcher'

export const useProfile = () => {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)

  const update = async ({ data }: { data: any }) => {
    setIsPending(true)
    return fetcher
      .patch({
        url: location.origin + API_ROUTES.PROFILES,
        data,
      })
      .then((resp) => {
        if (!resp.error) {
          router.refresh()
        }
        setIsPending(false)
        return resp
      })
  }

  return {
    update,
    isPending,
  }
}
