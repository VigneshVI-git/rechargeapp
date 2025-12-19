import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Zap, Building2, Droplet, Tv } from 'lucide-react'

const BillsPage = () => {
  const [billType, setBillType] = useState('electricity')
  const [consumerNumber, setConsumerNumber] = useState('')
  const [amount, setAmount] = useState('')

  const billTypes = [
    { id: 'electricity', name: 'Electricity', icon: Zap, color: 'bg-yellow-500' },
    { id: 'water', name: 'Water', icon: Droplet, color: 'bg-blue-500' },
    { id: 'dth', name: 'DTH', icon: Tv, color: 'bg-purple-500' },
    { id: 'gas', name: 'Gas', icon: Building2, color: 'bg-green-500' }
  ]

  const handleBillPay = () => {
    if (!consumerNumber) {
      alert('Please enter consumer number')
      return
    }
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount')
      return
    }
    alert(`Bill payment initiated for ${billType} - Consumer: ${consumerNumber}, Amount: ₹${amount}`)
  }

  return (
    <div className="min-h-screen">
      <Header />
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Bill Payment</h2>

          {/* Bill Type Selection */}
          <div className="bg-white p-6 rounded-xl shadow-md mb-6">
            <h3 className="font-semibold text-lg mb-4">Select Bill Type</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {billTypes.map((type) => {
                const Icon = type.icon
                return (
                  <button
                    key={type.id}
                    onClick={() => setBillType(type.id)}
                    className={`p-6 rounded-lg border-2 transition-all ${
                      billType === type.id
                        ? 'border-blue-500 bg-blue-50 scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`${type.color} w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="font-semibold">{type.name}</div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Bill Payment Form */}
          <div className="bg-white p-6 rounded-xl shadow-md mb-6">
            <h3 className="font-semibold text-lg mb-4">Enter Bill Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Consumer Number / Account ID
                </label>
                <input
                  type="text"
                  value={consumerNumber}
                  onChange={(e) => setConsumerNumber(e.target.value)}
                  placeholder="Enter consumer number"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  min="1"
                />
              </div>
              <button
                onClick={handleBillPay}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
              >
                Pay Bill
              </button>
            </div>
          </div>

          {/* Quick Bill Pay Options */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="font-semibold text-lg mb-4">Quick Pay</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition cursor-pointer">
                <div className="font-semibold mb-2">Electricity Bill</div>
                <div className="text-sm text-gray-600">Last paid: ₹1,250</div>
                <div className="text-xs text-gray-500 mt-1">Due: 15 Jan 2024</div>
              </div>
              <div className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition cursor-pointer">
                <div className="font-semibold mb-2">Water Bill</div>
                <div className="text-sm text-gray-600">Last paid: ₹450</div>
                <div className="text-xs text-gray-500 mt-1">Due: 20 Jan 2024</div>
              </div>
              <div className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition cursor-pointer">
                <div className="font-semibold mb-2">DTH Bill</div>
                <div className="text-sm text-gray-600">Last paid: ₹299</div>
                <div className="text-xs text-gray-500 mt-1">Due: 25 Jan 2024</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default BillsPage

