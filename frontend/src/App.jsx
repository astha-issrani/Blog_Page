import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import TermsAndConditions from './pages/TermsAndConditions'
import PrivacyPolicy from './pages/PrivacyPolicy'
import WritePage from './pages/WritePage'
import BlogPage from './pages/BlogPage'

const STANDALONE = ['/admin/login', '/admin/dashboard']

function Layout() {
  const location = useLocation()
  const isStandalone = STANDALONE.some(p => location.pathname.startsWith(p))

  return (
    <div style={{ minHeight: '100vh', background: '#F7F4ED' }}>

      {!isStandalone && <Navbar />}

      <Routes>
        <Route path="/"        element={<Home />} />
        <Route path="/blog/:id" element={<BlogPage />} />
        <Route path="/write"   element={<WritePage />} />
        <Route path="/terms"   element={<TermsAndConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />

        <Route path="/admin"             element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/login"       element={<AdminLogin />} />
        <Route path="/admin/dashboard"   element={<AdminDashboard />} />

        <Route path="*" element={
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', minHeight: '60vh', fontFamily: "'DM Sans',sans-serif"
          }}>
            <div style={{ fontSize: 72, fontFamily: "'Source Serif 4',serif", fontWeight: 700, color: '#d4c9b0' }}>404</div>
            <div style={{ fontSize: 20, color: '#7a6f5e', marginBottom: 8 }}>Page not found</div>
            <a href="/" style={{ color: '#1a1a1a', fontSize: 15, fontFamily: "'DM Sans',sans-serif" }}>← Go back home</a>
          </div>
        } />
      </Routes>

      {!isStandalone && (
        <footer style={{ borderTop: '1px solid #d4c9b0', padding: '28px 40px', background: '#F7F4ED' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 20px', alignItems: 'center' }}>
            {['Help', 'Status', 'About', 'Careers', 'Press', 'Blog'].map(l => (
              <span key={l} style={{
                fontFamily: "'DM Sans',sans-serif", fontSize: 13,
                color: '#7a6f5e', cursor: 'pointer'
              }}>{l}</span>
            ))}
            <a href="/privacy" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: '#7a6f5e', textDecoration: 'none' }}>Privacy</a>
            <a href="/terms"   style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: '#7a6f5e', textDecoration: 'none' }}>Terms</a>
          </div>
        </footer>
      )}
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  )
}