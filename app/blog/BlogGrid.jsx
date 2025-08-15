"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import Link from "next/link"

function BlogCard({ id, title, shortDescription, images, tags = [], author, publishedAt }) {
  const [current, setCurrent] = useState(0)
  const hasMultiple = images.length > 1

  const goPrev = () => setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  const goNext = () => setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1))

  return (
    <Card className="group h-full overflow-hidden rounded-xl shadow-sm transition hover:shadow-md hover:-translate-y-0.5">
      <div className="relative w-full overflow-hidden">
        <div className="relative w-full aspect-[16/9]">
          <div
            className="flex h-full w-full transition-transform duration-300"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {images.map((src, idx) => (
              <div key={idx} className="relative h-full w-full shrink-0 grow-0 basis-full">
                <Image
                  src={src}
                  alt={`${title} image ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition hover:bg-black/60 focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path fillRule="evenodd" d="M15.78 5.22a.75.75 0 010 1.06L10.06 12l5.72 5.72a.75.75 0 11-1.06 1.06l-6.25-6.25a.75.75 0 010-1.06l6.25-6.25a.75.75 0 011.06 0z" clipRule="evenodd" />
                </svg>
              </button>

              <button
                aria-label="Next image"
                onClick={goNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition hover:bg-black/60 focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path fillRule="evenodd" d="M8.22 18.78a.75.75 0 010-1.06L13.94 12 8.22 6.28a.75.75 0 011.06-1.06l6.25 6.25a.75.75 0 010 1.06l-6.25 6.25a.75.75 0 01-1.06 0z" clipRule="evenodd" />
                </svg>
              </button>
            </>
          )}

          {hasMultiple && (
            <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={
                    "h-1.5 w-1.5 rounded-full transition-all " +
                    (i === current ? "bg-white/90 w-3" : "bg-white/50")
                  }
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <CardHeader className="space-y-3">
        {Array.isArray(tags) && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((t, i) => (
              <span key={i} className="rounded-full border px-2 py-0.5 text-xs text-muted-foreground">
                {t}
              </span>
            ))}
          </div>
        )}
        <CardTitle className="text-lg sm:text-xl">{title}</CardTitle>
        <CardDescription className="text-sm">{shortDescription}</CardDescription>
        <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
          {author && <span>{author}</span>}
          {publishedAt && <span>• {new Date(publishedAt).toLocaleDateString()}</span>}
          <span>• 4 min read</span>
        </div>
      </CardHeader>
      <CardFooter className="flex items-center justify-between">
        <Link href={`/blog/${id}`} className="w-full">
          <Button variant="outline" className="w-full">See details</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default function BlogGrid({ blogs }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {blogs.map((b) => (
        <BlogCard key={b.id} {...b} />
      ))}
    </div>
  )
}


