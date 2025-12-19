import Header from '../components/Header'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import QuickActions from '../components/QuickActions'
import RechargeSection from '../components/RechargeSection'
import FeaturedPlans from '../components/FeaturedPlans'
import TransactionHistory from '../components/TransactionHistory'
import PaymentSection from '../components/PaymentSection'
import ReferralSection from '../components/ReferralSection'
import SupportSection from '../components/SupportSection'

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <QuickActions />
        <RechargeSection />
        <FeaturedPlans />
        <TransactionHistory />
        <PaymentSection />
        <ReferralSection />
        <SupportSection />
      </main>
      <Footer />
    </div>
  )
}

export default Home

