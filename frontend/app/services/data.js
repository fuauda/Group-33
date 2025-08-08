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
]

export function getServiceById(id) {
  return services.find((s) => String(s.id) === String(id))
}



