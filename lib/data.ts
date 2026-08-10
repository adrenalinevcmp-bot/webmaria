// Datos locales de demostración.
// Preparado para conectar datos reales posteriormente:
// basta con reemplazar estos arrays por datos provenientes de una API o CMS.

export const NAV_LINKS = [
  { label: 'Sobre mí', href: '/#sobre-maria' },
  { label: 'YouTube', href: '/youtube' },
  { label: 'Meditaciones', href: '/meditaciones' },
  { label: 'Retiros y Eventos', href: '/retiros' },
  { label: 'Acompañamiento', href: '/acompanamiento' },
  { label: 'Contacto', href: '/contacto' },
]

export const SOCIAL_LINKS = {
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com',
  youtube: 'https://www.youtube.com/@mariaolid',
}

export type VideoItem = {
  id: string
  title: string
  description: string
  thumbnail: string
  duration?: string
  date: string
  publishedAt?: string
  href: string
}

export const featuredVideo: VideoItem = {
  id: 'v-featured',
  title: 'El sentido de la vida se encuentra sirviendo a la vida',
  description:
    'Una conversación profunda sobre el despertar, el amor y la entrega a la vida.',
  thumbnail: '/images/REEMPLAZAR-respaldo-video-destacado.png',
  duration: '48:12',
  date: 'Último contenido disponible',
  href: 'https://www.youtube.com/@mariaolid',
}

export const youtubeSections: {
  key: string
  heading: string
  video: VideoItem
}[] = [
  {
    key: 'ultima-entrevista',
    heading: 'Última entrevista',
    video: {
      id: 'yt-1',
      title: 'El sentido de la vida se encuentra sirviendo a la vida',
      description: 'Reflexiones sobre el servicio, la entrega y el despertar.',
      thumbnail: '/images/REEMPLAZAR-respaldo-video-destacado.png',
      duration: '48:12',
      date: 'Esta semana',
      href: '#',
    },
  },
  {
    key: 'entrevista-semana',
    heading: 'Entrevista de esta semana',
    video: {
      id: 'yt-2',
      title: 'Comprender el miedo desde la conciencia',
      description: 'Una mirada amplia sobre el miedo y la identidad personal.',
      thumbnail: '/images/REEMPLAZAR-respaldo-video-entrevista-01.png',
      duration: '52:40',
      date: 'Esta semana',
      href: '#',
    },
  },
  {
    key: 'entrevista-anterior',
    heading: 'Entrevista anterior',
    video: {
      id: 'yt-3',
      title: 'Abrirse al amor más allá de la historia personal',
      description: 'Conversación sobre el amor y aquello que somos.',
      thumbnail: '/images/REEMPLAZAR-respaldo-video-meditacion.png',
      duration: '41:05',
      date: 'Semana pasada',
      href: '#',
    },
  },
  {
    key: 'estas-despierta',
    heading: 'Estás despierta ahora',
    video: {
      id: 'yt-4',
      title: 'Estás despierta ahora',
      description: 'Reconocer el despertar que ya sucede en ti.',
      thumbnail: '/images/REEMPLAZAR-respaldo-video-entrevista-02.png',
      duration: '33:18',
      date: 'Hace dos semanas',
      href: '#',
    },
  },
  {
    key: 'poder-mente-amor',
    heading: 'El poder de la mente y del amor',
    video: {
      id: 'yt-5',
      title: 'El poder de la mente y del amor',
      description: 'Cómo la mente y el amor transforman nuestra experiencia.',
      thumbnail: '/images/REEMPLAZAR-frase-02-alquimia-dolor-amor.png',
      duration: '45:52',
      date: 'Hace tres semanas',
      href: '#',
    },
  },
]

export const previousInterviews: VideoItem[] = [
  {
    id: 'prev-1',
    title: 'La identidad y aquello que somos',
    description: 'Cuestionar la identidad personal.',
    thumbnail: '/images/REEMPLAZAR-frase-04-renacer-a-tu-luz.png',
    duration: '38:22',
    date: 'Agosto 2025',
    href: '#',
  },
  {
    id: 'prev-2',
    title: 'Transformar el dolor en amor',
    description: 'La alquimia interior del despertar.',
    thumbnail: '/images/REEMPLAZAR-frase-01-misterio-existencia.png',
    duration: '44:10',
    date: 'Julio 2025',
    href: '#',
  },
  {
    id: 'prev-3',
    title: 'Aceptar lo que sentimos',
    description: 'Lo que niegas te ata, lo que aceptas te transforma.',
    thumbnail: '/images/REEMPLAZAR-frase-05-apego-y-lo-real.png',
    duration: '36:47',
    date: 'Junio 2025',
    href: '#',
  },
]

