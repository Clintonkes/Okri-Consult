import React from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-teal-500 bg-clip-text text-transparent">
              Okri Consult LLC
            </a>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</a>
            <a href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
            <a href="/services" className="text-gray-700 hover:text-blue-600 transition-colors">Services</a>
            <a href="/testimonials" className="text-gray-700 hover:text-blue-600 transition-colors">Testimonials</a>
            <a href="/faq" className="text-gray-700 hover:text-blue-600 transition-colors">FAQ</a>
            <a href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
            <a href="/booking" className="btn-secondary">Book Now</a>
            <a href="/admin/login" className="text-gray-500 hover:text-gray-700 transition-colors">Admin</a>
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
            <a href="/" className="block px-3 py-2 text-gray-700">Home</a>
            <a href="/about" className="block px-3 py-2 text-gray-700">About</a>
            <a href="/services" className="block px-3 py-2 text-gray-700">Services</a>
            <a href="/testimonials" className="block px-3 py-2 text-gray-700">Testimonials</a>
            <a href="/faq" className="block px-3 py-2 text-gray-700">FAQ</a>
            <a href="/contact" className="block px-3 py-2 text-gray-700">Contact</a>
            <a href="/booking" className="block px-3 py-2 btn-secondary text-center">Book Now</a>
          </div>
        </div>
      )}
    </nav>
  )
}