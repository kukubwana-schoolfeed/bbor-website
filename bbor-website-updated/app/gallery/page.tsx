'use client'

import { useState, useEffect } from 'react'
import BottomSection from '@/components/BottomSection'
import WhatsAppButton from '@/components/WhatsAppButton'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

type Album = {
  id: number
  name: string
  description: string | null
  coverImage: string
  status: string
  photos: AlbumPhoto[]
}

type AlbumPhoto = {
  id: number
  imageUrl: string
  caption: string | null
}

export default function Gallery() {
  const [albums, setAlbums] = useState<Album[]>([])
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAlbums()
  }, [])

  const loadAlbums = async () => {
    try {
      const res = await fetch(`${API_URL}/api/albums?status=Active`)
      if (res.ok) {
        setAlbums(await res.json())
      }
    } catch (error) {
      console.error('Failed to load albums:', error)
    } finally {
      setLoading(false)
    }
  }

  // Album detail view
  if (selectedAlbum) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50">
        <WhatsAppButton />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <button
                onClick={() => setSelectedAlbum(null)}
                className="text-primary hover:underline mb-2 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Albums
              </button>
              <h1 className="text-4xl font-bold text-black">{selectedAlbum.name}</h1>
              {selectedAlbum.description && (
                <p className="text-gray-600 mt-2">{selectedAlbum.description}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {selectedAlbum.photos.map((photo) => (
              <div key={photo.id} className="polaroid">
                <div className="photo relative h-64">
                  <img
                    src={photo.imageUrl}
                    alt={photo.caption || selectedAlbum.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {photo.caption && (
                  <p className="text-center text-sm text-gray-700 mt-2">{photo.caption}</p>
                )}
              </div>
            ))}
          </div>

          {selectedAlbum.photos.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-500">This album is empty</p>
            </div>
          )}
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

  // Main gallery - albums grid
  return (
    <div className="min-h-screen pt-20">
      <WhatsAppButton />

      <section className="relative h-96 bg-gradient-to-br from-primary to-primary-dark text-white flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Gallery</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl">
            Moments of joy, growth, and hope from the BBOR family
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-black">Photo Albums</h2>
          
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Loading albums...</p>
            </div>
          ) : albums.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-500 text-lg">No albums available yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {albums.map((album) => (
                <div
                  key={album.id}
                  className="album-card group relative bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                  onClick={() => setSelectedAlbum(album)}
                >
                  <div className="relative h-80">
                    <img
                      src={album.coverImage}
                      alt={album.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-bold text-white mb-2">{album.name}</h3>
                      <p className="text-white/80 text-sm">{album.photos.length} photos</p>
                      {album.description && (
                        <p className="text-white/70 text-sm mt-2 line-clamp-2">{album.description}</p>
                      )}
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="see-more-btn">
                        <span>See More</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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
