export const blogs = [
  {
    id: 1,
    title: "How Civic Tech Empowers Local Communities",
    shortDescription:
      "Civic technology (or “civic tech”) bridges the gap between communities and the systems that serve them. It combines digital platforms, open data, and collaborative tools to make local governance more transparent, inclusive, and responsive. Whether it’s reporting issues in the neighborhood, participating in policy discussions, or organizing grassroots initiatives, civic tech empowers citizens to take an active role in shaping their communities.",
    fullDescription:
                      <div>
                                <h3>Key Areas of Impact:</h3>
                                <p><b>1. Online Platforms for Public Input</b> – Town halls are no longer limited to physical spaces. Platforms allow residents to propose ideas, vote on community projects, and give feedback on policy drafts.</p>
                                <p><b>2. Crowdsourcing for Problem-Solving</b> – Citizens can submit solutions for local challenges, from environmental clean-ups to traffic safety improvements.</p>
                                <p><b>3. Open Data for Transparency</b> – Governments can publish budget, infrastructure, and service data, enabling watchdog groups and journalists to hold institutions accountable.</p>
                                <p><b>4. Digital Tools for Civic Education</b> – Mobile apps and online resources teach residents about their rights, local laws, and how to engage with officials.</p>
                                <p><b>5. Social Media for Mobilization</b> – Real-time sharing of events, petitions, and campaigns allows rapid, large-scale citizen action.</p>
                                <p><b>6. Virtual Town Halls and Meetings</b> – Remote participation ensures that busy parents, workers, and people with disabilities can still join the conversation.</p>

                                <h4>Real-World Example:</h4>
                                <p>In Nairobi, the “Ushahidi” platform allowed communities to map incidents of violence during elections, leading to increased global awareness and faster humanitarian responses.</p>
                    </div>
,
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
      "Donating to a cause is an act of trust — donors believe their contribution will make a difference. Unfortunately, without transparency, donors can feel uncertain about where their money goes. Transparent donation tracking systems provide clear, accessible records of how each contribution is used, strengthening trust and encouraging long-term giving.",
    fullDescription:




                            <div>
                                <h3>Why It Matters:</h3>
                                <p><b>1. Builds Credibility</b> – Organizations that show exactly where donations go earn a stronger reputation.</p>
                                <p><b>2. Encourages Recurring Giving</b> – Donors who see measurable impact are more likely to give again.</p>
                                <p><b>3. Prevents Fraudy</b> – Public, verifiable records make misuse of funds harder to hide.</p>
                                <p><b>4. Engages the Community</b> – People feel connected when they can track the journey of their contribution</p>
                                <p><b>How Technology Helps:</b><br />
                                - Blockchain-based ledgers can ensure transactions are permanent and tamper-proof.<br/>

                                - Live impact dashboards can display real-time project funding and progress.<br/>

                                - Donor portals allow contributors to log in and see personalized impact reports.</p>


                                <h4>Real-World Example:</h4>
                                <p>Charity: Water provides GPS coordinates and photos for every water well funded, giving donors a tangible connection to the results.</p>
                    </div>,




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


