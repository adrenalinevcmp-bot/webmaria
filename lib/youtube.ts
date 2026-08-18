import type { VideoItem } from './data'

// Identificadores públicos y permanentes del canal de María Olid.
// No requieren API key ni variables de entorno en Vercel.
const CHANNEL_ID = 'UCCKT2CfJS7ifYsDo8s2uYtw'
const UPLOADS_PLAYLIST_ID = 'UUCKT2CfJS7ifYsDo8s2uYtw'
const CACHE_SECONDS = 300

const DEFAULT_PLAYLISTS = {
  interviews: 'PL9HycyjrHAk0ljDioNSyUUI7YP7I-8-oI',
  meditationsEs: 'PL9HycyjrHAk0v7j3MWRrs3WDbbzovhpcK',
  meditationsCa: 'PL9HycyjrHAk2IIBJVzA3Zzp8AahrJo5Gz',
  audiobooks: 'PL9HycyjrHAk10Od_hCorgb-B3B2W4PNxs',
}

function formatDate(value?: string) {
  if (!value) return ''
  try {
    return new Intl.DateTimeFormat('es-ES', { dateStyle: 'long' }).format(new Date(value))
  } catch {
    return ''
  }
}

function sortNewest(videos: VideoItem[]) {
  return [...videos].sort((a, b) => {
    const aTime = a.publishedAt ? new Date(a.publishedAt).getTime() : 0
    const bTime = b.publishedAt ? new Date(b.publishedAt).getTime() : 0
    return bTime - aTime
  })
}

function decodeXml(value: string) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
}

function text(entry: string, tag: string) {
  const match = entry.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`))
  return match ? decodeXml(match[1].replace(/^<!\[CDATA\[|\]\]>$/g, '').trim()) : ''
}

function attr(entry: string, tag: string, name: string) {
  const match = entry.match(new RegExp(`<${tag}[^>]*${name}="([^"]+)"[^>]*>`))
  return match ? decodeXml(match[1]) : ''
}

function parseFeed(xml: string): VideoItem[] {
  const videos = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].flatMap((match) => {
    const entry = match[1]
    const id = text(entry, 'yt:videoId')
    if (!id) return []
    const publishedAt = text(entry, 'published')

    return [{
      id,
      title: text(entry, 'title') || 'Vídeo de El Despertar',
      description: text(entry, 'media:description') || '',
      thumbnail: attr(entry, 'media:thumbnail', 'url') || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      duration: '',
      date: formatDate(publishedAt),
      publishedAt,
      href: `https://www.youtube.com/watch?v=${id}`,
    } satisfies VideoItem]
  })

  return sortNewest(videos)
}

async function fetchRss(url: string): Promise<VideoItem[]> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ElDespertarWebsite/1.0)',
        Accept: 'application/atom+xml,application/xml,text/xml,*/*',
      },
      next: { revalidate: CACHE_SECONDS },
    })

    if (!response.ok) return []
    return parseFeed(await response.text())
  } catch (error) {
    console.error('No se pudo cargar el feed público de YouTube', error)
    return []
  }
}

/**
 * Obtiene vídeos públicos de YouTube sin API key.
 * - Sin playlistId: usa el feed del canal y, si hiciera falta, la playlist
 *   pública de subidas del canal como segundo intento.
 * - Con playlistId: usa directamente el feed RSS de esa playlist.
 *
 * YouTube devuelve un feed limitado a los contenidos recientes, que es justo
 * lo que necesitamos para "Último vídeo" y las secciones de contenido reciente.
 */
export async function getYoutubeFeed(playlistId?: string): Promise<VideoItem[]> {
  if (playlistId) {
    return fetchRss(`https://www.youtube.com/feeds/videos.xml?playlist_id=${encodeURIComponent(playlistId)}`)
  }

  const channelVideos = await fetchRss(
    `https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(CHANNEL_ID)}`,
  )
  if (channelVideos.length) return channelVideos

  // Segundo intento sin ninguna credencial: playlist automática "Uploads".
  return fetchRss(
    `https://www.youtube.com/feeds/videos.xml?playlist_id=${encodeURIComponent(UPLOADS_PLAYLIST_ID)}`,
  )
}

export async function getYoutubeVideosByIds(ids: string[]): Promise<VideoItem[]> {
  return Promise.all(ids.map(async (id) => {
    try {
      const response = await fetch(
        `https://www.youtube.com/oembed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${id}`)}&format=json`,
        { next: { revalidate: 86400 } },
      )
      if (!response.ok) throw new Error('oEmbed unavailable')
      const data = await response.json() as { title?: string; author_name?: string; thumbnail_url?: string }
      return {
        id,
        title: data.title || 'Vídeo de El Despertar',
        description: data.author_name || 'El Despertar',
        thumbnail: data.thumbnail_url || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        duration: '',
        date: '',
        href: `https://www.youtube.com/watch?v=${id}`,
      } satisfies VideoItem
    } catch {
      return {
        id,
        title: 'Vídeo de El Despertar',
        description: 'El Despertar',
        thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        duration: '',
        date: '',
        href: `https://www.youtube.com/watch?v=${id}`,
      } satisfies VideoItem
    }
  }))
}

export async function getYoutubeVideoById(id?: string): Promise<VideoItem | null> {
  if (!id) return null
  return (await getYoutubeVideosByIds([id]))[0] || null
}

export async function getYoutubeContent() {
  const ids = {
    interviews: process.env.YOUTUBE_INTERVIEWS_PLAYLIST_ID || DEFAULT_PLAYLISTS.interviews,
    meditationsEs: process.env.YOUTUBE_MEDITATIONS_ES_PLAYLIST_ID || DEFAULT_PLAYLISTS.meditationsEs,
    meditationsCa: process.env.YOUTUBE_MEDITATIONS_CA_PLAYLIST_ID || DEFAULT_PLAYLISTS.meditationsCa,
    audiobooks: process.env.YOUTUBE_AUDIOBOOKS_PLAYLIST_ID || DEFAULT_PLAYLISTS.audiobooks,
    retreats: process.env.YOUTUBE_RETREATS_PLAYLIST_ID || '',
  }

  const [all, interviews, meditationsEs, meditationsCa, audiobooks, retreats] = await Promise.all([
    getYoutubeFeed(),
    getYoutubeFeed(ids.interviews),
    getYoutubeFeed(ids.meditationsEs),
    getYoutubeFeed(ids.meditationsCa),
    getYoutubeFeed(ids.audiobooks),
    ids.retreats ? getYoutubeFeed(ids.retreats) : Promise.resolve([]),
  ])

  return {
    all,
    interviews: interviews.length ? interviews : all,
    meditationsEs,
    meditationsCa,
    audiobooks,
    retreats,
  }
}
