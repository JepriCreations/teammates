'use client'

import { Card } from '@/components/ui/card'
import { useDictionary } from '@/components/providers/dictionary-provider'

import { RolesForm } from './roles-form'

export const ProjectRolesForm = () => {
  const { t } = useDictionary('Projects')

  return (
    <main className="py-16">
      <div className="mx-auto max-w-3xl">
        <Card className="bg-surfaceContainerHigh/38">
          <Card.Header>
            <Card.Title>{t('add_available_roles')}</Card.Title>
            <Card.Description>
              {t('add_available_roles_description')}
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <RolesForm />
          </Card.Content>
        </Card>
      </div>
    </main>
  )
}
