import type { Metadata } from 'next'
import Image from 'next/image'
import { PageHeader } from '@/components/page-header'
import { SectionHeading } from '@/components/section-heading'
import { EventCard } from '@/components/event-card'
import { SignupDialog } from '@/components/signup-dialog'
import { getUpcomingEvents } from '@/lib/events'
import { getYoutubeContent } from '@/lib/youtube'
import { ContactCta } from '@/components/contact-cta'
import { VideoCard } from '@/components/video-card'

export const metadata: Metadata = {
  title: 'Retiros y Eventos · El Despertar',
  description: 'Retiros, encuentros mensuales y eventos del Despertar con María Olid.',
}

export default async function RetirosPage() {
  const upcomingEvents = await getUpcomingEvents()
  const youtube = await getYoutubeContent()
  const retreatVideo = youtube.retreats?.[0]
  const rendicion = upcomingEvents.find((event) => event.title.toLowerCase().includes('rendición'))

  return <>
    <PageHeader eyebrow="Retiros y Eventos" title="Encuentros para el despertar" intro="Espacios presenciales y mensuales para compartir desde el Ser, contemplar y abrirnos juntos al amor." />

    <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-muted">
          <Image src="/images/REEMPLAZAR-retiro-cabala-portada.png" alt="Imagen pendiente del Retiro El Despertar sobre Cábala" fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-center" />
          <span className="absolute bottom-3 left-3 rounded-sm bg-background/90 px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-foreground">Reemplazar: retiro Cábala</span>
        </div>
        <div className="flex flex-col gap-5">
          <span className="text-xs uppercase tracking-[0.35em] text-primary">Próximo retiro</span>
          <h2 className="font-serif text-3xl font-medium leading-tight text-foreground md:text-4xl">Retiro El Despertar sobre Cábala</h2>
          <p className="text-base leading-relaxed text-muted-foreground">Aquí se incorporará el texto y el vídeo cuando estén disponibles.</p>
          <SignupDialog trigger="Apuntarse" title="Retiro El Despertar sobre Cábala" subtitle="Déjanos tus datos y te avisaremos cuando se abran las inscripciones." className="self-start" />
        </div>
      </div>
      {retreatVideo && <div className="mt-14"><SectionHeading eyebrow="Vídeo del retiro" title="Conoce el próximo encuentro" className="mb-8" /><div className="max-w-4xl"><VideoCard video={retreatVideo} /></div></div>}
    </section>

    {rendicion && <section className="border-y border-border bg-secondary/40"><div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-5 py-16 md:px-8 md:py-20 lg:grid-cols-2">
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-muted"><Image src="/images/REEMPLAZAR-experimento-rendicion.png" alt="Imagen pendiente de Experimento Rendición" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /><span className="absolute bottom-3 left-3 rounded-sm bg-background/90 px-3 py-2 text-[10px] font-semibold uppercase tracking-wider">Reemplazar: Experimento Rendición</span></div>
      <div><span className="text-xs uppercase tracking-[0.35em] text-primary">Encuentro mensual</span><h2 className="mt-4 font-serif text-3xl md:text-4xl">Experimento Rendición</h2><p className="mt-5 leading-relaxed text-muted-foreground">{rendicion.description}</p>{rendicion.price && <p className="mt-3 font-medium">{rendicion.price}</p>}<div className="mt-6"><SignupDialog trigger="Apuntarse" title="Experimento Rendición" subtitle="Déjanos tus datos para recibir la información del encuentro mensual." /></div></div>
    </div></section>}

    <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20"><SectionHeading eyebrow="Agenda" title="Próximos encuentros" className="mb-10" /><div className="grid grid-cols-1 gap-6 md:grid-cols-2">{upcomingEvents.filter(e => e.id !== rendicion?.id).map((event) => <EventCard key={event.id} event={event} />)}</div></section>

    <section className="border-t border-border bg-secondary/40"><div className="mx-auto max-w-6xl px-5 py-16 text-center md:px-8 md:py-20"><SectionHeading eyebrow="Histórico" title="Encuentros anteriores" align="center" className="mb-5" /><p className="mx-auto max-w-2xl text-muted-foreground">Este apartado se mostrará cuando existan retiros o encuentros reales finalizados. No se publican actividades ficticias.</p></div></section>
    <ContactCta />
  </>
}
