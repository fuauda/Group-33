"use client"
import { useState } from "react"

export default function Translator() {
  const [text, setText] = useState("")
  const [translated, setTranslated] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleTranslate = async () => {
    const trimmed = text.trim()
    if (!trimmed) return
    setLoading(true)
    setError("")

    try {
      const res = await fetch("https://libretranslate.de/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          q: trimmed,
          source: "en",
          target: "am",
          format: "text",
        }),
      })

      if (!res.ok) {
        throw new Error(`Translation request failed (${res.status})`)
      }

      const data = await res.json()
      setTranslated(data?.translatedText || "")
    } catch (err) {
      console.error("Translation error:", err)
      setError("Error translating text. Please try again.")
      setTranslated("")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-3">English → Amharic Translator</h3>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type in English..."
        rows={4}
        className="w-full resize-y rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 text-sm outline-none focus:ring-2 focus:ring-blue-600"
      />
      <div className="mt-3 flex items-center gap-2">
        <button
          onClick={handleTranslate}
          disabled={loading}
          className="inline-flex items-center rounded-full bg-black text-white dark:bg-blue-600 px-4 py-2 text-sm disabled:opacity-50"
        >
          {loading ? "Translating..." : "Translate"}
        </button>
        {error && <span className="text-sm text-red-600">{error}</span>}
      </div>
      {translated && (
        <div className="mt-4">
          <div className="text-sm font-medium">Amharic:</div>
          <p className="mt-1 whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200">{translated}</p>
        </div>
      )}
    </div>
  )
}


