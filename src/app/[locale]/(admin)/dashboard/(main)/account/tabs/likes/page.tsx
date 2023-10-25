import { Suspense } from 'react'
import Image from 'next/image'
import { COUNTRIES } from '@/constants/countries'
import { ROUTES } from '@/constants/routes'

import { getDictionary } from '@/lib/dictionaries'
import { fetchUserLikes } from '@/lib/fetching/profiles'
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Error } from '@/components/error'
import { LinkCard } from '@/components/link-card'

interface PageProps {
  params: { locale: string }
}

export default function LikesTab({ params }: PageProps) {
  return (
    <section className="z-0 mx-auto w-full max-w-2xl grow overflow-auto px-3 py-6">
      <Suspense fallback={<Loading />}>
        <LikesFeed locale={params.locale} />
      </Suspense>
    </section>
  )
}

const LikesFeed = async ({ locale }: { locale: string }) => {
  const { t } = await getDictionary(locale)
  const { error, data } = await fetchUserLikes()

  if (error) return <Error error={error} />

  if (data.length === 0) {
    return (
      <div>
        <p className="muted balance text-center text-body-lg">
          {t('Likes.nothing_to_show')}
        </p>
      </div>
    )
  }

  return (
    <section className="grid gap-3 sm:grid-cols-2">
      {data.map(({ slug, name, summary, icon_url, city, country }) => (
        <LinkCard href={ROUTES.PROJECT(slug)} key={slug}>
          <CardHeader className="flex-row gap-x-3">
            <div className="relative aspect-square h-16 shrink-0 overflow-hidden rounded-md shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)] transition-shadow group-hover:shadow-none">
              <Image fill src={icon_url ?? ''} alt={name} />
            </div>
            <div className="grow overflow-hidden">
              <CardTitle>{name}</CardTitle>
              <p className="truncate text-body-sm">{`${city}, ${
                COUNTRIES[country as keyof typeof COUNTRIES].name
              }`}</p>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>{summary}</CardDescription>
          </CardContent>
        </LinkCard>
      ))}
    </section>
  )
}

const Loading = () => (
  <div className="grid gap-3 md:grid-cols-2">
    {new Array(6).fill(0).map((_, index) => (
      <Skeleton key={index} className="h-[150px] w-full" />
    ))}
  </div>
)
