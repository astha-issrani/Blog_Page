import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdBanner from "../components/AdBanner";

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
  .wf-title { font-family: var(--serif); font-size: 42px; font-weight: 700; line-height: 52px; letter-spacing: -0.5px; color: #000; margin-bottom: 16px; }
  .wf-subtitle { font-family: var(--serif); font-size: 22px; font-weight: 400; line-height: 32px; color: var(--text-secondary); margin-bottom: 28px; }
  .wf-byline { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
  .wf-avatar { width: 44px; height: 44px; border-radius: 50%; background: #000; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 18px; font-weight: 700; font-family: var(--serif); flex-shrink: 0; cursor: pointer; }
  .wf-byline-author { font-family: var(--sans); font-size: 14px; font-weight: 500; color: var(--text-primary); cursor: pointer; margin-bottom: 2px; }
  .wf-byline-details { font-family: var(--sans); font-size: 13px; color: var(--text-secondary); }
  .wf-action-bar { display: flex; align-items: center; justify-content: space-between; padding: 12px 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); margin-bottom: 40px; }
  .wf-action-left, .wf-action-right { display: flex; align-items: center; gap: 20px; }
  .wf-icon-btn { display: flex; align-items: center; gap: 6px; font-family: var(--sans); font-size: 14px; color: var(--text-secondary); background: none; border: none; cursor: pointer; padding: 0; transition: color 0.15s; }
  .wf-icon-btn:hover { color: var(--text-primary); }
  .wf-clap-ring { width: 34px; height: 34px; border-radius: 50%; border: 1.5px solid var(--text-secondary); display: flex; align-items: center; justify-content: center; transition: all 0.15s; }
  .wf-icon-btn:hover .wf-clap-ring { border-color: var(--text-primary); background: #f7f7f7; }
  .wf-clap-ring.active { border-color: #000; background: #000; }
  .wf-clap-ring.active svg { color: #fff; }
  .wf-hero { width: 100%; border-radius: 4px; overflow: hidden; margin-bottom: 10px; aspect-ratio: 16 / 7.5; background: linear-gradient(135deg, #0d1117 0%, #161b29 45%, #1a1040 75%, #2d1b5e 100%); display: flex; align-items: center; justify-content: center; }
  .wf-hero-ui { background: #fff; border-radius: 10px; box-shadow: 0 24px 64px rgba(0,0,0,0.5); width: 65%; max-width: 420px; overflow: hidden; }
  .wf-hero-titlebar { background: #f2f2f2; border-bottom: 1px solid #e0e0e0; padding: 9px 14px; display: flex; align-items: center; gap: 6px; }
  .wf-hero-dot { width: 10px; height: 10px; border-radius: 50%; }
  .wf-hero-label { margin-left: 10px; font-family: var(--sans); font-size: 11px; color: #888; }
  .wf-hero-body { padding: 0; }
  .wf-hero-row { display: flex; align-items: center; justify-content: space-between; padding: 9px 14px; border-bottom: 1px solid #f5f5f5; font-family: var(--sans); font-size: 12px; color: #333; }
  .wf-hero-row:last-child { border-bottom: none; }
  .wf-badge { font-family: var(--sans); font-size: 10px; border-radius: 4px; padding: 2px 9px; font-weight: 500; white-space: nowrap; }
  .wf-badge-green { background: #1a8917; color: #fff; }
  .wf-badge-dark { background: #111; color: #fff; }
  .wf-badge-grey { background: #ebebeb; color: #555; }
  .wf-caption { font-family: var(--sans); font-size: 13px; color: var(--text-secondary); text-align: center; font-style: italic; margin-bottom: 40px; line-height: 20px; }
  .wf-body p { font-family: var(--serif); font-size: 20px; line-height: 32px; color: var(--text-primary); margin-bottom: 32px; letter-spacing: -0.003em; }
  .wf-body h2 { font-family: var(--serif); font-size: 26px; font-weight: 700; line-height: 34px; color: #000; margin: 48px 0 16px; letter-spacing: -0.3px; }
  .wf-body blockquote { border-left: 3px solid #000; padding-left: 24px; margin: 36px 0; }
  .wf-body blockquote p { font-family: var(--serif); font-size: 19px; line-height: 30px; color: var(--text-primary); font-style: italic; margin-bottom: 0; }
  .wf-body a { text-decoration: underline; color: inherit; }
  .wf-inline-img { width: 100%; border-radius: 4px; overflow: hidden; margin: 36px 0 10px; aspect-ratio: 16 / 6.5; background: linear-gradient(135deg, #eef2f7 0%, #dce6f0 100%); display: flex; align-items: center; justify-content: center; }
  .wf-inline-ui { background: #fff; border-radius: 8px; box-shadow: 0 8px 32px rgba(0,0,0,0.13); border: 1px solid #e5e5e5; width: 78%; max-width: 460px; overflow: hidden; }
  .wf-inline-header { background: #111; padding: 10px 16px; font-family: var(--sans); font-size: 12px; color: #fff; font-weight: 500; }
  .wf-inline-row { display: flex; align-items: center; justify-content: space-between; padding: 10px 16px; border-bottom: 1px solid #f3f3f3; font-family: var(--sans); font-size: 12px; color: #333; }
  .wf-inline-row:last-child { border-bottom: none; }
  .wf-inline-row-name { font-weight: 500; }
  .wf-schedule-pill { border: 1px solid #ccc; border-radius: 100px; padding: 3px 12px; font-family: var(--sans); font-size: 10px; color: #555; background: none; cursor: pointer; white-space: nowrap; }
  .wf-schedule-pill.set { background: #f5f5f5; color: #222; border-color: #ddd; }
  .wf-tags { display: flex; flex-wrap: wrap; gap: 8px; margin: 48px 0 40px; }
  .wf-tag { font-family: var(--sans); font-size: 14px; color: var(--text-primary); background: #f2f2f2; border-radius: 100px; padding: 8px 16px; }
  .wf-footer-actions { display: flex; align-items: center; justify-content: space-between; padding: 16px 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); margin-bottom: 48px; }
  .wf-cards-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-bottom: 48px; }
  .wf-card-label { font-family: var(--sans); font-size: 12px; font-weight: 600; color: var(--text-primary); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 14px; }
  .wf-card-inner { display: flex; gap: 12px; align-items: flex-start; }
  .wf-card-avatar { width: 50px; height: 50px; border-radius: 50%; background: #000; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 20px; font-weight: 700; font-family: var(--serif); flex-shrink: 0; }
  .wf-card-avatar.square { border-radius: 6px; }
  .wf-card-name { font-family: var(--sans); font-size: 15px; font-weight: 600; color: var(--text-primary); margin-bottom: 3px; }
  .wf-card-followers { font-family: var(--sans); font-size: 13px; color: var(--text-secondary); margin-bottom: 6px; }
  .wf-card-bio { font-family: var(--sans); font-size: 14px; color: var(--text-primary); line-height: 20px; margin-bottom: 8px; }
  .wf-follow-link { font-family: var(--sans); font-size: 14px; color: var(--green); font-weight: 500; cursor: pointer; background: none; border: none; padding: 0; }
  .wf-sb-author { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
  .wf-sb-avatar { width: 38px; height: 38px; border-radius: 50%; background: #000; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 15px; font-weight: 700; font-family: var(--serif); flex-shrink: 0; }
  .wf-sb-author-name { font-family: var(--sans); font-size: 14px; font-weight: 500; color: var(--text-primary); }
  .wf-sb-follow { margin-left: auto; font-family: var(--sans); font-size: 14px; color: var(--green); font-weight: 500; cursor: pointer; background: none; border: none; flex-shrink: 0; }
  .wf-sb-bio { font-family: var(--sans); font-size: 14px; color: var(--text-primary); line-height: 22px; margin-bottom: 20px; }
  .wf-sb-divider { border: none; border-top: 1px solid var(--border); margin: 20px 0; }
  .wf-sb-section-title { font-family: var(--sans); font-size: 13px; font-weight: 600; color: var(--text-primary); margin-bottom: 18px; }
  .wf-sb-rec { margin-bottom: 22px; }
  .wf-sb-rec-pub { font-family: var(--sans); font-size: 12px; color: var(--text-secondary); margin-bottom: 5px; display: flex; align-items: center; gap: 6px; }
  .wf-sb-rec-dot { width: 16px; height: 16px; border-radius: 50%; background: #000; display: inline-flex; align-items: center; justify-content: center; color: #fff; font-size: 8px; font-weight: 700; font-family: var(--serif); flex-shrink: 0; }
  .wf-sb-rec-title { font-family: var(--sans); font-size: 15px; font-weight: 600; color: var(--text-primary); line-height: 21px; margin-bottom: 5px; cursor: pointer; }
  .wf-sb-rec-title:hover { text-decoration: underline; }
  .wf-sb-rec-meta { font-family: var(--sans); font-size: 12px; color: var(--text-secondary); }
  .wf-sb-more { font-family: var(--sans); font-size: 14px; color: var(--green); font-weight: 500; cursor: pointer; background: none; border: none; padding: 0; }
  .wf-mobile-bar { display: none; position: fixed; bottom: 0; left: 0; right: 0; background: #fff; border-top: 1px solid var(--border); padding: 10px 24px; z-index: 50; align-items: center; justify-content: space-between; }
  @media (max-width: 900px) {
    .wf-page { grid-template-columns: 1fr; }
    .wf-main { padding: 32px 24px 80px; }
    .wf-sidebar { display: none; }
    .wf-title { font-size: 30px; line-height: 38px; }
    .wf-subtitle { font-size: 18px; line-height: 28px; }
    .wf-body p { font-size: 18px; line-height: 30px; }
    .wf-body h2 { font-size: 22px; }
    .wf-cards-grid { grid-template-columns: 1fr; gap: 24px; }
    .wf-mobile-bar { display: flex; }
    .wf-hero-ui { width: 78%; }
    .wf-inline-ui { width: 90%; }
  }
  @media (max-width: 480px) {
    .wf-main { padding: 24px 16px 80px; }
    .wf-title { font-size: 26px; line-height: 34px; }
    .wf-avatar { width: 38px; height: 38px; font-size: 15px; }
    .wf-hero-ui { width: 88%; }
  }
`

function ClapIcon({ active }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={active ? "#fff" : "currentColor"}>
      <path fillRule="evenodd" d="M5.25 12.75A6.75 6.75 0 0112 6a6.75 6.75 0 016.75 6.75A6.75 6.75 0 0112 19.5a6.75 6.75 0 01-6.75-6.75zm6.75-5.25a5.25 5.25 0 100 10.5 5.25 5.25 0 000-10.5z" clipRule="evenodd" />
    </svg>
  )
}
function ShareIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"/></svg>
}
function BookmarkIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"/></svg>
}
function MoreIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M4.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clipRule="evenodd"/></svg>
}

function HeroUI() {
  return (
    <div className="wf-hero-ui">
      <div className="wf-hero-titlebar">
        <div className="wf-hero-dot" style={{background:"#ff5f57"}}/>
        <div className="wf-hero-dot" style={{background:"#febc2e"}}/>
        <div className="wf-hero-dot" style={{background:"#28c840"}}/>
        <span className="wf-hero-label">Schedule Story · WriteFlow</span>
      </div>
      <div className="wf-hero-body">
        <div className="wf-hero-row"><span>The Art of Saying Less</span><span className="wf-badge wf-badge-green">Scheduled</span></div>
        <div className="wf-hero-row"><span>How I Built a SaaS in 30 Days</span><span className="wf-badge wf-badge-dark">May 14 · 9:00 AM</span></div>
        <div className="wf-hero-row"><span>Why Generalism is a Superpower</span><span className="wf-badge wf-badge-grey">Draft</span></div>
        <div className="wf-hero-row"><span>Learning in Public</span><span className="wf-badge wf-badge-grey">Draft</span></div>
      </div>
    </div>
  )
}

function InlineUI() {
  return (
    <div className="wf-inline-ui">
      <div className="wf-inline-header">Your Stories · Scheduled</div>
      <div className="wf-inline-row"><span className="wf-inline-row-name">The Art of Saying Less</span><span className="wf-schedule-pill set">May 13 · 8:00 AM ✓</span></div>
      <div className="wf-inline-row"><span className="wf-inline-row-name">How I Built a SaaS in 30 Days</span><span className="wf-schedule-pill set">May 14 · 9:00 AM ✓</span></div>
      <div className="wf-inline-row"><span className="wf-inline-row-name">Why Generalism is a Superpower</span><span className="wf-schedule-pill">Schedule →</span></div>
    </div>
  )
}

const recommendations = [
  { title: "Introducing Collections: Organize Your Writing by Theme", date: "Apr 28", read: "4 min read" },
  { title: "New: Reader Insights Show You When Your Audience Is Most Active", date: "Apr 15", read: "3 min read" },
  { title: "How WriteFlow's Recommendation Engine Works", date: "Mar 30", read: "6 min read" },
  { title: "We Updated Our Earnings Program for Writers", date: "Mar 12", read: "5 min read" },
]

export default function BlogPage() {
  const [clapped, setClapped] = useState(false)
  const [clapCount, setClapCount] = useState(47)

  const handleClap = () => {
    setClapped(c => !c)
    setClapCount(c => clapped ? c - 1 : c + 1)
  }

  useEffect(() => {
    const styleEl = document.createElement("style")
    styleEl.textContent = styles
    document.head.appendChild(styleEl)
    return () => document.head.removeChild(styleEl)
  }, [])

  const ClapButton = ({ size = "normal" }) => (
    <button className="wf-icon-btn" onClick={handleClap} style={{gap: size === "mobile" ? 8 : 6}}>
      <span className={`wf-clap-ring ${clapped ? "active" : ""}`}>
        <ClapIcon active={clapped} />
      </span>
      <span style={{fontFamily:"var(--sans)", fontSize: 14, color: clapped ? "#000" : "var(--text-secondary)"}}>
        {clapCount}
      </span>
    </button>
  )

  return (
    <div className="wf-wrap">
      <div className="wf-page">
        <main className="wf-main">

          <h1 className="wf-title">Writers, You Can Now Schedule Stories on WriteFlow</h1>
          <h2 className="wf-subtitle">A smarter way to plan and publish your writing — on your terms</h2>

          <div className="wf-byline">
            <div className="wf-avatar">W</div>
            <div>
              <div className="wf-byline-author">WriteFlow Staff</div>
              <div className="wf-byline-details">5 min read · May 12, 2026</div>
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

          <div className="wf-hero"><HeroUI /></div>
          <p className="wf-caption"><em>All images by the WriteFlow Design team</em></p>

          {/* ── AD 1 — after hero image ── */}
          <div style={{ margin: '0 0 40px', display: 'flex', justifyContent: 'center' }}>
            <AdBanner slot="square" />
          </div>

          <div className="wf-body">
            <p>For writers juggling multiple drafts, ideas at different stages of readiness, and audiences spread across time zones, publishing on WriteFlow can feel like a balancing act. You know when a piece is ready — but finding the right moment to hit publish is a different challenge entirely. We want to make that easier.</p>
            <p>Starting today, all WriteFlow writers can schedule stories to publish automatically at a date and time of their choosing. Whether you want your piece to land on Monday morning when readers are fresh, or Friday afternoon when they have time to dig in, you're now in control.</p>

            <blockquote><p>This feature is rolling out on May 12, 2026. If you don't see it on your dashboard yet, check back in a few days!</p></blockquote>

            <h2>How to schedule a story</h2>
            <p>When you're ready to schedule a story, open the publish panel from the editor and select "Schedule for later" instead of "Publish now." You'll see a simple date and time picker — choose your preferred moment and confirm. That's it.</p>
            <p>You can edit or cancel a scheduled story at any time before it goes live. Head to your Stories dashboard, find any piece with a "Scheduled" label, and click to adjust. Nothing is locked in until it publishes.</p>

            <div className="wf-inline-img"><InlineUI /></div>
            <p className="wf-caption"><em>The scheduling panel in your WriteFlow Stories dashboard</em></p>

            {/* ── AD 2 — mid article ── */}
            <div style={{ margin: '0 0 40px', display: 'flex', justifyContent: 'center' }}>
              <AdBanner slot="horizontal" />
            </div>

            <blockquote><p>What's the difference between <strong>publishing</strong> and <strong>scheduling</strong>? Publishing sends your story live immediately. Scheduling queues it for a future date — your story won't be visible to readers until that moment arrives.</p></blockquote>

            <p>Scheduled stories are only visible to you until they go live. Your followers and readers won't see them, receive notifications, or find them via search until the scheduled time has passed.</p>
            <p>Finally: scheduling is entirely optional. If you prefer to publish spontaneously — or have already built a workflow that works for you — nothing changes. The "Publish now" button is still right there.</p>
            <p>Read more about story scheduling in the <a href="#">WriteFlow help center</a>.</p>

            <h2>What's next?</h2>
            <p>WriteFlow's writers are the reason this platform exists. While we can't write the stories for you, we can build better tools so you can spend less time managing logistics and more time doing the work you love.</p>
            <p>This update also lays the groundwork for bigger publishing workflow improvements coming soon. Stay tuned for even more ways we hope to support your writing practice on WriteFlow.</p>
          </div>

          <div className="wf-tags">
            {["WriteFlow","Product Updates","Writing","Content Creation","Productivity"].map(t => (
              <span key={t} className="wf-tag">{t}</span>
            ))}
          </div>

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
              <div className="wf-card-label">Published in</div>
              <div className="wf-card-inner">
                <div className="wf-card-avatar square" style={{fontSize:18,borderRadius:6}}>W</div>
                <div>
                  <div className="wf-card-name">The WriteFlow Blog</div>
                  <div className="wf-card-followers">2.1M followers</div>
                  <div className="wf-card-bio">The official source of news and updates from WriteFlow.</div>
                  <button className="wf-follow-link">Follow</button>
                </div>
              </div>
            </div>
            <div>
              <div className="wf-card-label">Written by</div>
              <div className="wf-card-inner">
                <div className="wf-card-avatar">W</div>
                <div>
                  <div className="wf-card-name">WriteFlow Staff</div>
                  <div className="wf-card-followers">88M followers · 142 following</div>
                  <div className="wf-card-bio">Official account for news and updates from WriteFlow.</div>
                  <button className="wf-follow-link">Follow</button>
                </div>
              </div>
            </div>
          </div>

        </main>

        {/* SIDEBAR */}
        <aside className="wf-sidebar">
          <div className="wf-sb-author">
            <div className="wf-sb-avatar">W</div>
            <span className="wf-sb-author-name">WriteFlow Staff</span>
            <button className="wf-sb-follow">Follow</button>
          </div>
          <p className="wf-sb-bio">Official account for news and updates from WriteFlow. Building better tools for writers, one feature at a time.</p>

          {/* ── AD 3 — top of sidebar ── */}
          <hr className="wf-sb-divider" />
          <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'center' }}>
            <AdBanner slot="sidebar" />
          </div>

          <hr className="wf-sb-divider" />
          <div className="wf-sb-section-title">More from The WriteFlow Blog</div>
          {recommendations.map((rec, i) => (
            <div key={i} className="wf-sb-rec">
              <div className="wf-sb-rec-pub"><span className="wf-sb-rec-dot">W</span> WriteFlow Staff</div>
              <div className="wf-sb-rec-title">{rec.title}</div>
              <div className="wf-sb-rec-meta">{rec.date} · {rec.read}</div>
            </div>
          ))}
          <hr className="wf-sb-divider" />
          <button className="wf-sb-more">See all from The WriteFlow Blog →</button>
        </aside>
      </div>

      {/* MOBILE BOTTOM BAR */}
      <div className="wf-mobile-bar">
        <ClapButton size="mobile" />
        <div style={{display:"flex", alignItems:"center", gap: 20}}>
          <button className="wf-icon-btn"><ShareIcon /></button>
          <button className="wf-icon-btn"><BookmarkIcon /></button>
          <button className="wf-icon-btn"><MoreIcon /></button>
        </div>
      </div>
    </div>
  )
}