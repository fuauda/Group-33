"use client";
import { useState } from 'react';
import { ArrowLeft, Heart, Shield, TrendingUp, CheckCircle, DollarSign, Eye, Users, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import ServiceQuoteForms from '../../../components/forms/ServiceQuoteForms';

const TransparentDonationPortal = () => {
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  const features = [
    {
      icon: <Eye className="w-6 h-6 text-red-600" />,
      title: "Full Transparency",
      description: "Track every birr from donation to impact with real-time updates"
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-600" />,
      title: "Verified NGOs",
      description: "All organizations are thoroughly vetted and verified for trust"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-green-600" />,
      title: "Impact Tracking",
      description: "See exactly how your donations create positive change"
    },
    {
      icon: <DollarSign className="w-6 h-6 text-purple-600" />,
      title: "Multiple Payment Options",
      description: "Support with Ethiopian Birr, mobile money, and international payments"
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-orange-600" />,
      title: "Detailed Reports",
      description: "Receive comprehensive reports on fund usage and project progress"
    },
    {
      icon: <Users className="w-6 h-6 text-indigo-600" />,
      title: "Community Impact",
      description: "Join a community of donors making real difference"
    }
  ];

  const causes = [
    "Education & Scholarships",
    "Healthcare & Medical Care",
    "Environmental Conservation",
    "Women Empowerment",
    "Youth Development",
    "Infrastructure Projects",
    "Emergency Relief",
    "Community Development"
  ];

  const benefits = [
    "Complete transparency in how your donations are used",
    "Verified and trustworthy NGO partners",
    "Real-time tracking of your donation impact",
    "Multiple secure payment options including Ethiopian Birr",
    "Detailed reports and progress updates",
    "Tax-deductible donations with proper receipts"
  ];

  const stats = [
    { number: "50M+", label: "ETB Donated" },
    { number: "10,000+", label: "Donors" },
    { number: "200+", label: "Projects Funded" },
    { number: "100%", label: "Transparency" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                <Heart className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Transparent Donation Portal</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-red-50 to-pink-100 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900 rounded-full text-red-700 dark:text-red-300 text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              Transparent Giving
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Give with
              <span className="text-red-600 dark:text-red-400"> Complete Confidence</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Support verified NGOs with full transparency. Track every birr from donation to impact, 
              ensuring your generosity creates real change in Ethiopia.
            </p>
            <button
              onClick={() => setShowQuoteForm(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
            >
              <CheckCircle className="w-5 h-5" />
              Request a Quote
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-red-600 dark:text-red-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Our Transparent Donation Portal?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We believe in complete transparency. Every donation is tracked, every impact is measured, 
              and every donor is informed.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Causes Section */}
      <div className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Causes You Can Support
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Choose from a wide range of verified causes that align with your values
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {causes.map((cause, index) => (
              <div key={index} className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 text-center hover:shadow-md transition-shadow">
                <Heart className="w-8 h-8 text-red-600 dark:text-red-400 mx-auto mb-2" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">{cause}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Benefits for Donors
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Join thousands of donors who trust our transparent platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {benefits.slice(0, 3).map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              {benefits.slice(3).map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-red-600 dark:bg-red-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Make a Transparent Impact?
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Start supporting verified causes today. Every donation is tracked, every impact is measured, 
            and every birr makes a difference in Ethiopia.
          </p>
          <button
            onClick={() => setShowQuoteForm(true)}
            className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
          >
            <CheckCircle className="w-5 h-5" />
            Request a Quote
          </button>
        </div>
      </div>

      {/* Quote Form Modal */}
      <ServiceQuoteForms
        isOpen={showQuoteForm}
        onClose={() => setShowQuoteForm(false)}
        activeService="transparent-donation-portal"
      />
    </div>
  );
};

export default TransparentDonationPortal;
