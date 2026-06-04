import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

export default function Home() {
  const services = [
    { id: 1, title: "Residential Cleaning", description: "Complete home cleaning services tailored to your needs", icon: "🏠" },
    { id: 2, title: "Commercial Cleaning", description: "Professional office and business space cleaning", icon: "🏢" },
    { id: 3, title: "Deep Cleaning", description: "Thorough deep clean for neglected spaces", icon: "✨" },
    { id: 4, title: "Move-in/Move-out", description: "Comprehensive cleaning for moving transitions", icon: "📦" },
    { id: 5, title: "Post-construction", description: "Specialized cleanup after construction projects", icon: "🔨" },
    { id: 6, title: "Recurring Maintenance", description: "Scheduled cleaning for consistent freshness", icon: "📅" }
  ]

  return (
    <>
      <Navbar />
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-teal-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Professional Cleaning <span className="bg-gradient-to-r from-blue-700 to-teal-500 bg-clip-text text-transparent">Services</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              We provide premium residential and commercial cleaning services that leave your space spotless and refreshed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link to="/booking" className="btn-primary">Book Now</Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">✓</span>
                </div>
                <span className="font-semibold text-gray-800">Insured</span>
              </div>
              <div className="text-center">
                <div className="bg-cyan-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">⭐</span>
                </div>
                <span className="font-semibold text-gray-800">Reliable</span>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">👔</span>
                </div>
                <span className="font-semibold text-gray-800">Professional</span>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">💯</span>
                </div>
                <span className="font-semibold text-gray-800">Guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Comprehensive cleaning solutions for every need</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="card card-hover p-8 text-center">
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link to="/booking" className="text-blue-700 font-semibold hover:text-teal-600 transition-colors">
                  Book Now →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-blue-700 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Ready for a Spotless Space?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Book your professional cleaning service today and experience the difference.
          </p>
          <Link to="/booking" className="btn-accent">Get Your Free Quote</Link>
        </div>
      </section>

      <Footer />
    </>
  )
}
