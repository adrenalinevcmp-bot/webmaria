# Guía rápida para actualizar la web de María Olid

Esta guía indica los lugares principales que María puede modificar sin tener que rediseñar la web.

## 1. Entrevistas
Archivo principal: `lib/data.ts` y lógica automática en `lib/youtube.ts`.

- La página `/youtube` está preparada para mostrar **Vídeos para profundizar** y **Entrevistas para el Despertar**.
- Los vídeos fijos de “Vídeos para profundizar” se cambian en `DEEPENING_VIDEO_IDS` dentro de `lib/data.ts`.
- Para cambiar uno, copia únicamente el ID de YouTube. Ejemplo: en `https://youtu.be/U03rxJJt5p4`, el ID es `U03rxJJt5p4`.
- Las entrevistas pueden seleccionarse/ajustarse desde la fuente de YouTube configurada en `lib/youtube.ts`. Si María prefiere elegir solo entrevistas relevantes, conviene mantener una playlist específica de YouTube y usar esa playlist como fuente.

## 2. Meditaciones
Archivo: `lib/data.ts`.

- Castellano: lista `MEDITATION_ES_VIDEO_IDS`.
- Catalán: lista `MEDITATION_CA_VIDEO_IDS`.
- Añadir, quitar o reordenar un ID cambia el orden mostrado en la web.

## 3. Próximos eventos
Archivo: `lib/data.ts`, bloque `upcomingEvents`.

Cada evento contiene:
- `title`: título.
- `description`: descripción.
- `meta`: fecha/tipo de evento.
- `price`: precio, si corresponde.
- `image`: imagen del evento.

Imágenes actuales:
- Encuentro mensual: `public/images/evento-experimento-rendicion-octubre-2026.png`
- Retiro: `public/images/evento-retiro-despertar-noviembre-2026.png`

Para sustituir una imagen sin tocar código, se puede reemplazar el archivo conservando exactamente el mismo nombre.

> Nota: si existe la variable `EVENTS_JSON_URL` en Vercel, esa fuente externa tiene prioridad sobre los eventos escritos en `lib/data.ts`.

## 4. Acompañamiento
Página: `app/acompanamiento/page.tsx`.

Imagen de cabecera:
`public/images/acompanamiento-acoger-la-vida.png`

Para cambiarla sin editar código, sustituir ese archivo conservando el nombre.

Los textos largos de preguntas y respuestas están en `tutoriaFaq`, dentro de `lib/data.ts`.

## 5. Sobre María
Página: `app/page.tsx`, sección `sobre-maria`.

Imagen:
`public/images/maria-sobre-bn.png`

Está configurada con `object-center` para mantener a María centrada dentro del marco.

## 6. Contemplar el ser que eres
Archivo: `lib/data.ts`, bloque `galleryItems`.

Las cinco imágenes están en `public/images/` con nombres `contemplacion-01...` a `contemplacion-05...`. Las frases se editan directamente en `galleryItems`.

## 7. Contacto
Revisar `app/contacto/page.tsx`, `components/contact-cta.tsx` y `components/site-footer.tsx` para correo, WhatsApp y redes.

## 8. Publicar cambios en GitHub
Después de guardar/reemplazar los archivos, abrir CMD en la carpeta del proyecto y ejecutar una sola línea:

`git add . && git commit -m "Actualizar contenido web Maria Olid" && git push`

Vercel, si continúa conectado al repositorio, hará el despliegue automáticamente.

## Panel privado de gestión
Ruta oculta: `/gestion-maria` (no aparece en el menú público).
Correos autorizados: `adrenalinevcmp@gmail.com` y `olid.maria@gmail.com`.
La primera vez, pulsa **Crear mi acceso por primera vez**, define una contraseña y confirma el correo si se solicita. Después usa **Entrar**.
El panel permite editar portada, Sobre María, contacto, subir imágenes persistentes y crear bloques avanzados de contenido. Los cambios de portada y Sobre María se leen desde la base de datos sin tener que hacer git push.
