import React from 'react'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-teal-50 py-20 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Professional Cleaning Services <span className="bg-gradient-to-r from-blue-700 to-teal-500 bg-clip-text text-transparent">You Can Trust</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We provide premium residential and commercial cleaning services with meticulous attention to detail. Your satisfaction is guaranteed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a href="/booking" className="btn-primary text-center">Book Now</a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-sm font-medium text-gray-700">Insured</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-sm font-medium text-gray-700">Reliable</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-sm font-medium text-gray-700">Professional</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-sm font-medium text-gray-700">Guaranteed</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-100 to-teal-100">
              <img 
                src="https://images.unsplash.com/photo-1581578017442-73e757bfcf4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Professional Cleaner" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">★</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900">4.9/5 Rating</p>
                  <p className="text-sm text-gray-500">Customer Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
