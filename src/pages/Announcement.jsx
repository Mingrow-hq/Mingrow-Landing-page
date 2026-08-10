import React, { useState, useEffect } from 'react';
import './announcement.css';

export default function Announcement() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Target date: August 15th, 2026 12:00:00 PM IST
    const targetDate = new Date('2026-08-15T12:00:00+05:30').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="announcement-page">
      {/* Top Navbar */}
      <nav className="announcement-navbar">
        <a href="/studio" className="announcement-logo">
          <img 
            src="/images/studio/mingrow space logo.webp" 
            alt="Mingrow Space" 
            className="announcement-logo-img" 
          />
        </a>
        <div className="announcement-nav-right">
          <a href="/studio" className="announcement-back-btn">
            ← Back to Studio
          </a>
        </div>
      </nav>

      {/* Hero Countdown Section */}
      <section className="announcement-hero">
        <div className="announcement-container">
          
          {/* Header Tricolor Badge */}
          <div className="ind-header-badge">
            <div className="ind-flag">
              <span className="stripe-orange"></span>
              <span className="stripe-white"></span>
              <span className="stripe-green"></span>
            </div>
            <span className="ind-badge-text">🇮🇳 INDEPENDENCE DAY SPECIAL</span>
          </div>

          <h1 className="announcement-main-title">
            Meet Our Winners <span className="title-emoji">🎉</span>
          </h1>

          <p className="announcement-subtitle">
            The wait is almost over! Winners will be revealed on <strong>15th August at 12:00 PM</strong>.
          </p>

          {/* Live Countdown Box */}
          <div className="countdown-card">
            <div className="countdown-header">
              <span className="live-dot"></span>
              <span className="countdown-tag">WINNERS REVEAL AT 12:00 PM COUNTDOWN</span>
            </div>

            <div className="timer-grid">
              <div className="timer-box">
                <span className="timer-val">{String(timeLeft.days).padStart(2, '0')}</span>
                <span className="timer-lbl">DAYS</span>
              </div>
              <div className="timer-colon">:</div>
              <div className="timer-box">
                <span className="timer-val">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="timer-lbl">HOURS</span>
              </div>
              <div className="timer-colon">:</div>
              <div className="timer-box">
                <span className="timer-val">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="timer-lbl">MINUTES</span>
              </div>
              <div className="timer-colon">:</div>
              <div className="timer-box highlight-sec">
                <span className="timer-val">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="timer-lbl">SECONDS</span>
              </div>
            </div>

            <div className="countdown-note">
              📅 Official Winner Reveal: <strong>15th August 2026, 12:00 PM IST</strong>
              <br />
              <span className="small-disclaimer">
                Winners will be announced after the campaign reaches 100 eligible bookings and the winner-selection process is completed.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Rewards & Prizes Section */}
      <section className="rewards-showcase-section">
        <div className="announcement-container">
          <div className="section-head text-center">
            <span className="sub-badge">REWARDS &amp; CASH PRIZES</span>
            <h2>What You Can Win In This Campaign 🏆</h2>
            <p>Here is the breakdown of prizes awaiting our lucky participants!</p>
          </div>

          {/* Cash Prize Cards */}
          <div className="top-prizes-grid">
            
            {/* Grand Winner */}
            <div className="winner-card grand-card">
              <div className="card-top-badge">🏆 GRAND WINNER</div>
              <div className="prize-trophy-icon">🥇</div>
              <div className="prize-amount-tag">₹10,000</div>
              <h3 className="winner-title-label">Grand Cash Prize</h3>
              <p className="card-desc">Awarded to 1 lucky participant chosen after 100 eligible bookings are completed!</p>
            </div>

            {/* 2nd Winner */}
            <div className="winner-card runner-card">
              <div className="card-top-badge silver-badge">🥈 2ND WINNER</div>
              <div className="prize-trophy-icon">🥈</div>
              <div className="prize-amount-tag">₹5,000</div>
              <h3 className="winner-title-label">1st Runner-Up Prize</h3>
              <p className="card-desc">Direct ₹5,000 cash reward transferred upon winner verification.</p>
            </div>

            {/* 3rd Winner */}
            <div className="winner-card runner-card">
              <div className="card-top-badge bronze-badge">🥉 3RD WINNER</div>
              <div className="prize-trophy-icon">🥉</div>
              <div className="prize-amount-tag">₹5,000</div>
              <h3 className="winner-title-label">2nd Runner-Up Prize</h3>
              <p className="card-desc">Direct ₹5,000 cash reward transferred upon winner verification.</p>
            </div>

          </div>

          {/* Lucky Voucher Winners */}
          <div className="voucher-section-box">
            <div className="voucher-box-header">
              <div className="v-icon">🎁</div>
              <div>
                <h3>🎁 ₹2,500 Voucher Winners</h3>
                <p>Congratulations in advance to our 10 lucky voucher participants!</p>
              </div>
            </div>

            <div className="voucher-table-wrapper">
              <table className="voucher-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Winner Slot</th>
                    <th>Reward</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(10)].map((_, i) => (
                    <tr key={i}>
                      <td className="num-col">{String(i + 1).padStart(2, '0')}</td>
                      <td className="slot-col">Lucky Participant #{i + 1}</td>
                      <td className="reward-col"><span className="v-pill">₹2,500 Voucher</span></td>
                      <td className="status-col"><span className="reveal-tag">Revealing Aug 15 🔒</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Participant Discount Rewards */}
          <div className="participant-reward-banner">
            <div className="part-icon">🎉</div>
            <div className="part-content">
              <h3>Everyone's a Winner at Mingrow!</h3>
              <p>
                Participants who don't receive a cash prize or ₹2,500 voucher will receive <strong>50% OFF on their next eligible booking</strong>, valid for 90 days.
              </p>
            </div>
            <a href="/studio" className="part-cta-btn">
              Book Your Next Studio →
            </a>
          </div>

        </div>
      </section>

      {/* EXCLUSIVE FREE AI BUSINESS OS BONUS */}
      <section className="ai-os-bonus-section">
        <div className="announcement-container">
          <div className="ai-bonus-card">
            <div className="ai-badge-row">
              <span className="free-gift-badge">🔥 EXCLUSIVE CAMPAIGN BONUS FOR ALL</span>
              <span className="beta-badge">BETA ACCESS</span>
            </div>

            <div className="ai-content-grid">
              <div className="ai-text-col">
                <h2>
                  Get Free Trial to <br />
                  <span className="gradient-ai-text">Mingrow AI Business OS</span> 🚀
                </h2>
                <p className="ai-intro-p">
                  We believe in powering every creator and entrepreneur. Every single participant in our Independence Day campaign will automatically receive <strong>FREE Beta Trial Access</strong> to the futuristic <strong>Mingrow AI Business OS</strong>!
                </p>

                <div className="ai-features-grid">
                  <div className="ai-feat-item">
                    <span className="feat-check">✓</span>
                    <span>AI Lead &amp; Client Management</span>
                  </div>
                  <div className="ai-feat-item">
                    <span className="feat-check">✓</span>
                    <span>Automated Booking Scheduling</span>
                  </div>
                  <div className="ai-feat-item">
                    <span className="feat-check">✓</span>
                    <span>Smart Studio &amp; Financial Analytics</span>
                  </div>
                  <div className="ai-feat-item">
                    <span className="feat-check">✓</span>
                    <span>AI Marketing &amp; Content Engine</span>
                  </div>
                </div>
              </div>

              <div className="ai-visual-col">
                <div className="os-mock-card">
                  <div className="os-card-header">
                    <div className="os-dots">
                      <span className="dot red"></span>
                      <span className="dot yellow"></span>
                      <span className="dot green"></span>
                    </div>
                    <span className="os-title">Mingrow AI Business OS v1.0 (Beta)</span>
                  </div>
                  <div className="os-card-body">
                    <div className="os-stat-row">
                      <div className="os-stat">
                        <span className="os-stat-num">100%</span>
                        <span className="os-stat-lbl">Free Access</span>
                      </div>
                      <div className="os-stat">
                        <span className="os-stat-num">AI Powered</span>
                        <span className="os-stat-lbl">Business Suite</span>
                      </div>
                    </div>
                    <div className="os-unlocked-banner">
                      ✨ Unlocked for All Eligible Participants!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Campaign Result Metrics */}
      <section className="campaign-metrics-section">
        <div className="announcement-container">
          <div className="metrics-card">
            <h3 className="metrics-title">🎊 Campaign Goal &amp; Result Stats</h3>
            <div className="metrics-grid">
              <div className="metric-item">
                <span className="metric-num orange-num">100+</span>
                <span className="metric-lbl">Target Bookings</span>
              </div>
              <div className="metric-item">
                <span className="metric-num green-num">3</span>
                <span className="metric-lbl">Cash Prize Winners</span>
              </div>
              <div className="metric-item">
                <span className="metric-num purple-num">10</span>
                <span className="metric-lbl">₹2,500 Voucher Winners</span>
              </div>
              <div className="metric-item">
                <span className="metric-num blue-num">90 Days</span>
                <span className="metric-lbl">Discount Validity</span>
              </div>
            </div>
            <p className="metrics-footer-text">
              Thank you for being part of the Mingrow Independence Day Special! 🇮🇳
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="announcement-footer">
        <div className="announcement-container text-center">
          <p>© 2026 Mingrow. All rights reserved. Independence Day Campaign.</p>
        </div>
      </footer>
    </div>
  );
}
