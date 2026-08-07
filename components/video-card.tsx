import Image from 'next/image'
import { Play } from 'lucide-react'
import type { VideoItem } from '@/lib/data'
import { cn } from '@/lib/utils'

export function VideoCard({
  video,
  className,
  priority = false,
}: {
  video: VideoItem
  className?: string
  priority?: boolean
}) {
  return (
    <a
      href={video.href}
      className={cn('group flex flex-col', className)}
      aria-label={`Ver vídeo: ${video.title}`}
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-sm bg-muted">
        <Image
          src={video.thumbnail || '/placeholder.svg'}
          alt={video.title}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-foreground/10 transition-colors group-hover:bg-foreground/20" />
        {video.duration && <span className="absolute bottom-3 right-3 rounded-sm bg-background/85 px-2 py-0.5 text-xs font-medium text-foreground">{video.duration}</span>}
        <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-background/85 text-primary transition-transform duration-300 group-hover:scale-110">
          <Play className="h-5 w-5 translate-x-0.5 fill-current" />
        </span>
      </div>
      <div className="mt-4 flex flex-col gap-1.5">
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {video.date}
        </span>
        <h3 className="font-serif text-xl font-medium leading-snug text-foreground text-pretty transition-colors group-hover:text-primary">
          {video.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
          {video.description}
        </p>
      </div>
    </a>
  )
}
