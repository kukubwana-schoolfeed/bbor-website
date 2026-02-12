'use client'

import { useState, useEffect } from 'react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

type Story = {
  id: number
  name: string
  story: string
  imageUrl: string
}

export default function OrphanStories() {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStories()
  }, [])

  const loadStories = async () => {
    try {
      const res = await fetch(`${API_URL}/api/stories?status=Active`)
      if (res.ok) {
        const data = await res.json()
        setStories(data.slice(0, 3)) // Show only first 3 on homepage
      }
    } catch (error) {
      console.error('Failed to load stories:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="scroll-section py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-600 text-lg">Loading orphan stories...</p>
        </div>
      </section>
    )
  }

  if (stories.length === 0) {
    return null
  }

  return (
    <section className="scroll-section py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-gray-600 text-center mb-4">Their Stories</p>
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-black">
          Lives We've Transformed
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <div
              key={story.id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-80">
                <img
                  src={story.imageUrl}
                  alt={story.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h3 className="text-2xl font-bold text-white">{story.name}</h3>
                </div>
              </div>

              <div className="p-6">
                <p className="text-gray-700 leading-relaxed line-clamp-4">
                  {story.story}
                </p>
                <a
                  href="/about"
                  className="inline-block mt-4 text-primary font-semibold hover:underline"
                >
                  Read Full Story →
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/about"
            className="inline-block bg-primary hover:bg-primary-dark text-white font-bold text-lg px-12 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Read More Stories
          </a>
        </div>
      </div>
    </section>
  )
}
