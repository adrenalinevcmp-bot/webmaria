import Link from 'next/link'

export function ContactCta() {
  return (
    <section className="border-t border-border bg-secondary/40">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 px-5 py-16 text-center md:px-8 md:py-20">
        <span className="text-xs uppercase tracking-[0.35em] text-primary">Contacto</span>
        <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl">¿Quieres recibir más información?</h2>
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">Escríbenos para consultas sobre entrevistas, meditaciones, retiros, eventos o acompañamiento individual.</p>
        <Link href="/contacto" className="rounded-sm bg-primary px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground">Contactar</Link>
      </div>
    </section>
  )
}
