'use client'

import { useState } from 'react'
import Image from 'next/image'
import BottomSection from '@/components/BottomSection'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function Gallery() {
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null)

  // Define all 12 albums with images
  const albums = [
    {
      id: 'building',
      name: 'BBOR Building Project',
      preview: '/images/gallery/Bbor_building_project.png',
      images: Array.from({ length: 13 }, (_, i) => 
        i === 0 ? '/images/gallery/Bbor_building_project.png' : `/images/gallery/Bbor_building_project${i}.png`
      ),
    },
    {
      id: 'tours',
      name: 'BBOR Tours',
      preview: '/images/gallery/Bbor_tours.png',
      images: Array.from({ length: 24 }, (_, i) => {
        if (i === 0) return '/images/gallery/Bbor_tours.png'
        if (i < 18) return `/images/gallery/Bbor_tours${i}.png`
        return `/images/gallery/Bbor_tours${i + 1}.png`
      }),
    },
    {
      id: 'celebrations',
      name: 'BBOR Celebrations',
      preview: '/images/gallery/BBOR_celebrations.png',
      images: Array.from({ length: 30 }, (_, i) => {
        if (i === 0) return '/images/gallery/BBOR_celebrations.png'
        return `/images/gallery/BBOR_celebrations_${i + 1}.png`
      }),
    },
    {
      id: 'graduation',
      name: 'BBOR Graduation',
      preview: '/images/gallery/Bbor_graduation_5.png',
      images: Array.from({ length: 18 }, (_, i) => `/images/gallery/Bbor_graduation_${i + 5}.png`),
    },
    {
      id: 'daily-life',
      name: 'BBOR Daily Life',
      preview: '/images/IMG-20240925-WA0180-300x300.png',
      images: [
        '/images/IMG-20240925-WA0180-300x300.png',
        '/images/IMG-20240924-WA0031-300x300.png',
        '/images/IMG-20240925-WA0234-300x300.png',
      ],
    },
    {
      id: 'vocational',
      name: 'BBOR Vocational Skills',
      preview: '/images/IMG-20240925-WA0183-300x300.png',
      images: [
        '/images/IMG-20240925-WA0183-300x300.png',
        '/images/IMG-20240925-WA0174-300x300.png',
      ],
    },
    {
      id: 'before-after',
      name: 'BBOR Before and After',
      preview: '/images/Untitled-1.png',
      images: ['/images/Untitled-1.png'],
    },
    {
      id: 'healthcare',
      name: 'BBOR Healthcare',
      preview: '/images/Untitled-1.png',
      images: ['/images/Untitled-1.png', '/images/IMG-20240925-WA0234-300x300.png'],
    },
    {
      id: 'weddings',
      name: 'BBOR Weddings',
      preview: '/images/IMG-20240924-WA0018-300x300.png',
      images: ['/images/IMG-20240924-WA0018-300x300.png'],
    },
    {
      id: 'donations',
      name: 'BBOR Donations Accepted',
      preview: '/images/IMG-20240925-WA0234-300x300.png',
      images: ['/images/IMG-20240925-WA0234-300x300.png'],
    },
    {
      id: 'education',
      name: 'BBOR Education',
      preview: '/images/IMG-20240924-WA0018-300x300.png',
      images: ['/images/IMG-20240924-WA0018-300x300.png', '/images/IMG-20240925-WA0180-300x300.png'],
    },
  ]

  // Album view - shows all photos in selected album
  if (selectedAlbum) {
    const album = albums.find(a => a.id === selectedAlbum)
    if (!album) return null

    return (
      <div className="min-h-screen pt-20 bg-gray-50">
        <WhatsAppButton />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back button */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-black">{album.name}</h1>
            <button
              onClick={() => setSelectedAlbum(null)}
              className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Albums
            </button>
          </div>

          {/* Photo grid with polaroid effect */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {album.images.map((img, index) => (
              <div key={index} className="polaroid">
                <div className="photo relative h-64">
                  <Image
                    src={img}
                    alt={`${album.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <BottomSection />

        <style jsx>{`
          .polaroid {
            width: 100%;
            padding: 10px 10px 20px 10px;
            background: #fff;
            box-shadow:
              0 1px 1px rgba(0, 0, 0, 0.12),
              0 2px 2px rgba(0, 0, 0, 0.12),
              0 4px 4px rgba(0, 0, 0, 0.12),
              0 8px 8px rgba(0, 0, 0, 0.12);
            transform: rotate(-2deg);
            transition: all 0.3s ease;
          }

          .polaroid:nth-child(even) {
            transform: rotate(2deg);
          }

          .polaroid:hover {
            transform: rotate(0deg) scale(1.05);
            box-shadow:
              0 2px 2px rgba(0, 0, 0, 0.15),
              0 4px 4px rgba(0, 0, 0, 0.15),
              0 8px 8px rgba(0, 0, 0, 0.15),
              0 16px 16px rgba(0, 0, 0, 0.15);
            z-index: 10;
          }

          .photo {
            width: 100%;
            background: #f0f0f0;
            position: relative;
            overflow: hidden;
          }
        `}</style>
      </div>
    )
  }

  // Main gallery view - shows album covers
  return (
    <div className="min-h-screen pt-20">
      <WhatsAppButton />

      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-br from-primary to-primary-dark text-white flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Gallery</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl">
            Moments of joy, growth, and hope from the BBOR family
          </p>
        </div>
      </section>

      {/* Album Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-black">Photo Albums</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {albums.map((album) => (
              <div
                key={album.id}
                className="album-card group relative bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                onClick={() => setSelectedAlbum(album.id)}
              >
                <div className="relative h-80">
                  <Image
                    src={album.preview}
                    alt={album.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  
                  {/* Album name overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{album.name}</h3>
                    <p className="text-white/80 text-sm">{album.images.length} photos</p>
                  </div>

                  {/* See More button on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="see-more-btn">
                      <span>See More</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BottomSection />

      <style jsx>{`
        .album-card {
          position: relative;
        }

        .album-card::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 0;
          background: linear-gradient(90deg, #a941d4, #8a2fb8, #a941d4);
          opacity: 0;
          transition: all 0.5s ease;
        }

        .album-card:hover::after {
          height: 4px;
          opacity: 1;
        }

        .see-more-btn {
          background: linear-gradient(90deg, #a941d4 0%, #8a2fb8 50%, #a941d4 100%);
          background-size: 200% 100%;
          color: white;
          font-weight: 700;
          font-size: 18px;
          padding: 12px 32px;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          transition: background-position 0.5s ease, transform 0.3s ease;
          box-shadow: 0 4px 15px rgba(169, 65, 212, 0.4);
        }

        .see-more-btn:hover {
          background-position: 100% 0;
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(169, 65, 212, 0.6);
        }
      `}</style>
    </div>
  )
}
