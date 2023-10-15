import Image from 'next/image'
import Link from 'next/link'
import { linksIcons, LinksIconsType } from '@/constants/links'
import { ROUTES } from '@/constants/routes'

import { ExperienceLevel, LinkType } from '@/types/collections'
import { getDictionary, Translator } from '@/lib/dictionaries'
import { fetchProjectBySlug } from '@/lib/fetching/projects'
import { Card } from '@/components/ui/card'
import { Chip } from '@/components/ui/chip'
import { ApplyButton } from '@/components/apply-button'
import { Error } from '@/components/error'
import { Icons } from '@/components/icons'
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

  const links: LinkType[] = JSON.parse(JSON.stringify(project.links))
  const filteredLinks = links.filter((link) => link.url !== '')

  return (
    <div className="mx-auto max-w-4xl">
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <section className="space-y-4 md:col-span-2">
          <Card className="bg-surfaceContainerHighest/50 p-4">
            <section>
              <section className="flex grow items-start gap-2 sm:gap-4">
                <div className="relative aspect-square h-12 shrink-0 overflow-hidden rounded-sm border border-outline/12 sm:h-[62px]">
                  <Image src={project.icon_url ?? ''} alt={project.name} fill />
                </div>

                <div className="grow space-y-2">
                  <div className="space-y-1">
                    <p className="text-headline-sm font-medium leading-none">
                      {project.name}
                    </p>
                    <p className="muted text-body-md">{project.summary}</p>
                  </div>

                  <div className="flex flex-wrap-reverse items-center gap-4">
                    <div className="flex shrink-0 grow flex-wrap gap-x-2 gap-y-1">
                      {project.categories.map((category) => (
                        <Chip key={category} className="h-7">
                          <Chip.Label className="text-label-md">
                            {t(`Categories.${category}`)}
                          </Chip.Label>
                        </Chip>
                      ))}
                    </div>
                    <div className="shrink-0">
                      <LikeButton
                        count={project.likes}
                        id={project.id}
                        liked={project.liked}
                      />
                    </div>
                  </div>
                </div>
              </section>
            </section>
          </Card>

          <Card className="bg-surfaceContainerHighest/50 p-4">
            <p className="mb-3 text-title-lg">
              {t('Project.project_description', [project.name])}
            </p>
            <p className="muted text-body-lg">{project.description}</p>
          </Card>
        </section>
        <SideInfo
          city={project.city}
          country={project.country}
          links={filteredLinks}
          similarProjects={project.similarProjects}
          t={t}
        />
      </section>

      <section className="my-12">
        <h2 className="mb-2 ml-1">{t('Project.open_roles')}</h2>
        <p className="muted mb-4 ml-1 text-headline-sm">
          {project.roles.length > 0
            ? t('Project.available_roles')
            : t('Project.no_roles_available')}
        </p>
        <div className="grid grid-cols-1 gap-3">
          {project.roles.map((role, index) => (
            <Card
              key={role.name + '-' + index}
              className="p-4"
              variant="outlined"
            >
              <p className="mb-2 text-title-lg">{t(`Roles.${role.name}`)}</p>
              <p className="muted text-body-lg">{role.description}</p>

              <div className="my-6 grid grid-cols-3 gap-4">
                {/* Experience level */}
                <div className="rounded-md bg-primaryContainer/50 p-4 text-center text-onPrimaryContainer">
                  <div className="wi-full mb-1 flex flex-col items-center justify-center gap-2 opacity-60 sm:flex-row">
                    {RoleIcon.experienceLevelIcon(
                      role.exp_level as ExperienceLevel
                    )}
                    <p className="text-label-lg font-medium">
                      {t('Roles.experience_level')}
                    </p>
                  </div>
                  <p>{t(`Roles.Levels.${role.exp_level}`)}</p>
                </div>
                {/* Rewards */}
                <div className="rounded-md bg-secondaryContainer/50 p-4 text-center text-onSecondaryContainer">
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
                <div className="rounded-md bg-tertiaryContainer/50 p-4 text-center text-onTertiaryContainer">
                  <div className="wi-full mb-1 flex flex-col items-center justify-center gap-2 opacity-60 sm:flex-row">
                    {RoleIcon.workModeIcon(role.work_mode)}
                    <p className="text-label-lg font-medium">
                      {t('Roles.work_mode')}
                    </p>
                  </div>
                  <p>{t(`Roles.Workmode.${role.work_mode}`)}</p>
                </div>
              </div>

              <div className="ml-auto mt-6 w-fit text-end">
                <ApplyButton project_id={project.id} role_id={role.id} />
              </div>
            </Card>
          ))}
        </div>
      </section>
      <section className="block md:hidden">
        <SimilarProjects t={t} projects={project.similarProjects} />
      </section>
    </div>
  )
}

