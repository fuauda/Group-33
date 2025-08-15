"use client"

import { useState } from "react"
import Image from "next/image"

export default function ClientDetailCarousel({ images, title }) {
  const [current, setCurrent] = useState(0)
  const hasMultiple = images.length > 1

  const goPrev = () => setCurrent((p) => (p === 0 ? images.length - 1 : p - 1))
  const goNext = () => setCurrent((p) => (p === images.length - 1 ? 0 : p + 1))

  return (
    <div className="relative mt-10 w-full overflow-hidden rounded-2xl shadow-sm">
      <div className="relative aspect-[16/9] w-full">
        <div
          className="flex h-full w-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((src, idx) => (
            <div key={idx} className="relative h-full w-full shrink-0 grow-0 basis-full">
              <Image
                src={src}
                alt={`${title} image ${idx + 1}`}
                fill
                className="object-cover"
                sizes="100vw"
                priority={idx === 0}
              />
            </div>
          ))}
        </div>

        {hasMultiple && (
          <>
            <button
              aria-label="Previous image"
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white backdrop-blur-sm transition hover:bg-black/60 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                <path fillRule="evenodd" d="M15.78 5.22a.75.75 0 010 1.06L10.06 12l5.72 5.72a.75.75 0 11-1.06 1.06l-6.25-6.25a.75.75 0 010-1.06l6.25-6.25a.75.75 0 011.06 0z" clipRule="evenodd" />
              </svg>
            </button>

            <button
              aria-label="Next image"
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white backdrop-blur-sm transition hover:bg-black/60 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                <path fillRule="evenodd" d="M8.22 18.78a.75.75 0 010-1.06L13.94 12 8.22 6.28a.75.75 0 011.06-1.06l6.25 6.25a.75.75 0 010 1.06l-6.25 6.25a.75.75 0 01-1.06 0z" clipRule="evenodd" />
              </svg>
            </button>

            <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={
                    "h-2 w-2 rounded-full transition-all " +
                    (i === current ? "bg-white/90 w-4" : "bg-white/50")
                  }
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}


