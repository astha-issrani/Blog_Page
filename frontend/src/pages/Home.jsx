import { useState, useEffect } from 'react'
import AuthModal from '../components/AuthModal'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import AdBanner from '../components/AdBanner'
import api from '../utils/api'
import { useRef } from 'react'

const fontLink = document.createElement('link')
fontLink.rel = 'stylesheet'
fontLink.href = 'https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400;1,8..60,700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap'
if (!document.head.querySelector('link[href*="Source+Serif"]')) document.head.appendChild(fontLink)

const styles = `
  .wf-home * { box-sizing: border-box; margin: 0; padding: 0; }
  .wf-home { font-family: 'DM Sans', sans-serif; background: #F7F4ED; color: #1a1a1a; }
  .wf-hero-section { border-bottom: 1px solid #d4c9b0; display: grid; grid-template-columns: 1fr 1fr; min-height: 520px; overflow: hidden; padding: 0 0 0 40px; }
  .wf-hero-left { display: flex; flex-direction: column; justify-content: center; padding: 80px 60px 80px 0; }
  .wf-hero-headline { font-family: 'Source Serif 4', Georgia, serif; font-size: clamp(52px, 7vw, 88px); font-weight: 400; line-height: 1.0; letter-spacing: -2px; color: #1a1a1a; margin-bottom: 28px; }
  .wf-hero-sub { font-family: 'DM Sans', sans-serif; font-size: 18px; color: #1a1a1a; margin-bottom: 36px; line-height: 1.5; font-weight: 400; }
  .wf-hero-cta { font-family: 'DM Sans', sans-serif; font-size: 17px; color: #F7F4ED; background: #1a1a1a; border: none; cursor: pointer; border-radius: 100px; padding: 14px 32px; display: inline-block; width: fit-content; transition: opacity 0.15s; font-weight: 400; }
  .wf-hero-cta:hover { opacity: 0.8; }
  .wf-hero-right { position: relative; overflow: hidden; border-left: 1px solid #d4c9b0; background: #F7F4ED; display: flex; align-items: flex-end; justify-content: flex-end; }
  .wf-trending-bar { border-bottom: 1px solid #d4c9b0; padding: 20px 40px; display: flex; align-items: center; gap: 24px; overflow-x: auto; }
  .wf-trending-label { font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600; color: #1a1a1a; white-space: nowrap; letter-spacing: 0.04em; text-transform: uppercase; }
  .wf-trending-tag { font-family: 'DM Sans', sans-serif; font-size: 13px; color: #1a1a1a; background: none; border: 1px solid #c5bba6; border-radius: 100px; padding: 6px 16px; cursor: pointer; white-space: nowrap; transition: background 0.15s; }
  .wf-trending-tag:hover { background: #ede8df; }
  .wf-articles-section { padding: 48px 40px; }
  .wf-section-label { font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: #1a1a1a; margin-bottom: 24px; }
  .wf-articles-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; border: 1px solid #d4c9b0; border-radius: 2px; overflow: hidden; }
  .wf-article-card { padding: 28px 24px; border-right: 1px solid #d4c9b0; border-bottom: 1px solid #d4c9b0; background: #F7F4ED; cursor: pointer; transition: background 0.15s; }
  .wf-article-card:hover { background: #eee8db; }
  .wf-article-card:nth-child(3n) { border-right: none; }
  .wf-article-card:nth-last-child(-n+3) { border-bottom: none; }
  .wf-card-author { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
  .wf-card-avatar { width: 22px; height: 22px; border-radius: 50%; background: #1a1a1a; display: flex; align-items: center; justify-content: center; color: #F7F4ED; font-size: 9px; font-weight: 700; flex-shrink: 0; }
  .wf-card-author-name { font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; color: #1a1a1a; }
  .wf-card-title { font-family: 'Source Serif 4', Georgia, serif; font-size: 18px; font-weight: 700; line-height: 24px; color: #1a1a1a; margin-bottom: 12px; letter-spacing: -0.2px; }
  .wf-card-meta { font-family: 'DM Sans', sans-serif; font-size: 12px; color: #7a6f5e; display: flex; align-items: center; gap: 12px; }
  .wf-card-tag { background: #ede8df; border-radius: 100px; padding: 2px 10px; font-size: 11px; color: #5a5040; }
  .wf-feature-strip { border-top: 1px solid #d4c9b0; border-bottom: 1px solid #d4c9b0; background: #1a1a1a; padding: 80px 40px; display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
  .wf-feature-headline { font-family: 'Source Serif 4', Georgia, serif; font-size: clamp(32px, 4vw, 52px); font-weight: 400; color: #F7F4ED; line-height: 1.15; letter-spacing: -1px; }
  .wf-feature-body { font-family: 'DM Sans', sans-serif; font-size: 17px; color: #c5bba6; line-height: 1.7; }
  .wf-feature-cta { display: inline-block; margin-top: 28px; font-family: 'DM Sans', sans-serif; font-size: 15px; color: #1a1a1a; background: #F7F4ED; border: none; border-radius: 100px; padding: 11px 28px; cursor: pointer; transition: opacity 0.15s; }
  .wf-feature-cta:hover { opacity: 0.85; }
  .wf-more-section { padding: 48px 40px; }
  .wf-more-row { display: grid; grid-template-columns: 1fr 80px; gap: 20px; align-items: start; padding: 24px 0; border-bottom: 1px solid #d4c9b0; cursor: pointer; transition: opacity 0.15s; }
  .wf-more-row:first-child { border-top: 1px solid #d4c9b0; }
  .wf-more-row:hover { opacity: 0.75; }
  .wf-more-row:hover .wf-more-title { text-decoration: underline; }
  .wf-more-title { font-family: 'Source Serif 4', Georgia, serif; font-size: 20px; font-weight: 700; color: #1a1a1a; line-height: 26px; margin-bottom: 6px; letter-spacing: -0.2px; }
  .wf-more-sub { font-family: 'DM Sans', sans-serif; font-size: 14px; color: #7a6f5e; line-height: 20px; margin-bottom: 10px; }
  .wf-more-meta { font-family: 'DM Sans', sans-serif; font-size: 13px; color: #7a6f5e; display: flex; gap: 12px; align-items: center; }
  .wf-more-thumb { width: 80px; height: 54px; border-radius: 2px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
  .wf-new-badge { background: #3a7d2e; color: #fff; font-size: 10px; font-weight: 700; border-radius: 4px; padding: 2px 8px; font-family: 'DM Sans', sans-serif; letter-spacing: 0.04em; }
  @media (max-width: 900px) {
    .wf-hero-section { grid-template-columns: 1fr; padding: 0; }
    .wf-hero-right { display: none; }
    .wf-hero-left { padding: 60px 24px; }
    .wf-articles-grid { grid-template-columns: 1fr; }
    .wf-article-card { border-right: none; }
    .wf-article-card:nth-last-child(-n+3) { border-bottom: 1px solid #d4c9b0; }
    .wf-article-card:last-child { border-bottom: none; }
    .wf-feature-strip { grid-template-columns: 1fr; gap: 32px; padding: 60px 20px; }
    .wf-trending-bar { padding: 16px 20px; }
    .wf-articles-section, .wf-more-section { padding: 40px 20px; }
  }
`

