import type { Metadata } from 'next'
import Image from 'next/image'
import { Monitor, Clock, Euro } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { FaqAccordion } from '@/components/faq-accordion'
import { SignupDialog } from '@/components/signup-dialog'
import { tutoriaFaq } from '@/lib/data'
import { ContactCta } from '@/components/contact-cta'

export const metadata: Metadata = {
  title: 'Tutorías · El Despertar',
  description:
    'Acompañamiento individual con María Olid. Consulta online por Zoom, de 60 a 75 minutos.',
}

const details = [
  { icon: Monitor, label: 'Consulta online por Zoom' },
  { icon: Clock, label: 'Duración de 60 a 75 minutos' },
  { icon: Euro, label: 'Precio: 50 €' },
]

export default function TutoriasPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tutorías"
        title="Acompañamiento individual"
        intro="Un espacio íntimo para mirar con honestidad aquello que se mueve en tu vida y abrirte a una experiencia más amplia de lo que eres."
      />

      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-muted">
          <Image
            src="/images/maria-tutorias-real.jpg"
            alt="María Olid, acompañamiento individual"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="object-cover object-center"
          />
        </div>
        <div className="flex flex-col gap-5">
          <span className="text-xs uppercase tracking-[0.35em] text-primary">Consulta online por Zoom</span>
          <h2 className="font-serif text-3xl font-medium leading-tight text-foreground md:text-4xl">Un espacio de acompañamiento y claridad interior</h2>
          <p className="text-base leading-relaxed text-muted-foreground">Las sesiones individuales se realizan de forma online, mediante Zoom. Para poder participar, solo necesitas disponer de cámara, micrófono y una conexión a internet estable, en un espacio tranquilo donde puedas estar presente y sin interrupciones.</p>
        </div>
      </section>

      {/* Detalles */}
      <section className="mx-auto max-w-4xl px-5 pb-14 md:px-8 md:pb-16">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {details.map((d) => (
            <div
              key={d.label}
              className="flex flex-col items-center gap-3 rounded-sm border border-border bg-card px-6 py-8 text-center"
            >
              <d.icon className="h-6 w-6 text-primary" />
              <span className="text-sm leading-relaxed text-foreground text-pretty">
                {d.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ desplegable */}
      <section className="mx-auto max-w-3xl px-5 pb-16 md:px-8 md:pb-20">
        <FaqAccordion items={tutoriaFaq} />
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-5 py-16 text-center md:px-8 md:py-20">
          <h2 className="font-serif text-3xl font-medium leading-tight text-foreground text-balance md:text-4xl">
            ¿Sientes el llamado a mirar dentro?
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground text-pretty">
            Reserva un espacio de acompañamiento individual. La vida misma se
            está ocupando de tu despertar.
          </p>
          <SignupDialog
            trigger="Solicitar una sesión"
            title="Solicitar una sesión"
            subtitle="Déjanos tus datos y te contactaremos para coordinar tu consulta individual."
          />
        </div>
      </section>
      <ContactCta />
    </>
  )
}
