'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Play } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { VideoItem } from '@/lib/data'

const HARD_FALLBACK: VideoItem = {
  id: '7yyha0L1FDY',
  title: 'Una LECCIÓN de AMOR | DORA GIL',
  description: '',
  thumbnail: 'https://i.ytimg.com/vi/7yyha0L1FDY/hqdefault.jpg',
  duration: '',
  date: 'Último contenido',
  href: 'https://www.youtube.com/watch?v=7yyha0L1FDY',
}

type ApiResponse = { ok?: boolean; video?: VideoItem | null }

function useLatestVideo(initial?: VideoItem) {
  const [video, setVideo] = useState<VideoItem>(initial?.id ? initial : HARD_FALLBACK)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        const response = await fetch(`/api/youtube/latest?t=${Date.now()}`, {
          cache: 'no-store',
          headers: { Accept: 'application/json' },
        })
        if (!response.ok) return
        const data = (await response.json()) as ApiResponse
        if (!cancelled && data.ok && data.video?.id && data.video.href) {
          setVideo(data.video)
        }
      } catch {
        // Mantener respaldo directo al último vídeo conocido. Nunca enlazar al canal.
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  return video
}

export function LatestVideoButton({ initial }: { initial?: VideoItem }) {
  const video = useLatestVideo(initial)
  return (
    <a
      href={video.href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-90"
    >
      <Play className="h-4 w-4 fill-current" /> Ver último vídeo
    </a>
  )
}

function shortDescription(description: string) {
  const marker = 'nuestra conexión con la vida'
  const lower = description.toLowerCase()
  const index = lower.indexOf(marker)
  if (index >= 0) {
    const end = index + marker.length
    const cut = description.slice(0, end).trim()
    return /[.!?]$/.test(cut) ? cut : `${cut}.`
  }
  return description
}

export function LatestVideoSection({ initial }: { initial?: VideoItem }) {
  const video = useLatestVideo(initial)
  const description = shortDescription(video.description || '')

  return (
    <section className="border-y border-primary/15 bg-secondary/75">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-5 py-10 md:px-8 md:py-12 lg:grid-cols-[1.2fr_1fr]">
        <a
          href={video.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block aspect-video overflow-hidden rounded-sm bg-muted"
          aria-label={`Ver vídeo: ${video.title}`}
        >
          <Image
            src={video.thumbnail || HARD_FALLBACK.thumbnail}
            alt={video.title}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            unoptimized
          />
          <div className="absolute inset-0 bg-foreground/15 transition-colors group-hover:bg-foreground/25" />
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 text-primary shadow-sm transition-transform duration-300 group-hover:scale-110">
            <Play className="h-6 w-6 translate-x-0.5 fill-current" />
          </span>
        </a>
        <div className="flex flex-col gap-4">
          <span className="text-xs uppercase tracking-[0.35em] text-primary">Último vídeo · {video.date || 'Último contenido'}</span>
          <h2 className="font-serif text-3xl font-medium leading-tight text-foreground text-balance">{video.title}</h2>
          {description ? (
            <p className="line-clamp-[10] text-base leading-relaxed text-muted-foreground text-pretty">{description}</p>
          ) : null}
          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href={video.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-sm border border-primary/35 bg-background px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Play className="h-4 w-4 fill-current" /> Ver vídeo
            </a>
            <Link
              href="/youtube"
              className="inline-flex w-fit items-center rounded-sm bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-90"
            >
              Ver todas las entrevistas
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
