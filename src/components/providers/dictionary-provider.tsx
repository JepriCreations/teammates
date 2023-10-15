'use client'

import * as React from 'react'
import reactStringReplace from 'react-string-replace'

import { Translator } from '@/lib/dictionaries'

interface ContextI {
  [x: string]: any
}

const Context = React.createContext<ContextI>({})

export const DictionaryProvider = ({
  dict,
  defaultDict,
  children,
}: {
  dict: any
  defaultDict: any
  children: React.ReactNode
}) => {
  const t: Translator = (
    key: string,
    replacements?: React.ReactNode[] | string[],
    dictKey?: string
  ) => {
    const parts = key.split('.')
    let translation = dictKey ? dict[dictKey] : dict
    let defaultTranslation = dictKey ? defaultDict[dictKey] : defaultDict

    for (const part of parts) {
      translation = translation?.[part]
      defaultTranslation = defaultTranslation?.[part]
      // If undefined, use the default dictionary
      if (!translation) {
        translation = defaultTranslation
        break
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

  return <Context.Provider value={{ t }}>{children}</Context.Provider>
}

export const useDictionary = (dictKey?: string) => {
  const context = React.useContext(Context)
  if (context === undefined) {
    throw new Error('useDictionary must be used inside DictionaryProvider')
  }

  return {
    t: (key: string, replacements?: React.ReactNode[] | string[]) =>
      context.t(key, replacements, dictKey),
  }
}
