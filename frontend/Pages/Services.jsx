import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Services() {
  const services = [
    { id: 1, title: "Residential Cleaning", description: "Complete home cleaning including dusting, vacuuming, mopping, and sanitizing all surfaces", icon: "🏠", image: "https://images.unsplash.com/photo-1581578017442-73e757bfcf4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 2, title: "Commercial Cleaning", description: "Office cleaning, desk sanitization, floor care, and common area maintenance", icon: "🏢", image: "https://images.unsplash.com/photo-1497366811353-68707a6b0a89?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 3, title: "Deep Cleaning", description: "Thorough deep clean of neglected areas, appliances, and hard-to-reach spots", icon: "✨", image: "https://images.unsplash.com/photo-1558487704-ec5c8c4e0f4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 4, title: "Move-in/Move-out", description: "Comprehensive cleaning for property transitions and rentals", icon: "📦", image: "https://images.unsplash.com/photo-1581852127542-5e31f019e308?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 5, title: "Post-construction", description: "Specialized cleanup after renovations and construction projects", icon: "🔨", image: "https://images.unsplash.com/photo-1504307651252-ba86586c065f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 6, title: "Recurring Maintenance", description: "Scheduled cleaning services to keep your space consistently clean", icon: "📅", image: "https://images.unsplash.com/photo-1584622562717-5a4249a1f6e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" }
  ]

  return (
    <>
      <Navbar />
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Our Services</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We offer comprehensive cleaning solutions tailored to your specific needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="card card-hover overflow-hidden">
                <div className="aspect-[16/9]">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <a href="/booking" className="inline-block btn-secondary">Book Now</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
