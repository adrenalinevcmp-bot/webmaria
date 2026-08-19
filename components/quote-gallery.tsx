'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { galleryItems as fallbackItems } from '@/lib/data'

export function QuoteGallery({ items = fallbackItems }: { items?: { image:string; quote:string }[] }) {
  const galleryItems = items?.length ? items : fallbackItems
  const [index, setIndex] = useState(0)
  const item = galleryItems[index]

  const prev = () => setIndex((current) => (current - 1 + galleryItems.length) % galleryItems.length)
  const next = () => setIndex((current) => (current + 1) % galleryItems.length)

  return (
    <div className="mx-auto max-w-5xl">
      <figure className="group relative overflow-hidden rounded-sm bg-muted shadow-sm">
        <div className="relative aspect-[4/5] min-h-[500px] sm:aspect-[16/10] sm:min-h-[430px] md:min-h-[540px]">
          <Image
            key={item.image}
            src={item.image || '/placeholder.svg'}
            alt={`Imagen para la frase: ${item.quote}`}
            fill
            sizes="(max-width: 1024px) 100vw, 1000px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/5" />
          <figcaption className="absolute inset-x-12 bottom-7 z-10 mx-auto max-w-3xl text-center font-serif text-[1.65rem] leading-[1.15] text-white text-balance sm:inset-x-16 sm:bottom-9 sm:text-3xl md:bottom-12 md:text-4xl">
            {item.quote}
          </figcaption>
          <button
            type="button"
            onClick={prev}
            aria-label="Ver contemplación anterior"
            className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm transition-transform hover:scale-105 sm:left-5 md:h-11 md:w-11"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Ver siguiente contemplación"
            className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm transition-transform hover:scale-105 sm:right-5 md:h-11 md:w-11"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </figure>
      <div className="mt-5 flex items-center justify-center gap-2" aria-label="Selector de contemplaciones">
        {galleryItems.map((galleryItem, i) => (
          <button
            key={galleryItem.image}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Ver imagen ${i + 1}`}
            aria-current={i === index ? 'true' : undefined}
            className={`h-2.5 rounded-full transition-all ${i === index ? 'w-8 bg-primary' : 'w-2.5 bg-border hover:bg-muted-foreground/50'}`}
          />
        ))}
      </div>
    </div>
  )
}
