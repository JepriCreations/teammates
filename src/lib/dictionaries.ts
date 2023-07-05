import 'server-only'

import reactStringReplace from 'react-string-replace'

import en from '../dictionaries/en.json'
import es from '../dictionaries/es.json'

export type Dictionary = Partial<typeof en> & Record<string, any>
export type Translator = (key: string, replacements?: React.ReactNode[]) => any

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
      translation = translation[part]
      defaultTranslation = defaultTranslation[part]
      // If undefined, use the default dictionary
      if (!translation) {
        translation = defaultTranslation
        break
      }
    }

    if (replacements && replacements.length > 0) {
      replacements.forEach((replacement, index) => {
        const placeholder = `%${index}`
        translation = reactStringReplace(
          translation,
          placeholder,
          () => replacement
        )
      })
    }

    return translation
  }

  return { dict, t }
}
