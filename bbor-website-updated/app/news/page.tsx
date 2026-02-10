'use client'

import Image from 'next/image'
import Link from 'next/link'
import BottomSection from '@/components/BottomSection'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function News() {
  const newsArticles = [
    {
      id: 1,
      title: 'BBOR Celebrates 100% Pass Rate in National Exams',
      date: 'January 2025',
      excerpt: 'We are proud to announce that all our children achieved a 100% pass rate in the national examinations, opening doors to further education and brighter futures.',
      image: '/images/IMG-20230715-WA0004.png',
      category: 'Education',
    },
    {
      id: 2,
      title: 'New Healthcare Initiative Launched',
      date: 'December 2024',
      excerpt: 'BBOR has expanded its healthcare services to include specialized care for children with autism, providing early intervention programs and therapy.',
      image: '/images/Untitled-1.png',
      category: 'Healthcare',
    },
    {
      id: 3,
      title: 'Community Outreach Program Success',
      date: 'November 2024',
      excerpt: 'Our latest community outreach program provided support to 100 additional vulnerable children and their families with food, clothing, and essential supplies.',
      image: '/images/IMG-20240924-WA0031-300x300.png',
      category: 'Community',
    },
    {
      id: 4,
      title: 'Vocational Training Center Opens',
      date: 'October 2024',
      excerpt: 'BBOR opened a new vocational training center offering skills in carpentry, tailoring, and computer literacy to prepare youth for self-sufficiency.',
      image: '/images/IMG-20240925-WA0183-300x300.png',
      category: 'Training',
    },
    {
      id: 5,
      title: 'Graduation Ceremony for 25 Students',
      date: 'September 2024',
      excerpt: 'Twenty-five students from BBOR graduated from various programs, with several pursuing careers in healthcare, education, and business.',
      image: '/images/IMG-20240924-WA0018-300x300.png',
      category: 'Education',
    },
    {
      id: 6,
      title: 'Ramadan Food Drive Feeds 500 Families',
      date: 'August 2024',
      excerpt: 'During Ramadan, BBOR distributed food packages to over 500 families in need, spreading hope and compassion throughout the community.',
      image: '/images/IMG-20240925-WA0234-300x300.png',
      category: 'Community',
    },
  ]

  return (
    <div className="min-h-screen pt-20">
      <WhatsAppButton />

      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-br from-primary to-primary-dark text-white flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Latest News</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl">
            Stay updated with the latest stories and achievements from BBOR
          </p>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.map((article) => (
              <article
                key={article.id}
                className="news-card bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 group cursor-pointer"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">{article.date}</p>
                  <h2 className="text-2xl font-bold mb-3 text-black group-hover:text-primary transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-gray-700 mb-4 leading-relaxed">{article.excerpt}</p>
                  <button className="text-primary font-semibold hover:underline flex items-center">
                    Read More
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-16 flex justify-center">
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                1
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                2
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                3
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4 text-black">Stay Connected</h2>
          <p className="text-xl text-gray-600 mb-8">
            Subscribe to our newsletter for updates on our children and programs
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
              required
            />
            <button
              type="submit"
              className="btn-donate px-8 py-3 whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <BottomSection />

      <style jsx>{`
        .news-card {
          position: relative;
        }

        .news-card::before {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 4px;
          background: linear-gradient(90deg, transparent, #a941d4, transparent);
          opacity: 0;
          transition: all 0.5s ease;
        }

        .news-card:hover::before {
          width: 100%;
          opacity: 1;
        }

        .news-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(169, 65, 212, 0.3);
        }
      `}</style>
    </div>
  )
}
