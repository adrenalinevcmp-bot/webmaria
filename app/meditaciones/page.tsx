import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { SectionHeading } from '@/components/section-heading'
import { MeditationCard } from '@/components/meditation-card'
import { ContactCta } from '@/components/contact-cta'
import { meditationsEs as fallbackEs, meditationsCa as fallbackCa, type Meditation } from '@/lib/data'
import { getYoutubeContent } from '@/lib/youtube'

export const metadata: Metadata = {
  title: 'Meditaciones y audiolibros · El Despertar',
  description: 'Meditaciones guiadas en castellano y catalán, además de audiolibros de El Despertar.',
}

export default async function MeditacionesPage() {
  const data = await getYoutubeContent()
  const toMeditation = (v: { id: string; title: string; description: string; thumbnail: string; duration?: string; href: string }): Meditation => ({
    id: v.id,
    title: v.title,
    description: v.description,
    thumbnail: v.thumbnail,
    duration: v.duration,
    href: v.href,
  })
  const es = data.meditationsEs.length ? data.meditationsEs.map(toMeditation) : fallbackEs
  const ca = data.meditationsCa.length ? data.meditationsCa.map(toMeditation) : fallbackCa
  const audiobooks = data.audiobooks.map(toMeditation)

  return <>
    <PageHeader eyebrow="Meditaciones" title="Meditar es una forma de vivir" intro="No meditamos para relajarnos o para no pensar, meditamos para despertar. Meditamos para contemplar qué sucede en nuestra mente y ser observadores de ello. Podemos observar los pensamientos sin involucrarnos. Podemos abrirnos a la distancia que hay entre tus pensamientos y tu ser." />

    <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
      <SectionHeading eyebrow="Meditaciones guiadas" title="Meditaciones en castellano" className="mb-10" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {es.map((m) => <MeditationCard key={m.id} meditation={m} />)}
      </div>
    </section>

    <section className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <SectionHeading eyebrow="Català" title="Meditacions en català" className="mb-10" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ca.map((m) => <MeditationCard key={m.id} meditation={m} />)}
        </div>
      </div>
    </section>

    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <SectionHeading eyebrow="Escucha consciente" title="Audiolibros" className="mb-10" />
        {audiobooks.length ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {audiobooks.map((m) => <MeditationCard key={m.id} meditation={m} />)}
          </div>
        ) : (
          <p className="text-muted-foreground">Los audiolibros aparecerán aquí automáticamente desde YouTube.</p>
        )}
      </div>
    </section>

    <ContactCta />
  </>
}
