import { useState, useEffect } from 'react'
import { Wallet, Plus, ArrowRight, CheckCircle } from 'lucide-react'

const WalletTopup = ({ onClose, onSuccess }) => {
  const [amount, setAmount] = useState('')
  const [selectedUpiId, setSelectedUpiId] = useState('')
  const [customUpiId, setCustomUpiId] = useState('')
  const [walletBalance, setWalletBalance] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)

  const quickAmounts = [100, 200, 500, 1000, 2000, 5000]
  const savedUpiIds = ['user@paytm', 'user@phonepe', 'user@gpay']

  useEffect(() => {
    const balance = localStorage.getItem('mra-wallet-balance')
    setWalletBalance(Number(balance) || 0)
  }, [])

  const handleTopup = async () => {
    if (!amount || Number(amount) <= 0) {
      alert('Please enter a valid amount')
      return
    }

    const upiId = customUpiId || selectedUpiId
    if (!upiId) {
      alert('Please select or enter a UPI ID')
      return
    }

    setIsProcessing(true)

    try {
      // Simulate UPI payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))

      const topupAmount = Number(amount)
      const newBalance = walletBalance + topupAmount
      
      // Update wallet balance
      setWalletBalance(newBalance)
      localStorage.setItem('mra-wallet-balance', newBalance.toString())

      // Store transaction in history
      const transactions = JSON.parse(localStorage.getItem('mra-transactions') || '[]')
      transactions.unshift({
        id: `TOPUP-${Date.now()}`,
        type: 'wallet topup',
        operator: 'Wallet',
        amount: topupAmount,
        phone: 'Wallet',
        status: 'success',
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString(),
        method: 'UPI',
        upiId: upiId
      })
      localStorage.setItem('mra-transactions', JSON.stringify(transactions))

      alert(`₹${topupAmount} added to wallet successfully!`)
      onSuccess && onSuccess(newBalance)
      onClose && onClose()
    } catch (error) {
      alert('Topup failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Wallet className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Add Money to Wallet</h2>
                <p className="text-sm text-gray-500">Current Balance: ₹{walletBalance}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Amount Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount to add"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-lg"
              min="1"
            />
            
            <div className="mt-3">
              <p className="text-sm text-gray-600 mb-2">Quick amounts:</p>
              <div className="grid grid-cols-3 gap-2">
                {quickAmounts.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setAmount(amt.toString())}
                    className={`px-3 py-2 rounded-lg font-medium transition ${
                      amount === amt.toString()
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* UPI Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select UPI ID
            </label>
            <div className="space-y-2 mb-3">
              {savedUpiIds.map((upiId) => (
                <label key={upiId} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border cursor-pointer hover:bg-blue-50">
                  <input
                    type="radio"
                    name="topupUpiId"
                    value={upiId}
                    checked={selectedUpiId === upiId}
                    onChange={(e) => {
                      setSelectedUpiId(e.target.value)
                      setCustomUpiId('')
                    }}
                    className="text-blue-600"
                  />
                  <span className="font-medium">{upiId}</span>
                </label>
              ))}
            </div>
            
            <input
              type="text"
              value={customUpiId}
              onChange={(e) => {
                setCustomUpiId(e.target.value)
                setSelectedUpiId('')
              }}
              placeholder="Or enter custom UPI ID"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Summary */}
          {amount && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Current Balance:</span>
                <span className="font-semibold">₹{walletBalance}</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <span className="text-gray-600">Adding:</span>
                <span className="font-semibold text-green-600">+₹{amount}</span>
              </div>
              <div className="border-t border-blue-200 mt-2 pt-2 flex items-center justify-between">
                <span className="font-semibold text-gray-900">New Balance:</span>
                <span className="font-bold text-blue-600">₹{walletBalance + Number(amount || 0)}</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleTopup}
              disabled={!amount || (!selectedUpiId && !customUpiId) || isProcessing}
              className={`flex-1 px-4 py-3 rounded-lg font-semibold transition flex items-center justify-center space-x-2 ${
                !amount || (!selectedUpiId && !customUpiId) || isProcessing
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add ₹{amount || 0}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WalletTopup