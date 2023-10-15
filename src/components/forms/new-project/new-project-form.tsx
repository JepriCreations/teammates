'use client'

import { Card } from '@/components/ui/card'
import { useDictionary } from '@/components/providers/dictionary-provider'

import { ProjectForm } from './project-form'

export const NewProjectForm = () => {
  const { t } = useDictionary('Projects')
  return (
    <main className="py-6">
      <div className="mx-auto max-w-3xl">
        <Card className="bg-surfaceContainerHigh/38">
          <Card.Header>
            <Card.Title>{t('create_new_project')}</Card.Title>
            <Card.Description className="balance">
              {t('new_project_description')}
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <ProjectForm action="create" />
          </Card.Content>
        </Card>
      </div>
    </main>
  )
}
