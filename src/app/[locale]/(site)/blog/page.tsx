import { getAllPosts } from '@/lib/posts-api'
import { PostHero } from '@/components/post-hero'
import { PostPreview } from '@/components/post-preview'

export default async function Blog() {
  const posts = getAllPosts(['title', 'date', 'excerpt', 'coverImage', 'slug'])
  posts.shift()

  return (
    <div className="container mx-auto px-6">
      <section className="flex items-center sm:min-h-[600px]">
        <PostHero />
      </section>

      <section className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article key={post.title}>
            <PostPreview post={post} />
          </article>
        ))}
      </section>
    </div>
  )
}
