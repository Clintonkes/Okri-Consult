import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)
  
  const faqs = [
    { question: "What areas do you service?", answer: "We service Inglewood, CA and surrounding areas within a 30-mile radius. Contact us to confirm service availability in your area." },
    { question: "How much does cleaning cost?", answer: "Our pricing varies based on service type, property size, and frequency. We offer competitive rates starting at $89 for basic residential cleaning. Get a free quote for accurate pricing." },
    { question: "Do you bring your own cleaning supplies?", answer: "Yes, we bring all professional-grade cleaning supplies and equipment. We use eco-friendly products that are safe for your family and pets." },
    { question: "Are you insured and bonded?", answer: "Absolutely. We are fully licensed, insured, and bonded for your peace of mind. All our cleaners undergo background checks." },
    { question: "What is your cancellation policy?", answer: "We require 24 hours notice for cancellations. Cancellations made less than 24 hours before the scheduled service may incur a fee." },
    { question: "How do I pay for services?", answer: "We accept credit cards, debit cards, and bank transfers. Payment is processed securely online after service completion." }
  ]

  return (
    <>
      <Navbar />
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
            <p className="text-gray-600">Find answers to common questions about our services</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="card">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full p-6 text-left flex justify-between items-center"
                >
                  <span className="font-bold text-gray-900">{faq.question}</span>
                  <span className={`text-teal-600 text-xl transition-transform ${openIndex === index ? 'rotate-45' : ''}`}>+</span>
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <Link to="/contact" className="btn-secondary">Contact Us</Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
