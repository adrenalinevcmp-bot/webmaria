import Link from 'next/link'
import { InstagramIcon, YoutubeIcon } from '@/components/social-icons'
import { NAV_LINKS, SOCIAL_LINKS } from '@/lib/data'

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/70 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <p className="font-serif text-2xl font-medium text-foreground">
              María Olid
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.35em] text-muted-foreground">
              El Despertar
            </p>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground text-pretty">
              Comunicar lo que somos es dar lo que recibes. Porque nada es para
              ti, eres canal para la vida. Eres vida.
            </p>
          </div>

          <nav className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-4">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Sígueme
            </p>
            <a href="mailto:olid.maria@gmail.com" className="text-sm text-muted-foreground transition-colors hover:text-primary">olid.maria@gmail.com</a>
            <div className="flex items-center gap-4">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <InstagramIcon className="h-[18px] w-[18px]" />
              </a>
              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <YoutubeIcon className="h-[18px] w-[18px]" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border/60 pt-6">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} María Olid · El Despertar. Todos los
            derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
