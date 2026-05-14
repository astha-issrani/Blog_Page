import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const s = {
  overlay: {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 1000, padding: '16px', backdropFilter: 'blur(2px)'
  },
  modal: {
    background: '#fff', borderRadius: '4px', width: '100%', maxWidth: '400px',
    padding: '48px 40px', position: 'relative', boxShadow: '0 4px 40px rgba(0,0,0,0.15)'
  },
  close: {
    position: 'absolute', top: '16px', right: '16px',
    background: 'none', border: 'none', fontSize: '20px',
    color: '#757575', cursor: 'pointer', padding: '4px 8px', lineHeight: 1
  },
  logo: {
    fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '28px',
    fontWeight: 700, textAlign: 'center', marginBottom: '8px', color: '#000'
  },
  title: {
    fontFamily: "'DM Sans', sans-serif", fontSize: '18px',
    fontWeight: 500, textAlign: 'center', marginBottom: '32px', color: '#292929'
  },
  label: {
    fontFamily: "'DM Sans', sans-serif", fontSize: '13px',
    fontWeight: 500, color: '#292929', marginBottom: '6px', display: 'block'
  },
  input: {
    width: '100%', padding: '12px 14px', border: '1px solid #e0e0e0',
    borderRadius: '4px', fontFamily: "'DM Sans', sans-serif", fontSize: '15px',
    color: '#292929', outline: 'none', marginBottom: '16px',
    transition: 'border-color 0.15s'
  },
  btn: {
    width: '100%', padding: '13px', background: '#000', color: '#fff',
    border: 'none', borderRadius: '100px', fontFamily: "'DM Sans', sans-serif",
    fontSize: '15px', fontWeight: 500, cursor: 'pointer', marginTop: '8px',
    transition: 'opacity 0.15s'
  },
  error: {
    background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '4px',
    padding: '10px 14px', marginBottom: '16px',
    fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#dc2626'
  },
  switch: {
    textAlign: 'center', marginTop: '24px',
    fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#757575'
  },
  switchLink: {
    color: '#1a8917', fontWeight: 500, cursor: 'pointer', background: 'none',
    border: 'none', fontFamily: "'DM Sans', sans-serif", fontSize: '14px'
  },
  divider: {
    display: 'flex', alignItems: 'center', gap: '12px', margin: '20px 0'
  },
  divLine: { flex: 1, height: '1px', background: '#e6e6e6' },
  divText: {
    fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#757575'
  }
}

export default function AuthModal({ mode: initialMode = 'login', onClose }) {
  const [mode, setMode] = useState(initialMode)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, register } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (mode === 'login') {
        await login(email, password)
      } else {
        if (!name.trim()) { setError('Name is required'); setLoading(false); return }
        await register(name, email, password)
      }
      onClose()
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const switchMode = () => {
    setMode(m => m === 'login' ? 'register' : 'login')
    setError('')
    setName(''); setEmail(''); setPassword('')
  }

  return (
    <div style={s.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={s.modal}>
        <button style={s.close} onClick={onClose}>×</button>
        <div style={s.logo}>WriteFlow</div>
        <div style={s.title}>
          {mode === 'login' ? 'Welcome back.' : 'Join WriteFlow.'}
        </div>

        {error && <div style={s.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <div>
              <label style={s.label}>Full name</label>
              <input
                style={s.input} type="text" placeholder="Your name"
                value={name} onChange={e => setName(e.target.value)}
                onFocus={e => e.target.style.borderColor = '#000'}
                onBlur={e => e.target.style.borderColor = '#e0e0e0'}
                required
              />
            </div>
          )}
          <div>
            <label style={s.label}>Email</label>
            <input
              style={s.input} type="email" placeholder="you@example.com"
              value={email} onChange={e => setEmail(e.target.value)}
              onFocus={e => e.target.style.borderColor = '#000'}
              onBlur={e => e.target.style.borderColor = '#e0e0e0'}
              required
            />
          </div>
          <div>
            <label style={s.label}>Password</label>
            <input
              style={s.input} type="password"
              placeholder={mode === 'register' ? 'Min 6 characters' : 'Your password'}
              value={password} onChange={e => setPassword(e.target.value)}
              onFocus={e => e.target.style.borderColor = '#000'}
              onBlur={e => e.target.style.borderColor = '#e0e0e0'}
              minLength={6} required
            />
          </div>
          <button
            style={{ ...s.btn, opacity: loading ? 0.7 : 1 }}
            type="submit" disabled={loading}
          >
            {loading ? 'Please wait...' : mode === 'login' ? 'Sign in' : 'Create account'}
          </button>
        </form>

        <div style={s.divider}>
          <div style={s.divLine} />
          <span style={s.divText}>or</span>
          <div style={s.divLine} />
        </div>

        <div style={s.switch}>
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button style={s.switchLink} onClick={switchMode}>
            {mode === 'login' ? 'Create one' : 'Sign in'}
          </button>
        </div>
      </div>
    </div>
  )
}