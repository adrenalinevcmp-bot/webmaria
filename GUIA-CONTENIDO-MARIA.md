# Guía rápida para María · actualizar contenido

## 1. Cambiar el vídeo semanal / última entrevista

No tienes que tocar el código.

1. Sube el vídeo nuevo a YouTube.
2. Añádelo a la playlist **ENTREVISTAS** del canal El Despertar.
3. La web consulta esa playlist automáticamente y el vídeo más reciente pasa a ser:
   - el vídeo destacado de la portada;
   - la última entrevista de la página YouTube.
4. El anterior pasa automáticamente a "Entrevista anterior".

La web revalida YouTube aproximadamente cada 15 minutos.

Playlist de entrevistas:
`PL9HycyjrHAk0ljDioNSyUUI7YP7I-8-oI`

## 2. Elegir una entrevista atemporal

En Vercel abre:

**Project → Settings → Environment Variables**

Añade o cambia:

`TIMELESS_INTERVIEW_VIDEO_ID`

Pon solo el ID del vídeo. Ejemplo: si el enlace es
`https://youtu.be/ABCDEFGHIJK`, el ID es `ABCDEFGHIJK`.

Guarda y vuelve a desplegar la web.

## 3. Meditaciones

Las meditaciones que aparecen ahora están fijadas por los enlaces enviados por María y en ese orden. Los IDs están en:

`lib/data.ts`

- `MEDITATION_ES_VIDEO_IDS`
- `MEDITATION_CA_VIDEO_IDS`

Para sustituir una, cambia únicamente el ID del vídeo.

## 4. Vídeos para profundizar

Los cinco vídeos están en:

`lib/data.ts` → `DEEPENING_VIDEO_IDS`

Para cambiar uno, sustituye solamente el ID manteniendo el orden.

## 5. Audiolibro

Los capítulos se cargan automáticamente desde la playlist de audiolibros. La web elimina del texto visible la expresión "Voz de María Olid" cuando aparece en la descripción.

## 6. Próximos eventos

Mientras no se configure una fuente externa de eventos, los datos están en:

`lib/data.ts` → `upcomingEvents`

Imágenes fáciles de localizar:

- `public/images/REEMPLAZAR-experimento-rendicion.png`
- `public/images/REEMPLAZAR-retiro-cabala-portada.png`

Para cambiar una imagen sin tocar código, reemplaza el archivo conservando exactamente el mismo nombre y extensión.

## 7. Formularios de eventos y retiros

El destinatario predeterminado es:

`olid.maria@gmail.com`

La opción recomendada es Resend mediante las variables de Vercel:

- `RESEND_API_KEY`
- `EMAIL_FROM`
- `ADMIN_NOTIFICATION_EMAIL=olid.maria@gmail.com`

Si Resend no está configurado, la web intenta usar FormSubmit. La primera vez FormSubmit puede enviar un correo de activación a María que debe aceptarse una vez.

## 8. Contemplaciones

Las cinco fotografías actuales son:

- `contemplacion-01-muelle.png`
- `contemplacion-02-olas.png`
- `contemplacion-03-luz-agua.png`
- `contemplacion-04-acantilados.png`
- `contemplacion-05-mar-calmo.png`

Las frases están en `lib/data.ts` → `galleryItems`.
