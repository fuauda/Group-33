"use client";
import { useState } from 'react';
import { ArrowLeft, Building2, Users, BarChart3, CheckCircle, Target, Shield, TrendingUp, Calendar, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import ServiceQuoteForms from '../../../components/forms/ServiceQuoteForms';

const NGOCollaborationDashboard = () => {
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  const features = [
    {
      icon: <Users className="w-6 h-6 text-purple-600" />,
      title: "Volunteer Management",
      description: "Efficiently recruit, assign, and track volunteers for your projects"
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-blue-600" />,
      title: "Impact Analytics",
      description: "Comprehensive dashboards to measure and showcase your impact"
    },
    {
      icon: <Target className="w-6 h-6 text-green-600" />,
      title: "Project Management",
      description: "Organize and track multiple projects from planning to completion"
    },
    {
      icon: <Shield className="w-6 h-6 text-red-600" />,
      title: "Donor Transparency",
      description: "Build trust with transparent reporting and fund tracking"
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-orange-600" />,
      title: "Communication Tools",
      description: "Seamless communication with volunteers, donors, and stakeholders"
    },
    {
      icon: <Calendar className="w-6 h-6 text-indigo-600" />,
      title: "Event Coordination",
      description: "Plan and manage events, campaigns, and community outreach"
    }
  ];

  const projectTypes = [
    "Education Programs",
    "Healthcare Initiatives",
    "Environmental Projects",
    "Women Empowerment",
    "Youth Development",
    "Infrastructure Development",
    "Emergency Response",
    "Community Outreach"
  ];

  const benefits = [
    "Streamline volunteer recruitment and management processes",
    "Track and showcase your impact with detailed analytics",
    "Build donor trust through transparent reporting",
    "Coordinate multiple projects efficiently from one dashboard",
    "Improve communication with stakeholders and volunteers",
    "Scale your operations and reach more communities"
  ];

  const stats = [
    { number: "2,000+", label: "NGOs Using Platform" },
    { number: "50,000+", label: "Volunteers Managed" },
    { number: "500+", label: "Projects Completed" },
    { number: "95%", label: "Satisfaction Rate" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Building2 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">NGO Collaboration Dashboard</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900 rounded-full text-purple-700 dark:text-purple-300 text-sm font-medium mb-6">
              <Building2 className="w-4 h-4" />
              NGO Management
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Empower Your NGO with
              <span className="text-purple-600 dark:text-purple-400"> Smart Management</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Manage projects, volunteers, and showcase your impact from a unified dashboard. 
              Scale your operations and create greater community impact with our comprehensive tools.
            </p>
            <button
              onClick={() => setShowQuoteForm(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
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
                <div className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
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
              Comprehensive NGO Management Tools
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to manage your NGO operations, from volunteer coordination 
              to impact measurement, all in one powerful platform.
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

      {/* Project Types Section */}
      <div className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Project Types We Support
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Manage any type of NGO project with our flexible and comprehensive tools
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {projectTypes.map((type, index) => (
              <div key={index} className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 text-center hover:shadow-md transition-shadow">
                <Building2 className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">{type}</span>
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
              Benefits for NGOs
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Join thousands of NGOs who have transformed their operations
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {benefits.slice(0, 3).map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              {benefits.slice(3).map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-purple-600 dark:bg-purple-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your NGO Operations?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Start managing your projects, volunteers, and impact more effectively today. 
            Scale your operations and create greater community change with our comprehensive tools.
          </p>
          <button
            onClick={() => setShowQuoteForm(true)}
            className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
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
        activeService="ngo-collaboration-dashboard"
      />
    </div>
  );
};

export default NGOCollaborationDashboard;
