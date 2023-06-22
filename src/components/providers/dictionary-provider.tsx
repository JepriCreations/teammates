'use client'

import { createContext, useContext } from 'react'
import reactStringReplace from 'react-string-replace'

interface ContextI {
  [x: string]: any
}

const Context = createContext<ContextI>({})

export const DictionaryProvider = ({
  dict,
  children,
}: {
  dict: { [x: string]: any }
  children: React.ReactNode
}) => {
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

  return <Context.Provider value={{ dict, t }}>{children}</Context.Provider>
}

export const useDictionary = (key: string) => {
  let context = useContext(Context)
  if (context === undefined) {
    throw new Error('useDictionary must be used inside DictionaryProvider')
  } else {
    const dict = key ? context.dict[key] : context.dict
    return { ...context, dict }
  }
}
