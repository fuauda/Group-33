export const services = [
  {
    id: 1,
    slug: "volunteer-match-engine",
    title: "Volunteer Match Engine",
    icon: "/images/icons/volunteer-match-engine-icon.png", 
    heroImage: "/images/hero-volunteer-match-engine.jpg",
    about: "Connect with NGOs, campaigns, and community initiatives that match your skills, interests, and location. Our smart matching system ensures your time and talents create the greatest possible impact.",
    details: "The Volunteer Match Engine makes it simple for organizations and volunteers to connect meaningfully. NGOs can post opportunities with clear requirements, while volunteers create detailed profiles highlighting their skills, causes they care about, and real-time availability. Our matching technology then links the right people to the right causes.",
    features: [
      "Smart matching algorithm based on skills, causes, and location",
      "Detailed volunteer profiles with experience and interests",
      "Real-time availability tracking",
      "Automated communication and reminders",
      "Impact tracking for hours served and outcomes achieved",
      "Mobile-friendly volunteer portal",
      "Integration with NGO management tools",
      "Multi-language support for inclusive access"
    ],
    whyChoose: [
      "Built for civic engagement and social impact",
      "Transparent and fair opportunity matching",
      "Customizable for different NGOs and communities",
      "Ongoing updates based on user feedback"
    ]
  },
  {
    id: 2,
    slug: "civic-issue-reporter",
    title: "Civic Issue Reporter",
    icon: "/images/icons/civic-issue-reporter-icon.png", 
    heroImage: "/images/hero-civic-issue-reporter.jpg",
    about: "Report and track local problems — from potholes to power outages — with photos, GPS location, and real-time updates. Your voice drives action and accountability.",
    details: "The Civic Issue Reporter empowers citizens to take an active role in improving their communities. Users can report civic problems by attaching photos, location data, and detailed descriptions. Reports are tracked through resolution, and the community can upvote issues to bring more attention to urgent needs.",
    features: [
      "Photo and geolocation-enabled reporting",
      "Real-time status tracking of reported issues",
      "Upvoting system to highlight community priorities",
      "Automated updates when status changes",
      "Integration with local government/NGO response teams",
      "Mobile-friendly interface for on-the-go reporting",
      "Search and filter by issue type or location"
    ],
    whyChoose: [
      "Promotes citizen engagement and accountability",
      "Easy-to-use and accessible for all ages",
      "Ensures community voices are heard",
      "Improves transparency in problem resolution"
    ]
  },
  {
    id: 3,
    slug: "transparent-donation-portal",
    title: "Transparent Donation Portal",
    icon: "/images/icons/transparent-donation-icon.png", 
    heroImage: "/images/hero-transparent-donation.jpg",
    about: "Support verified NGOs and campaigns with confidence. Every birr you give is traceable from donor to impact, ensuring complete transparency.",
    details: "Our Transparent Donation Portal lets donors contribute to verified NGOs and campaigns while tracking exactly how their funds are used. Every donation is logged, and impact reports keep donors informed from the moment they give until the final outcome.",
    features: [
      "Donation tracking from payment to impact",
      "Verified NGOs and campaigns only",
      "Detailed impact reports and updates",
      "Secure online payment integration",
      "Donation history dashboard for donors",
      "Multi-currency and multi-language support",
      "Integration with NGO financial systems"
    ],
    whyChoose: [
      "Builds trust between donors and organizations",
      "Ensures every donation is used as intended",
      "Supports transparency and accountability",
      "Makes giving simple and impactful"
    ]
  },
  {
    id: 4,
    slug: "ngo-collaboration-dashboard",
    title: "NGO Collaboration Dashboard",
    icon: "/images/icons/ngo-collaboration-dashboard-icon.png",
    heroImage: "/images/hero-ngo-collaboration-dashboard.jpg",
    about: "Empower NGOs with a centralized hub to post projects, manage volunteers, track donations, and showcase their community impact.",
    details: "The NGO Collaboration Dashboard provides non-profits with powerful tools to manage all aspects of their work in one place. Organizations can post opportunities, accept volunteer applications, track donations, generate impact reports, and share results with their community.",
    features: [
      "Unified project and volunteer management",
      "Donation tracking and financial transparency tools",
      "Impact reporting with charts and statistics",
      "Volunteer application review and approval system",
      "Integration with Volunteer Match Engine",
      "Mobile-friendly admin panel",
      "Multi-user access with role-based permissions"
    ],
    whyChoose: [
      "Streamlines NGO operations",
      "Improves volunteer coordination",
      "Enhances transparency for donors and communities",
      "Scales to support both small and large organizations"
    ]
  }
];

export function getServiceById(id) {
  return services.find((s) => String(s.id) === String(id));
}