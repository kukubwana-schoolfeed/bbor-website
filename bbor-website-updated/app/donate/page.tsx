'use client'

import { useState, useEffect } from 'react'
import BottomSection from '@/components/BottomSection'
import WhatsAppButton from '@/components/WhatsAppButton'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

type Cause = {
  id: number
  name: string
  amount: number
  currency: 'USD' | 'ZMW' | 'Both'
  description: string
  icon: string
  imageUrl: string
  status: string
}

export default function Donate() {
  const [causes, setCauses] = useState<Cause[]>([])
  const [loading, setLoading] = useState(true)
  const [step, setStep] = useState<'amount' | 'card' | 'success'>('amount')
  const [currency, setCurrency] = useState<'USD' | 'ZMW'>('USD')
  const [amount, setAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState('')
  const [selectedCause, setSelectedCause] = useState<Cause | null>(null)

  useEffect(() => {
    loadCauses()
  }, [])

  const loadCauses = async () => {
    try {
      const res = await fetch(`${API_URL}/api/causes`)
      if (res.ok) {
        const data = await res.json()
        setCauses(data.filter((c: Cause) => c.status === 'Active'))
      }
    } catch (error) {
      console.error('Failed to load causes:', error)
    } finally {
      setLoading(false)
    }
  }

  const usdAmounts = [5, 10, 20, 50, 100, 250, 500, 1000]
  const zmwAmounts = [50, 100, 200, 500, 1000, 2500, 5000, 10000]
  const amounts = currency === 'USD' ? usdAmounts : zmwAmounts
  const symbol = currency === 'USD' ? '$' : 'K'

  const handleProceed = () => {
    alert('Coming Soon!\n\nPayment processing will be activated once NowPayments integration is complete.')
  }

  return (
    <div className="min-h-screen pt-20">
      <WhatsAppButton />

      {/* Hero */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-dark/90"></div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Make a Donation</h1>
            <p className="text-xl md:text-2xl">Every contribution transforms lives</p>
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            {/* Currency Selector */}
            <div className="flex gap-4 mb-8 justify-center">
              <button
                onClick={() => setCurrency('USD')}
                className={`px-8 py-3 rounded-lg font-bold transition ${
                  currency === 'USD'
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                USD ($)
              </button>
              <button
                onClick={() => setCurrency('ZMW')}
                className={`px-8 py-3 rounded-lg font-bold transition ${
                  currency === 'ZMW'
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                ZMW (K)
              </button>
            </div>

            {/* Quick Amounts */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-black">Select Amount:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {amounts.map(amt => (
                  <button
                    key={amt}
                    onClick={() => {
                      setAmount(amt)
                      setCustomAmount('')
                      setSelectedCause(null)
                    }}
                    className={`p-4 border-2 rounded-lg font-bold text-xl transition ${
                      amount === amt && !selectedCause
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-300 hover:border-primary text-gray-700'
                    }`}
                  >
                    {symbol}{amt}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-black">Or Enter Custom Amount:</h3>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl font-bold text-gray-600">
                  {symbol}
                </span>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value)
                    setAmount(null)
                    setSelectedCause(null)
                  }}
                  placeholder="0"
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-lg text-2xl font-bold focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            {/* Donation Causes */}
            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-600">Loading donation causes...</p>
              </div>
            ) : causes.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-black">Or Choose a Specific Cause:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {causes.map(cause => {
                    const causeSymbol = cause.currency === 'USD' ? '$' : cause.currency === 'ZMW' ? 'K' : currency === 'USD' ? '$' : 'K'
                    return (
                      <button
                        key={cause.id}
                        onClick={() => {
                          setSelectedCause(cause)
                          setCurrency(cause.currency === 'Both' ? currency : cause.currency as 'USD' | 'ZMW')
                          setAmount(cause.amount)
                          setCustomAmount('')
                        }}
                        className={`p-6 border-2 rounded-lg text-left transition ${
                          selectedCause?.id === cause.id
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-300 hover:border-primary'
                        }`}
                      >
                        {cause.imageUrl ? (
                          <img src={cause.imageUrl} alt={cause.name} className="w-full h-32 object-cover rounded-lg mb-3" />
                        ) : (
                          <div className="text-5xl mb-3">{cause.icon}</div>
                        )}
                        <h4 className="font-bold text-lg mb-2 text-black">{cause.name}</h4>
                        <p className="text-2xl font-bold text-primary mb-2">{causeSymbol}{cause.amount}</p>
                        <p className="text-sm text-gray-600">{cause.description}</p>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Proceed Button */}
            <button
              onClick={handleProceed}
              disabled={!amount && !customAmount}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold text-xl py-6 rounded-lg transition"
            >
              {amount || customAmount ? `Donate ${symbol}${amount || customAmount}` : 'Select Amount to Continue'}
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              🔒 Secure payment processing • 100% of your donation goes to the children
            </p>
          </div>
        </div>
      </section>

      <BottomSection />
    </div>
  )
}
