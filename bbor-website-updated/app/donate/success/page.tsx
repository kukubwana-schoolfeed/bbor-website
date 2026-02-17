'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function DonateSuccess() {
  return (
    <div className="min-h-screen pt-20 bg-gray-50 flex items-center justify-center">
      <div className="max-w-lg w-full mx-4">
        <div className="bg-white rounded-2xl shadow-2xl p-12 text-center">
          <div className="text-8xl mb-6">🎉</div>
          <h1 className="text-4xl font-bold text-green-600 mb-4">Thank You!</h1>
          <p className="text-xl text-gray-600 mb-2">Your donation has been received.</p>
          <p className="text-gray-500 mb-8">You will receive a confirmation email shortly. Your generosity makes a real difference in the lives of these children.</p>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
            <p className="text-green-800 font-semibold">✅ Payment Successful</p>
            <p className="text-sm text-green-600 mt-1">Your donation is being processed</p>
          </div>

          <div className="space-y-3">
            <Link href="/" className="block w-full bg-primary text-white font-bold py-4 rounded-lg hover:bg-primary-dark transition">
              Back to Home
            </Link>
            <Link href="/donate" className="block w-full bg-gray-200 text-gray-700 font-bold py-4 rounded-lg hover:bg-gray-300 transition">
              Make Another Donation
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
