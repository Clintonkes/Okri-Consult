import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              Okri Consult LLC
            </h3>
            <p className="text-gray-400">Professional cleaning services that make your space shine.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/booking" className="text-gray-400 hover:text-white transition-colors">Booking</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><span className="text-gray-400">Residential Cleaning</span></li>
              <li><span className="text-gray-400">Commercial Cleaning</span></li>
              <li><span className="text-gray-400">Deep Cleaning</span></li>
              <li><span className="text-gray-400">Move-in/Move-out</span></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-gray-400">
              <p>📞 +1(213)909-1217</p>
              <p>✉️ okriconsult@proton.me</p>
              <p>📍 700 N Inglewood Ave Apt 1, Inglewood CA 90302</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Okri Consult LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
