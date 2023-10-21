'use client'

import { useEffect, useRef, useState } from 'react'

import { useDebounce } from '@/hooks/use-debounce'
import { useProjects } from '@/hooks/use-projects'
import { IconButton } from '@/components/ui/icon-button'
import { Icons } from '@/components/icons'
import { useAuth } from '@/components/providers/supabase-auth-provider'

interface LikeButtonProps {
  id: string
  count?: number
  liked?: boolean
}

export const LikeButton = ({
  id,
  count: currentCount,
  liked = false,
}: LikeButtonProps) => {
  const { user } = useAuth()
  const { addLike, removeLike } = useProjects()
  const [count, setCount] = useState(currentCount)
  const [selected, setSelected] = useState(liked)
  const debouncedValue = useDebounce<boolean>(selected, 1000)
  const isLoaded = useRef(false)

  useEffect(() => {
    const handleLikeChange = async () => {
      let error: any = null
      if (selected) {
        const result = await addLike(id)
        error = result.error
      } else {
        const result = await removeLike(id)
        error = result.error
      }

      if (error) {
        setSelected((prev) => !prev)
        if (count && !selected) {
          setCount(count - 1)
        }
      }
    }

    if (isLoaded.current) {
      handleLikeChange()
    }
  }, [debouncedValue])

  const handleOnLike = async () => {
    isLoaded.current = true
    setSelected((prev) => !prev)
    if (count || count === 0) {
      setCount(count + (selected && count > 0 ? -1 : 1))
    }
  }

  return (
    <div className="flex items-center gap-1 overflow-hidden rounded-2xl bg-onSurfaceVariant/12 pl-4">
      <div className="min-w-[20px]">
        {count && (
          <p className="text-body-sm text-current animate-in slide-in-from-bottom-full">
            {count}
          </p>
        )}
      </div>
      <IconButton
        variant="standard"
        size="small"
        disabled={!user}
        className="relative disabled:bg-transparent"
        onClick={handleOnLike}
      >
        <Icons.like
          size={20}
          className={`relative z-10 ${
            selected
              ? 'text-red-400 transition-colors delay-100'
              : 'text-current'
          }`}
        />
        {selected && (
          <Icons.likeFilled
            size={20}
            className="absolute z-0 m-2 flex items-center justify-center text-red-400 animate-in zoom-in-0"
          />
        )}
      </IconButton>
    </div>
  )
}
