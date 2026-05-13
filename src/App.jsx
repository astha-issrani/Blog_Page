import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import BlogPage from './pages/BlogPage'
import { AuthProvider } from './context/AuthContext'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article" element={<BlogPage />} />
      </Routes>
    </AuthProvider>
  )
}