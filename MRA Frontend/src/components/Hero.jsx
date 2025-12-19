import { Zap, Clock } from 'lucide-react'
import { useState, useEffect } from 'react'

const Hero = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 23,
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
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-12 md:py-16 overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex-1 mb-6 md:mb-0">
            <div className="flex items-center space-x-2 mb-4">
              <Zap className="w-6 h-6 text-yellow-300 animate-pulse-slow" />
              <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
                FLASH SALE
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-fade-in">
              Recharge & Get <span className="text-yellow-300">10% Cashback</span>
            </h1>
            <p className="text-lg md:text-xl mb-6 opacity-90">
              Limited time offer! Recharge above ₹500 and get instant cashback.
            </p>
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-lg">
                <Clock className="w-5 h-5" />
                <span className="font-mono text-lg">
                  {String(timeLeft.hours).padStart(2, '0')}:
                  {String(timeLeft.minutes).padStart(2, '0')}:
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
              </div>
            </div>
            <button className="btn-primary text-lg px-8 py-4">
              Recharge Now
            </button>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl font-bold">₹500+</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

