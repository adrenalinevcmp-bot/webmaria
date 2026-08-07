'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AutomaticForm } from '@/components/automatic-form'

export function SignupDialog({ trigger, title, subtitle, className }: { trigger: string; title: string; subtitle?: string; className?: string }) {
  const [open, setOpen] = useState(false)
  const titleId = useId()
  const closeRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey); document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; triggerRef.current?.focus() }
  }, [open])
  return <>
    <button ref={triggerRef} type="button" onClick={() => setOpen(true)} className={cn('inline-flex items-center justify-center rounded-sm bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-90', className)}>{trigger}</button>
    {open && <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4" role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <button aria-label="Cerrar diálogo" className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="relative z-10 my-8 w-full max-w-lg rounded-sm border border-border bg-background p-8 shadow-xl">
        <button ref={closeRef} type="button" onClick={() => setOpen(false)} aria-label="Cerrar" className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
        <p className="text-xs uppercase tracking-[0.35em] text-primary">El Despertar</p>
        <h3 id={titleId} className="mt-3 font-serif text-2xl font-medium text-foreground">{title}</h3>
        {subtitle && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{subtitle}</p>}
        <div className="mt-6"><AutomaticForm type={trigger} context={title} compact /></div>
      </div>
    </div>}
  </>
}
