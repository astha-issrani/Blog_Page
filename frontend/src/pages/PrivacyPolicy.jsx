import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const fontLink = document.createElement('link')
fontLink.rel = 'stylesheet'
fontLink.href = 'https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap'
if (!document.head.querySelector('link[href*="Source+Serif"]')) document.head.appendChild(fontLink)

const SECTIONS = [
  {
    title: '1. Information We Collect',
    body: `We collect information you provide directly to us when you create an account, publish content, or contact us. This includes your name, email address, and password. We also automatically collect certain technical information when you use the Service, including your IP address, browser type, operating system, pages visited, and the date and time of your visits. We may also collect cookies and similar tracking technologies to improve your experience.`
  },
  {
    title: '2. How We Use Your Information',
    body: `We use the information we collect to: operate, maintain, and improve the Service; create and manage your account; send you transactional emails such as account confirmations and password resets; respond to your comments and questions; monitor and analyse usage patterns to improve the platform; detect, investigate, and prevent fraudulent or unauthorised activity; and comply with legal obligations.`
  },
  {
    title: '3. How We Share Your Information',
    body: `We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating the platform, provided they agree to keep your information confidential. We may also disclose your information if required by law, to enforce our Terms and Conditions, or to protect the rights, property, or safety of WriteFlow, our users, or others. Your publicly published content — including your name and stories — is visible to all visitors of the Service.`
  },
  {
    title: '4. Cookies and Tracking',
    body: `We use cookies and similar technologies to maintain your session, remember your preferences, and understand how you use the Service. You can control cookie settings through your browser, but disabling cookies may affect certain features of the platform. We do not use cookies to serve third-party advertisements. We may use analytics tools to understand aggregate usage patterns, which collect anonymised data only.`
  },
  {
    title: '5. Data Retention',
    body: `We retain your personal information for as long as your account is active or as needed to provide the Service. If you delete your account, we will delete or anonymise your personal data within 30 days, except where we are required to retain it for legal, regulatory, or legitimate business purposes. Content you have published may remain on the platform in anonymised form unless you request its removal.`
  },
  {
    title: '6. Data Security',
    body: `We take the security of your personal information seriously and implement appropriate technical and organisational measures to protect it against unauthorised access, alteration, disclosure, or destruction. These measures include encrypted password storage, HTTPS encryption in transit, and rate-limited authentication endpoints. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.`
  },
  {
    title: '7. Your Rights',
    body: `Depending on your location, you may have certain rights regarding your personal information, including: the right to access the personal data we hold about you; the right to correct inaccurate or incomplete data; the right to request deletion of your data; the right to object to or restrict certain processing; and the right to data portability. To exercise any of these rights, please contact us at privacy@writeflow.com. We will respond to all requests within 30 days.`
  },
  {
    title: "8. Children's Privacy",
    body: `The Service is not directed at children under the age of 13. We do not knowingly collect personal information from children under 13. If you become aware that a child under 13 has provided us with personal information, please contact us immediately at privacy@writeflow.com. If we learn we have collected such information, we will take steps to delete it promptly.`
  },
  {
    title: '9. Third-Party Services',
    body: `The Service may contain links to third-party websites, plugins, and services. We are not responsible for the privacy practices of those third parties. We encourage you to read the privacy policies of any third-party services you interact with. This Privacy Policy applies solely to information collected through WriteFlow.`
  },
  {
    title: '10. International Data Transfers',
    body: `Your information may be transferred to and processed in countries other than the country in which you reside. These countries may have data protection laws that differ from those in your country. Where required, we take appropriate safeguards to ensure your personal data remains protected in accordance with this Privacy Policy and applicable data protection laws.`
  },
  {
    title: '11. Changes to This Policy',
    body: `We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. When we make material changes, we will notify you by posting a notice on the Service or sending an email to your registered address. We encourage you to review this Policy periodically. Your continued use of the Service after changes are posted constitutes acceptance of the updated Policy.`
  },
  {
    title: '12. Contact Us',
    body: `If you have any questions, concerns, or requests regarding this Privacy Policy or the way we handle your personal data, please contact us at: privacy@writeflow.com. You may also write to us at our registered address. We are committed to working with you to resolve any concerns about your privacy.`
  },
]

const HIGHLIGHTS = [
  { icon: '🔒', label: 'We never sell your data', desc: 'Your personal information is never sold or traded to advertisers or data brokers.' },
  { icon: '✉️', label: 'No spam', desc: 'We only send emails that are necessary for your account or that you explicitly opt into.' },
  { icon: '🗑️', label: 'Delete anytime', desc: 'You can request deletion of your account and data at any time.' },
  { icon: '🍪', label: 'No ad tracking', desc: 'We do not use cookies to serve personalised advertisements.' },
]

