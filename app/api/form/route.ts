import { NextResponse } from 'next/server'

const DEFAULT_ADMIN_EMAIL = 'olid.maria@gmail.com'

function clean(value: unknown) {
  return String(value ?? '').trim().slice(0, 5000)
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  })[character] || character)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    if (clean(body.website)) return NextResponse.json({ ok: true })

    const name = clean(body.name)
    const email = clean(body.email)
    const type = clean(body.type || 'Contacto')
    const context = clean(body.context)
    const message = clean(body.message)

    if (!name || !email || !message || !clean(body.privacy)) {
      return NextResponse.json(
        { error: 'Completa los campos obligatorios y acepta la política de privacidad.' },
        { status: 400 },
      )
    }

    const apiKey = process.env.RESEND_API_KEY
    const to = process.env.ADMIN_NOTIFICATION_EMAIL || DEFAULT_ADMIN_EMAIL
    const from = process.env.EMAIL_FROM

    const details = Object.entries(body)
      .filter(([key]) => !['website', 'privacy'].includes(key))
      .map(([key, value]) => `<p><strong>${escapeHtml(key)}:</strong> ${escapeHtml(clean(value))}</p>`)
      .join('')

    if (apiKey && from) {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: email,
          subject: `${type}${context ? ` — ${context}` : ''} — ${name}`,
          html: `<h2>${escapeHtml(type)}</h2>${details}`,
        }),
      })
      if (!response.ok) throw new Error('Email provider error')

      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from,
          to: [email],
          subject: 'Hemos recibido tu solicitud',
          html: `<p>Hola ${escapeHtml(name)},</p><p>Hemos recibido tu solicitud${context ? ` para <strong>${escapeHtml(context)}</strong>` : ''}. Nos pondremos en contacto contigo lo antes posible.</p><p>María Olid · El Despertar</p>`,
        }),
      })

      return NextResponse.json({ ok: true, provider: 'resend' })
    }

    // Alternativa sin claves: FormSubmit. La primera solicitud exige confirmar
    // el correo de destino desde el mensaje que recibe María.
    const formSubmit = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: `${type}${context ? ` — ${context}` : ''} — ${name}`,
        _template: 'table',
        _captcha: 'false',
        nombre: name,
        correo: email,
        telefono: clean(body.phone),
        motivo: clean(body.reason || type),
        actividad: context,
        mensaje: message,
      }),
    })

    if (!formSubmit.ok) {
      return NextResponse.json(
        { error: 'No se pudo enviar el formulario. Configura Resend o inténtalo de nuevo.' },
        { status: 502 },
      )
    }

    return NextResponse.json({ ok: true, provider: 'formsubmit' })
  } catch {
    return NextResponse.json(
      { error: 'No se pudo enviar el formulario. Inténtalo de nuevo.' },
      { status: 500 },
    )
  }
}
