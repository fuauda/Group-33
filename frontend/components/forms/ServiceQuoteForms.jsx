import React, { useState } from 'react';
import { X, CheckCircle, ArrowRight, Users, Heart, Mic, Building2 } from 'lucide-react';

const ServiceQuoteForms = ({ isOpen, onClose, activeService }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    message: '',
    serviceType: '',
    location: '',
    budget: '',
    timeline: '',
    teamSize: '',
    projectScope: '',
    skills: '',
    availability: '',
    donationAmount: '',
    cause: '',
    transparency: '',
    issueType: '',
    urgency: '',
    location: '',
    description: '',
    ngoSize: '',
    projectType: '',
    volunteerNeeds: '',
    impactGoals: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    onClose();
  };

  const serviceConfigs = {
    'volunteer-match-engine': {
      title: 'Volunteer Match Engine',
      icon: <Users className="w-8 h-8 text-blue-600" />,
      description: 'Connect volunteers with meaningful opportunities based on skills, location, and passion.',
      fields: [
        { name: 'name', label: 'Full Name', type: 'text', required: true },
        { name: 'email', label: 'Email Address', type: 'email', required: true },
        { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
        { name: 'organization', label: 'Organization Name', type: 'text', required: false },
        { name: 'skills', label: 'Skills & Expertise', type: 'textarea', placeholder: 'e.g., Teaching, Healthcare, IT, Construction, Language skills...', required: true },
        { name: 'availability', label: 'Availability', type: 'select', options: ['Weekdays', 'Weekends', 'Evenings', 'Flexible', 'Full-time'], required: true },
        { name: 'location', label: 'Preferred Location', type: 'text', placeholder: 'e.g., Addis Ababa, Bahir Dar, Rural areas...', required: true },
        { name: 'message', label: 'Additional Information', type: 'textarea', placeholder: 'Tell us about your interests, experience, and what motivates you to volunteer...', required: false }
      ]
    },
    'transparent-donation-portal': {
      title: 'Transparent Donation Portal',
      icon: <Heart className="w-8 h-8 text-red-500" />,
      description: 'Support verified NGOs with complete transparency and impact tracking.',
      fields: [
        { name: 'name', label: 'Full Name', type: 'text', required: true },
        { name: 'email', label: 'Email Address', type: 'email', required: true },
        { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
        { name: 'organization', label: 'Organization Name', type: 'text', required: false },
        { name: 'donationAmount', label: 'Donation Amount (ETB)', type: 'select', options: ['1,000 - 5,000', '5,000 - 10,000', '10,000 - 25,000', '25,000 - 50,000', '50,000+', 'Custom'], required: true },
        { name: 'cause', label: 'Preferred Cause', type: 'select', options: ['Education', 'Healthcare', 'Environment', 'Women Empowerment', 'Youth Development', 'Infrastructure', 'Emergency Relief', 'Other'], required: true },
        { name: 'transparency', label: 'Transparency Preferences', type: 'select', options: ['Real-time updates', 'Monthly reports', 'Quarterly impact reports', 'Annual summaries'], required: true },
        { name: 'message', label: 'Additional Information', type: 'textarea', placeholder: 'Tell us about your donation goals, preferred NGOs, or specific projects you\'d like to support...', required: false }
      ]
    },
    'civic-issue-reporter': {
      title: 'Civic Issue Reporter',
      icon: <Mic className="w-8 h-8 text-green-600" />,
      description: 'Report and track local problems with photo evidence and real-time status updates.',
      fields: [
        { name: 'name', label: 'Full Name', type: 'text', required: true },
        { name: 'email', label: 'Email Address', type: 'email', required: true },
        { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
        { name: 'issueType', label: 'Issue Type', type: 'select', options: ['Road & Infrastructure', 'Water & Sanitation', 'Power & Electricity', 'Healthcare Access', 'Education Facilities', 'Public Safety', 'Environmental', 'Other'], required: true },
        { name: 'urgency', label: 'Urgency Level', type: 'select', options: ['Low - General improvement', 'Medium - Affects daily life', 'High - Safety concern', 'Critical - Emergency situation'], required: true },
        { name: 'location', label: 'Issue Location', type: 'text', placeholder: 'e.g., Bole, Addis Ababa - Near Bole Airport', required: true },
        { name: 'description', label: 'Issue Description', type: 'textarea', placeholder: 'Please describe the issue in detail, including how it affects the community...', required: true },
        { name: 'message', label: 'Additional Information', type: 'textarea', placeholder: 'Any additional context, photos available, or suggestions for resolution...', required: false }
      ]
    },
    'ngo-collaboration-dashboard': {
      title: 'NGO Collaboration Dashboard',
      icon: <Building2 className="w-8 h-8 text-purple-600" />,
      description: 'Manage projects, volunteers, and showcase impact from a unified dashboard.',
      fields: [
        { name: 'name', label: 'Contact Person', type: 'text', required: true },
        { name: 'email', label: 'Email Address', type: 'email', required: true },
        { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
        { name: 'organization', label: 'NGO Name', type: 'text', required: true },
        { name: 'ngoSize', label: 'Organization Size', type: 'select', options: ['Small (1-10 staff)', 'Medium (11-50 staff)', 'Large (51-200 staff)', 'Very Large (200+ staff)'], required: true },
        { name: 'projectType', label: 'Primary Project Type', type: 'select', options: ['Education', 'Healthcare', 'Environment', 'Women Empowerment', 'Youth Development', 'Infrastructure', 'Emergency Relief', 'Research & Advocacy', 'Other'], required: true },
        { name: 'volunteerNeeds', label: 'Volunteer Needs', type: 'select', options: ['Occasional volunteers', 'Regular volunteers', 'Skilled professionals', 'Large groups', 'International volunteers'], required: true },
        { name: 'impactGoals', label: 'Impact Measurement Goals', type: 'textarea', placeholder: 'How do you currently measure and report your impact? What improvements are you seeking?', required: true },
        { name: 'message', label: 'Additional Information', type: 'textarea', placeholder: 'Tell us about your current challenges, specific needs, and how our platform can help...', required: false }
      ]
    }
  };

  const config = serviceConfigs[activeService];

  if (!isOpen || !config) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-8 py-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-50 rounded-xl">
                {config.icon}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{config.title}</h2>
                <p className="text-gray-600 mt-1">{config.description}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8">
          <div className="space-y-6">
            {config.fields.map((field, index) => (
              <div key={index} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                
                {field.type === 'textarea' ? (
                  <textarea
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleInputChange}
                    placeholder={field.placeholder}
                    required={field.required}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  />
                ) : field.type === 'select' ? (
                  <select
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleInputChange}
                    required={field.required}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                  >
                    <option value="">Select an option</option>
                    {field.options.map((option, optIndex) => (
                      <option key={optIndex} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleInputChange}
                    placeholder={field.placeholder}
                    required={field.required}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              <CheckCircle className="w-5 h-5" />
              Get Quote
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-6 p-4 bg-blue-50 rounded-xl">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-sm text-blue-800">
                <p className="font-medium">What happens next?</p>
                <p className="mt-1">We'll review your information and get back to you within 24 hours with a personalized quote and next steps.</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceQuoteForms;
