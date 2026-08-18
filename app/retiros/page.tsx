import type { Metadata } from 'next'
import Image from 'next/image'
import { EventCard } from '@/components/event-card'
import { SignupDialog } from '@/components/signup-dialog'
import { getUpcomingEvents } from '@/lib/events'
import { getYoutubeContent } from '@/lib/youtube'
import { ContactCta } from '@/components/contact-cta'
import { VideoCard } from '@/components/video-card'

export const metadata: Metadata = {
  title: 'Agenda · El Despertar',
  description: 'Encuentros mensuales, retiros y agenda de El Despertar con María Olid.',
}

export default async function RetirosPage() {
  const upcomingEvents = await getUpcomingEvents()
  const youtube = await getYoutubeContent()
  const retreatVideo = youtube.retreats?.[0]
  const rendicion = upcomingEvents.find((event) => event.title.toLowerCase().includes('rendición'))
  const retreatEvent = upcomingEvents.find((event) => event.id !== rendicion?.id)

  return (
    <>
      <section className="border-b border-primary/20 bg-secondary/80">
        <div className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-10">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">AGENDA</span>
          <h1 className="mt-3 font-serif text-4xl font-medium leading-tight text-foreground md:text-5xl">Encuentros para el despertar</h1>
          <p className="mt-5 text-base leading-relaxed text-foreground/75 md:whitespace-nowrap md:text-lg">Espacios presenciales y mensuales para compartir desde el Ser, contemplar y abrirnos juntos al amor.</p>
        </div>
      </section>

      {rendicion && (
        <section className="border-b border-primary/20 bg-secondary/70">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-5 py-12 md:px-8 md:py-14 lg:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-muted">
              <Image src="/images/evento-experimento-rendicion-octubre-2026.png" alt="Imagen de Experimento Rendición" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">Encuentro mensual</span>
              <h2 className="mt-4 font-serif text-3xl text-foreground md:text-4xl">{rendicion.title}</h2>
              <p className="mt-5 leading-relaxed text-foreground/75">{rendicion.description}</p>
              {rendicion.price && <p className="mt-3 font-medium text-foreground">{rendicion.price}</p>}
              <div className="mt-6"><SignupDialog trigger="Apuntarse" title={rendicion.title} subtitle="Déjanos tus datos para recibir la información del encuentro mensual." /></div>
            </div>
          </div>
        </section>
      )}

      <section className="border-b border-primary/20 bg-secondary/55">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-5 py-12 md:px-8 md:py-14 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-muted">
            <Image src="/images/evento-retiro-despertar-noviembre-2026.png" alt="Imagen del Retiro El Despertar sobre Cábala" fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-center" />
          </div>
          <div className="flex flex-col gap-5">
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">Próximo retiro</span>
            <h2 className="font-serif text-3xl font-medium leading-tight text-foreground md:text-4xl">{retreatEvent?.title || 'Retiro El Despertar sobre Cábala'}</h2>
            <p className="text-base leading-relaxed text-foreground/75">{retreatEvent?.description || 'Aquí se incorporará el texto y el vídeo cuando estén disponibles.'}</p>
            <SignupDialog trigger="Apuntarse" title={retreatEvent?.title || 'Retiro El Despertar sobre Cábala'} subtitle="Déjanos tus datos y te enviaremos toda la información disponible." className="self-start" />
          </div>
        </div>
        {retreatVideo && <div className="mx-auto max-w-6xl px-5 pb-14 md:px-8"><div className="max-w-4xl"><VideoCard video={retreatVideo} /></div></div>}
      </section>

      <ContactCta />
    </>
  )
}
