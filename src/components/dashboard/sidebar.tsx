'use client'

import { usePathname } from 'next/navigation'
import { ROUTES } from '@/constants/routes'

import { IconButton } from '@/components/ui/icon-button'
import { NavigationBar } from '@/components/ui/navigation-bar'
import { Tooltip } from '@/components/ui/tooltip'
import { Icons } from '@/components/icons'
import { useDictionary } from '@/components/providers/dictionary-provider'
import { useAuth } from '@/components/providers/supabase-auth-provider'

export const Sidebar = () => {
  const { signOut, isAuthenticating } = useAuth()
  const { t } = useDictionary()
  const pathname = usePathname()
  const slug = '/' + pathname.split('/').slice(2).join('/')

  return (
    <NavigationBar>
      <NavigationBar.Container>
        <NavigationBar.Item
          href={ROUTES.PROJECTS}
          active={slug.startsWith(ROUTES.PROJECTS)}
          icon={<Icons.projects />}
          label={t('Dashboard.projects')}
        />
        <NavigationBar.Item
          href={ROUTES.PROFILE}
          active={slug.startsWith(ROUTES.ACCOUNT)}
          icon={<Icons.account />}
          label={t('Dashboard.account')}
        />
        <NavigationBar.Item
          href={ROUTES.HOME}
          icon={<Icons.discover />}
          label={t('Dashboard.discover')}
        />
      </NavigationBar.Container>
      <div className="hidden w-full place-items-center md:grid">
        <Tooltip.Provider delayDuration={0}>
          <Tooltip>
            <Tooltip.Trigger asChild>
              <IconButton
                loading={Boolean(isAuthenticating)}
                variant="standard"
                className="h-12 w-12 rounded-full"
                onClick={signOut}
              >
                <Icons.logout />
              </IconButton>
            </Tooltip.Trigger>
            <Tooltip.Content side="right">
              <span className="text-body-sm">{t('Auth.sign_out')}</span>
            </Tooltip.Content>
          </Tooltip>
        </Tooltip.Provider>
      </div>
    </NavigationBar>
  )
}