const SEED_ARTICLES = [
  { id:'s1', title:'The Art of Writing Every Day Without Burning Out', author:'Priya Nair', tag:'Writing', mins:7, claps:214 },
  { id:'s2', title:'Why Your First Draft Should Be Terrible', author:'James Okafor', tag:'Creativity', mins:5, claps:178 },
  { id:'s3', title:"How WriteFlow's Algorithm Decides What You See", author:'WriteFlow Staff', tag:'Product', mins:6, claps:91 },
  { id:'s4', title:'Scheduling Stories Changed How I Think About Publishing', author:'Amara Silva', tag:'Writing', mins:4, claps:63 },
  { id:'s5', title:'The Quiet Power of Writing in Public', author:'Dev Sharma', tag:'Community', mins:5, claps:142 },
  { id:'s6', title:"What 1,000 Days of Writing Taught Me", author:'Chen Wei', tag:'Writing', mins:8, claps:309 },
]

const SEED_MORE = [
  { _id:'m1', title:'Writers, You Can Now Schedule Stories on WriteFlow', subtitle:'A smarter way to plan and publish your writing — on your terms', author:{name:'WriteFlow Staff'}, tags:['Product'], readTime:5, seed:true },
  { _id:'m2', title:'Introducing Collections: Organize Your Writing by Theme', subtitle:'A new way to group your stories and reach the right readers', author:{name:'WriteFlow Staff'}, tags:['Product'], readTime:4, seed:true },
  { _id:'m3', title:'How I Grew My Audience to 10,000 Readers in Six Months', subtitle:"The tactics that worked, the ones that didn't, and what I'd do differently", author:{name:'Layla Hassan'}, tags:['Growth'], readTime:9, seed:true },
]

