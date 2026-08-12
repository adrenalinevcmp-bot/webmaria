# María Olid · El Despertar

Web Next.js para María Olid. Está preparada para desplegarse en Vercel y actualizar automáticamente el contenido de YouTube.

## Automatización principal

- La portada usa como vídeo semanal la entrevista más reciente de la playlist oficial de entrevistas.
- La página YouTube muestra automáticamente última entrevista, entrevista anterior y archivo reciente.
- Meditaciones, vídeos para profundizar y audiolibro utilizan los vídeos definidos/configurados para cada sección.
- Los formularios de contacto, retiros, eventos y acompañamiento se envían a `olid.maria@gmail.com`.

Consulta `GUIA-CONTENIDO-MARIA.md` para saber cómo actualizar vídeos, entrevista atemporal, imágenes y eventos.

## Variables de entorno

Copia `.env.example` como `.env.local` para desarrollo. En Vercel configura las variables necesarias en **Project → Settings → Environment Variables**.

### YouTube

Las playlists oficiales ya tienen valores predeterminados en el código:

- Entrevistas: `PL9HycyjrHAk0ljDioNSyUUI7YP7I-8-oI`
- Meditaciones guiadas: `PL9HycyjrHAk0v7j3MWRrs3WDbbzovhpcK`
- Meditaciones en catalán: `PL9HycyjrHAk2IIBJVzA3Zzp8AahrJo5Gz`
- Audiolibros: `PL9HycyjrHAk10Od_hCorgb-B3B2W4PNxs`

### Formularios

Recomendado en Vercel:

```env
RESEND_API_KEY=...
EMAIL_FROM=El Despertar <web@tudominio.com>
ADMIN_NOTIFICATION_EMAIL=olid.maria@gmail.com
NEXT_PUBLIC_CONTACT_EMAIL=olid.maria@gmail.com
```

Si Resend no está configurado, la API intenta usar FormSubmit con `olid.maria@gmail.com`.

## Imágenes

Las imágenes de eventos que todavía son provisionales tienen nombres claros que empiezan por `REEMPLAZAR-` dentro de `public/images/`.

Las nuevas contemplaciones están guardadas como `contemplacion-01-...` hasta `contemplacion-05-...`.

## Administración

La ruta `/admin` sigue siendo informativa. Para un panel de login real que permita cambiar contenido públicamente sin tocar GitHub hace falta conectar Supabase o un CMS con credenciales reales.
