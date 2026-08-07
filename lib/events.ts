import { upcomingEvents as fallbackEvents, type EventItem } from './data'

export async function getUpcomingEvents(): Promise<EventItem[]> {
  const url = process.env.EVENTS_JSON_URL
  if (!url) return fallbackEvents
  try {
    const response = await fetch(url, { next: { revalidate: 300 } })
    if (!response.ok) throw new Error('Events source unavailable')
    const items = await response.json() as Array<EventItem & { startDate?: string; published?: boolean }>
    const now = Date.now()
    return items
      .filter((item) => item.published !== false && (!item.startDate || new Date(item.startDate).getTime() >= now))
      .sort((a, b) => new Date(a.startDate || '2999-01-01').getTime() - new Date(b.startDate || '2999-01-01').getTime())
  } catch {
    return fallbackEvents
  }
}
