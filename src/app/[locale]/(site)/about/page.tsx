import { getDictionary } from '@/lib/dictionaries'

interface PageProps {
  params: { locale: string }
}

export default async function About({ params: { locale } }: PageProps) {
  const { t } = await getDictionary(locale)
  return (
    <div className="container space-y-12 px-2">
      <section className="mesh-gradient-1 grid h-[calc(100dvh-12rem)] w-full place-items-center rounded-lg duration-200 animate-in fade-in-10 slide-in-from-bottom-24">
        <h1 className="balance max-w-2xl text-center text-display-md font-semibold text-white drop-shadow-md sm:text-display-lg">
          {t('About.title')}
        </h1>
      </section>
      <section className="flex h-[calc(100dvh-12rem)] flex-col items-center justify-center rounded-lg bg-secondaryContainer delay-75 duration-200 animate-in fade-in-10 slide-in-from-bottom-24">
        <div className="space-y-4 px-12 py-24 text-onSecondaryContainer">
          <p className="text-center text-title-md">Developed for</p>
          <p className="balance max-w-2xl text-center text-display-md sm:text-display-lg">
            Help people to{' '}
            <span className="font-semibold text-secondary">
              create amazing things
            </span>
            .
          </p>
        </div>
      </section>
      <section className="flex h-[calc(100dvh-12rem)] flex-col items-center justify-center rounded-lg bg-tertiaryContainer delay-100 duration-200 animate-in fade-in-10 slide-in-from-bottom-24">
        <div className="space-y-4 px-12 py-24 text-onTertiaryContainer">
          <p className="text-center text-title-md">Focused on</p>
          <p className="balance max-w-2xl text-center text-display-md text-onTertiaryContainer sm:text-display-lg">
            Promote{' '}
            <span className="font-semibold text-tertiary">collaboration</span>{' '}
            and{' '}
            <span className="font-semibold text-tertiary">
              create opportunities
            </span>
            .
          </p>
        </div>
      </section>
    </div>
  )
}
