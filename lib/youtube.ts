import type { VideoItem } from './data'

const CHANNEL_HANDLE = process.env.YOUTUBE_CHANNEL_HANDLE || '@mariaolid'
const CHANNEL_URL = process.env.YOUTUBE_CHANNEL_URL || `https://www.youtube.com/${CHANNEL_HANDLE}`
const CACHE_SECONDS = 900

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

async function youtubeApi<T>(path: string): Promise<T | null> {
  const key = process.env.YOUTUBE_API_KEY
  if (!key) return null
  try {
    const separator = path.includes('?') ? '&' : '?'
    const response = await fetch(`https://www.googleapis.com/youtube/v3/${path}${separator}key=${encodeURIComponent(key)}`, {
      next: { revalidate: CACHE_SECONDS },
    })
    if (!response.ok) return null
    return await response.json() as T
  } catch {
    return null
  }
}

async function getChannelIdFromApi() {
  if (process.env.YOUTUBE_CHANNEL_ID) return process.env.YOUTUBE_CHANNEL_ID
  const data = await youtubeApi<{ items?: Array<{ id?: string }> }>(
    `channels?part=id&forHandle=${encodeURIComponent(CHANNEL_HANDLE)}`,
  )
  return data?.items?.[0]?.id || ''
}

async function getUploadsPlaylistId() {
  const channelId = await getChannelIdFromApi()
  if (!channelId) return ''
  const data = await youtubeApi<{ items?: Array<{ contentDetails?: { relatedPlaylists?: { uploads?: string } } }> }>(
    `channels?part=contentDetails&id=${encodeURIComponent(channelId)}`,
  )
  return data?.items?.[0]?.contentDetails?.relatedPlaylists?.uploads || ''
}

async function getPlaylistViaApi(playlistId: string): Promise<VideoItem[]> {
  const data = await youtubeApi<{
    items?: Array<{
      snippet?: {
        title?: string
        description?: string
        publishedAt?: string
        thumbnails?: { maxres?: { url?: string }; high?: { url?: string }; medium?: { url?: string }; default?: { url?: string } }
        resourceId?: { videoId?: string }
      }
      contentDetails?: { videoId?: string; videoPublishedAt?: string }
    }>
  }>(`playlistItems?part=snippet,contentDetails&playlistId=${encodeURIComponent(playlistId)}&maxResults=50`)

  if (!data?.items?.length) return []
  return sortNewest(data.items.flatMap((item) => {
    const id = item.contentDetails?.videoId || item.snippet?.resourceId?.videoId || ''
    if (!id) return []
    const publishedAt = item.contentDetails?.videoPublishedAt || item.snippet?.publishedAt || ''
    const thumb = item.snippet?.thumbnails
    return [{
      id,
      title: item.snippet?.title || 'Vídeo de El Despertar',
      description: item.snippet?.description || '',
      thumbnail: thumb?.maxres?.url || thumb?.high?.url || thumb?.medium?.url || thumb?.default?.url || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      duration: '',
      date: formatDate(publishedAt),
      publishedAt,
      href: `https://www.youtube.com/watch?v=${id}`,
    } satisfies VideoItem]
  }))
}

async function resolveChannelIdFromHtml() {
  if (process.env.YOUTUBE_CHANNEL_ID) return process.env.YOUTUBE_CHANNEL_ID
  try {
    const html = await fetch(CHANNEL_URL, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      next: { revalidate: 86400 },
    }).then((r) => r.text())
    return html.match(/"channelId":"(UC[^"]+)"/)?.[1] || html.match(/channel\/((?:UC)[\w-]+)/)?.[1] || ''
  } catch {
    return ''
  }
}

export async function getYoutubeFeed(playlistId?: string): Promise<VideoItem[]> {
  // API oficial primero: es más fiable en Vercel que raspar HTML/RSS.
  if (process.env.YOUTUBE_API_KEY) {
    const actualPlaylist = playlistId || await getUploadsPlaylistId()
    if (actualPlaylist) {
      const apiVideos = await getPlaylistViaApi(actualPlaylist)
      if (apiVideos.length) return apiVideos
    }
  }

  // Respaldo sin API key mediante RSS.
  try {
    const channelId = playlistId ? '' : await resolveChannelIdFromHtml()
    const id = playlistId || channelId
    if (!id) return []
    const param = playlistId ? `playlist_id=${encodeURIComponent(id)}` : `channel_id=${encodeURIComponent(id)}`
    const xml = await fetch(`https://www.youtube.com/feeds/videos.xml?${param}`, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      next: { revalidate: CACHE_SECONDS },
    }).then((r) => {
      if (!r.ok) throw new Error('YouTube feed unavailable')
      return r.text()
    })

    const videos = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map((match) => {
      const entry = match[1]
      const id = text(entry, 'yt:videoId')
      const publishedAt = text(entry, 'published')
      return {
        id,
        title: text(entry, 'title'),
        description: text(entry, 'media:description') || '',
        thumbnail: attr(entry, 'media:thumbnail', 'url') || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        duration: '',
        date: formatDate(publishedAt),
        publishedAt,
        href: `https://www.youtube.com/watch?v=${id}`,
      } satisfies VideoItem
    })
    return sortNewest(videos)
  } catch {
    return []
  }
}

export async function getYoutubeVideosByIds(ids: string[]): Promise<VideoItem[]> {
  const results = await Promise.all(ids.map(async (id) => {
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
  return results
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
