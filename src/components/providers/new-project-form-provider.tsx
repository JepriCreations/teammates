'use client'

import { createContext, useContext, useReducer } from 'react'

interface State {
  step: number
  projectId: string | undefined
}

interface NewProjectFormContext extends State {
  onNext: (id: string) => void
}

const NewProjectFormContext = createContext<NewProjectFormContext>({
  onNext: () => {},
  step: 0,
  projectId: undefined,
})

interface NewProjectFormProviderProps {
  children: React.ReactNode
}

export const NewProjectFormProvider = ({
  children,
}: NewProjectFormProviderProps) => {
  const [state, setState] = useReducer(
    (prevState: State, newState: Partial<State>): State => ({
      ...prevState,
      ...newState,
    }),
    {
      step: 0,
      projectId: undefined,
    }
  )

  const handleNext = (projectId: string) => {
    setState({ step: state.step + 1, projectId })
  }

  return (
    <NewProjectFormContext.Provider value={{ ...state, onNext: handleNext }}>
      {children}
    </NewProjectFormContext.Provider>
  )
}

export const useNewProjectFormState = () => {
  const context = useContext(NewProjectFormContext)
  if (context === undefined) {
    throw new Error('useFormState must be used inside useFormState')
  }
  return context
}
