import { useState, useEffect } from 'react'
import { Eye, EyeOff, Mail, Lock, LogIn, Home } from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'

const UserLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [mode, setMode] = useState('login')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    setError('')
    setSuccess('')
  }, [mode])

  const getStoredUser = () => {
    const data = localStorage.getItem('mra-user-cred')
    if (!data) return null
    try {
      return JSON.parse(data)
    } catch (e) {
      return null
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    
    try {
      if (mode === 'register') {
        // Validate mobile number
        if (mobileNumber.length !== 10 || !/^[0-9]+$/.test(mobileNumber)) {
          setError('Please enter a valid 10-digit mobile number')
          return
        }
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/user/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            name, 
            email, 
            password, 
            mobileNumber 
          })
        })
        const data = await response.json()
        if (response.ok) {
          setSuccess('Registered successfully! You can now log in.')
          // Clear form fields
          setName('')
          setEmail('')
          setPassword('')
          setMobileNumber('')
          setMode('login')
        } else {
          setError(data.message || 'Registration failed')
        }
      } else {
        // login
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/user/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        })
        const data = await response.json()
        if (response.ok) {
          localStorage.setItem('mra-user-session', JSON.stringify(data.user))
          setSuccess('Login successful!')
          setTimeout(() => navigate('/'), 500)
        } else {
          setError(data.message || 'Login failed')
        }
      }
    } catch (error) {
      setError('Connection error. Make sure backend is running.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-sky-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-2xl mb-4 shadow-lg">
            <LogIn className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {mode === 'login' ? 'User Login' : 'User Registration'}
          </h1>
          <p className="text-gray-600">
            {mode === 'login' ? 'Access your account and offers' : 'Create your account to continue'}
          </p>
          <div className="mt-3">
            <Link to="/" className="inline-flex items-center space-x-2 text-blue-600 font-semibold hover:underline">
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === 'register' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="10-digit mobile number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    maxLength="10"
                    required
                  />
                </div>
              </>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="px-4 py-3 rounded-lg bg-red-50 text-red-700 border border-red-100">
                {error}
              </div>
            )}
            {success && (
              <div className="px-4 py-3 rounded-lg bg-green-50 text-green-700 border border-green-100">
                {success}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-emerald-700 transition shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              {mode === 'login' ? 'Login' : 'Register'}
            </button>

            <div className="text-center text-sm text-gray-600">
              {mode === 'login' ? 'No account?' : 'Already registered?'}{' '}
              <button
                type="button"
                onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                className="text-blue-600 font-semibold hover:underline"
              >
                {mode === 'login' ? 'Register here' : 'Login here'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserLogin

