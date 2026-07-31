import React from 'react';
import './landing1.css';

export default function ThankYouPage() {
  return (
    <div className="landing1-page-root" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header className="nav scrolled">
        <div className="nav-inner">
          <div className="nav-logo-wrap">
            <a href="/">
              <img src="/images/logo/LOGO Dark theme .webp" alt="Mingrow" className="nav-logo" />
            </a>
          </div>
          <div className="nav-center-brewing">
            <span className="brewing-text">Something is Brewing...</span>
            <span className="yellow-dot"></span>
          </div>
        </div>
      </header>

      <main style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '90px 20px 40px' }}>
        <div style={{ width: '100%', maxWidth: '1050px', margin: '0 auto', textAlign: 'center' }}>
          <a 
            href="https://whatsapp.com/channel/0029Va6DqhaH5JLwvPx90k39" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ display: 'block', textDecoration: 'none', cursor: 'pointer' }}
          >
            <picture style={{ display: 'block', width: '100%' }}>
              <source media="(max-width: 980px)" srcSet="/images/landing/mobile%20thankyou.webp" />
              <img 
                src="/images/landing/thankyou.webp" 
                alt="Thank You - Join the Community" 
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }} 
              />
            </picture>
          </a>
        </div>
      </main>

      <footer>
        <div className="wrap">
          <div className="footer-inner">
            <img src="/images/logo/LOGO Dark theme .webp" alt="Mingrow" className="footer-logo" />
            <p>© 2026 Mingrow. Something is brewing.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
