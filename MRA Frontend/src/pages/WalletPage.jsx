import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import WalletTopup from '../components/WalletTopup'
import { Wallet, Plus, TrendingUp, ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react'

const WalletPage = () => {
  const [walletBalance, setWalletBalance] = useState(0)
  const [showTopup, setShowTopup] = useState(false)
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    // Load wallet balance
    const balance = localStorage.getItem('mra-wallet-balance')
    setWalletBalance(Number(balance) || 0)

    // Load wallet transactions
    const allTransactions = JSON.parse(localStorage.getItem('mra-transactions') || '[]')
    const walletTransactions = allTransactions.filter(t => 
      t.type === 'wallet topup' || t.method === 'Wallet'
    )
    setTransactions(walletTransactions)
  }, [])

  const handleTopupSuccess = (newBalance) => {
    setWalletBalance(newBalance)
    // Refresh transactions
    const allTransactions = JSON.parse(localStorage.getItem('mra-transactions') || '[]')
    const walletTransactions = allTransactions.filter(t => 
      t.type === 'wallet topup' || t.method === 'Wallet'
    )
    setTransactions(walletTransactions)
  }

  const getTransactionIcon = (transaction) => {
    if (transaction.type === 'wallet topup') {
      return <ArrowUpRight className="w-5 h-5 text-green-500" />
    } else {
      return <ArrowDownRight className="w-5 h-5 text-red-500" />
    }
  }

  const getTransactionColor = (transaction) => {
    if (transaction.type === 'wallet topup') {
      return 'text-green-600'
    } else {
      return 'text-red-600'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">My Wallet</h2>

          {/* Wallet Balance Card */}
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-8 rounded-xl shadow-xl mb-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <Wallet className="w-8 h-8" />
                  <span className="text-xl font-semibold">Wallet Balance</span>
                </div>
                <div className="text-4xl font-bold mb-2">₹{walletBalance}</div>
                <p className="text-blue-100">Available for recharges and payments</p>
              </div>
              <button
                onClick={() => setShowTopup(true)}
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition flex items-center space-x-2 shadow-lg"
              >
                <Plus className="w-5 h-5" />
                <span>Add Money</span>
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Plus className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Add Money</h3>
                  <p className="text-sm text-gray-500">Top up your wallet</p>
                </div>
              </div>
              <button
                onClick={() => setShowTopup(true)}
                className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Add Money
              </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Cashback Earned</h3>
                  <p className="text-sm text-gray-500">This month</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-blue-600">₹{Math.floor(walletBalance * 0.02)}</div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Recent Activity</h3>
                  <p className="text-sm text-gray-500">Last 7 days</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-purple-600">{transactions.length}</div>
            </div>
          </div>

          {/* Transaction History */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">Wallet Transactions</h3>
            
            {transactions.length > 0 ? (
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      {getTransactionIcon(transaction)}
                      <div>
                        <div className="font-semibold text-gray-900">
                          {transaction.type === 'wallet topup' ? 'Money Added' : 'Recharge Payment'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {transaction.date} at {transaction.time}
                        </div>
                        {transaction.upiId && (
                          <div className="text-xs text-gray-400">
                            UPI: {transaction.upiId}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold text-lg ${getTransactionColor(transaction)}`}>
                        {transaction.type === 'wallet topup' ? '+' : '-'}₹{transaction.amount}
                      </div>
                      <div className="text-sm text-gray-500 capitalize">
                        {transaction.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Wallet className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-4">No wallet transactions yet</p>
                <button
                  onClick={() => setShowTopup(true)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Add Money to Get Started
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />

      {/* Wallet Topup Modal */}
      {showTopup && (
        <WalletTopup
          onClose={() => setShowTopup(false)}
          onSuccess={handleTopupSuccess}
        />
      )}
    </div>
  )
}

export default WalletPage