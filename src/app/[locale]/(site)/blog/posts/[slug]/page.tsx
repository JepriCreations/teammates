import Image from 'next/image'
import Link from 'next/link'
import { ROUTES } from '@/constants/routes'

import { getDictionary } from '@/lib/dictionaries'
import markdownToHtml from '@/lib/markdownToHtml'
import { getPostBySlug } from '@/lib/posts-api'
import { Button } from '@/components/ui/button'
import { DateFormatter } from '@/components/date-formatter'

export default async function Post({
  params,
}: {
  params: { slug: string; locale: string }
}) {
  const { t } = await getDictionary(params.locale)
  const post = getPostBySlug(params.slug, [
    'title',
    'author',
    'content',
    'date',
    'excerpt',
    'coverImage',
  ])

  const content = await markdownToHtml(post.content || '')

  return (
    <>
      <article className="mx-auto mt-16 max-w-3xl">
        <section className="px-6 sm:px-8">
          <DateFormatter dateString={post.date} />
          <div className="space-y-8">
            <h1 className="balance mb-8 text-display-lg sm:text-7xl md:text-[5rem] md:leading-[5.25rem]">
              {post.title}
            </h1>
            <p className="text-2xl font-light sm:text-display-sm">
              {post.excerpt}
            </p>
          </div>
        </section>
        <section className="my-16 px-3 sm:px-0">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
            <Image
              alt={`cover image for ${post.title}`}
              src={post.coverImage}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </section>
        <section
          className="prose px-6 text-onSurface lg:prose-xl prose-headings:text-onSurface prose-a:text-primary prose-strong:bg-primaryContainer prose-strong:text-primary prose-img:rounded-xl dark:prose-blockquote:text-onSurface sm:px-8"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </article>
      <section className="mt-16">
        <Button asChild className="mx-auto">
          <Link href={ROUTES.BLOG}>{t('Blog.back_to_blog')}</Link>
        </Button>
      </section>
    </>
  )
}
