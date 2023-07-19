import { FormSteps } from '@/components/forms/new-project/form-steps'
import { FormHeader } from '@/components/forms/new-project/header'
import { NewProjectFormProvider } from '@/components/providers/new-project-form-provider'

export default async function NewProject() {
  return (
    <NewProjectFormProvider>
      <FormHeader />
      <FormSteps />
    </NewProjectFormProvider>
  )
}
