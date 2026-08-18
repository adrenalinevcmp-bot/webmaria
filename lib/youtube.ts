import type { VideoItem } from './data'

const CHANNEL_HANDLE = process.env.YOUTUBE_CHANNEL_HANDLE || '@mariaolid'
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || 'UCCKT2CfJS7ifYsDo8s2uYtw'
const CHANNEL_URL = `https://www.youtube.com/${CHANNEL_HANDLE}`
const CHANNEL_VIDEOS_URL = `https://www.youtube.com/channel/${CHANNEL_ID}/videos`
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`

const DEFAULT_PLAYLISTS = {
  interviews: 'PL9HycyjrHAk0ljDioNSyUUI7YP7I-8-oI',
  meditationsEs: 'PL9HycyjrHAk0v7j3MWRrs3WDbbzovhpcK',
  meditationsCa: 'PL9HycyjrHAk2IIBJVzA3Zzp8AahrJo5Gz',
  audiobooks: 'PL9HycyjrHAk10Od_hCorgb-B3B2W4PNxs',
}

const BROWSER_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131 Safari/537.36',
  'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
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

async function fetchText(url: string) {
  const response = await fetch(url, {
    headers: BROWSER_HEADERS,
    cache: 'no-store',
  })
  if (!response.ok) throw new Error(`YouTube respondió ${response.status}`)
  return response.text()
}

function parseRss(xml: string): VideoItem[] {
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

function firstVideoIdFromChannelHtml(html: string) {
  // En la pestaña /videos, YouTube renderiza los vídeos del canal de más reciente a más antiguo.
  // Priorizamos videoRenderer/gridVideoRenderer y dejamos un regex genérico como respaldo.
  return (
    html.match(/"videoRenderer":\{"videoId":"([\w-]{11})"/)?.[1] ||
    html.match(/"gridVideoRenderer":\{"videoId":"([\w-]{11})"/)?.[1] ||
    html.match(/"videoId":"([\w-]{11})"/)?.[1] ||
    ''
  )
}

async function hydrateVideo(id: string): Promise<VideoItem> {
  try {
    const response = await fetch(
      `https://www.youtube.com/oembed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${id}`)}&format=json`,
      { cache: 'no-store' },
    )
    if (!response.ok) throw new Error('oEmbed unavailable')
    const data = await response.json() as { title?: string; author_name?: string; thumbnail_url?: string }
    return {
      id,
      title: data.title || 'Vídeo de El Despertar',
      description: '',
      thumbnail: data.thumbnail_url || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      duration: '',
      date: 'Último contenido',
      href: `https://www.youtube.com/watch?v=${id}`,
    }
  } catch {
    return {
      id,
      title: 'Último vídeo de El Despertar',
      description: '',
      thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      duration: '',
      date: 'Último contenido',
      href: `https://www.youtube.com/watch?v=${id}`,
    }
  }
}

export async function getLatestChannelVideo(): Promise<VideoItem | null> {
  // 1) Feed RSS oficial del canal: no usa API key ni variables de Vercel.
  try {
    const xml = await fetchText(RSS_URL)
    const videos = parseRss(xml)
    if (videos[0]) return videos[0]
  } catch {
    // seguimos con HTML público
  }

  // 2) Página pública /videos por ID permanente del canal.
  for (const url of [CHANNEL_VIDEOS_URL, `${CHANNEL_URL}/videos`]) {
    try {
      const html = await fetchText(url)
      const id = firstVideoIdFromChannelHtml(html)
      if (id) return await hydrateVideo(id)
    } catch {
      // probar la siguiente fuente
    }
  }

  return null
}

async function getPlaylistRss(playlistId: string): Promise<VideoItem[]> {
  try {
    const xml = await fetchText(`https://www.youtube.com/feeds/videos.xml?playlist_id=${encodeURIComponent(playlistId)}`)
    return parseRss(xml)
  } catch {
    return []
  }
}

export async function getYoutubeFeed(playlistId?: string): Promise<VideoItem[]> {
  if (playlistId) return getPlaylistRss(playlistId)
  try {
    return parseRss(await fetchText(RSS_URL))
  } catch {
    const latest = await getLatestChannelVideo()
    return latest ? [latest] : []
  }
}

export async function getYoutubeVideosByIds(ids: string[]): Promise<VideoItem[]> {
  return Promise.all(ids.map(hydrateVideo))
}

export async function getYoutubeVideoById(id?: string): Promise<VideoItem | null> {
  if (!id) return null
  return hydrateVideo(id)
}

export async function getYoutubeContent() {
  const ids = {
    interviews: process.env.YOUTUBE_INTERVIEWS_PLAYLIST_ID || DEFAULT_PLAYLISTS.interviews,
    meditationsEs: process.env.YOUTUBE_MEDITATIONS_ES_PLAYLIST_ID || DEFAULT_PLAYLISTS.meditationsEs,
    meditationsCa: process.env.YOUTUBE_MEDITATIONS_CA_PLAYLIST_ID || DEFAULT_PLAYLISTS.meditationsCa,
    audiobooks: process.env.YOUTUBE_AUDIOBOOKS_PLAYLIST_ID || DEFAULT_PLAYLISTS.audiobooks,
    retreats: process.env.YOUTUBE_RETREATS_PLAYLIST_ID || '',
  }

  const [latest, interviews, meditationsEs, meditationsCa, audiobooks, retreats] = await Promise.all([
    getLatestChannelVideo(),
    getPlaylistRss(ids.interviews),
    getPlaylistRss(ids.meditationsEs),
    getPlaylistRss(ids.meditationsCa),
    getPlaylistRss(ids.audiobooks),
    ids.retreats ? getPlaylistRss(ids.retreats) : Promise.resolve([]),
  ])

  return {
    all: latest ? [latest] : [],
    latest,
    interviews,
    meditationsEs,
    meditationsCa,
    audiobooks,
    retreats,
  }
}
