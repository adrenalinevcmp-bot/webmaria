import Image from 'next/image'
import type { EventItem } from '@/lib/data'
import { SignupDialog } from '@/components/signup-dialog'
import { RichText } from '@/components/rich-text'

export function EventCard({ event }: { event: EventItem }) {
  return (
    <article className="overflow-hidden rounded-sm border border-border bg-card shadow-sm md:grid md:grid-cols-2 md:items-stretch">
      {event.image && (
        <div className="relative aspect-[4/3] w-full bg-muted md:aspect-auto md:min-h-[360px]">
          <Image
            src={event.image}
            alt={`Imagen de ${event.title}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="flex flex-col justify-center gap-4 p-6 text-foreground md:p-9">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/65">{event.meta}</span>
        <h3 className="font-serif text-3xl font-medium text-foreground text-balance md:text-4xl">{event.title}</h3>
        <RichText text={event.description} className="max-w-xl space-y-3 text-base leading-relaxed text-muted-foreground text-pretty" />
        {event.price && <p className="text-sm font-semibold text-foreground">{event.price}</p>}
        <SignupDialog
          trigger="Apuntarse"
          title={event.title}
          subtitle="Déjanos tus datos y te informaremos sobre este encuentro."
          className="mt-2 self-start border-primary/30 bg-primary text-primary-foreground hover:bg-primary/90"
        />
      </div>
    </article>
  )
}
