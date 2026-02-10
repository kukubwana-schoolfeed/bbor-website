'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

type Cause = {
  id: number
  name: string
  amount: number
  currency: 'USD' | 'ZMW' | 'Both'
  description: string
  icon: string
  imageUrl: string
  status: 'Active' | 'Inactive'
  order: number
}

type NewsArticle = {
  id: number
  title: string
  description: string
  date: string
  imageUrl: string
  icon: string
  useImage: boolean
  status: 'Published' | 'Draft'
}

type Story = {
  id: number
  name: string
  story: string
  imageUrl: string
  status: 'Active' | 'Inactive'
  order: number
}

type FAQ = {
  id: number
  question: string
  answer: string
  category: string
  order: number
  status: 'Active' | 'Inactive'
}

type SiteImage = {
  id: number
  page: string
  location: string
  currentUrl: string
  description: string
}

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
  const [activeTab, setActiveTab] = useState<'dashboard' | 'causes' | 'news' | 'stories' | 'faqs' | 'images' | 'withdraw'>('dashboard')
  
  const [balance, setBalance] = useState(500)
  const [causes, setCauses] = useState<Cause[]>([])
  const [news, setNews] = useState<NewsArticle[]>([])
  const [stories, setStories] = useState<Story[]>([])
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [images, setImages] = useState<SiteImage[]>([])
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([])

  // Form states
  const [showCauseForm, setShowCauseForm] = useState(false)
  const [editingCause, setEditingCause] = useState<Cause | null>(null)
  const [causeForm, setCauseForm] = useState({
    name: '', amount: '', currency: 'ZMW' as 'USD' | 'ZMW' | 'Both',
    description: '', icon: '📚', imageUrl: '', useImage: false, status: 'Active' as 'Active' | 'Inactive', order: 1
  })

  const [showNewsForm, setShowNewsForm] = useState(false)
  const [editingNews, setEditingNews] = useState<NewsArticle | null>(null)
  const [newsForm, setNewsForm] = useState({
    title: '', description: '', date: new Date().toISOString().split('T')[0],
    imageUrl: '', icon: '📰', displayType: 'none' as 'image' | 'icon' | 'none',
    status: 'Published' as 'Published' | 'Draft'
  })

  const [showStoryForm, setShowStoryForm] = useState(false)
  const [editingStory, setEditingStory] = useState<Story | null>(null)
  const [storyForm, setStoryForm] = useState({
    name: '', story: '', imageUrl: '', status: 'Active' as 'Active' | 'Inactive', order: 1
  })

  const [showFaqForm, setShowFaqForm] = useState(false)
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null)
  const [faqForm, setFaqForm] = useState({
    question: '', answer: '', category: 'General', order: 1, status: 'Active' as 'Active' | 'Inactive'
  })

  const [selectedPage, setSelectedPage] = useState('All')
  const [editingImage, setEditingImage] = useState<SiteImage | null>(null)
  const [newImageUrl, setNewImageUrl] = useState('')

  const [showBankForm, setShowBankForm] = useState(false)
  const [bankForm, setBankForm] = useState({
    accountName: '', accountNumber: '', bankName: '', swiftCode: '', routingNumber: '',
    country: 'USA', currency: 'USD', isDefault: false
  })

  const emojiOptions = ['📚', '🏠', '🍽️', '👕', '⚽', '💊', '🎒', '✏️', '📰', '🎓', '🧸', '🛏️', '💡', '🏥', '📖']

  const getToken = () => localStorage.getItem('adminToken')

  useEffect(() => {
    const token = getToken()
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
        loadAllData(token)
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

  const loadAllData = async (token: string) => {
    try {
      const [causesRes, newsRes, storiesRes, faqsRes, imagesRes, bankRes] = await Promise.all([
        fetch(`${API_URL}/api/causes`, { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch(`${API_URL}/api/news`, { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch(`${API_URL}/api/stories`, { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch(`${API_URL}/api/faqs`, { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch(`${API_URL}/api/images`, { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch(`${API_URL}/api/bank-accounts`, { headers: { 'Authorization': `Bearer ${token}` } })
      ])

      if (causesRes.ok) setCauses(await causesRes.json())
      if (newsRes.ok) setNews(await newsRes.json())
      if (storiesRes.ok) setStories(await storiesRes.json())
      if (faqsRes.ok) setFaqs(await faqsRes.json())
      if (imagesRes.ok) setImages(await imagesRes.json())
      if (bankRes.ok) setBankAccounts(await bankRes.json())
    } catch (error) {
      console.error('Failed to load data:', error)
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
        loadAllData(data.token)
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'cause' | 'news' | 'story' | 'siteImage') => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (type === 'cause') {
          setCauseForm({...causeForm, imageUrl: reader.result as string, useImage: true})
        } else if (type === 'news') {
          setNewsForm({...newsForm, imageUrl: reader.result as string, displayType: 'image'})
        } else if (type === 'story') {
          setStoryForm({...storyForm, imageUrl: reader.result as string})
        } else {
          setNewImageUrl(reader.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // CAUSE HANDLERS
  const handleSaveCause = async () => {
    if (!causeForm.name || !causeForm.amount) {
      alert('Please fill in all required fields')
      return
    }

    try {
      const token = getToken()
      const data = {
        name: causeForm.name,
        amount: parseFloat(causeForm.amount),
        currency: causeForm.currency,
        description: causeForm.description,
        icon: causeForm.useImage ? '' : causeForm.icon,
        imageUrl: causeForm.useImage ? causeForm.imageUrl : '',
        status: causeForm.status,
        order: causeForm.order
      }

      const res = editingCause
        ? await fetch(`${API_URL}/api/causes/${editingCause.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(data)
          })
        : await fetch(`${API_URL}/api/causes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(data)
          })

      if (res.ok) {
        loadAllData(token!)
        setShowCauseForm(false)
        setEditingCause(null)
        setCauseForm({ name: '', amount: '', currency: 'ZMW', description: '', icon: '📚', imageUrl: '', useImage: false, status: 'Active', order: 1 })
      }
    } catch (error) {
      alert('Failed to save cause')
    }
  }

  const handleDeleteCause = async (id: number) => {
    if (!confirm('Delete this cause?')) return
    try {
      const token = getToken()
      await fetch(`${API_URL}/api/causes/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      loadAllData(token!)
    } catch (error) {
      alert('Failed to delete cause')
    }
  }

  // NEWS HANDLERS
  const handleSaveNews = async () => {
    if (!newsForm.title || !newsForm.description) {
      alert('Please fill in title and description')
      return
    }

    try {
      const token = getToken()
      const data = {
        title: newsForm.title,
        description: newsForm.description,
        date: new Date(newsForm.date),
        imageUrl: newsForm.displayType === 'image' ? newsForm.imageUrl : '',
        icon: newsForm.displayType === 'icon' ? newsForm.icon : '',
        useImage: newsForm.displayType === 'image',
        status: newsForm.status
      }

      const res = editingNews
        ? await fetch(`${API_URL}/api/news/${editingNews.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(data)
          })
        : await fetch(`${API_URL}/api/news`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(data)
          })

      if (res.ok) {
        loadAllData(token!)
        setShowNewsForm(false)
        setEditingNews(null)
        setNewsForm({ title: '', description: '', date: new Date().toISOString().split('T')[0], imageUrl: '', icon: '📰', displayType: 'none', status: 'Published' })
      }
    } catch (error) {
      alert('Failed to save news')
    }
  }

  const handleDeleteNews = async (id: number) => {
    if (!confirm('Delete this news?')) return
    try {
      const token = getToken()
      await fetch(`${API_URL}/api/news/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      loadAllData(token!)
    } catch (error) {
      alert('Failed to delete news')
    }
  }

  // STORY HANDLERS
  const handleSaveStory = async () => {
    if (!storyForm.name || !storyForm.story || !storyForm.imageUrl) {
      alert('Please fill in all fields including image')
      return
    }

    try {
      const token = getToken()
      const data = {
        name: storyForm.name,
        story: storyForm.story,
        imageUrl: storyForm.imageUrl,
        status: storyForm.status,
        order: storyForm.order
      }

      const res = editingStory
        ? await fetch(`${API_URL}/api/stories/${editingStory.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(data)
          })
        : await fetch(`${API_URL}/api/stories`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(data)
          })

      if (res.ok) {
        loadAllData(token!)
        setShowStoryForm(false)
        setEditingStory(null)
        setStoryForm({ name: '', story: '', imageUrl: '', status: 'Active', order: 1 })
      }
    } catch (error) {
      alert('Failed to save story')
    }
  }

  const handleDeleteStory = async (id: number) => {
    if (!confirm('Delete this story?')) return
    try {
      const token = getToken()
      await fetch(`${API_URL}/api/stories/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      loadAllData(token!)
    } catch (error) {
      alert('Failed to delete story')
    }
  }

  // FAQ HANDLERS
  const handleSaveFaq = async () => {
    if (!faqForm.question || !faqForm.answer) {
      alert('Please fill in both question and answer')
      return
    }

    try {
      const token = getToken()
      const data = {
        question: faqForm.question,
        answer: faqForm.answer,
        category: faqForm.category,
        order: faqForm.order,
        status: faqForm.status
      }

      const res = editingFaq
        ? await fetch(`${API_URL}/api/faqs/${editingFaq.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(data)
          })
        : await fetch(`${API_URL}/api/faqs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(data)
          })

      if (res.ok) {
        loadAllData(token!)
        setShowFaqForm(false)
        setEditingFaq(null)
        setFaqForm({ question: '', answer: '', category: 'General', order: 1, status: 'Active' })
      }
    } catch (error) {
      alert('Failed to save FAQ')
    }
  }

  const handleDeleteFaq = async (id: number) => {
    if (!confirm('Delete this FAQ?')) return
    try {
      const token = getToken()
      await fetch(`${API_URL}/api/faqs/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      loadAllData(token!)
    } catch (error) {
      alert('Failed to delete FAQ')
    }
  }

  // IMAGE HANDLERS
  const handleSaveImage = async () => {
    if (!newImageUrl || !editingImage) return
    try {
      const token = getToken()
      await fetch(`${API_URL}/api/images/${editingImage.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ currentUrl: newImageUrl })
      })
      loadAllData(token!)
      setEditingImage(null)
      setNewImageUrl('')
    } catch (error) {
      alert('Failed to update image')
    }
  }

  // BANK HANDLERS
  const handleAddBankAccount = async () => {
    if (!bankForm.accountName || !bankForm.accountNumber || !bankForm.bankName) {
      alert('Please fill in all required fields')
      return
    }

    try {
      const token = getToken()
      const res = await fetch(`${API_URL}/api/bank-accounts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(bankForm)
      })

      if (res.ok) {
        loadAllData(token!)
        setShowBankForm(false)
        setBankForm({ accountName: '', accountNumber: '', bankName: '', swiftCode: '', routingNumber: '', country: 'USA', currency: 'USD', isDefault: false })
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

  const filteredImages = selectedPage === 'All' ? images : images.filter(img => img.page === selectedPage)

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
          <div className="flex gap-6 overflow-x-auto">
            {[
              { id: 'dashboard', label: '📊 Dashboard' },
              { id: 'withdraw', label: '💰 Withdraw' },
              { id: 'causes', label: '🎯 Causes' },
              { id: 'news', label: '📰 News' },
              { id: 'stories', label: '👥 Stories' },
              { id: 'faqs', label: '❓ FAQs' },
              { id: 'images', label: '🖼️ Images' }
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-2 font-semibold border-b-2 transition whitespace-nowrap ${
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
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-sm text-gray-600 mb-2">Available Balance</p>
              <p className="text-3xl font-bold text-green-600">${balance}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-sm text-gray-600 mb-2">Active Causes</p>
              <p className="text-3xl font-bold text-primary">{causes.filter(c => c.status === 'Active').length}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-sm text-gray-600 mb-2">Published News</p>
              <p className="text-3xl font-bold text-green-600">{news.filter(n => n.status === 'Published').length}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-sm text-gray-600 mb-2">Active Stories</p>
              <p className="text-3xl font-bold text-orange-600">{stories.filter(s => s.status === 'Active').length}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-sm text-gray-600 mb-2">Active FAQs</p>
              <p className="text-3xl font-bold text-purple-600">{faqs.filter(f => f.status === 'Active').length}</p>
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
                <button onClick={() => setShowBankForm(true)} className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-dark">
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

            <button onClick={handleWithdraw} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-xl py-6 rounded-lg transition">
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
                      <input type="text" value={bankForm.accountName} onChange={(e) => setBankForm({...bankForm, accountName: e.target.value})}
                        placeholder="John Doe" className="w-full px-4 py-3 border rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Account Number *</label>
                      <input type="text" value={bankForm.accountNumber} onChange={(e) => setBankForm({...bankForm, accountNumber: e.target.value})}
                        placeholder="1234567890" className="w-full px-4 py-3 border rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Bank Name *</label>
                      <input type="text" value={bankForm.bankName} onChange={(e) => setBankForm({...bankForm, bankName: e.target.value})}
                        placeholder="Bank of America" className="w-full px-4 py-3 border rounded-lg" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">SWIFT Code</label>
                        <input type="text" value={bankForm.swiftCode} onChange={(e) => setBankForm({...bankForm, swiftCode: e.target.value})}
                          placeholder="BOFAUS3N" className="w-full px-4 py-3 border rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Routing Number</label>
                        <input type="text" value={bankForm.routingNumber} onChange={(e) => setBankForm({...bankForm, routingNumber: e.target.value})}
                          placeholder="026009593" className="w-full px-4 py-3 border rounded-lg" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked={bankForm.isDefault} onChange={(e) => setBankForm({...bankForm, isDefault: e.target.checked})}
                        className="w-4 h-4" />
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

        {/* CAUSES TAB - Will add complete implementation in next file part */}
        {activeTab === 'causes' && (
          <div>
            <div className="flex justify-between mb-6">
              <h2 className="text-2xl font-bold">Donation Causes</h2>
              <button onClick={() => { setShowCauseForm(true); setEditingCause(null); setCauseForm({ name: '', amount: '', currency: 'ZMW', description: '', icon: '📚', imageUrl: '', useImage: false, status: 'Active', order: causes.length + 1 }) }}
                className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-lg">
                + Add Cause
              </button>
            </div>

            {showCauseForm && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <h3 className="text-2xl font-bold mb-6">{editingCause ? 'Edit' : 'Add'} Cause</h3>
                  <div className="space-y-4">
                    <input type="text" value={causeForm.name} onChange={(e) => setCauseForm({...causeForm, name: e.target.value})}
                      placeholder="Cause Name" className="w-full px-4 py-3 border rounded-lg" />
                    <div className="grid grid-cols-2 gap-4">
                      <input type="number" value={causeForm.amount} onChange={(e) => setCauseForm({...causeForm, amount: e.target.value})}
                        placeholder="Amount" className="w-full px-4 py-3 border rounded-lg" />
                      <select value={causeForm.currency} onChange={(e) => setCauseForm({...causeForm, currency: e.target.value as any})}
                        className="w-full px-4 py-3 border rounded-lg">
                        <option value="USD">USD</option>
                        <option value="ZMW">ZMW</option>
                        <option value="Both">Both</option>
                      </select>
                    </div>
                    <textarea value={causeForm.description} onChange={(e) => setCauseForm({...causeForm, description: e.target.value})}
                      placeholder="Description" className="w-full px-4 py-3 border rounded-lg" rows={3} />
                    
                    <div className="flex gap-4">
                      <button onClick={() => setCauseForm({...causeForm, useImage: false})}
                        className={`flex-1 py-3 rounded-lg font-semibold ${!causeForm.useImage ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                        📱 Emoji
                      </button>
                      <button onClick={() => setCauseForm({...causeForm, useImage: true})}
                        className={`flex-1 py-3 rounded-lg font-semibold ${causeForm.useImage ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                        🖼️ Image
                      </button>
                    </div>

                    {!causeForm.useImage ? (
                      <div className="grid grid-cols-8 gap-2">
                        {emojiOptions.map(emoji => (
                          <button key={emoji} onClick={() => setCauseForm({...causeForm, icon: emoji})}
                            className={`text-3xl p-2 rounded-lg ${causeForm.icon === emoji ? 'bg-primary/20 ring-2 ring-primary' : 'bg-gray-100'}`}>
                            {emoji}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div>
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'cause')}
                          className="w-full px-4 py-3 border rounded-lg" />
                        {causeForm.imageUrl && <img src={causeForm.imageUrl} alt="Preview" className="mt-4 w-32 h-32 object-cover rounded-lg" />}
                      </div>
                    )}

                    <select value={causeForm.status} onChange={(e) => setCauseForm({...causeForm, status: e.target.value as any})}
                      className="w-full px-4 py-3 border rounded-lg">
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <button onClick={handleSaveCause} className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold">
                      {editingCause ? 'Update' : 'Add'}
                    </button>
                    <button onClick={() => { setShowCauseForm(false); setEditingCause(null) }} className="flex-1 bg-gray-200 py-3 rounded-lg font-semibold">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {causes.map(cause => (
                <div key={cause.id} className="bg-white rounded-lg shadow-lg p-6">
                  {cause.imageUrl ? (
                    <img src={cause.imageUrl} alt={cause.name} className="w-full h-40 object-cover rounded-lg mb-4" />
                  ) : (
                    <div className="text-7xl text-center mb-4">{cause.icon}</div>
                  )}
                  <h3 className="text-xl font-bold text-center mb-2">{cause.name}</h3>
                  <p className="text-3xl font-bold text-primary text-center mb-2">
                    {cause.currency === 'USD' ? '$' : cause.currency === 'ZMW' ? 'K' : '$/'}{cause.amount}
                  </p>
                  <p className="text-sm text-gray-600 text-center mb-4">{cause.description}</p>
                  <span className={`block text-center px-3 py-1 text-xs font-semibold rounded-full mb-4 ${
                    cause.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>{cause.status}</span>
                  <div className="flex gap-2">
                    <button onClick={() => { setEditingCause(cause); setCauseForm({ name: cause.name, amount: cause.amount.toString(), currency: cause.currency, description: cause.description, icon: cause.icon || '📚', imageUrl: cause.imageUrl, useImage: !!cause.imageUrl, status: cause.status, order: cause.order }); setShowCauseForm(true) }}
                      className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm">Edit</button>
                    <button onClick={() => handleDeleteCause(cause.id)} className="flex-1 bg-red-600 text-white py-2 rounded-lg text-sm">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Continue with NEWS, STORIES, FAQS, IMAGES tabs... */}

        {activeTab === 'news' && (
          <div>
            <div className="flex justify-between mb-6">
              <h2 className="text-2xl font-bold">News Articles</h2>
              <button onClick={() => { setShowNewsForm(true); setEditingNews(null); setNewsForm({ title: '', description: '', date: new Date().toISOString().split('T')[0], imageUrl: '', icon: '📰', displayType: 'none', status: 'Published' }) }}
                className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-lg">
                + Add News
              </button>
            </div>

            {showNewsForm && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <h3 className="text-2xl font-bold mb-6">{editingNews ? 'Edit' : 'Add'} News</h3>
                  <div className="space-y-4">
                    <input type="text" value={newsForm.title} onChange={(e) => setNewsForm({...newsForm, title: e.target.value})}
                      placeholder="News Title" className="w-full px-4 py-3 border rounded-lg" />
                    <textarea value={newsForm.description} onChange={(e) => setNewsForm({...newsForm, description: e.target.value})}
                      placeholder="Description" className="w-full px-4 py-3 border rounded-lg" rows={4} />
                    <input type="date" value={newsForm.date} onChange={(e) => setNewsForm({...newsForm, date: e.target.value})}
                      className="w-full px-4 py-3 border rounded-lg" />
                    
                    <div className="flex gap-4">
                      <button onClick={() => setNewsForm({...newsForm, displayType: 'none'})}
                        className={`flex-1 py-3 rounded-lg font-semibold ${newsForm.displayType === 'none' ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                        No Visual
                      </button>
                      <button onClick={() => setNewsForm({...newsForm, displayType: 'icon'})}
                        className={`flex-1 py-3 rounded-lg font-semibold ${newsForm.displayType === 'icon' ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                        📱 Emoji
                      </button>
                      <button onClick={() => setNewsForm({...newsForm, displayType: 'image'})}
                        className={`flex-1 py-3 rounded-lg font-semibold ${newsForm.displayType === 'image' ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                        🖼️ Image
                      </button>
                    </div>

                    {newsForm.displayType === 'icon' && (
                      <div className="grid grid-cols-8 gap-2">
                        {emojiOptions.map(emoji => (
                          <button key={emoji} onClick={() => setNewsForm({...newsForm, icon: emoji})}
                            className={`text-3xl p-2 rounded-lg ${newsForm.icon === emoji ? 'bg-primary/20 ring-2 ring-primary' : 'bg-gray-100'}`}>
                            {emoji}
                          </button>
                        ))}
                      </div>
                    )}

                    {newsForm.displayType === 'image' && (
                      <div>
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'news')}
                          className="w-full px-4 py-3 border rounded-lg" />
                        {newsForm.imageUrl && <img src={newsForm.imageUrl} alt="Preview" className="mt-4 w-full h-48 object-cover rounded-lg" />}
                      </div>
                    )}

                    <select value={newsForm.status} onChange={(e) => setNewsForm({...newsForm, status: e.target.value as any})}
                      className="w-full px-4 py-3 border rounded-lg">
                      <option value="Published">Published</option>
                      <option value="Draft">Draft</option>
                    </select>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <button onClick={handleSaveNews} className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold">
                      {editingNews ? 'Update' : 'Publish'}
                    </button>
                    <button onClick={() => { setShowNewsForm(false); setEditingNews(null) }} className="flex-1 bg-gray-200 py-3 rounded-lg font-semibold">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {news.map(article => (
                <div key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  {article.useImage && article.imageUrl ? (
                    <img src={article.imageUrl} alt={article.title} className="w-full h-48 object-cover" />
                  ) : article.icon ? (
                    <div className="bg-gray-100 h-48 flex items-center justify-center">
                      <span className="text-8xl">{article.icon}</span>
                    </div>
                  ) : (
                    <div className="bg-gradient-to-r from-primary to-primary-dark h-48"></div>
                  )}
                  <div className="p-6">
                    <p className="text-sm text-primary mb-2">{new Date(article.date).toLocaleDateString()}</p>
                    <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                    <p className="text-gray-600 mb-4">{article.description}</p>
                    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4 ${
                      article.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>{article.status}</span>
                    <div className="flex gap-2">
                      <button onClick={() => { setEditingNews(article); setNewsForm({ title: article.title, description: article.description, date: article.date.split('T')[0], imageUrl: article.imageUrl, icon: article.icon, displayType: article.useImage ? 'image' : article.icon ? 'icon' : 'none', status: article.status }); setShowNewsForm(true) }}
                        className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm">Edit</button>
                      <button onClick={() => handleDeleteNews(article.id)} className="flex-1 bg-red-600 text-white py-2 rounded-lg text-sm">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'stories' && (
          <div>
            <div className="flex justify-between mb-6">
              <h2 className="text-2xl font-bold">Orphan Stories</h2>
              <button onClick={() => { setShowStoryForm(true); setEditingStory(null); setStoryForm({ name: '', story: '', imageUrl: '', status: 'Active', order: stories.length + 1 }) }}
                className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-lg">
                + Add Story
              </button>
            </div>

            {showStoryForm && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <h3 className="text-2xl font-bold mb-6">{editingStory ? 'Edit' : 'Add'} Orphan Story</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Child's Name *</label>
                      <input type="text" value={storyForm.name} onChange={(e) => setStoryForm({...storyForm, name: e.target.value})}
                        placeholder="e.g., Katema Lenard" className="w-full px-4 py-3 border rounded-lg" />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Photo (PNG/JPG) *</label>
                      <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'story')}
                        className="w-full px-4 py-3 border rounded-lg" />
                      {storyForm.imageUrl && (
                        <img src={storyForm.imageUrl} alt="Preview" className="mt-4 w-48 h-48 object-cover rounded-lg shadow" />
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Their Story *</label>
                      <textarea value={storyForm.story} onChange={(e) => setStoryForm({...storyForm, story: e.target.value})}
                        placeholder="Write their inspiring story here..." className="w-full px-4 py-3 border rounded-lg" rows={8} />
                      <p className="text-xs text-gray-500 mt-1">Tip: Write in first person ("My name is...")</p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                      <select value={storyForm.status} onChange={(e) => setStoryForm({...storyForm, status: e.target.value as any})}
                        className="w-full px-4 py-3 border rounded-lg">
                        <option value="Active">Active (Show on site)</option>
                        <option value="Inactive">Inactive (Hide from site)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <button onClick={handleSaveStory} className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold">
                      {editingStory ? 'Update' : 'Add'} Story
                    </button>
                    <button onClick={() => { setShowStoryForm(false); setEditingStory(null) }} className="flex-1 bg-gray-200 py-3 rounded-lg font-semibold">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stories.map(story => (
                <div key={story.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img src={story.imageUrl} alt={story.name} className="w-full h-64 object-cover" />
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-3">{story.name}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{story.story}</p>
                    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4 ${
                      story.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>{story.status}</span>
                    <div className="flex gap-2">
                      <button onClick={() => { setEditingStory(story); setStoryForm({ name: story.name, story: story.story, imageUrl: story.imageUrl, status: story.status, order: story.order }); setShowStoryForm(true) }}
                        className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm">Edit</button>
                      <button onClick={() => handleDeleteStory(story.id)} className="flex-1 bg-red-600 text-white py-2 rounded-lg text-sm">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'faqs' && (
          <div>
            <div className="flex justify-between mb-6">
              <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
              <button onClick={() => { setShowFaqForm(true); setEditingFaq(null); setFaqForm({ question: '', answer: '', category: 'General', order: faqs.length + 1, status: 'Active' }) }}
                className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-lg">
                + Add FAQ
              </button>
            </div>

            {showFaqForm && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <h3 className="text-2xl font-bold mb-6">{editingFaq ? 'Edit' : 'Add'} FAQ</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Question *</label>
                      <input type="text" value={faqForm.question} onChange={(e) => setFaqForm({...faqForm, question: e.target.value})}
                        placeholder="e.g., How do I donate?" className="w-full px-4 py-3 border rounded-lg" />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Answer *</label>
                      <textarea value={faqForm.answer} onChange={(e) => setFaqForm({...faqForm, answer: e.target.value})}
                        placeholder="Provide a clear, helpful answer..." className="w-full px-4 py-3 border rounded-lg" rows={5} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                        <select value={faqForm.category} onChange={(e) => setFaqForm({...faqForm, category: e.target.value})}
                          className="w-full px-4 py-3 border rounded-lg">
                          <option value="General">General</option>
                          <option value="Donations">Donations</option>
                          <option value="About">About BBOR</option>
                          <option value="Volunteering">Volunteering</option>
                          <option value="Sponsorship">Sponsorship</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Display Order</label>
                        <input type="number" value={faqForm.order} onChange={(e) => setFaqForm({...faqForm, order: parseInt(e.target.value)})}
                          className="w-full px-4 py-3 border rounded-lg" min="1" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                      <select value={faqForm.status} onChange={(e) => setFaqForm({...faqForm, status: e.target.value as any})}
                        className="w-full px-4 py-3 border rounded-lg">
                        <option value="Active">Active (Show on site)</option>
                        <option value="Inactive">Inactive (Hide from site)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <button onClick={handleSaveFaq} className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold">
                      {editingFaq ? 'Update' : 'Add'} FAQ
                    </button>
                    <button onClick={() => { setShowFaqForm(false); setEditingFaq(null) }} className="flex-1 bg-gray-200 py-3 rounded-lg font-semibold">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {faqs.sort((a, b) => a.order - b.order).map((faq, index) => (
                <div key={faq.id} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-primary font-bold text-lg">Q{index + 1}.</span>
                        <h3 className="text-xl font-bold">{faq.question}</h3>
                      </div>
                      <p className="text-gray-600 ml-8">{faq.answer}</p>
                    </div>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ml-4 ${
                      faq.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>{faq.status}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Category: {faq.category}</span>
                    <div className="flex gap-2">
                      <button onClick={() => { setEditingFaq(faq); setFaqForm({ question: faq.question, answer: faq.answer, category: faq.category, order: faq.order, status: faq.status }); setShowFaqForm(true) }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">Edit</button>
                      <button onClick={() => handleDeleteFaq(faq.id)} className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'images' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">Site Images</h2>
              <select value={selectedPage} onChange={(e) => setSelectedPage(e.target.value)}
                className="px-4 py-3 border rounded-lg">
                <option value="All">All Pages</option>
                <option value="Home">Home Page</option>
                <option value="About">About Page</option>
                <option value="Gallery">Gallery Page</option>
              </select>
            </div>

            {editingImage && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg p-8 max-w-xl w-full">
                  <h3 className="text-2xl font-bold mb-6">Replace Image</h3>
                  <p className="mb-4 text-gray-600">
                    <strong>Page:</strong> {editingImage.page}<br />
                    <strong>Location:</strong> {editingImage.location}
                  </p>

                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Upload New Image (PNG/JPG)
                    </label>
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'siteImage')}
                      className="w-full px-4 py-3 border rounded-lg" />
                  </div>

                  <div className="flex gap-4">
                    <button onClick={handleSaveImage} disabled={!newImageUrl}
                      className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold disabled:opacity-50">
                      Save Changes
                    </button>
                    <button onClick={() => { setEditingImage(null); setNewImageUrl('') }}
                      className="flex-1 bg-gray-200 py-3 rounded-lg font-semibold">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredImages.map(img => (
                <div key={img.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img src={img.currentUrl} alt={img.description} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <p className="text-sm text-primary mb-1">{img.page}</p>
                    <h3 className="font-bold mb-1">{img.location}</h3>
                    <p className="text-sm text-gray-600 mb-4">{img.description}</p>
                    <button onClick={() => setEditingImage(img)}
                      className="w-full bg-primary text-white py-2 rounded-lg font-semibold">
                      Replace Image
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
