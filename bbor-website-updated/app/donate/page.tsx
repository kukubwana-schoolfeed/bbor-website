'use client'

import { useState } from 'react'
import BottomSection from '@/components/BottomSection'
import WhatsAppButton from '@/components/WhatsAppButton'

// This will come from database later - for now hardcoded to match admin
type Cause = {
  id: number
  name: string
  amount: number
  currency: 'USD' | 'ZMW' | 'Both'
  description: string
  icon: string
  status: 'Active' | 'Inactive'
}

export default function Donate() {
  const [step, setStep] = useState<'amount' | 'card' | 'success'>('amount')
  const [currency, setCurrency] = useState<'USD' | 'ZMW'>('USD')
  const [amount, setAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'mobile'>('card')
  const [mobileProvider, setMobileProvider] = useState<'airtel' | 'mtn' | 'zamtel' | null>(null)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedCause, setSelectedCause] = useState<Cause | null>(null)
  
  // Card details
  const [cardNumber, setCardNumber] = useState('')
  const [cardName, setCardName] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')

  // Mock causes (will come from admin/database later)
  const causes: Cause[] = [
    { id: 1, name: 'School Supplies', amount: 500, currency: 'ZMW', description: 'Provides books and pens for 5 students', icon: '📚', status: 'Active' },
    { id: 2, name: 'Accommodation', amount: 2000, currency: 'ZMW', description: 'Shelter for one child for a month', icon: '🏠', status: 'Active' },
    { id: 3, name: 'Meals for 10 Children', amount: 300, currency: 'ZMW', description: 'Nutritious meals for 10 children for one week', icon: '🍽️', status: 'Active' },
    { id: 4, name: 'School Uniforms', amount: 50, currency: 'USD', description: 'Complete uniform set for one student', icon: '👕', status: 'Active' },
    { id: 5, name: 'Sports Equipment', amount: 100, currency: 'USD', description: 'Footballs, nets and sports gear', icon: '⚽', status: 'Active' },
  ]

  const activeCauses = causes.filter(c => c.status === 'Active')

  const usdAmounts = [5, 10, 20, 50, 100, 250, 500, 1000]
  const zmwAmounts = [50, 100, 200, 500, 1000, 2500, 5000, 10000]

  const amounts = currency === 'USD' ? usdAmounts : zmwAmounts
  const symbol = currency === 'USD' ? '$' : 'K'

  const handleSponsorCause = (cause: Cause) => {
    setSelectedCause(cause)
    if (cause.currency === 'USD') {
      setCurrency('USD')
    } else if (cause.currency === 'ZMW') {
      setCurrency('ZMW')
    }
    setAmount(cause.amount)
    setStep('card')
  }

  const handleContinueToPayment = () => {
    const finalAmount = amount || parseFloat(customAmount)
    
    if (!finalAmount || finalAmount < 5) {
      alert(`Minimum donation is ${symbol}5`)
      return
    }

    if (paymentMethod === 'mobile' && !mobileProvider) {
      alert('Please select a mobile money provider')
      return
    }

    if (paymentMethod === 'mobile' && !phoneNumber) {
      alert('Please enter your phone number')
      return
    }

    setStep(paymentMethod === 'card' ? 'card' : 'success')
  }

  const handleCardPayment = () => {
    if (!cardNumber || !cardName || !expiryDate || !cvv) {
      alert('Please fill in all card details')
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep('success')
    }, 2500)
  }

  // Success Screen
  if (step === 'success') {
    return (
      <div className="min-h-screen pt-20 bg-gray-50 flex items-center justify-center">
        <WhatsAppButton />
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white rounded-lg shadow-xl p-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-4 text-black">
              {paymentMethod === 'mobile' ? 'Payment Pending' : 'Payment Successful!'}
            </h2>
            
            {selectedCause && (
              <div className="bg-primary/10 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600 mb-2">Sponsoring</p>
                <p className="text-xl font-bold text-black">{selectedCause.icon} {selectedCause.name}</p>
              </div>
            )}

            {paymentMethod === 'mobile' ? (
              <>
                <p className="text-lg text-gray-700 mb-6">Please complete payment on your phone</p>
                <div className="bg-primary/10 border-2 border-primary rounded-lg p-6 mb-6">
                  <p className="text-sm text-gray-600 mb-2">Provider</p>
                  <p className="text-xl font-bold text-black mb-4">
                    {mobileProvider === 'airtel' && 'Airtel Money'}
                    {mobileProvider === 'mtn' && 'MTN MoMo'}
                    {mobileProvider === 'zamtel' && 'Zamtel Kwacha'}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">Amount</p>
                  <p className="text-2xl font-bold text-primary">K{amount || customAmount}</p>
                </div>
                <p className="text-gray-600">You will receive a prompt on {phoneNumber} to authorize this payment</p>
              </>
            ) : (
              <>
                <p className="text-lg text-gray-700 mb-6">Your donation is being processed</p>
                <div className="bg-primary/10 rounded-lg p-6 mb-6">
                  <p className="text-2xl font-bold text-primary mb-2">{symbol}{amount || customAmount}</p>
                  <p className="text-sm text-gray-600">
                    {currency === 'USD' ? 'Converting to crypto via NowPayments...' : 'Processing payment...'}
                  </p>
                </div>
              </>
            )}
            <button
              onClick={() => {
                setStep('amount')
                setAmount(null)
                setCustomAmount('')
                setSelectedCause(null)
                setCardNumber('')
                setCardName('')
                setExpiryDate('')
                setCvv('')
              }}
              className="mt-8 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-8 py-3 rounded-lg transition"
            >
              Make Another Donation
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Card Details Form
  if (step === 'card') {
    return (
      <div className="min-h-screen pt-20 bg-gray-50">
        <WhatsAppButton />
        <div className="max-w-2xl mx-auto px-4 py-12">
          <button
            onClick={() => {
              setStep('amount')
              setSelectedCause(null)
            }}
            className="mb-6 text-primary font-semibold hover:underline flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <div className="bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-3xl font-bold mb-2 text-black">Card Payment</h2>
            {selectedCause ? (
              <p className="text-gray-600 mb-8">
                Sponsoring: <span className="font-bold text-black">{selectedCause.icon} {selectedCause.name}</span><br />
                Amount: <span className="font-bold text-primary text-xl">{symbol}{amount}</span>
              </p>
            ) : (
              <p className="text-gray-600 mb-8">
                Amount: <span className="font-bold text-primary text-xl">{symbol}{amount || customAmount}</span>
              </p>
            )}

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\s/g, '')
                    if (value.length <= 16) {
                      value = value.match(/.{1,4}/g)?.join(' ') || value
                      setCardNumber(value)
                    }
                  }}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Cardholder Name</label>
                <input
                  type="text"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value.toUpperCase())}
                  placeholder="JOHN DOE"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Expiry Date</label>
                  <input
                    type="text"
                    value={expiryDate}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, '')
                      if (value.length >= 2) {
                        value = value.slice(0, 2) + '/' + value.slice(2, 4)
                      }
                      if (value.length <= 5) {
                        setExpiryDate(value)
                      }
                    }}
                    placeholder="MM/YY"
                    maxLength={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">CVV</label>
                  <input
                    type="text"
                    value={cvv}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '')
                      if (value.length <= 3) setCvv(value)
                    }}
                    placeholder="123"
                    maxLength={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <button
                onClick={handleCardPayment}
                disabled={loading}
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold text-lg py-4 rounded-lg transition disabled:opacity-50"
              >
                {loading ? 'Processing...' : `Pay ${symbol}${amount || customAmount}`}
              </button>

              <p className="text-xs text-gray-500 text-center">
                🔒 Secured by BBOR Payments • Your card details are encrypted
              </p>
            </div>
          </div>
        </div>
        <BottomSection />
      </div>
    )
  }

  // Amount Selection Page
  return (
    <div className="min-h-screen pt-20">
      <WhatsAppButton />

      <section className="relative h-96 bg-gradient-to-br from-primary to-primary-dark text-white flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <h1 className="text-5xl font-bold mb-4">Make a Donation</h1>
          <p className="text-xl opacity-90">
            Your support transforms lives and creates hope for vulnerable children
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          
          {/* Quick Donate Section */}
          <div className="bg-white rounded-lg shadow-xl p-8 mb-12">
            <h2 className="text-3xl font-bold mb-8 text-black text-center">Quick Donate</h2>
            
            {/* Currency Dropdown */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-black">Select Currency</h3>
              <select
                value={currency}
                onChange={(e) => {
                  setCurrency(e.target.value as 'USD' | 'ZMW')
                  setAmount(null)
                  setCustomAmount('')
                  setPaymentMethod('card')
                  setMobileProvider(null)
                }}
                className="w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white cursor-pointer font-semibold"
              >
                <option value="USD">USD ($) - International</option>
                <option value="ZMW">ZMW (K) - Local</option>
              </select>
            </div>

            {/* Amount Selection */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-black">Select Amount</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {amounts.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => {
                      setAmount(amt)
                      setCustomAmount('')
                      setSelectedCause(null)
                    }}
                    className={`py-4 rounded-lg font-semibold text-lg transition-all ${
                      amount === amt
                        ? 'bg-primary text-white shadow-lg scale-105'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {symbol}{amt}
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Or enter custom amount
                </label>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value)
                    setAmount(null)
                    setSelectedCause(null)
                  }}
                  placeholder={`Minimum ${symbol}5`}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-black">Payment Method</h3>
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setPaymentMethod('card')
                    setMobileProvider(null)
                  }}
                  className={`flex-1 py-4 rounded-lg font-semibold transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  💳 Card Payment
                </button>
                
                {currency === 'ZMW' && (
                  <button
                    onClick={() => setPaymentMethod('mobile')}
                    className={`flex-1 py-4 rounded-lg font-semibold transition-all ${
                      paymentMethod === 'mobile'
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    📱 Mobile Money
                  </button>
                )}
              </div>
            </div>

            {/* Mobile Money Providers (ZMW only) */}
            {currency === 'ZMW' && paymentMethod === 'mobile' && (
              <div className="mb-8 animate-fadeIn">
                <h3 className="text-xl font-bold mb-4 text-black">Select Provider</h3>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <button
                    onClick={() => setMobileProvider('airtel')}
                    className={`py-6 rounded-lg font-semibold transition-all ${
                      mobileProvider === 'airtel'
                        ? 'bg-red-600 text-white shadow-lg scale-105'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Airtel Money
                  </button>
                  <button
                    onClick={() => setMobileProvider('mtn')}
                    className={`py-6 rounded-lg font-semibold transition-all ${
                      mobileProvider === 'mtn'
                        ? 'bg-yellow-500 text-white shadow-lg scale-105'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    MTN MoMo
                  </button>
                  <button
                    onClick={() => setMobileProvider('zamtel')}
                    className={`py-6 rounded-lg font-semibold transition-all ${
                      mobileProvider === 'zamtel'
                        ? 'bg-green-600 text-white shadow-lg scale-105'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Zamtel Kwacha
                  </button>
                </div>

                {mobileProvider && (
                  <div className="animate-fadeIn">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="09XXXXXXXX"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Continue Button */}
            <button
              onClick={handleContinueToPayment}
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold text-xl py-5 rounded-lg transition"
            >
              Continue to Payment
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-12">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gray-50 px-6 text-2xl font-bold text-gray-500">OR</span>
            </div>
          </div>

          {/* Sponsor Specific Causes */}
          <div>
            <h2 className="text-3xl font-bold mb-4 text-black text-center">Sponsor a Specific Cause</h2>
            <p className="text-center text-gray-600 mb-12 text-lg">
              Choose a specific need and make a direct impact
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activeCauses.map(cause => (
                <div key={cause.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="p-8 text-center">
                    <div className="text-7xl mb-4">{cause.icon}</div>
                    <h3 className="text-2xl font-bold text-black mb-3">{cause.name}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{cause.description}</p>
                    <p className="text-4xl font-bold text-primary mb-6">
                      {cause.currency === 'USD' ? '$' : cause.currency === 'ZMW' ? 'K' : '$/'}{cause.amount}
                    </p>
                    <button
                      onClick={() => handleSponsorCause(cause)}
                      className="w-full bg-primary hover:bg-primary-dark text-white font-bold text-lg py-4 rounded-lg transition transform hover:scale-105"
                    >
                      Sponsor Now
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {activeCauses.length === 0 && (
              <p className="text-center text-gray-500 text-lg">No active causes at the moment. Check back soon!</p>
            )}
          </div>
        </div>
      </section>

      <BottomSection />

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
