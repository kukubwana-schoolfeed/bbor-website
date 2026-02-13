'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

type DynamicImageProps = {
  page: string
  location: string
  alt: string
  fill?: boolean
  className?: string
  priority?: boolean
  width?: number
  height?: number
}

export default function DynamicImage({ page, location, alt, fill, className, priority, width, height }: DynamicImageProps) {
  const [imageUrl, setImageUrl] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadImage()
  }, [page, location])

  const loadImage = async () => {
    try {
      const res = await fetch(`${API_URL}/api/images?page=${page}&location=${encodeURIComponent(location)}`)
      if (res.ok) {
        const data = await res.json()
        if (data.length > 0) {
          setImageUrl(data[0].currentUrl)
        }
      }
    } catch (error) {
      console.error('Failed to load image:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className={`bg-gray-200 animate-pulse ${className}`}></div>
  }

  if (!imageUrl) {
    return null
  }

  // If it's a base64 image from admin, use regular img tag
  if (imageUrl.startsWith('data:image')) {
    if (fill) {
      return <img src={imageUrl} alt={alt} className={`absolute inset-0 w-full h-full ${className}`} />
    }
    return <img src={imageUrl} alt={alt} className={className} width={width} height={height} />
  }

  // Otherwise use Next Image for optimization
  if (fill) {
    return <Image src={imageUrl} alt={alt} fill className={className} priority={priority} />
  }

  return <Image src={imageUrl} alt={alt} width={width || 500} height={height || 500} className={className} priority={priority} />
}
