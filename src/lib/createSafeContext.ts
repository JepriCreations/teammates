import { createContext, useContext } from 'react'

export const createSafeContext = <ContextValue>({
  defaultValue = null,
  name,
  errorMessage,
}: {
  defaultValue?: ContextValue | null
  name?: string
  errorMessage?: string
}) => {
  const Context = createContext<ContextValue | null>(defaultValue)

  if (name) {
    Context.displayName = name
  }

  const useSafeContext = () => {
    const ctx = useContext(Context)

    if (ctx === null) {
      throw new Error(errorMessage)
    }

    return ctx
  }

  const Provider = Context.Provider

  return [Provider, useSafeContext] as const
}
