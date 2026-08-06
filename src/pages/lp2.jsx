import React, { useEffect, useState, useRef, useCallback } from 'react';
import './landing1.css';
import './lp2.css';

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


export default function Lp2() {
  useEffect(() => {
    // Inject Google tag (gtag.js) in <head>
    if (!document.getElementById('gtag-g-fkf4fbwqg1-src')) {
      const gtagSrc = document.createElement('script');
      gtagSrc.id = 'gtag-g-fkf4fbwqg1-src';
      gtagSrc.async = true;
      gtagSrc.src = 'https://www.googletagmanager.com/gtag/js?id=G-FKF4FBWQG1';
      document.head.appendChild(gtagSrc);
    }

    if (!document.getElementById('gtag-g-fkf4fbwqg1-inline')) {
      const gtagInline = document.createElement('script');
      gtagInline.id = 'gtag-g-fkf4fbwqg1-inline';
      gtagInline.text = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-FKF4FBWQG1');`;
      document.head.appendChild(gtagInline);
    }
  }, []);

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
        </div>
      </header>

      <section className="lp1-hero-container">
        <div className="lp1-hero-inner">
          <div className="lp1-hero-grid">

            {/* Left Hero Content Section */}
            <div className="lp1-hero-left">

              {/* Top Image */}
              <div className="lp1-hero-img-wrapper">
                <img
                  src="/images/landing1/lp2 hero.webp"
                  alt="Mingrow AI Workforce"
                  className="lp1-hero-img"
                />
              </div>

              {/* Title Below Image */}
              <h1 className="lp1-hero-title">
                Hire an AI Workforce<br />
                for Just <span className="lp1-gold-highlight">$99/Month</span>
              </h1>


              {/* CTA Action Buttons */}
              <div className="lp1-cta-buttons">
                <button
                  className="lp1-primary-btn"
                  onClick={() => document.getElementById('founder-qualification-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Hire My AI Workforce <span className="arrow">→</span>
                </button>
                <button
                  className="lp1-secondary-btn"
                  onClick={() => document.querySelector('.lp1-demo-section')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <span className="play-icon">▶</span> See How It Works
                </button>
              </div>

            </div>

            {/* Right Side Feature Card */}
            <div className="lp2-hero-value-card">
              <h3 className="lp2-value-card-title">
                What You Get for<br />
                Just <span className="lp2-value-card-price">$99</span>/Month
              </h3>

              <div className="lp2-value-card-items">
                {/* Item 1 */}
                <div className="lp2-value-item">
                  <div className="lp2-value-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <div className="lp2-value-content">
                    <h4>12 AI Employees</h4>
                    <p>Each specialized for Sales, CRM, HR, Finance, Projects & Operations.</p>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="lp2-value-item">
                  <div className="lp2-value-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <div className="lp2-value-content">
                    <h4>Save 20+ Hours Every Week</h4>
                    <p>Automate repetitive work so your team focuses on growth.</p>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="lp2-value-item">
                  <div className="lp2-value-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                    </svg>
                  </div>
                  <div className="lp2-value-content">
                    <h4>Capture More Leads</h4>
                    <p>Never miss another inquiry or follow-up.</p>
                  </div>
                </div>

                {/* Item 4 */}
                <div className="lp2-value-item">
                  <div className="lp2-value-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 6v12M15 9.5H10.5a2 2 0 0 0 0 4h3a2 2 0 0 1 0 4H9"></path>
                    </svg>
                  </div>
                  <div className="lp2-value-content">
                    <h4>Reduce Operational Costs</h4>
                    <p>Replace multiple tools with one AI-powered platform.</p>
                  </div>
                </div>

                {/* Item 5 */}
                <div className="lp2-value-item">
                  <div className="lp2-value-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                      <line x1="8" y1="21" x2="16" y2="21"></line>
                      <line x1="12" y1="17" x2="12" y2="21"></line>
                    </svg>
                  </div>
                  <div className="lp2-value-content">
                    <h4>One Dashboard</h4>
                    <p>Manage your entire business from a single place.</p>
                  </div>
                </div>

                {/* Item 6 */}
                <div className="lp2-value-item">
                  <div className="lp2-value-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path>
                    </svg>
                    <span className="lp2-value-icon-text">24/7</span>
                  </div>
                  <div className="lp2-value-content">
                    <h4>Works 24/7</h4>
                    <p>Your AI workforce never takes a break.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SEE HOW MINGROW WORKS SECTION */}
      <section className="lp1-demo-section">
        <div className="lp1-demo-container">
          
          {/* Top Pill Badge */}
          <div className="lp1-demo-badge-wrap">
            <div className="lp1-demo-badge">
              <span className="lp1-demo-badge-icon">▷</span>
              <span>SEE MINGROW IN ACTION</span>
            </div>
          </div>

          {/* Heading & Subtitle */}
          <h2 className="lp1-demo-heading">
            See How <span className="lp1-demo-brand-gradient">Mingrow</span> Works
          </h2>
          <p className="lp1-demo-subheading">
            Watch how businesses are using their AI Workforce to automate operations, <span className="lp1-highlight-gold">save time</span> and <span className="lp1-highlight-gold">scale faster</span>.
          </p>

          {/* Main Content Grid: Video Container + Feature Bullet Cards */}
          <div className="lp1-demo-content-grid">
            
            {/* Left Video Container */}
            <div className="lp1-video-card">
              <div className="lp1-video-placeholder">
                <video
                  className="lp1-demo-video"
                  src="/Landing.mp4"
                  controls
                  playsInline
                  preload="metadata"
                />
              </div>
            </div>

            {/* Right Feature Info Column */}
            <div className="lp1-demo-features-col">
              <div className="lp1-demo-col-header">
                IN THIS VIDEO YOU'LL DISCOVER
              </div>

              <div className="lp1-demo-feature-list">
                
                {/* Item 1 */}
                <div className="lp1-demo-feature-item">
                  <div className="lp1-demo-item-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <div className="lp1-demo-item-text">
                    <h4>Meet Your AI Workforce</h4>
                    <p>See how 12 AI Employees work together under Sidd, your AI Manager.</p>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="lp1-demo-feature-item">
                  <div className="lp1-demo-item-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                    </svg>
                  </div>
                  <div className="lp1-demo-item-text">
                    <h4>Real Automations</h4>
                    <p>Watch real workflows that save time, capture leads and reduce manual work.</p>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="lp1-demo-feature-item">
                  <div className="lp1-demo-item-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="3" y1="9" x2="21" y2="9"></line>
                      <line x1="9" y1="21" x2="9" y2="9"></line>
                    </svg>
                  </div>
                  <div className="lp1-demo-item-text">
                    <h4>Powerful Dashboard</h4>
                    <p>Manage your entire business from one intelligent and easy-to-use dashboard.</p>
                  </div>
                </div>

                {/* Item 4 */}
                <div className="lp1-demo-feature-item">
                  <div className="lp1-demo-item-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <div className="lp1-demo-item-text">
                    <h4>Real Business Results</h4>
                    <p>See how businesses are growing faster, saving costs and getting more done.</p>
                  </div>
                </div>

              </div>

              {/* Watch Demo CTA */}
              <div className="lp1-demo-cta-wrap">
                <button
                  className="lp1-watch-demo-btn"
                  onClick={() => document.getElementById('founder-qualification-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <span className="lp1-btn-play-icon">▷</span>
                  <span>Watch the Demo</span>
                </button>
              </div>

            </div>

          </div>

          {/* Bottom Highlights Bar */}
          <div className="lp1-demo-highlights-bar">
            
            <div className="lp1-highlight-pill">
              <div className="lp1-pill-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <div className="lp1-pill-text">
                <div className="lp1-pill-title">2 Min Demo</div>
                <div className="lp1-pill-sub">See Mingrow In Action</div>
              </div>
            </div>

            <div className="lp1-highlight-pill">
              <div className="lp1-pill-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                  <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-3.05 11a22.35 22.35 0 0 1-3.95 2z"></path>
                </svg>
              </div>
              <div className="lp1-pill-text">
                <div className="lp1-pill-title">24/7 AI Workforce</div>
                <div className="lp1-pill-sub">Never Sleeps, Always Works</div>
              </div>
            </div>

            <div className="lp1-highlight-pill">
              <div className="lp1-pill-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <div className="lp1-pill-text">
                <div className="lp1-pill-title">100% Secure</div>
                <div className="lp1-pill-sub">Enterprise-Grade Protection</div>
              </div>
            </div>

            <div className="lp1-highlight-pill">
              <div className="lp1-pill-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </div>
              <div className="lp1-pill-text">
                <div className="lp1-pill-title">Trusted by Businesses</div>
                <div className="lp1-pill-sub">Across Industries</div>
              </div>
            </div>

          </div>

          {/* Bottom CTA Button */}
          <div className="lp1-demo-bottom-cta">
            <button
              className="lp1-eligibility-btn"
              onClick={() => document.getElementById('founder-qualification-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span>Check My Eligibility</span>
              <span className="arrow">→</span>
            </button>
          </div>

        </div>
      </section>

      {/* YOU COMMAND SIDD. HE MAKES OTHERS PERFORM SECTION */}
      <section className="lp1-sidd-arch-section">
        <div className="lp1-sidd-container">

          {/* Top Pill Badge */}
          <div className="lp1-sidd-badge-wrap">
            <div className="lp1-sidd-badge">
              <span className="lp1-sidd-badge-icon">💡</span>
              <span>HOW IT WORKS</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="lp1-sidd-title">
            You Command <span className="lp1-purple-text">Sidd.</span> He Makes <span className="lp1-gold-text">Others Perform.</span>
          </h2>

          {/* Architecture Cards Row */}
          <div className="lp1-sidd-flow-grid">
            
            {/* Card 1: YOU */}
            <div className="lp1-flow-card lp1-card-you">
              <div className="lp1-you-icon-box">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="#a78bfa"/>
                  <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="#a78bfa"/>
                </svg>
              </div>
              <h3 className="lp1-card-you-title">YOU</h3>
              <p className="lp1-card-you-sub">Give a command<br />to Sidd</p>
              
              <div className="lp1-command-divider"></div>

              <div className="lp1-command-prompts">
                <div className="lp1-prompt-item">"Generate 100 qualified leads"</div>
                <div className="lp1-prompt-item">"Create monthly financial report"</div>
                <div className="lp1-prompt-item">"Launch a marketing campaign"</div>
              </div>
            </div>

            {/* Arrow 1 */}
            <div className="lp1-flow-arrow">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>

            {/* Card 2: SIDD */}
            <div className="lp1-flow-card lp1-card-sidd">
              <div className="lp1-sidd-img-wrap">
                <img src="/images/agent_bg remove/sidd copy.webp" alt="Sidd AI Architect" className="lp1-sidd-img" />
              </div>
              <h3 className="lp1-sidd-name">SIDD</h3>
              <div className="lp1-sidd-role">AI Architect</div>
              
              <div className="lp1-sidd-divider"></div>

              <p className="lp1-sidd-desc">
                Understands, plans<br />and assigns tasks.
              </p>
            </div>

            {/* Arrow 2 */}
            <div className="lp1-flow-arrow">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>

            {/* Card 3: AI EMPLOYEES GRID */}
            <div className="lp1-flow-card lp1-card-team">
              <div className="lp1-team-header">
                SIDD ASSIGNS WORK TO THE RIGHT AI EMPLOYEES
              </div>

              <div className="lp1-employees-grid">
                
                {/* Row 1: 5 Agents */}
                <div className="lp1-emp-row lp1-emp-row-5">
                  <div className="lp1-emp-card">
                    <div className="lp1-emp-img-box">
                      <img src="/images/agent_bg remove/Dan copy.webp" alt="Dan" className="lp1-emp-img" />
                      <span className="lp1-emp-status-dot"></span>
                    </div>
                    <div className="lp1-emp-name">Dan</div>
                    <div className="lp1-emp-role">Finance<br />Professional</div>
                  </div>

                  <div className="lp1-emp-card">
                    <div className="lp1-emp-img-box">
                      <img src="/images/agent_bg remove/Semora copy.webp" alt="Semora" className="lp1-emp-img" />
                      <span className="lp1-emp-status-dot"></span>
                    </div>
                    <div className="lp1-emp-name">Semora</div>
                    <div className="lp1-emp-role">Intelligence<br />Analyst</div>
                  </div>

                  <div className="lp1-emp-card">
                    <div className="lp1-emp-img-box">
                      <img src="/images/agent_bg remove/Serra copy.webp" alt="Serra" className="lp1-emp-img" />
                      <span className="lp1-emp-status-dot"></span>
                    </div>
                    <div className="lp1-emp-name">Serra</div>
                    <div className="lp1-emp-role">Customer<br />Success</div>
                  </div>

                  <div className="lp1-emp-card">
                    <div className="lp1-emp-img-box">
                      <img src="/images/agent_bg remove/Amirk copy.webp" alt="Amrik" className="lp1-emp-img" />
                      <span className="lp1-emp-status-dot"></span>
                    </div>
                    <div className="lp1-emp-name">Amrik</div>
                    <div className="lp1-emp-role">Operations<br />Coordinator</div>
                  </div>

                  <div className="lp1-emp-card">
                    <div className="lp1-emp-img-box">
                      <img src="/images/agent_bg remove/Chelsea copy.webp" alt="Chelsea" className="lp1-emp-img" />
                      <span className="lp1-emp-status-dot"></span>
                    </div>
                    <div className="lp1-emp-name">Chelsea</div>
                    <div className="lp1-emp-role">Data<br />Infrastructure</div>
                  </div>
                </div>

                {/* Row 2: 6 Agents */}
                <div className="lp1-emp-row lp1-emp-row-6">
                  <div className="lp1-emp-card">
                    <div className="lp1-emp-img-box">
                      <img src="/images/agent_bg remove/Corolla copy.webp" alt="Corolla" className="lp1-emp-img" />
                      <span className="lp1-emp-status-dot"></span>
                    </div>
                    <div className="lp1-emp-name">Corolla</div>
                    <div className="lp1-emp-role">People<br />Operations</div>
                  </div>

                  <div className="lp1-emp-card">
                    <div className="lp1-emp-img-box">
                      <img src="/images/agent_bg remove/Neo copy.webp" alt="Neo" className="lp1-emp-img" />
                      <span className="lp1-emp-status-dot"></span>
                    </div>
                    <div className="lp1-emp-name">Neo</div>
                    <div className="lp1-emp-role">Engineering<br />Graduate</div>
                  </div>

                  <div className="lp1-emp-card">
                    <div className="lp1-emp-img-box">
                      <img src="/images/agent_bg remove/Robert copy.webp" alt="Robert" className="lp1-emp-img" />
                      <span className="lp1-emp-status-dot"></span>
                    </div>
                    <div className="lp1-emp-name">Robert</div>
                    <div className="lp1-emp-role">Enterprise<br />Consultant</div>
                  </div>

                  <div className="lp1-emp-card">
                    <div className="lp1-emp-img-box">
                      <img src="/images/agent_bg remove/Shiro copy.webp" alt="Shiro" className="lp1-emp-img" />
                      <span className="lp1-emp-status-dot"></span>
                    </div>
                    <div className="lp1-emp-name">Shiro</div>
                    <div className="lp1-emp-role">Growth<br />Strategist</div>
                  </div>

                  <div className="lp1-emp-card">
                    <div className="lp1-emp-img-box">
                      <img src="/images/agent_bg remove/Morris copy.webp" alt="Morris" className="lp1-emp-img" />
                      <span className="lp1-emp-status-dot"></span>
                    </div>
                    <div className="lp1-emp-name">Morris</div>
                    <div className="lp1-emp-role">Security<br />Specialist</div>
                  </div>

                  <div className="lp1-emp-card">
                    <div className="lp1-emp-img-box">
                      <img src="/images/agent_bg remove/Lucy copy.webp" alt="Lucy" className="lp1-emp-img" />
                      <span className="lp1-emp-status-dot"></span>
                    </div>
                    <div className="lp1-emp-name">Lucy</div>
                    <div className="lp1-emp-role">Digital Marketing<br />Creator</div>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Bottom Results Ribbon Bar */}
          <div className="lp1-results-banner">
            <div className="lp1-results-header">
              AGENTS WORK TOGETHER & DELIVER RESULTS
            </div>
            
            <div className="lp1-results-row-inner">
              <div className="lp1-results-pills">
                <div className="lp1-res-pill"><span className="check">✓</span> Leads Generated</div>
                <div className="lp1-res-pill"><span className="check">✓</span> Reports Created</div>
                <div className="lp1-res-pill"><span className="check">✓</span> Tasks Completed</div>
                <div className="lp1-res-pill"><span className="check">✓</span> Insights Delivered</div>
              </div>

              <div className="lp1-results-arrow">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>

              <button 
                className="lp1-primary-btn"
                style={{ padding: '14px 32px', fontSize: '0.98rem', whiteSpace: 'nowrap' }}
                onClick={() => document.getElementById('founder-qualification-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span>See How It Works</span>
                <span className="arrow">→</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* WHY JUST $99/MONTH? PRICING COMPARISON SECTION */}
      <section className="lp1-pricing-section">
        <div className="lp1-pricing-container">
          
          {/* Badge */}
          <div className="lp1-pricing-badge-wrap">
            <div className="lp1-pricing-badge">
              <span className="lp1-pricing-badge-icon">⚡</span>
              <span>ALL-IN-ONE AI BUSINESS OS</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="lp1-pricing-title">
            Why Just <span className="lp1-gold-highlight">$99/Month?</span>
          </h2>
          <p className="lp1-pricing-subtitle">
            One Platform. <span className="lp1-purple-text" style={{ fontWeight: 700 }}>12 AI Employees.</span> All Your Business Needs.
          </p>

          {/* Comparison Table Card */}
          <div className="lp1-pcard lp1-compare-table-card">
            <table className="lp1-compare-table">
              <thead>
                <tr>
                  <th style={{ width: '45%' }}>FEATURES</th>
                  <th className="th-center" style={{ width: '27%' }}>OTHER PLATFORMS</th>
                  <th className="th-center th-mingrow" style={{ width: '28%', color: '#a78bfa' }}>MINGROW</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="td-feature"><span className="icon">📁</span> Multiple Tools</td>
                  <td className="td-other bad">✕ Multiple</td>
                  <td className="td-mingrow good">✓ One Platform</td>
                </tr>
                <tr>
                  <td className="td-feature"><span className="icon">🤖</span> AI Employees</td>
                  <td className="td-other bad">✕ None</td>
                  <td className="td-mingrow good">✓ 12 AI Employees</td>
                </tr>
                <tr>
                  <td className="td-feature"><span className="icon">👤</span> Sales & CRM</td>
                  <td className="td-other warn">▲ Separate</td>
                  <td className="td-mingrow good">✓ Included</td>
                </tr>
                <tr>
                  <td className="td-feature"><span className="icon">👔</span> HR Management</td>
                  <td className="td-other warn">▲ Separate</td>
                  <td className="td-mingrow good">✓ Included</td>
                </tr>
                <tr>
                  <td className="td-feature"><span className="icon">💲</span> Finance Management</td>
                  <td className="td-other warn">▲ Separate</td>
                  <td className="td-mingrow good">✓ Included</td>
                </tr>
                <tr>
                  <td className="td-feature"><span className="icon">📊</span> Project Management</td>
                  <td className="td-other warn">▲ Separate</td>
                  <td className="td-mingrow good">✓ Included</td>
                </tr>
                <tr>
                  <td className="td-feature"><span className="icon">📢</span> Marketing & Operations</td>
                  <td className="td-other warn">▲ Separate</td>
                  <td className="td-mingrow good">✓ Included</td>
                </tr>
                <tr>
                  <td className="td-feature"><span className="icon">⚡</span> 24/7 Automation</td>
                  <td className="td-other bad">✕ No</td>
                  <td className="td-mingrow good">✓ Included</td>
                </tr>
                <tr>
                  <td className="td-feature"><span className="icon">🖥️</span> Dashboard</td>
                  <td className="td-other bad">✕ No</td>
                  <td className="td-mingrow good">✓ One Dashboard</td>
                </tr>
                <tr>
                  <td className="td-feature"><span className="icon">⚙️</span> Easy to Manage</td>
                  <td className="td-other warn">▲ Limited</td>
                  <td className="td-mingrow good">✓ Complete</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Main Price Box */}
          <div className="lp1-main-price-card" style={{ maxWidth: '780px', margin: '0 auto 16px auto', padding: '20px 28px', gap: '16px' }}>
            <div className="lp1-mpc-top">
              <span className="lp1-mpc-lead" style={{ fontSize: '0.85rem' }}>All of this for just</span>
              <div className="lp1-mpc-price">
                <span className="dollar" style={{ fontSize: '3.2rem' }}>$99</span>
                <span className="period" style={{ fontSize: '1rem' }}>/Month</span>
              </div>
            </div>

            <div className="lp1-mpc-icons-row" style={{ maxWidth: '700px', gap: '10px' }}>
              <div className="lp1-mpc-icon-item" style={{ gap: '4px' }}>
                <div className="icon" style={{ fontSize: '1.25rem' }}>🤖</div>
                <div className="text" style={{ fontSize: '0.72rem' }}><strong>12 AI</strong><br />Employees</div>
              </div>
              <div className="lp1-mpc-icon-item" style={{ gap: '4px' }}>
                <div className="icon" style={{ fontSize: '1.25rem' }}>📄</div>
                <div className="text" style={{ fontSize: '0.72rem' }}><strong>All Business</strong><br />Functions</div>
              </div>
              <div className="lp1-mpc-icon-item" style={{ gap: '4px' }}>
                <div className="icon" style={{ fontSize: '1.25rem' }}>💻</div>
                <div className="text" style={{ fontSize: '0.72rem' }}><strong>One</strong><br />Dashboard</div>
              </div>
              <div className="lp1-mpc-icon-item" style={{ gap: '4px' }}>
                <div className="icon" style={{ fontSize: '1.25rem' }}>⚡</div>
                <div className="text" style={{ fontSize: '0.72rem' }}><strong>Automations</strong><br />24/7</div>
              </div>
              <div className="lp1-mpc-icon-item" style={{ gap: '4px' }}>
                <div className="icon" style={{ fontSize: '1.25rem' }}>🎁</div>
                <div className="text" style={{ fontSize: '0.72rem' }}><strong>Free</strong><br />Onboarding</div>
              </div>
            </div>
          </div>

          {/* Bottom Founder Ribbon Banner */}
          <div className="lp1-founder-ribbon" style={{ maxWidth: '780px', margin: '0 auto', padding: '14px 24px', gap: '14px' }}>
            <div className="lp1-fr-item" style={{ gap: '10px' }}>
              <div className="icon" style={{ fontSize: '1.35rem' }}>🎁</div>
              <div className="text">
                <div className="title" style={{ fontSize: '0.85rem' }}>Founding 100 Companies Offer</div>
                <div className="sub" style={{ fontSize: '0.72rem' }}>Limited spots with exclusive benefits.</div>
              </div>
            </div>

            <div className="lp1-fr-divider" style={{ height: '32px' }}></div>

            <div className="lp1-fr-item" style={{ gap: '10px' }}>
              <div className="icon" style={{ fontSize: '1.35rem' }}>🛡</div>
              <div className="text">
                <div className="title" style={{ fontSize: '0.85rem' }}>Limited Spots Available</div>
                <div className="sub" style={{ fontSize: '0.72rem' }}>We work with a limited number of businesses each month.</div>
              </div>
            </div>

            <div className="lp1-fr-cta" style={{ gap: '2px' }}>
              <button
                className="lp1-watch-demo-btn"
                style={{ padding: '9px 20px', fontSize: '0.82rem' }}
                onClick={() => document.getElementById('founder-qualification-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span>Check My Eligibility</span>
                <span>→</span>
              </button>
              <span className="lp1-fr-lock" style={{ fontSize: '0.68rem', marginTop: '2px' }}>🔒 Unlock Your Founder Offer</span>
            </div>
          </div>

        </div>
      </section>

      {/* YOU'RE NOT BUYING SOFTWARE SECTION */}
      <section className="lp1-results-benefits-section">
        <div className="lp1-benefits-container">
          
          {/* Badge */}
          <div className="lp1-benefits-badge-wrap">
            <div className="lp1-benefits-badge">
              <span className="lp1-benefits-badge-icon">✓</span>
              <span>WHAT YOU'LL GET</span>
            </div>
          </div>

          {/* Heading */}
          <h2 className="lp1-benefits-title">
            You're Not Buying Software.<br />
            <span className="lp1-benefits-gradient">You're Investing in Better<br />Business Results.</span>
          </h2>

          {/* 8 Cards Grid (4x2) */}
          <div className="lp1-benefits-grid">
            
            {/* Card 1 */}
            <div className="lp1-benefit-card">
              <div className="lp1-bcard-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h3>Save Time</h3>
              <p>Reclaim 20+ hours every week from repetitive work.</p>
            </div>

            {/* Card 2 */}
            <div className="lp1-benefit-card">
              <div className="lp1-bcard-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <h3>Capture More Leads</h3>
              <p>Every enquiry is followed up within minutes.</p>
            </div>

            {/* Card 3 */}
            <div className="lp1-benefit-card">
              <div className="lp1-bcard-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              <h3>Reduce Costs</h3>
              <p>Replace scattered tools and manual overhead.</p>
            </div>

            {/* Card 4 */}
            <div className="lp1-benefit-card">
              <div className="lp1-bcard-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polygon points="12 6 12 12 16 14"></polygon>
                </svg>
              </div>
              <h3>Faster Decisions</h3>
              <p>Live numbers and insights, ready when you are.</p>
            </div>

            {/* Card 5 */}
            <div className="lp1-benefit-card">
              <div className="lp1-bcard-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </div>
              <h3>Better Customer Experience</h3>
              <p>Instant, consistent responses 24/7.</p>
            </div>

            {/* Card 6 */}
            <div className="lp1-benefit-card">
              <div className="lp1-bcard-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3>Organized Team</h3>
              <p>Clear ownership, tasks and pipelines in one place.</p>
            </div>

            {/* Card 7 */}
            <div className="lp1-benefit-card">
              <div className="lp1-bcard-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
              </div>
              <h3>24/7 Productivity</h3>
              <p>Your AI workforce never sleeps or takes leave.</p>
            </div>

            {/* Card 8 */}
            <div className="lp1-benefit-card">
              <div className="lp1-bcard-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                  <polyline points="17 6 23 6 23 12"></polyline>
                </svg>
              </div>
              <h3>Business Growth</h3>
              <p>Scale output without scaling headcount.</p>
            </div>

          </div>

          {/* Bottom CTA */}
          <div className="lp1-benefits-bottom-cta">
            <button
              className="lp1-primary-btn"
              onClick={() => document.getElementById('founder-qualification-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span>Start Growing Faster</span>
              <span className="arrow">→</span>
            </button>
          </div>

        </div>
      </section>

      {/* BUSINESSES ALREADY RUNNING ON AN AI WORKFORCE SECTION */}
      <section className="lp1-social-proof-section">
        <div className="lp1-sp-container">
          
          {/* Badge */}
          <div className="lp1-sp-badge-wrap">
            <div className="lp1-sp-badge">
              <span className="lp1-sp-badge-icon">⭐</span>
              <span>LOVED BY OPERATORS</span>
            </div>
          </div>

          {/* Heading */}
          <h2 className="lp1-sp-title">
            Businesses Already Running on an <span className="lp1-purple-text">AI Workforce</span>
          </h2>

          {/* Testimonial Cards Row */}
          <div className="lp1-testimonials-grid">
            
            {/* Card 1 */}
            <div className="lp1-testimonial-card">
              <div className="lp1-quote-mark">“</div>
              <div className="lp1-stars">★★★★★</div>
              <p className="lp1-tcard-body">
                "We replaced four tools and two coordinator roles. Sidd assigns the work and everything just moves forward without me chasing anyone."
              </p>
              <div className="lp1-tcard-divider"></div>
              <div className="lp1-tcard-author">
                <div className="name">Rohan Mehta</div>
                <div className="role">Founder · Northline Interiors</div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="lp1-testimonial-card lp1-tcard-featured">
              <div className="lp1-quote-mark">“</div>
              <div className="lp1-stars">★★★★★</div>
              <p className="lp1-tcard-body">
                "Every lead gets followed up within minutes now. Our conversion rate nearly tripled in the first two months."
              </p>
              <div className="lp1-tcard-divider"></div>
              <div className="lp1-tcard-author">
                <div className="name">Aisha Kapoor</div>
                <div className="role">Managing Director · Brightpath Consulting</div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="lp1-testimonial-card">
              <div className="lp1-quote-mark">“</div>
              <div className="lp1-stars">★★★★★</div>
              <p className="lp1-tcard-body">
                "Finance, HR and projects finally live in one dashboard. I open it with my morning coffee and the reports are already there."
              </p>
              <div className="lp1-tcard-divider"></div>
              <div className="lp1-tcard-author">
                <div className="name">Daniel Osei</div>
                <div className="role">Operations Head · Vertex Logistics</div>
              </div>
            </div>

          </div>

          {/* Brand Names Bar */}
          <div className="lp1-brands-bar">
            <span>NORTHLINE</span>
            <span>BRIGHTPATH</span>
            <span>VERTEX</span>
            <span>CLARIQ</span>
            <span>MERIDIAN</span>
          </div>

          {/* Metrics Ribbon */}
          <div className="lp1-metrics-ribbon">
            <div className="lp1-metric-item">
              <div className="value">420+</div>
              <div className="label">Businesses onboarded</div>
            </div>
            <div className="lp1-metric-item">
              <div className="value">1.2M+</div>
              <div className="label">Tasks automated</div>
            </div>
            <div className="lp1-metric-item">
              <div className="value">96%</div>
              <div className="label">Would recommend</div>
            </div>
            <div className="lp1-metric-item">
              <div className="value">4.9/5</div>
              <div className="label">Average rating</div>
            </div>
          </div>

          {/* Bottom Eligibility Button */}
          <div className="lp1-sp-bottom-cta">
            <button
              className="lp1-eligibility-btn"
              onClick={() => document.getElementById('founder-qualification-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span>Check My Eligibility</span>
              <span className="arrow">→</span>
            </button>
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
          <h2 className="lp1-qual-title">
            Check Your Eligibility for <br className="lp1-mobile-br" /><span className="lp1-gold-gradient">Founder Offer</span>
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
                  <h3 className="lp1-qual-question">Are you ready to pay $99 ?</h3>
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
                      height="560" 
                      src="https://mingrow.cloud/forms/wtl/46165af2aa13031417b753d4870047eb" 
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
