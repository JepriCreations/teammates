import { Reducer, useReducer } from 'react'

interface State {
  [key: string]: any
}

type Action = Partial<State>

const reducer: Reducer<State, Action> = (state, newState) => ({
  ...state,
  ...newState,
})

export const useMultiState = <T extends State>(initialState: T) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return [state, dispatch] as const
}
