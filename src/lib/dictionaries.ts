import 'server-only'

import React from 'react'
import reactStringReplace from 'react-string-replace'

import en from '../dictionaries/en.json'
import es from '../dictionaries/es.json'

export type Dictionary = Partial<typeof en> & Record<string, any>
export type Translator = (
  key: string,
  replacements?: React.ReactNode[],
  dict?: any
) => any

const dictionaries: Dictionary = {
  en: () => Promise.resolve(en),
  es: () => Promise.resolve(es),
}

export const getDictionary = async (locale: string, key?: string) => {
  const localeDict = await dictionaries[locale]()
  const defaultLocaleDict =
    locale !== 'en' ? await dictionaries['en']() : localeDict
  const dict = key ? localeDict[key] : localeDict
  const defaultDict = key ? defaultLocaleDict[key] : defaultLocaleDict

  const t: Translator = (key: string, replacements?: React.ReactNode[]) => {
    const parts = key.split('.')
    let translation = dict
    let defaultTranslation = defaultDict

    for (const part of parts) {
      translation = translation?.[part]
      defaultTranslation = defaultTranslation[part]

      // If undefined, use the default dictionary
      if (!translation) {
        translation = defaultTranslation
        continue
      }
    }

    if (replacements && replacements.length > 0) {
      replacements.forEach((replacement, index) => {
        const placeholder = `%${index}`
        if (typeof replacement === 'string') {
          return (translation = translation.replace(placeholder, replacement))
        }
        if (React.isValidElement(replacement)) {
          translation = reactStringReplace(translation, placeholder, () =>
            React.cloneElement(replacement, { key: index })
          )
        }
      })
    }

    const breakRegex = /(\n)/g
    if (typeof translation === 'string' && translation.match(breakRegex)) {
      translation = reactStringReplace(translation, breakRegex, () =>
        React.createElement('br', { key: Math.random() })
      )
    }

    return translation
  }

  return { dict, defaultDict, t }
}
