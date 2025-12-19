import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Star, TrendingUp, Gift, CheckCircle } from 'lucide-react'

const FeaturedPlans = () => {
  const [adminPlans, setAdminPlans] = useState([])
  const [selectedPlan, setSelectedPlan] = useState(null)
  const navigate = useNavigate()
  
  // Fetch admin plans
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/plans/active')
        if (response.ok) {
          const plans = await response.json()
          setAdminPlans(plans)
        }
      } catch (error) {
        console.error('Error fetching plans:', error)
      }
    }
    fetchPlans()
  }, [])
  
  const handlePlanSelect = (plan, isAdminPlan = false) => {
    const planData = isAdminPlan ? {
      id: plan._id,
      title: plan.planName,
      price: plan.amount,
      validity: plan.validity,
      data: plan.benefits,
      planName: plan.planName
    } : plan
    
    setSelectedPlan(planData)
    
    // Store plan data and redirect to recharge page
    localStorage.setItem('mra-selected-offer-plan', JSON.stringify(planData))
    navigate('/recharge')
  }
  
  const featuredPlans = [
    {
      id: 1,
      title: 'Combo Plan',
      price: 499,
      validity: '84 days',
      data: '2GB/day',
      cashback: '5%',
      badge: 'Best Value',
      color: 'bg-gradient-to-br from-purple-500 to-pink-500'
    },
    {
      id: 2,
      title: 'Top Up Special',
      price: 299,
      validity: '56 days',
      data: '1.5GB/day',
      cashback: '3%',
      badge: 'Popular',
      color: 'bg-gradient-to-br from-orange-500 to-red-500'
    },
    {
      id: 3,
      title: 'Premium Pack',
      price: 799,
      validity: '90 days',
      data: '3GB/day',
      cashback: '7%',
      badge: 'Premium',
      offers: ['Netflix', 'Amazon Prime', 'Disney+'],
      color: 'bg-gradient-to-br from-blue-500 to-indigo-500'
    }
  ]

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">Featured Plans & Offers</h2>
          <div className="flex items-center space-x-2 text-blue-600">
            <TrendingUp className="w-5 h-5" />
            <span className="font-semibold">Hot Deals</span>
          </div>
        </div>

        {/* Cashback Banner */}
        <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white p-6 rounded-xl mb-8 shadow-lg">
          <div className="flex items-center space-x-4">
            <Gift className="w-12 h-12" />
            <div>
              <h3 className="text-2xl font-bold">Get 5% Cashback</h3>
              <p className="text-green-50">On recharges above ₹500. Limited time offer!</p>
            </div>
          </div>
        </div>

        {/* Featured Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {featuredPlans.map((plan) => (
            <div
              key={plan.id}
              className={`${plan.color} text-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-sm font-semibold">
                    {plan.badge}
                  </span>
                  <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                <div className="text-4xl font-bold mb-4">₹{plan.price}</div>
                <div className="space-y-2 mb-4 bg-white/10 backdrop-blur p-4 rounded-lg">
                  <div className="flex justify-between">
                    <span>Validity:</span>
                    <span className="font-semibold">{plan.validity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Data:</span>
                    <span className="font-semibold">{plan.data}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cashback:</span>
                    <span className="font-semibold">{plan.cashback}</span>
                  </div>
                </div>
                {plan.offers && (
                  <div className="mb-4">
                    <div className="text-sm mb-2">Includes:</div>
                    <div className="flex flex-wrap gap-2">
                      {plan.offers.map((offer, idx) => (
                        <span key={idx} className="bg-white/20 backdrop-blur px-2 py-1 rounded text-xs">
                          {offer}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <button 
                  onClick={() => handlePlanSelect(plan)}
                  className="block w-full bg-white text-gray-900 py-3 rounded-lg font-bold hover:bg-gray-100 transition transform hover:scale-105 active:scale-95 text-center"
                >
                  Select Plan
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Admin Added Plans Section */}
        {adminPlans.length > 0 && (
          <div className="bg-gray-50 p-6 rounded-xl mb-8">
            <h3 className="text-xl font-bold mb-4">Latest Plans</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {adminPlans.slice(0, 6).map((plan) => (
                <div key={plan._id} className="bg-white p-4 rounded-lg border-2 border-blue-200 hover:border-blue-400 transition">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{plan.planName}</span>
                    <span className="text-blue-600 font-bold">₹{plan.amount}</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    <div>Validity: {plan.validity}</div>
                    <div>Benefits: {plan.benefits}</div>
                  </div>
                  <button
                    onClick={() => handlePlanSelect(plan, true)}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    Select Plan
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Combo Plans Section */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-4">Combo Plans</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border-2 border-purple-200 hover:border-purple-400 transition cursor-pointer"
                 onClick={() => handlePlanSelect({
                   id: 'combo1',
                   title: 'Talktime + Data + OTT',
                   price: 599,
                   validity: '84 days',
                   data: '2GB/day + Netflix'
                 })}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">Talktime + Data + OTT</span>
                <span className="text-purple-600 font-bold">₹599</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">Get unlimited talktime, 2GB/day data + Netflix subscription</p>
              <div className="text-center">
                <span className="text-purple-600 font-semibold text-sm">Click to Select</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border-2 border-orange-200 hover:border-orange-400 transition cursor-pointer"
                 onClick={() => handlePlanSelect({
                   id: 'combo2',
                   title: 'Data + OTT Combo',
                   price: 399,
                   validity: '56 days',
                   data: '1.5GB/day + Prime Video'
                 })}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">Data + OTT Combo</span>
                <span className="text-orange-600 font-bold">₹399</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">1.5GB/day data + Amazon Prime Video access</p>
              <div className="text-center">
                <span className="text-orange-600 font-semibold text-sm">Click to Select</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedPlans

