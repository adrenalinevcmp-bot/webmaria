import type { EventItem } from '@/lib/data'
import { SignupDialog } from '@/components/signup-dialog'

export function EventCard({ event }: { event: EventItem }) {
  return (
    <article className="flex flex-col justify-between gap-6 rounded-sm border border-border bg-card p-8">
      <div className="flex flex-col gap-4">
        <span className="text-xs uppercase tracking-[0.3em] text-primary">
          {event.meta}
        </span>
        <h3 className="font-serif text-2xl font-medium text-foreground text-balance">
          {event.title}
        </h3>
        <p className="text-base leading-relaxed text-muted-foreground text-pretty">
          {event.description}
        </p>
        {event.price && (
          <p className="text-sm font-medium text-foreground">{event.price}</p>
        )}
      </div>
      <SignupDialog
        trigger="Apuntarse"
        title={event.title}
        subtitle="Déjanos tus datos y te informaremos sobre este encuentro."
        className="self-start"
      />
    </article>
  )
}
