"use client"
import { useMemo, useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, MessageCircle, ThumbsUp, User } from "lucide-react"
import { getAuthToken } from "../../../lib/api"

const categoryStyles = {
  General: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  Announcements: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  Help: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  Ideas: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  Events: "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300",
}

function ReplyItem({ reply, onReply, onLike }) {
  const [showBox, setShowBox] = useState(false)
  const [text, setText] = useState("")
  return (
    <div className="pl-4 border-l border-gray-200 dark:border-gray-700">
      <div className="py-3">
        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
          <User className="w-4 h-4" /> {reply.author} • {reply.time}
        </div>
        <div className="mt-1 text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{reply.text}</div>
        <div className="mt-2 flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
          <button onClick={() => onLike(reply.id)} className="inline-flex items-center gap-1 hover:text-blue-600">
            <ThumbsUp className="w-4 h-4" /> {reply.likes}
          </button>
          <button onClick={() => setShowBox((s) => !s)} className="inline-flex items-center gap-1 hover:text-blue-600">
            <MessageCircle className="w-4 h-4" /> Reply
          </button>
        </div>
        {showBox && (
          <div className="mt-2">
            <textarea value={text} onChange={(e) => setText(e.target.value)} rows={3} placeholder="Write a reply..." className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200" />
            <div className="flex justify-end mt-2">
              <button onClick={() => { if (text.trim()) { onReply(reply.id, text.trim()); setText(""); setShowBox(false) } }} className="px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Post reply</button>
            </div>
          </div>
        )}
      </div>
      {reply.children?.length > 0 && (
        <div className="space-y-2">
          {reply.children.map((child) => (
            <ReplyItem key={child.id} reply={child} onReply={onReply} onLike={onLike} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function ThreadPage() {
  const params = useParams()
  const router = useRouter()
  const threadId = params?.id
  const [toasts, setToasts] = useState([])
  function showToast(message, variant = "info") {
    const id = Date.now() + Math.random()
    setToasts((cur) => [...cur, { id, message, variant }])
    setTimeout(() => setToasts((cur) => cur.filter((t) => t.id !== id)), 2500)
  }

  const [thread, setThread] = useState(() => ({
    id: threadId,
    title: "New Community Discussion",
    body: "Thanks for starting the discussion! Others can now reply and react.",
    author: "You",
    time: "Just now",
    category: "General",
    tags: ["Community", "Welcome"],
    likes: 0,
  }))
  const [replies, setReplies] = useState([
    { id: 1, author: "Aster T.", time: "2h ago", likes: 3, text: "Great topic! I think organizing neighborhood meetups could help.", children: [
      { id: 2, author: "Mimi A.", time: "1h ago", likes: 1, text: "Agree, and we could create a shared calendar.", children: [] },
    ]},
    { id: 3, author: "Samuel K.", time: "45m ago", likes: 0, text: "We should also bring local officials to the conversation.", children: [] },
  ])

  const totalReplies = useMemo(() => {
    function count(list) { return list.reduce((acc, r) => acc + 1 + (r.children ? count(r.children) : 0), 0) }
    return count(replies)
  }, [replies])

  function handleRootReply(text) {
    const newReply = { id: Date.now(), author: "You", time: "Just now", likes: 0, text, children: [] }
    setReplies((cur) => [newReply, ...cur])
  }

  function handleNestedReply(parentId, text) {
    const addReply = (list) => list.map((r) => {
      if (r.id === parentId) {
        const child = { id: Date.now(), author: "You", time: "Just now", likes: 0, text, children: [] }
        return { ...r, children: [child, ...(r.children || [])] }
      }
      return { ...r, children: r.children ? addReply(r.children) : [] }
    })
    setReplies((cur) => addReply(cur))
  }

  function likeReply(targetId) {
    const inc = (list) => list.map((r) => {
      if (r.id === targetId) return { ...r, likes: r.likes + 1 }
      return { ...r, children: r.children ? inc(r.children) : [] }
    })
    setReplies((cur) => inc(cur))
  }

  const [replyText, setReplyText] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    setIsLoggedIn(!!getAuthToken())
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Toasts */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((t) => (
          <div key={t.id} className={`px-4 py-3 rounded-lg shadow-md text-sm ${t.variant === "warning" ? "bg-amber-100 text-amber-800 border border-amber-200" : "bg-gray-800 text-white"}`}>
            {t.message}
          </div>
        ))}
      </div>
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <ArrowLeft className="w-5 h-5" /> Back
            </button>
            <div className="flex items-center gap-3">
              <Link href="/discussion" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">All discussions</Link>
              {isLoggedIn ? (
                <div className="flex items-center gap-2 rounded-full bg-gray-100 dark:bg-gray-700 px-3 py-1.5">
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-semibold">U</div>
                  <span className="text-sm text-gray-800 dark:text-gray-200 hidden sm:block">You</span>
                </div>
              ) : (
                <Link href="/auth/login" className="px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700">Login</Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main post */}
        <article className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs px-2 py-0.5 rounded-full ${categoryStyles[thread.category]}`}>{thread.category}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{thread.time}</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{thread.title}</h1>
          <div className="mt-1 text-sm text-gray-500 dark:text-gray-400 inline-flex items-center gap-2">
            <User className="w-4 h-4" /> {thread.author}
          </div>
          <div className="mt-4 text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{thread.body}</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {thread.tags.map((tag) => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200">#{tag}</span>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-4 text-gray-600 dark:text-gray-300">
            <button onClick={() => setThread((t) => ({ ...t, likes: t.likes + 1 }))} className="inline-flex items-center gap-1 hover:text-blue-600">
              <ThumbsUp className="w-4 h-4" /> {thread.likes}
            </button>
            <div className="inline-flex items-center gap-1 text-sm">
              <MessageCircle className="w-4 h-4" /> {totalReplies} Replies
            </div>
          </div>
        </article>

        {/* Replies */}
        <section className="mt-6 space-y-3">
          {replies.map((r) => (
            <ReplyItem key={r.id} reply={r} onReply={handleNestedReply} onLike={likeReply} />
          ))}
        </section>

        {/* Reply box */}
        <div className="mt-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
          <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">Add a reply</div>
          <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} rows={4} placeholder="Share your thoughts..." className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200" />
          <div className="flex justify-end mt-2">
            <button onClick={() => {
              if (!getAuthToken()) {
                showToast("Please log in to reply.", "warning")
                return
              }
              if (replyText.trim()) { handleRootReply(replyText.trim()); setReplyText("") }
            }} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Reply</button>
          </div>
        </div>
      </div>
    </div>
  )
}


