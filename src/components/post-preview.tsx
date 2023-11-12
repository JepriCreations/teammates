import Image from 'next/image'
import Link from 'next/link'
import { ROUTES } from '@/constants/routes'

import { DateFormatter } from '@/components/date-formatter'

type Items = {
  [key: string]: string
}

export const PostPreview = ({ post }: { post: Items }) => {
  return (
    <div className="group">
      <Link
        href={`${ROUTES.POSTS}/${post.slug}`}
        className="group flex flex-col-reverse sm:flex-col"
      >
        {post?.coverImage && (
          <div className="relative my-8 aspect-video h-full overflow-hidden rounded-xl transition-[box-shadow,transform] group-hover:-translate-x-1.5 group-hover:-translate-y-1.5 group-hover:shadow-[6px_6px_0px_hsl(var(--tertiaryFixed))] sm:my-2">
            <Image
              alt={`cover image for ${post.title}`}
              src={post.coverImage}
              className="object-cover"
              fill
            />
          </div>
        )}
        <div className="mt-4 space-y-6 sm:space-y-2">
          <p className="balance text-display-sm group-hover:text-secondary sm:text-title-lg">
            {post.title}
          </p>
          <div className="space-y-3">
            <DateFormatter dateString={post.date} />
            <p className="muted text-body-md font-thin">{post.excerpt}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}
