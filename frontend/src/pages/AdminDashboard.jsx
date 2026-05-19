import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../utils/api'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('dashboard')
  const [actionMsg, setActionMsg] = useState('')
  const navigate = useNavigate()
  const adminUser = JSON.parse(localStorage.getItem('admin_user') || '{}')

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) { navigate('/admin/login'); return }
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    fetchDashboard()
  }, [])

  const fetchDashboard = async () => {
    try {
      const res = await api.get('/api/admin/dashboard')
      setStats(res.data.stats)
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        handleLogout()
      }
    } finally { setLoading(false) }
  }

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/api/admin/users')
      setUsers(res.data.users)
    } catch {}
  }

  useEffect(() => { if (tab === 'users') fetchUsers() }, [tab])

  const handleToggle = async (id) => {
    try {
      const res = await api.patch(`/api/admin/users/${id}/toggle`)
      setUsers(u => u.map(x => x._id === id ? { ...x, isActive: res.data.isActive } : x))
      showMsg(res.data.message)
    } catch (err) { showMsg(err.response?.data?.message || 'Error', true) }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Permanently delete this user?')) return
    try {
      await api.delete(`/api/admin/users/${id}`)
      setUsers(u => u.filter(x => x._id !== id))
      showMsg('User deleted')
    } catch (err) { showMsg(err.response?.data?.message || 'Error', true) }
  }

  const showMsg = (msg, isErr = false) => {
    setActionMsg({ text: msg, err: isErr })
    setTimeout(() => setActionMsg(''), 3000)
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    navigate('/admin/login')
  }

  const s = {
    wrap: { minHeight: '100vh', background: '#f7f4ed', fontFamily: "'DM Sans', sans-serif", display: 'flex', flexDirection: 'column' },
    nav: { height: 60, background: '#1a1a1a', display: 'flex', alignItems: 'center', padding: '0 32px', gap: 16, flexShrink: 0 },
    logo: { fontFamily: "'Source Serif 4',serif", fontSize: 20, fontWeight: 700, color: '#f7f4ed' },
    badge: { fontSize: 11, background: '#3a7d2e', color: '#fff', borderRadius: 4, padding: '2px 8px', fontWeight: 600 },
    navRight: { marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 16 },
    navUser: { fontSize: 13, color: '#c5bba6' },
    logoutBtn: { fontSize: 13, color: '#c5bba6', background: 'none', border: '1px solid #333', borderRadius: 100, padding: '5px 14px', cursor: 'pointer' },
    body: { display: 'flex', flex: 1 },
    sidebar: { width: 220, background: '#fff', borderRight: '1px solid #d4c9b0', padding: '28px 0', flexShrink: 0 },
    sideItem: (active) => ({
      display: 'flex', alignItems: 'center', gap: 10, padding: '10px 24px',
      fontSize: 14, fontWeight: active ? 600 : 400,
      color: active ? '#1a1a1a' : '#7a6f5e',
      background: active ? '#f7f4ed' : 'none',
      borderLeft: active ? '3px solid #1a1a1a' : '3px solid transparent',
      cursor: 'pointer', border: 'none', width: '100%', textAlign: 'left',
      fontFamily: "'DM Sans',sans-serif"
    }),
    main: { flex: 1, padding: '36px 40px', overflow: 'auto' },
    pageTitle: { fontFamily: "'Source Serif 4',serif", fontSize: 28, fontWeight: 700, color: '#1a1a1a', marginBottom: 6 },
    pageSub: { fontSize: 14, color: '#7a6f5e', marginBottom: 32 },
    statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, marginBottom: 36 },
    statCard: { background: '#fff', borderRadius: 8, border: '1px solid #d4c9b0', padding: '24px 28px' },
    statNum: { fontFamily: "'Source Serif 4',serif", fontSize: 36, fontWeight: 700, color: '#1a1a1a', marginBottom: 4 },
    statLabel: { fontSize: 13, color: '#7a6f5e' },
    table: { width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, overflow: 'hidden', border: '1px solid #d4c9b0' },
    th: { padding: '12px 16px', fontSize: 12, fontWeight: 600, color: '#7a6f5e', textAlign: 'left', background: '#faf9f6', borderBottom: '1px solid #d4c9b0', textTransform: 'uppercase', letterSpacing: '0.05em' },
    td: { padding: '14px 16px', fontSize: 14, color: '#1a1a1a', borderBottom: '1px solid #ede8df', verticalAlign: 'middle' },
  }

  const NAV_ITEMS = [
    { id: 'dashboard', label: 'Dashboard', icon: '▦' },
    { id: 'users', label: 'Users', icon: '◎' },
    { id: 'settings', label: 'Settings', icon: '⚙' },
  ]

  if (loading) return (
    <div style={{ ...s.wrap, alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#7a6f5e', fontSize: 16 }}>Loading admin panel...</p>
    </div>
  )

  return (
    <div style={s.wrap}>
      {/* Top Nav */}
      <nav style={s.nav}>
        <span style={s.logo}>WriteFlow</span>
        <span style={s.badge}>Admin Panel</span>
        <div style={s.navRight}>
          <span style={s.navUser}>👤 {adminUser.name}</span>
          <button style={s.logoutBtn} onClick={handleLogout}>Sign out</button>
        </div>
      </nav>

      <div style={s.body}>
        {/* Sidebar */}
        <aside style={s.sidebar}>
          <div style={{ padding: '0 24px 20px', fontSize: 11, fontWeight: 600, color: '#c5bba6', letterSpacing: '0.07em', textTransform: 'uppercase' }}>Navigation</div>
          {NAV_ITEMS.map(item => (
            <button key={item.id} style={s.sideItem(tab === item.id)} onClick={() => setTab(item.id)}>
              <span style={{ fontSize: 16 }}>{item.icon}</span> {item.label}
            </button>
          ))}
          <hr style={{ border: 'none', borderTop: '1px solid #ede8df', margin: '20px 0' }} />
          <button style={s.sideItem(false)} onClick={() => navigate('/')}>
            <span>←</span> Back to site
          </button>
        </aside>

        {/* Main Content */}
        <main style={s.main}>
          {actionMsg && (
            <div style={{
              position: 'fixed', top: 24, right: 24, zIndex: 999,
              background: actionMsg.err ? '#fef2f2' : '#f0fdf4',
              border: `1px solid ${actionMsg.err ? '#fecaca' : '#bbf7d0'}`,
              borderRadius: 8, padding: '12px 20px',
              fontSize: 14, color: actionMsg.err ? '#dc2626' : '#15803d',
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
            }}>{actionMsg.text}</div>
          )}

          {/* DASHBOARD TAB */}
          {tab === 'dashboard' && (
            <>
              <div style={s.pageTitle}>Dashboard</div>
              <div style={s.pageSub}>Welcome back, {adminUser.name} — here's an overview.</div>

              <div style={s.statsGrid}>
                {[
                  { label: 'Total Users', value: stats?.totalUsers ?? 0, color: '#1a1a1a' },
                  { label: 'Active Users', value: stats?.activeUsers ?? 0, color: '#3a7d2e' },
                  { label: 'Admin Accounts', value: stats?.admins ?? 0, color: '#7a3a2e' },
                ].map(s2 => (
                  <div key={s2.label} style={s.statCard}>
                    <div style={{ ...s.statNum, color: s2.color }}>{s2.value}</div>
                    <div style={s.statLabel}>{s2.label}</div>
                  </div>
                ))}
              </div>

              <div style={{ fontFamily: "'Source Serif 4',serif", fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Quick Actions</div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {[
                  { label: 'Manage Users', action: () => setTab('users') },
                  { label: 'View Site', action: () => navigate('/') },
                ].map(btn => (
                  <button key={btn.label} onClick={btn.action} style={{
                    padding: '10px 22px', background: '#1a1a1a', color: '#f7f4ed',
                    border: 'none', borderRadius: 100, fontSize: 14,
                    fontFamily: "'DM Sans',sans-serif", cursor: 'pointer'
                  }}>{btn.label}</button>
                ))}
              </div>
            </>
          )}

          {/* USERS TAB */}
          {tab === 'users' && (
            <>
              <div style={s.pageTitle}>Users</div>
              <div style={s.pageSub}>{users.length} registered users</div>

              {users.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0', color: '#7a6f5e', fontSize: 15 }}>
                  No users yet.
                </div>
              ) : (
                <table style={s.table}>
                  <thead>
                    <tr>
                      {['Name', 'Email', 'Joined', 'Last Login', 'Status', 'Actions'].map(h => (
                        <th key={h} style={s.th}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u._id} style={{ background: u.isActive ? '#fff' : '#faf9f6' }}>
                        <td style={s.td}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#1a1a1a',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              color: '#f7f4ed', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                              {u.name[0].toUpperCase()}
                            </div>
                            <span style={{ fontWeight: 500 }}>{u.name}</span>
                          </div>
                        </td>
                        <td style={{ ...s.td, color: '#7a6f5e' }}>{u.email}</td>
                        <td style={{ ...s.td, color: '#7a6f5e' }}>
                          {new Date(u.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </td>
                        <td style={{ ...s.td, color: '#7a6f5e' }}>
                          {u.lastLogin ? new Date(u.lastLogin).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '—'}
                        </td>
                        <td style={s.td}>
                          <span style={{
                            fontSize: 12, fontWeight: 600, borderRadius: 100, padding: '3px 12px',
                            background: u.isActive ? '#f0fdf4' : '#fef2f2',
                            color: u.isActive ? '#15803d' : '#dc2626',
                            border: `1px solid ${u.isActive ? '#bbf7d0' : '#fecaca'}`
                          }}>
                            {u.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td style={s.td}>
                          <div style={{ display: 'flex', gap: 8 }}>
                            <button onClick={() => handleToggle(u._id)} style={{
                              fontSize: 12, padding: '5px 12px', borderRadius: 100, cursor: 'pointer',
                              fontFamily: "'DM Sans',sans-serif", border: '1px solid #d4c9b0',
                              background: '#fff', color: '#1a1a1a'
                            }}>
                              {u.isActive ? 'Deactivate' : 'Activate'}
                            </button>
                            <button onClick={() => handleDelete(u._id)} style={{
                              fontSize: 12, padding: '5px 12px', borderRadius: 100, cursor: 'pointer',
                              fontFamily: "'DM Sans',sans-serif", border: '1px solid #fecaca',
                              background: '#fff', color: '#dc2626'
                            }}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}

          {/* SETTINGS TAB */}
          {tab === 'settings' && (
            <>
              <div style={s.pageTitle}>Settings</div>
              <div style={s.pageSub}>Admin account settings</div>
              <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #d4c9b0', padding: '28px 32px', maxWidth: 480 }}>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 20, color: '#1a1a1a' }}>Account Info</div>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 12, color: '#7a6f5e', marginBottom: 4 }}>Name</div>
                  <div style={{ fontSize: 15, color: '#1a1a1a', fontWeight: 500 }}>{adminUser.name}</div>
                </div>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 12, color: '#7a6f5e', marginBottom: 4 }}>Email</div>
                  <div style={{ fontSize: 15, color: '#1a1a1a' }}>{adminUser.email}</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: '#7a6f5e', marginBottom: 4 }}>Role</div>
                  <span style={{ fontSize: 12, fontWeight: 600, background: '#f0fdf4', color: '#15803d',
                    border: '1px solid #bbf7d0', borderRadius: 100, padding: '3px 12px' }}>Administrator</span>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  )
}