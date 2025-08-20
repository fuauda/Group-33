"use client"
import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Plus, Search, ThumbsUp, MessageCircle, User, ChevronDown, Filter } from "lucide-react"
import FooterBlock from "../../components/ui/footer"
import { getAuthToken, getCurrentUser, clearAuthToken } from "../../lib/api"

const categoryStyles = {
  General: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  Announcements: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  Help: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  Ideas: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  Events: "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300",
}

const defaultCategories = ["General", "Announcements", "Help", "Ideas", "Events"]

const initialThreads = [
  {
    id: 1,
    title: "How can we improve waste collection in our neighborhood?",
    body: "Looking for practical suggestions and volunteer initiatives to reduce litter and improve collection schedules.",
    tags: ["Waste", "Cleanup", "Civic"],
    likes: 24,
    comments: 12,
    author: "Aster T.",
    category: "Ideas",
    time: "2h ago",
  },
  {
    id: 2,
    title: "Monthly community meet-up – October Planning",
    body: "Share agenda items and topics you want to discuss in our next community connect session.",
    tags: ["Meetup", "Planning"],
    likes: 10,
    comments: 7,
    author: "Dawit G.",
    category: "Events",
    time: "5h ago",
  },
  {
    id: 3,
    title: "Seeking volunteers for school renovation project",
    body: "We are organizing a weekend paint and repair event at the local primary school.",
    tags: ["Volunteer", "Education"],
    likes: 31,
    comments: 18,
    author: "Mimi A.",
    category: "Announcements",
    time: "1d ago",
  },
  {
    id: 4,
    title: "Where to report broken streetlights?",
    body: "I noticed several broken lights on Arat Kilo street. What's the best channel to report?",
    tags: ["Safety", "Reporting"],
    likes: 8,
    comments: 5,
    author: "Samuel K.",
    category: "Help",
    time: "1d ago",
  },
]

