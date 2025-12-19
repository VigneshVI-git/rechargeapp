import { useState } from 'react'
import { MessageCircle, Phone, Mail, HelpCircle, ChevronDown, ChevronUp, Video } from 'lucide-react'

const SupportSection = () => {
  const [openFaq, setOpenFaq] = useState(null)

  const faqs = [
    {
      question: 'How do I recharge my mobile?',
      answer: 'Simply enter your 10-digit mobile number, select your operator, choose a plan or enter amount, and proceed to payment. Your recharge will be completed instantly.'
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept Credit/Debit Cards, UPI (Google Pay, PhonePe, Paytm), Net Banking, Wallet, and Cash on Delivery (for select services).'
    },
    {
      question: 'How long does it take for recharge to reflect?',
      answer: 'Most recharges are instant and reflect within 2-3 minutes. In rare cases, it may take up to 15 minutes. You will receive a confirmation SMS once completed.'
    },
    {
      question: 'What if my recharge fails?',
      answer: 'If your recharge fails, the amount will be refunded to your original payment method within 5-7 business days. You can also retry the transaction immediately.'
    },
    {
      question: 'How do I check my transaction history?',
      answer: 'Go to the History section in the app. You can filter transactions by date, type, and status. You can also download receipts for successful transactions.'
    },
    {
      question: 'Is my payment information secure?',
      answer: 'Yes, we use industry-standard encryption and secure payment gateways. We do not store your complete card details. All transactions are PCI-DSS compliant.'
    }
  ]

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Support & Help</h2>

        {/* Quick Support Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <button
            onClick={() => alert('Live chat will open in a new window')}
            className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-8 rounded-xl shadow-lg hover:shadow-xl transition transform hover:scale-105 active:scale-95 text-center w-full"
          >
            <MessageCircle className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Live Chat</h3>
            <p className="text-blue-100">Chat with our support team 24/7</p>
          </button>

          <a
            href="tel:+911234567890"
            className="bg-gradient-to-br from-green-500 to-green-600 text-white p-8 rounded-xl shadow-lg hover:shadow-xl transition transform hover:scale-105 active:scale-95 text-center"
          >
            <Phone className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Call Support</h3>
            <p className="text-green-100">+91 1234 567 890</p>
            <p className="text-sm text-green-100 mt-1">Mon-Sat, 9 AM - 9 PM</p>
          </a>

          <a
            href="mailto:support@mra.com"
            className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-8 rounded-xl shadow-lg hover:shadow-xl transition transform hover:scale-105 active:scale-95 text-center"
          >
            <Mail className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Email Us</h3>
            <p className="text-purple-100">support@mra.com</p>
            <p className="text-sm text-purple-100 mt-1">We reply within 24 hours</p>
          </a>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <div className="flex items-center justify-center mb-6">
            <HelpCircle className="w-8 h-8 text-blue-600 mr-2" />
            <h3 className="text-2xl font-bold">Frequently Asked Questions</h3>
          </div>
          <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl border-2 border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-100 transition"
                >
                  <span className="font-semibold text-left">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0 ml-4" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 py-4 bg-white border-t border-gray-200">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tutorial Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl">
          <div className="flex items-center justify-center mb-6">
            <Video className="w-8 h-8 text-blue-600 mr-2" />
            <h3 className="text-2xl font-bold">How to Use</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h4 className="font-semibold text-center mb-2">Select Operator</h4>
              <p className="text-sm text-gray-600 text-center">
                Choose your telecom operator from the list
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h4 className="font-semibold text-center mb-2">Choose Plan</h4>
              <p className="text-sm text-gray-600 text-center">
                Select a plan or enter custom amount
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h4 className="font-semibold text-center mb-2">Pay & Recharge</h4>
              <p className="text-sm text-gray-600 text-center">
                Complete payment and get instant recharge
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SupportSection
