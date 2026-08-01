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

const NOTIFICATIONS = [
  { name: 'Priya S.', location: 'Bengaluru', action: 'requested Early Access', time: 'Just now', initial: 'P', color: '#8B4DFF' },
  { name: 'Aarav M.', location: 'Mumbai', action: 'joined Early Access waitlist', time: '2m ago', initial: 'A', color: '#36B37E' },
  { name: 'Rohan S.', location: 'Delhi NCR', action: 'requested Early Access', time: 'Just now', initial: 'R', color: '#F5B301' },
  { name: 'Ananya R.', location: 'Hyderabad', action: 'joined Early Access', time: '1m ago', initial: 'A', color: '#00B8D9' },
  { name: 'Vikram P.', location: 'Pune', action: 'requested Early Access', time: '3m ago', initial: 'V', color: '#FF5630' },
  { name: 'Sneha K.', location: 'Chennai', action: 'joined Early Access', time: '4m ago', initial: 'S', color: '#6554C0' },
  { name: 'Aditya V.', location: 'Kolkata', action: 'requested Early Access', time: 'Just now', initial: 'A', color: '#FFAB00' },
  { name: 'Kavya J.', location: 'Ahmedabad', action: 'joined Early Access', time: '2m ago', initial: 'K', color: '#36B37E' },
  { name: 'Rahul N.', location: 'Jaipur', action: 'requested Early Access', time: '5m ago', initial: 'R', color: '#8B4DFF' },
];

function EarlyAccessNotification() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const isHovered = useRef(false);

  useEffect(() => {
    if (dismissed) return;

    let showTimeout;
    let hideTimeout;
    let checkInterval;

    const showNotif = () => {
      setVisible(true);
      showTimeout = setTimeout(() => {
        const tryHide = () => {
          if (!isHovered.current) {
            setVisible(false);
            const randomGap = Math.floor(Math.random() * 2000) + 3000; // 3-5 seconds gap
            hideTimeout = setTimeout(() => {
              setIndex((prev) => (prev + 1) % NOTIFICATIONS.length);
              showNotif();
            }, randomGap);
          } else {
            checkInterval = setTimeout(tryHide, 1000);
          }
        };
        tryHide();
      }, 4000); // visible for 4 seconds
    };

    const initialTimer = setTimeout(() => {
      showNotif();
    }, 2000); // initial 2s delay when user lands

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
      clearTimeout(checkInterval);
    };
  }, [dismissed]);

  if (dismissed) return null;

  const current = NOTIFICATIONS[index];

  return (
    <div
      className={`ea-notification-card ${visible ? 'ea-show' : 'ea-hide'}`}
      onMouseEnter={() => { isHovered.current = true; }}
      onMouseLeave={() => { isHovered.current = false; }}
      onClick={() => {
        document.querySelector('.form-section')?.scrollIntoView({ behavior: 'smooth' });
      }}
      role="button"
      tabIndex={0}
    >
      <div className="ea-notif-avatar" style={{ background: current.color }}>
        {current.initial}
        <span className="ea-live-dot"></span>
      </div>
      <div className="ea-notif-body">
        <div className="ea-notif-title">
          <span className="ea-notif-name">{current.name}</span>
          <span className="ea-notif-loc">from {current.location}</span>
        </div>
        <div className="ea-notif-sub">
          <span className="ea-notif-badge">{current.action}</span>
          <span className="ea-notif-time">• {current.time}</span>
        </div>
      </div>
      <button
        className="ea-notif-close"
        title="Close"
        onClick={(e) => {
          e.stopPropagation();
          setDismissed(true);
        }}
      >
        ✕
      </button>
    </div>
  );
}


export default function landing1() {
  const [scrolled, setScrolled] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: '03', hours: '00', minutes: '00' });

  useEffect(() => {
    document.title = "Mingrow — The AI Business OS";

    const handleMessage = (event) => {
      // Only redirect if explicitly sent form submission message from iframe
      if (
        event.data === 'form_submitted' ||
        event.data?.type === 'form_submitted' ||
        event.data?.status === 'success' ||
        (typeof event.data === 'string' && (event.data.includes('form_submitted') || event.data.includes('submitted')))
      ) {
        window.location.href = '/thankyou';
      }
    };

    window.addEventListener('message', handleMessage);
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);

    const offset = 3 * 24 * 60 * 60 * 1000;
    const targetDateKey = 'landing1_countdown_target_3days_v1';
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
    const interval = setInterval(updateTimer, 1000);
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
      window.removeEventListener('message', handleMessage);
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
        <div className="hero-bg-container">
          <picture className="hero-bg-picture">
            <source media="(max-width: 980px)" srcSet="/images/landing/hero%20IMAGE%20MOBILE%20VIEW.webp" />
            <img src="/images/landing/hero_section.webp" alt="A New Era of Business Is Loading - Mingrow" className="hero-bg-img" />
          </picture>
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="hero-title-line1">A New Era of</span>
              <span className="hero-title-line2">
                <span className="hero-title-word-business">Business </span>
                <span className="purple-gradient-text">Is Loading</span>
              </span>
            </h1>
            <p className="hero-subtitle">
              <span className="hero-sub-line1">The next evolution of work isn&apos;t software.</span>
              <br className="hero-sub-desktop-br" />
              <span className="hero-sub-line2">It&apos;s something entirely different.</span>
            </p>
            <button
              className="hero-cta-button"
              onClick={() => document.querySelector('.form-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Request Early Access <span className="cta-arrow">→</span>
            </button>
          </div>
        </div>
      </section>

      <AgentGroupsSection />

      <section className="agents-revel" style={{ padding: '0 0 60px 0' }}>
        <div className="wrap">
          <div className="reveal in agents-revel-img-wrap" style={{ width: '100%', maxWidth: '1050px', margin: '0 auto', position: 'relative', borderRadius: '16px', overflow: 'hidden' }}>
            <img src="/images/landing/agents revel.webp" alt="They're almost here. Your future AI workforce arrives soon." style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
        </div>
      </section>

      <section className="form-section">
        <div className="wrap">
          <div
            className="reveal in"
            style={{ width: '100%', maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}
            onClick={() => {
              // Arm redirect on form submit click
              if (!window._submitArmTimer) {
                window._submitArmTimer = setTimeout(() => {
                  window.location.href = '/thnakyou';
                }, 1200);
              }
            }}
          >
            <h2 className="form-section-heading">Get Early Access From Here</h2>
            <iframe
              className="wtl-form-iframe"
              src="https://mingrow.cloud/forms/wtl/f0e3930fe031c9bcee1723a8d5a78587"
              frameBorder="0"
              sandbox="allow-top-navigation allow-forms allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation"
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

      <EarlyAccessNotification />
    </div>
  );
}
