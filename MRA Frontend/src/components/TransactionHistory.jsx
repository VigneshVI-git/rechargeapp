import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, XCircle, Clock, Download, RotateCcw, Filter } from 'lucide-react'

const TransactionHistory = () => {
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [transactions, setTransactions] = useState([])

  // Load transactions from localStorage
  useEffect(() => {
    const storedTransactions = localStorage.getItem('mra-transactions')
    if (storedTransactions) {
      try {
        const parsed = JSON.parse(storedTransactions)
        setTransactions(parsed)
      } catch (error) {
        console.error('Error loading transactions:', error)
        setTransactions([])
      }
    }
  }, [])

  const getStatusIcon = (status) => {
    switch(status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'success':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredTransactions = transactions.filter(t => {
    if (filterType !== 'all' && t.type !== filterType) return false
    if (filterStatus !== 'all' && t.status !== filterStatus) return false
    return true
  })

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">Transaction History</h2>

        {/* Filters */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="w-5 h-5 text-gray-500" />
            <span className="font-semibold">Filters</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transaction Type
              </label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="all">All Types</option>
                <option value="recharge">Recharge</option>
                <option value="bill pay">Bill Pay</option>
                <option value="send money">Send Money</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="all">All Status</option>
                <option value="success">Success</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="space-y-4">
          {filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="mt-1">
                    {getStatusIcon(transaction.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-lg capitalize">
                        {transaction.type === 'bill pay' ? transaction.operator : `${transaction.operator} Recharge`}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>Phone/ID: {transaction.phone}</div>
                      <div>Date: {transaction.date} at {transaction.time}</div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:items-end mt-4 md:mt-0">
                  <div className="text-2xl font-bold text-gray-900 mb-2">
                    ₹{transaction.amount}
                  </div>
                  <div className="flex space-x-2">
                    {transaction.status === 'success' && (
                      <>
                        <button 
                          onClick={() => alert('Downloading receipt...')}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition flex items-center space-x-1 transform hover:scale-105 active:scale-95"
                        >
                          <Download className="w-4 h-4" />
                          <span className="text-sm">Receipt</span>
                        </button>
                        <Link 
                          to="/recharge"
                          className="px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition flex items-center space-x-1 transform hover:scale-105 active:scale-95 inline-flex"
                        >
                          <RotateCcw className="w-4 h-4" />
                          <span className="text-sm">Repeat</span>
                        </Link>
                      </>
                    )}
                    {transaction.status === 'failed' && (
                      <Link 
                        to="/recharge"
                        className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition transform hover:scale-105 active:scale-95 inline-block"
                      >
                        <span className="text-sm">Retry</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTransactions.length === 0 && (
          <div className="bg-white p-12 rounded-xl shadow-md text-center">
            <p className="text-gray-500 text-lg mb-4">
              {transactions.length === 0 ? 'No transactions yet' : 'No transactions found matching your criteria'}
            </p>
            {transactions.length === 0 && (
              <Link 
                to="/recharge" 
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Make Your First Recharge
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default TransactionHistory
