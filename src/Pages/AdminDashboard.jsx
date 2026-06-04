import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api'
import toast from 'react-hot-toast'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [bookings, setBookings] = useState([])
  const [messages, setMessages] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/admin/login')
      return
    }
    fetchData()
  }, [activeTab])

  const fetchData = async () => {
    const token = localStorage.getItem('token')
    if (!token) return
    
    setLoading(true)
    try {
      if (activeTab === 'bookings') {
        const data = await api.get('/bookings')
        setBookings(data)
      } else if (activeTab === 'messages') {
        const data = await api.get('/contact')
        setMessages(data)
      } else if (activeTab === 'testimonials') {
        const data = await api.get('/testimonials?published_only=false')
        setTestimonials(data)
      }
    } catch (error) {
      if (error.message?.includes('401')) {
        localStorage.removeItem('token')
        navigate('/admin/login')
      }
    }
    setLoading(false)
  }

  const handleStatusChange = async (id, status) => {
    const token = localStorage.getItem('token')
    try {
      await api.patch(`/bookings/${id}/status`, { status }, token)
      toast.success('Status updated')
      fetchData()
    } catch (error) {
      toast.error('Failed to update status')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/admin/login')
    toast.success('Logged out successfully')
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'bookings':
        return (
          <div className="space-y-4">
            {bookings.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No bookings found</p>
            ) : (
              bookings.map((booking) => (
                <div key={booking.id} className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-gray-900">{booking.full_name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      booking.status === 'completed' ? 'bg-green-100 text-green-700' :
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{booking.service_type}</p>
                  <p className="text-gray-600 text-sm mb-2">{booking.email} | {booking.phone}</p>
                  <p className="text-gray-600 text-sm mb-3">{booking.address}</p>
                  <div className="flex space-x-2">
                    <button onClick={() => handleStatusChange(booking.id, 'completed')} className="btn-accent text-xs px-3 py-1">Mark Completed</button>
                    <button onClick={() => handleStatusChange(booking.id, 'approved')} className="btn-secondary text-xs px-3 py-1">Approve</button>
                  </div>
                </div>
              ))
            )}
          </div>
        )
      case 'messages':
        return (
          <div className="space-y-4">
            {messages.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No messages found</p>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className="bg-white rounded-lg p-4 shadow-sm">
                  <h3 className="font-bold text-gray-900">{msg.subject}</h3>
                  <p className="text-gray-600 text-sm">{msg.name} - {msg.email}</p>
                  <p className="text-gray-600 mt-2">{msg.message}</p>
                  <span className={`inline-block mt-2 px-2 py-1 rounded text-xs ${msg.is_responded ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {msg.is_responded ? 'Responded' : 'Pending'}
                  </span>
                </div>
              ))
            )}
          </div>
        )
      case 'testimonials':
        return (
          <div className="space-y-4">
            <button onClick={() => setActiveTab('testimonials-new')} className="btn-secondary mb-4">+ Add Testimonial</button>
            {testimonials.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No testimonials found</p>
            ) : (
              testimonials.map((t) => (
                <div key={t.id} className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-gray-600 italic mb-2">"{t.content}"</p>
                  <p className="font-semibold text-gray-900">- {t.name}</p>
                  <span className={`inline-block mt-2 px-2 py-1 rounded text-xs ${t.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {t.is_published ? 'Published' : 'Draft'}
                  </span>
                </div>
              ))
            )}
          </div>
        )
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-4xl mb-2">📅</div>
              <h3 className="font-bold text-gray-900 mb-2">Total Bookings</h3>
              <p className="text-3xl font-bold text-blue-700">{bookings.length || 0}</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-4xl mb-2">✉️</div>
              <h3 className="font-bold text-gray-900 mb-2">Messages</h3>
              <p className="text-3xl font-bold text-teal-700">{messages.length || 0}</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-4xl mb-2">⭐</div>
              <h3 className="font-bold text-gray-900 mb-2">Testimonials</h3>
              <p className="text-3xl font-bold text-green-700">{testimonials.length || 0}</p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <aside className="w-64 bg-white shadow-md min-h-screen">
          <div className="p-6">
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-teal-500 bg-clip-text text-transparent mb-8">
              Okri Admin
            </h2>
            <nav className="space-y-2">
              <button onClick={() => setActiveTab('dashboard')} className={`w-full text-left px-4 py-2 rounded-lg ${activeTab === 'dashboard' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                Dashboard
              </button>
              <button onClick={() => setActiveTab('bookings')} className={`w-full text-left px-4 py-2 rounded-lg ${activeTab === 'bookings' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                Bookings
              </button>
              <button onClick={() => setActiveTab('messages')} className={`w-full text-left px-4 py-2 rounded-lg ${activeTab === 'messages' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                Contact Messages
              </button>
              <button onClick={() => setActiveTab('testimonials')} className={`w-full text-left px-4 py-2 rounded-lg ${activeTab === 'testimonials' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                Testimonials
              </button>
              <button onClick={() => setShowLogoutModal(true)} className="w-full text-left px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 mt-8">
                Logout
              </button>
            </nav>
          </div>
        </aside>
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 capitalize">{activeTab.replace('-', ' ')}</h1>
          {loading ? <p className="text-center py-8">Loading...</p> : renderContent()}
        </main>
      </div>
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Logout</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to log out?</p>
            <div className="flex space-x-3">
              <button onClick={() => setShowLogoutModal(false)} className="btn-secondary flex-1">Cancel</button>
              <button onClick={handleLogout} className="btn-primary bg-red-600 flex-1 hover:bg-red-700">Logout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}