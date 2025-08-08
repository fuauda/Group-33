export const blogs = [
  {
    id: 1,
    title: "How Civic Tech Empowers Local Communities",
    shortDescription:
      "Civic technology (or “civic tech”) bridges the gap between communities and the systems that serve them. It combines digital platforms, open data, and collaborative tools to make local governance more transparent, inclusive, and responsive. Whether it’s reporting issues in the neighborhood, participating in policy discussions, or organizing grassroots initiatives, civic tech empowers citizens to take an active role in shaping their communities.",
    fullDescription:
      `Key Areas of Impact:
1. Online Platforms for Public Input – Town halls are no longer limited to physical spaces. Platforms allow residents to propose ideas, vote on community projects, and give feedback on policy drafts.
2. Crowdsourcing for Problem-Solving – Citizens can submit solutions for local challenges, from environmental clean-ups to traffic safety improvements.
3. Open Data for Transparency – Governments can publish budget, infrastructure, and service data, enabling watchdog groups and journalists to hold institutions accountable.
4. Digital Tools for Civic Education – Mobile apps and online resources teach residents about their rights, local laws, and how to engage with officials.
5. Social Media for Mobilization – Real-time sharing of events, petitions, and campaigns allows rapid, large-scale citizen action.
6. Virtual Town Halls and Meetings – Remote participation ensures that busy parents, workers, and people with disabilities can still join the conversation.

Real-World Example:
In Nairobi, the “Ushahidi” platform allowed communities to map incidents of violence during elections, leading to increased global awareness and faster humanitarian responses.`,
    images: [
      "/images/blogs_data/civic-involvement.jpg",
      "/images/local-communities.jpg",
    ],
    tags: ["Admins", "Admin", "Trust & Safety", "RBAC"],
    author: "CommunityConnect Ops",
    publishedAt: "2025-07-30",
  },
  {
    id: 2,
    title: "Why Transparent Donations Matter",
    shortDescription:
      "Discover how donation tracking builds trust between donors, organizations, and communities. When contributors can see exactly how their funds are spent, they feel more confident in continuing their support. Transparent systems also reduce fraud, encourage recurring giving, and inspire others to participate in meaningful causes, creating a culture of honesty and shared responsibility.",
    fullDescription:
      `Why It Matters:
1. Builds Credibility – Organizations that show exactly where donations go earn a stronger reputation.
2. Encourages Recurring Giving – Donors who see measurable impact are more likely to give again.
3. Prevents Fraud – Public, verifiable records make misuse of funds harder to hide.
4. Engages the Community – People feel connected when they can track the journey of their contribution.

How Technology Helps:
- Blockchain-based ledgers can ensure transactions are permanent and tamper-proof.
- Live impact dashboards can display real-time project funding and progress.
- Donor portals allow contributors to log in and see personalized impact reports.

Real-World Example:
Charity: Water provides GPS coordinates and photos for every water well funded, giving donors a tangible connection to the results.`,
    images: [
      "/images/blogs_data/transparent-donations-1.png",
      "/images/blogs_data/transparent-donations-2.jpg",
    ],
    tags: ["NGOs", "NGO Tools", "Donation Tracking", "Transparency"],
    author: "Abiel Tesfaye",
    publishedAt: "2025-07-27",
  },
  {
    id: 3,
    title: "Building a Volunteer Matching Engine with Next.js",
    shortDescription:
      "A technical walkthrough of how we built the matchmaking logic for volunteer opportunities. Leveraging server-side rendering, dynamic filtering, and real-time data updates, we designed a system that pairs volunteers with opportunities that match their skills, location, and interests. This approach not only improves volunteer engagement but also helps organizations quickly find the right people for urgent needs.",
    fullDescription:
      `Core Features:
1. Real-Time Opportunity Matching – Using filters like skill sets, cause areas, and availability.
2. Location-Aware Search – Volunteers see opportunities closest to them first.
3. Personalized Recommendations – Machine learning suggests roles based on past volunteering history.
4. Responsive Web App – Accessible on desktop and mobile.
5. Organization Portal – Nonprofits can post opportunities, track applicants, and communicate directly.

Technical Stack:
Frontend: Next.js for server-side rendering and fast loading.
Backend: Node.js & Express for API handling.
Database: MongoDB for flexible opportunity storage.
Authentication: OAuth for secure volunteer sign-in.
Hosting: Vercel for easy deployment and scalability.

Impact Story:
Before the platform, a local NGO took 2 weeks to find suitable volunteers for an event. Now, they can connect with ready, vetted volunteers in under 48 hours.`,
    images: [
      "/images/volunteer-matching.jpeg",
      "/images/volunteer-matching-2.jpeg",
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