export default function DiscussionPage() {
  const router = useRouter()
  const [threads, setThreads] = useState(initialThreads)
  const [visibleCount, setVisibleCount] = useState(8)
  const [showComposer, setShowComposer] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("Newest")
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("General")
  const [body, setBody] = useState("")
  const composerRef = useRef(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")
  const [toasts, setToasts] = useState([])

  function showToast(message, variant = "info") {
    const id = Date.now() + Math.random()
    setToasts((cur) => [...cur, { id, message, variant }])
    setTimeout(() => {
      setToasts((cur) => cur.filter((t) => t.id !== id))
    }, 2500)
  }

  useEffect(() => {
    const hasToken = !!getAuthToken()
    setIsLoggedIn(hasToken)
    if (hasToken) {
      getCurrentUser().then((u) => {
        if (u && (u.username || u.firstName)) {
          setUsername(u.username || u.firstName)
        } else {
          clearAuthToken()
          setIsLoggedIn(false)
        }
      }).catch(() => {})
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#start") {
      if (!getAuthToken()) {
        showToast("Please log in to start a discussion.", "warning")
      } else {
        setShowComposer(true)
        setTimeout(() => composerRef.current?.scrollIntoView({ behavior: "smooth" }), 0)
      }
    }
  }, [])

  const filteredSortedThreads = useMemo(() => {
    let list = [...threads]

    if (selectedCategory !== "All") {
      list = list.filter((t) => t.category === selectedCategory)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase()
      list = list.filter((t) =>
        t.title.toLowerCase().includes(q) ||
        t.body.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q))
      )
    }
    if (sortBy === "Most Active") {
      list.sort((a, b) => b.comments - a.comments)
    } else if (sortBy === "Trending") {
      list.sort((a, b) => b.likes - a.likes)
    } else {
      list.sort((a, b) => (a.id < b.id ? 1 : -1))
    }
    return list
  }, [threads, selectedCategory, searchQuery, sortBy])

  const visibleThreads = filteredSortedThreads.slice(0, visibleCount)

  const trendingHashtags = useMemo(() => {
    const tagCount = new Map()
    threads.forEach((t) => t.tags.forEach((tag) => tagCount.set(tag, (tagCount.get(tag) || 0) + 1)))
    return Array.from(tagCount.entries()).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([tag]) => tag)
  }, [threads])

  function handleCreateThread(e) {
    e.preventDefault()
    if (!getAuthToken()) {
      showToast("Please log in to post a discussion.", "warning")
      return
    }
    if (!title.trim() || !body.trim()) return
    const newThread = {
      id: Date.now(),
      title: title.trim(),
      body: body.trim(),
      tags: [],
      likes: 0,
      comments: 0,
      author: "You",
      category,
      time: "Just now",
    }
    setThreads((cur) => [newThread, ...cur])
    setTitle("")
    setBody("")
    setCategory("General")
    setShowComposer(false)
    router.push(`/discussion/${newThread.id}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((t) => (
          <div key={t.id} className={`px-4 py-3 rounded-lg shadow-md text-sm ${t.variant === "warning" ? "bg-amber-100 text-amber-800 border border-amber-200" : "bg-gray-800 text-white"}`}>
            {t.message}
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-800/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Community Discussions</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Share ideas, ask for help, and collaborate with your community.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative hidden sm:block">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} type="text" placeholder="Search topics..." className="w-72 pl-9 pr-3 py-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 outline-none" />
              </div>
              <button
                onClick={() => {
                  if (!getAuthToken()) {
                    showToast("Please log in to start a discussion.", "warning")
                    return
                  }
                  setShowComposer(true)
                  setTimeout(() => composerRef.current?.scrollIntoView({ behavior: "smooth" }), 0)
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 text-white px-4 py-2 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4" /> New Post
              </button>
              {isLoggedIn ? (
                <div className="hidden sm:flex items-center gap-2 rounded-full bg-gray-100 dark:bg-gray-700 px-3 py-1.5">
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-semibold">{(username?.[0] || 'U').toUpperCase()}</div>
                  <span className="text-sm text-gray-800 dark:text-gray-200">{username || 'User'}</span>
                </div>
              ) : (
                <Link href="/auth/login" className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">Login</Link>
              )}
            </div>
          </div>
          {/* Mobile search */}
          <div className="mt-4 sm:hidden">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} type="text" placeholder="Search topics..." className="w-full pl-9 pr-3 py-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 outline-none" />
            </div>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: categories + filters */}
          <aside className="lg:col-span-3 space-y-4">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Categories</h3>
              <div className="space-y-2">
                {['All', ...defaultCategories].map((c) => (
                  <button key={c} onClick={() => setSelectedCategory(c)} className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm ${selectedCategory === c ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/40'}`}>
                    <span>{c}</span>
                    {c !== 'All' && <span className={`ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs ${categoryStyles[c]}`}>{c}</span>}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Sort & Filter</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-500 dark:text-gray-400">Sort by</label>
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="mt-1 w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200">
                    <option>Newest</option>
                    <option>Most Active</option>
                    <option>Trending</option>
                  </select>
                </div>
                <div className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <Filter className="w-4 h-4" /> Additional filters coming soon
                </div>
              </div>
            </div>
          </aside>

          {/* Center: feed */}
          <main className="lg:col-span-6 space-y-4">
            {/* Composer */}
            {showComposer && (
              <div id="start" ref={composerRef} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="font-semibold text-gray-900 dark:text-white">Create a new post</span>
                  <button onClick={() => setShowComposer(false)} className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">Close</button>
                </div>
                <form onSubmit={handleCreateThread} className="px-4 pb-4 space-y-3">
                  <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Title" className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200" />
                  <div className="flex items-center gap-3">
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200">
                      {defaultCategories.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={5} placeholder="Write your post..." className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200" />
                  <div className="flex justify-end">
                    <button type="submit" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                      <Plus className="w-4 h-4" /> Post
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Feed */}
            <div className="space-y-3">
              {visibleThreads.map((t) => (
                <Link
                  key={t.id}
                  href={`/discussion/${t.id}`}
                  onClick={(e) => {
                    if (!getAuthToken()) {
                      e.preventDefault()
                      showToast("Please log in to view discussions.", "warning")
                    }
                  }}
                  className="block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${categoryStyles[t.category]}`}>{t.category}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{t.time}</span>
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">{t.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">{t.body}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {t.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200">#{tag}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
                      <span className="inline-flex items-center gap-1"><ThumbsUp className="w-4 h-4" /> {t.likes}</span>
                      <span className="inline-flex items-center gap-1"><MessageCircle className="w-4 h-4" /> {t.comments}</span>
                      <span className="inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400"><User className="w-4 h-4" /> {t.author}</span>
                    </div>
                  </div>
                </Link>
              ))}
              {visibleCount < filteredSortedThreads.length && (
                <div className="flex justify-center pt-2">
                  <button onClick={() => setVisibleCount((c) => c + 6)} className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600">Load more</button>
                </div>
              )}
            </div>
          </main>

          {/* Right: trending & info */}
          <aside className="lg:col-span-3 space-y-4">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Trending Hashtags</h3>
              <div className="flex flex-wrap gap-2">
                {trendingHashtags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200">#{tag}</span>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Community Rules</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-300 list-disc pl-5 space-y-1">
                <li>Be respectful and constructive</li>
                <li>No spam or self-promotion</li>
                <li>Stay on topic and add value</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>

      <FooterBlock />
    </div>
  )
}