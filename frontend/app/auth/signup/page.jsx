"use client";
import React from "react";
import MultiStepForm from "../../../components/ui/multi-step-form";
import { apiFetch } from "../../../lib/api";

const SignupPage = () => {
  const handleSubmit = async (data) => {
    try {
      // Backend expects flat address fields (address, city, zipCode), and no nested NGO on register
      const userData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        address: data.address,
        city: data.city,
        zipCode: data.zipCode,
        username: data.username,
        password: data.password,
        confirmPassword: data.confirmPassword,
      };

      // Register user first

      const res = await apiFetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.message ||
            errorData.error ||
            (Array.isArray(errorData.errors) ? errorData.errors.join("\n") : "Registration failed")
        );
      }

      const responseData = await res.json();

      if (typeof window !== "undefined" && responseData?.token) {
        localStorage.setItem("token", responseData.token);
      }

      // If NGO, create NGO profile after registration using token
      if (data.role === "ngo") {
        const ngoPayload = {
          name: data.ngoName,
          mission: data.ngoMission,
          description: data.ngoDescription || "",
          logoUrl: data.ngoLogo || "",
          contact: {
            email: data.email,
            phone: data.ngoPhone,
            website: data.ngoWebsite || "",
            address: {
              street: data.address,
              city: data.city,
              state: data.state,
              country: data.country,
              postalCode: data.zipCode,
            },
          },
        };
        const ngoRes = await apiFetch("/api/ngos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(ngoPayload),
        });
        if (!ngoRes.ok) {
          const ngoError = await ngoRes.json().catch(() => ({}));
          // Do not fail signup entirely, but inform user
          throw new Error(
            ngoError.message || ngoError.error || (Array.isArray(ngoError.errors) ? ngoError.errors.map(e => e.msg || e).join("\n") : "Failed to create NGO profile")
          );
        }
      }

      alert(
        data.role === "ngo"
          ? "Registration successful! Your NGO account is pending admin approval."
          : "Registration successful! You can now log in."
      );

      window.location.href = data.role === "ngo" ? "/auth/login" : "/";
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      alert(error.message || "Registration failed. Please try again.");
      return false;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 p-5">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-8 md:p-12">

        <div className='w-full space-y-6 sm:max-w-md'>
          <a className="inline-flex gap-2 text-sm text-muted-foreground hover:text-foreground" href="../auth/login">← Back to Login</a>
        </div>



        <h1 className="text-3xl font-bold mb-6 text-center">
          Create Your Account
        </h1>
        <p className="text-center text-black-400 mb-8">
          Join us and start your journey today!
        </p>
        <MultiStepForm
          onSubmit={handleSubmit}
          className="space-y-6"
          stepClassName="bg-blue-50 p-6 rounded-xl shadow-inner"
          inputClassName="w-full p-3 rounded-lg border border-blue-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-300 outline-none transition"
          buttonClassName="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        />
      </div>
    </div>
  );
};

export default SignupPage;
