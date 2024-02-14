'use client'

import { memo } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useSetSearchParams } from '@/hooks/use-set-search-params'
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
  const setSearchParams = useSetSearchParams()

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      search: defaultValue ?? '',
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setSearchParams({ name: 'search', value: values.search.trim() })
  }

  const handleClean = () => {
    form.setValue('search', '')
    setSearchParams({ name: 'search', value: '' })
  }

  return (
    <UISearchBar>
      <UISearchBar.LeftSection>
        <Icons.search />
      </UISearchBar.LeftSection>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grow">
          <Form.Field
            control={form.control}
            name="search"
            render={({ field }) => (
              <Form.Item>
                <Form.Control>
                  <div>
                    <label htmlFor="search" className="sr-only">
                      {placeholder}
                    </label>
                    <UISearchBar.Input
                      id="search"
                      autoFocus={Boolean(defaultValue)}
                      placeholder={placeholder}
                      {...field}
                    />
                  </div>
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />
        </form>
      </Form>
      <UISearchBar.RightSection>
        {Boolean(defaultValue) && (
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
  )
}

const SearchBar = memo(_SearchBar)

export { SearchBar }
