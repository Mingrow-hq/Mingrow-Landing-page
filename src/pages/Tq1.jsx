import React, { useEffect } from 'react';
import './tq1.css';

export default function Tq1Page() {
  useEffect(() => {
    // Inject Google Tag Manager (GTM-KR8S653H) in <head>
    if (!document.getElementById('gtm-kr8s653h')) {
      const gtmScript = document.createElement('script');
      gtmScript.id = 'gtm-kr8s653h';
      gtmScript.text = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KR8S653H');`;
      document.head.appendChild(gtmScript);
    }

    // Inject Google Tag Manager (noscript) in <body>
    if (!document.getElementById('gtm-noscript-kr8s653h')) {
      const gtmNoscript = document.createElement('noscript');
      gtmNoscript.id = 'gtm-noscript-kr8s653h';
      gtmNoscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KR8S653H" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
      document.body.appendChild(gtmNoscript);
    }
  }, []);

  return (
    <div className="tq1-page-root">
      {/* Background glow effects */}
      <div className="tq1-bg-glow tq1-bg-purple"></div>
      <div className="tq1-bg-glow tq1-bg-green"></div>

      {/* Header / Nav */}
      <header className="tq1-header">
        <div className="tq1-header-inner">
          <a href="/" className="tq1-logo-link">
            <img src="/images/logo/LOGO Dark theme .webp" alt="Mingrow" className="tq1-logo" />
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="tq1-main">
        {/* Top Hero Banner Image */}
        <div className="tq1-hero-banner-wrap">
          <picture className="tq1-hero-banner-picture">
            <source media="(max-width: 768px)" srcSet="/images/landing1/thankyou%20mobile.webp" />
            <img
              src="/images/landing1/thanku 1.webp"
              alt="AI Employees Team"
              className="tq1-hero-banner-img"
            />
          </picture>
        </div>

        {/* Thank You Title & Subtitle */}
        <div className="tq1-header-section">
          <h1 className="tq1-title">THANK YOU</h1>
          <div className="tq1-title-divider">
            <span className="tq1-star-icon">✦</span>
          </div>
          <p className="tq1-subtitle-heading">We're excited to have you on board.</p>
          <p className="tq1-subtitle-text">
            Our AI Employees are ready to work together and take your business to new heights.
          </p>
        </div>

        {/* Action Cards Container */}
        <div className="tq1-cards-grid">
          {/* Card 1: Watch Demo Video */}
          <div className="tq1-card tq1-card-purple">
            <div className="tq1-card-content">
              <div className="tq1-play-button-wrap">
                <button
                  className="tq1-play-btn"
                  aria-label="Play Demo Video"
                  onClick={() => {
                    const el = document.getElementById('demo-video-modal');
                    if (el) el.style.display = 'flex';
                  }}
                >
                  <svg className="tq1-play-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>

              <div className="tq1-card-text-wrap">
                <h3 className="tq1-card-title">Watch Demo Video</h3>
                <p className="tq1-card-desc">
                  See how our AI Employees work together to grow your business.
                </p>
              </div>
            </div>
            <div className="tq1-card-accent-bar tq1-accent-purple"></div>
          </div>

          {/* Card 2: Join WhatsApp Group */}
          <div className="tq1-card tq1-card-green">
            <div className="tq1-card-content">
              <div className="tq1-whatsapp-logo-wrap">
                <a
                  href="https://whatsapp.com/channel/0029Va6DqhaH5JLwvPx90k39"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tq1-wa-circle"
                  style={{ textDecoration: 'none' }}
                >
                  <svg className="tq1-wa-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12.004 2C6.486 2 2 6.486 2 12.004c0 1.996.587 3.939 1.698 5.603L2 22l4.526-1.644a10.007 10.007 0 0 0 5.478 1.648c5.518 0 10.004-4.486 10.004-10.004C22.008 6.486 17.522 2 12.004 2zm0 18.286c-1.764 0-3.487-.478-4.98-1.382l-.357-.215-2.696.98.995-2.628-.236-.376A8.257 8.257 0 0 1 3.719 12.004C3.719 7.435 7.435 3.719 12.004 3.719c4.569 0 8.285 3.716 8.285 8.285 0 4.569-3.716 8.282-8.285 8.282z" />
                  </svg>
                </a>
              </div>

              <div className="tq1-card-text-wrap">
                <h3 className="tq1-card-title">Join Our WhatsApp Group</h3>
                <p className="tq1-card-desc">
                  Join our exclusive community to get updates, tips, and connect with like-minded business owners.
                </p>
                <div className="tq1-wa-btn-wrap">
                  <a
                    href="https://whatsapp.com/channel/0029Va6DqhaH5JLwvPx90k39"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tq1-wa-btn"
                  >
                    <span>Join WhatsApp Group</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="tq1-footer">
        <div className="tq1-footer-inner">
          <img src="/images/logo/LOGO Dark theme .webp" alt="Mingrow" className="tq1-footer-logo" />
          <p>© 2026 Mingrow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
