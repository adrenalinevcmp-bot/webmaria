import type { VideoItem } from './data'

const CHANNEL_HANDLE = process.env.YOUTUBE_CHANNEL_HANDLE || '@mariaolid'
const CHANNEL_URL = process.env.YOUTUBE_CHANNEL_URL || `https://www.youtube.com/${CHANNEL_HANDLE}`
const CACHE_SECONDS = 900

// Playlists oficiales proporcionadas por María. Las variables de entorno pueden
// reemplazarlas sin necesidad de modificar el código.
const DEFAULT_PLAYLISTS = {
  interviews: 'PL9HycyjrHAk0ljDioNSyUUI7YP7I-8-oI',
  meditationsEs: 'PL9HycyjrHAk0v7j3MWRrs3WDbbzovhpcK',
  meditationsCa: 'PL9HycyjrHAk2IIBJVzA3Zzp8AahrJo5Gz',
  audiobooks: 'PL9HycyjrHAk10Od_hCorgb-B3B2W4PNxs',
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

async function resolveChannelId() {
  if (process.env.YOUTUBE_CHANNEL_ID) return process.env.YOUTUBE_CHANNEL_ID
  try {
    const html = await fetch(CHANNEL_URL, { next: { revalidate: 86400 } }).then((r) => r.text())
    return html.match(/"channelId":"(UC[^"]+)"/)?.[1] || html.match(/channel\/((?:UC)[\w-]+)/)?.[1] || ''
  } catch {
    return ''
  }
}

export async function getYoutubeFeed(playlistId?: string): Promise<VideoItem[]> {
  try {
    const channelId = playlistId ? '' : await resolveChannelId()
    const id = playlistId || channelId
    if (!id) return []
    const param = playlistId ? `playlist_id=${encodeURIComponent(id)}` : `channel_id=${encodeURIComponent(id)}`
    const xml = await fetch(`https://www.youtube.com/feeds/videos.xml?${param}`, {
      next: { revalidate: CACHE_SECONDS },
    }).then((r) => {
      if (!r.ok) throw new Error('YouTube feed unavailable')
      return r.text()
    })

    return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map((match) => {
      const entry = match[1]
      const id = text(entry, 'yt:videoId')
      const publishedAt = text(entry, 'published')
      return {
        id,
        title: text(entry, 'title'),
        description: text(entry, 'media:description') || 'Vídeo publicado en El Despertar.',
        thumbnail: attr(entry, 'media:thumbnail', 'url') || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        duration: '',
        date: publishedAt ? new Intl.DateTimeFormat('es-ES', { dateStyle: 'long' }).format(new Date(publishedAt)) : '',
        publishedAt,
        href: `https://www.youtube.com/watch?v=${id}`,
      }
    })
  } catch {
    return []
  }
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