export default function PrivacyPolicy() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div style={{ background: '#f7f4ed', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>

      {/* Sub-nav bar — just breadcrumb links, no logo */}
      <div style={{
        borderBottom: '1px solid #d4c9b0', padding: '12px 40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: '#f7f4ed'
      }}>
        
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <Link to="/terms" style={{ fontSize: 13, color: '#7a6f5e', textDecoration: 'none' }}>
            Terms &amp; Conditions
          </Link>
          <Link to="/" style={{ fontSize: 13, color: '#1a1a1a', textDecoration: 'none', fontWeight: 500 }}>
            ← Back to home
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div style={{ borderBottom: '1px solid #d4c9b0', padding: '64px 40px 48px', background: '#fff' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{
  fontSize: 15, fontStyle: 'italic', color: '#7a6f5e',
  marginBottom: 16, lineHeight: '24px'
}}>
  "Your privacy is not a feature — it's a right."
</div>
          <h1 style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontSize: 48, fontWeight: 700, color: '#1a1a1a',
            lineHeight: '56px', letterSpacing: '-1px', marginBottom: 20
          }}>Privacy Policy</h1>
          <p style={{ fontSize: 16, color: '#7a6f5e', lineHeight: '26px', maxWidth: 580 }}>
            Your privacy matters to us. This policy explains what data we collect, how we use it, and the choices you have.
          </p>
          <div style={{ marginTop: 24, display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 13, color: '#7a6f5e' }}>
              <strong style={{ color: '#1a1a1a' }}>Effective date:</strong> 15 May 2026
            </span>
            <span style={{ fontSize: 13, color: '#7a6f5e' }}>
              <strong style={{ color: '#1a1a1a' }}>Last updated:</strong> 15 May 2026
            </span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '60px 40px 80px' }}>

        {/* At a glance */}
        <div style={{ marginBottom: 56 }}>
          <h2 style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontSize: 20, fontWeight: 700, color: '#1a1a1a', marginBottom: 20
          }}>At a glance</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16 }}>
            {HIGHLIGHTS.map((h, i) => (
              <div key={i} style={{
                background: '#fff', border: '1px solid #d4c9b0', borderRadius: 8,
                padding: '20px 24px', display: 'flex', gap: 14, alignItems: 'flex-start'
              }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{h.icon}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a', marginBottom: 4 }}>{h.label}</div>
                  <div style={{ fontSize: 13, color: '#7a6f5e', lineHeight: '20px' }}>{h.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Table of contents */}
        <div style={{
          background: '#fff', border: '1px solid #d4c9b0', borderRadius: 8,
          padding: '28px 32px', marginBottom: 56
        }}>
          <div style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontSize: 16, fontWeight: 700, color: '#1a1a1a', marginBottom: 16
          }}>Table of Contents</div>
          <div style={{ columns: 2, columnGap: 32 }}>
            {SECTIONS.map((s, i) => (
              <a key={i} href={`#priv-${i}`} style={{
                display: 'block', fontSize: 13, color: '#7a6f5e',
                textDecoration: 'none', marginBottom: 8, lineHeight: '18px'
              }}
                onMouseEnter={e => e.target.style.color = '#1a1a1a'}
                onMouseLeave={e => e.target.style.color = '#7a6f5e'}
              >{s.title}</a>
            ))}
          </div>
        </div>

        {/* Sections */}
        {SECTIONS.map((section, i) => (
          <div key={i} id={`priv-${i}`} style={{
            marginBottom: 48, paddingBottom: 48,
            borderBottom: i < SECTIONS.length - 1 ? '1px solid #ede8df' : 'none'
          }}>
            <h2 style={{
              fontFamily: "'Source Serif 4', Georgia, serif",
              fontSize: 22, fontWeight: 700, color: '#1a1a1a',
              marginBottom: 16, letterSpacing: '-0.2px'
            }}>{section.title}</h2>
            <p style={{ fontSize: 16, color: '#3a3530', lineHeight: '28px' }}>{section.body}</p>
          </div>
        ))}

        {/* Footer note */}
        <div style={{
          background: '#fff', border: '1px solid #d4c9b0', borderRadius: 8,
          padding: '24px 28px', marginTop: 16
        }}>
          <p style={{ fontSize: 14, color: '#7a6f5e', lineHeight: '22px' }}>
            This Privacy Policy was last updated on <strong style={{ color: '#1a1a1a' }}>15 May 2026</strong>.
            For privacy-related questions, contact us at{' '}
            <a href="mailto:privacy@writeflow.com" style={{ color: '#1a1a1a', fontWeight: 500 }}>
              privacy@writeflow.com
            </a>.
          </p>
          <div style={{ marginTop: 16, display: 'flex', gap: 16 }}>
            <Link to="/terms" style={{ fontSize: 14, color: '#1a1a1a', fontWeight: 500, textDecoration: 'underline' }}>
              Terms &amp; Conditions →
            </Link>
            <Link to="/" style={{ fontSize: 14, color: '#7a6f5e', textDecoration: 'none' }}>Back to home</Link>
          </div>
        </div>
      </div>
    </div>
  )
}