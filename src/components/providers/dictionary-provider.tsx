'use client'

import { createContext, useContext } from 'react'

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
  return <Context.Provider value={dict}>{children}</Context.Provider>
}

export const useDictionary = (key: string) => {
  let context = useContext(Context)
  if (context === undefined) {
    throw new Error('useDictionary must be used inside DictionaryProvider')
  } else {
    return context?.[key] ?? {}
  }
}
