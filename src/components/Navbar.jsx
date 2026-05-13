import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AuthModal from './AuthModal'

export default function Navbar() {
  const { user, logout } = useAuth()
  const [modal, setModal] = useState(null) // 'login' | 'register' | null
  const [dropdown, setDropdown] = useState(false)
  const dropRef = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    const handler = e => { if (dropRef.current && !dropRef.current.contains(e.target)) setDropdown(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const initials = user?.name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0,2) || 'W'

  return (
    <>
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100, background: '#fff',
        borderBottom: '1px solid #e6e6e6', height: '57px',
        display: 'flex', alignItems: 'center', padding: '0 32px'
      }}>
        <Link to="/" style={{
          fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '26px',
          fontWeight: 700, letterSpacing: '-0.5px', color: '#000', flexShrink: 0
        }}>WriteFlow</Link>

        <span style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#757575',
          borderLeft: '1px solid #e6e6e6', paddingLeft: '16px', marginLeft: '16px'
        }}>The WriteFlow Blog</span>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          {user ? (
            <>
              <Link to="/write" style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: '14px',
                color: '#757575', display: 'flex', alignItems: 'center', gap: '6px'
              }}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"/>
                </svg>
                Write
              </Link>
              <div style={{ position: 'relative' }} ref={dropRef}>
                <div
                  onClick={() => setDropdown(d => !d)}
                  style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: '#000', color: '#fff', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    fontFamily: "'DM Sans', sans-serif", fontSize: '13px',
                    fontWeight: 600, cursor: 'pointer', userSelect: 'none'
                  }}
                >{initials}</div>

                {dropdown && (
                  <div style={{
                    position: 'absolute', right: 0, top: '44px',
                    background: '#fff', border: '1px solid #e6e6e6',
                    borderRadius: '4px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    minWidth: '200px', zIndex: 200
                  }}>
                    <div style={{ padding: '16px', borderBottom: '1px solid #e6e6e6' }}>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 500 }}>{user.name}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: '#757575', marginTop: '2px' }}>{user.email}</div>
                    </div>
                    {[
                      { label: 'My Stories', path: '/dashboard' },
                      { label: 'Write a Story', path: '/write' },
                      { label: 'Bookmarks', path: '/bookmarks' },
                    ].map(item => (
                      <Link key={item.path} to={item.path}
                        onClick={() => setDropdown(false)}
                        style={{
                          display: 'block', padding: '12px 16px',
                          fontFamily: "'DM Sans', sans-serif", fontSize: '14px',
                          color: '#292929', borderBottom: '1px solid #f5f5f5'
                        }}>
                        {item.label}
                      </Link>
                    ))}
                    <button onClick={() => { logout(); setDropdown(false); navigate('/') }}
                      style={{
                        display: 'block', width: '100%', padding: '12px 16px',
                        fontFamily: "'DM Sans', sans-serif", fontSize: '14px',
                        color: '#292929', background: 'none', border: 'none',
                        textAlign: 'left', cursor: 'pointer'
                      }}>Sign out</button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <button onClick={() => setModal('login')} style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: '14px',
                color: '#757575', background: 'none', border: 'none'
              }}>Sign in</button>
              <button onClick={() => setModal('register')} style={{
                background: '#000', color: '#fff',
                fontFamily: "'DM Sans', sans-serif", fontSize: '14px',
                border: 'none', borderRadius: '100px', padding: '7px 18px'
              }}>Get started</button>
            </>
          )}
        </div>
      </nav>

      {modal && <AuthModal mode={modal} onClose={() => setModal(null)} />}
    </>
  )
}