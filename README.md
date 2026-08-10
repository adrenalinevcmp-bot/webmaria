# María Olid · El Despertar

Web Next.js corregida y preparada para actualización automática.

## Qué queda automático

- El último vídeo y la página de YouTube se actualizan desde el feed oficial del canal `@mariaolid` cada 15 minutos.
- Entrevistas, meditaciones guiadas, meditacions en català y audiolibros se cargan automáticamente desde las playlists oficiales facilitadas.
- Los eventos pueden actualizarse automáticamente desde una fuente JSON configurada en `EVENTS_JSON_URL`.
- Los formularios de contacto, acompañamiento, retiros y eventos envían un email a María y una confirmación al visitante mediante Resend.
- Si YouTube no responde, la web conserva el contenido local de respaldo para no quedar vacía.

## Configuración

1. Copia `.env.example` como `.env.local`.
2. Las playlists oficiales ya están incluidas como valores predeterminados y también en `.env.example`. Solo necesitas cambiarlas si en el futuro se reemplaza alguna playlist.
3. Crea una cuenta en Resend, verifica el dominio y completa `RESEND_API_KEY`, `EMAIL_FROM` y `ADMIN_NOTIFICATION_EMAIL`.
4. Añade el enlace real de Instagram.
5. Ejecuta `pnpm install` y `pnpm dev`.

## Fotografías

Reemplaza conservando los nombres:

- `public/images/maria-hero.png`
- `public/images/maria-about.png`
- `public/images/retreat.png`
- `public/images/gallery-1.png` a `gallery-5.png`

## Nota sobre administración

Esta versión prioriza automatización real sin añadir una base de datos obligatoria. YouTube y los formularios funcionan con las variables indicadas. Para editar eventos y fotografías desde un login privado hace falta conectar un CMS o Supabase; no debe simularse, ya que necesita un proyecto y credenciales externas reales.


## Playlists automáticas configuradas

- Entrevistas: `PL9HycyjrHAk0ljDioNSyUUI7YP7I-8-oI`
- Meditaciones guiadas: `PL9HycyjrHAk0v7j3MWRrs3WDbbzovhpcK`
- Meditacions en català: `PL9HycyjrHAk2IIBJVzA3Zzp8AahrJo5Gz`
- Audiolibros: `PL9HycyjrHAk10Od_hCorgb-B3B2W4PNxs`

La web consulta los feeds públicos de YouTube y revalida el contenido cada 15 minutos. Al añadir un vídeo a una de estas playlists, aparecerá automáticamente en su sección correspondiente.

## Ajustes personalizados de María Olid

- Canal y playlists de YouTube configurados en `lib/youtube.ts` y `.env.example`.
- Fotografías reales incorporadas en portada, Sobre María, YouTube y Acompañamiento.
- Los botones **Apuntarse** de retiros y encuentros abren un formulario asociado a la actividad seleccionada.
- El correo receptor predeterminado es `olid.maria@gmail.com`.

### Envío de formularios

La opción recomendada es configurar Resend en Vercel:

```env
RESEND_API_KEY=...
EMAIL_FROM=El Despertar <web@tudominio.com>
ADMIN_NOTIFICATION_EMAIL=olid.maria@gmail.com
```

Mientras Resend no esté configurado, el proyecto usa FormSubmit como alternativa. En el primer envío, FormSubmit enviará un mensaje de activación a `olid.maria@gmail.com`; María deberá confirmar ese correo una sola vez para autorizar la recepción de formularios.

### Fotografías incorporadas

- `public/images/maria-hero-real.png`
- `public/images/maria-about-real.jpg`
- `public/images/maria-tutorias-real.jpg`
- `public/images/maria-youtube-cutout.png`

### Nota legal

La página `/privacidad` contiene una base informativa. Debe revisarse con asesoramiento legal antes de publicar definitivamente.

## Imágenes fáciles de reemplazar
Consulta `GUIA-REEMPLAZO-IMAGENES.md`. Todos los archivos pendientes comienzan por `REEMPLAZAR-`.

## Administración
La ruta `/admin` explica el estado actual. No se incluye un falso panel local: para un login que cambie contenido públicamente se requiere Supabase o un CMS con credenciales reales.