type SimilarProjects = {
  name: string
  icon_url: string | null
  categories: string[]
  slug: string
}[]

const SideInfo = ({
  city,
  country,
  links,
  similarProjects,
  t,
}: {
  city: string
  country: string
  links: LinkType[]
  similarProjects: SimilarProjects
  t: Translator
}) => {
  return (
    <section className="space-y-4">
      <Card className="bg-surfaceContainerHighest/50 p-4">
        <p className="mb-2 text-title-sm">{t('Project.location')}</p>
        <div className="flex items-center gap-2 text-body-sm">
          <Icons.pin size={20} className="muted" />
          <p>{`${city}, ${country}`}</p>
        </div>
      </Card>
      <Card className="bg-surfaceContainerHighest/50 p-4">
        <p className="mb-2 text-title-sm">{t('Project.social')}</p>
        <div className="space-y-2">
          {links.length === 0 && (
            <p className="muted text-body-sm italic">{t('Project.no_links')}</p>
          )}
          {links.map(({ name, url }) => {
            const Icon = linksIcons[name as LinksIconsType]
            return (
              <div key={name} className="flex items-center gap-2 text-body-sm">
                <Icon size={20} className="muted" />
                <a
                  href={url}
                  target="_blank"
                  className={`max-w-full truncate hover:underline ${
                    name !== 'website' ? 'capitalize' : ''
                  }`}
                >
                  {name === 'website' ? url : name}
                </a>
              </div>
            )
          })}
        </div>
      </Card>
      <section className="hidden md:block">
        <SimilarProjects t={t} projects={similarProjects} />
      </section>
    </section>
  )
}

const SimilarProjects = ({
  projects = [],
  t,
}: {
  projects: SimilarProjects
  t: Translator
}) => {
  return (
    <Card className="bg-surfaceContainerHighest/50">
      <p className="mx-4 mb-2 mt-4 text-title-sm">
        {t('Project.similar_projects')}
      </p>
      <section className="mb-2 max-w-full">
        {projects.length === 0 && (
          <p className="muted mx-4 mb-4 text-body-sm italic">
            {t('Project.no_similar_projects')}
          </p>
        )}
        {projects.map(({ name, icon_url: picture, categories, slug }) => (
          <Link
            key={slug}
            href={ROUTES.PROJECT(slug)}
            className="mx-2 flex max-w-full items-center gap-2 rounded-xs p-2 transition-colors hover:bg-onSurface/5"
          >
            <div className="relative aspect-square h-10 shrink-0 overflow-hidden rounded-xs">
              <Image src={picture ?? ''} alt={name} fill />
            </div>
            <div className="min-w-0 grow">
              <p className="title-title-sm max-w-full truncate leading-tight">
                {name}
              </p>
              <p className="muted max-w-full truncate text-body-sm">
                {categories.map((c) => t(`Categories.${c}`)).join(' & ')}
              </p>
            </div>
          </Link>
        ))}
      </section>
    </Card>
  )
}
