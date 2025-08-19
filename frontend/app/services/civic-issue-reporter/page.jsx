"use client";
import { ArrowLeft, Mic, Camera, MapPin, Clock, CheckCircle, AlertTriangle, Shield, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';

const CivicIssueReporter = () => {

  const features = [
    {
      icon: <Camera className="w-6 h-6 text-blue-600" />,
      title: "Photo Evidence",
      description: "Upload photos and videos to provide clear evidence of issues"
    },
    {
      icon: <MapPin className="w-6 h-6 text-blue-600" />,
      title: "GPS Location Tracking",
      description: "Automatically capture precise location data for faster resolution"
    },
    {
      icon: <Clock className="w-6 h-6 text-purple-600" />,
      title: "Real-time Updates",
      description: "Track the status of your reported issues in real-time"
    },
    {
      icon: <Users className="w-6 h-6 text-orange-600" />,
      title: "Community Voting",
      description: "Let the community upvote issues to prioritize urgent problems"
    },
    {
      icon: <Shield className="w-6 h-6 text-red-600" />,
      title: "Anonymous Reporting",
      description: "Report issues anonymously while maintaining accountability"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-indigo-600" />,
      title: "Progress Tracking",
      description: "Monitor resolution progress and receive notifications"
    }
  ];

  const issueTypes = [
    "Road & Infrastructure",
    "Water & Sanitation", 
    "Power & Electricity",
    "Healthcare Access",
    "Education Facilities",
    "Public Safety",
    "Environmental Issues",
    "Transportation"
  ];

  const benefits = [
    "Report issues quickly and easily from your mobile device",
    "Get real-time updates on issue resolution progress",
    "Help prioritize community problems through voting",
    "Hold local authorities accountable for public services",
    "Improve your neighborhood and community infrastructure",
    "Connect with other concerned citizens"
  ];

  const stats = [
    { number: "2,500+", label: "Issues Reported" },
    { number: "1,800+", label: "Issues Resolved" },
    { number: "72%", label: "Resolution Rate" },
    { number: "15,000+", label: "Community Members" }
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
                <Mic className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Civic Issue Reporter</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
              <Mic className="w-4 h-4" />
              Civic Reporting
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Your Voice Drives
              <span className="text-blue-600 dark:text-blue-400"> Community Change</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Report local problems with photo evidence and real-time tracking. 
              From potholes to power outages, make your community better with every report.
            </p>
            <Link
              href="/services/civic-issue-reporter/report"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center gap-2 mx-auto"
            >
              <CheckCircle className="w-5 h-5" />
              Report an Issue
            </Link>
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
              Powerful Features for Civic Reporting
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our comprehensive reporting system makes it easy to identify, report, and track 
              community issues for faster resolution.
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

      {/* Issue Types Section */}
      <div className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Types of Issues You Can Report
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              From infrastructure problems to public safety concerns, report any issue affecting your community
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {issueTypes.map((type, index) => (
              <div key={index} className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 text-center hover:shadow-md transition-shadow">
                <AlertTriangle className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
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
              Benefits for Citizens
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Join thousands of citizens who are making their communities better
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {benefits.slice(0, 3).map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              {benefits.slice(3).map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
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
            Ready to Make Your Community Better?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Start reporting issues in your neighborhood today. Your voice matters, 
            and together we can create positive change in our communities.
          </p>
          <Link
            href="/services/civic-issue-reporter/report"
            className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center gap-2 mx-auto"
          >
            <CheckCircle className="w-5 h-5" />
            Report an Issue
          </Link>
        </div>
      </div>

      {/* Form moved to dedicated page: /services/civic-issue-reporter/report */}
    </div>
  );
};

export default CivicIssueReporter;
