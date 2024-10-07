'use client'

import * as React from 'react'

import { Translator, translator } from '@/lib/dictionaries'

interface ContextI {
  [x: string]: any
}

const Context = React.createContext<ContextI>({})

export const I18nProvider = ({
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
    return translator({
      dict,
      defaultDict,
      key,
      replacements,
      dictKey,
    })
  }

  return <Context.Provider value={{ t }}>{children}</Context.Provider>
}

export const useDictionary = (dictKey?: string) => {
  const context = React.useContext(Context)
  if (context === undefined) {
    throw new Error('useDictionary must be used inside I18nProvider')
  }

  return {
    t: (key: string, replacements?: React.ReactNode[] | string[]) =>
      context.t(key, replacements, dictKey),
  }
}
