import React, { useState } from 'react';
import './affiliate.css';

const AVATARS = [
  { name: 'Sidd', role: 'AI Architect', img: '/images/agent_bg remove/sidd copy.webp', angle: -90 },
  { name: 'Dan', role: 'Finance Professional', img: '/images/agent_bg remove/Dan copy.webp', angle: -60 },
  { name: 'Samora', role: 'Intelligence Analyst', img: '/images/agent_bg remove/Semora copy.webp', angle: -30 },
  { name: 'Serra', role: 'Customer Success', img: '/images/agent_bg remove/Serra copy.webp', angle: 0 },
  { name: 'Amit', role: 'Operations Coordinator', img: '/images/agent_bg remove/Amirk copy.webp', angle: 30 },
  { name: 'Chelsea', role: 'Data Infrastructure', img: '/images/agent_bg remove/Chelsea copy.webp', angle: 60 },
  { name: 'Lucy', role: 'Digital Marketing Creator', img: '/images/agent_bg remove/Lucy copy.webp', angle: 90 },
  { name: 'Morris', role: 'Security Specialist', img: '/images/agent_bg remove/Morris copy.webp', angle: 120 },
  { name: 'Shira', role: 'Growth Strategist', img: '/images/agent_bg remove/Shiro copy.webp', angle: 150 },
  { name: 'Robert', role: 'Enterprise Consultant', img: '/images/agent_bg remove/Robert copy.webp', angle: 180 },
  { name: 'Neo', role: 'Engineering Graduate', img: '/images/agent_bg remove/Neo copy.webp', angle: 210 },
  { name: 'Coralia', role: 'People Operations', img: '/images/agent_bg remove/Corolla copy.webp', angle: 240 },
];

const AGENTS_LIST = [
  { name: 'Sidd', role: 'AI Architect', desc: 'Designs smart AI solutions tailored to your needs.', img: '/images/agent_bg remove/sidd copy.webp', dot: '#635bff' },
  { name: 'Dan', role: 'Finance Professional', desc: 'Handles budgeting, forecasts, and financial reporting.', img: '/images/agent_bg remove/Dan copy.webp', dot: '#10b981' },
  { name: 'Samora', role: 'Intelligence Analyst', desc: 'Turns data into insights to help you make better decisions.', img: '/images/agent_bg remove/Semora copy.webp', dot: '#3b82f6' },
  { name: 'Serra', role: 'Customer Success', desc: 'Ensures happy customers and smooth onboarding at every step.', img: '/images/agent_bg remove/Serra copy.webp', dot: '#8b5cf6' },
  { name: 'Amit', role: 'Operations Coordinator', desc: 'Keeps operations running seamlessly and on schedule.', img: '/images/agent_bg remove/Amirk copy.webp', dot: '#f97316' },
  { name: 'Chelsea', role: 'Data Infrastructure', desc: 'Builds and manages secure, scalable data systems.', img: '/images/agent_bg remove/Chelsea copy.webp', dot: '#eab308' },

  { name: 'Coralia', role: 'People Operations', desc: 'Manages recruitment, engagement, and employee experience.', img: '/images/agent_bg remove/Corolla copy.webp', dot: '#ec4899' },
  { name: 'Neo', role: 'Engineering Graduate', desc: 'Supports development tasks and technical workflows.', img: '/images/agent_bg remove/Neo copy.webp', dot: '#06b6d4' },
  { name: 'Robert', role: 'Enterprise Consultant', desc: 'Understands your business and suggests the right solutions.', img: '/images/agent_bg remove/Robert copy.webp', dot: '#10b981' },
  { name: 'Shiro', role: 'Growth Strategist', desc: 'Creates growth plans and drives business expansion.', img: '/images/agent_bg remove/Shiro copy.webp', dot: '#ec4899' },
  { name: 'Morris', role: 'Security Specialist', desc: 'Protects your data and ensures compliance and safety.', img: '/images/agent_bg remove/Morris copy.webp', dot: '#10b981' },
  { name: 'Lucy', role: 'Digital Marketing Creator', desc: 'Creates content and campaigns that attract and convert.', img: '/images/agent_bg remove/Lucy copy.webp', dot: '#eab308' },
];

