import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  // On mount, restore session from localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem('wf_token')
    const savedUser = localStorage.getItem('wf_user')
    if (savedToken && savedUser) {
      setToken(savedToken)
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const saveSession = (token, user) => {
    localStorage.setItem('wf_token', token)
    localStorage.setItem('wf_user', JSON.stringify(user))
    setToken(token)
    setUser(user)
  }

  const clearSession = () => {
    localStorage.removeItem('wf_token')
    localStorage.removeItem('wf_user')
    setToken(null)
    setUser(null)
  }

  const register = async (name, email, password) => {
    const res = await fetch(`${API}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Registration failed')
    saveSession(data.token, data.user)
    return data.user
  }

  const login = async (email, password) => {
    const res = await fetch(`${API}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Login failed')
    saveSession(data.token, data.user)
    return data.user
  }

  const logout = () => clearSession()

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)