import type { Metadata } from 'next'
import Image from 'next/image'
import { PageHeader } from '@/components/page-header'
import { VideoCard } from '@/components/video-card'
import { SectionHeading } from '@/components/section-heading'
import { ContactCta } from '@/components/contact-cta'
import { getYoutubeContent } from '@/lib/youtube'
import { youtubeSections as fallbackSections, previousInterviews as fallbackPrevious } from '@/lib/data'

export const metadata: Metadata = {
  title: 'YouTube · El Despertar',
  description: 'Entrevistas, reflexiones y conversaciones profundas sobre espiritualidad, conciencia y transformación interior.',
}

export default async function YoutubePage() {
  const { interviews } = await getYoutubeContent()
  const videos = interviews.length ? interviews : fallbackSections.map((s) => s.video).concat(fallbackPrevious)
  const [latest, previous, specialAwake, specialMind, ...archive] = videos
  const publishedThisWeek = latest?.publishedAt && (Date.now() - new Date(latest.publishedAt).getTime()) < 7 * 86400000

  return <>
    <PageHeader eyebrow="Canal de YouTube" title="El Despertar" intro="La verdad no puede ser pensada. El amor no es un concepto, no es algo personal que alguien pueda darte. El amor se conoce siéndolo. Caen los muros de tu individualidad y emprendes el camino que te va a llevar más allá de ti misma. Cada nivel de consciencia guarda una nueva identidad para ti. No te aferres a ninguna de ellas. La no identidad es tu identidad." />

    <section className="mx-auto grid max-w-6xl grid-cols-1 items-end gap-10 overflow-hidden px-5 pt-14 md:px-8 lg:grid-cols-[1.25fr_0.75fr]">
      <div className="pb-10 lg:pb-16">
        <p className="text-base leading-relaxed text-muted-foreground">El Despertar es un canal de YouTube dedicado a la espiritualidad, la conciencia y la transformación interior. A través de entrevistas, reflexiones y conversaciones profundas, el canal invita a mirar la vida desde una perspectiva más amplia: cuestionar la identidad personal, comprender el miedo, abrirse al amor y reconocer aquello que somos más allá de nuestra historia.</p>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">Es un canal para personas que sienten una llamada interior, que buscan comprender el sentido profundo de lo que viven y que desean acercarse a una forma de vivir más consciente, amorosa y verdadera.</p>
      </div>
      <div className="relative mx-auto h-[330px] w-full max-w-md md:h-[440px]">
        <Image src="/images/maria-youtube-cutout.png" alt="María Olid ante el micrófono" fill sizes="(max-width: 1024px) 80vw, 35vw" className="object-contain object-bottom" />
      </div>
    </section>

    {latest && <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
      <span className="text-xs uppercase tracking-[0.35em] text-primary">{publishedThisWeek ? 'Entrevista de esta semana' : 'Última entrevista'}</span>
      <div className="mt-6"><VideoCard video={latest} priority className="lg:grid lg:grid-cols-[1.4fr_1fr] lg:gap-8" /></div>
    </section>}

    {previous && <section className="mx-auto max-w-6xl px-5 pb-16 md:px-8 md:pb-20">
      <SectionHeading eyebrow="Archivo reciente" title="Entrevista de la semana anterior" className="mb-8" />
      <div className="max-w-3xl"><VideoCard video={previous} /></div>
    </section>}

    <section className="border-y border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <SectionHeading eyebrow="Selección" title="Vídeos para profundizar" className="mb-10" />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {specialAwake && <div><h3 className="mb-4 font-serif text-2xl">Estás despierta ahora</h3><VideoCard video={specialAwake} /></div>}
          {specialMind && <div><h3 className="mb-4 font-serif text-2xl">El poder de la mente y del amor</h3><VideoCard video={specialMind} /></div>}
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20"><SectionHeading eyebrow="Archivo" title="Entrevistas anteriores" className="mb-10" /><div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{archive.map((video) => <VideoCard key={video.id} video={video} />)}</div></section>
    <ContactCta />
  </>
}
