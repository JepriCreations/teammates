'use client'

import { memo, useCallback } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Form } from '@/components/ui/form'
import { IconButton } from '@/components/ui/icon-button'
import { SearchBar as UISearchBar } from '@/components/ui/search-bar'
import { Icons } from '@/components/icons'

const formSchema = z.object({
  search: z.string(),
})

const _SearchBar = ({
  placeholder,
  defaultValue,
}: {
  placeholder?: string
  defaultValue?: string
}) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      search: defaultValue ?? '',
    },
  })

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      if (value.length > 0) {
        params.set(name, value)
      } else {
        params.delete(name)
      }

      return params.toString()
    },
    [searchParams]
  )

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const route =
      pathname + '?' + createQueryString('search', values.search.trim())
    router.push(route, { scroll: false })
  }

  const handleClean = () => {
    form.setValue('search', '')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Form.Field
          control={form.control}
          name="search"
          render={({ field }) => (
            <Form.Item>
              <Form.Control>
                <UISearchBar>
                  <UISearchBar.LeftSection>
                    <Icons.search />
                  </UISearchBar.LeftSection>
                  <label htmlFor="search" className="sr-only">
                    {placeholder}
                  </label>
                  <UISearchBar.Input
                    id="search"
                    autoFocus={Boolean(searchParams.get('search'))}
                    placeholder={placeholder}
                    value={field.value}
                    onChange={field.onChange}
                  />
                  <UISearchBar.RightSection>
                    {Boolean(searchParams.get('search')) && (
                      <IconButton
                        onClick={handleClean}
                        variant="standard"
                        className="-mr-2"
                      >
                        <Icons.close />
                      </IconButton>
                    )}
                  </UISearchBar.RightSection>
                </UISearchBar>
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />
      </form>
    </Form>
  )
}

const SearchBar = memo(_SearchBar)

export { SearchBar }
