import Image from 'next/image'

import { getDictionary } from '@/lib/dictionaries'
import { fetchProjectBySlug } from '@/lib/fetching/projects'
import { getColorByWord } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Error } from '@/components/error'
import { RoleIcon } from '@/components/role-icons'

interface ProjectProps {
  params: { slug: string; locale: string }
}

export default async function ProjectPage({
  params: { slug, locale },
}: ProjectProps) {
  const { t } = await getDictionary(locale)
  const { data: project, error } = await fetchProjectBySlug(slug)

  if (!project || error) return <Error error={error} />

  return (
    <main className="p-16">
      <div className="mx-auto max-w-3xl">
        <section className="flex w-full items-start justify-between gap-4">
          <div className="flex grow items-start gap-8 sm:items-center">
            <div className="relative mt-1 aspect-square h-12 border border-outline/12 sm:mt-0">
              <Image src={project.icon_url ?? ''} alt={project.name} fill />
            </div>
            <div className="grow space-y-2 sm:space-y-0">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-headline-sm font-medium">{project.name}</p>
                <div className="flex shrink-0 flex-wrap gap-2">
                  {project.categories.map((category) => (
                    <div
                      key={category}
                      className="min-w-[60px] rounded-lg px-2 py-1 text-center text-label-md"
                      style={{
                        backgroundColor: getColorByWord(category, 0.9)
                          .baseColor,
                        color: getColorByWord(category).contrastingColor,
                      }}
                    >
                      {t(`Categories.${category}`)}
                    </div>
                  ))}
                </div>
              </div>
              <p className="muted">{project.summary}</p>
            </div>
          </div>
        </section>

        <Separator className="my-8" />

        <section className="mb-12">
          <h2 className="mb-3">{t('Project.project_description')}</h2>
          <p className="muted">{project.description}</p>
        </section>

        <section>
          <h2 className="mb-4">{t('Project.open_roles')}</h2>
          <div className="grid grid-cols-1 gap-3">
            {project.roles.map((role, index) => (
              <Card key={role.name + '-' + index} className="p-4">
                <p className="mb-2 text-title-lg">{t(`Roles.${role.name}`)}</p>
                <p className="muted text-body-lg">{role.description}</p>

                <Separator className="my-3" />

                <div className="my-8 grid grid-cols-3 gap-4">
                  {/* Expereince level */}
                  <div className="rounded-md bg-primaryContainer p-4 text-center text-onPrimaryContainer">
                    <div className="wi-full mb-1 flex items-center justify-center gap-2 opacity-70">
                      {RoleIcon.experienceLevelIcon(role.exp_level)}
                      <p className="font-medium">
                        {t('Roles.experience_level')}
                      </p>
                    </div>
                    <p>{t(`Roles.Levels.${role.exp_level}`)}</p>
                  </div>
                  {/* Rewards */}
                  <div className="rounded-md bg-secondaryContainer p-4 text-center text-onSecondaryContainer">
                    <div className="wi-full mb-1 flex items-center justify-center gap-2 opacity-70">
                      {RoleIcon.rewardIcon(role.rewards)}
                      <p className="font-medium">{t('Roles.rewards')}</p>
                    </div>
                    <p>
                      {role.rewards
                        .map((r) => t(`Roles.Rewards.${r}`))
                        .join(', ')}
                    </p>
                  </div>
                  {/* Work mode */}
                  <div className="rounded-md bg-tertiaryContainer p-4 text-center text-onTertiaryContainer">
                    <div className="wi-full mb-1 flex items-center justify-center gap-2 opacity-70">
                      {RoleIcon.workModeIcon(role.work_mode)}
                      <p className="font-medium">{t('Roles.work_mode')}</p>
                    </div>
                    <p>{t(`Roles.Workmode.${role.work_mode}`)}</p>
                  </div>
                </div>

                <div className="ml-auto mt-8 w-fit">
                  <Button variant="accent">I am interested</Button>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
