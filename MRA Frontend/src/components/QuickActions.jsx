import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Smartphone, Zap, Send, History, Gift, CreditCard } from 'lucide-react'

const QuickActions = () => {
  const [quickPhone, setQuickPhone] = useState('')
  const [quickAmount, setQuickAmount] = useState('')

  const handleQuickRecharge = () => {
    if (!quickPhone || quickPhone.length !== 10) {
      alert('Please enter a valid 10-digit phone number')
      return
    }
    if (!quickAmount || parseFloat(quickAmount) <= 0) {
      alert('Please enter a valid amount')
      return
    }
    alert(`Quick recharge initiated for ${quickPhone} with ₹${quickAmount}`)
    // Scroll to recharge section
    document.getElementById('recharge')?.scrollIntoView({ behavior: 'smooth' })
  }
  const actions = [
    {
      icon: Smartphone,
      title: 'Quick Recharge',
      description: 'Recharge mobile instantly',
      color: 'bg-blue-500',
      href: '/recharge'
    },
    {
      icon: Zap,
      title: 'Bill Pay',
      description: 'Electricity, Water, DTH',
      color: 'bg-green-500',
      href: '/bills'
    },
    {
      icon: Send,
      title: 'Send Money',
      description: 'UPI & Bank Transfer',
      color: 'bg-purple-500',
      href: '/payment'
    },
    {
      icon: History,
      title: 'History',
      description: 'View transactions',
      color: 'bg-orange-500',
      href: '/history'
    },
    {
      icon: Gift,
      title: 'Offers',
      description: 'Discounts & Cashback',
      color: 'bg-pink-500',
      href: '/offers'
    },
    {
      icon: CreditCard,
      title: 'Add Money',
      description: 'Top up wallet',
      color: 'bg-indigo-500',
      href: '/payment'
    }
  ]

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {actions.map((action, index) => {
            const Icon = action.icon
            return (
              <Link
                key={index}
                to={action.href}
                className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all transform hover:scale-105 border border-gray-100 group text-left block"
              >
                <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                <p className="text-xs text-gray-500">{action.description}</p>
              </Link>
            )
          })}
        </div>

        {/* Quick Recharge Input */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-100">
          <h3 className="font-semibold text-lg mb-4">Quick Recharge</h3>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={quickPhone}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 10)
                  setQuickPhone(value)
                }}
                placeholder="Enter 10 digit mobile number"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                maxLength="10"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount
              </label>
              <input
                type="number"
                value={quickAmount}
                onChange={(e) => setQuickAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                min="1"
              />
            </div>
            <div className="flex items-end">
              <Link 
                to="/recharge"
                className="w-full md:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 inline-block text-center"
              >
                Recharge Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default QuickActions
