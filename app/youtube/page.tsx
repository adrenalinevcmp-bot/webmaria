import type { Metadata } from 'next'
import { VideoCard } from '@/components/video-card'
import { SectionHeading } from '@/components/section-heading'
import { ContactCta } from '@/components/contact-cta'
import { DEEPENING_VIDEO_IDS, previousInterviews as fallbackPrevious } from '@/lib/data'
import { getYoutubeContent, getYoutubeVideosByIds } from '@/lib/youtube'
import { getCms } from '@/lib/cms'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const metadata: Metadata = {
  title: 'YouTube · El Despertar',
  description: 'Entrevistas, reflexiones y conversaciones profundas sobre espiritualidad, conciencia y transformación interior.',
}

export default async function YoutubePage() {
  const { interviews } = await getYoutubeContent()
  const videos = interviews.length ? interviews : fallbackPrevious
  // La primera es la entrevista más reciente (Dora cuando corresponde).
  // En esta página mostramos las 12 siguientes, siempre ordenadas de reciente a antigua.
  const archive = videos.slice(1, 13)
  const cfg = await getCms('youtube.page', {intro1:'La verdad no puede ser pensada. El amor no es un concepto, no es algo personal que alguien pueda darte. El amor se conoce siéndolo. Caen los muros de tu individualidad y emprendes el camino que te va a llevar más allá de ti misma. Cada nivel de consciencia guarda una nueva identidad para ti. No te aferres a ninguna de ellas. La no identidad es tu identidad.', intro2:'El Despertar es un canal de YouTube dedicado a la espiritualidad, la conciencia y la transformación interior. A través de entrevistas, reflexiones y conversaciones profundas, el canal invita a mirar la vida desde una perspectiva más amplia: cuestionar la identidad personal, comprender el miedo, abrirse al amor y reconocer aquello que somos más allá de nuestra historia.', intro3:'Es un canal para personas que sienten una llamada interior, que buscan comprender el sentido profundo de lo que viven y que desean acercarse a una forma de vivir más consciente, amorosa y verdadera.', deepeningTitle:'Vídeos para profundizar', deepeningText:'Únete a estos vídeos desde el sentir, soltando por un instante la necesidad de entender desde la mente.', archiveTitle:'Entrevistas para el Despertar', archiveText:'Conversaciones que nos invitan a mirar hacia dentro, cuestionar lo que creemos saber y abrirnos al sentir.', deepeningIds:DEEPENING_VIDEO_IDS, eyebrow:'Canal de YouTube', pageTitle:'El Despertar'})
  const deepening = await getYoutubeVideosByIds(cfg.deepeningIds || DEEPENING_VIDEO_IDS)

  return (
    <>
      <section className="border-b border-primary/15 bg-secondary/75">
        <div className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-10">
          <span className="text-xs uppercase tracking-[0.35em] text-primary">{cfg.eyebrow}</span>
          <h1 className="mt-3 font-serif text-4xl font-medium leading-tight text-foreground md:text-5xl">{cfg.pageTitle}</h1>
          <div className="mt-6 max-w-5xl space-y-5 text-[1.05rem] font-semibold leading-relaxed text-foreground md:text-lg">
            <p>{cfg.intro1}</p>
            <p>{cfg.intro2}</p>
            <p>{cfg.intro3}</p>
          </div>
        </div>
      </section>

      <section className="border-b border-primary/15 bg-background">
        <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-14">
          <SectionHeading
            title={cfg.deepeningTitle}
            description={cfg.deepeningText}
            className="mb-9"
          />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {deepening.map((video) => <VideoCard key={video.id} video={video} showDate={false} />)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-14">
        <SectionHeading
          title={cfg.archiveTitle}
          description={cfg.archiveText}
          className="mb-9"
        />
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {archive.map((video) => <VideoCard key={video.id} video={video} descriptionLines={2} />)}
        </div>
      </section>

      <ContactCta />
    </>
  )
}
