"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { blogs as initialBlogs } from "../../blog/data"

export default function AdminBlogPostPage() {
  const [blogs, setBlogs] = useState(initialBlogs)

  // Delete handler
  const handleDelete = (id) => {
    setBlogs(blogs.filter((blog) => blog.id !== id))
  }

  // Edit handler (for now just updates title to show example)
  const handleEdit = (id) => {
    const newTitle = prompt("Enter new title:")
    if (!newTitle) return
    setBlogs(
      blogs.map((blog) =>
        blog.id === id ? { ...blog, title: newTitle } : blog
      )
    )
  }

  // Add handler
  const handleAdd = () => {
    const title = prompt("Enter blog title:")
    const shortDescription = prompt("Enter short description:")
    const image = prompt("Enter image URL:")

    if (!title || !shortDescription || !image) return

    const newBlog = {
      id: blogs.length + 1,
      title,
      shortDescription,
      fullDescription: "Full description here...",
      author: "Admin",
      publishedAt: new Date().toISOString(),
      tags: ["new"],
      images: [image],
    }

    setBlogs([newBlog, ...blogs])
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Blog Posts</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="border rounded-lg overflow-hidden bg-white shadow-sm"
          >
            <Image
              src={blog.images[0]}
              alt={blog.title}
              width={400}
              height={250}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="font-semibold">{blog.title}</h2>
              <p className="text-sm text-gray-600 line-clamp-2">
                {blog.shortDescription}
              </p>
              <div className="flex gap-3 mt-3">
                <Link
                  href={`/blog/${blog.id}`}
                  className="text-blue-600 text-sm hover:underline"
                >
                  View →
                </Link>
                <button
                  onClick={() => handleEdit(blog.id)}
                  className="text-yellow-600 text-sm hover:underline cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog.id)}
                  className="text-red-600 text-sm hover:underline cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Add Blog Card */}
                <Link
          href="./blogPost/new"
          className="border rounded-lg overflow-hidden bg-white shadow-sm flex flex-col items-center justify-center hover:bg-gray-50"
        >
          <div className="flex-1 flex items-center justify-center w-full h-48 bg-gray-100">
            <span className="text-3xl font-bold text-gray-400">+</span>
          </div>
          <div className="p-4 text-center">
            <h2 className="font-semibold text-gray-700">Add New Blog</h2>
            <p className="text-sm text-gray-500">Click to create a new blog post</p>
          </div>
        </Link>
    </div>
    </div>
  )
}
