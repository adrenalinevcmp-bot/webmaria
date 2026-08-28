import { upcomingEvents as fallbackEvents, type EventItem } from './data'
import { getCms } from './cms'
export async function getUpcomingEvents(): Promise<EventItem[]> {
  const cmsEvents = await getCms<EventItem[]>('agenda.events', fallbackEvents)
  // El panel puede sobrescribir eventos existentes, pero no debe hacer desaparecer los eventos base
  // si por error solo se ha guardado uno. Se combinan por ID y el contenido del panel tiene prioridad.
  if (Array.isArray(cmsEvents) && cmsEvents.length > 0) {
    const byId = new Map(fallbackEvents.map((event) => [event.id, event]))
    for (const event of cmsEvents) byId.set(event.id, { ...byId.get(event.id), ...event })
    return Array.from(byId.values())
  }
  const url = process.env.EVENTS_JSON_URL
  if (!url) return cmsEvents
  try {
    const response = await fetch(url, { cache: 'no-store' })
    if (!response.ok) throw new Error('Events source unavailable')
    const items = await response.json() as Array<EventItem & { startDate?: string; published?: boolean }>
    const now = Date.now()
    return items.filter((item) => item.published !== false && (!item.startDate || new Date(item.startDate).getTime() >= now))
      .sort((a,b)=>new Date(a.startDate||'2999-01-01').getTime()-new Date(b.startDate||'2999-01-01').getTime())
  } catch { return cmsEvents }
}
