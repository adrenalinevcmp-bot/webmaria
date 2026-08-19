import type { Metadata } from 'next'
import Image from 'next/image'
import { Monitor, Clock, Euro } from 'lucide-react'
import { FaqAccordion } from '@/components/faq-accordion'
import { SignupDialog } from '@/components/signup-dialog'
import { tutoriaFaq } from '@/lib/data'
import { ContactCta } from '@/components/contact-cta'
import { getCms } from '@/lib/cms'

export const metadata: Metadata = {
  title: 'Acompañamiento · El Despertar',
  description: 'Acompañamiento individual con María Olid. Consulta online por Zoom, de 60 a 75 minutos.',
}

const details = [
  { icon: Monitor, label: 'Consulta online por Zoom' },
  { icon: Clock, label: 'Duración de 60 a 75 minutos' },
  { icon: Euro, label: 'Precio: 50 €' },
]

export default async function AcompanamientoPage() {
  const cfg = await getCms('acompanamiento.page', {image:'/images/acompanamiento-acoger-la-vida.png', quote:'“Acoger la Vida, acompañando la vida”', author:'María Olid', subtitle:'Un espacio de acompañamiento espiritual y claridad interior para la vida diaria.', ctaTitle:'¿Sientes el llamado a mirar dentro?', ctaText:'Solicita un espacio de acompañamiento individual y nos pondremos en contacto contigo para coordinarlo.'})
  return (
    <>
      <section className="relative isolate min-h-[520px] overflow-hidden border-b border-primary/15 md:min-h-[620px]">
        <Image
          src={cfg.image}
          alt="Manos sosteniendo flores al atardecer"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-foreground/35" />
        <div className="relative mx-auto flex min-h-[520px] max-w-6xl items-center px-5 py-16 md:min-h-[620px] md:px-8">
          <div className="max-w-3xl text-background drop-shadow-sm">
            <p className="font-serif text-4xl font-medium leading-tight md:text-6xl">{cfg.quote}</p>
            <p className="mt-4 font-serif text-2xl italic md:text-3xl">{cfg.author}</p>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-background/95 md:text-xl">
              {cfg.subtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-12 md:px-8 md:py-14">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {details.map((d) => (
            <div key={d.label} className="flex flex-col items-center gap-3 rounded-sm border border-primary/15 bg-card px-6 py-8 text-center">
              <d.icon className="h-6 w-6 text-primary" />
              <span className="text-sm leading-relaxed text-foreground text-pretty">{d.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 pb-14 md:px-8 md:pb-16">
        <FaqAccordion items={tutoriaFaq} />
      </section>

      <section className="border-t border-primary/15 bg-secondary/70">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-5 py-14 text-center md:px-8 md:py-16">
          <h2 className="font-serif text-3xl font-medium leading-tight text-foreground text-balance md:text-4xl">{cfg.ctaTitle}</h2>
          <p className="max-w-xl text-base leading-relaxed text-foreground/75 text-pretty">{cfg.ctaText}</p>
          <SignupDialog trigger="Solicitar una sesión" title="Solicitar una sesión" subtitle="Déjanos tus datos y te contactaremos para coordinar tu consulta individual." />
        </div>
      </section>
      <ContactCta />
    </>
  )
}
