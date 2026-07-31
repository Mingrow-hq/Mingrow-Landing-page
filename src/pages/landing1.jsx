import React, { useEffect, useState, useRef } from 'react';
import './landing1.css';

const AGENT_GROUPS = [
  {
    category: 'ORCHESTRATION',
    headline: 'Every conversation has more\npotential than it seems.',
    image: '/images/landing/agent group/Orchestration.webp',
  },
  {
    category: 'MARKETING',
    headline: 'Every campaign starts with\na single powerful insight.',
    image: '/images/landing/agent group/Marekting.webp',
  },
  {
    category: 'HR',
    headline: 'Great teams are built on\nintelligent talent decisions.',
    image: '/images/landing/agent group/HR.webp',
  },
  {
    category: 'FINANCE',
    headline: 'Every number tells a story\nworth listening to.',
    image: '/images/landing/agent group/Finance.webp',
  },
  {
    category: 'ANALYTICS',
    headline: 'Data without action is just\nnoise waiting to matter.',
    image: '/images/landing/agent group/Analytics.webp',
  },
  {
    category: 'OPERATIONS',
    headline: 'Efficiency is doing the right\nthings at the right time.',
    image: '/images/landing/agent group/Operations.webp',
  },
  {
    category: 'ENGINEERING',
    headline: 'The best systems are the ones\nyou never have to fix.',
    image: '/images/landing/agent group/Engineering.webp',
  },
  {
    category: 'RESEARCH',
    headline: 'Every breakthrough begins with\na curious question.',
    image: '/images/landing/agent group/Research.webp',
  },
  {
    category: 'SECURITY',
    headline: 'Protection is not a feature —\nit is a foundation.',
    image: '/images/landing/agent group/Security.webp',
  },
  {
    category: 'COMMUNICATION',
    headline: 'The right message reaches\nthe right person instantly.',
    image: '/images/landing/agent group/Communication.webp',
  },
  {
    category: 'DATA & ENGINEERING',
    headline: 'Raw data becomes power\nin the hands of AI.',
    image: '/images/landing/agent group/Data & engineering.webp',
  },
  {
    category: 'CPM & ERP',
    headline: 'Planning and performance aligned\nin one unified system.',
    image: '/images/landing/agent group/CPM &ERP.webp',
  },
];

function AgentGroupsSection() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollable = containerRef.current.offsetHeight - window.innerHeight;

      if (scrollable > 0) {
        const scrolled = -rect.top;
        const progress = Math.max(0, Math.min(0.9999, scrolled / scrollable));
        const idx = Math.min(
          AGENT_GROUPS.length - 1,
          Math.floor(progress * AGENT_GROUPS.length)
        );
        setActiveIndex(idx);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const active = AGENT_GROUPS[activeIndex];
  const linePercent = 8 + (activeIndex / (AGENT_GROUPS.length - 1)) * 92;

  return (
    <section
      ref={containerRef}
      className="ag-scroll-container"
      style={{ height: `${AGENT_GROUPS.length * 30}vh` }}
    >
      <div className="ag-sticky-panel">
        <div className="ag-sticky-inner">

          {/* LEFT: Description — React key trick re-triggers CSS fade animation */}
          <div className="ag-desc">
            <div className="ag-label mono" key={`lbl-${activeIndex}`}>A NEW KIND OF TEAM</div>
            <div className="ag-category" key={`cat-${activeIndex}`}>{active.category}</div>
            <h2
              className="ag-headline"
              key={`hdl-${activeIndex}`}
              dangerouslySetInnerHTML={{ __html: active.headline.replace('\n', '<br/>') }}
            />
            <div className="ag-line-track">
              <div className="ag-line-fill" style={{ width: `${linePercent}%` }} />
            </div>

          </div>

          {/* RIGHT: All images stacked; only active one is visible */}
          <div className="ag-img-wrap">
            {AGENT_GROUPS.map((agent, i) => (
              <img
                key={i}
                src={agent.image}
                alt={agent.category}
                className={`ag-item-img${i === activeIndex ? ' visible' : ''}`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

export default function landing1() {
  const [scrolled, setScrolled] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: '02', hours: '14', minutes: '35' });

  useEffect(() => {
    document.title = "Mingrow — The AI Business OS";
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);

    const offset = (2 * 24 * 60 * 60 + 14 * 60 * 60 + 35 * 60) * 1000;
    const targetDateKey = 'landing1_countdown_target_v3';
    let targetTime = localStorage.getItem(targetDateKey);
    
    if (!targetTime) {
      targetTime = (Date.now() + offset).toString();
      localStorage.setItem(targetDateKey, targetTime);
    }

    const target = parseInt(targetTime, 10);
    const updateTimer = () => {
      const now = Date.now();
      const difference = target - now;
      if (difference <= 0) {
        setTimeLeft({ days: '00', hours: '00', minutes: '00' });
      } else {
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        setTimeLeft({
          days: String(d).padStart(2, '0'),
          hours: String(h).padStart(2, '0'),
          minutes: String(m).padStart(2, '0')
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000);
    const revealEls = document.querySelectorAll('.landing1-page-root .reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="landing1-page-root">
      <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <div className="nav-logo-wrap">
            <img src="/images/logo/LOGO Dark theme .webp" alt="Mingrow" className="nav-logo" />
          </div>
          <div className="nav-center-brewing">
            <span className="brewing-text">Something is Brewing...</span>
            <span className="yellow-dot"></span>
          </div>
          <div className="nav-right-countdown">
            <div className="countdown-item">
              <span className="countdown-num">{timeLeft.days}</span>
              <span className="countdown-label">{parseInt(timeLeft.days, 10) === 1 ? 'day' : 'days'}</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-num">{timeLeft.hours}</span>
              <span className="countdown-label">Hours</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-num">{timeLeft.minutes}</span>
              <span className="countdown-label">Min</span>
            </div>
          </div>
        </div>
      </header>

      <section className="hero">
        <div 
          className="reveal in" 
          style={{ width: '90%', maxWidth: '1200px', margin: '0 auto', cursor: 'pointer' }} 
          onClick={() => {
            document.querySelector('.form-section')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <img src="/images/landing/hero_section.webp" alt="Mingrow Hero" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '12px' }} />
        </div>
      </section>

      <AgentGroupsSection />

      <section className="agents-revel" style={{ padding: '0 0 60px 0' }}>
        <div className="wrap">
          <div className="reveal in agents-revel-img-wrap" style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
            <img src="/images/landing/agents revel.webp" alt="Mingrow Agents Revel" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '16px' }} />
          </div>
        </div>
      </section>

      <section className="form-section">
        <div className="wrap">
            <div className="reveal in" style={{ width: '100%', maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h2 className="form-section-heading">Get Early Access From Here</h2>
              <iframe 
                className="wtl-form-iframe"
                src="https://mingrow.cloud/forms/wtl/f0e3930fe031c9bcee1723a8d5a78587" 
                frameBorder="0" 
                sandbox="allow-top-navigation allow-forms allow-scripts allow-same-origin allow-popups" 
                allowFullScreen
              ></iframe>
            </div>
        </div>
      </section>

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
