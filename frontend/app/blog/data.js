export const blogs = [
  {
    id: 1,
    title: "Admin Dashboard: Verification, Moderation, and Trust",
    shortDescription:
      "Admins approve NGOs and campaigns, oversee civic reports, and maintain platform safety end‑to‑end.",
    fullDescription:
      "Trust and safety are foundational. Our admin dashboard streamlines verification workflows for NGOs and campaigns to prevent misuse. Moderators can review flagged content, manage user access, and ensure civic reports move smoothly from intake to resolution. Audit trails and role‑based access controls deliver accountability end‑to‑end.",
    images: [
      "/images/homepage-1.png",
      "/images/local-communities.jpg",
      "/images/homepage-3.jpg",
    ],
    tags: ["Admins", "Admin", "Trust & Safety", "RBAC"],
    author: "CommunityConnect Ops",
    publishedAt: "2025-07-30",
  },
  {
    id: 2,
    title: "For NGOs: Post Needs, Manage Applicants, Show Impact",
    shortDescription:
      "NGOs can publish volunteer needs, receive applications, and maintain a transparent public profile.",
    fullDescription:
      "NGOs can publish volunteer needs, receive applications, and maintain a transparent public profile with milestones, photos, and impact metrics. Built‑in messaging and lightweight workflows reduce operational overhead while improving collaboration.",
    images: [
      "/images/homepage-2.png",
      "/images/transparent-donations.png",
    ],
    tags: ["NGOs", "NGO Tools", "Recruiting"],
    author: "Sara Ibrahim",
    publishedAt: "2025-07-27",
  },
  {
    id: 3,
    title: "Report Civic Issues with Geolocation and Photos",
    shortDescription:
      "Citizens can report potholes, sanitation issues, and public safety concerns—complete with geotags.",
    fullDescription:
      "Citizens can report potholes, sanitation issues, and public safety concerns—complete with geotags and photos. Authorities and NGOs get structured data to triage and resolve the most impactful issues first.",
    images: [
      "/images/local-communities.jpg",
      "/images/homepage-1.png",
    ],
    tags: ["Citizens", "Civic Issues", "Geolocation"],
    author: "Nia Okonkwo",
    publishedAt: "2025-07-22",
  },
  {
    id: 4,
    title: "Donation Transparency: Follow Your Impact End‑to‑End",
    shortDescription:
      "Donors get real‑time visibility into how funds are used, with verified updates, milestones, and impact.",
    fullDescription:
      "Donors get real‑time visibility into how funds are used, with verified updates, milestones, and impact certificates. Public dashboards build trust between donors, NGOs, and communities.",
    images: [
      "/images/transparent-donations.png",
      "/images/homepage-3.jpg",
    ],
    tags: ["Donors", "Donations", "Transparency"],
    author: "Marcus Lee",
    publishedAt: "2025-07-18",
  },
]

export function getBlogById(id) {
  return blogs.find((b) => String(b.id) === String(id))
}


