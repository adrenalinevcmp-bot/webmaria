import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'

export const metadata: Metadata = {
  title: 'Política de privacidad · El Despertar',
  description: 'Información básica sobre el tratamiento de datos de contacto e inscripciones.',
}

export default function PrivacidadPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Política de privacidad" intro="Información básica sobre el uso de los datos enviados mediante los formularios de esta web." />
      <main className="mx-auto max-w-3xl px-5 py-14 text-base leading-relaxed text-muted-foreground md:px-8 md:py-20">
        <div className="space-y-6">
          <p><strong className="text-foreground">Responsable:</strong> María Olid.</p>
          <p><strong className="text-foreground">Contacto:</strong> <a className="text-primary underline underline-offset-4" href="mailto:olid.maria@gmail.com">olid.maria@gmail.com</a>.</p>
          <p>Los datos enviados se utilizarán exclusivamente para responder consultas, gestionar solicitudes de acompañamiento e informar o tramitar inscripciones relacionadas con encuentros y retiros.</p>
          <p>No se utilizarán para comunicaciones comerciales sin consentimiento y no se cederán a terceros salvo obligación legal o proveedores técnicos necesarios para gestionar el envío de formularios.</p>
          <p>Puedes solicitar acceso, rectificación o eliminación de tus datos escribiendo al correo indicado.</p>
          <p className="text-sm">Este texto es una base informativa y debe revisarse con asesoramiento legal antes de publicar la web definitivamente.</p>
        </div>
      </main>
    </>
  )
}
