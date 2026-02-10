'use client'

import { useState } from 'react'
import BottomSection from '@/components/BottomSection'
import WhatsAppButton from '@/components/WhatsAppButton'

type FAQ = {
  id: number
  question: string
  answer: string
  category: string
  order: number
  status: 'Active' | 'Inactive'
}

export default function FAQPage() {
  // Mock FAQs (will come from database later)
  const faqs: FAQ[] = [
    { id: 1, question: 'How do I donate?', answer: 'You can donate through our secure payment gateway using your credit/debit card or mobile money. Simply click the "Donate Now" button and follow the instructions.', category: 'Donations', order: 1, status: 'Active' },
    { id: 2, question: 'Is my donation tax-deductible?', answer: 'Yes, BBOR is a registered charity organization and all donations are tax-deductible. You will receive a receipt for your donation.', category: 'Donations', order: 2, status: 'Active' },
    { id: 3, question: 'Can I donate monthly?', answer: 'Absolutely! We encourage monthly donations as they help us plan better for the children\'s needs. You can set up recurring donations during checkout.', category: 'Donations', order: 3, status: 'Active' },
    { id: 4, question: 'How are funds used?', answer: 'Funds go directly to supporting orphaned and vulnerable children with food, shelter, education, healthcare, and vocational training. We maintain full transparency in our financial reporting.', category: 'About', order: 1, status: 'Active' },
    { id: 5, question: 'Where is BBOR located?', answer: 'BBOR is located in Lusaka, Zambia. We currently support 230 children at our facility.', category: 'About', order: 2, status: 'Active' },
    { id: 6, question: 'How can I volunteer?', answer: 'We welcome volunteers! Please contact us via email at bborzambia@gmail.com or WhatsApp at +260 973 158 210 to discuss volunteer opportunities.', category: 'Volunteering', order: 1, status: 'Active' },
    { id: 7, question: 'Can I sponsor a specific child?', answer: 'Yes! We offer child sponsorship programs. Contact us directly to learn more about sponsoring a specific child and their needs.', category: 'Sponsorship', order: 1, status: 'Active' },
    { id: 8, question: 'What payment methods do you accept?', answer: 'We accept credit/debit cards (Visa, Mastercard) and Zambian mobile money (Airtel Money, MTN MoMo, Zamtel Kwacha).', category: 'Donations', order: 4, status: 'Active' },
  ]

  const activeFaqs = faqs.filter(f => f.status === 'Active').sort((a, b) => a.order - b.order)
  const categories = [...new Set(activeFaqs.map(f => f.category))]

  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [openFaqId, setOpenFaqId] = useState<number | null>(null)

  const filteredFaqs = selectedCategory === 'All' 
    ? activeFaqs 
    : activeFaqs.filter(f => f.category === selectedCategory)

  const toggleFaq = (id: number) => {
    setOpenFaqId(openFaqId === id ? null : id)
  }

  return (
    <div className="min-h-screen pt-20">
      <WhatsAppButton />

      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-br from-primary to-primary-dark text-white flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <h1 className="text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl opacity-90">
            Find answers to common questions about BBOR and how you can help
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          
          {/* Category Filter */}
          <div className="mb-12 flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                selectedCategory === 'All'
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              All Questions
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <div key={faq.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-5 flex justify-between items-center hover:bg-gray-50 transition"
                >
                  <div className="flex items-start text-left gap-4">
                    <span className="text-primary font-bold text-lg flex-shrink-0">
                      Q{index + 1}.
                    </span>
                    <span className="text-lg font-semibold text-black">
                      {faq.question}
                    </span>
                  </div>
                  <svg
                    className={`w-6 h-6 text-primary flex-shrink-0 transition-transform ${
                      openFaqId === faq.id ? 'transform rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {openFaqId === faq.id && (
                  <div className="px-6 pb-5 pt-2 animate-fadeIn">
                    <div className="ml-10 text-gray-700 leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500">No questions found in this category</p>
            </div>
          )}

          {/* Contact CTA */}
          <div className="mt-16 bg-white rounded-lg shadow-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4 text-black">Still have questions?</h3>
            <p className="text-gray-600 mb-6">
              We're here to help! Reach out to us and we'll get back to you as soon as possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/260973158210"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg transition"
              >
                WhatsApp Us
              </a>
              <a
                href="mailto:bborzambia@gmail.com"
                className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-lg transition"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <BottomSection />

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
