import { useCallback } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type QueryStringParams = {
  name: string
  value: string
  append?: boolean
}

export const useSetSearchParams = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const createQueryString = useCallback(
    ({ name, value, append }: QueryStringParams) => {
      const params = new URLSearchParams(searchParams)
      if (value.length > 0) {
        const currentValues = params.getAll(name) || []

        if (!currentValues.includes(value)) {
          if (append) {
            params.append(name, value)
          } else {
            params.set(name, value)
          }
        } else {
          const newValues = currentValues.filter((v) => v !== value)
          params.delete(name)
          newValues.forEach((val) => params.append(name, val))
        }
      } else {
        params.delete(name)
      }

      return params.toString()
    },
    [searchParams]
  )

  const handleChange = ({ name, value, append }: QueryStringParams) => {
    const route = pathname + '?' + createQueryString({ name, value, append })
    router.push(route, { scroll: false })
  }

  return handleChange
}
