'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import BottomSection from '@/components/BottomSection'
import WhatsAppButton from '@/components/WhatsAppButton'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

type NewsArticle = {
  id: number
  title: string
  description: string
  date: string
  imageUrl: string
  icon: string
  useImage: boolean
  status: string
}

export default function NewsPage() {
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
        setNews(data)
      }
    } catch (error) {
      console.error('Failed to load news:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-20">
      <WhatsAppButton />

      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <Image
          src="/images/IMG-20230715-WA0004.png"
          alt="BBOR News"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-dark/90"></div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">News & Updates</h1>
            <p className="text-xl md:text-2xl">Latest stories from BBOR</p>
          </div>
        </div>
      </section>

      {/* News Articles */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Loading news articles...</p>
            </div>
          ) : news.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-500 text-lg">No news articles published yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map(article => (
                <div key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition">
                  {article.useImage && article.imageUrl ? (
                    <img src={article.imageUrl} alt={article.title} className="w-full h-56 object-cover" />
                  ) : article.icon ? (
                    <div className="h-56 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                      <span className="text-8xl">{article.icon}</span>
                    </div>
                  ) : (
                    <div className="h-56 bg-gradient-to-r from-primary to-primary-dark"></div>
                  )}

                  <div className="p-6">
                    <p className="text-sm text-primary font-semibold mb-2">
                      {new Date(article.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <h3 className="text-2xl font-bold mb-3 text-black leading-tight">
                      {article.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {article.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <BottomSection />
    </div>
  )
}
