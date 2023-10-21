import React from 'react'
import * as LocalIcons from '@/icons'

import { ExperienceLevel } from '@/types/collections'

export const Icons = {
  darkMode: LocalIcons.MoonIcon,
  lightMode: LocalIcons.SunIcon,
  systemMode: LocalIcons.LaptopIcon,
  spinner: LocalIcons.LoadingIcon,
  check: LocalIcons.CheckIcon,
  checkSquare: LocalIcons.CheckSquareIcon,
  close: LocalIcons.CloseIcon,
  menu: LocalIcons.MenuIcon,
  remote: LocalIcons.RemoteIcon,
  presential: LocalIcons.PresentialIcon,
  expLevelEntry: (props: React.SVGProps<SVGAElement>) => (
    <LocalIcons.ExperienceLevelIcon level={ExperienceLevel.Entry} {...props} />
  ),
  expLevelIntermediate: (props: React.SVGProps<SVGAElement>) => (
    <LocalIcons.ExperienceLevelIcon
      level={ExperienceLevel.Intermediate}
      {...props}
    />
  ),
  expLevelExpert: (props: React.SVGProps<SVGAElement>) => (
    <LocalIcons.ExperienceLevelIcon level={ExperienceLevel.Expert} {...props} />
  ),
  percentCircle: LocalIcons.PercentCircleIcon,
  contract: LocalIcons.ContractIcon,
  credit: LocalIcons.CreditIcon,
  angleDownSmall: LocalIcons.AngleDownSmallIcon,
  angleRightSmall: LocalIcons.AngleRightSmallIcon,
  arrowUp: LocalIcons.ArrowUpIcon,
  logout: LocalIcons.LogoutIcon,
  imageUpload: LocalIcons.ImageUploadIcon,
  search: LocalIcons.SearchIcon,
  add: LocalIcons.AddIcon,
  trash: LocalIcons.TrashIcon,
  archive: LocalIcons.ArchiveIcon,
  notification: LocalIcons.BellExclamationIcon,
  views: LocalIcons.ViewsIcon,
  statistics: LocalIcons.ChartBarIcon,
  projectDetails: LocalIcons.ProjectDetailsIcon,
  roles: LocalIcons.RolesIcon,
  home: LocalIcons.HomeIcon,
  hits: LocalIcons.HitsIcon,
  like: LocalIcons.HeartIcon,
  likeFilled: LocalIcons.HeartIconFilled,
  likesTag: LocalIcons.HeartTagIcon,
  refresh: LocalIcons.RefreshIcon,
  pin: LocalIcons.PinIcon,
  website: LocalIcons.WebsiteIcon,
  email: LocalIcons.EmailIcon,
  error: LocalIcons.ErrorIcon,
  errorFilled: LocalIcons.ErrorIconFilled,
  errorSquare: LocalIcons.ErrorSquareIcon,
  projects: LocalIcons.ProjectsIcon,
  profile: LocalIcons.ProfileIcon,
  discover: LocalIcons.DiscoverIcon,
  settings: LocalIcons.SettingsIcon,
  account: LocalIcons.AccountIcon,
  applications: LocalIcons.ApplicationsIcon,
  more: LocalIcons.MoreIcon,
  dashboard: LocalIcons.DashboardIcon,
  mailCheck: LocalIcons.MailCheckIcon,

  // Brand Icons
  github: LocalIcons.GithubIcon,
  google: LocalIcons.GoogleIcon,
  apple: LocalIcons.AppleIcon,
  twitter: LocalIcons.TwitterIcon,
  facebook: LocalIcons.FacebookIcon,
  linkedin: LocalIcons.LinkedinIcon,
  instagram: LocalIcons.InstagramIcon,
  mastodon: LocalIcons.MastodonIcon,
}
