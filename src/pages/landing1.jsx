import React, { useEffect, useState, useRef, useCallback } from 'react';
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
  { name: 'Neha G.', location: 'Gurugram', action: 'requested Early Access', time: 'Just now', initial: 'N', color: '#EC4899' },
  { name: 'Dev P.', location: 'Noida', action: 'joined Early Access', time: '1m ago', initial: 'D', color: '#10B981' },
  { name: 'Tanvi M.', location: 'Chandigarh', action: 'requested Early Access', time: 'Just now', initial: 'T', color: '#6366F1' },
  { name: 'Karan B.', location: 'Surat', action: 'joined Early Access waitlist', time: '3m ago', initial: 'K', color: '#F59E0B' },
  { name: 'Isha L.', location: 'Indore', action: 'requested Early Access', time: 'Just now', initial: 'I', color: '#8B5CF6' },
  { name: 'Siddharth T.', location: 'Kochi', action: 'joined Early Access', time: '2m ago', initial: 'S', color: '#06B6D4' },
  { name: 'Meera K.', location: 'Lucknow', action: 'requested Early Access', time: 'Just now', initial: 'M', color: '#EF4444' },
  { name: 'Arjun H.', location: 'Coimbatore', action: 'joined Early Access', time: '4m ago', initial: 'A', color: '#14B8A6' },
  { name: 'Riya B.', location: 'Bhopal', action: 'requested Early Access', time: '1m ago', initial: 'R', color: '#F43F5E' },
  { name: 'Yash V.', location: 'Nagpur', action: 'joined Early Access waitlist', time: 'Just now', initial: 'Y', color: '#3B82F6' },
  { name: 'Pooja R.', location: 'Vadodara', action: 'requested Early Access', time: '2m ago', initial: 'P', color: '#8B4DFF' },
];

