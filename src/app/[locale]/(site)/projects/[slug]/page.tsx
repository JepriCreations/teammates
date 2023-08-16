import Image from 'next/image'
import { linksIcons, LinksIconsType } from '@/constants/links'

import { ProjectLinks } from '@/types/collections'
import { getDictionary } from '@/lib/dictionaries'
import { fetchProjectBySlug } from '@/lib/fetching/projects'
import { getColorByWord } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ApplyButton } from '@/components/apply-button'
import { Error } from '@/components/error'
import { PinIcon } from '@/components/icons'
import { LikeButton } from '@/components/like-button'
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

  const links: ProjectLinks = JSON.parse(JSON.stringify(project.links))
  const filteredLinks = links.filter((link) => link.link !== '')

  return (
    <>
      <div className="mx-auto max-w-3xl">
        <section className="w-full space-y-3">
          <section className="flex grow items-start gap-4 sm:gap-6">
            <div className="relative mt-1 aspect-square h-12 border border-outline/12 sm:h-[62px]">
              <Image src={project.icon_url ?? ''} alt={project.name} fill />
            </div>

            <div className="grow space-y-2">
              <div className="mb-3 mt-1 flex flex-wrap items-end gap-x-6 gap-y-2">
                <p className="text-headline-sm font-medium leading-none">
                  {project.name}
                </p>
                <div className="muted flex shrink-0 gap-1 text-body-md">
                  <PinIcon size={18} />
                  <p>{`${project.city}, ${project.country}`}</p>
                </div>
              </div>

              <div className="flex shrink-0 flex-wrap gap-2">
                {project.categories.map((category) => (
                  <div
                    key={category}
                    className="min-w-[60px] rounded-lg px-2 py-1 text-center text-label-md"
                    style={{
                      backgroundColor: getColorByWord(category, 0.9).baseColor,
                      color: getColorByWord(category).contrastingColor,
                    }}
                  >
                    {t(`Categories.${category}`)}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <p className="muted text-body-lg">{project.summary}</p>

          <section className="flex flex-wrap items-center justify-between gap-12">
            <div className="flex gap-3">
              {filteredLinks.map(({ name, link }) => {
                const Icon = linksIcons[name as LinksIconsType]
                return (
                  <Button asChild key={name} variant="ghost" size="icon">
                    <a href={link} target="_blank">
                      <Icon />
                    </a>
                  </Button>
                )
              })}
            </div>
            <div className="shrink-0">
              <LikeButton
                count={project.likes}
                id={project.id}
                liked={project.liked}
              />
            </div>
          </section>
        </section>

        <Separator className="mb-8 mt-4" />

        <section className="mb-12">
          <h2 className="mb-3">
            {t('Project.project_description', [project.name])}
          </h2>
          <p className="muted text-headline-sm">{project.description}</p>
        </section>

        <section>
          <h2 className="mb-2">{t('Project.open_roles')}</h2>
          <p className="muted mb-4 text-headline-sm">
            {project.roles.length > 0
              ? t('Project.available_roles')
              : t('Project.no_roles_available')}
          </p>
          <div className="grid grid-cols-1 gap-3">
            {project.roles.map((role, index) => (
              <Card key={role.name + '-' + index} className="p-4">
                <p className="mb-2 text-title-lg">{t(`Roles.${role.name}`)}</p>
                <p className="muted text-body-lg">{role.description}</p>

                <div className="my-6 grid grid-cols-3 gap-4">
                  {/* Experience level */}
                  <div className="rounded-md bg-primaryContainer p-4 text-center text-onPrimaryContainer">
                    <div className="wi-full mb-1 flex flex-col items-center justify-center gap-2 opacity-60 sm:flex-row">
                      {RoleIcon.experienceLevelIcon(role.exp_level)}
                      <p className="text-label-lg font-medium">
                        {t('Roles.experience_level')}
                      </p>
                    </div>
                    <p>{t(`Roles.Levels.${role.exp_level}`)}</p>
                  </div>
                  {/* Rewards */}
                  <div className="rounded-md bg-secondaryContainer p-4 text-center text-onSecondaryContainer">
                    <div className="wi-full mb-1 flex flex-col items-center justify-center gap-2 opacity-60 sm:flex-row">
                      {RoleIcon.rewardIcon(role.rewards)}
                      <p className="text-label-lg font-medium">
                        {t('Roles.rewards')}
                      </p>
                    </div>
                    <p>
                      {role.rewards
                        .map((r) => t(`Roles.Rewards.${r}`))
                        .join(', ')}
                    </p>
                  </div>
                  {/* Work mode */}
                  <div className="rounded-md bg-tertiaryContainer p-4 text-center text-onTertiaryContainer">
                    <div className="wi-full mb-1 flex flex-col items-center justify-center gap-2 opacity-60 sm:flex-row">
                      {RoleIcon.workModeIcon(role.work_mode)}
                      <p className="text-label-lg font-medium">
                        {t('Roles.work_mode')}
                      </p>
                    </div>
                    <p>{t(`Roles.Workmode.${role.work_mode}`)}</p>
                  </div>
                </div>

                <div className="ml-auto mt-6 w-fit">
                  <ApplyButton project_id={project.id} role_id={role.id} />
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
