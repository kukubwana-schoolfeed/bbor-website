'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

type NewsArticle = {
  id: number
  title: string
  description: string
  date: string
  imageUrl: string
  icon: string
  useImage: boolean
}

export default function HomeNewsSection() {
  const [news, setNews] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadNews()
  }, [])

  const loadNews = async () => {
    try {
      const res = await fetch(`${API_URL}/api/news?status=Published`)
      if (res.ok) {
        const data = await res.json()
        setNews(data.slice(0, 3)) // Show only first 3 on homepage
      }
    } catch (error) {
      console.error('Failed to load news:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="scroll-section py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-600">Loading news...</p>
        </div>
      </section>
    )
  }

  if (news.length === 0) {
    return null
  }

  return (
    <section className="scroll-section py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-gray-600 text-center mb-4">BBOR Updates & Success Stories</p>
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-black">
          Recent Highlights
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((article, index) => (
            <div
              key={article.id}
              className={`bg-white rounded-lg p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer ${
                index === 1 ? 'border-4 border-primary' : ''
              }`}
            >
              {article.useImage && article.imageUrl && (
                <img src={article.imageUrl} alt={article.title} className="w-full h-48 object-cover rounded-lg mb-4" />
              )}
              {article.icon && !article.useImage && (
                <div className="text-6xl text-center mb-4">{article.icon}</div>
              )}
              <p className="text-sm text-primary font-semibold mb-3">
                {new Date(article.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              <h3 className="text-xl font-bold mb-4 text-black leading-tight">
                {article.title}
              </h3>
              <p className="text-gray-600 mb-6">{article.description}</p>
              <Link href="/news">
                <button className="text-primary font-semibold hover:underline flex items-center">
                  Read More
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/news">
            <button className="bg-primary hover:bg-primary-dark text-white font-bold text-lg px-12 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-lg">
              View All News
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
