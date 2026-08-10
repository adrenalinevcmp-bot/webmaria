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

export default async function HomePage() {
  const youtube = await getYoutubeContent()
  const featuredVideo = youtube.all[0] || fallbackVideo
  const upcomingEvents = await getUpcomingEvents()

  return (
    <>
      {/* Hero compacto: menos margen superior y vídeo de María a la derecha */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-5 pb-12 pt-8 md:px-8 md:pb-16 md:pt-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
        <div className="flex flex-col gap-6">
          <h1 className="font-serif text-4xl font-medium leading-[1.06] text-foreground text-balance md:text-5xl lg:text-6xl">
            El sentido de la vida se encuentra sirviendo a la vida
          </h1>
          <p className="max-w-md text-[1.05rem] leading-relaxed text-muted-foreground text-pretty">
            Espiritualidad, conciencia y transformación interior. Una invitación
            a reconocer aquello que ya somos.
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
              className="inline-flex items-center rounded-sm border border-border px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:border-primary hover:text-primary"
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

      {/* Último vídeo automático */}
      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-5 py-12 md:px-8 md:py-14 lg:grid-cols-[1.2fr_1fr]">
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
            <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-background/85 text-primary transition-transform duration-300 group-hover:scale-110">
              <Play className="h-6 w-6 translate-x-0.5 fill-current" />
            </span>
          </a>
          <div className="flex flex-col gap-4">
            <span className="text-xs uppercase tracking-[0.35em] text-primary">
              Último vídeo · {featuredVideo.date}
            </span>
            <h2 className="font-serif text-3xl font-medium leading-tight text-foreground text-balance">
              {featuredVideo.title}
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground text-pretty">
              {featuredVideo.description}
            </p>
            <Link
              href="/youtube"
              className="mt-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              Ver todas las entrevistas →
            </Link>
          </div>
        </div>
      </section>

      {/* Sobre María */}
      <section
        id="sobre-maria"
        className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16 md:px-8 md:py-20"
      >
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
          <div className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-muted lg:sticky lg:top-24">
              <Image
                src="/images/maria-about-real.jpg"
                alt="María Olid"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-[50%_32%]"
              />
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <SectionHeading eyebrow="Sobre María" title="La vida es un despertar" />
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

      {/* Próximos eventos: aspecto de flyer */}
      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <SectionHeading eyebrow="Agenda" title="Próximos eventos" align="center" className="mb-10" />
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
            {upcomingEvents.map((event) => <EventCard key={event.id} event={event} />)}
          </div>
        </div>
      </section>

      {/* Contemplaciones en carrusel */}
      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <SectionHeading
          eyebrow="Contemplar el ser que eres"
          title="Palabras para el despertar"
          align="center"
          className="mb-10"
        />
        <QuoteGallery />
      </section>
      <ContactCta />
    </>
  )
}
