'use client'

import Link from 'next/link'

export default function DonateCancel() {
  return (
    <div className="min-h-screen pt-20 bg-gray-50 flex items-center justify-center">
      <div className="max-w-lg w-full mx-4">
        <div className="bg-white rounded-2xl shadow-2xl p-12 text-center">
          <div className="text-8xl mb-6">😔</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Payment Cancelled</h1>
          <p className="text-xl text-gray-600 mb-2">No worries - you have not been charged.</p>
          <p className="text-gray-500 mb-8">If you had trouble with payment, please try again or contact us on WhatsApp.</p>

          <div className="space-y-3">
            <Link href="/donate" className="block w-full bg-primary text-white font-bold py-4 rounded-lg hover:bg-primary-dark transition">
              Try Again
            </Link>
            <Link href="/" className="block w-full bg-gray-200 text-gray-700 font-bold py-4 rounded-lg hover:bg-gray-300 transition">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
