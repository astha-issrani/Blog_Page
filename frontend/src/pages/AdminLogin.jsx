import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../utils/api'


export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (token) navigate('/admin/dashboard')
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await api.post('/api/auth/admin-login', { email, password });
      localStorage.setItem('admin_token', res.data.token)
      localStorage.setItem('admin_user', JSON.stringify(res.data.user))
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#f7f4ed',
      display: 'flex', flexDirection: 'column',
      fontFamily: "'DM Sans', sans-serif"
    }}>
      {/* Top bar */}
      <div style={{
        padding: '0 40px', height: 60, display: 'flex', alignItems: 'center',
        borderBottom: '1px solid #d4c9b0', background: '#f7f4ed'
      }}>
        <span style={{
          fontFamily: "'Source Serif 4', Georgia, serif",
          fontSize: 22, fontWeight: 700, color: '#1a1a1a'
        }}>WriteFlow</span>
        <span style={{
          marginLeft: 12, fontSize: 12, color: '#7a6f5e',
          background: '#ede8df', borderRadius: 4, padding: '2px 10px', fontWeight: 600
        }}>Admin</span>
      </div>

      {/* Center card */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '40px 16px'
      }}>
        <div style={{
          width: '100%', maxWidth: 420,
          background: '#fff', borderRadius: 8,
          border: '1px solid #d4c9b0',
          boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
          padding: '48px 40px'
        }}>
          {/* Icon */}
          <div style={{
            width: 52, height: 52, borderRadius: 12, background: '#1a1a1a',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 24
          }}>
            <svg width="24" height="24" fill="none" stroke="#f7f4ed" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>
            </svg>
          </div>

          <h1 style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontSize: 26, fontWeight: 700, color: '#1a1a1a', marginBottom: 6
          }}>Admin sign in</h1>
          <p style={{ fontSize: 14, color: '#7a6f5e', marginBottom: 32 }}>
            Restricted access — authorised personnel only
          </p>

          {error && (
            <div style={{
              background: '#fef2f2', border: '1px solid #fecaca',
              borderRadius: 6, padding: '12px 14px', marginBottom: 20,
              fontSize: 13, color: '#dc2626', display: 'flex', alignItems: 'flex-start', gap: 8
            }}>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20" style={{flexShrink:0,marginTop:1}}>
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            {/* Email */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: '#1a1a1a', display: 'block', marginBottom: 6 }}>
                Email address
              </label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="admin@example.com" required
                style={{
                  width: '100%', padding: '11px 14px', fontSize: 14,
                  border: '1px solid #d4c9b0', borderRadius: 6, outline: 'none',
                  fontFamily: "'DM Sans', sans-serif", color: '#1a1a1a',
                  background: '#faf9f6', transition: 'border-color 0.15s'
                }}
                onFocus={e => e.target.style.borderColor = '#1a1a1a'}
                onBlur={e => e.target.style.borderColor = '#d4c9b0'}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: 28 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: '#1a1a1a', display: 'block', marginBottom: 6 }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="Min 8 characters" required minLength={8}
                  style={{
                    width: '100%', padding: '11px 44px 11px 14px', fontSize: 14,
                    border: '1px solid #d4c9b0', borderRadius: 6, outline: 'none',
                    fontFamily: "'DM Sans', sans-serif", color: '#1a1a1a',
                    background: '#faf9f6', transition: 'border-color 0.15s'
                  }}
                  onFocus={e => e.target.style.borderColor = '#1a1a1a'}
                  onBlur={e => e.target.style.borderColor = '#d4c9b0'}
                />
                <button type="button" onClick={() => setShowPass(s => !s)}
                  style={{
                    position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', color: '#7a6f5e', padding: 0
                  }}>
                  {showPass
                    ? <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/></svg>
                    : <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  }
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} style={{
              width: '100%', padding: '13px', background: '#1a1a1a', color: '#f7f4ed',
              border: 'none', borderRadius: 100, fontSize: 15, fontWeight: 500,
              fontFamily: "'DM Sans', sans-serif", cursor: 'pointer',
              opacity: loading ? 0.7 : 1, transition: 'opacity 0.15s'
            }}>
              {loading
                ? <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                    </svg>
                    Signing in...
                  </span>
                : 'Sign in to Admin Panel'
              }
            </button>
          </form>

          <div style={{
            marginTop: 24, padding: '12px 14px', background: '#faf9f6',
            borderRadius: 6, border: '1px solid #ede8df'
          }}>
            <p style={{ fontSize: 12, color: '#7a6f5e', lineHeight: '18px' }}>
              🔒 This page is for site administrators only. All login attempts are logged.
              If you're a regular user, <a href="/" style={{ color: '#1a1a1a', fontWeight: 500 }}>go back home</a>.
            </p>
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}