import { Suspense } from 'react'

import { fetchUserProfile } from '@/lib/fetching/profiles'
import { LinearProgress } from '@/components/ui/linear-progress'
import { ProfileForm } from '@/components/dashboard/profile/profile-form'
import { Error } from '@/components/error'

interface PageProps {
  params: { locale: string }
}

export default function ProfileTab({}: PageProps) {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <section className="z-0 mx-auto w-full max-w-2xl grow overflow-auto px-3 py-6">
          <UserProfile />
        </section>
      </Suspense>
    </>
  )
}

const UserProfile = async () => {
  const { error, data } = await fetchUserProfile()

  if (error) return <Error error={error} />

  return <ProfileForm profile={data} />
}

const Loading = () => (
  <div>
    <LinearProgress className='fixed inset-x-0 top-0 z-50'/>
  </div>
)
