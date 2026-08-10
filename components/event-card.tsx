import Image from 'next/image'
import type { EventItem } from '@/lib/data'
import { SignupDialog } from '@/components/signup-dialog'

export function EventCard({ event }: { event: EventItem }) {
  return (
    <article className="group relative min-h-[430px] overflow-hidden rounded-sm border border-border bg-card shadow-sm">
      {event.image && (
        <Image
          src={event.image}
          alt={`Imagen de ${event.title}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />
      <div className="relative z-10 flex min-h-[430px] flex-col justify-end gap-4 p-7 text-white md:p-9">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/85">{event.meta}</span>
        <h3 className="font-serif text-3xl font-medium text-white text-balance md:text-4xl">{event.title}</h3>
        <p className="max-w-xl text-base leading-relaxed text-white/90 text-pretty">{event.description}</p>
        {event.price && <p className="text-sm font-semibold text-white">{event.price}</p>}
        <SignupDialog
          trigger="Apuntarse"
          title={event.title}
          subtitle="Déjanos tus datos y te informaremos sobre este encuentro."
          className="mt-2 self-start border-white/40 bg-white text-foreground hover:bg-white/90"
        />
      </div>
    </article>
  )
}
