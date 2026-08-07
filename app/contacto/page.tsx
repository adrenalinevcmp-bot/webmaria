import type { Metadata } from 'next'
import { Mail } from 'lucide-react'
import { InstagramIcon, YoutubeIcon } from '@/components/social-icons'
import { PageHeader } from '@/components/page-header'
import { ContactForm } from '@/components/contact-form'
import { SOCIAL_LINKS } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Contacto · El Despertar',
  description: 'Ponte en contacto con María Olid y el proyecto El Despertar.',
}

export default function ContactoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contacto"
        title="Escríbeme"
        intro="Si sientes el llamado a compartir, preguntar o acompañarte, escríbeme. Con gusto te responderé."
      />

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <aside className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <h2 className="font-serif text-2xl font-medium text-foreground">
                Hablemos
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground text-pretty">
                Comunicar lo que somos es dar lo que recibes. Estaré encantada de
                escucharte.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border">
                  <InstagramIcon className="h-[18px] w-[18px]" />
                </span>
                Instagram
              </a>
              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border">
                  <YoutubeIcon className="h-[18px] w-[18px]" />
                </span>
                YouTube · El Despertar
              </a>
              <span className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border">
                  <Mail className="h-[18px] w-[18px]" />
                </span>
                {process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'Correo por confirmar'}
              </span>
            </div>
          </aside>

          <div className="rounded-sm border border-border bg-card p-6 md:p-10">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
