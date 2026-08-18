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
  id: '7yyha0L1FDY',
  title: 'A LESSON in LOVE | DORA GIL',
  description: 'Último contenido del canal El Despertar.',
  thumbnail: 'https://i.ytimg.com/vi/7yyha0L1FDY/hqdefault.jpg',
  duration: '',
  date: 'Último contenido disponible',
  href: 'https://www.youtube.com/watch?v=7yyha0L1FDY',
}

export const previousInterviews: VideoItem[] = [
  {
    id: 'prev-1',
    title: 'Entrevista anterior',
    description: 'Contenido de respaldo mientras se conecta la playlist de entrevistas.',
    thumbnail: '/images/REEMPLAZAR-respaldo-video-entrevista-01.png',
    duration: '',
    date: 'Archivo',
    href: 'https://www.youtube.com/@mariaolid',
  },
  {
    id: 'prev-2',
    title: 'Entrevista del archivo',
    description: 'Contenido de respaldo mientras se conecta la playlist de entrevistas.',
    thumbnail: '/images/REEMPLAZAR-respaldo-video-entrevista-02.png',
    duration: '',
    date: 'Archivo',
    href: 'https://www.youtube.com/@mariaolid',
  },
]

export const DEEPENING_VIDEO_IDS = [
  'U03rxJJt5p4',
  'TsLISNp5FhE',
  'bIvkCRVOnqs',
  'ELPK5AA7Epw',
  'jMi5r7K2DQM',
]

export const MEDITATION_ES_VIDEO_IDS = [
  'l5l-q-m_5iQ',
  'oLnOtb766ow',
  'LBqjk2hZnIk',
  'd8x82zo4AV8',
  '3reM-aPW4AU',
  '_9mEMZJlH-8',
  '4vuOl5WJ_XA',
  'ygjCVb0mURs',
  '0006X14bPyE',
  '6676RZILFGo',
  'UfF0JTr1ygw',
  'OL7rYjzFob4',
]

export const MEDITATION_CA_VIDEO_IDS = [
  'ZZNtMh0iRIc',
  'imVkMAQ_1YA',
  'ym93FpHhS_g',
  'T_lqkdgf1Lo',
  'xx7K9cewXDw',
]

export type Meditation = {
  id: string
  title: string
  description: string
  thumbnail: string
  duration?: string
  href?: string
}

export const meditationsEs: Meditation[] = MEDITATION_ES_VIDEO_IDS.map((id, index) => ({
  id,
  title: `Meditación guiada ${index + 1}`,
  description: '',
  thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
  href: `https://www.youtube.com/watch?v=${id}`,
}))

export const meditationsCa: Meditation[] = MEDITATION_CA_VIDEO_IDS.map((id, index) => ({
  id,
  title: `Meditación en catalán ${index + 1}`,
  description: '',
  thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
  href: `https://www.youtube.com/watch?v=${id}`,
}))

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
    description: 'Encuentro mensual. Empieza el 1 de octubre. El primer jueves de cada mes, de 19:30 a 21:30. Compartir desde el Ser.',
    meta: 'Encuentro mensual · Primer jueves de mes · 19:30–21:30',
    price: 'Trimestre: 60 €',
    image: '/images/evento-experimento-rendicion-octubre-2026.png',
  },
  {
    id: 'ev-2',
    title: 'Próximo retiro del Despertar',
    description: 'Conciencia y Ego · con Nuria Guinart y María Olid. Delta del Ebro · Hotel Carlos III, Alcanar · 14 y 15 de noviembre de 2026.',
    meta: 'Retiro · 14 y 15 de noviembre de 2026',
    image: '/images/evento-retiro-despertar-noviembre-2026.png',
  },
]

export const galleryItems: { image: string; quote: string }[] = [
  { image: '/images/contemplacion-01-muelle.png', quote: 'El mayor misterio de la existencia es la existencia misma.' },
  { image: '/images/contemplacion-02-olas.png', quote: 'Eres alquimia, puedes transformar el dolor en amor.' },
  { image: '/images/contemplacion-03-luz-agua.png', quote: 'Lo que niegas te ata, lo que aceptas te transforma.' },
  { image: '/images/contemplacion-04-acantilados.png', quote: 'Puedes renacer a tu luz, siendo honesta con lo que sientes.' },
  { image: '/images/contemplacion-05-mar-calmo.png', quote: 'El apego te separa de lo Real.' },
]

export const tutoriaFaq: { question: string; answer: string }[] = [
  {
    question: '¿En qué consiste la consulta individual?',
    answer: 'La consulta individual es un espacio de acompañamiento y claridad interior. Su propósito es ayudarte a mirar con honestidad aquello que en este momento está generando conflicto, sufrimiento, bloqueo o confusión en tu vida. A través de la situación concreta que estés viviendo, se abre la posibilidad de reconocer los pensamientos, creencias, emociones y mecanismos internos que sostienen el malestar. No se trata únicamente de resolver algo externo, sino de comprender qué está mostrando esa experiencia y qué parte de ti está siendo llamada a ser vista con más conciencia. Las sesiones individuales se realizan de forma online, mediante Zoom. Para poder participar, solo necesitas disponer de cámara, micrófono y una conexión a internet estable, en un espacio tranquilo donde puedas estar presente y sin interrupciones. El sentido profundo de este encuentro es facilitar un regreso a la Paz, soltando progresivamente las interpretaciones, defensas y formas de identificación que nos alejan de nuestra verdadera naturaleza.',
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
    answer: 'La duración habitual de una consulta es de entre 60 y 75 minutos. Se recomienda venir sin prisas y, si es posible, reservar un tiempo tranquilo después de la sesión para integrar lo vivido.',
  },
  { question: 'Precio de la consulta', answer: 'El precio de la consulta individual es de 50 €.' },
]
