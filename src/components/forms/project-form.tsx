'use client'
import { Button } from '@/components/ui/button'

export const ProjectForm = () => {
  const postProject = async () => {
    await fetch(`${location.origin}/api/projects`, {
      method: 'POST',
      body: JSON.stringify({
        name: 'Crafthub',
        summary:
          'Empowering Artisans to Showcase and Sell Handcrafted Treasures.',
        categories: ['art', 'craft'],
        description: '',
        contact: { email: 'info@crafthub.com' },
        public: true,
        location: { country: 'US', city: 'Washington' },
      }),
    })
  }

  return (
    <div>
      Project form
      <Button onClick={postProject}>Create project</Button>
    </div>
  )
}
