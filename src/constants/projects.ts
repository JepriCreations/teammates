import { ExperienceLevel, Rewards, WorkMode } from '@/types/collections'
import { Translator } from '@/lib/dictionaries'

const GeneralRoles = {
  ContentCreator: 'content_creator', // To produce engaging content for the project's website, socials, blog, or marketing materials.
  CustomerSupport: 'customer_support', // To provides assistance to users and collects valuable feedback.
  Developer: 'developer', // To create the code for the project's app, website, blog...
  GraphicDesigner: 'graphic_designer', // To create the visual elements of the project, such as the user interface, logos, and branding.
  InvestorManager: 'investor_manager', // To identify and engage potential investors, build relationships with them, and secure funding for the project.
  LegalCounsel: 'legal_counsel', // To ensure the project's compliance with legal requirements and handles contracts and agreements.
  Marketer: 'marketer', // To develop and execute marketing strategies, including social media, content marketing, and user acquisition.
  ProductManager: 'product_manager', // To help shape the product's direction, prioritize features, and coordinate development efforts.
  Sales: 'sales', // To acquire new customers and growing the user base.
  Other: 'other',
}

const AgricultureRoles = {}
const ArtRoles = {
  Illustrator: 'illustrator',
}
const EducationRoles = {
  Teacher: 'teacher',
}
const EntertainmentRoles = {
  Actor: 'actor',
  Director: 'director',
  VideoProducer: 'video_producer',
  SoundProducer: 'sound_producer',
}
const EnvironmentRoles = {}
const FashionRoles = {
  Photographer: 'photographer',
  MakeupArtist: 'makeup_artist',
}
const FinanceRoles = {}
const FoodRoles = {}
const HealthRoles = {}
const LifestyleRoles = {}
const MusicRoles = {
  Musician: 'musician',
  Composer: 'composer',
  Singer: 'singer',
  VoiceActor: 'voice_actor',
  Announcer: 'announcer',
}
const NonprofitRoles = {}
const RetailRoles = {}
const ScienceRoles = {}
const SportsRoles = {
  Coach: 'coach',
}
const TechnologyRoles = {}
const TravelRoles = {
  Guide: 'guide',
  Instructor: 'instructor',
}

const Roles = {
  agriculture: { ...AgricultureRoles },
  art: { ...ArtRoles },
  education: { ...EducationRoles },
  entertainment: { ...EntertainmentRoles },
  environment: { ...EnvironmentRoles },
  fashion: { ...FashionRoles },
  finance: { ...FinanceRoles },
  food: { ...FoodRoles },
  health: { ...HealthRoles },
  lifestyle: { ...LifestyleRoles },
  music: { ...MusicRoles },
  nonprofit: { ...NonprofitRoles },
  retail: { ...RetailRoles },
  science: { ...ScienceRoles },
  sports: { ...SportsRoles },
  technology: { ...TechnologyRoles },
  travel: { ...TravelRoles },
  general: { ...GeneralRoles },
} as const

export type Category = keyof typeof Roles

export const ROLES = (t: Translator, categories: Category[]) => {
  let roles = Object.values(Roles.general).map((role) => ({
    value: role,
    label: t(role),
  }))

  categories.forEach((category) => {
    const categoryRoles = Object.values(Roles[category]).map((role) => ({
      value: role,
      label: t(role),
    }))
    roles = [...categoryRoles, ...roles]
  })
  return roles
}

export const EXPERIENCE_LEVEL = (t: Translator) =>
  Object.values(ExperienceLevel).map((level) => ({
    value: level,
    label: t(`Levels.${level}`),
  }))

export const WORK_MODE = (t: Translator) =>
  Object.values(WorkMode).map((mode) => ({
    value: mode,
    label: t(`Workmode.${mode}`),
  }))

export const REWARDS = (t: Translator) =>
  Object.values(Rewards).map((mode) => ({
    value: mode,
    label: t(`Rewards.${mode}`),
  }))

const categoryConstructor = (t: Translator, value: string) => ({
  value,
  label: t(value),
})
export const CATEGORIES = (t: Translator) =>
  [
    categoryConstructor(t, 'agriculture'),
    categoryConstructor(t, 'art'),
    categoryConstructor(t, 'education'),
    categoryConstructor(t, 'entertainment'),
    categoryConstructor(t, 'environment'),
    categoryConstructor(t, 'fashion'),
    categoryConstructor(t, 'finance'),
    categoryConstructor(t, 'food'),
    categoryConstructor(t, 'health'),
    categoryConstructor(t, 'lifestyle'),
    categoryConstructor(t, 'music'),
    categoryConstructor(t, 'nonprofit'),
    categoryConstructor(t, 'retail'),
    categoryConstructor(t, 'science'),
    categoryConstructor(t, 'sports'),
    categoryConstructor(t, 'technology'),
    categoryConstructor(t, 'travel'),
  ] as const

export const CATEGORIES_ICONS = {
  agriculture: '🌾',
  art: '🎨',
  education: '🎓',
  entertainment: '🎬',
  environment: '🌍',
  fashion: '👗',
  finance: '💰',
  food: '🍳',
  health: '❤️',
  lifestyle: '🏠',
  music: '🎼',
  nonprofit: '👥',
  retail: '🛍️',
  science: '🧪',
  sports: '⚽',
  technology: '🤖',
  travel: '🛫',
} as const
