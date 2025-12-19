import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Zap, Clock } from 'lucide-react'

const HeroBanner = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 30,
    seconds: 45
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="themed-gradient text-white py-8 md:py-12 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full -ml-48 -mb-48"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex-1 mb-6 md:mb-0">
            <div className="inline-flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full mb-4">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-semibold">Limited Time Offer</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Recharge & Get <span className="text-yellow-300">10% Cashback</span>
            </h1>
            
            <p className="text-lg md:text-xl mb-6 text-white/90">
              Recharge for ₹500+ and get instant cashback in your wallet
            </p>

            {/* Countdown Timer */}
            <div className="flex items-center space-x-4 mb-6">
              <Clock className="w-5 h-5" />
              <div className="flex items-center space-x-2">
                <div className="bg-white/20 px-4 py-2 rounded-lg">
                  <div className="text-2xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
                  <div className="text-xs text-white/80">Hours</div>
                </div>
                <span className="text-2xl">:</span>
                <div className="bg-white/20 px-4 py-2 rounded-lg">
                  <div className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
                  <div className="text-xs text-white/80">Minutes</div>
                </div>
                <span className="text-2xl">:</span>
                <div className="bg-white/20 px-4 py-2 rounded-lg">
                  <div className="text-2xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
                  <div className="text-xs text-white/80">Seconds</div>
                </div>
              </div>
            </div>

            <Link 
              to="/recharge"
              className="inline-block bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg font-bold text-lg hover:bg-yellow-300 transition shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
            >
              Quick Recharge Now
            </Link>
          </div>

          {/* Animated Badge */}
          <div className="flex-1 flex justify-center md:justify-end">
            <div className="relative">
              <div className="w-48 h-48 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-lg border-4 border-white/20 animate-pulse">
                <div className="text-center">
                  <div className="text-5xl font-bold">10%</div>
                  <div className="text-lg">Cashback</div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-bold text-sm animate-bounce">
                Special Offer
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroBanner

