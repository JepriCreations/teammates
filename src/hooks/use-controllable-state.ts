import { useState } from 'react'

export const useControllableState = <T>({
  prop,
  defaultProp,
  onChange,
}: {
  prop: T | undefined
  defaultProp: T | undefined
  onChange?: (newValue: T) => void
}) => {
  const [state, setState] = useState(prop !== undefined ? prop : defaultProp)

  const controlledSetState = (value: T) => {
    setState(value)
    onChange?.(value)
  }

  return [state, controlledSetState] as const
}
