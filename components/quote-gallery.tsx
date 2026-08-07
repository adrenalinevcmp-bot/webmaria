import Image from 'next/image'
import { galleryItems } from '@/lib/data'

export function QuoteGallery() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {galleryItems.map((item, i) => (
        <figure
          key={item.image}
          className={`group relative overflow-hidden rounded-sm bg-muted ${
            i === 0 ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2' : ''
          }`}
        >
          <div className={i === 0 ? 'aspect-[4/3] lg:aspect-square' : 'aspect-[4/3]'}>
            <Image
              src={item.image || '/placeholder.svg'}
              alt={`Imagen para la frase: ${item.quote}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent p-6">
            <figcaption className="font-serif text-lg leading-snug text-background text-balance md:text-xl">
              {item.quote}
            </figcaption>
          </div>
        </figure>
      ))}
    </div>
  )
}
