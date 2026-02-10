'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import InfoCards from '@/components/InfoCards'
import OrphanStories from '@/components/OrphanStories'
import BottomSection from '@/components/BottomSection'
import WhatsAppButton from '@/components/WhatsAppButton'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const impactRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Hero fade-in animation
    const heroContent = heroRef.current?.querySelector('.hero-content')
    if (heroContent) {
      gsap.fromTo(
        heroContent,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
      )
    }

    // Impact counters animation
    const impactNumbers = document.querySelectorAll('.impact-number')
    impactNumbers?.forEach((el) => {
      const target = parseInt(el.getAttribute('data-target') || '0')
      gsap.to(el, {
        innerText: target,
        duration: 2.5,
        ease: 'power1.out',
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
        },
        onUpdate: function () {
          const value = Math.ceil(parseFloat(el.textContent || '0'))
          el.textContent = value >= 1000 ? value.toLocaleString() : value.toString()
        },
      })
    })

    // Smooth fade-in on scroll (no pinning)
    const sections = document.querySelectorAll('.scroll-section')
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
          },
        }
      )
    })
  }, [])

  return (
    <div className="min-h-screen">
      <WhatsAppButton />

      {/* Hero Section - Graduation Photo */}
      <section ref={heroRef} className="scroll-section relative min-h-screen flex items-center justify-center bg-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/IMG-20230715-WA0004.png"
            alt="BBOR Graduation"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
        
        <div className="hero-content relative z-10 text-center max-w-5xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-black mb-6 leading-tight">
            Beautiful Beginning Outreach Relief (BBOR)
          </h1>
          <p className="text-2xl md:text-3xl text-gray-700 mb-8">
            Towards Happy Endings for Orphans and Vulnerable Children in Zambia
          </p>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
            Beautiful Beginnings Outreach Relief (BBOR) is an organization that provides a platform for orphaned and vulnerable children to receive their basic human rights since 2017. This includes access to shelter, nutritious meals, clothing, medical and dental assistance, physical therapy, psychology counseling, developmental counseling, HIV and AIDS counseling, quality education, Islamic knowledge studies, Hafiz programs, vocational skills training, special needs education and educational tours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/donate">
              <button className="bg-red-600 hover:bg-red-700 text-white font-bold text-xl px-12 py-5 rounded-full transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                </svg>
                Donate Now
              </button>
            </Link>
            <Link href="/about">
              <button className="bg-primary hover:bg-primary-dark text-white font-bold text-xl px-12 py-5 rounded-full transition-all duration-300 hover:scale-105 shadow-lg">
                ORPHAN TESTIMONIES
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Counter Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="text-center">
              <div className="text-6xl md:text-7xl font-bold text-primary mb-4">
                <span className="impact-number" data-target="15000">0</span>
              </div>
              <p className="text-xl text-gray-300">Students Helped</p>
            </div>
            <div className="text-center">
              <div className="text-6xl md:text-7xl font-bold text-primary mb-4">
                <span className="impact-number" data-target="17">0</span>
              </div>
              <p className="text-xl text-gray-300">Years in Operation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Colored Info Cards */}
      <InfoCards />

      {/* Impact Section with Background */}
      <section className="scroll-section relative py-32">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/IMG-20240925-WA0234-300x300.png"
            alt="Children eating"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xl text-white/90 mb-8">Join Our Mission to Transform Lives</p>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-12">
            Last Year We <span className="italic">Supported Over 350</span><br />
            Orphaned and Vulnerable Children.
          </h2>
          <Link href="/donate">
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold text-xl px-12 py-5 rounded-full transition-all duration-300 hover:scale-105 shadow-2xl flex items-center justify-center gap-2 mx-auto">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
              </svg>
              Donate Now
            </button>
          </Link>
        </div>
      </section>

      {/* BBOR Initiatives Section */}
      <section className="scroll-section py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-black">
            BBOR Initiatives and Support
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Provide Essential Care',
                description: 'Extend a helping hand by supporting our programs that offer food, shelter and healthcare to vulnerable children in need.',
                icon: '❤️',
              },
              {
                title: 'Empower Through Education',
                description: 'Contribute to our efforts in providing quality education and vocational training, ensuring a brighter future for orphaned children.',
                icon: '📚',
              },
              {
                title: 'Provide Essential Care',
                description: 'Join us in our mission to uplift entire communities by offering resources, counseling and support to underprivileged members, including widows and refugees.',
                icon: '👥',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-900 to-blue-800 text-white p-10 rounded-xl hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg"
              >
                <div className="text-6xl mb-6">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-white/90 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Orphan Stories (Stacked Cards) */}
      <OrphanStories />

      {/* Empowering Futures Section */}
      <section className="scroll-section relative py-32">
        <div className="absolute inset-0 z-0 group">
          <Image
            src="/images/IMG-20230715-WA0004.png"
            alt="Graduation - Empowering Futures"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-purple-900/90"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            Empowering Futures with BBOR!
          </h2>
          <p className="text-xl md:text-2xl leading-relaxed">
            Your Support Transforms Lives and Shapes Tomorrow. Together, we build brighter futures and empower communities with access to quality education and sustainable growth. Your contributions drive impactful change, turning small steps into giant leaps for those in need. Join us on this journey of hope and transformation!
          </p>
        </div>
      </section>

      {/* News Highlights */}
      <section className="scroll-section py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-600 text-center mb-4">BBOR Updates & Success Stories</p>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-black">
            Recent Highlights
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "BBOR's Vision for Expanding Support to Widows and Disabled Community Members",
                date: 'September 16, 2024',
                excerpt: 'Beautiful Beginnings Outreach Relief (BBOR) not only focuses on supporting orphaned and vulnerable children but',
              },
              {
                title: 'Success Stories from BBOR: Transforming Lives One Child at a Time',
                date: 'September 16, 2024',
                excerpt: 'At Beautiful Beginnings Outreach Relief (BBOR), we have seen firsthand the profound impact our programs',
                highlighted: true,
              },
              {
                title: "BBOR's Holistic Approach to Child Welfare: More Than Just Shelter",
                date: 'September 16, 2024',
                excerpt: 'At Beautiful Beginnings Outreach Relief (BBOR), we understand that children need more than just food',
              },
            ].map((article, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer ${
                  article.highlighted ? 'border-4 border-primary' : ''
                }`}
              >
                <p className="text-sm text-primary font-semibold mb-3">{article.date}</p>
                <h3 className="text-xl font-bold mb-4 text-black leading-tight">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-6">{article.excerpt}</p>
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

      {/* Bottom Section (appears on all pages) */}
      <BottomSection />
    </div>
  )
}