export type Meditation = {
  id: string
  title: string
  description: string
  thumbnail: string
  duration?: string
  href?: string
}

export const meditationsEs: Meditation[] = [
  {
    id: 'med-es-1',
    title: 'Meditación: la más poderosa',
    description: 'Un espacio para regresar a la presencia y al Ser.',
    thumbnail: '/images/REEMPLAZAR-respaldo-video-entrevista-02.png',
    duration: '22:00',
  },
  {
    id: 'med-es-2',
    title: '¿No te parece suficiente amor?',
    description: 'Reconocer el amor que ya eres.',
    thumbnail: '/images/REEMPLAZAR-frase-01-misterio-existencia.png',
    duration: '18:30',
  },
  {
    id: 'med-es-3',
    title: 'No esperes, suelta',
    description: 'La práctica de soltar y confiar en la vida.',
    thumbnail: '/images/REEMPLAZAR-frase-03-aceptacion-transforma.png',
    duration: '20:15',
  },
]

export const meditationsCa: Meditation[] = [
  {
    id: 'med-ca-1',
    title: 'MEDITACIÓ EN CATALÀ — PRACTICAR L’AGRAÏMENT',
    description: 'Una pràctica per obrir el cor a l’agraïment.',
    thumbnail: '/images/REEMPLAZAR-frase-02-alquimia-dolor-amor.png',
    duration: '19:40',
  },
  {
    id: 'med-ca-2',
    title: 'Tu no ets els teus pensaments',
    description: 'Reconèixer allò que som més enllà de la ment.',
    thumbnail: '/images/REEMPLAZAR-respaldo-video-meditacion.png',
    duration: '17:05',
  },
  {
    id: 'med-ca-3',
    title: 'Contempla l’amor que ets',
    description: 'Reposar en la teva veritable naturalesa.',
    thumbnail: '/images/REEMPLAZAR-frase-05-apego-y-lo-real.png',
    duration: '21:20',
  },
]

export type EventItem = {
  id: string
  title: string
  description: string
  meta: string
  price?: string
  image?: string
}

export const upcomingEvents: EventItem[] = [
  {
    id: 'ev-1',
    title: 'Experimento Rendición',
    description:
      'Encuentro mensual. Empieza el 1 de octubre. El primer jueves de cada mes, de 19:30 a 21:30. Compartir desde el Ser.',
    meta: 'Encuentro mensual · Primer jueves de mes · 19:30–21:30',
    price: 'Trimestre: 60 €',
    image: '/images/REEMPLAZAR-experimento-rendicion.png',
  },
  {
    id: 'ev-2',
    title: 'Próximo retiro del Despertar',
    description: 'Próximo retiro del Despertar en noviembre.',
    meta: 'Retiro · Próximamente',
    image: '/images/REEMPLAZAR-retiro-cabala-portada.png',
  },
]

export const galleryItems: { image: string; quote: string }[] = [
  {
    image: '/images/REEMPLAZAR-frase-01-misterio-existencia.png',
    quote: 'El mayor misterio de la existencia es la existencia misma.',
  },
  {
    image: '/images/REEMPLAZAR-frase-02-alquimia-dolor-amor.png',
    quote: 'Eres alquimia, puedes transformar el dolor en amor.',
  },
  {
    image: '/images/REEMPLAZAR-frase-03-aceptacion-transforma.png',
    quote: 'Lo que niegas te ata, lo que aceptas te transforma.',
  },
  {
    image: '/images/REEMPLAZAR-frase-04-renacer-a-tu-luz.png',
    quote: 'Puedes renacer a tu luz, siendo honesta con lo que sientes.',
  },
  {
    image: '/images/REEMPLAZAR-frase-05-apego-y-lo-real.png',
    quote: 'El apego te separa de lo Real.',
  },
]

