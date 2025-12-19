import { useState, useEffect } from 'react'
import { User, Mail, Phone, Calendar, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

const UserProfile = () => {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const user = localStorage.getItem('mra-user-session')
    if (user) {
      try {
        setUserData(JSON.parse(user))
      } catch (e) {
        console.error('Error parsing user data:', e)
      }
    }
  }, [])

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Login First</h2>
          <Link to="/login" className="text-blue-600 hover:underline">Go to Login</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:underline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-12 h-12 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <User className="w-6 h-6 text-gray-600" />
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="text-lg font-semibold text-gray-900">{userData.name || 'Not provided'}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <Mail className="w-6 h-6 text-gray-600" />
              <div>
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="text-lg font-semibold text-gray-900">{userData.email || 'Not provided'}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <Phone className="w-6 h-6 text-gray-600" />
              <div>
                <p className="text-sm text-gray-500">Mobile Number</p>
                <p className="text-lg font-semibold text-gray-900">{userData.mobileNumber || 'Not provided'}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <Calendar className="w-6 h-6 text-gray-600" />
              <div>
                <p className="text-sm text-gray-500">Account Status</p>
                <p className="text-lg font-semibold text-green-600">Active</p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button 
              onClick={() => {
                localStorage.removeItem('mra-user-session')
                window.location.href = '/'
              }}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile