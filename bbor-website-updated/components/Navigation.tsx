'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/news', label: 'News' },
    { href: '/faq', label: 'FAQ' },
    { href: '/donate', label: 'Donate' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/images/bbor_logo.png"
              alt="BBOR Logo"
              width={180}
              height={60}
              className="h-14 w-auto"
              priority
            />
          </Link>

          {/* Menu Button */}
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="menu-btn"
            >
              <div className="icon">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </div>
              <span className="text">Menu</span>
            </button>

            {/* Dropdown */}
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 text-sm font-medium transition-all ${
                      pathname === link.href
                        ? 'bg-primary/10 text-primary border-l-4 border-primary'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .menu-btn {
          width: 150px;
          height: 50px;
          border-radius: 5px;
          border: none;
          transition: all 0.5s ease-in-out;
          font-size: 20px;
          font-family: Verdana, Geneva, Tahoma, sans-serif;
          font-weight: 600;
          display: flex;
          align-items: center;
          background: #040f16;
          color: #f5f5f5;
          cursor: pointer;
        }

        .menu-btn:hover {
          box-shadow: 0 0 20px 0px #2e2e2e3a;
        }

        .menu-btn .icon {
          position: absolute;
          height: 40px;
          width: 70px;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.5s;
        }

        .menu-btn .text {
          transform: translateX(55px);
        }

        .menu-btn:hover .icon {
          width: 175px;
        }

        .menu-btn:hover .text {
          transition: all 0.5s;
          opacity: 0;
        }

        .menu-btn:focus {
          outline: none;
        }

        .menu-btn:active .icon {
          transform: scale(0.85);
        }
      `}</style>
    </nav>
  )
}
