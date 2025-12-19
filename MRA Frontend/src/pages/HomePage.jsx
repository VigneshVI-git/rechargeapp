import { Link } from 'react-router-dom'
import Header from '../components/Header'
import HeroBanner from '../components/HeroBanner'
import QuickActions from '../components/QuickActions'
import Footer from '../components/Footer'

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroBanner />
      <QuickActions />
      <Footer />
    </div>
  )
}

export default HomePage
