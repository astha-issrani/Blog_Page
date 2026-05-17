import { useState } from 'react'

// Curated placeholder ad creatives using picsum + unsplash for aesthetic variety
const ADS = {
  horizontal: [
    {
      img: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=900&q=80',
      label: 'SPONSORED',
      headline: 'Think deeper. Write better.',
      sub: 'Notion AI — your thinking partner',
      cta: 'Try free',
      accent: '#1a1a1a',
    },
    {
      img: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=900&q=80',
      label: 'SPONSORED',
      headline: 'Your words deserve a home.',
      sub: 'Ghost — the platform for serious writers',
      cta: 'Learn more',
      accent: '#15171A',
    },
  ],
  sidebar: [
    {
      img: 'https://images.unsplash.com/photo-1495465798138-718f86d1a4bc?w=600&q=80',
      label: 'SPONSORED',
      headline: 'Read more.\nDiscover more.',
      sub: 'Readwise — resurface what matters',
      cta: 'Get started',
      accent: '#2563eb',
    },
    {
      img: 'https://images.unsplash.com/photo-1519682577862-22b62b24cb12?w=600&q=80',
      label: 'SPONSORED',
      headline: 'Write every day.',
      sub: 'iA Writer — distraction-free focus',
      cta: 'Try it',
      accent: '#000',
    },
  ],
  square: [
    {
      img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80',
      label: 'SPONSORED',
      headline: 'Ideas worth spreading.',
      sub: 'TED Membership — unlimited access',
      cta: 'Join today',
      accent: '#e62b1e',
    },
  ],
}

const styles = {
  horizontal: {
    wrapper: {
      position: 'relative',
      width: '100%',
      maxWidth: 728,
      height: 90,
      borderRadius: 6,
      overflow: 'hidden',
      display: 'flex',
      border: '1px solid #e0dbd0',
      background: '#f7f4ed',
      cursor: 'pointer',
      transition: 'box-shadow 0.2s',
      fontFamily: "'DM Sans', sans-serif",
    },
    img: {
      width: 120,
      height: '100%',
      objectFit: 'cover',
      flexShrink: 0,
    },
    body: {
      flex: 1,
      padding: '10px 16px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 2,
      minWidth: 0,
    },
    label: {
      fontSize: 9,
      letterSpacing: '0.12em',
      color: '#a09880',
      fontWeight: 600,
      textTransform: 'uppercase',
    },
    headline: {
      fontSize: 15,
      fontWeight: 700,
      color: '#1a1a1a',
      lineHeight: 1.2,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    sub: {
      fontSize: 12,
      color: '#7a6f5e',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    cta: {
      alignSelf: 'center',
      flexShrink: 0,
      margin: '0 16px 0 8px',
      fontSize: 12,
      fontWeight: 600,
      padding: '7px 16px',
      borderRadius: 100,
      border: '1.5px solid #1a1a1a',
      background: 'transparent',
      color: '#1a1a1a',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      transition: 'background 0.15s, color 0.15s',
    },
  },

  sidebar: {
    wrapper: {
      position: 'relative',
      width: '100%',
      maxWidth: 240,
      borderRadius: 8,
      overflow: 'hidden',
      border: '1px solid #e0dbd0',
      background: '#f7f4ed',
      cursor: 'pointer',
      fontFamily: "'DM Sans', sans-serif",
    },
    img: {
      width: '100%',
      height: 130,
      objectFit: 'cover',
      display: 'block',
    },
    body: {
      padding: '12px 14px 14px',
    },
    label: {
      fontSize: 9,
      letterSpacing: '0.12em',
      color: '#a09880',
      fontWeight: 600,
      textTransform: 'uppercase',
      marginBottom: 6,
    },
    headline: {
      fontSize: 14,
      fontWeight: 700,
      color: '#1a1a1a',
      lineHeight: 1.3,
      marginBottom: 4,
      whiteSpace: 'pre-line',
    },
    sub: {
      fontSize: 12,
      color: '#7a6f5e',
      marginBottom: 10,
      lineHeight: 1.4,
    },
    cta: {
      display: 'inline-block',
      fontSize: 12,
      fontWeight: 600,
      padding: '6px 14px',
      borderRadius: 100,
      border: '1.5px solid #1a1a1a',
      background: 'transparent',
      color: '#1a1a1a',
      cursor: 'pointer',
      transition: 'background 0.15s, color 0.15s',
    },
  },

  square: {
    wrapper: {
      position: 'relative',
      width: '100%',
      maxWidth: 336,
      borderRadius: 8,
      overflow: 'hidden',
      border: '1px solid #e0dbd0',
      background: '#f7f4ed',
      cursor: 'pointer',
      fontFamily: "'DM Sans', sans-serif",
    },
    img: {
      width: '100%',
      height: 160,
      objectFit: 'cover',
      display: 'block',
    },
    body: {
      padding: '14px 16px 16px',
    },
    label: {
      fontSize: 9,
      letterSpacing: '0.12em',
      color: '#a09880',
      fontWeight: 600,
      textTransform: 'uppercase',
      marginBottom: 6,
    },
    headline: {
      fontSize: 17,
      fontWeight: 700,
      color: '#1a1a1a',
      lineHeight: 1.25,
      marginBottom: 5,
    },
    sub: {
      fontSize: 13,
      color: '#7a6f5e',
      marginBottom: 12,
    },
    cta: {
      display: 'inline-block',
      fontSize: 13,
      fontWeight: 600,
      padding: '8px 18px',
      borderRadius: 100,
      border: '1.5px solid #1a1a1a',
      background: 'transparent',
      color: '#1a1a1a',
      cursor: 'pointer',
      transition: 'background 0.15s, color 0.15s',
    },
  },
}

export default function AdBanner({ slot = 'horizontal' }) {
  const pool = ADS[slot] || ADS.horizontal
  const [ad] = useState(() => pool[Math.floor(Math.random() * pool.length)])
  const [hovered, setHovered] = useState(false)
  const s = styles[slot] || styles.horizontal

  if (slot === 'horizontal') {
    return (
      <div
        style={{ ...s.wrapper, boxShadow: hovered ? '0 4px 20px rgba(0,0,0,0.10)' : 'none' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img src={ad.img} alt="" style={s.img} />
        <div style={s.body}>
          <span style={s.label}>{ad.label}</span>
          <span style={s.headline}>{ad.headline}</span>
          <span style={s.sub}>{ad.sub}</span>
        </div>
        <button
          style={{
            ...s.cta,
            background: hovered ? '#1a1a1a' : 'transparent',
            color: hovered ? '#f7f4ed' : '#1a1a1a',
          }}
        >
          {ad.cta}
        </button>
      </div>
    )
  }

  // sidebar & square share the same stacked layout
  return (
    <div
      style={{
        ...s.wrapper,
        boxShadow: hovered ? '0 4px 20px rgba(0,0,0,0.10)' : 'none',
        transition: 'box-shadow 0.2s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={ad.img} alt="" style={s.img} />
      <div style={s.body}>
        <div style={s.label}>{ad.label}</div>
        <div style={s.headline}>{ad.headline}</div>
        <div style={s.sub}>{ad.sub}</div>
        <button
          style={{
            ...s.cta,
            background: hovered ? '#1a1a1a' : 'transparent',
            color: hovered ? '#f7f4ed' : '#1a1a1a',
          }}
        >
          {ad.cta}
        </button>
      </div>
    </div>
  )
}