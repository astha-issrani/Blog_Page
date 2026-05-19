import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AdBanner from "../components/AdBanner";
import api from '../utils/api';
import ReactMarkdown from 'react-markdown';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400;1,8..60,700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --black: #000; --white: #fff; --text-primary: rgba(41,41,41,1);
    --text-secondary: rgba(117,117,117,1); --border: rgba(230,230,230,1);
    --green: #1a8917; --bg: #fff;
    --serif: 'Source Serif 4', Georgia, serif;
    --sans: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  }
  .wf-wrap { font-family: var(--sans); color: var(--text-primary); background: var(--bg); -webkit-font-smoothing: antialiased; min-height: 100vh; width: 100%; overflow-x: hidden; }
  .wf-page { width: 100%; display: grid; grid-template-columns: 1fr 320px; gap: 0; }
  .wf-main { min-width: 0; padding: 48px 80px 48px 80px; }
  .wf-sidebar { padding: 48px 40px 48px 40px; border-left: 1px solid var(--border); }

  /* ── Cover image ── */
  .wf-cover { width: 100%; margin-bottom: 40px; border-radius: 4px; overflow: hidden; }
  .wf-cover img { width: 100%; max-height: 480px; object-fit: cover; display: block; border-radius: 4px; }

  .wf-title { font-family: var(--serif); font-size: 42px; font-weight: 700; line-height: 52px; letter-spacing: -0.5px; color: #000; margin-bottom: 16px; }
  .wf-subtitle { font-family: var(--serif); font-size: 22px; font-weight: 400; line-height: 32px; color: var(--text-secondary); margin-bottom: 28px; }
  .wf-byline { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
  .wf-avatar { width: 44px; height: 44px; border-radius: 50%; background: #000; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 18px; font-weight: 700; font-family: var(--serif); flex-shrink: 0; }
  .wf-byline-author { font-family: var(--sans); font-size: 14px; font-weight: 500; color: var(--text-primary); margin-bottom: 2px; }
  .wf-byline-details { font-family: var(--sans); font-size: 13px; color: var(--text-secondary); }
  .wf-action-bar { display: flex; align-items: center; justify-content: space-between; padding: 12px 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); margin-bottom: 40px; }
  .wf-action-left, .wf-action-right { display: flex; align-items: center; gap: 20px; }
  .wf-icon-btn { display: flex; align-items: center; gap: 6px; font-family: var(--sans); font-size: 14px; color: var(--text-secondary); background: none; border: none; cursor: pointer; padding: 0; transition: color 0.15s; }
  .wf-icon-btn:hover { color: var(--text-primary); }
  .wf-clap-ring { width: 34px; height: 34px; border-radius: 50%; border: 1.5px solid var(--text-secondary); display: flex; align-items: center; justify-content: center; transition: all 0.15s; }
  .wf-icon-btn:hover .wf-clap-ring { border-color: var(--text-primary); background: #f7f7f7; }
  .wf-clap-ring.active { border-color: #000; background: #000; }
  .wf-clap-ring.active svg { color: #fff; }
  .wf-body { margin-bottom: 40px; }
  .wf-body p { font-family: var(--serif); font-size: 20px; line-height: 32px; color: var(--text-primary); margin-bottom: 32px; letter-spacing: -0.003em; white-space: pre-wrap; }
  .wf-body h2 { font-family: var(--serif); font-size: 26px; font-weight: 700; line-height: 34px; color: #000; margin: 48px 0 16px; letter-spacing: -0.3px; }
  .wf-tags { display: flex; flex-wrap: wrap; gap: 8px; margin: 48px 0 40px; }
  .wf-tag { font-family: var(--sans); font-size: 14px; color: var(--text-primary); background: #f2f2f2; border-radius: 100px; padding: 8px 16px; }
  .wf-footer-actions { display: flex; align-items: center; justify-content: space-between; padding: 16px 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); margin-bottom: 48px; }
  .wf-cards-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-bottom: 48px; }
  .wf-card-label { font-family: var(--sans); font-size: 12px; font-weight: 600; color: var(--text-primary); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 14px; }
  .wf-card-inner { display: flex; gap: 12px; align-items: flex-start; }
  .wf-card-avatar { width: 50px; height: 50px; border-radius: 50%; background: #000; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 20px; font-weight: 700; font-family: var(--serif); flex-shrink: 0; }
  .wf-card-name { font-family: var(--sans); font-size: 15px; font-weight: 600; color: var(--text-primary); margin-bottom: 3px; }
  .wf-card-bio { font-family: var(--sans); font-size: 14px; color: var(--text-primary); line-height: 20px; margin-bottom: 8px; }
  .wf-sb-author { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
  .wf-sb-avatar { width: 38px; height: 38px; border-radius: 50%; background: #000; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 15px; font-weight: 700; font-family: var(--serif); flex-shrink: 0; }
  .wf-sb-author-name { font-family: var(--sans); font-size: 14px; font-weight: 500; color: var(--text-primary); }
  .wf-sb-bio { font-family: var(--sans); font-size: 14px; color: var(--text-primary); line-height: 22px; margin-bottom: 20px; }
  .wf-sb-divider { border: none; border-top: 1px solid var(--border); margin: 20px 0; }
  .wf-sb-section-title { font-family: var(--sans); font-size: 13px; font-weight: 600; color: var(--text-primary); margin-bottom: 18px; }
  .wf-sb-rec { margin-bottom: 22px; }
  .wf-sb-rec-pub { font-family: var(--sans); font-size: 12px; color: var(--text-secondary); margin-bottom: 5px; display: flex; align-items: center; gap: 6px; }
  .wf-sb-rec-dot { width: 16px; height: 16px; border-radius: 50%; background: #000; display: inline-flex; align-items: center; justify-content: center; color: #fff; font-size: 8px; font-weight: 700; font-family: var(--serif); flex-shrink: 0; }
  .wf-sb-rec-title { font-family: var(--sans); font-size: 15px; font-weight: 600; color: var(--text-primary); line-height: 21px; margin-bottom: 5px; cursor: pointer; }
  .wf-sb-rec-title:hover { text-decoration: underline; }
  .wf-sb-rec-meta { font-family: var(--sans); font-size: 12px; color: var(--text-secondary); }
  .wf-sb-rec-thumb { width: 100%; height: 80px; object-fit: cover; border-radius: 4px; margin-bottom: 8px; }
  .wf-mobile-bar { display: none; position: fixed; bottom: 0; left: 0; right: 0; background: #fff; border-top: 1px solid var(--border); padding: 10px 24px; z-index: 50; align-items: center; justify-content: space-between; }
  .wf-center-state { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 60vh; gap: 16px; font-family: var(--sans); }
  .wf-spinner { width: 36px; height: 36px; border: 3px solid #eee; border-top-color: #000; border-radius: 50%; animation: spin 0.7s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .wf-error-code { font-family: var(--serif); font-size: 72px; font-weight: 700; color: #e0e0e0; }
  .wf-error-msg { font-size: 18px; color: var(--text-secondary); }
  .wf-back-btn { margin-top: 8px; font-family: var(--sans); font-size: 15px; color: #000; background: none; border: 1px solid #000; border-radius: 100px; padding: 10px 24px; cursor: pointer; }
  .wf-back-btn:hover { background: #000; color: #fff; }
  @media (max-width: 900px) {
    .wf-page { grid-template-columns: 1fr; }
    .wf-main { padding: 32px 24px 80px; }
    .wf-sidebar { display: none; }
    .wf-title { font-size: 30px; line-height: 38px; }
    .wf-subtitle { font-size: 18px; line-height: 28px; }
    .wf-body p { font-size: 18px; line-height: 30px; }
    .wf-cards-grid { grid-template-columns: 1fr; gap: 24px; }
    .wf-mobile-bar { display: flex; }
  }
  @media (max-width: 480px) {
    .wf-main { padding: 24px 16px 80px; }
    .wf-title { font-size: 26px; line-height: 34px; }
    .wf-avatar { width: 38px; height: 38px; font-size: 15px; }
  }
`

function ShareIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"/></svg>
}
function BookmarkIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"/></svg>
}
function MoreIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M4.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clipRule="evenodd"/></svg>
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function BlogPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [article, setArticle]     = useState(null)
  const [related, setRelated]     = useState([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState(null)
  const [clapped, setClapped]     = useState(false)
  const [clapCount, setClapCount] = useState(0)

  useEffect(() => {
    if (!id) navigate('/', { replace: true })
  }, [id, navigate])

  useEffect(() => {
    const el = document.createElement("style")
    el.textContent = styles
    document.head.appendChild(el)
    return () => document.head.removeChild(el)
  }, [])

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setError(null)

    api.get(`/api/articles/${id}`)
      .then(res => {
        const a = res.data.article
        setArticle(a)
        setClapCount(a.claps ?? 0)
        return api.get('/api/articles')
      })
      .then(res => {
        const all = res.data.articles || []
        setRelated(all.filter(a => a._id !== id).slice(0, 4))
      })
      .catch(err => {
        if (err.response?.status === 404) setError('notfound')
        else setError('server')
      })
      .finally(() => setLoading(false))
  }, [id])

  const handleClap = async () => {
    if (!user) return
    try {
      const res = await api.post(`/api/articles/${id}/clap`)
      setClapped(res.data.clapped)
      setClapCount(res.data.claps)
    } catch {
      setClapped(c => !c)
      setClapCount(c => clapped ? c - 1 : c + 1)
    }
  }

  const ClapButton = ({ size = "normal" }) => (
    <button className="wf-icon-btn" onClick={handleClap} style={{ gap: size === "mobile" ? 8 : 6 }}>
      <span className={`wf-clap-ring ${clapped ? "active" : ""}`}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill={clapped ? "#fff" : "currentColor"}>
          <path d="M14.828 3.172a4 4 0 015.656 5.656L12 17.314l-8.485-8.486a4 4 0 015.657-5.656L12 6.343l2.828-3.171z"/>
        </svg>
      </span>
      <span style={{ fontFamily: "var(--sans)", fontSize: 14, color: clapped ? "#000" : "var(--text-secondary)" }}>
        {clapCount}
      </span>
    </button>
  )

  if (loading) {
    return (
      <div className="wf-wrap">
        <div className="wf-center-state">
          <div className="wf-spinner" />
          <span style={{ color: 'var(--text-secondary)', fontFamily: 'var(--sans)' }}>Loading article…</span>
        </div>
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="wf-wrap">
        <div className="wf-center-state">
          <div className="wf-error-code">{error === 'notfound' ? '404' : '500'}</div>
          <div className="wf-error-msg">
            {error === 'notfound' ? "This article doesn't exist or was removed." : 'Something went wrong. Please try again.'}
          </div>
          <button className="wf-back-btn" onClick={() => navigate('/')}>← Back to home</button>
        </div>
      </div>
    )
  }

  const authorName   = article.author?.name || 'Anonymous'
  const authorLetter = authorName[0]?.toUpperCase() || 'A'

  return (
    <div className="wf-wrap">
      <div className="wf-page">

        <main className="wf-main">

          {/* ── COVER IMAGE — only shown when the article has one ── */}
          {article.coverImage && (
            <div className="wf-cover">
              <img
                src={article.coverImage}
                alt={article.title}
                onError={e => { e.target.style.display = 'none' }}
              />
            </div>
          )}

          <h1 className="wf-title">{article.title}</h1>
          {article.subtitle && (
            <h2 className="wf-subtitle">{article.subtitle}</h2>
          )}

          <div className="wf-byline">
            <div className="wf-avatar">{authorLetter}</div>
            <div>
              <div className="wf-byline-author">{authorName}</div>
              <div className="wf-byline-details">
                {article.readTime} min read · {formatDate(article.createdAt)}
              </div>
            </div>
          </div>

          <div className="wf-action-bar">
            <div className="wf-action-left"><ClapButton /></div>
            <div className="wf-action-right">
              <button className="wf-icon-btn"><ShareIcon /></button>
              <button className="wf-icon-btn"><BookmarkIcon /></button>
              <button className="wf-icon-btn"><MoreIcon /></button>
            </div>
          </div>

          <div style={{ margin: '0 0 40px', display: 'flex', justifyContent: 'center' }}>
            <AdBanner slot="horizontal" />
          </div>

          <div className="wf-body">
  <style>{`
    .wf-body h2 { font-family: var(--serif); font-size: 26px; font-weight: 700; line-height: 34px; color: #000; margin: 48px 0 16px; letter-spacing: -0.3px; }
    .wf-body h3 { font-family: var(--serif); font-size: 20px; font-weight: 700; margin: 32px 0 12px; }
    .wf-body p  { font-family: var(--serif); font-size: 20px; line-height: 32px; color: var(--text-primary); margin-bottom: 32px; letter-spacing: -0.003em; }
    .wf-body blockquote { border-left: 3px solid #000; padding-left: 24px; margin: 36px 0; font-style: italic; color: var(--text-secondary); }
    .wf-body code { background: #f2f2f2; padding: 2px 6px; border-radius: 3px; font-size: 16px; font-family: monospace; }
    .wf-body pre  { background: #f2f2f2; padding: 16px; border-radius: 6px; overflow-x: auto; margin-bottom: 24px; }
    .wf-body ul, .wf-body ol { padding-left: 28px; margin-bottom: 28px; font-family: var(--serif); font-size: 20px; line-height: 32px; }
    .wf-body li   { margin-bottom: 8px; }
    .wf-body a    { color: var(--green); text-decoration: underline; }
    .wf-body hr   { border: none; border-top: 1px solid var(--border); margin: 40px 0; }
    .wf-body strong { font-weight: 700; }
    .wf-body em   { font-style: italic; }
  `}</style>
  <ReactMarkdown
  components={{
    a: ({ href, children }) => (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }}
>
  {article.content}
</ReactMarkdown>
</div>

          <div style={{ margin: '0 0 40px', display: 'flex', justifyContent: 'center' }}>
            <AdBanner slot="horizontal" />
          </div>

          {article.tags?.length > 0 && (
            <div className="wf-tags">
              {article.tags.map(t => (
                <span key={t} className="wf-tag">{t}</span>
              ))}
            </div>
          )}

          <div className="wf-footer-actions">
            <div className="wf-action-left"><ClapButton /></div>
            <div className="wf-action-right">
              <button className="wf-icon-btn"><ShareIcon /></button>
              <button className="wf-icon-btn"><BookmarkIcon /></button>
              <button className="wf-icon-btn"><MoreIcon /></button>
            </div>
          </div>

          <div className="wf-cards-grid">
            <div>
              <div className="wf-card-label">Written by</div>
              <div className="wf-card-inner">
                <div className="wf-card-avatar">{authorLetter}</div>
                <div>
                  <div className="wf-card-name">{authorName}</div>
                  {article.author?.bio && (
                    <div className="wf-card-bio">{article.author.bio}</div>
                  )}
                </div>
              </div>
            </div>
          </div>

        </main>

        {/* ── SIDEBAR ── */}
        <aside className="wf-sidebar">
          <div className="wf-sb-author">
            <div className="wf-sb-avatar">{authorLetter}</div>
            <span className="wf-sb-author-name">{authorName}</span>
          </div>
          {article.author?.bio && (
            <p className="wf-sb-bio">{article.author.bio}</p>
          )}

          <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'center' }}>
            <AdBanner slot="sidebar" />
          </div>

          <hr className="wf-sb-divider" />

          {related.length > 0 && (
            <>
              <div className="wf-sb-section-title">More stories</div>
              {related.map(rec => (
                <div key={rec._id} className="wf-sb-rec">
                  {rec.coverImage && (
                    <img
                      src={rec.coverImage}
                      alt={rec.title}
                      className="wf-sb-rec-thumb"
                      onError={e => { e.target.style.display = 'none' }}
                    />
                  )}
                  <div className="wf-sb-rec-pub">
                    <span className="wf-sb-rec-dot">
                      {(rec.author?.name || 'A')[0].toUpperCase()}
                    </span>
                    {rec.author?.name || 'Anonymous'}
                  </div>
                  <div
                    className="wf-sb-rec-title"
                    onClick={() => navigate(`/blog/${rec._id}`)}
                  >
                    {rec.title}
                  </div>
                  <div className="wf-sb-rec-meta">
                    {formatDate(rec.createdAt)} · {rec.readTime} min read
                  </div>
                </div>
              ))}
            </>
          )}
        </aside>

      </div>

      <div className="wf-mobile-bar">
        <ClapButton size="mobile" />
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <button className="wf-icon-btn"><ShareIcon /></button>
          <button className="wf-icon-btn"><BookmarkIcon /></button>
          <button className="wf-icon-btn"><MoreIcon /></button>
        </div>
      </div>
    </div>
  )
}