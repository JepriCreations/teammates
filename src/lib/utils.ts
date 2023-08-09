import { ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

export const DEBUG = process.env.NODE_ENV === 'development'

export const twMerge = extendTailwindMerge({
  classGroups: {
    'font-size': [
      {
        text: [
          'display-lg',
          'display-md',
          'display-sm',
          'headline-lg',
          'headline-md',
          'headline-sm',
          'title-lg',
          'title-md',
          'title-sm',
          'label-lg',
          'label-md',
          'label-sm',
          'body-lg',
          'body-md',
          'body-sm',
        ],
      },
    ],
  },
})

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function capitalize(input: string): string {
  let words = input.split(/\s+/)
  for (let i = 0; i < words.length; i++) {
    let firstLetter = words[i][0].toUpperCase()
    words[i] = firstLetter + words[i].slice(1)
  }
  return words.join(' ')
}

export function slugify(input: string): string {
  const lowercase = input.toLowerCase().trim()

  // Remove special characters and symbols
  const removedSpecialChars = lowercase.replace(/[^\w\s]/gi, '')

  // Replace spaces with dashes
  const slug = removedSpecialChars.replace(/\s+/g, '-')

  return slug
}

export function getColorByWord(
  word: string,
  opacity: number = 1
): { baseColor: string; contrastingColor: string } {
  const trimmedWord = word.trim().toLowerCase()
  const initials = trimmedWord.substring(0, 3)

  const hashCode = initials.split('').reduce((hash, char) => {
    return char.charCodeAt(0) + (hash << 6) + (hash << 16) - hash
  }, 0)

  const saturation = 40
  const lightness = 70

  const baseHSL = `hsla(${
    hashCode % 360
  }, ${saturation}%, ${lightness}%, ${opacity})`

  const contrastingLightness = 15
  const contrastingColor = `hsla(${
    hashCode % 360
  }, ${saturation}%, ${contrastingLightness}%, ${opacity})`

  return { baseColor: baseHSL, contrastingColor }
}
