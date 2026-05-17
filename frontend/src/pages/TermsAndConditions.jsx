import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const fontLink = document.createElement('link')
fontLink.rel = 'stylesheet'
fontLink.href = 'https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap'
if (!document.head.querySelector('link[href*="Source+Serif"]')) document.head.appendChild(fontLink)

const SECTIONS = [
  {
    title: '1. Acceptance of Terms',
    body: `By accessing or using WriteFlow (the "Service"), you confirm that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use the Service. These terms apply to all visitors, registered users, contributors, and others who access the platform.`
  },
  {
    title: '2. Use of the Service',
    body: `WriteFlow grants you a limited, non-exclusive, non-transferable, revocable licence to use the Service for personal, non-commercial purposes in accordance with these Terms. You agree not to use the Service to publish content that is unlawful, defamatory, harassing, abusive, fraudulent, or otherwise objectionable. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.`
  },
  {
    title: '3. User Content',
    body: `You retain ownership of any content you publish on WriteFlow. By submitting content, you grant WriteFlow a worldwide, royalty-free, non-exclusive licence to host, display, distribute, and reproduce your content solely for the purpose of operating and improving the Service. You represent and warrant that you have the right to grant this licence and that your content does not infringe the rights of any third party.`
  },
  {
    title: '4. Prohibited Conduct',
    body: `You may not: (a) use the Service for any unlawful purpose or in violation of any applicable law; (b) attempt to gain unauthorised access to any part of the Service or its infrastructure; (c) scrape, harvest, or collect data from the Service without prior written consent; (d) impersonate any person or entity; (e) distribute spam, malware, or other harmful content; or (f) interfere with or disrupt the integrity or performance of the Service.`
  },
  {
    title: '5. Intellectual Property',
    body: `The WriteFlow name, logo, design, and all associated intellectual property are owned by WriteFlow and protected under applicable intellectual property laws. Nothing in these Terms grants you any right to use our trademarks, logos, or other proprietary materials without our prior written permission.`
  },
  {
    title: '6. Third-Party Links',
    body: `The Service may contain links to third-party websites or services. These links are provided for your convenience only. WriteFlow does not endorse, control, or accept responsibility for the content or practices of any third-party sites. We encourage you to review the terms and privacy policies of any third-party sites you visit.`
  },
  {
    title: '7. Disclaimer of Warranties',
    body: `The Service is provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. WriteFlow does not warrant that the Service will be uninterrupted, error-free, or free of viruses or other harmful components. Your use of the Service is at your sole risk.`
  },
  {
    title: '8. Limitation of Liability',
    body: `To the fullest extent permitted by law, WriteFlow and its officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use the Service, even if WriteFlow has been advised of the possibility of such damages.`
  },
  {
    title: '9. Termination',
    body: `WriteFlow reserves the right to suspend or terminate your account and access to the Service at any time, with or without notice, for conduct that we believe violates these Terms or is harmful to other users, third parties, or the Service. Upon termination, your right to use the Service will immediately cease.`
  },
  {
    title: '10. Changes to These Terms',
    body: `We reserve the right to modify these Terms at any time. We will notify registered users of material changes by posting a notice on the Service or sending an email to the address associated with your account. Your continued use of the Service after any changes constitutes your acceptance of the updated Terms.`
  },
  {
    title: '11. Governing Law',
    body: `These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which WriteFlow operates, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts of that jurisdiction.`
  },
  {
    title: '12. Contact Us',
    body: `If you have any questions, concerns, or feedback regarding these Terms and Conditions, please contact us at: legal@writeflow.com. We aim to respond to all enquiries within 5 business days.`
  },
]

export default function TermsAndConditions() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div style={{ background: '#f7f4ed', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>

      {/* Sub-nav breadcrumb — no logo */}
      <div style={{
        borderBottom: '1px solid #d4c9b0', padding: '12px 40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: '#f7f4ed'
      }}>
        
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <Link to="/privacy" style={{ fontSize: 13, color: '#7a6f5e', textDecoration: 'none' }}>
            Privacy Policy
          </Link>
          <Link to="/" style={{ fontSize: 13, color: '#1a1a1a', textDecoration: 'none', fontWeight: 500 }}>
            ← Back to home
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div style={{
        borderBottom: '1px solid #d4c9b0', padding: '64px 40px 48px',
        background: '#fff'
      }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>

          {/* Quote instead of "LEGAL" label */}
          <div style={{
            fontSize: 15, fontStyle: 'italic', color: '#7a6f5e',
            marginBottom: 20, lineHeight: '24px'
          }}>
            "Clear terms build trust. We've written ours to be read, not just accepted."
          </div>

          <h1 style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontSize: 48, fontWeight: 700, color: '#1a1a1a',
            lineHeight: '56px', letterSpacing: '-1px', marginBottom: 20
          }}>Terms &amp; Conditions</h1>

          <p style={{ fontSize: 16, color: '#7a6f5e', lineHeight: '26px', maxWidth: 580 }}>
            Please read these terms carefully before using WriteFlow. By accessing our platform, you agree to be bound by the following terms and conditions.
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

      {/* Content */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '60px 40px 80px' }}>

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
              <a key={i} href={`#section-${i}`} style={{
                display: 'block', fontSize: 13, color: '#7a6f5e',
                textDecoration: 'none', marginBottom: 8, lineHeight: '18px'
              }}
                onMouseEnter={e => e.target.style.color = '#1a1a1a'}
                onMouseLeave={e => e.target.style.color = '#7a6f5e'}
              >
                {s.title}
              </a>
            ))}
          </div>
        </div>

        {/* Sections */}
        {SECTIONS.map((section, i) => (
          <div key={i} id={`section-${i}`} style={{
            marginBottom: 48, paddingBottom: 48,
            borderBottom: i < SECTIONS.length - 1 ? '1px solid #ede8df' : 'none'
          }}>
            <h2 style={{
              fontFamily: "'Source Serif 4', Georgia, serif",
              fontSize: 22, fontWeight: 700, color: '#1a1a1a',
              marginBottom: 16, letterSpacing: '-0.2px'
            }}>{section.title}</h2>
            <p style={{ fontSize: 16, color: '#3a3530', lineHeight: '28px' }}>
              {section.body}
            </p>
          </div>
        ))}

        {/* Footer note */}
        <div style={{
          background: '#fff', border: '1px solid #d4c9b0', borderRadius: 8,
          padding: '24px 28px', marginTop: 16
        }}>
          <p style={{ fontSize: 14, color: '#7a6f5e', lineHeight: '22px' }}>
            These Terms and Conditions were last updated on{' '}
            <strong style={{ color: '#1a1a1a' }}>15 May 2026</strong>.
            For questions, contact us at{' '}
            <a href="mailto:legal@writeflow.com" style={{ color: '#1a1a1a', fontWeight: 500 }}>
              legal@writeflow.com
            </a>.
          </p>
          <div style={{ marginTop: 16, display: 'flex', gap: 16 }}>
            <Link to="/privacy" style={{
              fontSize: 14, color: '#1a1a1a', fontWeight: 500, textDecoration: 'underline'
            }}>Privacy Policy →</Link>
            <Link to="/" style={{ fontSize: 14, color: '#7a6f5e', textDecoration: 'none' }}>
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}