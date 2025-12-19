import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Smartphone, Building2, Wallet, Check, Download, Receipt, Plus } from 'lucide-react'
import WalletTopup from './WalletTopup'

const PaymentSection = () => {
  const [selectedMethod, setSelectedMethod] = useState('')
  const [promoCode, setPromoCode] = useState('')
  const [showPromoApplied, setShowPromoApplied] = useState(false)
  const [receipt, setReceipt] = useState(null)
  const [rechargeData, setRechargeData] = useState(null)
  const [paymentComplete, setPaymentComplete] = useState(false)
  const [walletBalance, setWalletBalance] = useState(1250)
  const [selectedUpiId, setSelectedUpiId] = useState('')
  const [customUpiId, setCustomUpiId] = useState('')
  const [showWalletTopup, setShowWalletTopup] = useState(false)

  const paymentMethods = [
    { id: 'upi', name: 'UPI', icon: Smartphone, color: 'text-purple-600' },
    { id: 'netbanking', name: 'Net Banking', icon: Building2, color: 'text-green-600' },
    { id: 'wallet', name: 'Wallet', icon: Wallet, color: 'text-orange-600' }
  ]

  const upiApps = ['Google Pay', 'PhonePe', 'Paytm', 'BHIM UPI']

  // Load recharge data and wallet balance from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem('mra-recharge-data')
    if (storedData) {
      try {
        const data = JSON.parse(storedData)
        console.log('Loaded recharge data:', data) // Debug log
        setRechargeData(data)
      } catch (error) {
        console.error('Error loading recharge data:', error)
      }
    } else {
      console.log('No recharge data found in localStorage') // Debug log
    }
    
    const storedBalance = localStorage.getItem('mra-wallet-balance')
    if (storedBalance) {
      setWalletBalance(Number(storedBalance))
    } else {
      localStorage.setItem('mra-wallet-balance', '1250')
    }
  }, [])
  
  const handleWalletTopupSuccess = (newBalance) => {
    setWalletBalance(newBalance)
  }

  const handlePromoApply = () => {
    if (promoCode.trim()) {
      setShowPromoApplied(true)
      setTimeout(() => setShowPromoApplied(false), 3000)
    }
  }

  const handlePay = async () => {
    if (!selectedMethod) {
      alert('Please select a payment method')
      return
    }
    if (!rechargeData) {
      alert('No recharge data found. Please go back and select a plan.')
      return
    }

    const planAmount = rechargeData.amount || rechargeData.plan?.price || 0
    const totalAmount = planAmount - Math.floor(planAmount * 0.05)

    // Wallet payment validation
    if (selectedMethod === 'wallet') {
      if (walletBalance < totalAmount) {
        alert(`Insufficient wallet balance. You have ₹${walletBalance} but need ₹${totalAmount}`)
        return
      }
    }

    // UPI validation
    if (selectedMethod === 'upi') {
      const upiId = customUpiId || selectedUpiId
      if (!upiId) {
        alert('Please select or enter a UPI ID')
        return
      }
    }

    try {
      // Deduct from wallet if wallet payment
      if (selectedMethod === 'wallet') {
        const newBalance = walletBalance - totalAmount
        setWalletBalance(newBalance)
        localStorage.setItem('mra-wallet-balance', newBalance.toString())
      }

      // Get user session
      const userSession = localStorage.getItem('mra-user-session')
      let userId = 'guest'
      
      if (userSession) {
        try {
          const user = JSON.parse(userSession)
          userId = user.userId || user._id || 'guest'
        } catch (e) {
          console.error('Error parsing user session:', e)
        }
      }

      // Store recharge in database
      try {
        const planAmount = rechargeData.amount || rechargeData.plan?.price || 0
        const rechargePayload = {
          userId: userId,
          mobileNumber: rechargeData.phoneNumber || rechargeData.phone,
          planId: rechargeData.plan?.id || rechargeData.plan?._id || 'custom-plan',
          paymentMode: selectedMethod.toUpperCase(),
          operator: rechargeData.operator,
          planName: rechargeData.plan?.title || rechargeData.plan?.planName || 'Custom Plan',
          amount: planAmount,
          totalAmount: totalAmount,
          cashback: Math.floor(planAmount * 0.05),
          upiId: selectedMethod === 'upi' ? (customUpiId || selectedUpiId) : null
        }
        
        console.log('Storing recharge data:', rechargePayload) // Debug log
        
        const rechargeResponse = await fetch('http://localhost:5000/api/user/recharge', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(rechargePayload)
        })

        if (rechargeResponse.ok) {
          const result = await rechargeResponse.json()
          console.log('Recharge stored successfully:', result)
        } else {
          const error = await rechargeResponse.json()
          console.error('Failed to store recharge:', error)
        }
      } catch (dbError) {
        console.error('Database storage error:', dbError)
        // Continue even if database storage fails
      }

      const receiptData = {
        id: `MRA-${Date.now()}`,
        amount: rechargeData.amount,
        method: paymentMethods.find(m => m.id === selectedMethod)?.name,
        date: new Date().toLocaleString(),
        phoneNumber: rechargeData.phoneNumber,
        operator: rechargeData.operator,
        plan: rechargeData.plan.title || rechargeData.plan.planName,
        upiId: selectedMethod === 'upi' ? (customUpiId || selectedUpiId) : null
      }
      setReceipt(receiptData)
      setPaymentComplete(true)
      
      // Store transaction in localStorage for permanent history
      const transactions = JSON.parse(localStorage.getItem('mra-transactions') || '[]')
      transactions.unshift({
        id: receiptData.id,
        type: 'recharge',
        operator: rechargeData.operator,
        amount: rechargeData.amount,
        phone: rechargeData.phoneNumber,
        status: 'success',
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString(),
        method: receiptData.method,
        upiId: receiptData.upiId
      })
      localStorage.setItem('mra-transactions', JSON.stringify(transactions))
      
      alert('Payment successful! Your recharge has been processed and stored in database.')
    } catch (error) {
      console.error('Payment error:', error)
      alert('Payment failed. Please check your connection and try again.')
    }
  }

  const downloadReceipt = () => {
    if (!receipt) return
    
    const content = `Mobile Recharge Receipt\n` +
      `========================\n` +
      `Receipt ID: ${receipt.id}\n` +
      `Phone Number: ${receipt.phoneNumber}\n` +
      `Operator: ${receipt.operator}\n` +
      `Plan: ${receipt.plan}\n` +
      `Amount: ₹${receipt.amount}\n` +
      `Payment Method: ${receipt.method}\n` +
      `Date: ${receipt.date}\n` +
      `Status: Success\n`
      
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${receipt.id}.txt`
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">Payment Options</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payment Methods */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 p-6 rounded-xl mb-6">
              <h3 className="font-semibold text-lg mb-4">Select Payment Method</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paymentMethods.map((method) => {
                  const Icon = method.icon
                  return (
                    <button
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedMethod === method.id
                          ? 'border-blue-500 bg-blue-50 scale-105'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className={`w-6 h-6 ${method.color}`} />
                        <span className="font-semibold text-gray-900">{method.name}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* UPI Apps Selection */}
            {selectedMethod === 'upi' && (
              <div className="bg-gray-50 p-6 rounded-xl mb-6">
                <h3 className="font-semibold text-lg mb-4">Select UPI Option</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Saved UPI IDs</label>
                    <div className="space-y-2">
                      {['user@paytm', 'user@phonepe', 'user@gpay'].map((upiId) => (
                        <label key={upiId} className="flex items-center space-x-3 p-3 bg-white rounded-lg border cursor-pointer hover:bg-blue-50">
                          <input
                            type="radio"
                            name="upiId"
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
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Or Enter New UPI ID</label>
                    <input
                      type="text"
                      value={customUpiId}
                      onChange={(e) => {
                        setCustomUpiId(e.target.value)
                        setSelectedUpiId('')
                      }}
                      placeholder="Enter UPI ID (e.g., user@paytm)"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Saved Payment Methods (UPI/Wallet only) */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="font-semibold text-lg mb-4">Saved Payment Methods</h3>
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-lg border-2 border-gray-200 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="w-5 h-5 text-purple-600" />
                    <div>
                      <div className="font-semibold">Google Pay</div>
                      <div className="text-sm text-gray-500">user@pay</div>
                    </div>
                  </div>
                  <button className="text-blue-600 font-semibold" onClick={() => setSelectedMethod('upi')}>Use</button>
                </div>
                <div className="bg-white p-4 rounded-lg border-2 border-gray-200 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Wallet className="w-5 h-5 text-orange-600" />
                    <div>
                      <div className="font-semibold">App Wallet</div>
                      <div className="text-sm text-gray-500">Balance: ₹{walletBalance}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      className={`font-semibold ${
                        rechargeData && walletBalance >= ((rechargeData.amount || rechargeData.plan?.price || 0) - Math.floor((rechargeData.amount || rechargeData.plan?.price || 0) * 0.05))
                          ? 'text-blue-600 hover:text-blue-700'
                          : 'text-gray-400 cursor-not-allowed'
                      }`}
                      onClick={() => {
                        const planAmount = rechargeData.amount || rechargeData.plan?.price || 0
                        const totalAmount = planAmount - Math.floor(planAmount * 0.05)
                        if (rechargeData && walletBalance >= totalAmount) {
                          setSelectedMethod('wallet')
                        }
                      }}
                      disabled={rechargeData && walletBalance < ((rechargeData.amount || rechargeData.plan?.price || 0) - Math.floor((rechargeData.amount || rechargeData.plan?.price || 0) * 0.05))}
                    >
                      {rechargeData && walletBalance < ((rechargeData.amount || rechargeData.plan?.price || 0) - Math.floor((rechargeData.amount || rechargeData.plan?.price || 0) * 0.05)) ? 'Insufficient' : 'Use'}
                    </button>
                    {rechargeData && walletBalance < ((rechargeData.amount || rechargeData.plan?.price || 0) - Math.floor((rechargeData.amount || rechargeData.plan?.price || 0) * 0.05)) && (
                      <button
                        onClick={() => setShowWalletTopup(true)}
                        className="flex items-center space-x-1 text-green-600 hover:text-green-700 font-semibold text-sm"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-2 border-blue-100 sticky top-20">
              <h3 className="font-bold text-xl mb-4">Order Summary</h3>
              {rechargeData ? (
                <>
                  {/* Recharge Details */}
                  <div className="bg-white p-4 rounded-lg mb-4 border border-blue-200">
                    <h4 className="font-semibold text-gray-800 mb-3">Recharge Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phone Number:</span>
                        <span className="font-semibold text-blue-600">
                          {rechargeData.phoneNumber || rechargeData.phone || 'Not provided'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Operator:</span>
                        <span className="font-semibold capitalize">
                          {rechargeData.operator || 'Not selected'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Plan Details */}
                  <div className="bg-white p-4 rounded-lg mb-4 border border-blue-200">
                    <h4 className="font-semibold text-gray-800 mb-3">Plan Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Plan Name:</span>
                        <span className="font-semibold">{rechargeData.plan?.title || rechargeData.plan?.planName || 'Unknown Plan'}</span>
                      </div>
                      {rechargeData.plan?.validity && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Validity:</span>
                          <span className="font-semibold">{rechargeData.plan.validity}</span>
                        </div>
                      )}
                      {rechargeData.plan?.data && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Benefits:</span>
                          <span className="font-semibold text-right max-w-32">{rechargeData.plan.data}</span>
                        </div>
                      )}
                      {rechargeData.plan?.talktime && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Talktime:</span>
                          <span className="font-semibold">{rechargeData.plan.talktime}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Payment Summary */}
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Plan Amount</span>
                      <span className="font-semibold">₹{rechargeData.amount || rechargeData.plan?.price || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service Charge</span>
                      <span className="font-semibold">₹0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cashback (5%)</span>
                      <span className="font-semibold text-green-600">-₹{Math.floor((rechargeData.amount || rechargeData.plan?.price || 0) * 0.05)}</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between">
                      <span className="font-bold text-lg">Total Amount</span>
                      <span className="font-bold text-lg text-blue-600">₹{(rechargeData.amount || rechargeData.plan?.price || 0) - Math.floor((rechargeData.amount || rechargeData.plan?.price || 0) * 0.05)}</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <div className="mb-4">
                    <Receipt className="w-16 h-16 text-gray-300 mx-auto mb-2" />
                    <p className="text-lg font-semibold">No recharge data found</p>
                  </div>
                  <div className="text-sm space-y-1">
                    <p>Please go back and:</p>
                    <p>1. Enter your phone number</p>
                    <p>2. Select an operator</p>
                    <p>3. Choose a plan</p>
                    <p>4. Click "Proceed to Payment"</p>
                  </div>
                  <Link 
                    to="/recharge" 
                    className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    Go to Recharge Page
                  </Link>
                </div>
              )}

              {/* Promo Code */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Promo Code
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  <button
                    onClick={handlePromoApply}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    Apply
                  </button>
                </div>
                {showPromoApplied && (
                  <div className="mt-2 flex items-center space-x-2 text-green-600">
                    <Check className="w-4 h-4" />
                    <span className="text-sm">Promo code applied successfully!</span>
                  </div>
                )}
              </div>

              <button 
                onClick={handlePay}
                disabled={!rechargeData || paymentComplete}
                className={`w-full py-4 rounded-lg font-bold text-lg transition shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 ${
                  !rechargeData || paymentComplete 
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                }`}
              >
                {paymentComplete ? 'Payment Complete' : rechargeData ? `Pay ₹${(rechargeData.amount || rechargeData.plan?.price || 0) - Math.floor((rechargeData.amount || rechargeData.plan?.price || 0) * 0.05)}` : 'Select Plan First'}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                By proceeding, you agree to our Terms & Conditions
              </p>

              {receipt && paymentComplete && (
                <div className="mt-6 bg-green-50 p-4 rounded-lg border border-green-200 shadow-sm">
                  <div className="flex items-center space-x-2 mb-3 text-green-700 font-semibold">
                    <Receipt className="w-5 h-5" />
                    <span>Payment Successful!</span>
                  </div>
                  <div className="text-sm text-gray-700 space-y-1 mb-3">
                    <div><strong>Receipt ID:</strong> {receipt.id}</div>
                    <div><strong>Phone:</strong> {receipt.phoneNumber}</div>
                    <div><strong>Operator:</strong> {receipt.operator}</div>
                    <div><strong>Plan:</strong> {receipt.plan}</div>
                    <div><strong>Amount:</strong> ₹{receipt.amount}</div>
                    <div><strong>Method:</strong> {receipt.method}</div>
                    <div><strong>Date:</strong> {receipt.date}</div>
                  </div>
                  <button
                    onClick={downloadReceipt}
                    className="w-full inline-flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Receipt</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Wallet Topup Modal */}
      {showWalletTopup && (
        <WalletTopup
          onClose={() => setShowWalletTopup(false)}
          onSuccess={handleWalletTopupSuccess}
        />
      )}
    </section>
  )
}

export default PaymentSection
