'use client'

import { useState } from 'react'
import Image from 'next/image'
import BottomSection from '@/components/BottomSection'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    
    // TODO: Implement backend form submission
    console.log('Form data:', formData)
    
    setTimeout(() => {
      setSending(false)
      alert('Thank you for your message! We will get back to you soon.')
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    }, 1500)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen pt-20">
      <WhatsAppButton />
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-br from-primary to-primary-dark text-white flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl">
            Get in touch with BBOR - We'd love to hear from you
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-4xl font-bold mb-8 text-black">Get In Touch</h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Whether you want to volunteer, donate, or learn more about our work, we're here to help. Reach out to us through any of the following channels.
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 text-black">Address</h3>
                    <p className="text-gray-700">
                      Plot # 687 A/1/B/5/21 off Pelican Road<br />
                      Lusaka, Zambia
                    </p>
                    <p className="text-gray-600 text-sm mt-2">
                      P.O. Box 31209, Lusaka, Zambia
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 text-black">Email</h3>
                    <a href="mailto:bborzambia@gmail.com" className="text-primary hover:underline">
                      bborzambia@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 text-black">Phone</h3>
                    <a href="tel:+260973158210" className="text-primary hover:underline">
                      +260 973 158 210
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 text-black">WhatsApp</h3>
                    <a href="https://wa.me/260973158210" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      +260 973 158 210
                    </a>
                  </div>
                </div>
              </div>

              {/* Board Members */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-4 text-black">Board Members</h3>
                <div className="space-y-2 text-gray-700">
                  <p><span className="font-semibold">Director:</span> Jameelah Ohl</p>
                  <p><span className="font-semibold">Director:</span> Shaykh Haamid Nsibirwa</p>
                  <p><span className="font-semibold">Director:</span> Majidah Sharif</p>
                  <p><span className="font-semibold">Secretary:</span> Prudence Chimbwe Mambwe</p>
                  <p><span className="font-semibold">Treasurer:</span> Khadija Ssali</p>
                  <p><span className="font-semibold">Trustees:</span> Tammy Lea Croan, Aminah Ssali, Sakinah Sharif</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold mb-6 text-black">Send Us a Message</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-control">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <label>
                      {Array.from('Your Name').map((char, i) => (
                        <span key={i} style={{ transitionDelay: `${i * 50}ms` }}>
                          {char === ' ' ? '\u00A0' : char}
                        </span>
                      ))}
                    </label>
                  </div>

                  <div className="form-control">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <label>
                      {Array.from('Email Address').map((char, i) => (
                        <span key={i} style={{ transitionDelay: `${i * 50}ms` }}>
                          {char === ' ' ? '\u00A0' : char}
                        </span>
                      ))}
                    </label>
                  </div>

                  <div className="form-control">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    <label>
                      {Array.from('Phone Number (Optional)').map((char, i) => (
                        <span key={i} style={{ transitionDelay: `${i * 50}ms` }}>
                          {char === ' ' ? '\u00A0' : char}
                        </span>
                      ))}
                    </label>
                  </div>

                  <div className="form-control">
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                    <label>
                      {Array.from('Subject').map((char, i) => (
                        <span key={i} style={{ transitionDelay: `${i * 50}ms` }}>
                          {char}
                        </span>
                      ))}
                    </label>
                  </div>

                  <div className="form-control">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      required
                    />
                    <label>
                      {Array.from('Your Message').map((char, i) => (
                        <span key={i} style={{ transitionDelay: `${i * 50}ms` }}>
                          {char === ' ' ? '\u00A0' : char}
                        </span>
                      ))}
                    </label>
                  </div>

                  {sending ? (
                    <div className="flex justify-center">
                      <div className="loader">
                        <div className="loader__bar"></div>
                        <div className="loader__bar"></div>
                        <div className="loader__bar"></div>
                        <div className="loader__bar"></div>
                        <div className="loader__bar"></div>
                        <div className="loader__ball"></div>
                      </div>
                    </div>
                  ) : (
                    <button type="submit" className="btn-donate w-full">
                      Send Message
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BottomSection />
    </div>
  )
}
