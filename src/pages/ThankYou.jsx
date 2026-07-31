import React, { useEffect } from 'react';
import './landing1.css';

export default function ThankYouPage() {
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
    <div className="landing1-page-root thankyou-page-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
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

      <main className="thankyou-main">
        {/* Background Glow & Silhouettes */}
        <div className="thankyou-bg-glow"></div>
        <div className="thankyou-bg-silhouettes"></div>

        <div className="thankyou-card">
          <h1 className="thankyou-title">THANK YOU!</h1>
          
          <div className="thankyou-subtitle-wrap">
            <span className="thankyou-sub-line"></span>
            <span className="thankyou-subtitle">YOU’RE ALL SET!</span>
            <span className="thankyou-sub-line"></span>
          </div>

          <div className="thankyou-body-text">
            <p>We’ve received your details and</p>
            <p>you’re officially on the list.</p>
            <div className="thankyou-text-spacer"></div>
            <p>Our team will reach out to you soon with</p>
            <p>exciting updates and early access.</p>
          </div>

          {/* Glowing Horizon Curve Arc */}
          <div className="thankyou-horizon-container">
            <svg className="thankyou-horizon-svg" viewBox="0 0 1000 120" preserveAspectRatio="none">
              <defs>
                <linearGradient id="horizonGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8B4DFF" stopOpacity="0.05" />
                  <stop offset="35%" stopColor="#A855F7" stopOpacity="0.7" />
                  <stop offset="50%" stopColor="#E9D5FF" stopOpacity="1" />
                  <stop offset="65%" stopColor="#A855F7" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#8B4DFF" stopOpacity="0.05" />
                </linearGradient>
                <radialGradient id="centerBurst" cx="50%" cy="0%" r="50%">
                  <stop offset="0%" stopColor="#F0ABFC" stopOpacity="0.9" />
                  <stop offset="40%" stopColor="#9333EA" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                </radialGradient>
              </defs>
              <ellipse cx="500" cy="-600" rx="900" ry="715" fill="url(#centerBurst)" />
              <path d="M 0,110 Q 500,10 1000,110" fill="none" stroke="url(#horizonGlow)" strokeWidth="3.5" />
            </svg>
            <div className="thankyou-horizon-flare"></div>
          </div>

          {/* Join The Community Button with WhatsApp Icon */}
          <div className="thankyou-btn-wrap">
            <a 
              href="https://whatsapp.com/channel/0029Va6DqhaH5JLwvPx90k39" 
              target="_blank" 
              rel="noopener noreferrer"
              className="thankyou-whatsapp-btn"
            >
              <svg 
                className="thankyou-whatsapp-icon" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12.004 2C6.486 2 2 6.486 2 12.004c0 1.996.587 3.939 1.698 5.603L2 22l4.526-1.644a10.007 10.007 0 0 0 5.478 1.648c5.518 0 10.004-4.486 10.004-10.004C22.008 6.486 17.522 2 12.004 2zm0 18.286c-1.764 0-3.487-.478-4.98-1.382l-.357-.215-2.696.98.995-2.628-.236-.376A8.257 8.257 0 0 1 3.719 12.004C3.719 7.435 7.435 3.719 12.004 3.719c4.569 0 8.285 3.716 8.285 8.285 0 4.569-3.716 8.282-8.285 8.282z"/>
              </svg>
              <span>Join The Community</span>
            </a>
          </div>
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

