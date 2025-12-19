import { useState } from 'react'
import { Share2, Copy, Check, MessageCircle, Mail, Facebook, Twitter } from 'lucide-react'

const ReferralSection = () => {
  const [copied, setCopied] = useState(false)
  const referralCode = 'MRA2024XYZ'

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareOptions = [
    { icon: MessageCircle, name: 'WhatsApp', color: 'bg-green-500' },
    { icon: MessageCircle, name: 'SMS', color: 'bg-blue-500' },
    { icon: Mail, name: 'Email', color: 'bg-red-500' },
    { icon: Facebook, name: 'Facebook', color: 'bg-blue-600' },
    { icon: Twitter, name: 'Twitter', color: 'bg-sky-500' }
  ]

  return (
    <section className="py-8 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4">
              <Share2 className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Refer & Earn</h2>
            <p className="text-gray-600 text-lg">
              Share your referral code and earn ₹50 for each successful referral
            </p>
          </div>

          {/* Referral Code Display */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 mb-8 text-white">
            <div className="text-center">
              <p className="text-sm mb-2 opacity-90">Your Referral Code</p>
              <div className="flex items-center justify-center space-x-4">
                <div className="text-4xl font-bold tracking-wider">{referralCode}</div>
                <button
                  onClick={handleCopy}
                  className="p-3 bg-white/20 backdrop-blur rounded-lg hover:bg-white/30 transition flex items-center space-x-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Share Options */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-center">Share via</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {shareOptions.map((option, index) => {
                const Icon = option.icon
                const handleShare = () => {
                  const message = `Join Mobile Recharge App using my referral code: ${referralCode} and get amazing offers!`
                  if (option.name === 'WhatsApp') {
                    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank')
                  } else if (option.name === 'SMS') {
                    window.open(`sms:?body=${encodeURIComponent(message)}`, '_blank')
                  } else if (option.name === 'Email') {
                    window.open(`mailto:?subject=Join Mobile Recharge App&body=${encodeURIComponent(message)}`, '_blank')
                  } else if (option.name === 'Facebook') {
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')
                  } else if (option.name === 'Twitter') {
                    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`, '_blank')
                  } else {
                    alert(`Sharing via ${option.name}...`)
                  }
                }
                return (
                  <button
                    key={index}
                    onClick={handleShare}
                    className={`${option.color} text-white p-6 rounded-xl hover:scale-105 transition transform shadow-lg hover:shadow-xl active:scale-95`}
                  >
                    <Icon className="w-8 h-8 mx-auto mb-2" />
                    <div className="font-semibold">{option.name}</div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Referral Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-xl text-center border-2 border-blue-200">
              <div className="text-3xl font-bold text-blue-600 mb-2">12</div>
              <div className="text-gray-700 font-semibold">Total Referrals</div>
            </div>
            <div className="bg-green-50 p-6 rounded-xl text-center border-2 border-green-200">
              <div className="text-3xl font-bold text-green-600 mb-2">8</div>
              <div className="text-gray-700 font-semibold">Successful</div>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl text-center border-2 border-purple-200">
              <div className="text-3xl font-bold text-purple-600 mb-2">₹400</div>
              <div className="text-gray-700 font-semibold">Earned</div>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">How It Works</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <div className="font-semibold">Share your referral code</div>
                  <div className="text-sm text-gray-600">Send your unique code to friends and family</div>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <div className="font-semibold">They sign up and recharge</div>
                  <div className="text-sm text-gray-600">Your friend uses your code and makes their first recharge</div>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <div className="font-semibold">You earn ₹50</div>
                  <div className="text-sm text-gray-600">Get ₹50 credited to your wallet instantly</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ReferralSection
