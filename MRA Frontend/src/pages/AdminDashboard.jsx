import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Menu, X, Bell, Search, Sun, Moon, LogOut, 
  LayoutDashboard, FileText, Users, Settings, 
  TrendingUp, DollarSign, CheckCircle, Clock,
  Plus, Edit, Trash2, Eye, ShieldCheck
} from 'lucide-react'

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [plans, setPlans] = useState([])
  const [planForm, setPlanForm] = useState({
    title: '',
    price: '',
    validity: '',
    data: '',
    cashback: '',
    type: 'popular',
    talktime: 'Unlimited',
  })
  const [adminEmail, setAdminEmail] = useState('')
  const [planMessage, setPlanMessage] = useState('')
  const [notifications, setNotifications] = useState([])
  const [showNotifications, setShowNotifications] = useState(false)

  // Load admin info and fetch plans from backend
  useEffect(() => {
    // Check for admin session first
    const adminSession = localStorage.getItem('mra-admin-session')
    if (adminSession) {
      try {
        const session = JSON.parse(adminSession)
        setAdminEmail(session.email || '')
      } catch (e) {
        // Fallback to old credential storage
        const storedCred = localStorage.getItem('mra-admin-cred')
        if (storedCred) {
          try {
            const parsed = JSON.parse(storedCred)
            setAdminEmail(parsed.email || '')
          } catch (e) {
            setAdminEmail('')
          }
        }
      }
    }
    fetchPlans()
    loadNotifications()
  }, [])
  
  const loadNotifications = () => {
    const storedNotifications = localStorage.getItem('mra-admin-notifications')
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications))
    } else {
      // Create initial notifications
      const initialNotifications = [
        {
          id: 1,
          message: 'Welcome to MRA Admin Dashboard',
          type: 'info',
          time: new Date().toLocaleString(),
          read: false
        },
        {
          id: 2,
          message: 'System is running smoothly',
          type: 'success',
          time: new Date().toLocaleString(),
          read: false
        }
      ]
      setNotifications(initialNotifications)
      localStorage.setItem('mra-admin-notifications', JSON.stringify(initialNotifications))
    }
  }
  
  const addNotification = (message, type = 'info') => {
    const newNotification = {
      id: Date.now(),
      message,
      type,
      time: new Date().toLocaleString(),
      read: false
    }
    const updated = [newNotification, ...notifications].slice(0, 10) // Keep only 10 notifications
    setNotifications(updated)
    localStorage.setItem('mra-admin-notifications', JSON.stringify(updated))
  }

  const fetchPlans = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/plans`)
      if (response.ok) {
        const backendPlans = await response.json()
        setPlans(backendPlans.map(p => ({
          id: p._id,
          title: p.planName,
          price: p.amount,
          validity: p.validity,
          data: p.benefits,
          type: 'popular'
        })))
      }
    } catch (error) {
      console.error('Error fetching plans:', error)
    }
  }

  const addPlanToBackend = async (planData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/admin/plans`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          planName: planData.title,
          amount: planData.price,
          validity: planData.validity,
          benefits: planData.data
        })
      })
      
      if (response.ok) {
        await fetchPlans() // Refresh plans list
        return true
      }
      return false
    } catch (error) {
      console.error('Error adding plan:', error)
      return false
    }
  }

  const stats = useMemo(() => ([
    { label: 'Total Plans Added', value: plans.length.toString(), icon: FileText, color: 'bg-blue-500', change: '+12%' },
    { label: 'Active Plans', value: plans.length.toString(), icon: CheckCircle, color: 'bg-green-500', change: '+5%' },
    { label: 'Total Revenue', value: '₹12,45,890', icon: DollarSign, color: 'bg-purple-500', change: '+23%' },
    { label: "Today's Transactions", value: '1,234', icon: TrendingUp, color: 'bg-orange-500', change: '+8%' },
    { label: 'Active Users', value: '45,678', icon: Users, color: 'bg-pink-500', change: '+15%' },
    { label: 'Pending Approvals', value: '23', icon: Clock, color: 'bg-yellow-500', change: '-3' }
  ]), [plans.length])

  const recentActivity = [
    { id: 1, action: 'New plan added', user: 'Admin', time: '2 minutes ago', type: 'success' },
    { id: 2, action: 'Plan updated', user: 'Admin', time: '15 minutes ago', type: 'info' },
    { id: 3, action: 'User registered', user: 'john@example.com', time: '1 hour ago', type: 'success' },
    { id: 4, action: 'Transaction completed', user: 'User #1234', time: '2 hours ago', type: 'success' },
    { id: 5, action: 'Plan deactivated', user: 'Admin', time: '3 hours ago', type: 'warning' }
  ]

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-40 ${
          sidebarOpen ? 'w-64' : 'w-20'
        } ${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}
      >
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">A</span>
                </div>
                <span className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Admin Panel
                </span>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {[
            { icon: LayoutDashboard, label: 'Dashboard', id: 'overview' },
            { icon: FileText, label: 'Plans', id: 'plans' },
            { icon: Users, label: 'Users', id: 'users' },
            { icon: DollarSign, label: 'Transactions', id: 'transactions' },
            { icon: Settings, label: 'Settings', id: 'settings' }
          ].map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                  activeTab === item.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'hover:bg-gray-100 text-gray-700'
                } ${darkMode ? 'hover:bg-gray-700' : ''}`}
              >
                <Icon className="w-5 h-5" />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </button>
            )
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Top Header */}
        <header className={`sticky top-0 z-30 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-b border-gray-200 shadow-sm`}>
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search..."
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                    darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'
                  }`}
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <Bell className="w-5 h-5" />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-900">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <div key={notification.id} className={`p-3 border-b border-gray-100 hover:bg-gray-50 ${
                            !notification.read ? 'bg-blue-50' : ''
                          }`}>
                            <div className="flex items-start space-x-2">
                              <div className={`w-2 h-2 rounded-full mt-2 ${
                                notification.type === 'success' ? 'bg-green-500' :
                                notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                              }`}></div>
                              <div className="flex-1">
                                <p className="text-sm text-gray-900">{notification.message}</p>
                                <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-gray-500">
                          No notifications
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">{(adminEmail || 'A').slice(0,1).toUpperCase()}</span>
                </div>
                <div className="hidden md:block">
                  <div className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {adminEmail || 'Admin User'}
                  </div>
                  <div className="text-xs text-gray-500">{adminEmail ? 'Logged in' : 'Not linked'}</div>
                </div>
              </div>
              <Link
                to="/"
                className="px-3 py-2 text-sm font-semibold text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition"
              >
                Home
              </Link>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition text-red-600">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {activeTab === 'overview' && (
            <div>
              <h1 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Dashboard Overview
              </h1>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <div
                      key={index}
                      className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md p-6 border border-gray-200`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className={`${stat.color} p-3 rounded-lg`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <span className={`text-sm font-semibold ${
                          stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stat.change}
                        </span>
                      </div>
                      <div className={`text-2xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-500">{stat.label}</div>
                    </div>
                  )
                })}
              </div>

              {/* Quick Actions */}
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md p-6 mb-8 border border-gray-200`}>
                <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Quick Actions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <button className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition">
                    <Plus className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-blue-600">Add Plan</span>
                  </button>
                  <button className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition">
                    <Edit className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-600">Edit Plan</span>
                  </button>
                  <button className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition">
                    <Eye className="w-5 h-5 text-purple-600" />
                    <span className="font-semibold text-purple-600">View Reports</span>
                  </button>
                  <button className="flex items-center space-x-3 p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition">
                    <Users className="w-5 h-5 text-orange-600" />
                    <span className="font-semibold text-orange-600">Manage Users</span>
                  </button>
                </div>
              </div>

              {/* Recent Activity */}
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md p-6 border border-gray-200`}>
                <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Recent Activity
                </h2>
                <div className="space-y-3">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === 'success' ? 'bg-green-500' :
                          activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                        }`}></div>
                        <div>
                          <div className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {activity.action}
                          </div>
                          <div className="text-sm text-gray-500">{activity.user}</div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">{activity.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'plans' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Plans Management
                </h1>
                <div className="flex items-center space-x-2 text-sm text-blue-600 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Secure admin-only actions</span>
                </div>
              </div>

              {/* Add Plan Form */}
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md p-6 border border-gray-200`}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Add New Plan</h2>
                  <div className="text-sm text-gray-500">Fields marked * are required</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <input
                    required
                    value={planForm.title}
                    onChange={(e) => setPlanForm({ ...planForm, title: e.target.value })}
                    placeholder="Plan Title *"
                    className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  <input
                    required
                    type="number"
                    min="1"
                    value={planForm.price}
                    onChange={(e) => setPlanForm({ ...planForm, price: e.target.value })}
                    placeholder="Price (₹) *"
                    className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  <input
                    required
                    value={planForm.validity}
                    onChange={(e) => setPlanForm({ ...planForm, validity: e.target.value })}
                    placeholder="Validity (e.g., 28 days) *"
                    className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  <input
                    required
                    value={planForm.data}
                    onChange={(e) => setPlanForm({ ...planForm, data: e.target.value })}
                    placeholder="Data (e.g., 2GB/day) *"
                    className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  <input
                    value={planForm.cashback}
                    onChange={(e) => setPlanForm({ ...planForm, cashback: e.target.value })}
                    placeholder="Cashback (optional)"
                    className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  <select
                    value={planForm.type}
                    onChange={(e) => setPlanForm({ ...planForm, type: e.target.value })}
                    className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="popular">Popular</option>
                    <option value="budget">Budget</option>
                    <option value="premium">Premium</option>
                  </select>
                </div>
                <button
                  onClick={async () => {
                    if (!planForm.title || !planForm.price || !planForm.validity || !planForm.data) {
                      setPlanMessage('Please fill all required fields')
                      return
                    }
                    
                    const success = await addPlanToBackend({
                      title: planForm.title,
                      price: Number(planForm.price),
                      validity: planForm.validity,
                      data: planForm.data
                    })
                    
                    if (success) {
                      setPlanMessage('Plan added successfully and saved to database.')
                      addNotification(`New plan "${planForm.title}" added successfully`, 'success')
                      setPlanForm({ title: '', price: '', validity: '', data: '', cashback: '', type: 'popular' })
                    } else {
                      setPlanMessage('Error adding plan. Please try again.')
                      addNotification('Failed to add new plan', 'error')
                    }
                    
                    setTimeout(() => setPlanMessage(''), 3000)
                  }}
                  className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition shadow-lg hover:shadow-xl"
                >
                  Save Plan
                </button>
                {planMessage && (
                  <div className="mt-3 text-sm text-green-600 bg-green-50 border border-green-100 px-4 py-2 rounded-lg">
                    {planMessage}
                  </div>
                )}
              </div>

              {/* Plans Table */}
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md p-6 border border-gray-200 overflow-x-auto`}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Existing Plans</h2>
                  <span className="text-sm text-gray-500">{plans.length} plans</span>
                </div>
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-500 border-b">
                      <th className="pb-3">Title</th>
                      <th className="pb-3">Price</th>
                      <th className="pb-3">Validity</th>
                      <th className="pb-3">Data</th>
                      <th className="pb-3">Cashback</th>
                      <th className="pb-3">Type</th>
                      <th className="pb-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {plans.map((plan) => (
                      <tr key={plan.id} className="hover:bg-gray-50">
                        <td className="py-3 font-semibold">{plan.title}</td>
                        <td className="py-3">₹{plan.price}</td>
                        <td className="py-3">{plan.validity}</td>
                        <td className="py-3">{plan.data}</td>
                        <td className="py-3">{plan.cashback || '-'}</td>
                        <td className="py-3 capitalize">{plan.type}</td>
                        <td className="py-3 space-x-2">
                          <button className="text-blue-600 hover:underline text-xs">Edit</button>
                          <button
                            onClick={async () => {
                              try {
                                const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/admin/plans/${plan.id}`, {
                                  method: 'DELETE'
                                })
                                if (response.ok) {
                                  await fetchPlans()
                                  addNotification(`Plan "${plan.title}" deleted successfully`, 'info')
                                }
                              } catch (error) {
                                console.error('Error deleting plan:', error)
                              }
                            }}
                            className="text-red-600 hover:underline text-xs inline-flex items-center space-x-1"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Delete</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {plans.length === 0 && (
                  <div className="text-center py-6 text-gray-500">No plans yet. Add your first plan above.</div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <h1 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Users Management
              </h1>
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md p-6 border border-gray-200`}>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Users management interface will be implemented here...
                </p>
              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div>
              <h1 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Transactions
              </h1>
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md p-6 border border-gray-200`}>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Transactions management interface will be implemented here...
                </p>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h1 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Settings
              </h1>
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md p-6 border border-gray-200`}>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Settings interface will be implemented here...
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard

