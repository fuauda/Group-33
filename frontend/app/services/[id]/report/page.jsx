"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { useParams } from "next/navigation"
import { Input } from "../../../../components/ui/input"
import { Textarea } from "../../../../components/ui/textarea"
import { Button } from "../../../../components/ui/button"
import { services, getServiceById, getServiceBySlug } from "../../data"

export default function ReportFormPage() {
  const params = useParams()
  const idOrSlug = params?.id
  const service = useMemo(() => getServiceById(idOrSlug) || getServiceBySlug(idOrSlug) || services[0], [idOrSlug])
  const isCivic = service?.slug === "civic-issue-reporter"

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    issueType: "",
    urgency: "",
    location: "",
    description: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  const onSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-4">
        <Link href={`/services/${idOrSlug}`}>
          <Button variant="outline">← Back</Button>
        </Link>
      </div>

      <h1 className="mb-2 text-2xl font-semibold">Report a Civic Issue</h1>
      <p className="mb-6 text-sm text-muted-foreground">Provide details below so we can triage and route your report appropriately.</p>

      <form onSubmit={onSubmit} className={`space-y-4 rounded-xl border p-6 shadow-sm ${isCivic ? "border-blue-200 bg-blue-50" : ""}`}>
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
            <label className="text-sm" htmlFor="phone">Phone Number *</label>
            <Input id="phone" name="phone" type="tel" required placeholder="Enter your phone number" value={form.phone} onChange={onChange} />
          </div>

          <div className="grid gap-2">
            <label className="text-sm" htmlFor="issueType">Issue Type *</label>
            <select id="issueType" name="issueType" className="h-9 rounded-md border bg-background px-3 text-sm" value={form.issueType} onChange={onChange} required>
              <option value="">Select an option</option>
              {[
                "Road & Infrastructure",
                "Water & Sanitation",
                "Power & Electricity",
                "Healthcare Access",
                "Education Facilities",
                "Public Safety",
                "Environmental",
                "Other",
              ].map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div className="grid gap-2">
            <label className="text-sm" htmlFor="urgency">Urgency Level *</label>
            <select id="urgency" name="urgency" className="h-9 rounded-md border bg-background px-3 text-sm" value={form.urgency} onChange={onChange} required>
              {[
                "Low - General improvement",
                "Medium - Affects daily life",
                "High - Safety concern",
                "Critical - Emergency situation",
              ].map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div className="grid gap-2">
            <label className="text-sm" htmlFor="location">Issue Location *</label>
            <Input id="location" name="location" required placeholder="e.g., Bole, Addis Ababa - Near Bole Airport" value={form.location} onChange={onChange} />
          </div>

          <div className="grid gap-2">
            <label className="text-sm" htmlFor="description">Issue Description *</label>
            <Textarea id="description" name="description" required placeholder="Describe the issue and how it affects the community..." value={form.description} onChange={onChange} />
          </div>

          <div className="grid gap-2">
            <label className="text-sm" htmlFor="message">Additional Information</label>
            <Textarea id="message" name="message" placeholder="Any extra context, links, or references..." value={form.message} onChange={onChange} />
          </div>
        </div>

        <div className="pt-2">
          <Button type="submit" className={`w-full ${isCivic ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}`}>
            Submit Report
          </Button>
        </div>
      </form>

      <div className={`mt-6 rounded-xl border p-4 text-sm ${isCivic ? "border-blue-200 bg-blue-50 text-blue-800" : "text-muted-foreground"}`}>
        <h2 className="mb-2 text-sm font-semibold text-foreground">What happens next?</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>We’ll review your report and prioritize based on urgency</li>
          <li>Relevant authorities will be notified for action</li>
          <li>You’ll receive updates on the status as it progresses</li>
        </ul>
      </div>

      {submitted && (
        <div className="mt-6 rounded-md border border-blue-300 bg-blue-50 p-4 text-blue-700">
          Thank you! Your issue has been submitted. We’ll update you as it progresses.
        </div>
      )}
    </main>
  )
}


