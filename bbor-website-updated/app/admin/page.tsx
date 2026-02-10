'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// API Base URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

type BankAccount = {
  id: number
  accountName: string
  accountNumber: string
  bankName: string
  swiftCode?: string
  routingNumber?: string
  country: string
  currency: string
  isDefault: boolean
  status: string
}

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState<'dashboard' | 'withdraw'>('dashboard')
  
  // Balance
  const [balance, setBalance] = useState(500)
  
  // Bank accounts
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([])
  const [showBankForm, setShowBankForm] = useState(false)
  const [bankForm, setBankForm] = useState({
    accountName: '',
    accountNumber: '',
    bankName: '',
    swiftCode: '',
    routingNumber: '',
    country: 'USA',
    currency: 'USD',
    isDefault: false
  })

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (token) {
      verifyToken(token)
    } else {
      setIsLoading(false)
    }
  }, [])

  const verifyToken = async (token: string) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/verify`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      
      if (res.ok) {
        setIsLoggedIn(true)
        loadBankAccounts(token)
      } else {
        localStorage.removeItem('adminToken')
      }
    } catch (error) {
      console.error('Token verification failed:', error)
      localStorage.removeItem('adminToken')
    } finally {
      setIsLoading(false)
    }
  }

  const loadBankAccounts = async (token: string) => {
    try {
      const res = await fetch(`${API_URL}/api/bank-accounts`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (res.ok) {
        const data = await res.json()
        setBankAccounts(data)
      }
    } catch (error) {
      console.error('Failed to load bank accounts:', error)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      if (res.ok) {
        const data = await res.json()
        localStorage.setItem('adminToken', data.token)
        setIsLoggedIn(true)
        loadBankAccounts(data.token)
      } else {
        setError('Invalid email or password')
      }
    } catch (error) {
      setError('Login failed. Please try again.')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    setIsLoggedIn(false)
    setEmail('')
    setPassword('')
  }

  const handleAddBankAccount = async () => {
    if (!bankForm.accountName || !bankForm.accountNumber || !bankForm.bankName) {
      alert('Please fill in all required fields')
      return
    }

    try {
      const token = localStorage.getItem('adminToken')
      const res = await fetch(`${API_URL}/api/bank-accounts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bankForm)
      })

      if (res.ok) {
        const newAccount = await res.json()
        setBankAccounts([...bankAccounts, newAccount])
        setShowBankForm(false)
        setBankForm({
          accountName: '',
          accountNumber: '',
          bankName: '',
          swiftCode: '',
          routingNumber: '',
          country: 'USA',
          currency: 'USD',
          isDefault: false
        })
      }
    } catch (error) {
      alert('Failed to add bank account')
    }
  }

  const handleWithdraw = () => {
    const defaultAccount = bankAccounts.find(acc => acc.isDefault)
    
    if (!defaultAccount) {
      alert('Please add a bank account first')
      setActiveTab('withdraw')
      return
    }

    alert('Coming Soon!\n\nWithdrawal feature will be activated once payment processing is fully integrated.')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-black mb-2">BBOR Admin</h1>
            <p className="text-gray-600">Dashboard Login</p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                placeholder="admin@bbor.org"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary pr-12"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  )}
                </button>
              </div>
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </div>
            <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-lg transition">
              Login
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-primary hover:underline">← Back to Website</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-black">BBOR Admin Panel</h1>
          <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition">
            Logout
          </button>
        </div>
      </div>

      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-6">
            {[
              { id: 'dashboard', label: '📊 Dashboard' },
              { id: 'withdraw', label: '💰 Withdraw' }
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-2 font-semibold border-b-2 transition ${
                  activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-sm text-gray-600 mb-2">Available Balance</p>
              <p className="text-3xl font-bold text-green-600">${balance}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-sm text-gray-600 mb-2">Bank Accounts</p>
              <p className="text-3xl font-bold text-blue-600">{bankAccounts.length}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-sm text-gray-600 mb-2">Quick Action</p>
              <button onClick={handleWithdraw} className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700">
                Withdraw Funds
              </button>
            </div>
          </div>
        )}

        {activeTab === 'withdraw' && (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Withdraw Funds</h2>

            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <div className="text-center">
                <p className="text-gray-600 mb-2">Available Balance</p>
                <p className="text-5xl font-bold text-green-600 mb-2">${balance}</p>
                <p className="text-sm text-gray-500">Equivalent to K{(balance * 26).toLocaleString()} ZMW</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Bank Accounts</h3>
                <button
                  onClick={() => setShowBankForm(true)}
                  className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-dark"
                >
                  + Add Account
                </button>
              </div>

              {bankAccounts.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p className="text-lg mb-2">No bank accounts added</p>
                  <p className="text-sm">Add a USD bank account to withdraw funds</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {bankAccounts.map(account => (
                    <div key={account.id} className={`p-4 border-2 rounded-lg ${account.isDefault ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-lg">{account.bankName}</p>
                          <p className="text-gray-600">{account.accountName}</p>
                          <p className="text-sm text-gray-500">****{account.accountNumber.slice(-4)}</p>
                          <p className="text-xs text-gray-400 mt-1">{account.country} • {account.currency}</p>
                        </div>
                        {account.isDefault && (
                          <span className="bg-primary text-white text-xs px-3 py-1 rounded-full">Default</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={handleWithdraw}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-xl py-6 rounded-lg transition"
            >
              Withdraw ${balance} to Bank
            </button>
            <p className="text-center text-sm text-gray-500 mt-4">
              ⏰ Coming Soon: Withdrawals will be processed within 1-3 business days
            </p>

            {showBankForm && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <h3 className="text-2xl font-bold mb-6">Add USD Bank Account</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Account Holder Name *</label>
                      <input
                        type="text"
                        value={bankForm.accountName}
                        onChange={(e) => setBankForm({...bankForm, accountName: e.target.value})}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Account Number *</label>
                      <input
                        type="text"
                        value={bankForm.accountNumber}
                        onChange={(e) => setBankForm({...bankForm, accountNumber: e.target.value})}
                        placeholder="1234567890"
                        className="w-full px-4 py-3 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Bank Name *</label>
                      <input
                        type="text"
                        value={bankForm.bankName}
                        onChange={(e) => setBankForm({...bankForm, bankName: e.target.value})}
                        placeholder="Bank of America"
                        className="w-full px-4 py-3 border rounded-lg"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">SWIFT Code</label>
                        <input
                          type="text"
                          value={bankForm.swiftCode}
                          onChange={(e) => setBankForm({...bankForm, swiftCode: e.target.value})}
                          placeholder="BOFAUS3N"
                          className="w-full px-4 py-3 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Routing Number</label>
                        <input
                          type="text"
                          value={bankForm.routingNumber}
                          onChange={(e) => setBankForm({...bankForm, routingNumber: e.target.value})}
                          placeholder="026009593"
                          className="w-full px-4 py-3 border rounded-lg"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={bankForm.isDefault}
                        onChange={(e) => setBankForm({...bankForm, isDefault: e.target.checked})}
                        className="w-4 h-4"
                      />
                      <label className="text-sm text-gray-700">Set as default account</label>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <button onClick={handleAddBankAccount} className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold">
                      Add Account
                    </button>
                    <button onClick={() => setShowBankForm(false)} className="flex-1 bg-gray-200 py-3 rounded-lg font-semibold">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}