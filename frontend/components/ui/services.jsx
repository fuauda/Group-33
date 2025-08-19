"use client";
import Link from 'next/link';

const ServiceCard = ({ title, description, icon, id, serviceKey }) => {
    return (
        <div
            className="flex flex-col lg:flex-row gap-4 lg:gap-6 p-5 xl:p-7 hover:cursor-default rounded-lg bg-gray-100 dark:bg-gray-900 group transition-all duration-300 z-20 hover:z-30 shadow-md shadow-transparent hover:shadow-sky-100/40 dark:hover:shadow-sky-900/30 border border-transparent hover:border-sky-400/60 dark:hover:border-sky-500/60 hover:-translate-y-2 overflow-hidden relative"
                    >
            <div className="absolute w-40 h-10 rounded-full border-8 border-sky-600/20 dark:border-sky-500/30 blur-md -z-10 -top-1 right-5 rotate-45 pointer-events-none" />
            <div className="flex min-w-max items-start">
                <div className="p-1.5 rounded-full shadow-sm relative bg-gradient-to-br from-gray-100 to-neutral-300 dark:from-gray-900 dark:to-gray-700">
                    <div className="bg-gray-100 dark:bg-gray-900 rounded-full p-3 flex">
                        <img
                            src={icon}
                            alt="ico"
                            className="w-10 h-10 transition-transform duration-300 group-hover:scale-110"                            onError={e => { e.target.onerror = null; e.target.src = '/images/avatar-1.avif'; }}
                        />
                    </div>
                </div>
            </div>
            <div className="space-y-5 flex flex-col md:flex-1 relative">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-sky-600 dark:group-hover:text-sky-400">
                    {title}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-justify line-clamp-3">
                    {description}
                </p>
                <Link
                    href={`/services/${serviceKey}`}
                    className="relative text-sky-700 dark:text-sky-400 flex items-center gap-x-3 w-max hover:text-sky-800 dark:hover:text-sky-300 transition-colors font-medium group/link"
                >
                    Get quote
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-sky-400 transition-all duration-300 group-hover/link:w-full"></span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-1 transition-transform duration-300 group-hover/link:translate-x-1">
                        <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
                    </svg>
                </Link>
            </div>
        </div>
    )
}

const services = [
    {
        id: 1,
        title: "Volunteer Match Engine",
        description: "Easily connect with NGOs and causes based on your skills, location, and passion. Our algorithm ensures you find meaningful opportunities where your time truly matters.",
        icon: "/images/icons/volunteer-match-engine.jpg",
        serviceKey: "volunteer-match-engine"
    },
    {
        id: 2,
        title: "Civic Issue Reporter",
        description: "Raise and track local problems — from potholes to power outages — with photo evidence and real-time status updates. Your voice drives accountability.",
        icon: "/images/icons/civic-Issue-reporter.png",
        serviceKey: "civic-issue-reporter"
    },
    {
        id: 3,
        title: "Transparent Donation Portal",
        description: "Support verified NGOs with confidence. Our donation system ensures every birr is traceable — from donor to impact.",
        icon: "/images/icons/transparent-donation-portal.png",
        serviceKey: "transparent-donation-portal"
    },
    {
        id: 4,
        title: "NGO Collaboration Dashboard",
        description: "Non-profits can post projects, manage volunteers, and showcase their community impact — all from a unified, user-friendly dashboard.",
        icon: "/images/icons/ngo-collaboration-dashboard.png",
        serviceKey: "ngo-collaboration-dashboard"
    },
]

const Features = () => {
    return (
        <section className="py-20 bg-gray-50 dark:bg-gray-900" id="services">
            <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 flex flex-col items-start gap-10 xl:gap-14">
                <div className="flex flex-col gap-5 text-center w-full">
                    <span className="text-blue-600 dark:text-blue-500 font-semibold relative inline-block text-lg tracking-wider">
                        Services
                    </span>

                    <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600 dark:from-sky-400 dark:to-blue-500 relative inline-block animate-gradient-x transition-transform duration-500 hover:scale-105">
                        We are here to help with best services
                        <span className="block h-1 w-20 bg-sky-500 dark:bg-sky-400 mx-auto mt-2 rounded-full transition-all duration-500 hover:w-32"></span>
                    </h1>

                    <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
                        At CommunityConnect, we provide powerful tools that strengthen civic engagement,
                        transparency, and local impact. Whether you're a volunteer, NGO, or concerned citizen,
                        we've got solutions built for you.
                    </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-6 md:gap-10">
                    {services.map(service => (
                        <ServiceCard key={service.id} {...service} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;