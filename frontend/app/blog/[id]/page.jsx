import { notFound } from "next/navigation"
import Link from "next/link"
import { blogs, getBlogById } from "../data"
import { Button } from "../../../components/ui/button"
import ClientDetailCarousel from "./carousel.client"

export async function generateStaticParams() {
  return blogs.map((b) => ({ id: String(b.id) }))
}

export const dynamicParams = false

// Intentionally omit metadata to avoid client/server typing warnings in JS

export default function BlogDetailPage({ params }) {
  const blog = getBlogById(params.id)
  if (!blog) return notFound()

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-4">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          ← Back to all posts
        </Link>
      </div>

      {Array.isArray(blog.tags) && blog.tags.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {blog.tags.map((t, i) => (
            <span key={i} className="rounded-full border px-2 py-0.5 text-xs text-muted-foreground">
              {t}
            </span>
          ))}
        </div>
      )}

      <h1 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">
        {blog.title}
      </h1>
      <div className="mb-6 flex items-center gap-3 text-xs text-muted-foreground">
        {blog.author && <span>{blog.author}</span>}
        {blog.publishedAt && <span>• {new Date(blog.publishedAt).toLocaleDateString()}</span>}
        <span>• 4 min read</span>
      </div>

      <div className="mb-8">
        <ClientDetailCarousel images={blog.images} title={blog.title} />
      </div>

      <article className="prose max-w-none dark:prose-invert">
        <p className="text-base leading-7 text-foreground/90">
          {blog.fullDescription}
        </p>
      </article>
    </main>
  )
}



