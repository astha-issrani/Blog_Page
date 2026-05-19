import { useNavigate } from 'react-router-dom'

export default function DummyBlog() {
  const navigate = useNavigate()
  return (
    <div style={{
      minHeight: '100vh', background: '#F7F4ED',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      fontFamily: "'DM Sans', sans-serif"
    }}>
      <div style={{ textAlign: 'center', maxWidth: 480, padding: '0 24px' }}>
        <div style={{ fontSize: 72, marginBottom: 16 }}>📄</div>
        <h1 style={{
          fontFamily: "'Source Serif 4', Georgia, serif",
          fontSize: 36, fontWeight: 700, color: '#1a1a1a', marginBottom: 12
        }}>This is a dummy page</h1>
        <p style={{ fontSize: 16, color: '#7a6f5e', lineHeight: 1.7, marginBottom: 32 }}>
          This article is part of our curated Staff Picks and is not real content.
          Sign up to read real stories published by our community of writers.
        </p>
        <button
          onClick={() => navigate('/')}
          style={{
            background: '#1a1a1a', color: '#F7F4ED', border: 'none',
            borderRadius: 100, padding: '12px 28px', fontSize: 15,
            fontFamily: "'DM Sans', sans-serif", cursor: 'pointer'
          }}>
          ← Back to home
        </button>
      </div>
    </div>
  )
}