const TAGS = ['Writing','Technology','Self-Improvement','Design','Poetry','Data Science','Productivity','Culture','Finance']
const thumbGrads = ['#0d1117','#1a1a2e','#0f2027','#200122','#141e30','#1a1040']

export default function HomePage() {
  const articlesRef = useRef(null)
  const { user } = useAuth()
  const navigate = useNavigate()
  const [modal, setModal] = useState(null)
  const [realArticles, setRealArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/api/articles')
      .then(res => setRealArticles(res.data.articles || []))
      .catch(() => setRealArticles([]))
      .finally(() => setLoading(false))
  }, [])

  const handleStart = () => {
  if (user) {
    articlesRef.current?.scrollIntoView({ behavior: 'smooth' })
  } else {
    setModal('login')
  }
}

  const handleStartWriting = () => {
    if (user) navigate('/write')
    else setModal('register')
  }

  const goToBlog = () => navigate('/blog')

  return (
    <>
      <style>{styles}</style>
      <div className="wf-home">

        {/* HERO */}
        <section className="wf-hero-section">
          <div className="wf-hero-left">
            <h1 className="wf-hero-headline">Human<br/>stories<br/>&amp; ideas</h1>
            <p className="wf-hero-sub">A place to read, write, and deepen your understanding</p>
            <button className="wf-hero-cta" onClick={handleStart}>Start reading</button>
          </div>
          <div className="wf-hero-right">
            <svg width="100%" height="100%" viewBox="0 0 560 520" preserveAspectRatio="xMidYMid slice"
              xmlns="http://www.w3.org/2000/svg" style={{position:'absolute',inset:0}}>
              <ellipse cx="420" cy="80" rx="110" ry="95" fill="#3a7d2e" transform="rotate(-15 420 80)"/>
              <ellipse cx="500" cy="120" rx="85" ry="90" fill="#3a7d2e" transform="rotate(20 500 120)"/>
              <ellipse cx="390" cy="155" rx="90" ry="75" fill="#3a7d2e" transform="rotate(5 390 155)"/>
              <ellipse cx="460" cy="55" rx="70" ry="80" fill="#3a7d2e" transform="rotate(-30 460 55)"/>
              <circle cx="440" cy="110" r="28" fill="#F7F4ED"/>
              <circle cx="440" cy="110" r="14" fill="#3a7d2e"/>
              <line x1="280" y1="40" x2="540" y2="260" stroke="#1a1a1a" strokeWidth="0.8" opacity="0.35"/>
              <line x1="320" y1="20" x2="320" y2="320" stroke="#1a1a1a" strokeWidth="0.8" opacity="0.35"/>
              <line x1="200" y1="180" x2="540" y2="180" stroke="#1a1a1a" strokeWidth="0.8" opacity="0.35"/>
              <text x="345" y="175" fontSize="10" fill="#1a1a1a" opacity="0.5" fontFamily="serif">N″</text>
              <text x="510" y="200" fontSize="10" fill="#1a1a1a" opacity="0.5" fontFamily="serif">6</text>
              <rect x="300" y="310" width="260" height="210" fill="#3a7d2e"/>
              <circle cx="270" cy="360" r="2.5" fill="#1a1a1a" opacity="0.6"/>
              <circle cx="290" cy="400" r="2" fill="#1a1a1a" opacity="0.5"/>
              <circle cx="250" cy="420" r="2" fill="#1a1a1a" opacity="0.5"/>
              <circle cx="280" cy="450" r="3" fill="#1a1a1a" opacity="0.6"/>
              <circle cx="240" cy="470" r="2" fill="#1a1a1a" opacity="0.4"/>
              <path d="M400 450 Q380 410 370 390 Q360 370 380 360 Q400 350 420 370 L440 400 Z" fill="#F7F4ED" opacity="0.9"/>
              <rect x="430" y="365" width="12" height="55" rx="4" fill="#F7F4ED" transform="rotate(35 436 392)" opacity="0.9"/>
            </svg>
          </div>
        </section>

        {/* AD 1 */}
        <div style={{ padding: '24px 40px', borderBottom: '1px solid #d4c9b0', display: 'flex', justifyContent: 'center', background: '#F7F4ED' }}>
          <AdBanner slot="horizontal" />
        </div>

        {/* TRENDING */}
        <div className="wf-trending-bar">
          <span className="wf-trending-label">Trending</span>
          {TAGS.map(t => (
            <button key={t} className="wf-trending-tag" onClick={goToBlog}>{t}</button>
          ))}
        </div>

        {/* REAL USER ARTICLES — only shown when users have published */}
        {!loading && realArticles.length > 0 && (
          <section className="wf-articles-section">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <span className="wf-section-label" style={{ marginBottom: 0 }}>Latest from our writers</span>
              <span className="wf-new-badge">NEW</span>
            </div>
            <div className="wf-articles-grid">
              {realArticles.slice(0, 6).map(a => {
                const authorName = a.author?.name || 'Unknown'
                const tag = a.tags?.[0] || 'Writing'
                return (
                  <div key={a._id} className="wf-article-card"
                    onClick={() => navigate(`/blog/${a._id}`)}>
                    <div className="wf-card-author">
                      <div className="wf-card-avatar">{authorName[0]?.toUpperCase()}</div>
                      <span className="wf-card-author-name">{authorName}</span>
                    </div>
                    <div className="wf-card-title">{a.title}</div>
                    <div className="wf-card-meta">
                      <span>{a.readTime} min read</span>
                      <span className="wf-card-tag">{tag}</span>
                      <span style={{marginLeft:'auto'}}>{a.claps} claps</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* STAFF PICKS — always shown */}
        <section className="wf-articles-section" ref={articlesRef}>
  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
    <span className="wf-section-label" >Latest from our writers</span></div>
          <div className="wf-articles-grid">
            {SEED_ARTICLES.map(a => (
              <div key={a.id} className="wf-article-card" onClick={goToBlog}>
                <div className="wf-card-author">
                  <div className="wf-card-avatar">{a.author[0]}</div>
                  <span className="wf-card-author-name">{a.author}</span>
                </div>
                <div className="wf-card-title">{a.title}</div>
                <div className="wf-card-meta">
                  <span>{a.mins} min read</span>
                  <span className="wf-card-tag">{a.tag}</span>
                  <span style={{marginLeft:'auto'}}>{a.claps} claps</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* AD 2 */}
        <div style={{ padding: '0 40px 40px', display: 'flex', justifyContent: 'center', background: '#F7F4ED' }}>
          <AdBanner slot="horizontal" />
        </div>

        {/* DARK STRIP */}
        <div className="wf-feature-strip">
          <div>
            <div className="wf-feature-headline">Write on<br/>WriteFlow.<br/>Share your ideas.</div>
          </div>
          <div>
            <p className="wf-feature-body">
              Every idea deserves an audience. WriteFlow gives you the tools to write clearly,
              grow your readership, and connect with people who care about what you have to say.
              Start for free — no technical skills needed.
            </p>
            <button className="wf-feature-cta" onClick={handleStartWriting}>Start writing</button>
          </div>
        </div>

        {/* MORE STORIES */}
        <section className="wf-more-section">
          <div className="wf-section-label">
            {realArticles.length > 0 ? 'From Our Community' : 'From The WriteFlow Blog'}
          </div>
          {(realArticles.length > 0 ? realArticles.slice(0, 5) : SEED_MORE).map((a, i) => {
            const authorName = a.author?.name || 'Unknown'
            const tag = a.tags?.[0] || 'Writing'
            return (
              <div key={a._id} className="wf-more-row"
                onClick={() => a.seed ? goToBlog() : navigate(`/blog/${a._id}`)}>
                <div>
                  <div className="wf-more-title">{a.title}</div>
                  <div className="wf-more-sub">{a.subtitle || ''}</div>
                  <div className="wf-more-meta">
                    <div style={{width:18,height:18,borderRadius:'50%',background:'#1a1a1a',
                      display:'flex',alignItems:'center',justifyContent:'center',
                      color:'#F7F4ED',fontSize:8,fontWeight:700,flexShrink:0}}>
                      {authorName[0]?.toUpperCase()}
                    </div>
                    <span>{authorName}</span>
                    <span>·</span>
                    <span>{a.readTime} min read</span>
                    <span style={{background:'#ede8df',borderRadius:'100px',padding:'2px 10px',fontSize:11,color:'#5a5040'}}>{tag}</span>
                  </div>
                </div>
                <div className="wf-more-thumb" style={{background: thumbGrads[i % thumbGrads.length]}}>
                  <span style={{color:'rgba(255,255,255,0.2)',fontSize:22,fontFamily:"'Source Serif 4',serif"}}>W</span>
                </div>
              </div>
            )
          })}
        </section>

        {/* AD 3 */}
        <div style={{ padding: '40px', display: 'flex', justifyContent: 'center', borderTop: '1px solid #d4c9b0', background: '#F7F4ED' }}>
          <AdBanner slot="horizontal" />
        </div>

      </div>

      {modal && <AuthModal mode={modal} onClose={() => setModal(null)} />}
    </>
  )
}