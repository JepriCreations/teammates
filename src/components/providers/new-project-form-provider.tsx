'use client'

import { createContext, useContext, useReducer } from 'react'
import { type Category } from '@/constants/projects'

interface State {
  step: number
  projectId: string | undefined
  categories: Category[]
}

interface NewProjectFormContext extends State {
  onNext: ({
    projectId,
    categories,
  }: {
    projectId: string
    categories: Category[]
  }) => void
}

const NewProjectFormContext = createContext<NewProjectFormContext>({
  onNext: () => {},
  step: 0,
  projectId: undefined,
  categories: [],
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
      categories: [],
    }
  )

  const handleNext = ({
    projectId,
    categories,
  }: {
    projectId: string
    categories: Category[]
  }) => {
    setState({ step: state.step + 1, projectId, categories })
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
