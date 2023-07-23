'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { PostgressError } from '@/lib/errors'
import { Button } from '@/components/ui/button'

export default function Error({ error }: { error: PostgressError }) {
  const router = useRouter()

  // useEffect(() => {
  //   // Log the error to an error reporting service
  //   console.error(error)
  // }, [error])

  return (
    <div className="grid grid-cols-1 gap-4">
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <p>{error.details}</p>
      <Button onClick={() => router.refresh()}>Try again</Button>
    </div>
  )
}
