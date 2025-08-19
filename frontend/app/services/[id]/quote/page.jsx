"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { useParams } from "next/navigation"
import { Input } from "../../../../components/ui/input"
import { Textarea } from "../../../../components/ui/textarea"
import { Button } from "../../../../components/ui/button"
import { services, getServiceById, getServiceBySlug } from "../../data"

export default function QuoteFormPage() {
  const params = useParams()
  const idOrSlug = params?.id
  const service = useMemo(() => getServiceById(idOrSlug) || getServiceBySlug(idOrSlug) || services[0], [idOrSlug])
  const [form, setForm] = useState({ name: "", email: "", interest: service?.title ?? "", details: "" })
  const [submitted, setSubmitted] = useState(false)

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  const onSubmit = (e) => {
    e.preventDefault()
    // Mock submit
    setSubmitted(true)
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-4">
        <Link href={`/services/${idOrSlug}`}>
          <Button variant="outline">← Back</Button>
        </Link>
      </div>

      <h1 className="mb-6 text-2xl font-semibold">Request a Quote</h1>

      <form onSubmit={onSubmit} className="space-y-4 rounded-xl border p-6 shadow-sm">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <label className="text-sm" htmlFor="name">Full Name *</label>
            <Input id="name" name="name" required placeholder="Enter your full name" value={form.name} onChange={onChange} />
          </div>
          <div className="grid gap-2">
            <label className="text-sm" htmlFor="email">Email Address *</label>
            <Input id="email" name="email" type="email" required placeholder="Enter your email address" value={form.email} onChange={onChange} />
          </div>
          <div className="grid gap-2">
            <label className="text-sm" htmlFor="interest">Service Interest *</label>
            <select id="interest" name="interest" className="h-9 rounded-md border bg-background px-3 text-sm" value={form.interest} onChange={onChange}>
              {services.map((s) => (
                <option key={s.id} value={s.title}>{s.title}</option>
              ))}
            </select>
          </div>
          <div className="grid gap-2">
            <label className="text-sm" htmlFor="details">Project Details *</label>
            <Textarea id="details" name="details" required placeholder="Please describe your project requirements, timeline, budget range, and any specific needs..." value={form.details} onChange={onChange} />
          </div>
        </div>
        <div className="pt-2">
          <Button type="submit" className="w-full">
            ✈ Send Quote Request
          </Button>
        </div>
      </form>

      <div className="mt-6 rounded-xl border p-4 text-sm text-muted-foreground">
        <h2 className="mb-2 text-sm font-semibold text-foreground">What happens next?</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>We’ll review your requirements within 24 hours</li>
          <li>Our team will prepare a customized proposal</li>
          <li>We’ll schedule a call to discuss your project in detail</li>
          <li>You’ll receive a detailed quote and timeline</li>
        </ul>
      </div>

      {submitted && (
        <div className="mt-6 rounded-md border border-emerald-300 bg-emerald-50 p-4 text-emerald-700">
          Thank you! Your request has been received. We’ll get back to you shortly.
        </div>
      )}
    </main>
  )
}


