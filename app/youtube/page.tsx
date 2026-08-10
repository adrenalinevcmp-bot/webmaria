import type { Metadata } from 'next'
import Image from 'next/image'
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
  const videos = interviews.length ? interviews : fallbackSections.slice(0, 3).map((s) => s.video).concat(fallbackPrevious)
  const [latest, previous, ...archive] = videos
  const specialAwake = fallbackSections.find((s) => s.key === 'estas-despierta')?.video
  const specialMind = fallbackSections.find((s) => s.key === 'poder-mente-amor')?.video
  const publishedThisWeek = latest?.publishedAt && (Date.now() - new Date(latest.publishedAt).getTime()) < 7 * 86400000

  return <>
    {/* Cabecera compacta: texto a la izquierda y María arriba a la derecha */}
    <section className="border-b border-border bg-secondary/40">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-end gap-6 overflow-hidden px-5 pt-6 md:px-8 md:pt-8 lg:grid-cols-[1.12fr_0.88fr] lg:gap-10">
        <div className="pb-10 md:pb-12">
          <span className="text-xs uppercase tracking-[0.35em] text-primary">Canal de YouTube</span>
          <h1 className="mt-3 font-serif text-4xl font-medium leading-tight text-foreground md:text-5xl">El Despertar</h1>
          <p className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-muted-foreground md:text-lg">
            La verdad no puede ser pensada. El amor no es un concepto, no es algo personal que alguien pueda darte. El amor se conoce siéndolo. Caen los muros de tu individualidad y emprendes el camino que te va a llevar más allá de ti misma. Cada nivel de consciencia guarda una nueva identidad para ti. No te aferres a ninguna de ellas. La no identidad es tu identidad.
          </p>
          <div className="mt-6 max-w-2xl border-l-2 border-primary/40 pl-5 text-[1.02rem] leading-relaxed text-foreground/80">
            <p>El Despertar es un canal de YouTube dedicado a la espiritualidad, la conciencia y la transformación interior. A través de entrevistas, reflexiones y conversaciones profundas, el canal invita a mirar la vida desde una perspectiva más amplia: cuestionar la identidad personal, comprender el miedo, abrirse al amor y reconocer aquello que somos más allá de nuestra historia.</p>
            <p className="mt-4">Es un canal para personas que sienten una llamada interior, que buscan comprender el sentido profundo de lo que viven y que desean acercarse a una forma de vivir más consciente, amorosa y verdadera.</p>
          </div>
        </div>
        <div className="relative mx-auto h-[370px] w-full max-w-xl self-end md:h-[520px] lg:h-[600px]">
          <Image src="/images/maria-youtube-cutout.png" alt="María Olid con los ojos cerrados ante el micrófono" fill priority sizes="(max-width: 1024px) 90vw, 42vw" className="object-contain object-bottom" />
        </div>
      </div>
    </section>

    {latest && <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-16">
      <SectionHeading eyebrow={publishedThisWeek ? 'Entrevista de esta semana' : 'Última entrevista'} title={latest.title} className="mb-7" />
      <VideoCard video={latest} priority horizontal />
    </section>}

    {previous && <section className="mx-auto max-w-6xl px-5 pb-14 md:px-8 md:pb-16">
      <SectionHeading eyebrow="Archivo reciente" title="Entrevista de la semana anterior" className="mb-7" />
      <VideoCard video={previous} horizontal />
    </section>}

    <section className="border-y border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-16">
        <SectionHeading eyebrow="Selección" title="Vídeos para profundizar" className="mb-9" />
        <p className="mb-8 max-w-3xl text-base leading-relaxed text-muted-foreground">Esta sección queda preparada para reunir los vídeos en los que María habla sola. Los vídeos concretos se pueden sustituir en cuanto estén definidos.</p>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {specialAwake && <VideoCard video={specialAwake} />}
          {specialMind && <VideoCard video={specialMind} />}
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-16">
      <SectionHeading eyebrow="Archivo" title="Entrevistas anteriores" className="mb-9" />
      <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{archive.map((video) => <VideoCard key={video.id} video={video} />)}</div>
    </section>
    <ContactCta />
  </>
}
