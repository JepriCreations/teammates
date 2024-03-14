import { ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

export const DEBUG = process.env.NODE_ENV === 'development'

const tailwindMergeConfig = {
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
}

export const twMerge = extendTailwindMerge({
  extend: {
    ...tailwindMergeConfig,
  },
})

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export function createComponentWithStatics<Props, Static>(
  baseComponent: React.ComponentType<Props>,
  staticComponents: Static
): React.ComponentType<Props> & Static {
  const component = baseComponent as React.ComponentType<Props> & Static
  Object.assign(component, staticComponents)
  return component
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

export function parseFormData(formData: FormData) {
  const values: Record<string, any> = {}

  for (const key of formData.keys()) {
    const value = formData.get(key)

    if (value === 'null' || value === 'undefined') {
      continue
    }

    if (typeof value === 'string') {
      try {
        // Try parsing as JSON
        values[key] = JSON.parse(value)
      } catch (e) {
        // If parsing as JSON fails, store it as a string
        values[key] = value
      }
    } else {
      values[key] = value
    }
  }

  return values
}
