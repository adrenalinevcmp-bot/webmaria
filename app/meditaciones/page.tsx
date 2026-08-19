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
import { getCms } from '@/lib/cms'

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
  const cfg = await getCms('meditaciones.page', {title:'Meditamos para despertar', intro:'Meditar es una forma de vivir. No meditamos para relajarnos o para no pensar, meditamos para despertar. Meditamos para contemplar qué sucede en nuestra mente y ser observadores de ello. Podemos observar los pensamientos sin involucrarnos. Podemos abrirnos a la distancia que hay entre tus pensamientos y tu ser.', image:'/images/maria-meditaciones-primer-plano.jpg', esIds:MEDITATION_ES_VIDEO_IDS, caIds:MEDITATION_CA_VIDEO_IDS, esTitle:'Meditaciones en castellano', caTitle:'Meditaciones en catalán', audiobookTitle:'Audiolibro', guidedLabel:'Meditaciones guiadas', audiobookEyebrow:'UN CURSO DE MILAGROS'})
  const data = await getYoutubeContent()
  const [fixedEs, fixedCa] = await Promise.all([
    getYoutubeVideosByIds(cfg.esIds || MEDITATION_ES_VIDEO_IDS),
    getYoutubeVideosByIds(cfg.caIds || MEDITATION_CA_VIDEO_IDS),
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
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-9 px-5 py-8 md:px-8 md:py-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[520px] overflow-hidden rounded-sm bg-background/40 shadow-sm">
            <Image
              src={cfg.image}
              alt="María Olid con los ojos cerrados"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 44vw"
              className="object-cover object-center"
            />
          </div>
          <div className="flex flex-col gap-5">
            <h1 className="font-serif text-4xl font-medium leading-tight text-foreground md:text-5xl">{cfg.title}</h1>
            <p className="text-[1.05rem] leading-[1.8] text-foreground/75 text-pretty md:text-lg">
              {cfg.intro}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-16">
        <SectionHeading eyebrow={cfg.guidedLabel} title={cfg.esTitle} className="mb-10" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {es.map((m) => <MeditationCard key={m.id} meditation={m} />)}
        </div>
      </section>

      <section className="border-t border-primary/15 bg-secondary/60">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-16">
          <SectionHeading eyebrow={cfg.guidedLabel} title={cfg.caTitle} className="mb-10" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ca.map((m) => <MeditationCard key={m.id} meditation={m} />)}
          </div>
        </div>
      </section>

      <section className="border-t border-primary/15">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-16">
          <SectionHeading eyebrow={cfg.audiobookEyebrow} title={cfg.audiobookTitle} className="mb-10" />
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
