'use client';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { apiFetch } from '../../../lib/api';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <main className="bg-background flex min-h-screen w-full flex-col items-center justify-center sm:px-4">
      <div className="w-full space-y-4 sm:max-w-md">
        <div className="text-center">
          <div className="mt-5 space-y-2">
            <h3 className="text-2xl font-bold sm:text-3xl">
              Log in to your account
            </h3>
            <p>
              Don&apos;t have an account?{' '}
              <a
                href="/auth/signup"
                className="font-medium text-rose-600 hover:text-rose-500"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>

        <div className="space-y-6 p-4 py-6 shadow sm:rounded-lg sm:p-6">
          <div className="grid grid-cols-3 gap-x-3">
            {/* Google */}
            <button
              type="button"
              aria-label="Continue with Google"
              className="hover:bg-secondary active:bg-secondary/40 flex items-center justify-center rounded-lg border py-2.5 duration-150"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_17_40)">
                  <path d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z" fill="#4285F4"/>
                  <path d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z" fill="#34A853"/>
                  <path d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z" fill="#FBBC04"/>
                  <path d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z" fill="#EA4335"/>
                </g>
                <defs>
                  <clipPath id="clip0_17_40">
                    <rect width="48" height="48" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>

            {/* X (Twitter) */}
            <button
              type="button"
              aria-label="Continue with X"
              className="hover:bg-secondary active:bg-secondary/40 flex items-center justify-center rounded-lg border py-2.5 duration-150"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 1200 1227"
                fill="currentColor"
              >
                <path d="M714.163 519.284 1160.89 0H1051.4L667.137 450.887 357.328 0H0l468.49 682.574L0 1226.89h109.492l407.48-477.453 329.7 477.453H1200L714.163 519.284Zm-144.79 169.493-47.25-67.294L149.35 79.841h162.89l302.02 430.199 47.25 67.295 394.893 562.43H893.512L569.373 688.777Z"/>
              </svg>
            </button>

            {/* Facebook */}
                <button
                      type="button"
                      aria-label="Continue with Facebook"
                      className="hover:bg-secondary active:bg-secondary/40 flex items-center justify-center rounded-lg border py-2.5 duration-150"
                    >
                      <svg width="24px" height="24px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg">
                            <title>Facebook icon</title>
                            <path d="M23.9981 11.9991C23.9981 5.37216 18.626 0 11.9991 0C5.37216 0 0 5.37216 0 11.9991C0 17.9882 4.38789 22.9522 10.1242 23.8524V15.4676H7.07758V11.9991H10.1242V9.35553C10.1242 6.34826 11.9156 4.68714 14.6564 4.68714C15.9692 4.68714 17.3424 4.92149 17.3424 4.92149V7.87439H15.8294C14.3388 7.87439 13.8739 8.79933 13.8739 9.74824V11.9991H17.2018L16.6698 15.4676H13.8739V23.8524C19.6103 22.9522 23.9981 17.9882 23.9981 11.9991Z"/>
                      </svg>
              </button>
          </div>

          <div className="relative">
            <span className="bg-secondary block h-px w-full"></span>
            <p className="absolute inset-x-0 -top-2 mx-auto inline-block w-fit px-2 text-sm">
              Or continue with
            </p>
          </div>

          {/* Email/Password Form */}
          <form
            className="space-y-5"
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              setErrorMessage('');
              try {
                const response = await apiFetch('/api/auth/login', {
                  method: 'POST',
                  body: JSON.stringify({
                    email: formData.get('email'),
                    password: formData.get('password'),
                  }),
                  headers: { 'Content-Type': 'application/json' },
                });
                if (response.ok) {
                  const data = await response.json();
                  if (typeof window !== 'undefined' && data?.token) {
                    localStorage.setItem('token', data.token);
                  }
                  window.location.href = '/';
                } else {
                  const err = await response.json().catch(() => ({}));
                  const message =
                    err?.msg ||
                    err?.error ||
                    (Array.isArray(err?.errors)
                      ? err.errors.join('\n')
                      : 'Invalid credentials');
                  setErrorMessage(message);
                }
              } catch (e) {
                setErrorMessage('Unable to reach server. Please try again.');
              }
            }}
          >
            {errorMessage && (
              <p className="text-sm text-red-600">{errorMessage}</p>
            )}

            <div>
              <label className="font-medium">Email</label>
              <input
                name="email"
                type="email"
                required
                className="mt-2 w-full rounded-lg border bg-transparent px-3 py-2 shadow-sm outline-none focus:border-rose-600"
              />
            </div>

            <div className="relative">
              <label className="font-medium">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="mt-2 w-full rounded-lg border bg-transparent px-3 py-2 shadow-sm outline-none focus:border-rose-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 mt-2 mr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff size={20} className="text-secondary" />
                  ) : (
                    <Eye size={20} className="text-secondary" />
                  )}
                </button>
              </div>
            </div>

            <button className="w-full rounded-lg bg-rose-600 px-4 py-2 font-medium text-white duration-150 hover:bg-rose-500 active:bg-rose-600">
              Sign in
            </button>
          </form>
        </div>

        <div className="text-center">
          <a href="#" className="hover:text-rose-600">
            Forgot password?
          </a>
        </div>
      </div>
    </main>
  );
}
