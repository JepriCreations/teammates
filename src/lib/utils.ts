import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
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