export const tutoriaFaq: { question: string; answer: string }[] = [
  {
    question: '¿En qué consiste la consulta individual?',
    answer: 'La consulta individual es un espacio de acompañamiento y claridad interior. Su propósito es ayudarte a mirar con honestidad aquello que en este momento está generando conflicto, sufrimiento, bloqueo o confusión en tu vida. A través de la situación concreta que estés viviendo, se abre la posibilidad de reconocer los pensamientos, creencias, emociones y mecanismos internos que sostienen el malestar. No se trata únicamente de resolver algo externo, sino de comprender qué está mostrando esa experiencia y qué parte de ti está siendo llamada a ser vista con más conciencia. El sentido profundo de este encuentro es facilitar un regreso a la Paz, soltando progresivamente las interpretaciones, defensas y formas de identificación que nos alejan de nuestra verdadera naturaleza.',
  },
  {
    question: '¿Qué temas se pueden tratar?',
    answer: 'Pueden aparecer asuntos muy distintos: relaciones, miedo, culpa, dependencia emocional, pérdida, inseguridad, decisiones importantes, sensación de vacío, conflictos familiares, bloqueos personales o momentos de cambio interior. Aunque cada situación tenga una forma diferente, en el fondo muchas veces nos está señalando una misma raíz: la identificación con una idea limitada de nosotros mismos. Durante la consulta, primero se acompaña a la persona a observar con claridad qué sistema de pensamiento está funcionando detrás del conflicto. Después, desde una mirada más profunda y compasiva, se abre un espacio para soltar el juicio, la culpa y la exigencia, permitiendo que aparezca una comprensión más amplia, más inocente y más verdadera. La sanación comienza cuando dejamos de pelear con lo que sentimos y empezamos a mirarlo desde la conciencia.',
  },
  {
    question: '¿Qué se requiere para participar?',
    answer: 'Lo más importante es venir por decisión propia, con apertura y disponibilidad para mirar hacia dentro. No hace falta tener todo claro ni saber explicar perfectamente lo que te ocurre. Basta con traer honestidad, presencia y el deseo sincero de comprender lo que estás viviendo. Este espacio requiere compromiso contigo, con tu proceso y con la verdad que se quiera revelar a través de tu experiencia.',
  },
  {
    question: '¿Qué método se utiliza?',
    answer: 'El acompañamiento no parte de una técnica cerrada ni de una metodología rígida. Cada sesión se abre desde la escucha, la conciencia y la necesidad real de la persona en ese momento. La mirada se orienta a discernir entre lo que eres y lo que has aprendido a creer de ti; entre tu naturaleza profunda y las capas de miedo, defensa, culpa o exigencia que se han ido construyendo con el tiempo. La conciencia es el centro del proceso. Desde ahí pueden surgir preguntas, silencios, comprensión, indagación emocional o una mirada más espiritual de la experiencia, siempre con el propósito de liberar aquello que ya no necesitas sostener.',
  },
  {
    question: '¿Qué puedo experimentar después de una consulta?',
    answer: 'Las emociones suelen ser una puerta muy importante. Nos muestran dónde está puesta la mente, qué creencias inconscientes están activas y qué heridas siguen pidiendo ser miradas. En lugar de intentar cambiar rápidamente lo que ocurre fuera, la consulta invita a revisar desde dónde estás percibiendo esa situación. Muchas veces buscamos paz cambiando las circunstancias externas, pero el verdadero cambio empieza cuando cambia la mirada interna. Al comprender lo que proyectamos, lo que interpretamos y lo que creemos ser, la experiencia externa puede empezar a vivirse de otra manera. No porque necesariamente todo cambie de inmediato fuera, sino porque algo esencial se recoloca dentro. La vida se transforma cuando dejamos de vernos como víctimas de lo que ocurre y empezamos a reconocer la conciencia que observa, comprende y despierta.',
  },
  {
    question: '¿Cuánto dura una consulta?',
    answer: 'La duración habitual de una consulta es de entre 60 y 75 minutos. Se recomienda venir sin prisas y, si es posible, reservar un tiempo tranquilo después de la sesión para integrar lo vivido. Lo ideal es no tener obligaciones importantes justo al terminar, para permitir que la comprensión, la emoción o el movimiento interno puedan asentarse con calma.',
  },
  { question: 'Precio de la consulta', answer: 'El precio de la consulta individual es de 50 €.' },
]
