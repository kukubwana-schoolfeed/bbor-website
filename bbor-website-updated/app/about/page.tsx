'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import BottomSection from '@/components/BottomSection'
import WhatsAppButton from '@/components/WhatsAppButton'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

type Story = {
  id: number
  name: string
  story: string
  imageUrl: string
  status: string
}

export default function About() {
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
        setStories(data)
      }
    } catch (error) {
      console.error('Failed to load stories:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-20">
      <WhatsAppButton />

      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden group">
        <Image
          src="/images/IMG-20230715-WA0004.png"
          alt="BBOR Graduation"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-dark/90"></div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">About BBOR</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Transforming lives through love, education, and support since 2017
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-black">Our Mission</h2>
            <p className="text-2xl text-primary font-semibold mb-8">
              "Preparations towards happy endings for orphans and vulnerable children in Zambia"
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              At Beautiful Beginnings Outreach Relief (BBOR), we are committed to transforming the lives of orphans and vulnerable children in Zambia. Since our founding in 2017, we have dedicated ourselves to providing hope, security and a brighter future for these children.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6 text-black">Who We Are</h3>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                Beautiful Beginnings Outreach Relief (BBOR) is a non-political, non-profit organization registered under the laws of Zambia. We hold a strong belief that every orphan and vulnerable child deserves a "beautiful beginning" to their life, which will set them on a path to a secure and dignified future.
              </p>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                Our work is driven by our sincere belief that caring for orphaned and vulnerable children is a communal responsibility. With this in mind, we offer comprehensive support to these children, ensuring they have access to the same opportunities as others.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Currently, BBOR provides care and support for over 350 orphaned and vulnerable children. Our dedicated team of 30 staff members, which includes doctors, educators, caregivers and volunteers, ensures that each child receives personalized care, nutritious meals, quality education and recreational activities.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/images/IMG-20240924-WA0031-300x300.png"
                alt="BBOR Team"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-black">What We Do</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-2xl font-bold mb-3 text-black">Shelter</h3>
              <p className="text-gray-700">Providing housing for 230 orphans year-round in a safe, loving environment.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">🍽️</div>
              <h3 className="text-2xl font-bold mb-3 text-black">Nutrition</h3>
              <p className="text-gray-700">Offering nutritious meals to 350 orphans and vulnerable children daily.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-2xl font-bold mb-3 text-black">Education</h3>
              <p className="text-gray-700">Delivering quality education and Islamic studies to over 350 children with a 100% pass rate.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">🏥</div>
              <h3 className="text-2xl font-bold mb-3 text-black">Healthcare</h3>
              <p className="text-gray-700">Ensuring access to medical, dental, and psychological care for all children.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">🛠️</div>
              <h3 className="text-2xl font-bold mb-3 text-black">Vocational Training</h3>
              <p className="text-gray-700">Equipping children with practical skills for future self-sufficiency.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">📖</div>
              <h3 className="text-2xl font-bold mb-3 text-black">Hafiz Programs</h3>
              <p className="text-gray-700">Supporting children in memorizing the Quran alongside their education.</p>
            </div>
          </div>

          <div className="bg-primary text-white rounded-lg p-8 md:p-12">
            <h3 className="text-3xl font-bold mb-6">Our Achievements</h3>
            <ul className="space-y-4 text-lg">
              <li className="flex items-start">
                <span className="text-2xl mr-3">✓</span>
                <span>Providing housing, education, clothing, and healthcare for hundreds of children since 2017</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">✓</span>
                <span>Maintaining a 100% pass rate in national exams, creating pathways for children to pursue further education</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">✓</span>
                <span>Offering vocational skills training to equip children with tools for future self-sufficiency</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">✓</span>
                <span>Acquiring land and constructing facilities that provide a safe and nurturing environment</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">✓</span>
                <span>Supporting children in memorizing large portions of the Quran through Hafiz programs</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">✓</span>
                <span>Helping youth pursue careers in healthcare, business, education and more</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Orphan Stories - DYNAMIC FROM DATABASE */}
      {loading ? (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-gray-600 text-lg">Loading orphan stories...</p>
          </div>
        </section>
      ) : stories.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-16 text-black">Orphan Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {stories.map(story => (
                <div key={story.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition">
                  <img src={story.imageUrl} alt={story.name} className="w-full h-64 object-cover" />
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-3 text-black">{story.name}</h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">{story.story}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Challenges & Future */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-3xl font-bold mb-6 text-black">Challenges We Face</h3>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start">
                  <span className="text-primary text-xl mr-3">•</span>
                  <span>Limited funding to support our growing number of children and maintain facilities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary text-xl mr-3">•</span>
                  <span>Lack of permanent infrastructure, leading to rental costs that increase expenses</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary text-xl mr-3">•</span>
                  <span>Insufficient resources to expand services to meet increasing community needs</span>
                </li>
              </ul>
            </div>

            <div className="bg-primary text-white p-8 rounded-lg shadow-lg">
              <h3 className="text-3xl font-bold mb-6">Our Future Plans</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-2xl mr-3">→</span>
                  <span>Construct a permanent orphanage with capacity for 350 children</span>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">→</span>
                  <span>Provide specialized care for children with autism through early intervention programs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">→</span>
                  <span>Acquire reliable transportation for daily operations and educational tours</span>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">→</span>
                  <span>Expand vocational training and rehabilitation services</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <BottomSection />
    </div>
  )
}
