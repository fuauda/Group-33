export const services = [
  {
    id: 1,
    slug: "volunteer-match-engine",
    title: "Volunteer Match Engine",
    heroImage: "/images/volunteer-matching.jpeg",
    about:
      "Our Volunteer Match Engine revolutionizes how organizations connect with passionate volunteers. Using advanced matching, we analyze volunteer profiles, skills, interests, and availability to create perfect matches with meaningful opportunities.",
    details:
      "The platform streamlines the entire volunteer recruitment process, from initial contact to ongoing engagement. Organizations can post opportunities with specific requirements, while volunteers create detailed profiles that showcase their unique talents and preferences.",
    features: [
      "AI‑powered intelligent matching algorithm",
      "Comprehensive volunteer profiling system",
      "Real‑time availability tracking",
      "Automated communication workflows",
      "Impact measurement and reporting",
      "Mobile‑responsive volunteer portal",
      "Integration with existing CRM systems",
      "Multi‑language support",
    ],
    whyChoose: [
      "Production‑ready solution",
      "24/7 technical support",
      "Custom implementation",
      "Ongoing optimization",
    ],
  },
    {
    id: 2,
    slug: "civic-issue-reporter",
    title: "Civic Issue Reporter",
    heroImage: "/images/civic-issue-reporter.jpeg",
    about:
      "Our Civic Issue Reporter empowers citizens to raise and track local problems — from potholes to power outages — with photo evidence, location details, and real-time status updates. It bridges the gap between communities and local authorities for faster resolutions.",
    details:
      "The platform enables residents to submit detailed reports of civic issues directly from their mobile or desktop devices. Reports can include images, descriptions, and geotagged locations. Authorities receive these reports in real-time, allowing for swift prioritization and action. Users can track the progress of their submissions and receive notifications when issues are resolved.",
    features: [
      "Easy photo and description uploads",
      "Real-time issue tracking and status updates",
      "Geo-tagged location reporting",
      "Category tagging for issue type (potholes, outages, etc.)",
      "Push notifications for updates",
      "Multi-platform accessibility (web & mobile)",
      "Data analytics and reporting dashboard",
      "Integration with municipal management systems"
    ],
    whyChoose: [
      "Faster response times from local authorities",
      "Increased transparency and accountability",
      "Empowers citizens to improve their communities",
      "Streamlined communication between residents and officials"
    ],
},
    {
    id: 3,
    slug: "transparent-donation-portal",
    title: "Transparent Donation Portal",
    heroImage: "/images/transparent-donation-portal.jpeg",
    about:
      "Our Transparent Donation Portal allows donors to support verified NGOs with complete confidence. Every birr is traceable — from the moment it’s donated to the moment it’s spent — ensuring accountability and trust.",
    details:
      "The platform connects donors with pre-vetted NGOs and charitable projects, providing complete transparency over fund allocation and usage. Donors can track their contributions in real time through detailed expenditure reports, visual progress updates, and impact stories. NGOs can easily manage campaigns, provide proof of spending, and maintain trust with their supporters.",
    features: [
      "Full donation traceability",
      "Verified NGO and project listings",
      "Real-time expenditure tracking",
      "Visual project progress updates",
      "Impact reports and storytelling",
      "Secure online and mobile payments",
      "Automated donation receipts",
      "Multi-currency and local payment gateway support"
    ],
    whyChoose: [
      "Enhanced donor trust and confidence",
      "Streamlined NGO reporting process",
      "Secure and transparent financial handling",
      "Improved engagement through real-time impact sharing"
    ],
},
    {
    id: 4,
    slug: "ngo-collaboration-dashboard",
    title: "NGO Collaboration Dashboard",
    heroImage: "/images/ngo-collaboration-dashboard.jpeg",
    about:
      "Our NGO Collaboration Dashboard enables non-profits to post projects, manage volunteers, and showcase their community impact — all from a unified, user-friendly platform designed for efficiency and transparency.",
    details:
      "The platform centralizes all NGO operations into one accessible dashboard. Organizations can create and manage project listings, assign and track volunteers, upload progress updates, and share impact metrics with stakeholders. It also facilitates collaboration between multiple NGOs, allowing them to coordinate resources, share best practices, and maximize their collective impact.",
    features: [
      "Centralized project posting and management",
      "Volunteer tracking and assignment tools",
      "Impact reporting and analytics",
      "Photo, video, and story sharing",
      "Internal messaging and collaboration tools",
      "Multi-NGO coordination features",
      "Customizable dashboards for different teams",
      "Integration with CRM and fundraising systems"
    ],
    whyChoose: [
      "Streamlines NGO operations in one platform",
      "Boosts transparency and accountability",
      "Encourages collaboration across organizations",
      "Enhances volunteer and donor engagement"
    ],
},
]

export function getServiceById(id) {
  return services.find((s) => String(s.id) === String(id))
}



