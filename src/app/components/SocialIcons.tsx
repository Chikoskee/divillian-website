export default function SocialIcons() {
  return (
    <div className="social-icons">
      <a href="#" aria-label="Instagram" className="social-icon">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      </a>
      <a href="#" aria-label="Facebook" className="social-icon">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
          <path d="M13.5 21v-7.5H16l.5-3.2h-3V8.2c0-.9.3-1.5 1.6-1.5H16.5V3.8C16.2 3.8 15.2 3.7 14 3.7c-2.4 0-4 1.5-4 4.2v2.4H7.5v3.2H10V21h3.5Z" />
        </svg>
      </a>
      <a href="#" aria-label="YouTube" className="social-icon">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <rect x="2.5" y="6" width="19" height="12" rx="3" />
          <path d="M10.5 9.8v4.4l4-2.2-4-2.2Z" fill="currentColor" stroke="none" />
        </svg>
      </a>
      <a href="#" aria-label="TikTok" className="social-icon">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
          <path d="M16.5 3c.3 2 1.7 3.5 3.7 3.8v2.9c-1.4 0-2.7-.4-3.7-1.2v6.3a5.1 5.1 0 1 1-5.1-5.1c.2 0 .4 0 .6.1v2.9a2.2 2.2 0 1 0 1.6 2.1V3h2.9Z" />
        </svg>
      </a>
    </div>
  )
}
