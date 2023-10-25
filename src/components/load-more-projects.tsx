'use client'

import { useSearchParams } from 'next/navigation'

import { useSetSearchParams } from '@/hooks/use-set-search-params'
import { Button } from '@/components/ui/button'
import { useDictionary } from '@/components/providers/dictionary-provider'

export const LoadMoreProjects = () => {
  const { t } = useDictionary()
  const searchParams = useSearchParams()
  const page = searchParams.get('page')
  const setSearchParams = useSetSearchParams()

  const handleLoadMore = () => {
    if (page) {
      return setSearchParams({
        name: 'page',
        value: String(parseInt(page) + 1),
      })
    }
    setSearchParams({ name: 'page', value: '1' })
  }

  return <Button onClick={handleLoadMore}>Load more</Button>
}
