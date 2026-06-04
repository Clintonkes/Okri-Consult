import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Testimonials() {
  const testimonials = [
    { id: 1, name: "Sarah Johnson", content: "Okri Consult LLC transformed my office space! The team was professional, thorough, and used eco-friendly products. Highly recommend!", rating: 5 },
    { id: 2, name: "Michael Chen", content: "Best cleaning service I've ever used. They pay attention to every detail and our home has never looked better.", rating: 5 },
    { id: 3, name: "Emily Rodriguez", content: "After our construction project, Okri Consult cleaned it all up perfectly. Saved us so much time and stress!", rating: 5 },
    { id: 4, name: "David Thompson", content: "Reliable, trustworthy, and excellent quality. We've been using them for monthly maintenance and couldn't be happier.", rating: 4 },
    { id: 5, name: "Lisa Williams", content: "The move-out cleaning they provided was incredible. Our landlord was impressed, and we got our full deposit back!", rating: 5 },
    { id: 6, name: "Robert Kim", content: "Professional team, great communication, and fantastic results. Five stars all around!", rating: 5 }
  ]

  return (
    <>
      <Navbar />
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">What Our Clients Say</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="card p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-xl ${i < testimonial.rating ? 'text-cyan-500' : 'text-gray-300'}`}>★</span>
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-teal-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold">{testimonial.name[0]}</span>
                  </div>
                  <span className="font-semibold text-gray-900">{testimonial.name}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a href="/booking" className="btn-primary inline-block">Join Our Happy Customers</a>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
