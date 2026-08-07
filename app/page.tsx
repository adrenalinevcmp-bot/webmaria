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

export default async function HomePage() {
  const youtube = await getYoutubeContent()
  const featuredVideo = youtube.all[0] || fallbackVideo
  const upcomingEvents = await getUpcomingEvents()
  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-7">
          <span className="font-serif text-2xl italic text-primary">
            el Despertar
          </span>
          <h1 className="font-serif text-4xl font-medium leading-[1.1] text-foreground text-balance md:text-5xl lg:text-6xl">
            El sentido de la vida se encuentra sirviendo a la vida
          </h1>
          <p className="max-w-md text-base leading-relaxed text-muted-foreground text-pretty">
            Espiritualidad, conciencia y transformación interior. Una invitación
            a reconocer aquello que ya somos.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/youtube"
              className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Play className="h-4 w-4 fill-current" /> Ver último vídeo
            </Link>
            <Link
              href="/#sobre-maria"
              className="inline-flex items-center rounded-sm border border-border px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Conoce a María
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-muted">
            <Image
              src="/images/maria-hero-real.png"
              alt="María Olid"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain object-bottom"
            />
          </div>
          <div className="absolute -bottom-4 -left-4 -z-10 h-full w-full rounded-sm border border-accent" />
        </div>
      </section>

      {/* Último vídeo */}
      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-5 py-16 md:px-8 md:py-20 lg:grid-cols-[1.2fr_1fr]">
          <a
            href={featuredVideo.href}
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
        className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 md:px-8 md:py-28"
      >
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-muted lg:sticky lg:top-28">
              <Image
                src="/images/maria-about-real.jpg"
                alt="María Olid"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-[50%_35%]"
              />
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <SectionHeading eyebrow="Sobre María" title="La vida es un despertar" />
            <div className="flex flex-col gap-4 text-base leading-relaxed text-muted-foreground text-pretty">
              <p>
                La vida es un despertar. Seamos todos bienvenidos al despertar.
              </p>
              <p>
                Y podemos decirlo sin miedo a equivocarnos: todos estamos
                sujetos a infinitos despertares al Ser que somos, visto desde
                esta experiencia procesal llamada vida.
              </p>
              <p>
                Todo movimiento que toma nuestra vida nos lleva a asumir más
                amor. Cada cambio es una oportunidad para amar y para amarnos.
              </p>
              <p>
                Ahora puedo decir que el camino del espíritu es un camino de
                Amor. No necesitas un gurú, o un maestro iluminado; el despertar
                ya está siendo y sucediendo en ti.
              </p>
              <p>
                Es la vida misma la que se está ocupando de tu despertar. Poco
                tienes que hacer. La vida misma te convoca, una y otra vez, a
                ser la vida que eres.
              </p>
              <p>
                Mi proceso de despertar me ha traído hasta aquí: comunicar lo
                que somos es dar lo que recibes. Porque nada es para ti, eres
                canal para la vida. Eres vida.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Próximos eventos */}
      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
          <SectionHeading
            eyebrow="Agenda"
            title="Próximos eventos"
            align="center"
            className="mb-12"
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Galería con frases */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <SectionHeading
          eyebrow="Contemplaciones"
          title="Palabras para el despertar"
          align="center"
          className="mb-12"
        />
        <QuoteGallery />
      </section>
      <ContactCta />
    </>
  )
}
