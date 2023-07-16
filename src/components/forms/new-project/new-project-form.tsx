import { ProjectForm } from './project-form'

export const NewProjectForm = () => {
  return (
    <main className="min-h-[calc(100dvh)] pb-16 pt-28">
      <section className="sticky top-[63px] z-40 mx-auto max-w-2xl border border-b border-border border-b-muted bg-card p-6">
        <p className="mb-2 text-lg font-medium">Create new project</p>
        <p className="text-muted-foreground">
          Unlock the power of collaboration: find like-minded teammates to
          elevate your project and make your vision a resounding success.
        </p>
      </section>
      <div className="relative mx-auto max-w-2xl border border-border border-t-transparent bg-card">
        <ProjectForm />
      </div>
    </main>
  )
}
