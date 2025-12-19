import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import RechargePage from './pages/RechargePage'
import BillsPage from './pages/BillsPage'
import OffersPage from './pages/OffersPage'
import HistoryPage from './pages/HistoryPage'
import PaymentPage from './pages/PaymentPage'
import ReferralPage from './pages/ReferralPage'
import SupportPage from './pages/SupportPage'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import UserLogin from './pages/UserLogin'
import UserProfile from './pages/UserProfile'
import WalletPage from './pages/WalletPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recharge" element={<RechargePage />} />
        <Route path="/bills" element={<BillsPage />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/referral" element={<ReferralPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  )
}

export default App
