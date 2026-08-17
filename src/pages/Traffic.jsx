import React, { useState, useEffect } from 'react';
import './traffic.css';

export default function Traffic() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    businessType: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: "What is Mingrow AI Business OS and how does it work?",
      answer: "Mingrow is an all-in-one AI Business Operating System that unifies Sales, Marketing, Finance, HR, Customer Support, and Analytics. Intelligent AI agents automate routine workflows across departments so your business runs efficiently on a single platform."
    },
    {
      question: "Can Mingrow integrate with my existing tools and business software?",
      answer: "Yes! Mingrow seamlessly connects with your existing CRMs, ERPs, accounting software, communication channels, and databases. Setup takes just minutes with zero disruption to your daily operations."
    },
    {
      question: "Is Mingrow suitable for small businesses and growing enterprises?",
      answer: "Absolutely. Mingrow is designed to scale flexibly. Whether you are a growing small business or an established enterprise, our adaptable AI agents adjust to your team size, workflows, and industry-specific requirements."
    },
    {
      question: "How secure is my company data on Mingrow?",
      answer: "We prioritize enterprise-grade security. Mingrow employs end-to-end data encryption (both in transit and at rest), strict role-based access controls, and adheres to global compliance standards to ensure your sensitive business data remains protected."
    },
    {
      question: "How quickly can our team get started with Mingrow?",
      answer: "Onboarding takes only a few minutes. Our guided wizard helps you connect your tools and activate your AI agents right away. Plus, our dedicated support team is available 24/7 to assist with onboarding and custom workflow setups."
    }
  ];

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.title = "Mingrow — The AI Business OS";
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="traffic-page-root">
      {/* Header with Logo, Center Text & Register Now Button */}
      <header className={`traffic-header ${scrolled ? 'header-floating' : 'header-expanded'}`}>
        <div className="traffic-header-bar">
          <img
            src="/images/logo/LOGO light theme.webp"
            alt="Mingrow THE AI BUSINESS OS"
            className="traffic-logo"
          />
          <div className="traffic-header-center-text">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="trust-badge-icon">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
            <span>Trusted By Businesses For 52+ Months</span>
          </div>
          <a
            href="https://mingrow.com/register"
            target="_blank"
            rel="noopener noreferrer"
            className="traffic-header-btn"
          >
            Register Now
          </a>
        </div>
      </header>

      {/* Hero Section matching the reference image layout */}
      <section className="traffic-hero">
        <div className="traffic-hero-bg">
          <img
            src="/images/traffic/hero 3.webp"
            alt="Mingrow Business Team"
            className="traffic-hero-img"
          />
          <div className="traffic-hero-overlay"></div>
        </div>

        <div className="traffic-hero-content">
          {/* Main Headline */}
          <h1 className="traffic-hero-title">
            The Next Generation <br className="desktop-br" />
            Of Business <span className="purple-text">Starts Today.</span>
          </h1>

          {/* Subtitle */}
          <p className="traffic-hero-subtitle">
            Mingrow OS helps businesses simplify operations, <br className="desktop-br" />
            streamline workflows, and build the foundation for sustainable growth.
          </p>

          {/* CTA Action Buttons */}
          <div className="traffic-cta-group">
            <a
              href="https://mingrow.com/register"
              target="_blank"
              rel="noopener noreferrer"
              className="traffic-btn-primary"
            >
              Start Free Trial <span className="btn-arrow">→</span>
            </a>

            <button
              className="traffic-btn-secondary"
              onClick={() => {
                const demoEl = document.getElementById('traffic-demo');
                if (demoEl) demoEl.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="play-icon">▶</span> Watch Demo
            </button>
          </div>

          {/* Social Proof / Avatars Pill */}
          <div className="traffic-social-proof">
            <div className="avatar-group">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="User 1" />
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="User 2" />
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" alt="User 3" />
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="User 4" />
            </div>
            <span className="proof-text">
              Loved by <strong>10,000+</strong> businesses
            </span>
          </div>

          {/* Down Chevron Arrow Indicator */}
          <div
            className="traffic-scroll-down"
            role="button"
            tabIndex={0}
            aria-label="Scroll to next section"
            onClick={() => {
              const demoEl = document.getElementById('traffic-demo');
              if (demoEl) demoEl.scrollIntoView({ behavior: 'smooth' });
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                const demoEl = document.getElementById('traffic-demo');
                if (demoEl) demoEl.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
      </section>

      {/* Section 2: Demo Section with Blank Video Frame */}
      <section className="traffic-demo-section" id="traffic-demo">
        <div className="traffic-demo-container">
          <div className="traffic-demo-header">
            <span className="traffic-demo-badge">PLATFORM DEMO</span>
            <h2 className="traffic-demo-title">See Mingrow AI in Action</h2>
            <p className="traffic-demo-subtitle">
              Watch how our intelligent agents seamlessly handle workflows, automate client interactions, and scale your business operations.
            </p>
          </div>
          
          <div className="traffic-video-frame">
            <div className="traffic-video-topbar">
              <div className="traffic-window-dots">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>
              <div className="traffic-window-title">mingrow-demo.mp4</div>
            </div>
            <div className="traffic-blank-video-content">
              <div className="traffic-video-placeholder">
                <div className="play-button-outer">
                  <div className="play-button-inner">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </div>
                </div>
                <span className="video-placeholder-text">Video Demo Frame</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Built for Every Industry (Matching Reference Image) */}
      <section className="traffic-industry-section">
        <div className="traffic-industry-container">
          {/* Top Row: Left Text & Right Platform Hub Diagram */}
          <div className="traffic-industry-top">
            <div className="traffic-industry-left">
              <div className="traffic-industry-tag">
                <span className="tag-text">BUILT FOR EVERY INDUSTRY</span>
                <div className="tag-line"></div>
              </div>
              <h2 className="traffic-industry-heading">
                One Platform. <br className="desktop-br" />
                <span className="purple-text">Every Industry.</span>
              </h2>
              <p className="traffic-industry-subtext">
                Mingrow's AI agents adapt to your industry, understand your workflows, and drive real results.
              </p>
            </div>

            <div className="traffic-hub-diagram">
              <div className="hub-center-glow"></div>
              
              {/* Center Logo Hub */}
              <div className="hub-center-card">
                <img
                  src="/images/logo/favicon.webp"
                  alt="Mingrow Hub Logo"
                  className="hub-logo-img"
                  loading="lazy"
                  decoding="async"
                  width="100"
                  height="100"
                />
              </div>

              {/* Connecting Lines */}
              <svg className="hub-lines-svg" viewBox="0 0 400 300" fill="none">
                <line x1="110" y1="70" x2="165" y2="120" stroke="#DDD6FE" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="290" y1="70" x2="235" y2="120" stroke="#DDD6FE" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="110" y1="230" x2="165" y2="180" stroke="#DDD6FE" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="290" y1="230" x2="235" y2="180" stroke="#DDD6FE" strokeWidth="2" strokeDasharray="4 4" />
              </svg>

              <div className="traffic-hub-nodes-container">
                {/* Satellite Node 1: Top Left */}
                <div className="hub-node hub-node-tl">
                  <div className="node-icon-wrapper">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z"></path>
                      <path d="M9 21h6"></path>
                    </svg>
                  </div>
                  <div className="node-text">
                    <div className="node-title">Understand</div>
                    <div className="node-desc">Your Industry</div>
                  </div>
                </div>

                {/* Satellite Node 2: Top Right */}
                <div className="hub-node hub-node-tr">
                  <div className="node-icon-wrapper">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="4" y1="21" x2="4" y2="14"></line>
                      <line x1="4" y1="10" x2="4" y2="3"></line>
                      <line x1="12" y1="21" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12" y2="3"></line>
                      <line x1="20" y1="21" x2="20" y2="16"></line>
                      <line x1="20" y1="12" x2="20" y2="3"></line>
                      <line x1="1" y1="14" x2="7" y2="14"></line>
                      <line x1="9" y1="8" x2="15" y2="8"></line>
                      <line x1="17" y1="16" x2="23" y2="16"></line>
                    </svg>
                  </div>
                  <div className="node-text">
                    <div className="node-title">Adapt</div>
                    <div className="node-desc">To Your Workflows</div>
                  </div>
                </div>

                {/* Satellite Node 3: Bottom Left */}
                <div className="hub-node hub-node-bl">
                  <div className="node-icon-wrapper">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                    </svg>
                  </div>
                  <div className="node-text">
                    <div className="node-title">Automate</div>
                    <div className="node-desc">What Matters</div>
                  </div>
                </div>

                {/* Satellite Node 4: Bottom Right */}
                <div className="hub-node hub-node-br">
                  <div className="node-icon-wrapper">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <circle cx="12" cy="12" r="6"></circle>
                      <circle cx="12" cy="12" r="2"></circle>
                    </svg>
                  </div>
                  <div className="node-text">
                    <div className="node-title">Drive</div>
                    <div className="node-desc">Real Results</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Grid: 6 Industry Cards */}
          <div className="traffic-industry-grid">
            {/* Card 1: Real Estate */}
            <div className="industry-card">
              <div className="industry-icon-circle">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
                  <line x1="9" y1="6" x2="9" y2="6.01"></line>
                  <line x1="15" y1="6" x2="15" y2="6.01"></line>
                  <line x1="9" y1="10" x2="9" y2="10.01"></line>
                  <line x1="15" y1="10" x2="15" y2="10.01"></line>
                  <line x1="9" y1="14" x2="9" y2="14.01"></line>
                  <line x1="15" y1="14" x2="15" y2="14.01"></line>
                  <path d="M10 22v-4h4v4"></path>
                </svg>
              </div>
              <h3 className="industry-card-title">Real Estate</h3>
              <p className="industry-card-desc">
                Manage leads, properties, and clients effortlessly.
              </p>
              <div className="card-purple-indicator"></div>
            </div>

            {/* Card 2: E-commerce */}
            <div className="industry-card">
              <div className="industry-icon-circle">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
              </div>
              <h3 className="industry-card-title">E-commerce</h3>
              <p className="industry-card-desc">
                Automate orders, tracking, and customer support.
              </p>
              <div className="card-purple-indicator"></div>
            </div>

            {/* Card 3: Healthcare */}
            <div className="industry-card">
              <div className="industry-icon-circle">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.72-8.72 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  <path d="M12 8v8"></path>
                  <path d="M8 12h8"></path>
                </svg>
              </div>
              <h3 className="industry-card-title">Healthcare</h3>
              <p className="industry-card-desc">
                Streamline appointments, records, and patient care.
              </p>
              <div className="card-purple-indicator"></div>
            </div>

            {/* Card 4: Education */}
            <div className="industry-card">
              <div className="industry-icon-circle">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                </svg>
              </div>
              <h3 className="industry-card-title">Education</h3>
              <p className="industry-card-desc">
                Manage students, courses, and communication easily.
              </p>
              <div className="card-purple-indicator"></div>
            </div>

            {/* Card 5: Finance */}
            <div className="industry-card">
              <div className="industry-icon-circle">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="21" x2="21" y2="21"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                  <path d="M5 10v11M9 10v11M15 10v11M19 10v11"></path>
                  <path d="M12 2L3 7h18z"></path>
                </svg>
              </div>
              <h3 className="industry-card-title">Finance</h3>
              <p className="industry-card-desc">
                Automate reports, compliance, and client management.
              </p>
              <div className="card-purple-indicator"></div>
            </div>

            {/* Card 6: Manufacturing */}
            <div className="industry-card">
              <div className="industry-icon-circle">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
              </div>
              <h3 className="industry-card-title">Manufacturing</h3>
              <p className="industry-card-desc">
                Optimize operations, supply chains, and productivity.
              </p>
              <div className="card-purple-indicator"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: How Mingrow Works & Everything In One Place */}
      <section className="traffic-works-section">
        <div className="traffic-works-container">
          {/* Top Part: Header Left + 5 Steps Right */}
          <div className="traffic-works-top">
            {/* Left Header Info */}
            <div className="traffic-works-header-left">
              <div className="traffic-works-tag">
                <span className="tag-text">HOW MINGROW WORKS</span>
                <div className="tag-line"></div>
              </div>
              <h2 className="traffic-works-heading">
                Simple. Smart. <br className="desktop-br" />
                <span className="purple-text">Seamless.</span>
              </h2>
              <p className="traffic-works-subtext">
                Mingrow combines AI and automation to handle your daily business operations so you can focus on what truly matters — growing your business.
              </p>
            </div>

            {/* Right: 5 Process Steps */}
            <div className="traffic-steps-wrapper">
              <div className="traffic-steps-row">
                {/* Step 1 */}
                <div className="traffic-step-item">
                  <div className="step-halo">
                    <div className="step-badge">01</div>
                    <div className="step-icon-circle">
                      <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                        <path d="M12 11C13.6569 11 15 9.65685 15 8C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8C9 9.65685 10.3431 11 12 11Z" fill="#5E26E6" />
                        <path d="M12 13C8.68629 13 6 15.6863 6 19H14.1C13.4 18.1 13 17.1 13 16C13 14.8 13.5 13.7 14.3 13.1C13.6 13 12.8 13 12 13Z" fill="#5E26E6" />
                        <circle cx="17.5" cy="16.5" r="3.5" fill="#5E26E6" />
                        <path d="M17.5 14.5V18.5M15.5 16.5H19.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="step-title">Connect</h3>
                  <p className="step-desc">Onboard in minutes and connect your teams, tools, and data.</p>
                </div>

                <div className="step-arrow">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5914b0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="4" y1="12" x2="20" y2="12"></line>
                    <polyline points="14 6 20 12 14 18"></polyline>
                  </svg>
                </div>

                {/* Step 2 */}
                <div className="traffic-step-item">
                  <div className="step-halo">
                    <div className="step-badge">02</div>
                    <div className="step-icon-circle">
                      <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                        <rect x="4" y="4" width="7" height="7" rx="2" fill="#E5E7EB" />
                        <rect x="13" y="4" width="7" height="7" rx="2" fill="#5E26E6" />
                        <rect x="4" y="13" width="7" height="7" rx="2" fill="#E5E7EB" />
                        <rect x="13" y="13" width="7" height="7" rx="2" fill="#E5E7EB" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="step-title">Configure</h3>
                  <p className="step-desc">Customize workflows and set automation as per your business needs.</p>
                </div>

                <div className="step-arrow">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5914b0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="4" y1="12" x2="20" y2="12"></line>
                    <polyline points="14 6 20 12 14 18"></polyline>
                  </svg>
                </div>

                {/* Step 3 */}
                <div className="traffic-step-item">
                  <div className="step-halo">
                    <div className="step-badge">03</div>
                    <div className="step-icon-circle">
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                        <rect x="4" y="9" width="16" height="11" rx="4" fill="#5E26E6" />
                        <circle cx="12" cy="4" r="1.5" fill="#5E26E6" />
                        <line x1="12" y1="5.5" x2="12" y2="9" stroke="#5E26E6" strokeWidth="2" />
                        <rect x="2" y="12.5" width="2" height="4" rx="1" fill="#5E26E6" />
                        <rect x="20" y="12.5" width="2" height="4" rx="1" fill="#5E26E6" />
                        <rect x="6.5" y="11.5" width="11" height="6" rx="2" fill="#FFFFFF" />
                        <circle cx="9.5" cy="14.5" r="1.2" fill="#5E26E6" />
                        <circle cx="14.5" cy="14.5" r="1.2" fill="#5E26E6" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="step-title">Automate</h3>
                  <p className="step-desc">Mingrow AI gets to work automating tasks across departments in real-time.</p>
                </div>

                <div className="step-arrow">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5914b0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="4" y1="12" x2="20" y2="12"></line>
                    <polyline points="14 6 20 12 14 18"></polyline>
                  </svg>
                </div>

                {/* Step 4 */}
                <div className="traffic-step-item">
                  <div className="step-halo">
                    <div className="step-badge">04</div>
                    <div className="step-icon-circle">
                      <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                        <path d="M4 18L10 12L14 15L20 8" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="20" cy="8" r="2" fill="#5E26E6" />
                        <rect x="5" y="16" width="3" height="4" rx="1" fill="#5E26E6" opacity="0.6" />
                        <rect x="11" y="12" width="3" height="8" rx="1" fill="#5E26E6" opacity="0.8" />
                        <rect x="17" y="9" width="3" height="11" rx="1" fill="#5E26E6" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="step-title">Monitor</h3>
                  <p className="step-desc">Get real-time visibility and insights on every operations and metric.</p>
                </div>

                <div className="step-arrow">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5914b0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="4" y1="12" x2="20" y2="12"></line>
                    <polyline points="14 6 20 12 14 18"></polyline>
                  </svg>
                </div>

                {/* Step 5 (Filled purple circle matching reference image) */}
                <div className="traffic-step-item">
                  <div className="step-halo">
                    <div className="step-badge">05</div>
                    <div className="step-icon-circle step-circle-filled">
                      <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                        <path d="M6 12L10 16L18 7" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="step-title">Grow</h3>
                  <p className="step-desc">Save time, cut costs, improve efficiency and scale your business with confidence.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Card: Everything In One Place */}
          <div className="traffic-all-in-one-card">
            <div className="traffic-all-in-one-left">
              <div className="dashboard-img-wrapper">
                <img
                  src="/images/traffic/dashboard 2 .webp"
                  alt="Mingrow Dashboard"
                  className="traffic-dashboard-preview-img"
                />
              </div>
            </div>

            <div className="traffic-all-in-one-right">
              <h2 className="all-in-one-title">Everything In One Place</h2>
              <p className="all-in-one-subtitle">
                From sales and finance to projects and support — manage everything, track progress, and make smarter decisions from a single dashboard.
              </p>

              {/* 3 columns x 2 rows feature grid matching ref image */}
              <div className="all-in-one-features-grid">
                {/* Feature 1 */}
                <div className="all-in-one-feature-item">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5914b0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" rx="1.5"></rect>
                    <rect x="14" y="3" width="7" height="7" rx="1.5"></rect>
                    <rect x="14" y="14" width="7" height="7" rx="1.5"></rect>
                    <rect x="3" y="14" width="7" height="7" rx="1.5"></rect>
                  </svg>
                  <span className="feature-item-text">Unified Dashboard</span>
                </div>

                {/* Feature 2 */}
                <div className="all-in-one-feature-item">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5914b0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
                    <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
                  </svg>
                  <span className="feature-item-text">Real-time Insights</span>
                </div>

                {/* Feature 3 */}
                <div className="all-in-one-feature-item">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5914b0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  <span className="feature-item-text">Cross-Team Collaboration</span>
                </div>

                {/* Feature 4 */}
                <div className="all-in-one-feature-item">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5914b0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                  </svg>
                  <span className="feature-item-text">Smart Alerts</span>
                </div>

                {/* Feature 5 */}
                <div className="all-in-one-feature-item">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5914b0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    <polygon points="12 8 13.5 11 17 11.5 14.5 14 15 17.5 12 15.8 9 17.5 9.5 14 7 11.5 10.5 11 12 8"></polygon>
                  </svg>
                  <span className="feature-item-text">Data Security</span>
                </div>

                {/* Feature 6 */}
                <div className="all-in-one-feature-item">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5914b0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                    <polyline points="2 17 12 22 22 17"></polyline>
                    <polyline points="2 12 12 17 22 12"></polyline>
                  </svg>
                  <span className="feature-item-text">Scalable Architecture</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Why Choose Mingrow - Comparison Matrix */}
      <section className="traffic-compare-section">
        <div className="traffic-compare-container">
          {/* Header */}
          <div className="traffic-compare-header">
            <span className="traffic-compare-badge">Why Choose Mingrow?</span>
            <h2 className="traffic-compare-title">
              Not Just Another Agent Platform. <br className="desktop-br" />
              A Complete <span className="purple-text">Business Operating System.</span>
            </h2>
            <p className="traffic-compare-subtitle">
              While others offer isolated AI agents for one task, Mingrow brings everything together - <br className="desktop-br" />
              Sales, Marketing, Finance, HR and more — on one intelligent platform.
            </p>
          </div>

          {/* Table / Grid */}
          <div className="traffic-compare-table-wrapper">
            <div className="traffic-compare-grid">
              {/* Column 1: What They Focus On */}
              <div className="compare-col compare-col-focus">
                <div className="compare-card-header">
                  <div className="compare-header-icon-bg">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <circle cx="12" cy="12" r="6"></circle>
                      <circle cx="12" cy="12" r="2"></circle>
                    </svg>
                  </div>
                  <h3 className="compare-col-title">What They Focus On</h3>
                </div>
                <div className="compare-rows-list">
                  <div className="compare-row-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    <span>Sales & Lead Management</span>
                  </div>
                  <div className="compare-row-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
                      <path d="M18.36 18.36A9 9 0 0 1 5.64 5.64"></path>
                      <polygon points="11 6 11 11 16 11 11 6"></polygon>
                    </svg>
                    <span>Marketing Automation</span>
                  </div>
                  <div className="compare-row-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="4" y="2" width="16" height="20" rx="2"></rect>
                      <line x1="8" y1="6" x2="16" y2="6"></line>
                      <line x1="16" y1="14" x2="16" y2="18"></line>
                      <line x1="8" y1="10" x2="8" y2="10.01"></line>
                      <line x1="12" y1="10" x2="12" y2="10.01"></line>
                      <line x1="16" y1="10" x2="16" y2="10.01"></line>
                      <line x1="8" y1="14" x2="8" y2="14.01"></line>
                      <line x1="12" y1="14" x2="12" y2="14.01"></line>
                      <line x1="8" y1="18" x2="8" y2="18.01"></line>
                      <line x1="12" y1="18" x2="12" y2="18.01"></line>
                    </svg>
                    <span>Finance & Accounting</span>
                  </div>
                  <div className="compare-row-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <circle cx="19" cy="11" r="2"></circle>
                      <path d="M19 15v4"></path>
                    </svg>
                    <span>HR & People Management</span>
                  </div>
                  <div className="compare-row-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
                    </svg>
                    <span>Customer Support</span>
                  </div>
                  <div className="compare-row-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="9" y1="15" x2="15" y2="15"></line>
                    </svg>
                    <span>Project & Task Management</span>
                  </div>
                  <div className="compare-row-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="20" x2="18" y2="10"></line>
                      <line x1="12" y1="20" x2="12" y2="4"></line>
                      <line x1="6" y1="20" x2="6" y2="14"></line>
                    </svg>
                    <span>Business Analytics</span>
                  </div>
                  <div className="compare-row-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="3"></circle>
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                    </svg>
                    <span>End-to-End Automation</span>
                  </div>
                </div>
              </div>

              {/* Column 2: Mingrow (Featured Column) */}
              <div className="compare-col compare-col-mingrow">
                <div className="compare-card-header mingrow-header">
                  <div className="mingrow-title-row">
                    <img
                      src="/images/logo/LOGO Dark theme .webp"
                      alt="Mingrow"
                      className="mingrow-header-logo-img"
                    />
                  </div>
                  <span className="mingrow-header-badge">All-in-One Business OS</span>
                </div>
                <div className="compare-rows-list mingrow-rows">
                  {[...Array(8)].map((_, i) => (
                    <div className="compare-row-check" key={i}>
                      <span className="check-badge check-active">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 3: Platform A */}
              <div className="compare-col compare-col-other">
                <div className="compare-card-header">
                  <div className="compare-header-icon-subtle">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="20" x2="18" y2="10"></line>
                      <line x1="12" y1="20" x2="12" y2="4"></line>
                      <line x1="6" y1="20" x2="6" y2="14"></line>
                    </svg>
                  </div>
                  <div>
                    <h3 className="compare-col-title-other">Platform A</h3>
                    <span className="compare-col-subtext">(Specialized Agent)</span>
                  </div>
                </div>
                <div className="compare-rows-list">
                  {/* Rows: 1, 2, 7 check */}
                  {[true, true, false, false, false, false, true, false].map((active, i) => (
                    <div className="compare-row-check" key={i}>
                      {active ? (
                        <span className="check-badge check-active">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </span>
                      ) : (
                        <span className="check-dash">—</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 4: Platform B */}
              <div className="compare-col compare-col-other">
                <div className="compare-card-header">
                  <div className="compare-header-icon-subtle">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="compare-col-title-other">Platform B</h3>
                    <span className="compare-col-subtext">(Specialized Agent)</span>
                  </div>
                </div>
                <div className="compare-rows-list">
                  {/* Rows: 2, 5 check */}
                  {[false, true, false, false, true, false, false, false].map((active, i) => (
                    <div className="compare-row-check" key={i}>
                      {active ? (
                        <span className="check-badge check-active">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </span>
                      ) : (
                        <span className="check-dash">—</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 5: Platform C */}
              <div className="compare-col compare-col-other">
                <div className="compare-card-header">
                  <div className="compare-header-icon-subtle">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="3"></circle>
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="compare-col-title-other">Platform C</h3>
                    <span className="compare-col-subtext">(Specialized Agent)</span>
                  </div>
                </div>
                <div className="compare-rows-list">
                  {/* Rows: 3, 4, 6 check */}
                  {[false, false, true, true, false, true, false, false].map((active, i) => (
                    <div className="compare-row-check" key={i}>
                      {active ? (
                        <span className="check-badge check-active">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </span>
                      ) : (
                        <span className="check-dash">—</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Banner */}
          <div className="traffic-compare-banner">
            <div className="compare-banner-left">
              <div className="banner-icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
              </div>
              <span className="compare-banner-text">
                <strong>Mingrow</strong> = One Platform. All Business Functions. <strong className="purple-highlight">Zero Switching.</strong>
              </span>
            </div>
            <a
              href="https://mingrow.com/register"
              target="_blank"
              rel="noopener noreferrer"
              className="compare-banner-btn"
            >
              Grow with Mingrow <span className="btn-arrow">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Section 6: FAQ Section */}
      <section id="traffic-faq" className="traffic-faq-section">
        <div className="traffic-faq-container">
          <div className="traffic-faq-header">
            <h2 className="traffic-faq-heading">Frequently Asked Questions</h2>
          </div>

          <div className="traffic-faq-list">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`traffic-faq-item ${openFaq === index ? 'faq-open' : ''}`}
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <div className="traffic-faq-question-row">
                  <h3 className="traffic-faq-question">{faq.question}</h3>
                  <span className="traffic-faq-toggle-icon">
                    {openFaq === index ? '−' : '+'}
                  </span>
                </div>
                {openFaq === index && (
                  <div className="traffic-faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="traffic-footer">
        <div className="traffic-footer-inner">
          <div className="traffic-footer-left">
            <img
              src="/images/logo/LOGO light theme.webp"
              alt="Mingrow Logo"
              className="traffic-footer-logo"
            />
          </div>
          <p className="traffic-footer-copy">© {new Date().getFullYear()} Mingrow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
