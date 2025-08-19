"use client";
import { useState } from 'react';
import { ArrowLeft, Users, Target, Clock, MapPin, CheckCircle, Star, TrendingUp, Heart } from 'lucide-react';
import Link from 'next/link';
import ServiceQuoteForms from '../../../components/forms/ServiceQuoteForms';

const VolunteerMatchEngine = () => {
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  const features = [
    {
      icon: <Target className="w-6 h-6 text-blue-600" />,
      title: "Smart Matching Algorithm",
      description: "AI-powered matching based on skills, location, availability, and passion"
    },
    {
      icon: <MapPin className="w-6 h-6 text-green-600" />,
      title: "Location-Based Opportunities",
      description: "Find opportunities in your local area or preferred locations"
    },
    {
      icon: <Clock className="w-6 h-6 text-purple-600" />,
      title: "Flexible Scheduling",
      description: "Choose from various time commitments that fit your schedule"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-orange-600" />,
      title: "Skill Development",
      description: "Gain new skills and experience while making a difference"
    },
    {
      icon: <Heart className="w-6 h-6 text-red-600" />,
      title: "Meaningful Impact",
      description: "Connect with causes that align with your values and interests"
    },
    {
      icon: <Star className="w-6 h-6 text-yellow-600" />,
      title: "Recognition System",
      description: "Track your contributions and earn recognition for your impact"
    }
  ];

  const benefits = [
    "Find volunteer opportunities that match your skills and interests",
    "Connect with verified NGOs and community organizations",
    "Track your volunteer hours and impact over time",
    "Build your professional network and gain experience",
    "Make a real difference in your community",
    "Flexible scheduling to fit your lifestyle"
  ];

  const stats = [
    { number: "1,000+", label: "Active Volunteers" },
    { number: "500+", label: "NGO Partners" },
    { number: "50,000+", label: "Hours Contributed" },
    { number: "95%", label: "Satisfaction Rate" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Volunteer Match Engine</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
              <Users className="w-4 h-4" />
              Volunteer Matching
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Find Your Perfect
              <span className="text-blue-600 dark:text-blue-400"> Volunteer Opportunity</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Connect with meaningful opportunities that match your skills, location, and passion. 
              Our AI-powered matching engine ensures you find the perfect way to make a difference.
            </p>
            <button
              onClick={() => setShowQuoteForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
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
                <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
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
              Why Choose Our Volunteer Match Engine?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We've built the most advanced volunteer matching platform to connect passionate individuals 
              with meaningful opportunities that create real impact.
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

      {/* Benefits Section */}
      <div className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Benefits for Volunteers
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Join thousands of volunteers who have found their perfect match
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {benefits.slice(0, 3).map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              {benefits.slice(3).map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 dark:bg-blue-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Volunteer Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get matched with the perfect volunteer opportunity that aligns with your skills, 
            interests, and schedule. Make a difference today.
          </p>
          <button
            onClick={() => setShowQuoteForm(true)}
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
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
        activeService="volunteer-match-engine"
      />
    </div>
  );
};

export default VolunteerMatchEngine;
