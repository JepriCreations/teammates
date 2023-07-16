import { RolesForm } from './roles-form'

export const ProjectRolesForm = () => {
  return (
    <main className="min-h-[calc(100dvh)] pb-16 pt-28">
      <section className="sticky top-[63px] z-40 mx-auto max-w-2xl border border-b border-border border-b-muted bg-card p-6">
        <p className="mb-2 text-lg font-medium">
          Add available roles to your projects
        </p>
        <p className="text-muted-foreground">
          {
            "Identify the key roles needed for your project's success, ranging from developers to designers, marketers, and more."
          }
        </p>
      </section>
      <div className="relative mx-auto max-w-2xl border border-border border-t-transparent bg-card">
        <RolesForm />
      </div>
    </main>
  )
}
