'use client'

import { useState } from 'react'

const field = 'rounded-sm border border-input bg-card px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-primary'

export function AutomaticForm({ type, context, compact = false }: { type: string; context?: string; compact?: boolean }) {
  const [state, setState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  return (
    <form className="flex flex-col gap-4" onSubmit={async (e) => {
      e.preventDefault(); setState('sending'); setError('')
      const form = e.currentTarget
      const data = Object.fromEntries(new FormData(form).entries())
      const res = await fetch('/api/form', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...data, type, context }) })
      const json = await res.json()
      if (res.ok) { setState('success'); form.reset() } else { setState('error'); setError(json.error || 'Error al enviar') }
    }}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input required name="name" autoComplete="name" className={field} placeholder="Nombre y apellidos" />
        <input required name="email" type="email" autoComplete="email" className={field} placeholder="Correo electrónico" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input name="phone" type="tel" autoComplete="tel" className={field} placeholder="Teléfono (opcional)" />
        {!compact && <select name="reason" className={field} defaultValue=""><option value="" disabled>Motivo</option><option>Información general</option><option>Tutorías</option><option>Retiros</option><option>Eventos</option><option>Otro</option></select>}
      </div>
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <textarea required name="message" rows={compact ? 3 : 5} className={`${field} resize-none`} placeholder="Mensaje" />
      <label className="flex items-start gap-2 text-sm text-muted-foreground"><input required name="privacy" type="checkbox" className="mt-1" /><span>Acepto la <a href="/privacidad" className="underline underline-offset-2 hover:text-primary">política de privacidad</a> y el tratamiento de mis datos.</span></label>
      <button disabled={state === 'sending'} className="self-start rounded-sm bg-primary px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground disabled:opacity-60">{state === 'sending' ? 'Enviando…' : 'Enviar'}</button>
      {state === 'success' && <p className="text-sm text-foreground" role="status">Gracias. Tu mensaje se ha enviado correctamente.</p>}
      {state === 'error' && <p className="text-sm text-destructive" role="alert">{error}</p>}
    </form>
  )
}
