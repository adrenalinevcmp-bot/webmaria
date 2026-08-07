export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string
  title: string
  intro?: string
}) {
  return (
    <section className="border-b border-border bg-secondary/40">
      <div className="mx-auto max-w-4xl px-5 py-16 text-center md:px-8 md:py-24">
        <span className="text-xs uppercase tracking-[0.35em] text-primary">
          {eyebrow}
        </span>
        <h1 className="mt-4 font-serif text-4xl font-medium leading-tight text-foreground text-balance md:text-5xl">
          {title}
        </h1>
        {intro && (
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty md:text-lg">
            {intro}
          </p>
        )}
      </div>
    </section>
  )
}
