import { fetchProjects } from '@/lib/fetching/projects'

// TODO: modify the revalidation time
export const revalidate = 60

export default async function Home() {
  const projects = await fetchProjects()

  return (
    <main className="p-20">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="mb-4 font-bold leading-snug">
          Find the next project to be part of.
        </h1>
        <p className="mx-auto max-w-lg text-base">
          The Powerhouse Platform for Connecting Visionaries and Cultivating
          Success. Step into a World of Collaboration and Innovation.
        </p>
      </div>
      <pre>{JSON.stringify(projects, undefined, 2)}</pre>
    </main>
  )
}
