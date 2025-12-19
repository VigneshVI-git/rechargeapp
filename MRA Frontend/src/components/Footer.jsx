import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-dark font-bold text-xl">MRA</span>
              </div>
              <span className="font-bold text-xl">Mobile Recharge</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted partner for mobile recharges, bill payments, and money transfers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-sky-500 transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-pink-600 transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-700 transition">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/recharge" className="text-gray-400 hover:text-white transition">
                  Mobile Recharge
                </Link>
              </li>
              <li>
                <Link to="/bills" className="text-gray-400 hover:text-white transition">
                  Bill Payment
                </Link>
              </li>
              <li>
                <Link to="/history" className="text-gray-400 hover:text-white transition">
                  Transaction History
                </Link>
              </li>
              <li>
                <Link to="/offers" className="text-gray-400 hover:text-white transition">
                  Offers & Deals
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400">+91 1234 567 890</span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400">support@mra.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  123 Business Street,<br />
                  City, State 123456
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Download App */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <h3 className="font-bold text-lg mb-4 text-center">Download Our App</h3>
          <div className="flex justify-center space-x-4">
            <a href="#" className="bg-gray-700 px-6 py-3 rounded-lg hover:bg-gray-600 transition flex items-center space-x-2">
              <span className="text-2xl">📱</span>
              <div className="text-left">
                <div className="text-xs text-gray-400">Download on the</div>
                <div className="font-semibold">App Store</div>
              </div>
            </a>
            <a href="#" className="bg-gray-700 px-6 py-3 rounded-lg hover:bg-gray-600 transition flex items-center space-x-2">
              <span className="text-2xl">🤖</span>
              <div className="text-left">
                <div className="text-xs text-gray-400">Get it on</div>
                <div className="font-semibold">Google Play</div>
              </div>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Mobile Recharge App. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
