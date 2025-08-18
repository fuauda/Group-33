"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import DatePicker from "react-datepicker"
import { Calendar, Upload } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import "react-datepicker/dist/react-datepicker.css"

export default function AddNewBlogPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    shortDescription: "",
    fullDescription: "",
    tags: "",
    author: "",
    publishedAt: "",
  })


  

  const [images, setImages] = useState([])
  const [showDatePicker, setShowDatePicker] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleFileChange = (e) => {
  const files = Array.from(e.target.files)
  if (files.length === 0) return

  setImages((prev) => [...prev, ...files])

  // reset the input so selecting the same file again will still trigger onChange
  e.target.value = null
}


  const handleSubmit = async (e) => {
    e.preventDefault()
    const imagePaths = images.map((file) => file.name)

    const blogData = {
      ...formData,
      id: Number(formData.id),
      tags: formData.tags.split(",").map((tag) => tag.trim()),
      images: imagePaths,
    }

    console.log("New Blog:", blogData)
    router.push("/admin/blogs")
  }


  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          ✍️ Add New Blog
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="id"
              placeholder="ID"
              value={formData.id}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <input
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <textarea
            name="shortDescription"
            placeholder="Short Description"
            value={formData.shortDescription}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
            rows={3}
            required
          />
          <textarea
            name="fullDescription"
            placeholder="Full Description"
            value={formData.fullDescription}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
            rows={6}
            required
          />

          {/* File Upload */}
          <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
                    <label className="flex flex-col items-center cursor-pointer">
                        <Upload className="w-6 h-6 text-gray-500 mb-1" />
                        <span className="text-gray-600 text-sm">Upload Images</span>
                        <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                        />
                    </label>
                    {images.length > 0 && (
                        <div className="mt-3 space-y-1">
                        {images.map((file, idx) => (
                            <p
                            key={idx}
                            className="text-sm text-gray-700 bg-gray-100 p-1 rounded-md"
                            >
                            📷 {file.name}
                            </p>
                        ))}
                        </div>
                    )}
            </div>

          <input
            name="tags"
            placeholder="Tags (comma separated)"
            value={formData.tags}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            name="author"
            placeholder="Author"
            value={formData.author}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />

          {/* Published Date with Icon */}
          <div>
            <label className="block font-semibold mb-2 text-gray-700">
              Published Date
            </label>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => setShowDatePicker((prev) => !prev)}
                className="p-3 border rounded-lg bg-white shadow-sm hover:bg-gray-50 flex items-center gap-2 text-gray-700 cursor-pointer"
              >
                <Calendar className="w-5 h-5 text-gray-600" />
                {formData.publishedAt ? (
                  <span className="text-sm">
                    {new Date(formData.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                ) : (
                  <span className="text-sm text-gray-400">Pick a date</span>
                )}
              </button>

              <AnimatePresence>
                {showDatePicker && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="z-50"
                  >
                    <DatePicker
                      selected={
                        formData.publishedAt
                          ? new Date(formData.publishedAt)
                          : null
                      }
                      onChange={(date) => {
                        setFormData({
                          ...formData,
                          publishedAt: date.toISOString().split("T")[0],
                        })
                        setShowDatePicker(false)
                      }}
                      inline
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-700 transition cursor-pointer"
          >
            🚀 Save Blog
          </button>
        </form>
      </div>
    </div>
  )
}