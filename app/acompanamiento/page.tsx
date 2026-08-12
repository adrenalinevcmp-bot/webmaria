import type { Metadata } from 'next'
import Image from 'next/image'
import { Monitor, Clock, Euro } from 'lucide-react'
import { FaqAccordion } from '@/components/faq-accordion'
import { SignupDialog } from '@/components/signup-dialog'
import { tutoriaFaq } from '@/lib/data'
import { ContactCta } from '@/components/contact-cta'

export const metadata: Metadata = {
  title: 'Acompañamiento · El Despertar',
  description: 'Acompañamiento individual con María Olid. Consulta online por Zoom, de 60 a 75 minutos.',
}

const details = [
  { icon: Monitor, label: 'Consulta online por Zoom' },
  { icon: Clock, label: 'Duración de 60 a 75 minutos' },
  { icon: Euro, label: 'Precio: 50 €' },
]

export default function AcompanamientoPage() {
  return (
    <>
      <section className="border-b border-primary/15 bg-secondary/65">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-9 px-5 py-8 md:px-8 md:py-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div className="flex min-h-[360px] items-end justify-center overflow-hidden rounded-sm bg-background/40 sm:min-h-[430px]">
            <Image
              src="/images/maria-ojos-cerrados.png"
              alt="María Olid con los ojos cerrados"
              width={404}
              height={375}
              priority
              sizes="(max-width: 1024px) 92vw, 42vw"
              className="h-auto w-full max-w-[520px] object-contain object-bottom"
            />
          </div>
          <div className="flex flex-col gap-5">
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">Acompañamiento individual</span>
            <h1 className="font-serif text-4xl font-medium leading-tight text-foreground md:text-5xl">Un espacio de acompañamiento y claridad interior</h1>
            <p className="text-[1.02rem] leading-[1.8] text-foreground/75 text-pretty md:text-lg">
              Las sesiones individuales se realizan de forma online, mediante Zoom. Para poder participar, solo necesitas disponer de cámara, micrófono y una conexión a internet estable, en un espacio tranquilo donde puedas estar presente y sin interrupciones. El sentido profundo de este encuentro es facilitar un regreso a la Paz, soltando progresivamente las interpretaciones, defensas y formas de identificación que nos alejan de nuestra verdadera naturaleza.
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
          <h2 className="font-serif text-3xl font-medium leading-tight text-foreground text-balance md:text-4xl">¿Sientes el llamado a mirar dentro?</h2>
          <p className="max-w-xl text-base leading-relaxed text-foreground/75 text-pretty">Solicita un espacio de acompañamiento individual y nos pondremos en contacto contigo para coordinarlo.</p>
          <SignupDialog trigger="Solicitar una sesión" title="Solicitar una sesión" subtitle="Déjanos tus datos y te contactaremos para coordinar tu consulta individual." />
        </div>
      </section>
      <ContactCta />
    </>
  )
}
