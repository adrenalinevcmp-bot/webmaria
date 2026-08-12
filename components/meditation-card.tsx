import Image from 'next/image'
import { Play, Clock } from 'lucide-react'
import type { Meditation } from '@/lib/data'

export function MeditationCard({ meditation }: { meditation: Meditation }) {
  const content = (
    <article className="group flex h-full flex-col overflow-hidden rounded-sm border border-border bg-card">
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        <Image
          src={meditation.thumbnail || '/placeholder.svg'}
          alt={meditation.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-foreground/10 transition-colors group-hover:bg-foreground/20" />
        <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 text-primary shadow-sm transition-transform duration-300 group-hover:scale-110">
          <Play className="h-4 w-4 translate-x-0.5 fill-current" />
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-6">
        <h3 className="font-serif text-xl font-medium leading-snug text-foreground text-pretty">{meditation.title}</h3>
        {meditation.description && <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground text-pretty">{meditation.description}</p>}
        {meditation.duration && <span className="mt-2 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground"><Clock className="h-3.5 w-3.5" /> {meditation.duration}</span>}
      </div>
    </article>
  )
  return meditation.href ? <a href={meditation.href} target="_blank" rel="noopener noreferrer" className="block h-full">{content}</a> : content
}
