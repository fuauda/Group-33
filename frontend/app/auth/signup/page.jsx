"use client";
import React from 'react'
import MultiStepForm from '../../../components/ui/multi-step-form'
import { apiFetch } from '../../../lib/api'

const SignupPage = () => {
  const handleSubmit = async (data) => {
    try {
      // Prepare the base user data
      const userData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        username: data.username,
        password: data.password,
        confirmPassword: data.confirmPassword,
        role: data.role || 'individual', // Default to 'individual' if not specified
        address: {
          street: data.address,
          city: data.city,
          state: data.state,
          country: data.country,
          zipCode: data.zipCode,
        },
      };

      // If this is an NGO registration, prepare the NGO data
      if (data.role === 'ngo') {
        userData.ngo = {
          name: data.ngoName,
          mission: data.ngoMission,
          description: data.ngoDescription || '',
          contact: {
            email: data.email,
            phone: data.ngoPhone,
            website: data.ngoWebsite || '',
          },
          address: {
            street: data.address,
            city: data.city,
            state: data.state,
            country: data.country,
            zipCode: data.zipCode,
          },
          logoUrl: data.ngoLogo || '',
          status: 'pending', // New NGOs are pending admin approval
        };
      }

      // Make the API call to register the user
      const res = await apiFetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.message || 
          errorData.error || 
          (errorData.errors ? errorData.errors.join('\n') : 'Registration failed')
        );
      }

      const responseData = await res.json();
      
      // Save the token if available
      if (typeof window !== 'undefined' && responseData?.token) {
        localStorage.setItem('token', responseData.token);
      }

      // Show success message
      alert(
        data.role === 'ngo' 
          ? 'Registration successful! Your NGO account is pending admin approval.'
          : 'Registration successful! You can now log in.'
      );

      // Redirect based on user type
      window.location.href = data.role === 'ngo' ? '/auth/login' : '/';
      return true;
      
    } catch (error) {
      console.error('Registration error:', error);
      alert(error.message || 'Registration failed. Please try again.');
      return false;
    }
  };

  return <MultiStepForm onSubmit={handleSubmit} />
}

export default SignupPage