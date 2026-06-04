import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { api } from '../services/api'
import toast from 'react-hot-toast'

export default function AdminLogin() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await api.post('/auth/login', formData)
      localStorage.setItem('token', response.access_token)
      toast.success('Login successful!')
      navigate('/admin/dashboard')
    } catch (error) {
      toast.error('Invalid credentials')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center">
      <div className="card p-12 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-between gap-4 mb-6">
            <Link to="/" className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">
              Home
            </Link>
            <span className="text-xs uppercase tracking-[0.2em] text-gray-500">Admin Login</span>
          </div>
          <Link to="/" className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-teal-500 bg-clip-text text-transparent">
            Okri Admin
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="input-field"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="input-field"
            required
          />
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}
