import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-teal-500 bg-clip-text text-transparent">
              Okri Consult LLC
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">About</Link>
            <Link to="/services" className="text-gray-700 hover:text-blue-600 transition-colors">Services</Link>
            <Link to="/testimonials" className="text-gray-700 hover:text-blue-600 transition-colors">Testimonials</Link>
            <Link to="/faq" className="text-gray-700 hover:text-blue-600 transition-colors">FAQ</Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</Link>
            <Link to="/booking" className="btn-secondary">Book Now</Link>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/" className="block px-3 py-2 text-gray-700">Home</Link>
            <Link to="/about" className="block px-3 py-2 text-gray-700">About</Link>
            <Link to="/services" className="block px-3 py-2 text-gray-700">Services</Link>
            <Link to="/testimonials" className="block px-3 py-2 text-gray-700">Testimonials</Link>
            <Link to="/faq" className="block px-3 py-2 text-gray-700">FAQ</Link>
            <Link to="/contact" className="block px-3 py-2 text-gray-700">Contact</Link>
            <Link to="/booking" className="block px-3 py-2 btn-secondary text-center">Book Now</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
