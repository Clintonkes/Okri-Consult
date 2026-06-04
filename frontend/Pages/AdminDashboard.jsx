import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api'
import toast from 'react-hot-toast'

const PAGE_SIZE = 10

const initialPageState = {
  items: [],
  total: 0,
  page: 1,
  limit: PAGE_SIZE,
  total_pages: 1,
}

function formatDate(value) {
  if (!value) return '-'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return String(value)
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

function statusBadge(status) {
  const normalized = String(status || '').toLowerCase()
  if (normalized === 'completed') return 'bg-green-100 text-green-700'
  if (normalized === 'approved') return 'bg-cyan-100 text-teal-700'
  if (normalized === 'denied') return 'bg-red-100 text-red-700'
  return 'bg-amber-100 text-amber-800'
}

function readBadge(isRead) {
  return isRead ? 'bg-green-100 text-green-700' : 'bg-cyan-100 text-teal-700'
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [authChecked, setAuthChecked] = useState(false)
  const [bookingsPage, setBookingsPage] = useState(1)
  const [messagesPage, setMessagesPage] = useState(1)
  const [testimonialsPage, setTestimonialsPage] = useState(1)
  const [bookingData, setBookingData] = useState(initialPageState)
  const [messageData, setMessageData] = useState(initialPageState)
  const [testimonialData, setTestimonialData] = useState(initialPageState)
  const [counts, setCounts] = useState({ bookings: 0, messages: 0, testimonials: 0 })
  const [modalState, setModalState] = useState({
    open: false,
    type: null,
    loading: false,
    data: null,
  })
  const navigate = useNavigate()

  const token = localStorage.getItem('token')

  const loadDashboardCounts = async () => {
    const [bookings, messages, testimonials] = await Promise.all([
      api.get(`/bookings?page=1&limit=1`, token),
      api.get(`/contact?page=1&limit=1`, token),
      api.get(`/testimonials?page=1&limit=1&published_only=false`, token),
    ])
    setCounts({
      bookings: bookings.total || 0,
      messages: messages.total || 0,
      testimonials: testimonials.total || 0,
    })
  }

  const loadTabData = async () => {
    setLoading(true)
    try {
      if (activeTab === 'dashboard') {
        await loadDashboardCounts()
      } else if (activeTab === 'bookings') {
        const data = await api.get(`/bookings?page=${bookingsPage}&limit=${PAGE_SIZE}`, token)
        setBookingData(data)
      } else if (activeTab === 'messages') {
        const data = await api.get(`/contact?page=${messagesPage}&limit=${PAGE_SIZE}`, token)
        setMessageData(data)
      } else if (activeTab === 'testimonials') {
        const data = await api.get(`/testimonials?page=${testimonialsPage}&limit=${PAGE_SIZE}&published_only=false`, token)
        setTestimonialData(data)
      }
    } catch (error) {
      if (error.message?.includes('401')) {
        localStorage.removeItem('token')
        navigate('/admin')
        return
      }
      toast.error('Failed to load admin records')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!token) {
      navigate('/admin')
      return
    }
    setAuthChecked(true)
  }, [navigate, token])

  useEffect(() => {
    if (!authChecked) return
    loadTabData()
  }, [activeTab, bookingsPage, messagesPage, testimonialsPage, authChecked])

  const openRecord = async (type, record) => {
    setModalState({ open: true, type, loading: true, data: null })
    try {
      let data = record
      if (type === 'booking') {
        data = await api.get(`/bookings/${record.id}`, token)
      } else if (type === 'message') {
        data = await api.get(`/contact/${record.id}`, token)
      }
      setModalState({ open: true, type, loading: false, data })
      if (type === 'message') {
        await refreshCurrentTab()
      }
    } catch (error) {
      if (error.message?.includes('401')) {
        localStorage.removeItem('token')
        navigate('/admin')
        return
      }
      toast.error('Failed to open record')
      setModalState({ open: false, type: null, loading: false, data: null })
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setSidebarOpen(false)
    navigate('/admin')
  }

  const refreshCurrentTab = async () => {
    if (activeTab === 'dashboard') {
      await loadDashboardCounts()
      return
    }
    if (activeTab === 'bookings') {
      const data = await api.get(`/bookings?page=${bookingsPage}&limit=${PAGE_SIZE}`, token)
      setBookingData(data)
      return
    }
    if (activeTab === 'messages') {
      const data = await api.get(`/contact?page=${messagesPage}&limit=${PAGE_SIZE}`, token)
      setMessageData(data)
      return
    }
    if (activeTab === 'testimonials') {
      const data = await api.get(`/testimonials?page=${testimonialsPage}&limit=${PAGE_SIZE}&published_only=false`, token)
      setTestimonialData(data)
    }
  }

  const updateBookingStatus = async (bookingId, status) => {
    try {
      await api.patch(`/bookings/${bookingId}/status?status=${encodeURIComponent(status)}`, {}, token)
      toast.success(`Booking marked as ${status}`)
      await refreshCurrentTab()
      if (modalState.open && modalState.type === 'booking' && modalState.data?.id === bookingId) {
        const updated = await api.get(`/bookings/${bookingId}`, token)
        setModalState((current) => ({ ...current, data: updated }))
      }
    } catch (error) {
      toast.error('Failed to update booking status')
    }
  }

  const closeModal = () => {
    setModalState({ open: false, type: null, loading: false, data: null })
  }

  const Pagination = ({ pageState, onPrev, onNext }) => (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
      <p className="text-sm text-gray-600">
        Page {pageState.page} of {pageState.total_pages} · {pageState.total} total records
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrev}
          disabled={pageState.page <= 1}
          className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 disabled:opacity-40"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={pageState.page >= pageState.total_pages}
          className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  )

  const renderDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
        <div className="text-4xl mb-2">📅</div>
        <h3 className="font-bold text-gray-900 mb-2">Total Bookings</h3>
        <p className="text-3xl font-bold text-blue-700">{counts.bookings}</p>
      </div>
      <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
        <div className="text-4xl mb-2">✉️</div>
        <h3 className="font-bold text-gray-900 mb-2">Contact Messages</h3>
        <p className="text-3xl font-bold text-teal-700">{counts.messages}</p>
      </div>
      <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
        <div className="text-4xl mb-2">⭐</div>
        <h3 className="font-bold text-gray-900 mb-2">Testimonials</h3>
        <p className="text-3xl font-bold text-green-700">{counts.testimonials}</p>
      </div>
    </div>
  )

  const renderBookings = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-[760px] w-full text-left">
          <thead className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {bookingData.items.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="px-4 py-4">
                  <div className="font-semibold text-gray-900">{booking.full_name}</div>
                  <div className="text-sm text-gray-500">{booking.email}</div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-700">{booking.service_type}</td>
                <td className="px-4 py-4">
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${statusBadge(booking.status)}`}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">{formatDate(booking.created_at)}</td>
                <td className="px-4 py-4">
                  <div className="flex justify-end gap-2">
                    <button type="button" onClick={() => openRecord('booking', booking)} className="px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700">
                      View
                    </button>
                    <button type="button" onClick={() => updateBookingStatus(booking.id, 'approved')} className="btn-secondary text-xs px-3 py-2">
                      Approve
                    </button>
                    <button type="button" onClick={() => updateBookingStatus(booking.id, 'completed')} className="btn-accent text-xs px-3 py-2">
                      Complete
                    </button>
                    <button type="button" onClick={() => updateBookingStatus(booking.id, 'denied')} className="px-3 py-2 rounded-lg bg-red-600 text-white text-xs font-semibold hover:bg-red-700">
                      Deny
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {bookingData.items.length === 0 && (
              <tr>
                <td colSpan="5" className="px-4 py-10 text-center text-gray-500">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-gray-100">
        <Pagination
          pageState={bookingData}
          onPrev={() => setBookingsPage((current) => Math.max(current - 1, 1))}
          onNext={() => setBookingsPage((current) => Math.min(current + 1, bookingData.total_pages))}
        />
      </div>
    </div>
  )

  const renderMessages = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-[760px] w-full text-left">
          <thead className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3">Sender</th>
              <th className="px-4 py-3">Subject</th>
              <th className="px-4 py-3">Read</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {messageData.items.map((message) => (
              <tr key={message.id} className="hover:bg-gray-50">
                <td className="px-4 py-4">
                  <div className="font-semibold text-gray-900">{message.name}</div>
                  <div className="text-sm text-gray-500">{message.email}</div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-700">{message.subject}</td>
                <td className="px-4 py-4">
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${readBadge(message.is_responded)}`}>
                    {message.is_responded ? 'Read' : 'Unread'}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">{formatDate(message.created_at)}</td>
                <td className="px-4 py-4">
                  <div className="flex justify-end gap-2">
                    <button type="button" onClick={() => openRecord('message', message)} className="px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700">
                      View
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {messageData.items.length === 0 && (
              <tr>
                <td colSpan="5" className="px-4 py-10 text-center text-gray-500">
                  No messages found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-gray-100">
        <Pagination
          pageState={messageData}
          onPrev={() => setMessagesPage((current) => Math.max(current - 1, 1))}
          onNext={() => setMessagesPage((current) => Math.min(current + 1, messageData.total_pages))}
        />
      </div>
    </div>
  )

  const renderTestimonials = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-[760px] w-full text-left">
          <thead className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Rating</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {testimonialData.items.map((testimonial) => (
              <tr key={testimonial.id} className="hover:bg-gray-50">
                <td className="px-4 py-4">
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500 truncate">{testimonial.content}</div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-700">{testimonial.rating}/5</td>
                <td className="px-4 py-4">
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${testimonial.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {testimonial.is_published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">{formatDate(testimonial.created_at)}</td>
                <td className="px-4 py-4">
                  <div className="flex justify-end gap-2">
                    <button type="button" onClick={() => openRecord('testimonial', testimonial)} className="px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700">
                      View
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {testimonialData.items.length === 0 && (
              <tr>
                <td colSpan="5" className="px-4 py-10 text-center text-gray-500">
                  No testimonials found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-gray-100">
        <Pagination
          pageState={testimonialData}
          onPrev={() => setTestimonialsPage((current) => Math.max(current - 1, 1))}
          onNext={() => setTestimonialsPage((current) => Math.min(current + 1, testimonialData.total_pages))}
        />
      </div>
    </div>
  )

  const renderContent = useMemo(() => {
    if (activeTab === 'dashboard') return renderDashboard()
    if (activeTab === 'bookings') return renderBookings()
    if (activeTab === 'messages') return renderMessages()
    if (activeTab === 'testimonials') return renderTestimonials()
    return null
  }, [activeTab, bookingData, messageData, testimonialData, counts])

  if (!authChecked) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="md:hidden sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <button type="button" onClick={() => setSidebarOpen(true)} className="px-3 py-2 rounded-lg border border-gray-200 text-gray-700">
          Menu
        </button>
        <div className="font-bold text-gray-900">Okri Admin</div>
        <button type="button" onClick={handleLogout} className="text-sm font-semibold text-red-600">
          Logout
        </button>
      </div>

      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex">
        <aside
          className={`fixed md:static inset-y-0 left-0 z-50 w-72 bg-white shadow-xl md:shadow-md border-r border-gray-100 transform transition-transform duration-300 md:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-start justify-between gap-4 mb-8">
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-teal-500 bg-clip-text text-transparent">
                  Okri Admin
                </h2>
                <p className="text-sm text-gray-500 mt-1">Management console</p>
              </div>
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="md:hidden text-gray-500 hover:text-gray-900"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <nav className="space-y-2">
              {[
                ['dashboard', 'Dashboard'],
                ['bookings', 'Bookings'],
                ['messages', 'Contact Messages'],
                ['testimonials', 'Testimonials'],
              ].map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setActiveTab(key)
                    setSidebarOpen(false)
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-colors ${
                    activeTab === key ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {label}
                </button>
              ))}
            </nav>

            <div className="mt-auto pt-6">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 font-semibold"
              >
                Logout
              </button>
            </div>
          </div>
        </aside>

        <main className="flex-1 min-h-screen p-4 md:p-8 md:ml-0">
          <div className="hidden md:flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 capitalize">{activeTab.replace('-', ' ')}</h1>
              <p className="text-gray-600">Manage bookings, messages, and testimonials.</p>
            </div>
          </div>

          {loading ? (
            <div className="py-20 text-center text-gray-600">Loading...</div>
          ) : (
            renderContent
          )}
        </main>
      </div>

      {modalState.open && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-end md:items-center justify-center p-0 md:p-4">
          <div className="bg-white w-full md:max-w-2xl rounded-t-3xl md:rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
            {modalState.loading ? (
              <div className="p-8 text-center text-gray-600">Loading...</div>
            ) : (
              <div className="p-6 md:p-8">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {modalState.type === 'booking' && 'Booking Details'}
                      {modalState.type === 'message' && 'Contact Message'}
                      {modalState.type === 'testimonial' && 'Testimonial'}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">Detailed view for the selected record.</p>
                  </div>
                  <button type="button" onClick={closeModal} className="text-gray-500 hover:text-gray-900 text-2xl leading-none">
                    ×
                  </button>
                </div>

                {modalState.type === 'booking' && modalState.data && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Detail label="Name" value={modalState.data.full_name} />
                      <Detail label="Email" value={modalState.data.email} />
                      <Detail label="Phone" value={modalState.data.phone} />
                      <Detail label="Service" value={modalState.data.service_type} />
                      <Detail label="Preferred Date" value={modalState.data.preferred_date} />
                      <Detail label="Preferred Time" value={modalState.data.preferred_time} />
                    </div>
                    <Detail label="Address" value={modalState.data.address} />
                    <Detail label="Instructions" value={modalState.data.special_instructions || 'None'} />
                    <div className="flex flex-wrap gap-3 pt-2">
                      <button type="button" onClick={() => updateBookingStatus(modalState.data.id, 'approved')} className="btn-secondary">
                        Approve
                      </button>
                      <button type="button" onClick={() => updateBookingStatus(modalState.data.id, 'completed')} className="btn-accent">
                        Complete
                      </button>
                      <button type="button" onClick={() => updateBookingStatus(modalState.data.id, 'denied')} className="px-4 py-3 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700">
                        Deny
                      </button>
                    </div>
                  </div>
                )}

                {modalState.type === 'message' && modalState.data && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Detail label="Name" value={modalState.data.name} />
                      <Detail label="Email" value={modalState.data.email} />
                      <Detail label="Phone" value={modalState.data.phone || 'Not provided'} />
                      <Detail label="Subject" value={modalState.data.subject} />
                    </div>
                    <Detail label="Message" value={modalState.data.message} />
                    <div className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${readBadge(modalState.data.is_responded)}`}>
                      {modalState.data.is_responded ? 'Read' : 'Unread'}
                    </div>
                  </div>
                )}

                {modalState.type === 'testimonial' && modalState.data && (
                  <div className="space-y-4">
                    <Detail label="Name" value={modalState.data.name} />
                    <Detail label="Rating" value={`${modalState.data.rating}/5`} />
                    <Detail label="Content" value={modalState.data.content} />
                    <div className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${modalState.data.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {modalState.data.is_published ? 'Published' : 'Draft'}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function Detail({ label, value }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
      <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">{label}</div>
      <div className="text-sm text-gray-900 whitespace-pre-wrap">{value}</div>
    </div>
  )
}
