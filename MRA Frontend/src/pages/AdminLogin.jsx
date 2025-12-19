import { useState, useEffect } from 'react'
import { Eye, EyeOff, Lock, Mail, LogIn, UserPlus, Home } from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'
import API_BASE_URL from '../config/api'

const AdminLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [mode, setMode] = useState('login') // login | register
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    setError('')
    setSuccess('')
  }, [mode])

  const getStoredAdmin = () => {
    const data = localStorage.getItem('mra-admin-cred')
    if (!data) return null
    try {
      return JSON.parse(data)
    } catch (e) {
      return null
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      if (mode === 'register') {
        if (!email || !password) {
          setError('Please enter email and password')
          setIsLoading(false)
          return
        }

        const response = await fetch(`${API_BASE_URL}/admin/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: email.split('@')[0], // Use email prefix as name
            email,
            password
          })
        })

        const data = await response.json()

        if (response.ok) {
          localStorage.setItem('mra-admin-cred', JSON.stringify({ email, password }))
          setSuccess('Admin registered successfully! You can now log in.')
          setMode('login')
        } else {
          setError(data.message || 'Registration failed')
        }
      } else {
        // Login mode
        const response = await fetch(`${API_BASE_URL}/admin/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        })

        const data = await response.json()

        if (response.ok) {
          localStorage.setItem('mra-admin-session', JSON.stringify({
            adminId: data.adminId,
            email: email,
            name: data.admin?.name || email.split('@')[0]
          }))
          setSuccess('Login successful!')
          setTimeout(() => {
            navigate('/admin/dashboard')
          }, 800)
        } else {
          setError(data.message || 'Invalid credentials')
        }
      }
    } catch (error) {
      console.error('Auth error:', error)
      setError('Connection error. Please check if the server is running.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo/Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <Lock className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {mode === 'login' ? 'Admin Login' : 'Admin Registration'}
          </h1>
          <p className="text-gray-600">
            {mode === 'login' ? 'Sign in to access the admin dashboard' : 'Create your admin account'}
          </p>
          <div className="mt-3">
            <Link to="/" className="inline-flex items-center space-x-2 text-blue-600 font-semibold hover:underline">
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email / Username
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
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

            {/* Alerts */}
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

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{mode === 'login' ? 'Logging in...' : 'Registering...'}</span>
                </>
              ) : (
                <>
                  {mode === 'login' ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                  <span>{mode === 'login' ? 'Login' : 'Register'}</span>
                </>
              )}
            </button>

            <div className="text-center text-sm text-gray-600">
              {mode === 'login' ? 'No admin account?' : 'Already registered?'}{' '}
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

        {/* Back to Home */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-gray-600 hover:text-gray-900 text-sm font-medium"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
