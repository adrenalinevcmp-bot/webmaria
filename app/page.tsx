import Image from 'next/image'
import Link from 'next/link'
import { SectionHeading } from '@/components/section-heading'
import { QuoteGallery } from '@/components/quote-gallery'
import { EventCard } from '@/components/event-card'
import { featuredVideo as fallbackVideo } from '@/lib/data'
import { getUpcomingEvents } from '@/lib/events'
import { ContactCta } from '@/components/contact-cta'
import { LatestVideoButton, LatestVideoSection } from '@/components/latest-video'
import { getCms } from '@/lib/cms'
import { RichText } from '@/components/rich-text'

export const dynamic = 'force-dynamic'
export const revalidate = 0
const HERO_VIDEO_ID = 'jMi5r7K2DQM'


export default async function HomePage() {
  // La UI del último vídeo consulta /api/youtube/latest directamente en el navegador.
  // Así el botón, la miniatura y el título usan exactamente la misma fuente que el endpoint de diagnóstico.
  const upcomingEvents = await getUpcomingEvents()
  const hero = await getCms('home.hero', {title:'El sentido de la vida se encuentra sirviendo a la vida', subtitle:'Espiritualidad, conciencia y transformación interior. Una invitación a reconocer aquello que ya somos.'})
  const homeSections = await getCms('home.sections', {latestButton:'Ver último vídeo', aboutButton:'Conoce a María', eventsEyebrow:'Agenda', eventsTitle:'Próximos eventos', contemplationEyebrow:'Contemplar el ser que eres', contemplationTitle:'Palabras para el despertar', heroVideoId:'jMi5r7K2DQM'})
  const gallery = await getCms('home.gallery', [
    {image:'/images/contemplacion-01-muelle.png',quote:'Contemplar es dejar de buscar fuera lo que siempre ha estado dentro.'},
    {image:'/images/contemplacion-02-olas.png',quote:'La vida no pide ser controlada, sino plenamente vivida.'},
    {image:'/images/contemplacion-03-luz-agua.png',quote:'Cuando la mente se aquieta, el Ser se reconoce a sí mismo.'},
    {image:'/images/contemplacion-04-acantilados.png',quote:'Cada instante puede ser una puerta al despertar.'},
    {image:'/images/contemplacion-05-mar-calmo.png',quote:'La paz no llega de fuera. Es lo que queda cuando dejamos de resistir.'}
  ])
  const sobre = await getCms('sobre.maria', {title:'La vida es un despertar', image:'/images/maria-sobre-bn.png', text:'La vida es un despertar. Seamos todos bienvenidos al despertar.\n\nY podemos decirlo sin miedo a equivocarnos: todos estamos sujetos a infinitos despertares al Ser que somos, visto desde esta experiencia procesal llamada vida.\n\nTodo movimiento que toma nuestra vida nos lleva a asumir más amor. Cada cambio es una oportunidad para amar y para amarnos.\n\nAhora puedo decir que el camino del espíritu es un camino de Amor. No necesitas un gurú, o un maestro iluminado; el despertar ya está siendo y sucediendo en ti.\n\nEs la vida misma la que se está ocupando de tu despertar. Poco tienes que hacer. La vida misma te convoca, una y otra vez, a ser la vida que eres.\n\nMi proceso de despertar me ha traído hasta aquí: comunicar lo que somos es dar lo que recibes. Porque nada es para ti, eres canal para la vida. Eres vida.'})

  return (
    <>
      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-5 pb-10 pt-6 md:px-8 md:pb-14 md:pt-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
        <div className="flex flex-col gap-6">
          <h1 className="font-serif text-4xl font-medium leading-[1.06] text-foreground text-balance md:text-5xl lg:text-6xl">
            {hero.title}
          </h1>
          <p className="max-w-md text-[1.05rem] leading-relaxed text-foreground/75 text-pretty">
            {hero.subtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <LatestVideoButton initial={fallbackVideo} />
            <Link
              href="/#sobre-maria"
              className="inline-flex items-center rounded-sm border border-primary/35 bg-background px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {homeSections.aboutButton}
            </Link>
          </div>
        </div>

        <div className="overflow-hidden rounded-sm border border-border bg-card shadow-sm">
          <div className="aspect-video w-full">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${homeSections.heroVideoId || HERO_VIDEO_ID}?rel=0`}
              title="María Olid · El Despertar"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <LatestVideoSection initial={fallbackVideo} />

      <section id="sobre-maria" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-14 md:px-8 md:py-18">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
          <div className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-muted lg:sticky lg:top-24">
              <Image
                src={sobre.image}
                alt="María Olid"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-contain object-center"
              />
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="font-serif text-3xl font-medium leading-tight text-foreground md:text-4xl">{sobre.title}</h2>
            <div className="flex flex-col gap-4 text-[1.05rem] leading-[1.8] text-muted-foreground text-pretty md:text-lg">
              <RichText text={sobre.text} className="contents" />
              <p className="pt-2 font-serif text-2xl italic text-foreground">María Olid</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-primary/15 bg-secondary/75">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-18">
          <SectionHeading eyebrow={homeSections.eventsEyebrow} title={homeSections.eventsTitle} align="center" className="mb-10" />
          <div className="space-y-0">
            {upcomingEvents.map((event, index) => (
              <section
                key={event.id}
                className={index === 0
                  ? "border-b border-primary/20 bg-secondary/70"
                  : "border-b border-primary/20 bg-secondary/55"}
              >
                <div className="grid grid-cols-1 items-center gap-10 py-12 lg:grid-cols-2 lg:gap-16">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-muted">
                    <Image
                      src={event.image || (event.id === 'ev-1' ? '/images/evento-experimento-rendicion-octubre-2026.png' : '/images/evento-retiro-despertar-noviembre-2026.png')}
                      alt={event.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="flex flex-col gap-5">
                    <span className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                      {event.id === 'ev-1' ? 'Encuentro mensual' : 'Próximo retiro'}
                    </span>
                    <h3 className="font-serif text-3xl font-medium leading-tight text-foreground md:text-4xl">
                      {event.title}
                    </h3>
                    <RichText text={event.description} className="space-y-3 text-base leading-relaxed text-foreground/75" />
                    {event.price && <p className="font-medium text-foreground">{event.price}</p>}
                    <Link
                      href="/retiros"
                      className="inline-flex w-fit items-center rounded-sm border border-primary/35 bg-background px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      Ver más información
                    </Link>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-18">
        <SectionHeading eyebrow={homeSections.contemplationEyebrow} title={homeSections.contemplationTitle} align="center" className="mb-10" />
        <QuoteGallery items={gallery} />
      </section>
      <ContactCta />
    </>
  )
}