const FAQS = [
  {
    q: 'How much can I earn as a Mingrow Partner?',
    a: 'You earn a 20% recurring commission on every subscription referred through your partner link. As long as your referred customer stays active, you keep earning monthly.'
  },
  {
    q: 'When and how do I get paid?',
    a: 'Payouts are available as soon as your referral earnings reach $100. You can choose to get paid directly via UPI or Bank Transfer, or convert your earnings into Mingrow credits.'
  },
  {
    q: 'What is the cookie duration for referral links?',
    a: 'We offer a 90-day cookie window. If a user visits through your link and subscribes within 90 days, the sale will be credited to your account.'
  },
  {
    q: 'Is there any fee to join the Partner Program?',
    a: 'No, joining the Mingrow Partner Program is 100% free with no hidden costs or minimum commitments.'
  },
  {
    q: 'What marketing resources and support will I receive?',
    a: 'Partners gain access to high-converting banners, email templates, demo videos, and dedicated partner support to help you maximize your conversions.'
  }
];

export default function Affiliate() {
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="affiliate-page">
      {/* Top Navigation */}
      <header className="aff-nav">
        <div className="aff-nav-container">
          <a href="/" className="aff-logo-link">
            <img src="/images/logo/LOGO light theme.webp" alt="Mingrow Logo" className="aff-logo-img" />
          </a>
          <button className="aff-register-btn" onClick={() => setShowJoinModal(true)}>
            Join Now
          </button>
        </div>
      </header>

      {/* SECTION 1: HERO */}
      <section className="aff-hero-section">
        <div className="aff-hero-container">
          
          {/* Left Column */}
          <div className="aff-hero-left">
            <div className="aff-partner-pill">
              <span className="sparkle">✦</span> PARTNER PROGRAM
            </div>

            <h1 className="aff-hero-title">
              Join the <br />
              <span className="aff-title-gradient">Mingrow Ecosystem</span>
            </h1>

            {/* 5 Feature Cards Row */}
            <div className="aff-cards-grid">
              <div className="aff-card">
                <div className="aff-card-icon icon-pct">%</div>
                <h3 className="aff-card-title">20% Recurring Commission</h3>
                <p className="aff-card-desc">
                  Earn 20% every month from your referred customers for as long as they stay with Mingrow.
                </p>
              </div>

              <div className="aff-card">
                <div className="aff-card-icon icon-cal">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>
                <h3 className="aff-card-title">Monthly Payouts</h3>
                <p className="aff-card-desc">
                  Get paid automatically every month directly to your bank account.
                </p>
              </div>

              <div className="aff-card">
                <div className="aff-card-icon icon-gift">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 12 20 22 4 22 4 12"/>
                    <rect x="2" y="7" width="20" height="5"/>
                    <line x1="12" y1="22" x2="12" y2="7"/>
                    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
                    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
                  </svg>
                </div>
                <h3 className="aff-card-title">Marketing Resources</h3>
                <p className="aff-card-desc">
                  Access high-converting banners, landing pages, emails, and product videos.
                </p>
              </div>

              <div className="aff-card">
                <div className="aff-card-icon icon-users">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <h3 className="aff-card-title">Dedicated Support</h3>
                <p className="aff-card-desc">
                  Get onboarding help and a dedicated partner success manager.
                </p>
              </div>

              <div className="aff-card">
                <div className="aff-card-icon icon-shield">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <h3 className="aff-card-title">Long Cookie Duration</h3>
                <p className="aff-card-desc">
                  90-day cookie duration to ensure you get credit for your referrals.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="aff-hero-ctas">
              <button className="aff-btn-main" onClick={() => setShowJoinModal(true)}>
                Join Now <span className="arr">→</span>
              </button>

            </div>

            {/* Subtext */}
            <div className="aff-hero-subtext">
              <p>Partner with Mingrow and bring the power of AI workforce to businesses.</p>
              <p>Grow your network. Grow your income. <strong className="text-purple">Grow together.</strong></p>
            </div>
          </div>

          {/* Right Column: Visual Ecosystem Hub */}
          <div className="aff-hero-right">
            <div className="aff-ecosystem-wrapper">
              
              <div className="aff-glow-backdrop"></div>
              <div className="aff-ring ring-outer"></div>
              <div className="aff-ring ring-inner"></div>

              <svg className="aff-connecting-lines" viewBox="0 0 600 600">
                <circle cx="300" cy="300" r="210" fill="none" stroke="rgba(147, 51, 234, 0.15)" strokeWidth="1.5" strokeDasharray="4 4" />
                <circle cx="300" cy="300" r="140" fill="none" stroke="rgba(147, 51, 234, 0.25)" strokeWidth="1" />
                {AVATARS.map((av, i) => {
                  const rad = (av.angle * Math.PI) / 180;
                  const x = 300 + 210 * Math.cos(rad);
                  const y = 300 + 210 * Math.sin(rad);
                  return (
                    <line 
                      key={i} 
                      x1="300" 
                      y1="300" 
                      x2={x} 
                      y2={y} 
                      stroke="rgba(147, 51, 234, 0.12)" 
                      strokeWidth="1" 
                    />
                  );
                })}
              </svg>

              <div className="aff-avatars-container">
                {AVATARS.map((av, index) => {
                  const radius = 43;
                  const rad = (av.angle * Math.PI) / 180;
                  const left = 50 + radius * Math.cos(rad);
                  const top = 50 + radius * Math.sin(rad);

                  return (
                    <div 
                      key={index} 
                      className="aff-avatar-node" 
                      style={{ left: `${left}%`, top: `${top}%` }}
                    >
                      <div className="aff-avatar-card">
                        <img src={av.img} alt={av.name} className="aff-avatar-img" />
                        <div className="aff-avatar-info">
                          <span className="aff-avatar-name">{av.name}</span>
                          <span className="aff-avatar-role">{av.role}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="aff-center-hub">
                <div className="aff-hub-glow"></div>
                <div className="aff-center-logo-badge">
                  <img src="/images/logo/LOGO light theme.webp" alt="Mingrow" className="aff-hub-logo" />
                </div>
                
                <img 
                  src="/images/affilate/person.webp" 
                  alt="Mingrow Partner Handshake" 
                  className="aff-handshake-person-img" 
                />
              </div>

            </div>
          </div>

        </div>
      </section>


      {/* SECTION 3: MEET THE AI AGENTS */}
      <section className="aff-sec3-workforce">
        <div className="aff-sec3-container">
          
          <div className="aff-sec3-top-grid">
            
            <div className="aff-sec3-left">
              <div className="aff-sec3-pill">
                <span className="sparkle">✦</span> OUR AI WORKFORCE
              </div>

              <h2 className="aff-sec3-title">
                Meet the <span className="purple-text">AI Agents</span><br />
                Powering Every Department
              </h2>

              <p className="aff-sec3-desc">
                Mingrow's AI agents work 24/7 to automate tasks, streamline workflows, and help your business operate smarter and faster.
              </p>

              <div className="aff-sec3-bullets">
                <div className="aff-sec3-bullet">
                  <div className="bullet-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#635bff" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  </div>
                  <span>Human-like AI employees</span>
                </div>

                <div className="aff-sec3-bullet">
                  <div className="bullet-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#635bff" strokeWidth="2">
                      <line x1="18" y1="20" x2="18" y2="10"/>
                      <line x1="12" y1="20" x2="12" y2="4"/>
                      <line x1="6" y1="20" x2="6" y2="14"/>
                    </svg>
                  </div>
                  <span>Reduce costs & increase productivity</span>
                </div>

                <div className="aff-sec3-bullet">
                  <div className="bullet-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#635bff" strokeWidth="2">
                      <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
                      <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
                      <line x1="6" y1="6" x2="6.01" y2="6"/>
                      <line x1="6" y1="18" x2="6.01" y2="18"/>
                    </svg>
                  </div>
                  <span>Fully integrated with your business</span>
                </div>

                <div className="aff-sec3-bullet">
                  <div className="bullet-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#635bff" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </div>
                  <span>Work 24/7, never get tired</span>
                </div>
              </div>


            </div>

            <div className="aff-sec3-right-grid">
              {AGENTS_LIST.map((agent, idx) => (
                <div key={idx} className="aff-agent-card">
                  <div className="aff-agent-img-wrap">
                    <span className="dot-badge" style={{ backgroundColor: agent.dot }}></span>
                    <img src={agent.img} alt={agent.name} className="aff-agent-card-img" />
                  </div>
                  <h4 className="aff-agent-card-name">{agent.name}</h4>
                  <span className="aff-agent-card-role">{agent.role}</span>
                  <p className="aff-agent-card-desc">{agent.desc}</p>
                </div>
              ))}
            </div>

          </div>

          <div className="aff-sec3-bottom-card">
            <div className="aff-sec3-bottom-header">
              <span className="aff-bottom-pill">✦ One Team. Infinite Possibilities.</span>
              <h3>Your AI Workforce. On Demand.</h3>
              <p>From sales and finance to HR and operations, our AI agents handle the work so you can focus on what truly matters — growing your business.</p>
            </div>

            <div className="aff-sec3-bottom-bar">
              <div className="aff-bottom-item">
                <div className="aff-bottom-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#635bff" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <div className="aff-bottom-text">
                  <strong>12 Specialized</strong>
                  <span>AI Agents</span>
                </div>
              </div>

              <div className="aff-bottom-item">
                <div className="aff-bottom-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#635bff" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div className="aff-bottom-text">
                  <strong>Work 24/7</strong>
                  <span>Without Breaks</span>
                </div>
              </div>

              <div className="aff-bottom-item">
                <div className="aff-bottom-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#635bff" strokeWidth="2">
                    <rect x="4" y="4" width="16" height="16" rx="2"/>
                    <rect x="9" y="9" width="6" height="6"/>
                    <line x1="9" y1="1" x2="9" y2="4"/>
                    <line x1="15" y1="1" x2="15" y2="4"/>
                    <line x1="9" y1="20" x2="9" y2="23"/>
                    <line x1="15" y1="20" x2="15" y2="23"/>
                  </svg>
                </div>
                <div className="aff-bottom-text">
                  <strong>Smart Automation</strong>
                  <span>& Workflows</span>
                </div>
              </div>

              <div className="aff-bottom-item">
                <div className="aff-bottom-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#635bff" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <div className="aff-bottom-text">
                  <strong>Fully Integrated</strong>
                  <span>With Your Business</span>
                </div>
              </div>

              <div className="aff-bottom-item">
                <div className="aff-bottom-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#635bff" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <div className="aff-bottom-text">
                  <strong>Secure, Reliable</strong>
                  <span>& Scalable</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 4: YOUR REWARDS & HOW YOU GET PAID */}
      <section className="aff-sec4-rewards">
        <div className="aff-sec4-container">
          
          <div className="aff-sec4-header">
            <div className="aff-sec4-pill">
              <span className="sparkle">✦</span> YOUR REWARDS
            </div>

            <h2 className="aff-sec4-title">
              Earn, Get Paid, or Use for More.
            </h2>

            <p className="aff-sec4-subtitle">
              Simple, transparent, and built for long-term partnerships.
            </p>
          </div>

          {/* Top 2 Cards Grid */}
          <div className="aff-sec4-top-grid">
            
            {/* Card 1: 20% Commission On Every Sale */}
            <div className="aff-sec4-card card-commission">
              <img src="/images/affilate/GROWTH.webp" alt="Growth Background" className="card-bg-growth" />
              <div className="card-content">
                <span className="card-badge-pill">+20%</span>
                <h3>
                  <span className="purple-txt">+20% Commission</span><br />
                  On Every Sale
                </h3>
                <p>Earn 20% recurring commission on every successful subscription of $99.</p>
              </div>
              <img src="/images/agent_bg remove/sidd copy.webp" alt="Sidd AI Architect" className="card-sidd-img" />
            </div>

            {/* Card 2: Payout After $100 Sales */}
            <div className="aff-sec4-card card-payout">
              <div className="card-content">
                <h3>
                  Payout After<br />
                  <span className="green-txt">$100 Sales</span>
                </h3>
                <p>Once your total sales reach $100, you can withdraw your earnings.</p>
              </div>
              <img src="/images/affilate/MONEY ICON.webp" alt="Money Icon" className="card-money-img" />
            </div>

          </div>

          {/* HOW YOU GET PAID SECTION (Pixel-perfect matching uploaded reference) */}
          <div className="aff-sec4-paid-section">
            <div className="aff-sec4-pill-center">HOW YOU GET PAID</div>

            <div className="aff-paid-main-card">
              
              {/* Left Column: Two Ways to Receive Your Earnings */}
              <div className="aff-paid-left-col">
                <h3 className="col-title">Two Ways to Receive Your Earnings</h3>

                <div className="options-container">
                  
                  {/* Option 1: Direct Payout */}
                  <div className="opt-box opt-purple">
                    <span className="opt-badge purple-badge">Option 1</span>
                    
                    <div className="opt-icon-wrap">
                      <div className="main-icon-circle purple-circle">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
                          <line x1="3" y1="21" x2="21" y2="21"/>
                          <line x1="6" y1="18" x2="6" y2="11"/>
                          <line x1="10" y1="18" x2="10" y2="11"/>
                          <line x1="14" y1="18" x2="14" y2="11"/>
                          <line x1="18" y1="18" x2="18" y2="11"/>
                          <polygon points="12 3 2 9 22 9 12 3"/>
                        </svg>
                      </div>
                      <div className="sub-icon-badge">
                        <span className="upi-arrow-sm">▶</span>
                      </div>
                    </div>

                    <h4 className="opt-title">Direct Payout</h4>
                    <span className="opt-subtitle">Get paid via</span>

                    <div className="opt-pills-row">
                      <span className="pill-white"><span className="arrow-purple">▶</span> UPI</span>
                      <span className="pill-white"><span className="bank-emoji">🏦</span> Bank Transfer</span>
                    </div>

                    <div className="opt-checks">
                      <div className="check-row"><span className="green-check">✓</span> Payout after $100 sales</div>
                      <div className="check-row"><span className="green-check">✓</span> Secure & Hassle-free</div>
                    </div>
                  </div>

                  {/* Or Badge */}
                  <div className="or-circle-badge">or</div>

                  {/* Option 2: Convert to Mingrow Credits */}
                  <div className="opt-box opt-gold">
                    <span className="opt-badge gold-badge">Option 2</span>
                    
                    <div className="opt-icon-wrap">
                      <div className="main-icon-circle gold-circle">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2">
                          <circle cx="12" cy="12" r="9"/>
                          <path d="M12 7v10M9 9h6M9 15h6"/>
                        </svg>
                      </div>
                      <span className="sparkle-gold">✨</span>
                    </div>

                    <h4 className="opt-title">Convert to Mingrow Credits</h4>
                    <span className="opt-subtitle">Use credits to</span>

                    <div className="opt-pills-row">
                      <span className="pill-gold">Buy Subscriptions</span>
                      <span className="pill-gold">Get Discounts</span>
                      <span className="pill-gold">Unlock Features</span>
                    </div>

                    <div className="opt-checks">
                      <div className="check-row"><span className="green-check">✓</span> Use credits anytime</div>
                      <div className="check-row"><span className="green-check">✓</span> Get more value from Mingrow</div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Center Divider Line */}
              <div className="aff-paid-col-divider"></div>

              {/* Right Column: How It Works */}
              <div className="aff-paid-right-col">
                <h3 className="col-title">How It Works</h3>

                <div className="how-it-works-flow">
                  
                  {/* Step 1 */}
                  <div className="flow-step">
                    <div className="flow-icon-circle">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#635bff" strokeWidth="2">
                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
                        <path d="M9 12h6 M9 16h6"/>
                      </svg>
                      <span className="step-number-badge">1</span>
                    </div>
                    <strong className="step-title">Refer a Business</strong>
                    <p className="step-desc">Share Mingrow with businesses you know.</p>
                  </div>

                  <div className="flow-dashed-arrow">
                    <svg width="44" height="16" viewBox="0 0 44 16" fill="none" stroke="#7c3aed" strokeWidth="2.2" strokeDasharray="4 3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 8 H 36 M 30 3 L 38 8 L 30 13"/>
                    </svg>
                  </div>

                  {/* Step 2 */}
                  <div className="flow-step">
                    <div className="flow-icon-circle">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#635bff" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75"/>
                      </svg>
                      <span className="step-number-badge">2</span>
                    </div>
                    <strong className="step-title">They Subscribe</strong>
                    <p className="step-desc">They get Mingrow subscription for $99.</p>
                  </div>

                  <div className="flow-dashed-arrow">
                    <svg width="44" height="16" viewBox="0 0 44 16" fill="none" stroke="#7c3aed" strokeWidth="2.2" strokeDasharray="4 3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 8 H 36 M 30 3 L 38 8 L 30 13"/>
                    </svg>
                  </div>

                  {/* Step 3 */}
                  <div className="flow-step">
                    <div className="flow-icon-circle">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#635bff" strokeWidth="2">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                        <polyline points="17 6 23 6 23 12"/>
                      </svg>
                      <span className="step-number-badge">3</span>
                    </div>
                    <strong className="step-title">You Earn</strong>
                    <p className="step-desc">You earn 20% on every sale.</p>
                  </div>

                  <div className="flow-dashed-arrow">
                    <svg width="44" height="16" viewBox="0 0 44 16" fill="none" stroke="#7c3aed" strokeWidth="2.2" strokeDasharray="4 3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 8 H 36 M 30 3 L 38 8 L 30 13"/>
                    </svg>
                  </div>

                  {/* Step 4 */}
                  <div className="flow-step">
                    <div className="flow-icon-circle">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="#635bff">
                        <path d="M20 7H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm-1.5 6.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                        <path d="M19 5.5H5c-.55 0-1 .45-1 1s.45 1 1 1h14c.55 0 1-.45 1-1s-.45-1-1-1z" opacity="0.6"/>
                      </svg>
                      <span className="step-number-badge">4</span>
                    </div>
                    <strong className="step-title">Reach $100</strong>
                    <p className="step-desc">Once you hit $100 in sales...</p>
                  </div>

                </div>

                {/* Bottom Banner inside Right Col */}
                <div className="aff-bottom-purple-banner">
                  <div className="banner-wallet-circle">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="#ffffff">
                      <path d="M20 7H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 12H4V9h16v10zm-3-5c-.83 0-1.5-.67-1.5-1.5S16.17 11 17 11s1.5.67 1.5 1.5S17.83 14 17 14z"/>
                    </svg>
                  </div>
                  <div className="banner-info-text">
                    <strong>You Get Paid or Convert to Credits</strong>
                    <span>Choose UPI/Bank or use credits in Mingrow products.</span>
                  </div>
                </div>

              </div>

            </div>

            {/* Bottom Footer Trust Bar */}
            <div className="aff-sec4-footer-trust">
              <span className="shield-icon">🛡️</span>
              <span className="trust-item"><strong>100% Transparent</strong></span>
              <span className="trust-dot">•</span>
              <span className="trust-item">Secure Payments</span>
              <span className="trust-dot">•</span>
              <span className="trust-item">Long-Term Earnings</span>
              <span className="trust-dot">•</span>
              <span className="trust-item">Built for Partners Like You</span>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 5: FREQUENTLY ASKED QUESTIONS */}
      <section className="aff-sec-faq">
        <div className="aff-faq-container">
          <div className="aff-faq-header">
            <div className="aff-sec4-pill">
              <span className="sparkle">✦</span> GOT QUESTIONS?
            </div>
            <h2 className="aff-faq-title">
              Frequently Asked <span className="purple-text">Questions</span>
            </h2>
            <p className="aff-faq-subtitle">
              Everything you need to know about the Mingrow Partner Program.
            </p>
          </div>

          <div className="aff-faq-list">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className={`aff-faq-item ${isOpen ? 'open' : ''}`}>
                  <button 
                    className="aff-faq-question-btn"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <span className="aff-faq-toggle-icon">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div className="aff-faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="aff-footer-wrap">
          <div className="aff-footer-inner">
            <img src="/images/logo/LOGO light theme.webp" alt="Mingrow" className="aff-footer-logo" />
            <p>© 2026 Mingrow. Something is brewing.</p>
          </div>
        </div>
      </footer>

      {/* VIDEO POPUP MODAL */}
      {showVideoModal && (
        <div className="aff-modal-backdrop" onClick={() => setShowVideoModal(false)}>
          <div className="aff-video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="aff-modal-close" onClick={() => setShowVideoModal(false)}>✕</button>
            <video src="/Landing.mp4" controls autoPlay className="aff-demo-video-player">
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}

      {/* REGISTRATION MODAL */}
      {showJoinModal && (
        <div className="aff-modal-backdrop" onClick={() => setShowJoinModal(false)}>
          <div className="aff-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="aff-modal-close" onClick={() => setShowJoinModal(false)}>✕</button>
            <div className="aff-modal-header">
              <span className="aff-partner-pill">✦ PARTNER APPLICATION</span>
              <h3>Join the Mingrow Ecosystem</h3>
              <p>Start earning 20% recurring commission today.</p>
            </div>
            <form className="aff-modal-form" onSubmit={(e) => { e.preventDefault(); alert('Application submitted successfully!'); setShowJoinModal(false); }}>
              <div className="aff-form-group">
                <label>Full Name</label>
                <input type="text" placeholder="John Doe" required />
              </div>
              <div className="aff-form-group">
                <label>Email Address</label>
                <input type="email" placeholder="john@example.com" required />
              </div>
              <div className="aff-form-group">
                <label>Website / Social Profile</label>
                <input type="url" placeholder="https://yourwebsite.com" required />
              </div>
              <button type="submit" className="aff-btn-main w-full">Submit Partner Application →</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