function EarlyAccessNotification({ onNotificationShown }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const isHovered = useRef(false);
  const onNotifRef = useRef(onNotificationShown);

  useEffect(() => {
    onNotifRef.current = onNotificationShown;
  }, [onNotificationShown]);

  useEffect(() => {
    if (dismissed) return;

    let showTimer;
    let hideTimer;

    const runCycle = () => {
      if (isHovered.current) {
        showTimer = setTimeout(runCycle, 1000);
        return;
      }

      setVisible(true);
      if (onNotifRef.current) {
        onNotifRef.current();
      }

      // Display popup on screen for 3 seconds
      showTimer = setTimeout(() => {
        if (!isHovered.current) {
          setVisible(false);
        }
        // Dynamic gap varying between 2 to 4 seconds (total cycle 3s to 5s)
        const gap = Math.floor(Math.random() * 2000) + 1500;
        hideTimer = setTimeout(() => {
          setIndex((prev) => (prev + 1) % NOTIFICATIONS.length);
          runCycle();
        }, gap);
      }, 3000);
    };

    const initialTimer = setTimeout(() => {
      runCycle();
    }, 1500);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
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
        document.getElementById('founder-qualification-form')?.scrollIntoView({ behavior: 'smooth' });
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
  const [qualStep, setQualStep] = useState(1);
  const [qualAnswers, setQualAnswers] = useState({
    step1: '',
    step2: '',
    step3: '',
    step4: ''
  });
  const [timeLeft, setTimeLeft] = useState({ days: '30', hours: '00', minutes: '00', seconds: '00' });
  const [seatsRemaining, setSeatsRemaining] = useState(() => {
    const saved = localStorage.getItem('mingrow_seats_remaining_v2');
    if (saved !== null) {
      const parsed = parseInt(saved, 10);
      if (!isNaN(parsed) && parsed >= 0 && parsed <= 100) {
        return parsed;
      }
    }
    localStorage.setItem('mingrow_seats_remaining_v2', '56');
    return 56;
  });

  const handleNotificationShown = useCallback(() => {
    setSeatsRemaining((prev) => {
      const next = Math.max(0, prev - 1);
      localStorage.setItem('mingrow_seats_remaining_v2', next.toString());
      return next;
    });
  }, []);

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

    const offset = 30 * 24 * 60 * 60 * 1000; // 30 Days countdown calculation
    const targetDateKey = 'landing1_countdown_target_30days_v4';
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
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
      } else {
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({
          days: String(d).padStart(2, '0'),
          hours: String(h).padStart(2, '0'),
          minutes: String(m).padStart(2, '0'),
          seconds: String(s).padStart(2, '0')
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
        <div className="hero-container">
          {/* Full-width centered heading at top */}
          <h1 className="hero-heading">
            Your Entire Business.<br />
            Powered by One <span className="hero-purple-gradient">AI Workforce.</span>
          </h1>

          <div className="hero-grid">
            {/* Left Column: Image */}
            <div className="hero-left">
              <img
                src="/images/landing1/hero section_new.webp"
                alt="Mingrow AI Workforce"
                className="hero-image"
              />
            </div>

            {/* Right Column: Feature List & CTA */}
            <div className="hero-right">

              <div className="hero-features-list">
                <div className="hero-feature-item">
                  <div className="hero-feature-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </div>
                  <span className="hero-feature-text">
                    Works <strong className="highlight-yellow">24/7</strong> without breaks
                  </span>
                </div>

                <div className="hero-feature-item">
                  <div className="hero-feature-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="1" x2="12" y2="23"/>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                    </svg>
                  </div>
                  <span className="hero-feature-text">
                    Costs <strong className="highlight-yellow">less</strong> than hiring one employee
                  </span>
                </div>

                <div className="hero-feature-item">
                  <div className="hero-feature-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="20" x2="18" y2="10"/>
                      <line x1="12" y1="20" x2="12" y2="4"/>
                      <line x1="6" y1="20" x2="6" y2="14"/>
                      <polyline points="18 10 12 4 6 14"/>
                    </svg>
                  </div>
                  <span className="hero-feature-text">
                    Scales with your business <strong className="highlight-yellow">instantly</strong>
                  </span>
                </div>

                <div className="hero-feature-item">
                  <div className="hero-feature-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                      <path d="M2 17l10 5 10-5"/>
                      <path d="M2 12l10 5 10-5"/>
                    </svg>
                  </div>
                  <span className="hero-feature-text">
                    One platform. <strong className="highlight-yellow">Every department.</strong>
                  </span>
                </div>
              </div>

              <button
                className="hero-hire-cta"
                onClick={() => document.getElementById('founder-qualification-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Hire My AI Workforce <span className="cta-arrow">→</span>
              </button>
            </div>
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

      {/* Launch Pricing & Founding Company Section */}
      <section className="launch-pricing-section">
        <div className="wrap">
          <div className="lp-container reveal in">
            
            {/* LEFT COLUMN */}
            <div className="lp-left-col">
              <h2 className="lp-title">
                Founder <span className="purple-gradient-text">Offer</span>
              </h2>

              <p className="lp-subtitle">
                Be One of the <strong>First 100 Companies</strong> to Join <strong>Mingrow AI Business OS</strong> and Lock in Our <strong>Exclusive Launch Pricing Forever.</strong>
              </p>

              <div className="lp-features-grid">
                <div className="lp-feature-card">
                  <div className="lp-icon-box">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
                      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-3.05 11a22.35 22.35 0 0 1-3.95 2z"/>
                      <path d="M9 12l-1.5-1.5"/>
                      <path d="M15 6l1.5 1.5"/>
                    </svg>
                  </div>
                  <div className="lp-feature-text">
                    <h4>Launch First.<br />Lead Always.</h4>
                    <p>Exclusive. Limited.<br />Priceless.</p>
                  </div>
                </div>

                <div className="lp-feature-card">
                  <div className="lp-icon-box">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2a9 9 0 0 1 9 9c0 3.6-2.1 6.7-5.2 8.1l-.8.4v2.5H9v-2.5l-.8-.4C5.1 17.7 3 14.6 3 11a9 9 0 0 1 9-9z"/>
                      <path d="M9 22h6"/>
                      <circle cx="12" cy="11" r="3"/>
                    </svg>
                  </div>
                  <div className="lp-feature-text">
                    <h4>Tomorrow&apos;s<br />Advantage.</h4>
                    <p>Built for Early<br />Adopters.</p>
                  </div>
                </div>

                <div className="lp-feature-card">
                  <div className="lp-icon-box">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  </div>
                  <div className="lp-feature-text">
                    <h4>Join the 100.<br />Shape the Future.</h4>
                    <p>Your Business.<br />Powered by AI.</p>
                  </div>
                </div>
              </div>

              <div className="lp-cta-row">
                <button
                  className="lp-cta-btn"
                  onClick={() => document.getElementById('founder-qualification-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Become a Founding Company <span className="arrow">→</span>
                </button>
                <div className="lp-cta-divider"></div>
                <span className="lp-cta-subtext">Secure your lifetime pricing before the offer closes.</span>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="lp-right-col">
              <div className="lp-image-wrapper">
                <picture>
                  <source media="(max-width: 980px)" srcSet="/images/landing/MOBILE%20VIEW%20WITH%20BOX%20.png" />
                  <img
                    src="/images/landing/with box image.webp"
                    alt="12 AI Agents. One Business OS."
                    className="lp-box-bg-img"
                  />
                </picture>
                
                {/* Top-Right FOUNDER OFFER Badge */}
                <div className="lp-top-right-founder-badge">
                  <span className="crown-icon">👑</span>
                  <span className="founder-text">FOUNDER OFFER</span>
                </div>

                {/* Center Sphere Tag on Image */}
                <div className="lp-center-globe-tag">
                  <span className="lp-agent-tag-count">12 AI Agents.</span>
                  <span className="lp-agent-tag-sub">One Business OS.</span>
                </div>

                {/* Content inside the glowing box overlay */}
                <div className="lp-box-content-overlay">
                  
                  {/* Self-Destruct Header Pill */}
                  <div className="lp-self-destruct-header">
                    <div className="lp-self-destruct-pill">
                      <span className="lp-flame-icon">🔥</span>
                      <span className="lp-self-destruct-text">THIS PRICE WILL SELF-DESTRUCT</span>
                    </div>
                  </div>

                  <div className="lp-users-divider">
                    <span>Only for <strong className="gold-text">First 100 Users</strong></span>
                  </div>

                  {/* Price Row */}
                  <div className="lp-price-main-row">
                    <div className="lp-price-left">
                      <span className="lp-currency">₹</span>
                      <span className="lp-amount">4,999</span>
                      <span className="lp-period">/month</span>
                    </div>
                    <div className="lp-price-v-divider"></div>
                    <div className="lp-price-right">
                      <span className="lp-strike-price">Then ₹10,000/month</span>
                      <span className="lp-after-users">After 100 Users</span>
                    </div>
                  </div>

                  {/* Timeline Progress Bar */}
                  <div className="lp-timeline-container">
                    <div className="lp-timeline-line">
                      <div className="lp-timeline-node node-left active">
                        <div className="lp-node-dot"></div>
                      </div>
                      <div className="lp-timeline-node node-right">
                        <div className="lp-node-dot"></div>
                      </div>
                    </div>
                    <div className="lp-timeline-labels">
                      <div className="lp-timeline-step left">
                        <span className="step-range">1–100 Users</span>
                        <span className="step-price gold-text">₹4,999/month</span>
                        <span className="step-note">(Lifetime Launch)</span>
                      </div>
                      <div className="lp-timeline-step right">
                        <span className="step-range">101+ Users</span>
                        <span className="step-price">₹10,000/month</span>
                        <span className="step-note">(Standard Pricing)</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer Bar: Seats & Countdown — hidden on mobile, shown on desktop */}
                  <div className="lp-footer-status-bar lp-footer-status-bar-desktop">
                    <div className="lp-status-item seats">
                      <span className="lp-status-icon">👥</span>
                      <span className="lp-status-label">Seats Remaining:</span>
                      <span className="lp-status-value gold-text">{seatsRemaining} / 100</span>
                    </div>
                    <div className="lp-status-divider"></div>
                    <div className="lp-status-item timer">
                      <span className="lp-status-icon">⌛</span>
                      <div className="lp-timer-group">
                        <span className="lp-status-label">Offer Ends In:</span>
                        <span className="lp-timer-digits gold-text">
                          {timeLeft.days} : {timeLeft.hours} : {timeLeft.minutes} : {timeLeft.seconds || '00'}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

              {/* Footer Bar: Seats & Countdown — mobile only, outside image wrapper to avoid clipping */}
              <div className="lp-footer-status-bar lp-footer-status-bar-mobile">
                <div className="lp-status-item seats">
                  <span className="lp-status-icon">👥</span>
                  <span className="lp-status-label">Seats Remaining:</span>
                  <span className="lp-status-value gold-text">{seatsRemaining} / 100</span>
                </div>
                <div className="lp-status-divider"></div>
                <div className="lp-status-item timer">
                  <span className="lp-status-icon">⌛</span>
                  <div className="lp-timer-group">
                    <span className="lp-status-label">Offer Ends In:</span>
                    <span className="lp-timer-digits gold-text">
                      {timeLeft.days} : {timeLeft.hours} : {timeLeft.minutes} : {timeLeft.seconds || '00'}
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* FOUNDER QUALIFICATION SECTION */}
      <section id="founder-qualification-form" className="lp1-qualification-section">
        <div className="lp1-qual-container">
          
          {/* Badge */}
          <div className="lp1-qual-badge-wrap">
            <div className="lp1-qual-badge">
              <span className="lp1-qual-badge-icon">⚡</span>
              <span>FOUNDER QUALIFICATION</span>
            </div>
          </div>

          {/* Heading */}
          <h2 className="lp1-qual-title" style={{ whiteSpace: 'nowrap' }}>
            Check Your Eligibility for <span className="lp1-gold-gradient">Founder Offer</span>
          </h2>

          {/* Qualification Card */}
          <div className="lp1-qual-card">
            
            {/* Header: Step Info & Progress Bar */}
            <div className="lp1-qual-header">
              <div className="lp1-qual-step-info">
                <span className="lp1-qual-step-text">
                  {typeof qualStep === 'number' ? `STEP ${qualStep} OF 5` : 'QUALIFICATION'}
                </span>
                <span className="lp1-qual-percentage">
                  {typeof qualStep === 'number' ? `${(qualStep / 5) * 100}%` : '0%'}
                </span>
              </div>
              <div className="lp1-qual-progress-track">
                <div 
                  className="lp1-qual-progress-fill" 
                  style={{ width: typeof qualStep === 'number' ? `${(qualStep / 5) * 100}%` : '0%' }}
                ></div>
              </div>
            </div>

            {/* Step Content */}
            <div className="lp1-qual-body">
              {qualStep === 'not_eligible' && (
                <div className="lp1-qual-step-content" style={{ textAlign: 'center', padding: '20px 0' }}>
                  <div className="lp1-qual-cat-label">STATUS</div>
                  <h3 className="lp1-qual-question" style={{ marginBottom: '16px' }}>
                    Thank you for your time.
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.05rem', marginBottom: '0px' }}>
                    You are not eligible for this offer.
                  </p>
                </div>
              )}

              {qualStep === 1 && (
                <div className="lp1-qual-step-content">
                  <div className="lp1-qual-cat-label">BUDGET</div>
                  <h3 className="lp1-qual-question">Are you ready for 7 day free trial?</h3>
                  <div className="lp1-qual-options">
                    <button 
                      className={`lp1-qual-option ${qualAnswers.step1 === 'yes' ? 'selected' : ''}`}
                      onClick={() => {
                        setQualAnswers(prev => ({ ...prev, step1: 'yes' }));
                        setQualStep(2);
                      }}
                    >
                      <span>Yes</span>
                      {qualAnswers.step1 === 'yes' && (
                        <span className="lp1-qual-check-icon">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M9 12l2 2 4-4"></path>
                          </svg>
                        </span>
                      )}
                    </button>
                    <button 
                      className={`lp1-qual-option ${qualAnswers.step1 === 'no' ? 'selected' : ''}`}
                      onClick={() => {
                        setQualAnswers(prev => ({ ...prev, step1: 'no' }));
                        setQualStep('not_eligible');
                      }}
                    >
                      <span>No</span>
                      {qualAnswers.step1 === 'no' && (
                        <span className="lp1-qual-check-icon">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M9 12l2 2 4-4"></path>
                          </svg>
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {qualStep === 2 && (
                <div className="lp1-qual-step-content">
                  <div className="lp1-qual-cat-label">AUTHORITY</div>
                  <h3 className="lp1-qual-question">Are you the decision maker?</h3>
                  <div className="lp1-qual-options">
                    {['Yes', 'Need Approval'].map((opt) => (
                      <button 
                        key={opt}
                        className={`lp1-qual-option ${qualAnswers.step2 === opt ? 'selected' : ''}`}
                        onClick={() => {
                          setQualAnswers(prev => ({ ...prev, step2: opt }));
                          setQualStep(3);
                        }}
                      >
                        <span>{opt}</span>
                        {qualAnswers.step2 === opt && (
                          <span className="lp1-qual-check-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="10"></circle>
                              <path d="M9 12l2 2 4-4"></path>
                            </svg>
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                  <button className="lp1-qual-back-btn" onClick={() => setQualStep(1)}>
                    ← Back
                  </button>
                </div>
              )}

              {qualStep === 3 && (
                <div className="lp1-qual-step-content">
                  <div className="lp1-qual-cat-label">NEED</div>
                  <h3 className="lp1-qual-question">What is your biggest challenge?</h3>
                  <div className="lp1-qual-grid-2x2">
                    {['More Leads', 'Save Time', 'Reduce Costs', 'Automation', 'Growth'].map((opt) => (
                      <button 
                        key={opt}
                        className={`lp1-qual-option ${qualAnswers.step3 === opt ? 'selected' : ''}`}
                        onClick={() => {
                          setQualAnswers(prev => ({ ...prev, step3: opt }));
                          setQualStep(4);
                        }}
                      >
                        <span>{opt}</span>
                        {qualAnswers.step3 === opt && (
                          <span className="lp1-qual-check-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="10"></circle>
                              <path d="M9 12l2 2 4-4"></path>
                            </svg>
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                  <button className="lp1-qual-back-btn" onClick={() => setQualStep(2)}>
                    ← Back
                  </button>
                </div>
              )}

              {qualStep === 4 && (
                <div className="lp1-qual-step-content">
                  <div className="lp1-qual-cat-label">TIMELINE</div>
                  <h3 className="lp1-qual-question">When are you planning to start?</h3>
                  <div className="lp1-qual-grid-2x2">
                    {['Immediately', 'Just Exploring'].map((opt) => (
                      <button 
                        key={opt}
                        className={`lp1-qual-option ${qualAnswers.step4 === opt ? 'selected' : ''}`}
                        onClick={() => {
                          setQualAnswers(prev => ({ ...prev, step4: opt }));
                          if (opt === 'Just Exploring') {
                            setQualStep('not_eligible');
                          } else {
                            setQualStep(5);
                          }
                        }}
                      >
                        <span>{opt}</span>
                        {qualAnswers.step4 === opt && (
                          <span className="lp1-qual-check-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="10"></circle>
                              <path d="M9 12l2 2 4-4"></path>
                            </svg>
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                  <button className="lp1-qual-back-btn" onClick={() => setQualStep(3)}>
                    ← Back
                  </button>
                </div>
              )}

              {qualStep === 5 && (
                <div className="lp1-qual-step-content">
                  <div className="lp1-qual-cat-label">YOUR DETAILS</div>
                  <h3 className="lp1-qual-question" style={{ marginBottom: '20px' }}>Where should we send your result?</h3>
                  <div 
                    style={{ width: '100%', maxWidth: '600px', margin: '0 auto', position: 'relative' }}
                    onClick={() => {
                      if (!window._submitArmTimer) {
                        window._submitArmTimer = setTimeout(() => {
                          window.location.href = '/thnakyou';
                        }, 1200);
                      }
                    }}
                  >
                    <iframe 
                      width="100%" 
                      height="520" 
                      src="https://mingrow.cloud/forms/wtl/8701f87cf904b05e1191857c3f0f94bd" 
                      frameBorder="0" 
                      sandbox="allow-top-navigation allow-forms allow-scripts allow-same-origin allow-popups" 
                      allowFullScreen
                      style={{ border: 'none', borderRadius: '12px', display: 'block', maxWidth: '100%' }}
                    ></iframe>
                  </div>
                  <button className="lp1-qual-back-btn" style={{ marginTop: '20px' }} onClick={() => setQualStep(4)}>
                    ← Back
                  </button>
                </div>
              )}
            </div>

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

      <EarlyAccessNotification onNotificationShown={handleNotificationShown} />
    </div>
  );
}
