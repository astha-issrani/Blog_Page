import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AuthModal from './AuthModal'

export default function Navbar() {
  const { user, logout } = useAuth()
  const [modal, setModal] = useState(null)
  const [dropdown, setDropdown] = useState(false)
  const dropRef = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    const handler = e => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropdown(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const initials = user?.name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || 'U'
  const isAdmin = user?.role === 'admin'

  return (
    <>
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: '#F7F4ED',
        borderBottom: '1px solid #d4c9b0',
        height: '64px', display: 'flex', alignItems: 'center', padding: '0 40px'
      }}>
        {/* Logo */}
        <Link to="/" style={{
          fontFamily: "'Source Serif 4', Georgia, serif",
          fontSize: '26px', fontWeight: 700, letterSpacing: '-0.5px',
          color: '#1a1a1a', flexShrink: 0, textDecoration: 'none'
        }}>WriteFlow</Link>

        {/* Right side */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '24px' }}>
          <button style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: '#1a1a1a', background: 'none', border: 'none', cursor: 'pointer' }}>
            Our story
          </button>
          <button style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: '#1a1a1a', background: 'none', border: 'none', cursor: 'pointer' }}>
            Membership
          </button>

          {user ? (
            <>
              {/* Write link */}
              <Link to="/write" style={{
                fontFamily: "'DM Sans',sans-serif", fontSize: 14,
                color: '#1a1a1a', textDecoration: 'none',
                display: 'flex', alignItems: 'center', gap: 6
              }}>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"/>
                </svg>
                Write
              </Link>

              {/* Admin Panel button — only visible to admins */}
              {isAdmin && (
                <Link to="/admin/dashboard" style={{
                  fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 600,
                  color: '#fff', background: '#1a1a1a', borderRadius: 4,
                  padding: '5px 12px', textDecoration: 'none',
                  display: 'flex', alignItems: 'center', gap: 5
                }}>
                  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>
                  </svg>
                  Admin Panel
                </Link>
              )}

              {/* Avatar dropdown */}
              <div style={{ position: 'relative' }} ref={dropRef}>
                <div onClick={() => setDropdown(d => !d)} style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: isAdmin ? '#3a7d2e' : '#1a1a1a',
                  color: '#F7F4ED',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600,
                  cursor: 'pointer', userSelect: 'none', position: 'relative'
                }}>
                  {initials}
                  {/* Gold dot indicator for admin */}
                  {isAdmin && (
                    <span style={{
                      position: 'absolute', bottom: 0, right: 0,
                      width: 10, height: 10, borderRadius: '50%',
                      background: '#f59e0b', border: '2px solid #F7F4ED'
                    }}/>
                  )}
                </div>

                {dropdown && (
                  <div style={{
                    position: 'absolute', right: 0, top: 44,
                    background: '#fff', border: '1px solid #d4c9b0',
                    borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    minWidth: 210, zIndex: 200
                  }}>
                    {/* User info header */}
                    <div style={{ padding: '14px 16px', borderBottom: '1px solid #ede8df' }}>
                      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 500, color: '#1a1a1a' }}>{user.name}</div>
                      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: '#7a6f5e', marginTop: 2 }}>{user.email}</div>
                      {isAdmin && (
                        <span style={{
                          display: 'inline-block', marginTop: 6,
                          fontSize: 11, fontWeight: 600,
                          background: '#f0fdf4', color: '#15803d',
                          border: '1px solid #bbf7d0', borderRadius: 100,
                          padding: '2px 10px', fontFamily: "'DM Sans',sans-serif"
                        }}>Administrator</span>
                      )}
                    </div>

                    {/* Admin Panel — only for admins */}
                    {isAdmin && (
                      <button onClick={() => { setDropdown(false); navigate('/admin/dashboard') }} style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        width: '100%', padding: '11px 16px', textAlign: 'left',
                        fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 500,
                        color: '#1a1a1a', background: '#fafaf8',
                        border: 'none', borderBottom: '1px solid #ede8df', cursor: 'pointer'
                      }}>
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>
                        </svg>
                        Admin Panel
                      </button>
                    )}

                    <button onClick={() => { setDropdown(false); navigate('/dashboard') }} style={{
                      display: 'block', width: '100%', padding: '11px 16px', textAlign: 'left',
                      fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: '#1a1a1a',
                      background: 'none', border: 'none', borderBottom: '1px solid #f5f5f5', cursor: 'pointer'
                    }}>My Stories</button>

                    <button onClick={() => { setDropdown(false); navigate('/bookmarks') }} style={{
                      display: 'block', width: '100%', padding: '11px 16px', textAlign: 'left',
                      fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: '#1a1a1a',
                      background: 'none', border: 'none', borderBottom: '1px solid #f5f5f5', cursor: 'pointer'
                    }}>Bookmarks</button>

                    <button onClick={() => { logout(); setDropdown(false); navigate('/') }} style={{
                      display: 'block', width: '100%', padding: '11px 16px', textAlign: 'left',
                      fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: '#7a6f5e',
                      background: 'none', border: 'none', cursor: 'pointer'
                    }}>Sign out</button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <button onClick={() => setModal('login')} style={{
                fontFamily: "'DM Sans',sans-serif", fontSize: 14,
                color: '#1a1a1a', background: 'none', border: 'none', cursor: 'pointer'
              }}>Sign in</button>
              <button onClick={() => setModal('register')} style={{
                background: '#1a1a1a', color: '#F7F4ED',
                fontFamily: "'DM Sans',sans-serif", fontSize: 14,
                border: 'none', borderRadius: '100px', padding: '8px 20px', cursor: 'pointer'
              }}>Get started</button>
            </>
          )}
        </div>
      </nav>

      {modal && <AuthModal mode={modal} onClose={() => setModal(null)} />}
    </>
  )
}