import Link from 'next/link'
import { Mail, MessageCircle } from 'lucide-react'
import { InstagramIcon, YoutubeIcon } from '@/components/social-icons'
import { NAV_LINKS, SOCIAL_LINKS } from '@/lib/data'

const WHATSAPP_HREF = 'https://wa.me/34620430048'
const CONTACT_EMAIL = 'olid.maria@gmail.com'

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-primary/20 bg-secondary/70">
      <div className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-10">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-sm border border-primary/15 bg-background/55 p-5">
            <p className="font-serif text-2xl font-medium text-foreground">María Olid</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.35em] text-foreground/65">El Despertar</p>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-foreground text-pretty">
              Comunicar lo que somos es dar lo que recibes. Porque nada es para ti, eres canal para la vida. Eres vida.
            </p>
          </div>

          <nav className="rounded-sm border border-primary/15 bg-background/55 p-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-foreground/65">Navegación</p>
            <div className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => <Link key={link.href} href={link.href} className="text-sm text-foreground/72 transition-colors hover:text-primary">{link.label}</Link>)}
            </div>
          </nav>

          <div className="rounded-sm border border-primary/20 bg-primary/8 p-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-foreground/70">Sígueme y contacto</p>
            <div className="flex flex-col gap-3">
              <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center gap-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary"><Mail className="h-4 w-4" /> {CONTACT_EMAIL}</a>
              <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary"><MessageCircle className="h-4 w-4" /> WhatsApp +34 620 430 048</a>
              <div className="flex items-center gap-3 pt-1">
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-background/80 text-foreground/80 transition-colors hover:border-primary hover:text-primary"><InstagramIcon className="h-[18px] w-[18px]" /></a>
                <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-background/80 text-foreground/80 transition-colors hover:border-primary hover:text-primary"><YoutubeIcon className="h-[18px] w-[18px]" /></a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-primary/15 pt-4">
          <p className="text-xs text-foreground/60">© {new Date().getFullYear()} María Olid · El Despertar. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
