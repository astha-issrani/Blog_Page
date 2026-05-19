import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'

const T = {
  bg: '#F7F4ED', border: '#d4c9b0', ink: '#1a1a1a',
  muted: '#7a6f5e', light: '#ede8df', green: '#2D6A2D',
  red: '#dc2626', redbg: '#fef2f2',
}

function formatDate(d) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function MyDrafts() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [drafts, setDrafts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    if (!user) { navigate('/'); return }
    api.get('/api/articles/user/my')
      .then(res => {
        const all = res.data.articles || []
        setDrafts(all.filter(a => a.status === 'draft'))
      })
      .catch(() => setError('Failed to load drafts.'))
      .finally(() => setLoading(false))
  }, [user])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this draft? This cannot be undone.')) return
    setDeletingId(id)
    try {
      await api.delete(`/api/articles/${id}`)
      setDrafts(prev => prev.filter(d => d._id !== id))
    } catch {
      alert('Failed to delete draft.')
    } finally {
      setDeletingId(null)
    }
  }

  const wordCount = (text) => text?.trim() ? text.trim().split(/\s+/).length : 0

  return (
    <div style={{ minHeight: '100vh', background: T.bg, fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: 740, margin: '0 auto', padding: '56px 24px 80px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40 }}>
          <div>
            <h1 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 34, fontWeight: 700, color: T.ink, marginBottom: 6 }}>
              My Drafts
            </h1>
            <p style={{ fontSize: 14, color: T.muted }}>Stories you've saved but not yet published</p>
          </div>
          <button
            onClick={() => navigate('/write')}
            style={{ background: T.ink, color: '#F7F4ED', border: 'none', borderRadius: 100, padding: '10px 22px', fontSize: 14, fontFamily: "'DM Sans',sans-serif", cursor: 'pointer', fontWeight: 500 }}>
            + New story
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
            <div style={{ width: 32, height: 32, border: '3px solid #eee', borderTopColor: T.ink, borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{ background: T.redbg, border: `1px solid #fecaca`, borderRadius: 6, padding: '14px 18px', color: T.red, fontSize: 14 }}>
            {error}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && drafts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📝</div>
            <p style={{ fontSize: 18, color: T.muted, marginBottom: 24, fontFamily: "'Source Serif 4',serif" }}>No drafts yet</p>
            <button
              onClick={() => navigate('/write')}
              style={{ background: T.ink, color: '#F7F4ED', border: 'none', borderRadius: 100, padding: '12px 28px', fontSize: 15, fontFamily: "'DM Sans',sans-serif", cursor: 'pointer' }}>
              Start writing
            </button>
          </div>
        )}

        {/* Draft list */}
        {!loading && drafts.map((draft, i) => (
          <div key={draft._id} style={{
            borderTop: i === 0 ? `1px solid ${T.border}` : 'none',
            borderBottom: `1px solid ${T.border}`,
            padding: '28px 0',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>

              {/* Left — content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                {/* Draft badge */}
                <span style={{
                  display: 'inline-block', marginBottom: 10,
                  fontSize: 11, fontWeight: 600, letterSpacing: '0.05em',
                  background: '#fef9c3', color: '#854d0e',
                  border: '1px solid #fde68a', borderRadius: 100,
                  padding: '2px 10px',
                }}>DRAFT</span>

                <h2
                  onClick={() => navigate('/write', { state: { draftId: draft._id, draft } })}
                  style={{
                    fontFamily: "'Source Serif 4', Georgia, serif",
                    fontSize: 22, fontWeight: 700, color: T.ink,
                    marginBottom: 8, lineHeight: 1.3, cursor: 'pointer',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>
                  {draft.title || 'Untitled'}
                </h2>

                {draft.subtitle && (
                  <p style={{ fontSize: 15, color: T.muted, marginBottom: 10, lineHeight: 1.5,
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {draft.subtitle}
                  </p>
                )}

                {/* Meta */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 13, color: T.muted }}>
                  <span>Saved {formatDate(draft.updatedAt || draft.createdAt)}</span>
                  <span>·</span>
                  <span>{wordCount(draft.content)} words</span>
                  {draft.tags?.length > 0 && (
                    <>
                      <span>·</span>
                      <span>{draft.tags.slice(0, 2).join(', ')}{draft.tags.length > 2 ? '…' : ''}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Right — actions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0 }}>
                <button
                  onClick={() => navigate('/write', { state: { draftId: draft._id, draft } })}
                  style={{ background: T.ink, color: '#F7F4ED', border: 'none', borderRadius: 100, padding: '8px 18px', fontSize: 13, fontFamily: "'DM Sans',sans-serif", cursor: 'pointer', fontWeight: 500 }}>
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(draft._id)}
                  disabled={deletingId === draft._id}
                  style={{ background: 'none', color: T.red, border: `1px solid #fecaca`, borderRadius: 100, padding: '7px 18px', fontSize: 13, fontFamily: "'DM Sans',sans-serif", cursor: 'pointer', opacity: deletingId === draft._id ? 0.6 : 1 }}>
                  {deletingId === draft._id ? 'Deleting…' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}