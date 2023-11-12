import { ROUTES } from '@/constants/routes'

import { getDictionary } from '@/lib/dictionaries'
import { Icons } from '@/components/icons'
import {
  TabbedNavigation,
  TabbedNavigationLabel,
  TabbedNavigationList,
  TabbedNavigationTrigger,
} from '@/components/tabbed-navigation'

interface ProfileLayoutProps {
  params: { locale: string }
  children: React.ReactNode
}

export default async function ProfileLayout({
  children,
  params,
}: ProfileLayoutProps) {
  const { t } = await getDictionary(params.locale)

  return (
    <>
      <TabbedNavigation className="sticky top-16 z-40 -mt-4 px-3 pt-4 sm:px-12">
        <TabbedNavigationList className="shadow-md">
          <TabbedNavigationTrigger href={ROUTES.PROFILE}>
            <Icons.profile />
            <TabbedNavigationLabel>
              {t('Dashboard.profile')}
            </TabbedNavigationLabel>
          </TabbedNavigationTrigger>
          <TabbedNavigationTrigger href={ROUTES.USER_APPLICATIONS}>
            <Icons.applications />
            <TabbedNavigationLabel>
              {t('Dashboard.applications')}
            </TabbedNavigationLabel>
          </TabbedNavigationTrigger>
          <TabbedNavigationTrigger href={ROUTES.USER_LIKES}>
            <Icons.like />
            <TabbedNavigationLabel>
              {t('Dashboard.likes')}
            </TabbedNavigationLabel>
          </TabbedNavigationTrigger>
        </TabbedNavigationList>
      </TabbedNavigation>
      <div className="flex grow flex-col">{children}</div>
    </>
  )
}
