'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
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
  const [currency, setCurrency] = useState<'USD' | 'ZMW'>('USD')
  const [amount, setAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState('')
  const [selectedCause, setSelectedCause] = useState<Cause | null>(null)
  const [showCheckout, setShowCheckout] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  // Checkout form fields
  const [donorName, setDonorName] = useState('')
  const [donorEmail, setDonorEmail] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')

  useEffect(() => {
    loadCauses()
  }, [])

  const loadCauses = async () => {
    try {
      const res = await fetch(API_URL + '/api/causes')
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
  const finalAmount = amount || (customAmount ? parseFloat(customAmount) : null)

  const handleDonateClick = () => {
    if (!finalAmount) return
    
    if (currency === 'ZMW') {
      alert('⏰ Coming Soon!\n\nZMW donations will be available soon. For now, please use USD or contact us on WhatsApp.')
      return
    }
    
    setShowCheckout(true)
  }

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '')
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned
    return formatted.substring(0, 19) // Max 16 digits + 3 spaces
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '')
    setCardNumber(formatCardNumber(value))
  }

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4)
    }
    return cleaned
  }

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '')
    setExpiryDate(formatExpiry(value))
  }

  const handleCheckout = async () => {
    if (!donorName || !donorEmail || !cardNumber || !expiryDate || !cvv) {
      alert('Please fill in all fields')
      return
    }

    if (cardNumber.replace(/\s/g, '').length !== 16) {
      alert('Please enter a valid 16-digit card number')
      return
    }

    if (cvv.length < 3) {
      alert('Please enter a valid CVV')
      return
    }

    setIsProcessing(true)

    try {
      const res = await fetch(API_URL + '/api/moonpay/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: finalAmount,
          currency: 'USD',
          donorName,
          donorEmail,
          cardNumber: cardNumber.replace(/\s/g, ''),
          expiryDate,
          cvv,
          causeName: selectedCause?.name || 'General Donation'
        })
      })

      const data = await res.json()

      if (res.ok) {
        window.location.href = '/donate/success'
      } else {
        alert('Payment failed: ' + (data.error || 'Please try again'))
        setIsProcessing(false)
      }
    } catch (error) {
      alert('Payment failed. Please try again.')
      setIsProcessing(false)
    }
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

      {/* Main Content */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {!showCheckout ? (
            /* AMOUNT SELECTION */
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
              {/* Currency Selector */}
              <div className="flex gap-4 mb-8 justify-center">
                <button
                  onClick={() => { setCurrency('USD'); setAmount(null); setCustomAmount('') }}
                  className={`px-8 py-3 rounded-lg font-bold transition ${
                    currency === 'USD' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  USD ($)
                </button>
                <button
                  onClick={() => { setCurrency('ZMW'); setAmount(null); setCustomAmount('') }}
                  className={`px-8 py-3 rounded-lg font-bold transition ${
                    currency === 'ZMW' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  ZMW (K)
                </button>
              </div>

              {currency === 'USD' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6 text-center">
                  <p className="text-sm text-green-800">💳 Pay securely with your card</p>
                </div>
              )}

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

              {/* Donate Button */}
              <button
                onClick={handleDonateClick}
                disabled={!finalAmount}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold text-xl py-6 rounded-lg transition"
              >
                {finalAmount ? `Donate ${symbol}${finalAmount}` : 'Select Amount to Continue'}
              </button>

              <p className="text-center text-sm text-gray-500 mt-4">
                🔒 Secure payment • 100% goes to the children
              </p>
            </div>
          ) : (
            /* CUSTOM CHECKOUT FORM */
            <div className="max-w-md mx-auto">
              <div className="bg-[#0c0f14] rounded-[25px] p-8 shadow-2xl">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                  <Image src="/logo.png" alt="BBOR" width={120} height={60} className="object-contain" />
                </div>

                <h2 className="text-2xl font-bold text-white text-center mb-2">Complete Your Donation</h2>
                <p className="text-center text-gray-400 mb-6">${finalAmount} USD</p>

                <form className="space-y-5">
                  {/* Name */}
                  <label className="block">
                    <span className="text-xs font-semibold text-gray-400 px-2 bg-[#0c0f14] relative top-2 left-3 w-fit">Full Name</span>
                    <input
                      type="text"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full h-[50px] px-4 rounded-[15px] bg-transparent border border-[#21262e] text-gray-300 focus:border-primary focus:outline-none transition-all"
                    />
                  </label>

                  {/* Email */}
                  <label className="block">
                    <span className="text-xs font-semibold text-gray-400 px-2 bg-[#0c0f14] relative top-2 left-3 w-fit">Email Address</span>
                    <input
                      type="email"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full h-[50px] px-4 rounded-[15px] bg-transparent border border-[#21262e] text-gray-300 focus:border-primary focus:outline-none transition-all"
                    />
                  </label>

                  {/* Card Number */}
                  <label className="block">
                    <span className="text-xs font-semibold text-gray-400 px-2 bg-[#0c0f14] relative top-2 left-3 w-fit">Card Number</span>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="0000 0000 0000 0000"
                      className="w-full h-[50px] px-4 rounded-[15px] bg-transparent border border-[#21262e] text-gray-300 focus:border-primary focus:outline-none transition-all"
                    />
                  </label>

                  {/* Expiry & CVV */}
                  <div className="flex gap-4">
                    <label className="flex-1">
                      <span className="text-xs font-semibold text-gray-400 px-2 bg-[#0c0f14] relative top-2 left-3 w-fit">Expiry Date</span>
                      <input
                        type="text"
                        value={expiryDate}
                        onChange={handleExpiryChange}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full h-[50px] px-4 rounded-[15px] bg-transparent border border-[#21262e] text-gray-300 focus:border-primary focus:outline-none transition-all"
                      />
                    </label>
                    <label className="flex-1">
                      <span className="text-xs font-semibold text-gray-400 px-2 bg-[#0c0f14] relative top-2 left-3 w-fit">CVV</span>
                      <input
                        type="text"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').substring(0, 4))}
                        placeholder="123"
                        maxLength={4}
                        className="w-full h-[50px] px-4 rounded-[15px] bg-transparent border border-[#21262e] text-gray-300 focus:border-primary focus:outline-none transition-all"
                      />
                    </label>
                  </div>

                  {/* Checkout Button */}
                  <button
                    type="button"
                    onClick={handleCheckout}
                    disabled={isProcessing}
                    className="w-full mt-6 py-5 rounded-[25px] font-bold text-xl bg-primary hover:bg-primary-dark disabled:bg-gray-600 text-white transition-all active:scale-95 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center gap-3">
                        <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </div>
                    ) : (
                      `Donate $${finalAmount}`
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowCheckout(false)}
                    className="w-full text-gray-400 hover:text-white text-sm mt-3 transition-all"
                  >
                    ← Change Amount
                  </button>
                </form>

                <p className="text-center text-xs text-gray-500 mt-6">
                  🔒 Your payment is secure and encrypted
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <BottomSection />
    </div>
  )
}
