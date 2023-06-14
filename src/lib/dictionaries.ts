import 'server-only'
import en from '../dictionaries/en.json'
import es from '../dictionaries/es.json'
import reactStringReplace from 'react-string-replace'

type Dictionary = Record<string, any>

const dictionaries: Dictionary = {
  en: () => Promise.resolve(en),
  es: () => Promise.resolve(es),
}

export const getDictionary = async (locale: string, key?: string) => {
  const localeDict = await dictionaries[locale]()
  let dict = key ? localeDict[key] : localeDict

  const t = (key: string, replacements?: React.ReactNode[]) => {
    let translation = dict[key]
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
