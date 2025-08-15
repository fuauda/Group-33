import { blogs } from "./data"
import BlogGrid from "./BlogGrid"

export default function BlogPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="mb-8">
        <a className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground" href="/">← Back to Home</a>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">CommunityConnect Blog</h1>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Stories and product updates that help citizens, NGOs, donors, and volunteers create measurable social impact.
        </p>
      </section>

      <section>
        <BlogGrid blogs={blogs} />
      </section>
    </main>
  )
}


