'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { InstagramIcon, YoutubeIcon } from '@/components/social-icons'
import { NAV_LINKS, SOCIAL_LINKS } from '@/lib/data'

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-primary/20 bg-secondary/95 shadow-[0_1px_0_rgba(0,0,0,0.03)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-3.5 md:px-8">
        <Link href="/" className="flex flex-col leading-none" onClick={() => setOpen(false)}>
          <span className="font-serif text-xl font-medium tracking-wide text-foreground">María Olid</span>
          <span className="mt-0.5 text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-foreground/65">El Despertar</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-foreground/72 transition-colors hover:text-primary">{link.label}</Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 md:flex">
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/25 bg-background/80 text-foreground/80 transition-colors hover:border-primary hover:text-primary"><InstagramIcon className="h-[18px] w-[18px]" /></a>
            <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/25 bg-background/80 text-foreground/80 transition-colors hover:border-primary hover:text-primary"><YoutubeIcon className="h-[18px] w-[18px]" /></a>
          </div>
          <button type="button" onClick={() => setOpen((v) => !v)} className="text-foreground lg:hidden" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-primary/15 bg-secondary lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-5 py-3 md:px-8">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="border-b border-primary/10 py-3 text-sm font-medium text-foreground/75 transition-colors hover:text-primary">{link.label}</Link>
            ))}
            <div className="flex items-center gap-5 py-4">
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-foreground/75 hover:text-primary"><InstagramIcon className="h-[18px] w-[18px]" /> Instagram</a>
              <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-foreground/75 hover:text-primary"><YoutubeIcon className="h-[18px] w-[18px]" /> YouTube</a>
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}
