import React, { useEffect } from 'react';
import './landing1.css';

export default function ThankYouPage() {
  useEffect(() => {
    document.title = "Thank You — Mingrow";

    // Initialize dataLayer and push pageview event for GTM-KZNCHHFT
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'pageview',
      page_title: 'Thank You',
      page_location: window.location.href,
      page_path: window.location.pathname
    });

    // Ensure Google Tag Manager script is loaded
    if (!document.getElementById('gtm-script-thankyou')) {
      (function(w,d,s,l,i){
        w[l]=w[l]||[];
        w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
        var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),
            dl=l!='dataLayer'?'&l='+l:'';
        j.id='gtm-script-thankyou';
        j.async=true;
        j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
        if (f && f.parentNode) {
          f.parentNode.insertBefore(j,f);
        } else {
          d.head.appendChild(j);
        }
      })(window,document,'script','dataLayer','GTM-KZNCHHFT');
    }
  }, []);

  return (
    <div className="landing1-page-root" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe 
          src="https://www.googletagmanager.com/ns.html?id=GTM-KZNCHHFT"
          height="0" 
          width="0" 
          style={{ display: 'none', visibility: 'hidden' }}
        ></iframe>
      </noscript>
      {/* End Google Tag Manager (noscript) */}

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
