import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { User, Bell, Menu, X, Wallet, LogOut, Settings, Lock, ArrowLeft, Plus } from 'lucide-react'
import ThemeSwitcher from './ThemeSwitcher'
import WalletTopup from './WalletTopup'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [walletBalance, setWalletBalance] = useState(1250)
  const [showWalletTopup, setShowWalletTopup] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  
  useEffect(() => {
    const balance = localStorage.getItem('mra-wallet-balance')
    if (balance) {
      setWalletBalance(Number(balance))
    }
    
    // Listen for wallet balance updates
    const handleStorageChange = () => {
      const newBalance = localStorage.getItem('mra-wallet-balance')
      if (newBalance) {
        setWalletBalance(Number(newBalance))
      }
    }
    
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])
  
  const handleWalletTopupSuccess = (newBalance) => {
    setWalletBalance(newBalance)
  }
  
  const showBackButton = location.pathname !== '/' && location.pathname !== '/home'

  return (
    <header className="text-white shadow-lg sticky top-0 z-50" style={{ backgroundColor: 'var(--primary-dark, #1e3a8a)' }}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo with Back Button */}
          <div className="flex items-center space-x-3">
            {showBackButton && (
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-white/10 rounded-lg transition"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
            )}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-primary-dark font-bold text-xl">MRA</span>
              </div>
              <span className="font-bold text-xl hidden sm:block">Mobile Recharge</span>
            </Link>
          </div>

          {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
            {/* Balance Display */}
            <div className="hidden md:flex items-center space-x-2">
              <Link 
                to="/wallet"
                className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition"
              >
                <Wallet className="w-5 h-5" />
                <span className="font-semibold">₹{walletBalance}</span>
              </Link>
              {walletBalance < 100 && (
                <button
                  onClick={() => setShowWalletTopup(true)}
                  className="flex items-center space-x-1 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg font-semibold transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Money</span>
                </button>
              )}
            </div>

            {/* Notifications */}
            <button className="relative p-2 hover:bg-white/10 rounded-lg transition">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <ThemeSwitcher />

            {/* User & Admin Links */}
            <Link
              to="/login"
              className="hidden md:inline-flex items-center space-x-2 bg-white text-primary-dark px-3 py-2 rounded-lg font-semibold shadow hover:shadow-md transition"
            >
              <User className="w-4 h-4 text-primary-dark" />
              <span>User Login</span>
            </Link>
            <Link
              to="/admin/login"
              className="hidden md:inline-flex items-center space-x-2 bg-white text-primary-dark px-3 py-2 rounded-lg font-semibold shadow hover:shadow-md transition"
            >
              <Lock className="w-4 h-4" />
              <span>Admin</span>
            </Link>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 p-2 hover:bg-white/10 rounded-lg transition"
              >
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-primary-dark" />
                </div>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50">
                  <div className="px-4 py-2 border-b">
                    <p className="text-gray-900 font-semibold">
                      {(() => {
                        const user = localStorage.getItem('mra-user-session')
                        if (user) {
                          try { 
                            const userData = JSON.parse(user)
                            return userData.name || userData.email || 'User'
                          } catch { return 'User' }
                        }
                        return 'Guest'
                      })()}
                    </p>
                    <p className="text-sm text-gray-500">
                      {(() => {
                        const user = localStorage.getItem('mra-user-session')
                        if (user) {
                          try { 
                            const userData = JSON.parse(user)
                            return userData.email || ''
                          } catch { return '' }
                        }
                        return ''
                      })()}
                    </p>
                    <p className="text-xs text-gray-400">
                      {(() => {
                        const user = localStorage.getItem('mra-user-session')
                        if (user) {
                          try { 
                            const userData = JSON.parse(user)
                            return userData.mobileNumber || ''
                          } catch { return '' }
                        }
                        return ''
                      })()}
                    </p>
                  </div>
                  <Link 
                    to="/profile"
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center space-x-2 transition"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <Settings className="w-4 h-4" />
                    <span>Profile</span>
                  </Link>
                  <button 
                    onClick={() => {
                      if (window.confirm('Are you sure you want to logout?')) {
                        alert('Logged out successfully!')
                      }
                    }}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center space-x-2 transition"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-white/10 rounded-lg transition"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <div className="space-y-2 mb-2">
              <div className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-lg">
                <Wallet className="w-5 h-5" />
                <span className="font-semibold">Balance: ₹{walletBalance}</span>
              </div>
              {walletBalance < 100 && (
                <button
                  onClick={() => {
                    setShowWalletTopup(true)
                    setIsMenuOpen(false)
                  }}
                  className="w-full flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Money to Wallet</span>
                </button>
              )}
            </div>
            <nav className="flex flex-col space-y-2">
              <Link to="/recharge" className="px-4 py-2 hover:bg-white/10 rounded" onClick={() => setIsMenuOpen(false)}>Recharge</Link>
              <Link to="/bills" className="px-4 py-2 hover:bg-white/10 rounded" onClick={() => setIsMenuOpen(false)}>Bill Pay</Link>
              <Link to="/wallet" className="px-4 py-2 hover:bg-white/10 rounded" onClick={() => setIsMenuOpen(false)}>Wallet</Link>
              <Link to="/history" className="px-4 py-2 hover:bg-white/10 rounded" onClick={() => setIsMenuOpen(false)}>History</Link>
              <Link to="/offers" className="px-4 py-2 hover:bg-white/10 rounded" onClick={() => setIsMenuOpen(false)}>Offers</Link>
            <Link to="/login" className="px-4 py-2 hover:bg-white/10 rounded" onClick={() => setIsMenuOpen(false)}>User Login</Link>
              <Link to="/admin/login" className="px-4 py-2 hover:bg-white/10 rounded" onClick={() => setIsMenuOpen(false)}>Admin</Link>
            </nav>
          </div>
        )}
      </div>
      
      {/* Wallet Topup Modal */}
      {showWalletTopup && (
        <WalletTopup
          onClose={() => setShowWalletTopup(false)}
          onSuccess={handleWalletTopupSuccess}
        />
      )}
    </header>
  )
}

export default Header
