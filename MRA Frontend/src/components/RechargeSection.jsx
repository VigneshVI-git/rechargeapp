import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, CheckCircle } from 'lucide-react'

const RechargeSection = () => {
  const [selectedOperator, setSelectedOperator] = useState(null)
  const [selectedCircle, setSelectedCircle] = useState('')
  const [planType, setPlanType] = useState('prepaid')
  const [amount, setAmount] = useState('')
  const [filterValidity, setFilterValidity] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  const operators = [
    { id: 'airtel', name: 'Airtel', logo: '🟢', prefixes: ['91', '92', '93', '94', '95', '96', '97', '98', '99'] },
    { id: 'jio', name: 'Jio', logo: '🔴', prefixes: ['70', '71', '72', '73', '74', '75', '76', '77', '78', '79'] },
    { id: 'vi', name: 'Vi', logo: '🔵', prefixes: ['80', '81', '82', '83', '84', '85', '86', '87', '88', '89'] },
    { id: 'bsnl', name: 'BSNL', logo: '🟡', prefixes: ['90'] }
  ]

  // Auto-detect operator from phone number
  useEffect(() => {
    if (phoneNumber.length >= 2) {
      const detectedOperator = operators.find(op => 
        op.prefixes.some(p => phoneNumber.startsWith(p))
      )
      if (detectedOperator && selectedOperator !== detectedOperator.id) {
        setSelectedOperator(detectedOperator.id)
      }
    }
  }, [phoneNumber, selectedOperator])

  const circles = ['Delhi', 'Mumbai', 'Kolkata', 'Chennai', 'Bangalore', 'Punjab', 'Haryana', 'Tamil Nadu']

  const popularAmounts = [10, 20, 50, 100, 200, 500, 1000]

  const defaultPlans = [
    { id: 1, validity: '28 days', data: '2GB/day', talktime: 'Unlimited', price: 199, type: 'popular', offers: [] },
    { id: 2, validity: '56 days', data: '1.5GB/day', talktime: 'Unlimited', price: 299, type: 'popular', offers: [] },
    { id: 3, validity: '84 days', data: '2GB/day', talktime: 'Unlimited', price: 399, type: 'premium', offers: ['Netflix'] },
    { id: 4, validity: '28 days', data: '1GB/day', talktime: 'Unlimited', price: 149, type: 'budget', offers: [] },
    { id: 5, validity: '1 day', data: 'Unlimited', talktime: 'Unlimited', price: 19, type: 'budget', offers: [] },
    { id: 6, validity: '28 days', data: '3GB/day', talktime: 'Unlimited', price: 249, type: 'premium', offers: ['Amazon Prime'] }
  ]
  const [adminPlans, setAdminPlans] = useState([])
  const [selectedPlan, setSelectedPlan] = useState(null)

  const getPlanTypeColor = (type) => {
    switch(type) {
      case 'budget': return 'border-green-500 bg-green-50'
      case 'popular': return 'border-orange-500 bg-orange-50'
      case 'premium': return 'border-purple-500 bg-purple-50'
      default: return 'border-gray-300 bg-white'
    }
  }



  const handleRecharge = () => {
    if (!selectedOperator) {
      alert('Please select an operator')
      return
    }
    if (!phoneNumber || phoneNumber.length !== 10) {
      alert('Please enter a valid 10-digit phone number')
      return
    }
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount')
      return
    }
    
    // Store recharge data
    const operatorName = operators.find(op => op.id === selectedOperator)?.name || selectedOperator
    localStorage.setItem('mra-recharge-data', JSON.stringify({
      phoneNumber: phoneNumber,
      operator: operatorName,
      plan: selectedPlan || { price: Number(amount), title: 'Custom Amount' },
      amount: Number(amount)
    }))
    
    alert(`Recharge initiated for ${phoneNumber} with ₹${amount}`)
  }

  // Fetch plans from backend API and check for pre-selected plan
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/plans/active')
        if (response.ok) {
          const plans = await response.json()
          setAdminPlans(plans.map(p => ({
            id: p._id,
            title: p.planName,
            price: p.amount,
            validity: p.validity,
            data: p.benefits,
            talktime: 'Unlimited',
            type: p.amount <= 200 ? 'budget' : p.amount >= 400 ? 'premium' : 'popular',
            offers: p.amount >= 400 ? ['Netflix'] : []
          })))
        }
      } catch (error) {
        console.error('Error fetching plans:', error)
        // Keep adminPlans empty if API fails, defaultPlans will still show
        setAdminPlans([])
      }
    }
    
    // Check if user came from offers page with a pre-selected plan
    const preSelectedPlan = localStorage.getItem('mra-selected-offer-plan')
    if (preSelectedPlan) {
      try {
        const plan = JSON.parse(preSelectedPlan)
        setAmount(plan.price.toString())
        setSelectedPlan(plan)
        localStorage.removeItem('mra-selected-offer-plan') // Clear after use
      } catch (error) {
        console.error('Error loading pre-selected plan:', error)
      }
    }
    
    fetchPlans()
  }, [])

  // Store selected plan and recharge data for payment
  const handlePlanSelect = (plan) => {
    if (!phoneNumber || phoneNumber.length !== 10) {
      alert('Please enter a valid 10-digit phone number first')
      return
    }
    if (!selectedOperator) {
      alert('Please select an operator first')
      return
    }
    
    setAmount(plan.price.toString())
    setSelectedPlan(plan)
    
    const operatorName = operators.find(op => op.id === selectedOperator)?.name || selectedOperator
    
    localStorage.setItem('mra-recharge-data', JSON.stringify({
      phoneNumber: phoneNumber,
      operator: operatorName,
      plan: plan,
      amount: plan.price
    }))
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 500)
  }

  // Combine admin plans from database with default plans, avoid duplicates
  const allPlans = adminPlans.length > 0 ? adminPlans : defaultPlans

  const filteredPlans = allPlans.filter(plan => {
    if (filterValidity && !plan.validity.includes(filterValidity)) return false
    if (searchQuery && !plan.validity.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !plan.data.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">Mobile Recharge</h2>

        {/* Phone Number Input */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <h3 className="font-semibold text-lg mb-4">Enter Phone Number</h3>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '').slice(0, 10)
              setPhoneNumber(value)
            }}
            placeholder="Enter 10 digit mobile number"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-lg mb-4"
            maxLength="10"
          />
          {phoneNumber.length === 10 && selectedOperator && (
            <div className="flex items-center space-x-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold">
                Operator detected: {operators.find(op => op.id === selectedOperator)?.name}
              </span>
            </div>
          )}
        </div>

        {/* Operator Selection */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <h3 className="font-semibold text-lg mb-4">Select Operator</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {operators.map((operator) => (
              <button
                key={operator.id}
                onClick={() => setSelectedOperator(operator.id)}
                className={`p-4 rounded-lg border-2 transition-all relative ${
                  selectedOperator === operator.id
                    ? 'border-blue-500 bg-blue-50 scale-105 shadow-md'
                    : 'border-gray-200 hover:border-gray-300 hover:scale-102'
                }`}
              >
                {selectedOperator === operator.id && (
                  <div className="absolute top-2 right-2">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  </div>
                )}
                <div className="text-4xl mb-2">{operator.logo}</div>
                <div className="font-semibold">{operator.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Circle & Plan Type Selection */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Circle/Region
              </label>
              <select
                value={selectedCircle}
                onChange={(e) => setSelectedCircle(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="">Select Circle</option>
                {circles.map((circle) => (
                  <option key={circle} value={circle}>{circle}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Plan Type
              </label>
              <div className="flex space-x-2">
                {['prepaid', 'postpaid', 'dth', 'datacard'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setPlanType(type)}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      planType === type
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Amount Input */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <h3 className="font-semibold text-lg mb-4">Enter Amount</h3>
          <div className="mb-4">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-lg"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {popularAmounts.map((amt) => (
              <button
                key={amt}
                onClick={() => setAmount(amt.toString())}
                className={`px-4 py-2 rounded-lg font-medium transition ${
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



        {/* Plan Browser */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h3 className="text-2xl font-bold mb-4 md:mb-0">Browse Plans</h3>
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:flex-initial">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search plans..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              <select
                value={filterValidity}
                onChange={(e) => setFilterValidity(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="">All Validity</option>
                <option value="1">1 Day</option>
                <option value="28">28 Days</option>
                <option value="56">56 Days</option>
                <option value="84">84 Days</option>
              </select>
            </div>
          </div>

          {filteredPlans.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No plans found matching your criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPlans.map((plan) => (
                <div
                  key={plan.id}
                  className={`p-6 rounded-xl border-2 ${getPlanTypeColor(plan.type)} hover:shadow-lg transition-all transform hover:scale-105 ${
                    amount === plan.price.toString() ? 'ring-4 ring-blue-400' : ''
                  }`}
                >
                  {plan.type === 'popular' && (
                    <div className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full inline-block mb-2">
                      Best Seller
                    </div>
                  )}
                  <div className="text-3xl font-bold mb-2">₹{plan.price}</div>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Validity:</span>
                      <span className="font-semibold">{plan.validity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Data:</span>
                      <span className="font-semibold">{plan.data}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Talktime:</span>
                      <span className="font-semibold">{plan.talktime}</span>
                    </div>
                  </div>
                  {plan.offers.length > 0 && (
                    <div className="mb-4">
                      <div className="text-sm font-semibold text-purple-700 mb-1">Special Offers:</div>
                      <div className="flex flex-wrap gap-1">
                        {plan.offers.map((offer, idx) => (
                          <span key={idx} className="bg-purple-200 text-purple-800 text-xs px-2 py-1 rounded">
                            {offer}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <button 
                    onClick={() => handlePlanSelect(plan)}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition transform hover:scale-105 active:scale-95"
                  >
                    {showSuccess && amount === plan.price.toString() ? 'Selected!' : 'Select Plan'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recharge Button */}
        {selectedOperator && amount && phoneNumber && (
          <div className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-xl text-white text-center">
            <div className="mb-4">
              <p className="text-lg mb-2">
                Recharge {phoneNumber} with ₹{amount}
              </p>
              <p className="text-sm opacity-90">
                Operator: {operators.find(op => op.id === selectedOperator)?.name}
              </p>
              {selectedPlan && (
                <p className="text-sm opacity-90 mt-1">
                  Plan: {selectedPlan.title || selectedPlan.planName}
                </p>
              )}
            </div>
            <Link
              to="/payment"
              onClick={() => {
                // Ensure data is stored before navigation
                const operatorName = operators.find(op => op.id === selectedOperator)?.name || selectedOperator
                localStorage.setItem('mra-recharge-data', JSON.stringify({
                  phoneNumber: phoneNumber,
                  operator: operatorName,
                  plan: selectedPlan || { price: Number(amount), title: 'Custom Amount' },
                  amount: Number(amount)
                }))
              }}
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Proceed to Payment
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

export default RechargeSection
