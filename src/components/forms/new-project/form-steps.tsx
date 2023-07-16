'use client'

import { useNewProjectFormState } from '@/components/providers/new-project-form-provider'

import { NewProjectForm } from './new-project-form'
import { ProjectRolesForm } from './project-roles-form'

export const FormSteps = () => {
  const { step } = useNewProjectFormState()

  switch (step) {
    case 0:
      return <NewProjectForm />
    case 1:
      return <ProjectRolesForm />
    default:
      return null
  }
}
