import Image from 'next/image'
import Link from 'next/link'
import { Play } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { QuoteGallery } from '@/components/quote-gallery'
import { EventCard } from '@/components/event-card'
import { featuredVideo as fallbackVideo } from '@/lib/data'
import { getUpcomingEvents } from '@/lib/events'
import { getYoutubeContent } from '@/lib/youtube'
import { ContactCta } from '@/components/contact-cta'

const HERO_VIDEO_ID = 'jMi5r7K2DQM'

function shortDescription(description: string) {
  const marker = 'nuestra conexión con la vida'
  const lower = description.toLowerCase()
  const index = lower.indexOf(marker)
  if (index >= 0) {
    const end = index + marker.length
    const cut = description.slice(0, end).trim()
    return /[.!?]$/.test(cut) ? cut : `${cut}.`
  }
  return description
}

export default async function HomePage() {
  const youtube = await getYoutubeContent()
  // El vídeo semanal de portada se alimenta de la playlist de entrevistas.
  // Al añadir una nueva entrevista a esa playlist, esta sección se actualiza sola.
  const featuredVideo = youtube.interviews[0] || youtube.all[0] || fallbackVideo
  const upcomingEvents = await getUpcomingEvents()

  return (
    <>
      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-5 pb-10 pt-6 md:px-8 md:pb-14 md:pt-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
        <div className="flex flex-col gap-6">
          <h1 className="font-serif text-4xl font-medium leading-[1.06] text-foreground text-balance md:text-5xl lg:text-6xl">
            El sentido de la vida se encuentra sirviendo a la vida
          </h1>
          <p className="max-w-md text-[1.05rem] leading-relaxed text-foreground/75 text-pretty">
            Espiritualidad, conciencia y transformación interior. Una invitación a reconocer aquello que ya somos.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={featuredVideo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Play className="h-4 w-4 fill-current" /> Ver último vídeo
            </a>
            <Link
              href="/#sobre-maria"
              className="inline-flex items-center rounded-sm border border-primary/35 bg-background px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Conoce a María
            </Link>
          </div>
        </div>

        <div className="overflow-hidden rounded-sm border border-border bg-card shadow-sm">
          <div className="aspect-video w-full">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${HERO_VIDEO_ID}?rel=0`}
              title="María Olid · El Despertar"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section className="border-y border-primary/15 bg-secondary/75">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-5 py-10 md:px-8 md:py-12 lg:grid-cols-[1.2fr_1fr]">
          <a
            href={featuredVideo.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block aspect-video overflow-hidden rounded-sm bg-muted"
            aria-label={`Ver vídeo: ${featuredVideo.title}`}
          >
            <Image
              src={featuredVideo.thumbnail || '/placeholder.svg'}
              alt={featuredVideo.title}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-foreground/15 transition-colors group-hover:bg-foreground/25" />
            <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 text-primary shadow-sm transition-transform duration-300 group-hover:scale-110">
              <Play className="h-6 w-6 translate-x-0.5 fill-current" />
            </span>
          </a>
          <div className="flex flex-col gap-4">
            <span className="text-xs uppercase tracking-[0.35em] text-primary">Último vídeo · {featuredVideo.date}</span>
            <h2 className="font-serif text-3xl font-medium leading-tight text-foreground text-balance">{featuredVideo.title}</h2>
            <p className="line-clamp-[10] text-base leading-relaxed text-foreground/75 text-pretty">
              {shortDescription(featuredVideo.description)}
            </p>
            <Link
              href="/youtube"
              className="mt-2 inline-flex w-fit items-center rounded-sm bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-90"
            >
              Ver todas las entrevistas
            </Link>
          </div>
        </div>
      </section>

      <section id="sobre-maria" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-14 md:px-8 md:py-18">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
          <div className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-muted lg:sticky lg:top-24">
              <Image
                src="/images/maria-sobre-bn.png"
                alt="María Olid"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-[66%_50%]"
              />
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="font-serif text-3xl font-medium leading-tight text-foreground md:text-4xl">La vida es un despertar</h2>
            <div className="flex flex-col gap-4 text-[1.05rem] leading-[1.8] text-muted-foreground text-pretty md:text-lg">
              <p>La vida es un despertar. Seamos todos bienvenidos al despertar.</p>
              <p>Y podemos decirlo sin miedo a equivocarnos: todos estamos sujetos a infinitos despertares al Ser que somos, visto desde esta experiencia procesal llamada vida.</p>
              <p>Todo movimiento que toma nuestra vida nos lleva a asumir más amor. Cada cambio es una oportunidad para amar y para amarnos.</p>
              <p>Ahora puedo decir que el camino del espíritu es un camino de Amor. No necesitas un gurú, o un maestro iluminado; el despertar ya está siendo y sucediendo en ti.</p>
              <p>Es la vida misma la que se está ocupando de tu despertar. Poco tienes que hacer. La vida misma te convoca, una y otra vez, a ser la vida que eres.</p>
              <p>Mi proceso de despertar me ha traído hasta aquí: comunicar lo que somos es dar lo que recibes. Porque nada es para ti, eres canal para la vida. Eres vida.</p>
              <p className="pt-2 font-serif text-2xl italic text-foreground">María Olid</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-primary/15 bg-secondary/75">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-18">
          <SectionHeading eyebrow="Agenda" title="Próximos eventos" align="center" className="mb-10" />
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
            {upcomingEvents.map((event) => <EventCard key={event.id} event={event} />)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-18">
        <SectionHeading eyebrow="Contemplar el ser que eres" title="Palabras para el despertar" align="center" className="mb-10" />
        <QuoteGallery />
      </section>
      <ContactCta />
    </>
  )
}
