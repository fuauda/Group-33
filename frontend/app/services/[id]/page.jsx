import Link from "next/link"
import Image from "next/image"
import { services, getServiceById, getServiceBySlug } from "../data"
import { Button } from "../../../components/ui/button"
import { use } from "react"

export async function generateStaticParams() {
  // Use slugs for cleaner URLs
  return services.map((s) => ({ id: String(s.slug) }))
}

export default function ServiceDetailPage({ params }) {
  // Unwrap params per Next.js guidance
  const resolved = use(Promise.resolve(params))
  const service = getServiceById(resolved.id) || getServiceBySlug(resolved.id)

  if (!service) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <Link href="/" className="text-sm text-muted-foreground">← Back</Link>
        <h1 className="mt-4 text-2xl font-semibold">Service not found</h1>
      </main>
    )
  }

  const isCivic = service.slug === "civic-issue-reporter"

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-4">
        <Link href="/">
          <Button variant="outline" className="inline-flex items-center gap-2">
            ← Back
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
          <Image src={service.heroImage} alt={service.title} fill className="object-cover" />
        </div>
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">About This Service</h1>
          <p className="mt-3 text-sm leading-6 text-foreground/90">{service.about}</p>
          <p className="mt-3 text-sm leading-6 text-foreground/90">{service.details}</p>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="mb-4 text-center text-lg font-semibold">Key Features</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {service.features.map((f, i) => (
            <div key={i} className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm">
              <span className={`inline-flex size-4 items-center justify-center rounded-full text-white ${isCivic ? 'bg-blue-600' : 'bg-emerald-500'}`}>✓</span>
              <span>{f}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={`mt-10 rounded-xl border p-6 text-center shadow-sm ${isCivic ? 'border-blue-200 bg-blue-50' : ''}`}>
        <h3 className="text-base font-semibold">Ready to Get Started?</h3>
        <p className="mt-1 text-sm text-muted-foreground">Let’s discuss how {service.title} can help your organization achieve its goals.</p>
        <div className="mt-4 flex justify-center">
          <Link href={service.slug === 'civic-issue-reporter' ? `/services/${service.slug}/report` : `/services/${service.slug}/quote`}>
            <Button className={isCivic ? "bg-blue-600 hover:bg-blue-700 text-white" : undefined}>
              {service.slug === 'civic-issue-reporter' ? "Report an Issue" : "Request a Quote"}
              <span className="ml-2">✦</span>
            </Button>
          </Link>

        </div>
      </section>

      <section className="mt-8 rounded-xl border p-6">
        <h4 className="mb-3 text-sm font-semibold">Why Choose This Service?</h4>
        <ul className="grid grid-cols-1 gap-2 text-sm text-muted-foreground sm:grid-cols-2">
          {service.whyChoose.map((w, i) => (
            <li key={i} className="list-disc pl-4">{w}</li>
          ))}
        </ul>
      </section>
    </main>
  )
}


