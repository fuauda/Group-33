"use client"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "./dialog"
import Translator from "./translator"
import { getAuthToken, getCurrentUser, logoutRequest, clearAuthToken } from "../../lib/api"

const navItems = [
  { id: 0, text: "Home", link: "#home" },
  { id: 1, text: "Services", link: "#services" },
  { id: 2, text: "News", link: "#news" },
  { id: 3, text: "FAQs", link: "#FAQs" },
  { id: 5, text: "Contact", link: "#contact-support" },
  { id: 6, text: "Discussion", link: "/discussion" },
]

const Navbar = () => {
  const [openNavbar, setOpenNavbar] = useState(false)
  const toggleNavbar = () => setOpenNavbar((s) => !s)
  const closeNavbar = () => setOpenNavbar(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const hasToken = !!getAuthToken()
    setIsLoggedIn(hasToken)
    if (hasToken) {
      getCurrentUser()
        .then((user) => {
          if (user && (user.username || user.firstName)) {
            setUsername(user.username || user.firstName)
          } else {
            setIsLoggedIn(false)
            clearAuthToken()
          }
        })
        .catch(() => {})
    }
  }, [])

  useEffect(() => {
    function handleClickOutside(event) {
      if (!event.target.closest(".user-menu")) {
        setMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  async function handleLogout() {
    try {
      await logoutRequest()
    } finally {
      clearAuthToken()
      window.location.href = "/auth/login"
    }
  }

  return (
    <>
      <div
        onClick={closeNavbar}
        aria-hidden="true"
        className={`fixed bg-gray-800/40 inset-0 z-30 ${openNavbar ? "flex lg:hidden" : "hidden"}`}
      />
      <header className="sticky top-0 w-full flex items-center h-20 border-b border-b-gray-100 dark:border-b-gray-900 z-40 bg-white/80 dark:bg-gray-950/80 backdrop-filter backdrop-blur-xl">
        <nav className="relative mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 flex gap-x-5 justify-between items-center">
          <div className="flex items-center min-w-max">
            <Link href="#home" className="font-semibold flex items-center gap-x-2">
              <span className="flex">
                <span className="w-3 h-6 rounded-l-full flex bg-blue-600" />
                <span className="w-3 h-6 rounded-r-full flex bg-teal-400 mt-2" />
              </span>
              <span className="text-lg text-gray-700 dark:text-gray-300">CommunityConnect</span>
            </Link>
          </div>

          <div
            className={`
              absolute top-full left-0 bg-white dark:bg-gray-950 lg:bg-transparent border-b border-gray-200 dark:border-gray-800 py-8 lg:py-0 px-5 sm:px-10 md:px-12 lg:px-0 lg:border-none w-full lg:top-0 lg:relative lg:flex lg:justify-between duration-300 ease-linear
              ${openNavbar ? "" : "translate-y-10 opacity-0 invisible lg:visible lg:translate-y-0 lg:opacity-100"}
            `}
          >
            <ul className="flex flex-col lg:flex-row gap-6 lg:items-center text-gray-700 dark:text-gray-300 lg:w-full lg:justify-center">
              {navItems.map((navItem) => (
                <li key={navItem.id}>
                  <Link
                    href={navItem.link}
                    className="relative py-2.5 duration-300 ease-linear hover:text-blue-600 after:absolute after:w-full after:left-0 after:bottom-0 after:h-px after:rounded-md after:origin-left after:ease-linear after:duration-300 after:scale-x-0 hover:after:scale-100 after:bg-blue-600"
                  >
                    {navItem.text}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:min-w-max mt-10 lg:mt-0">
              {/* <Link
                href="/discussion#start"
                className="px-6 py-3 duration-300 ease-linear flex justify-center w-full sm:w-auto border border-emerald-600 text-white bg-emerald-600 hover:bg-emerald-700 rounded-full"
              >
                Start a Discussion
              </Link> */}
              <Dialog>
                <DialogTrigger asChild></DialogTrigger>
                <DialogContent className="max-w-xl">
                  <DialogTitle>Translate</DialogTitle>
                  <Translator />
                </DialogContent>
              </Dialog>
              {isLoggedIn ? (
                <div className="relative user-menu">
                  {/* Button */}
                  <button
                    onClick={() => setMenuOpen((v) => !v)}
                    className="flex items-center gap-2 rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    {/* Avatar circle */}
                    <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-semibold">
                      {(username?.[0] || "U").toUpperCase()}
                    </div>

                    {/* Username */}
                    <span className="text-sm text-gray-800 dark:text-gray-200 hidden sm:block">
                      {username || "User"}
                    </span>

                    {/* Dropdown arrow */}
                    <svg
                      className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
                        menuOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown */}
                  {menuOpen && (
                    <div className="absolute right-0 mt-2 w-40 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg z-50">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer"
                      >
                        Log out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/auth/login"
                  className="px-6 py-3 duration-300 ease-linear flex justify-center w-full sm:w-auto border border-blue-600 text-white bg-blue-600 hover:bg-blue-800 rounded-full"
                >
                  Login
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center lg:hidden">
            <button
              onClick={toggleNavbar}
              aria-label="toggle navbar"
              className="flex flex-col justify-center items-center cursor-pointer outline-none border-r border-r-gray-200 dark:border-r-gray-800 pr-3 py-3"
            >
              <span
                aria-hidden="true"
                className={`h-0.5 w-6 rounded bg-gray-800 dark:bg-gray-200 transition duration-300 ${
                  openNavbar ? "rotate-45 translate-y-[7px]" : ""
                }`}
              />
              <span
                aria-hidden="true"
                className={`h-0.5 w-6 my-1 rounded bg-gray-800 dark:bg-gray-200 transition duration-300 ${
                  openNavbar ? "opacity-0" : ""
                }`}
              />
              <span
                aria-hidden="true"
                className={`h-0.5 w-6 rounded bg-gray-800 dark:bg-gray-200 transition duration-300 ${
                  openNavbar ? "-rotate-45 -translate-y-[7px]" : ""
                }`}
              />
            </button>
          </div>
        </nav>
      </header>
    </>
  )
}

export default function HeroSection() {
  return (
    <>
      <Navbar />
      <section className="bg-blue-50 dark:bg-gray-950">
        <div className="absolute left-0 top-20 w-40 aspect-video bg-gradient-to-br from-blue-600 to-sky-400 rounded-full blur-3xl opacity-60" />
        <div className="relative mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 py-24 lg:py-4 flex flex-col lg:flex-row lg:items-center gap-10">
          <div className="lg:w-1/2 text-center lg:text-left max-w-2xl md:max-w-3xl mx-auto flex flex-col md-justify-center">
            <h1 className="font-semibold text-teal-950 dark:text-white font-display text-4xl md:text-5xl lg:text-6xl">
              Empower Communities with Civic{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-br from-teal-600 to-blue-600">
                Impact!
              </span>{" "}
              Your Platform for Change.
            </h1>

            <p className="mt-8 text-gray-700 dark:text-gray-300 mx-auto lg:mx-0 max-w-xl">
              Engage, Volunteer, Donate, and Transform Your Community.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-4 lg:max-w-none max-w-md mx-auto lg:mx-0">
              <Link
                href="/auth/signup"
                className="flex items-center justify-center py-3 px-6 border-2 border-transparent shadow-lg bg-blue-600 transition ease-linear hover:bg-blue-800 active:bg-blue-700 text-white rounded-full"
              >
                Get Started
              </Link>
            </div>

            <div className="flex items-center gap-1 gap-x-2 mt-10 justify-center lg:justify-start py-5">
              <div className="flex items-center -space-x-2">
                <Image
                  src="/images/homepage-1.png"
                  height={1700}
                  width={2250}
                  alt="listener avatar"
                  className="w-10 h-10 object-cover rounded-full ring-4 ring-white dark:ring-gray-950"
                />
                <Image
                  src="/images/homepage-2.png"
                  height={1700}
                  width={2250}
                  alt="listener avatar"
                  className="w-10 h-10 object-cover rounded-full ring-4 ring-white dark:ring-gray-950"
                />
                <Image
                  src="/images/homepage-3.jpg"
                  height={1700}
                  width={2250}
                  alt="listener avatar"
                  className="w-10 h-10 object-cover rounded-full ring-4 ring-white dark:ring-gray-950"
                />
              </div>

              <div className="flex flex-col justify-start items-start">
                <span className="font-semibold text-lg text-gray-800 dark:text-gray-200">+12k</span>
                <span className="text-gray-600 dark:text-gray-300 text-sm">Lovely users</span>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 relative lg:h-auto max-w-2xl md:max-w-3xl mx-auto hidden md:flex justify-end">
            <div className="relative w-full h-full flex items-center aspect-square overflow-hidden lg:aspect-auto">
              <Image
                src="/community.png"
                width={1266}
                height={1224}
                alt="woman at virtual meetup"
                className="w-full relative h-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
