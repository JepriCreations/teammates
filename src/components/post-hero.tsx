import Image from 'next/image'
import Link from 'next/link'
import { ROUTES } from '@/constants/routes'

import { getLastPost } from '@/lib/posts-api'
import { DateFormatter } from '@/components/date-formatter'

export const PostHero = () => {
  const heroPost = getLastPost([
    'title',
    'excerpt',
    'slug',
    'date',
    'coverImage',
  ])

  if (!heroPost) {
    return null
  }

  return (
    <Link href={`${ROUTES.POSTS}/${heroPost.slug}`} className="group w-full">
      <article className="flex flex-col lg:flex-row lg:items-center">
        <div className="mb-8 mr-8 flex basis-1/2 flex-col justify-center">
          <h1 className="balance mb-8 text-display-sm transition-colors group-hover:text-primary sm:text-7xl md:text-[5rem] md:leading-[5.25rem]">
            {heroPost.title}
          </h1>
          <div className="flex flex-col gap-x-6 gap-y-3 lg:flex-row">
            <DateFormatter dateString={heroPost.date} />
            <p className="muted grow text-body-lg font-light">
              {heroPost.excerpt}
            </p>
          </div>
        </div>
        <div className="relative aspect-video basis-1/2 overflow-hidden rounded-xl transition-[box-shadow,transform] group-hover:-translate-x-2 group-hover:-translate-y-2 group-hover:shadow-[8px_8px_0px_hsl(var(--secondaryFixed))]">
          <Image
            alt={`cover image for ${heroPost.title}`}
            src={heroPost.coverImage}
            fill
            className="object-cover"
          />
        </div>
      </article>
    </Link>
  )
}
