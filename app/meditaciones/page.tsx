import type { Metadata } from 'next'
import Image from 'next/image'
import { SectionHeading } from '@/components/section-heading'
import { MeditationCard } from '@/components/meditation-card'
import { ContactCta } from '@/components/contact-cta'
import {
  MEDITATION_CA_VIDEO_IDS,
  MEDITATION_ES_VIDEO_IDS,
  meditationsCa as fallbackCa,
  meditationsEs as fallbackEs,
  type Meditation,
} from '@/lib/data'
import { getYoutubeContent, getYoutubeVideosByIds } from '@/lib/youtube'

export const metadata: Metadata = {
  title: 'Meditaciones y audiolibro · El Despertar',
  description: 'Meditaciones guiadas en castellano y catalán, además del audiolibro Un Curso de Milagros.',
}

function toMeditation(v: { id: string; title: string; description: string; thumbnail: string; duration?: string; href: string }): Meditation {
  return {
    id: v.id,
    title: v.title,
    description: v.description,
    thumbnail: v.thumbnail,
    duration: v.duration,
    href: v.href,
  }
}

function cleanAudiobookDescription(value: string) {
  return value
    .replace(/voz de mar[ií]a olid/gi, '')
    .replace(/voz:\s*mar[ií]a olid/gi, '')
    .replace(/mar[ií]a olid\s*·?\s*voz/gi, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/^\s*[·|—-]\s*|\s*[·|—-]\s*$/g, '')
    .trim()
}

export default async function MeditacionesPage() {
  const data = await getYoutubeContent()
  const [fixedEs, fixedCa] = await Promise.all([
    getYoutubeVideosByIds(MEDITATION_ES_VIDEO_IDS),
    getYoutubeVideosByIds(MEDITATION_CA_VIDEO_IDS),
  ])

  const es = fixedEs.length ? fixedEs.map(toMeditation) : fallbackEs
  const ca = fixedCa.length ? fixedCa.map(toMeditation) : fallbackCa
  const audiobooks = data.audiobooks.map((v) => ({
    ...toMeditation(v),
    description: cleanAudiobookDescription(v.description),
  }))

  return (
    <>
      <section className="border-b border-primary/15 bg-secondary/65">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-9 px-5 py-8 md:px-8 md:py-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div className="relative min-h-[360px] overflow-hidden rounded-sm bg-background/40 sm:min-h-[470px]">
            <Image
              src="/images/maria-ojos-cerrados.png"
              alt="María Olid con los ojos cerrados"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-contain object-bottom"
            />
          </div>
          <div className="flex flex-col gap-5">
            <h1 className="font-serif text-4xl font-medium leading-tight text-foreground md:text-5xl">Meditamos para despertar</h1>
            <p className="text-[1.05rem] leading-[1.8] text-foreground/75 text-pretty md:text-lg">
              Meditar es una forma de vivir. No meditamos para relajarnos o para no pensar, meditamos para despertar. Meditamos para contemplar qué sucede en nuestra mente y ser observadores de ello. Podemos observar los pensamientos sin involucrarnos. Podemos abrirnos a la distancia que hay entre tus pensamientos y tu ser.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-16">
        <SectionHeading eyebrow="Meditaciones guiadas" title="Meditaciones en castellano" className="mb-10" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {es.map((m) => <MeditationCard key={m.id} meditation={m} />)}
        </div>
      </section>

      <section className="border-t border-primary/15 bg-secondary/60">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-16">
          <SectionHeading eyebrow="Meditaciones guiadas" title="Meditaciones en catalán" className="mb-10" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ca.map((m) => <MeditationCard key={m.id} meditation={m} />)}
          </div>
        </div>
      </section>

      <section className="border-t border-primary/15">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-16">
          <SectionHeading eyebrow="UN CURSO DE MILAGROS" title="Audiolibro" className="mb-10" />
          {audiobooks.length ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {audiobooks.map((m) => <MeditationCard key={m.id} meditation={m} />)}
            </div>
          ) : (
            <p className="text-muted-foreground">Los capítulos del audiolibro aparecerán aquí automáticamente desde YouTube.</p>
          )}
        </div>
      </section>

      <ContactCta />
    </>
  )
}
