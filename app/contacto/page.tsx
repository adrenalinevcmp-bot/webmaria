import type { Metadata } from 'next'
import { Mail, MessageCircle } from 'lucide-react'
import { InstagramIcon, YoutubeIcon } from '@/components/social-icons'
import { ContactForm } from '@/components/contact-form'
import { SOCIAL_LINKS } from '@/lib/data'
import { getCms } from '@/lib/cms'

export const metadata: Metadata = {
  title: 'Contacto · El Despertar',
  description: 'Ponte en contacto con María Olid y el proyecto El Despertar.',
}

const EMAIL = 'olid.maria@gmail.com'
const WHATSAPP = 'https://wa.me/34620430048'

export default async function ContactoPage() {
  const cfg = await getCms('contacto.page', {title:'Escríbeme', intro:'Si sientes el llamado a compartir, preguntar o acompañarte, escríbeme. Con gusto te responderé.', boxTitle:'Hablemos', boxText:'Comunicar lo que somos es dar lo que recibes. Estaré encantada de escucharte.', email:EMAIL, whatsapp:WHATSAPP})
  return (
    <section className="mx-auto max-w-6xl px-5 pb-12 pt-7 md:px-8 md:pb-14 md:pt-9">
      <div className="mb-8 max-w-3xl">
        <h1 className="font-serif text-4xl font-medium leading-tight text-foreground md:text-5xl">{cfg.title}</h1>
        <p className="mt-4 text-base leading-relaxed text-foreground/75 md:text-lg">{cfg.intro}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.85fr_1.5fr] lg:gap-8">
        <aside className="flex flex-col gap-4">
          <div className="rounded-sm border border-primary/15 bg-secondary/65 p-6">
            <h2 className="font-serif text-2xl font-medium text-foreground">{cfg.boxTitle}</h2>
            <p className="mt-3 text-base font-medium leading-relaxed text-foreground/80 text-pretty">{cfg.boxText}</p>
          </div>

          <div className="rounded-sm border border-primary/20 bg-card p-6">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-primary">Contacto directo</p>
            <div className="flex flex-col gap-4">
              <a href={`mailto:${cfg.email}`} className="flex items-center gap-3 text-sm font-medium text-foreground/80 transition-colors hover:text-primary"><span className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/25 bg-secondary/50"><Mail className="h-[18px] w-[18px]" /></span>{cfg.email}</a>
              <a href={cfg.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm font-medium text-foreground/80 transition-colors hover:text-primary"><span className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/25 bg-secondary/50"><MessageCircle className="h-[18px] w-[18px]" /></span>WhatsApp +34 620 430 048</a>
            </div>
          </div>

          <div className="rounded-sm border border-primary/20 bg-primary/8 p-6">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-primary">Redes</p>
            <div className="flex flex-col gap-4">
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm font-medium text-foreground/80 transition-colors hover:text-primary"><span className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/25 bg-background/80"><InstagramIcon className="h-[18px] w-[18px]" /></span>Instagram</a>
              <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm font-medium text-foreground/80 transition-colors hover:text-primary"><span className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/25 bg-background/80"><YoutubeIcon className="h-[18px] w-[18px]" /></span>YouTube · El Despertar</a>
            </div>
          </div>
        </aside>

        <div className="rounded-sm border border-primary/20 bg-card p-6 md:p-10">
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
