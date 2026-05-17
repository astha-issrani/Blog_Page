import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const overlay = {
  position: 'fixed', inset: 0, zIndex: 1000,
  background: 'rgba(0,0,0,0.45)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  padding: '20px'
}

const modal = {
  background: '#fff', borderRadius: '8px',
  padding: '40px 36px', width: '100%', maxWidth: '420px',
  position: 'relative', fontFamily: "'DM Sans', sans-serif"
}

const inputStyle = {
  width: '100%', padding: '11px 14px',
  border: '1px solid #d4c9b0', borderRadius: '6px',
  fontFamily: "'DM Sans', sans-serif", fontSize: '15px',
  color: '#1a1a1a', background: '#fff', outline: 'none',
  boxSizing: 'border-box'
}

const labelStyle = {
  display: 'block', fontSize: '13px',
  fontWeight: 500, color: '#1a1a1a', marginBottom: '6px'
}

const btnPrimary = {
  width: '100%', padding: '13px',
  background: '#1a1a1a', color: '#F7F4ED',
  border: 'none', borderRadius: '100px',
  fontFamily: "'DM Sans', sans-serif", fontSize: '15px',
  cursor: 'pointer', marginTop: '8px'
}

const errBox = {
  background: '#fff5f5', border: '1px solid #fca5a5',
  borderRadius: '6px', padding: '10px 14px',
  fontSize: '14px', color: '#dc2626', marginBottom: '16px'
}

export default function AuthModal({ mode = 'login', onClose }) {
  const { login, register } = useAuth()
  const [view, setView] = useState(mode)   // 'login' | 'register'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const reset = () => { setName(''); setEmail(''); setPassword(''); setError('') }

  const switchView = (v) => { reset(); setView(v) }

  const handleSubmit = async () => {
    setError('')
    if (!email || !password) return setError('Please fill in all fields.')
    if (view === 'register' && !name) return setError('Please enter your name.')
    if (password.length < 8) return setError('Password must be at least 8 characters.')

    setLoading(true)
    try {
      if (view === 'register') await register(name, email, password)
      else await login(email, password)
      onClose()
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e) => { if (e.key === 'Enter') handleSubmit() }

  return (
    <div style={overlay} onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div style={modal}>

        {/* Close */}
        <button onClick={onClose} style={{
          position: 'absolute', top: 14, right: 16,
          background: 'none', border: 'none', fontSize: 22,
          cursor: 'pointer', color: '#7a6f5e', lineHeight: 1
        }}>×</button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontSize: '22px', fontWeight: 700, color: '#1a1a1a', marginBottom: '6px'
          }}>WriteFlow</div>
          <div style={{ fontSize: '15px', color: '#7a6f5e' }}>
            {view === 'register' ? 'Join WriteFlow.' : 'Welcome back.'}
          </div>
        </div>

        {/* Error */}
        {error && <div style={errBox}>{error}</div>}

        {/* Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {view === 'register' && (
            <div>
              <label style={labelStyle}>Full name</label>
              <input
                style={inputStyle} type="text" placeholder="Your name"
                value={name} onChange={e => setName(e.target.value)} onKeyDown={handleKey}
                autoFocus
              />
            </div>
          )}
          <div>
            <label style={labelStyle}>Email</label>
            <input
              style={inputStyle} type="email" placeholder="you@example.com"
              value={email} onChange={e => setEmail(e.target.value)} onKeyDown={handleKey}
              autoFocus={view === 'login'}
            />
          </div>
          <div>
            <label style={labelStyle}>Password</label>
            <input
              style={inputStyle} type="password"
              placeholder={view === 'register' ? 'At least 8 characters' : 'Your password'}
              value={password} onChange={e => setPassword(e.target.value)} onKeyDown={handleKey}
            />
          </div>
        </div>

        {/* Submit */}
        <button style={{ ...btnPrimary, opacity: loading ? 0.6 : 1 }} onClick={handleSubmit} disabled={loading}>
          {loading ? 'Please wait…' : view === 'register' ? 'Create account' : 'Sign in'}
        </button>

        {/* Switch */}
        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#7a6f5e' }}>
          {view === 'register' ? (
            <>Already have an account?{' '}
              <span onClick={() => switchView('login')}
                style={{ color: '#1a1a1a', fontWeight: 500, cursor: 'pointer', textDecoration: 'underline' }}>
                Sign in
              </span>
            </>
          ) : (
            <>No account yet?{' '}
              <span onClick={() => switchView('register')}
                style={{ color: '#1a1a1a', fontWeight: 500, cursor: 'pointer', textDecoration: 'underline' }}>
                Create one
              </span>
            </>
          )}
        </div>

      </div>
    </div>
  )
}