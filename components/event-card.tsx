import Image from 'next/image'
import type { EventItem } from '@/lib/data'
import { SignupDialog } from '@/components/signup-dialog'

export function EventCard({ event }: { event: EventItem }) {
  return (
    <article className="group overflow-hidden rounded-sm border border-border bg-card shadow-sm md:relative md:min-h-[430px]">
      {event.image && (
        <Image
          src={event.image}
          alt={`Imagen de ${event.title}`}
          width={1200}
          height={1500}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="h-auto w-full object-contain md:absolute md:inset-0 md:h-full md:object-cover md:transition-transform md:duration-700 md:group-hover:scale-[1.03]"
        />
      )}
      <div className="hidden md:absolute md:inset-0 md:block md:bg-gradient-to-t md:from-black/80 md:via-black/35 md:to-black/10" />
      <div className="relative z-10 flex flex-col justify-end gap-4 p-6 text-foreground md:min-h-[430px] md:p-9 md:text-white">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/65 md:text-white/85">{event.meta}</span>
        <h3 className="font-serif text-3xl font-medium text-foreground text-balance md:text-white md:text-4xl">{event.title}</h3>
        <p className="max-w-xl text-base leading-relaxed text-muted-foreground text-pretty md:text-white/90">{event.description}</p>
        {event.price && <p className="text-sm font-semibold text-foreground md:text-white">{event.price}</p>}
        <SignupDialog
          trigger="Apuntarse"
          title={event.title}
          subtitle="Déjanos tus datos y te informaremos sobre este encuentro."
          className="mt-2 self-start border-primary/30 bg-primary text-primary-foreground hover:bg-primary/90 md:border-white/40 md:bg-white md:text-foreground md:hover:bg-white/90"
        />
      </div>
    </article>
  )
}
