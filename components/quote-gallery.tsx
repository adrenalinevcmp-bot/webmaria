'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { galleryItems } from '@/lib/data'

export function QuoteGallery() {
  const [index, setIndex] = useState(0)
  const item = galleryItems[index]

  const prev = () => setIndex((current) => (current - 1 + galleryItems.length) % galleryItems.length)
  const next = () => setIndex((current) => (current + 1) % galleryItems.length)

  return (
    <div className="mx-auto max-w-5xl">
      <figure className="group relative overflow-hidden rounded-sm bg-muted">
        <div className="relative aspect-[16/9] min-h-[360px] md:min-h-[520px]">
          <Image
            key={item.image}
            src={item.image || '/placeholder.svg'}
            alt={`Imagen para la frase: ${item.quote}`}
            fill
            sizes="(max-width: 1024px) 100vw, 1000px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/5" />
          <figcaption className="absolute inset-x-0 bottom-0 p-7 text-center font-serif text-2xl leading-snug text-white text-balance md:p-12 md:text-4xl">
            {item.quote}
          </figcaption>
          <button
            type="button"
            onClick={prev}
            aria-label="Ver contemplación anterior"
            className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-background/85 text-foreground shadow-sm transition-transform hover:scale-105 md:left-6"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Ver siguiente contemplación"
            className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-background/85 text-foreground shadow-sm transition-transform hover:scale-105 md:right-6"
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
