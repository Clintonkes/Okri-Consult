import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function About() {
  return (
    <>
      <Navbar />
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                About Okri Consult LLC
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                With years of experience in the cleaning industry, Okri Consult LLC has built a reputation for excellence and reliability. We pride ourselves on delivering exceptional cleaning services that exceed expectations.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Our professional team uses eco-friendly products and advanced techniques to ensure your space is not just clean, but truly spotless. We understand that your time is valuable, so we work efficiently while maintaining the highest quality standards.
              </p>
              <p className="text-gray-600 leading-relaxed">
                From residential homes to commercial offices, we treat every space with the care and attention it deserves. Your satisfaction is our top priority.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1600880706871-5e3b218bab05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Cleaning Team" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-3xl p-8 lg:p-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-center text-gray-900 mb-12">
              Why Choose Okri Consult LLC
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🏆</span>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Experienced Professionals</h4>
                <p className="text-gray-600">Our team has years of experience and training in professional cleaning</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">✓</span>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Satisfaction Guaranteed</h4>
                <p className="text-gray-600">We're not satisfied until you're completely happy with our work</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🌱</span>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Eco-Friendly Products</h4>
                <p className="text-gray-600">We use safe, environmentally friendly cleaning products for your family</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
