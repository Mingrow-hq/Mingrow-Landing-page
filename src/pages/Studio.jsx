import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import './studio.css';
import './booking.css';
import BookingModal from './BookingModal';

export default function Studio() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    studioCity: 'Mumbai',
    bookingDate: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setIsSubmitted(false);
  };

  const handleOpenBookingModal = useCallback(() => {
    setIsBookingModalOpen(true);
  }, []);

  const handleCloseBookingModal = useCallback(() => {
    setIsBookingModalOpen(false);
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenTermsModal = () => {
    setIsTermsModalOpen(true);
  };

  const handleCloseTermsModal = () => {
    setIsTermsModalOpen(false);
  };

  const handleOpenContactModal = () => {
    setIsContactModalOpen(true);
  };

  const handleCloseContactModal = () => {
    setIsContactModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <>
    <div className="studio-page">
      {/* Main Hero Container using /images/studio/hero imagee.webp */}
      <section className="studio-hero" id="hero">
        <div className="studio-wall-content">
          {/* Top Independence Day Header Badge */}
          <div className="ind-day-header">
            <div className="ind-day-line"></div>
            <div className="ind-flag-badge">
              <div className="flag-icon">
                <div className="flag-stripe-orange"></div>
                <div className="flag-stripe-white">
                  <div className="ashoka-chakra"></div>
                </div>
                <div className="flag-stripe-green"></div>
              </div>
            </div>
            <div className="ind-day-title">
              <span className="orange-text">INDEPENDENCE</span> <span className="green-text">DAY SPECIAL</span>
            </div>
            <div className="ind-day-line right"></div>
          </div>

          {/* Main Headline */}
          <h1 className="hero-main-title">
            BOOK YOUR STUDIO.<br />
            WIN UP TO <span className="orange-prize">₹10,000.</span>
          </h1>

          {/* Subtext */}
          <p className="hero-subtext">
            <span className="celebrate-script">Celebrate Freedom.</span>{' '}
            <span className="create-memories">CREATE MEMORIES. WIN REWARDS.</span>
          </p>

          {/* Limited Bookings Pill */}
          <div className="users-winners-pill">
            🔥 Offer unlocks when 100 bookings are completed!
          </div>

          {/* 5 Prize Cards in Same Row */}
          <div className="prize-grid">
            {/* Grand Winner */}
            <div className="prize-card">
              <div className="prize-icon-wrapper">
                {/* Gold Trophy */}
                <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9C6 12.3137 8.68629 15 12 15C15.3137 15 18 12.3137 18 9V3H6V9Z" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5"/>
                  <path d="M6 5H3V7C3 8.65685 4.34315 10 6 10V5Z" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5"/>
                  <path d="M18 5H21V7C21 8.65685 19.6569 10 18 10V5Z" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5"/>
                  <path d="M12 15V18" stroke="#D97706" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M8 21H16" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="prize-card-content">
                <div className="prize-top-tag">&nbsp;</div>
                <div className="prize-amount">₹10,000</div>
                <div className="prize-label">Grand Winner</div>
              </div>
            </div>

            {/* 1st Winner */}
            <div className="prize-card">
              <div className="prize-icon-wrapper">
                {/* Silver Trophy */}
                <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9C6 12.3137 8.68629 15 12 15C15.3137 15 18 12.3137 18 9V3H6V9Z" fill="#94A3B8" stroke="#64748B" strokeWidth="1.5"/>
                  <path d="M6 5H3V7C3 8.65685 4.34315 10 6 10V5Z" fill="#CBD5E1" stroke="#64748B" strokeWidth="1.5"/>
                  <path d="M18 5H21V7C21 8.65685 19.6569 10 18 10V5Z" fill="#CBD5E1" stroke="#64748B" strokeWidth="1.5"/>
                  <path d="M12 15V18" stroke="#64748B" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M8 21H16" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="prize-card-content">
                <div className="prize-top-tag">&nbsp;</div>
                <div className="prize-amount">₹5,000</div>
                <div className="prize-label">1st Winner</div>
              </div>
            </div>

            {/* 2nd Winner */}
            <div className="prize-card">
              <div className="prize-icon-wrapper">
                {/* Bronze Trophy */}
                <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9C6 12.3137 8.68629 15 12 15C15.3137 15 18 12.3137 18 9V3H6V9Z" fill="#D97706" stroke="#B45309" strokeWidth="1.5"/>
                  <path d="M6 5H3V7C3 8.65685 4.34315 10 6 10V5Z" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5"/>
                  <path d="M18 5H21V7C21 8.65685 19.6569 10 18 10V5Z" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5"/>
                  <path d="M12 15V18" stroke="#B45309" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M8 21H16" stroke="#B45309" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="prize-card-content">
                <div className="prize-top-tag">&nbsp;</div>
                <div className="prize-amount">₹5,000</div>
                <div className="prize-label">2nd Winner</div>
              </div>
            </div>

            {/* Next 10 Participants */}
            <div className="prize-card">
              <div className="prize-icon-wrapper">
                {/* Green Gift Box Icon */}
                <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="10" width="18" height="11" rx="2" fill="#16A34A" stroke="#15803D" strokeWidth="1"/>
                  <rect x="2" y="6" width="20" height="5" rx="1.5" fill="#22C55E" stroke="#15803D" strokeWidth="1"/>
                  <path d="M12 6V21" stroke="#F59E0B" strokeWidth="2.5"/>
                  <path d="M7.5 6C7.5 3.5 9.5 2.5 12 6C14.5 2.5 16.5 3.5 16.5 6" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                  <path d="M5 2L5.5 3.5L7 4L5.5 4.5L5 6L4.5 4.5L3 4L4.5 3.5L5 2Z" fill="#FBBF24"/>
                  <path d="M19 1L19.3 2.2L20.5 2.5L19.3 2.8L19 4L18.7 2.8L17.5 2.5L18.7 2.2L19 1Z" fill="#FBBF24"/>
                </svg>
              </div>
              <div className="prize-card-content">
                <div className="prize-top-tag">NEXT 10 PARTICIPANTS</div>
                <div className="prize-amount prize-amount-green">₹2,500</div>
                <div className="prize-subtext">VOUCHER FREE</div>
              </div>
            </div>

            {/* All Other Participants */}
            <div className="prize-card">
              <div className="prize-icon-wrapper">
                {/* Blue Discount Tag Icon */}
                <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
                  <path d="M4 4C4 2.89543 4.89543 2 6 2H11.1716C11.702 2 12.2107 2.21071 12.5858 2.58579L20.5858 10.5858C21.3668 11.3668 21.3668 12.6332 20.5858 13.4142L13.4142 20.5858C12.6332 21.3668 11.3668 21.3668 10.5858 20.5858L2.58579 12.5858C2.21071 12.2107 2 11.702 2 11.1716V6C2 4.89543 2.89543 4 4 4Z" fill="#2563EB" stroke="#1D4ED8" strokeWidth="1"/>
                  <circle cx="6.5" cy="6.5" r="1.5" fill="#FFFFFF"/>
                  <path d="M12 9.5L16 13.5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="12.5" cy="13.5" r="1" fill="#FFFFFF"/>
                  <circle cx="15.5" cy="9.5" r="1" fill="#FFFFFF"/>
                  <path d="M6.5 5C5.5 3 7 1 8.5 2" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="prize-card-content">
                <div className="prize-top-tag">ALL OTHER PARTICIPANTS</div>
                <div className="prize-amount prize-amount-blue">50% OFF</div>
                <div className="prize-subtext">ON NEXT BOOKING</div>
              </div>
            </div>
          </div>

          {/* Call To Action */}
          <div className="cta-button-container">
            <button 
              type="button"
              onClick={handleOpenBookingModal}
              className="hero-cta-btn"
            >
              BOOK YOUR STUDIO
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Campaign Details Section with Background image without text.webp */}
      <section className="studio-offer-section">
        <div className="studio-offer-container">
          {/* Header */}
          <div className="offer-main-header">
            <div className="header-flag-line">
              <span className="flag-stripe top-s"></span>
              <span className="flag-stripe mid-s"></span>
              <span className="flag-stripe bot-s"></span>
            </div>
            <div className="flag-icon-small">
              <div className="flag-s-orange"></div>
              <div className="flag-s-white"><div className="ashoka-s"></div></div>
              <div className="flag-s-green"></div>
            </div>
            <h2 className="offer-title">
              INDEPENDENCE DAY <span className="green-text">OFFER</span>
            </h2>
            <div className="flag-icon-small">
              <div className="flag-s-orange"></div>
              <div className="flag-s-white"><div className="ashoka-s"></div></div>
              <div className="flag-s-green"></div>
            </div>
            <div className="header-flag-line right">
              <span className="flag-stripe bot-s"></span>
              <span className="flag-stripe mid-s"></span>
              <span className="flag-stripe top-s"></span>
            </div>
          </div>

          {/* How to avail section */}
          <div className="how-to-avail">
            <div className="avail-title-wrapper">
              <span className="avail-dot-line"></span>
              <h3 className="avail-title">HOW TO AVAIL THE OFFER</h3>
              <span className="avail-dot-line"></span>
            </div>
            <p className="avail-desc">
              Make your booking and become eligible for the Independence Day Offer.<br />
              Once we reach <strong>100</strong> eligible bookings, we will announce the winners.
            </p>
          </div>

          {/* Top 3 Prize Cards */}
          <div className="top-prizes-grid">
            {/* Grand Prize */}
            <div className="offer-prize-card grand-card">
              <div className="card-top-row">
                <div className="card-trophy-icon gold">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                    <path d="M6 9C6 12.3137 8.68629 15 12 15C15.3137 15 18 12.3137 18 9V3H6V9Z" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5"/>
                    <path d="M6 5H3V7C3 8.65685 4.34315 10 6 10V5Z" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5"/>
                    <path d="M18 5H21V7C21 8.65685 19.6569 10 18 10V5Z" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5"/>
                    <path d="M12 15V18" stroke="#D97706" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M8 21H16" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round"/>
                    <path d="M12 7.5L13.1 9.7L15.5 10L13.7 11.7L14.1 14.1L12 13L9.9 14.1L10.3 11.7L8.5 10L10.9 9.7L12 7.5Z" fill="#FFFFFF"/>
                  </svg>
                </div>
                <span className="card-prize-name orange-label">GRAND PRIZE</span>
              </div>
              <div className="card-amount orange-amount">₹10,000</div>
              <div className="card-divider"></div>
              <div className="card-winner-tag">Grand Winner</div>
            </div>

            {/* First Prize */}
            <div className="offer-prize-card second-card">
              <div className="card-top-row">
                <div className="card-trophy-icon silver">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                    <path d="M6 9C6 12.3137 8.68629 15 12 15C15.3137 15 18 12.3137 18 9V3H6V9Z" fill="#94A3B8" stroke="#64748B" strokeWidth="1.5"/>
                    <path d="M6 5H3V7C3 8.65685 4.34315 10 6 10V5Z" fill="#CBD5E1" stroke="#64748B" strokeWidth="1.5"/>
                    <path d="M18 5H21V7C21 8.65685 19.6569 10 18 10V5Z" fill="#CBD5E1" stroke="#64748B" strokeWidth="1.5"/>
                    <path d="M12 15V18" stroke="#64748B" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M8 21H16" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round"/>
                    <path d="M12 7.5L13.1 9.7L15.5 10L13.7 11.7L14.1 14.1L12 13L9.9 14.1L10.3 11.7L8.5 10L10.9 9.7L12 7.5Z" fill="#FFFFFF"/>
                  </svg>
                </div>
                <span className="card-prize-name grey-label">FIRST PRIZE</span>
              </div>
              <div className="card-amount grey-amount">₹5,000</div>
              <div className="card-divider"></div>
              <div className="card-winner-tag">1st Winner</div>
            </div>

            {/* Second Prize */}
            <div className="offer-prize-card third-card">
              <div className="card-top-row">
                <div className="card-trophy-icon bronze">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                    <path d="M6 9C6 12.3137 8.68629 15 12 15C15.3137 15 18 12.3137 18 9V3H6V9Z" fill="#D97706" stroke="#B45309" strokeWidth="1.5"/>
                    <path d="M6 5H3V7C3 8.65685 4.34315 10 6 10V5Z" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5"/>
                    <path d="M18 5H21V7C21 8.65685 19.6569 10 18 10V5Z" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5"/>
                    <path d="M12 15V18" stroke="#B45309" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M8 21H16" stroke="#B45309" strokeWidth="2.5" strokeLinecap="round"/>
                    <path d="M12 7.5L13.1 9.7L15.5 10L13.7 11.7L14.1 14.1L12 13L9.9 14.1L10.3 11.7L8.5 10L10.9 9.7L12 7.5Z" fill="#FFFFFF"/>
                  </svg>
                </div>
                <span className="card-prize-name bronze-label">SECOND PRIZE</span>
              </div>
              <div className="card-amount bronze-amount">₹5,000</div>
              <div className="card-divider"></div>
              <div className="card-winner-tag">2nd Winner</div>
            </div>

            {/* Next 10 Participants */}
            <div className="offer-prize-card fourth-card">
              <div className="card-top-row">
                <div className="card-trophy-icon blue">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                    <path d="M20 12C20 10.9 20.9 10 22 10V6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V10C3.1 10 4 10.9 4 12C4 13.1 3.1 14 2 14V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V14C20.9 14 20 13.1 20 12Z" fill="#2563EB" stroke="#1D4ED8" strokeWidth="1.5"/>
                    <path d="M12 8V16" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="2 2"/>
                    <circle cx="8.5" cy="12" r="1.5" fill="#FFFFFF"/>
                    <circle cx="15.5" cy="12" r="1.5" fill="#FFFFFF"/>
                  </svg>
                </div>
                <span className="card-prize-name blue-label">NEXT 10 PARTICIPANTS</span>
              </div>
              <div className="card-amount blue-amount">₹2,500</div>
              <div className="card-divider"></div>
              <div className="card-winner-tag">Voucher Free</div>
            </div>
          </div>

          {/* Everyone Else Gets A Reward Banner */}
          <div className="reward-banner">
            <div className="reward-left">
              <div className="gift-box-icon">
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="11" width="18" height="10" rx="1.5" fill="#15803D"/>
                  <rect x="2" y="7" width="20" height="4" rx="1" fill="#16A34A"/>
                  <path d="M12 7V21" stroke="#FFFFFF" strokeWidth="2"/>
                  <path d="M7.5 7C7.5 4.5 10 3 12 7C14 3 16.5 4.5 16.5 7" stroke="#86EFAC" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="reward-info">
                <h4 className="reward-title">EVERYONE ELSE GETS A REWARD</h4>
                <p className="reward-desc">
                  All other eligible participants will receive a<br />
                  <strong className="discount-highlight">50% OFF</strong> coupon on their next studio booking.
                </p>
              </div>
            </div>
            <div className="reward-v-divider"></div>
            <div className="reward-right">
              <div className="calendar-valid-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="6" width="18" height="15" rx="2" stroke="#16A34A" strokeWidth="2"/>
                  <path d="M3 10H21" stroke="#16A34A" strokeWidth="2"/>
                  <path d="M8 3V6" stroke="#16A34A" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M16 3V6" stroke="#16A34A" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="7.5" cy="13.5" r="1" fill="#16A34A"/>
                  <circle cx="12" cy="13.5" r="1" fill="#16A34A"/>
                  <circle cx="16.5" cy="13.5" r="1" fill="#16A34A"/>
                  <circle cx="7.5" cy="17" r="1" fill="#16A34A"/>
                  <circle cx="12" cy="17" r="1" fill="#16A34A"/>
                  <circle cx="16.5" cy="17" r="1" fill="#16A34A"/>
                </svg>
              </div>
              <div className="validity-info">
                <span className="valid-label">Valid for</span>
                <span className="valid-days">90 DAYS</span>
                <span className="valid-sub">from the date of issue.</span>
              </div>
            </div>
          </div>

          {/* Bottom Campaign Status Bar */}
          <div className="status-bar-wrapper">
            <div className="campaign-status-bar">
              <div className="status-cal-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="6" width="18" height="15" rx="2" stroke="#1E3A8A" strokeWidth="2"/>
                  <path d="M3 10H21" stroke="#1E3A8A" strokeWidth="2"/>
                  <path d="M8 3V6" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M16 3V6" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="7.5" cy="13.5" r="1" fill="#1E3A8A"/>
                  <circle cx="12" cy="13.5" r="1" fill="#1E3A8A"/>
                  <circle cx="16.5" cy="13.5" r="1" fill="#1E3A8A"/>
                  <circle cx="7.5" cy="17" r="1" fill="#1E3A8A"/>
                  <circle cx="12" cy="17" r="1" fill="#1E3A8A"/>
                  <circle cx="16.5" cy="17" r="1" fill="#1E3A8A"/>
                </svg>
              </div>
              <div className="status-v-divider"></div>
              <div className="status-text-content">
                <div className="status-title-row">
                  <span>100 ELIGIBLE BOOKINGS</span>
                  <span className="arrow-sym">➔</span>
                  <span>WINNERS ANNOUNCED</span>
                </div>
                <p className="status-subtext">
                  Offer applicable only to eligible bookings made during the campaign period.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Studio Pricing & Inclusions Section */}
      <section className="studio-pricing-section">
        <div className="pricing-container">
          {/* Header */}
          <div className="pricing-header-line">
            <span className="p-line left"></span>
            <span className="p-star">✦</span>
            <h2 className="pricing-title">PRICING</h2>
            <span className="p-star">✦</span>
            <span className="p-line right"></span>
          </div>

          {/* Pricing Box */}
          <div className="pricing-main-card">
            <div className="pricing-top-pill">STUDIO ROOM</div>
            
            <div className="pricing-rate-row">
              <span className="price-amount">₹2,500</span>
              <span className="price-unit">PER HOUR</span>
            </div>

            <div className="pricing-setup-badge">
              COMPLETE STUDIO SETUP
            </div>

            <div className="pricing-perks-bar">
              <div className="perk-item">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <polyline points="9 12 11 14 15 10"/>
                </svg>
                <div className="perk-text">
                  <span>NO SECURITY</span>
                  <span>DEPOSIT</span>
                </div>
              </div>

              <div className="perk-divider"></div>

              <div className="perk-item">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
                <div className="perk-text">
                  <span>NO HIDDEN</span>
                  <span>CHARGES</span>
                </div>
              </div>

              <div className="perk-divider"></div>

              <div className="perk-item">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polygon points="10 8 16 12 10 16 10 8" fill="#1e3a8a"/>
                </svg>
                <div className="perk-text">
                  <span>JUST BOOK &amp;</span>
                  <span>START RECORDING</span>
                </div>
              </div>
            </div>
          </div>

          {/* Includes Box */}
          <div className="includes-wrapper">
            <div className="includes-top-badge">
              <span className="star-icon">★</span> YOUR BOOKING INCLUDES <span className="star-icon">★</span>
            </div>

            <div className="includes-grid">
              {/* Item 1: Camera */}
              <div className="inc-item">
                <div className="inc-icon-wrap">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                    <circle cx="12" cy="13" r="4"/>
                  </svg>
                </div>
                <div className="inc-title">Nikon Z5 II</div>
                <div className="inc-sub">Camera</div>
              </div>

              <div className="inc-v-line"></div>

              {/* Item 2: Microphones */}
              <div className="inc-item">
                <div className="inc-icon-wrap">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                    <line x1="12" y1="19" x2="12" y2="23"/>
                    <line x1="8" y1="23" x2="16" y2="23"/>
                  </svg>
                </div>
                <div className="inc-title">2 Professional</div>
                <div className="inc-sub">Microphones</div>
              </div>

              <div className="inc-v-line"></div>

              {/* Item 3: Teleprompter */}
              <div className="inc-item">
                <div className="inc-icon-wrap">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                    <line x1="6" y1="7" x2="18" y2="7"/>
                    <line x1="6" y1="10" x2="15" y2="10"/>
                    <line x1="6" y1="13" x2="12" y2="13"/>
                    <polyline points="12 17 12 21"/>
                    <line x1="8" y1="21" x2="16" y2="21"/>
                  </svg>
                </div>
                <div className="inc-title">Studio</div>
                <div className="inc-sub">Teleprompter</div>
              </div>

              <div className="inc-v-line"></div>

              {/* Item 3: Lighting */}
              <div className="inc-item">
                <div className="inc-icon-wrap">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                    <circle cx="12" cy="12" r="3.5" fill="#15803d"/>
                  </svg>
                </div>
                <div className="inc-title">Complete</div>
                <div className="inc-sub">Professional Lighting</div>
              </div>

              <div className="inc-v-line"></div>

              {/* Item 4: Soundproof Space */}
              <div className="inc-item">
                <div className="inc-icon-wrap">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="2" y1="12" x2="2" y2="12.01"/>
                    <line x1="6" y1="8" x2="6" y2="16"/>
                    <line x1="10" y1="4" x2="10" y2="20"/>
                    <line x1="14" y1="2" x2="14" y2="22"/>
                    <line x1="18" y1="6" x2="18" y2="18"/>
                    <line x1="22" y1="10" x2="22" y2="14"/>
                  </svg>
                </div>
                <div className="inc-title">Soundproof</div>
                <div className="inc-sub">Recording Space</div>
              </div>

              <div className="inc-v-line"></div>

              {/* Item 5: Background Options */}
              <div className="inc-item">
                <div className="inc-icon-wrap">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                </div>
                <div className="inc-title">Multiple</div>
                <div className="inc-sub">Background Options</div>
              </div>

              <div className="inc-v-line"></div>

              {/* Item 6: AC Studio */}
              <div className="inc-item">
                <div className="inc-icon-wrap">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="2" x2="12" y2="22"/>
                    <line x1="2" y1="12" x2="22" y2="12"/>
                    <path d="M20 16l-4-4 4-4M4 8l4 4-4 4M16 4l-4 4-4-4M8 20l4-4 4 4"/>
                  </svg>
                </div>
                <div className="inc-title">Air-Conditioned</div>
                <div className="inc-sub">Studio</div>
              </div>

              <div className="inc-v-line"></div>

              {/* Item 7: High-Speed Wi-Fi */}
              <div className="inc-item">
                <div className="inc-icon-wrap">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12.55a11 11 0 0 1 14.08 0"/>
                    <path d="M1.42 9a16 16 0 0 1 21.16 0"/>
                    <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
                    <line x1="12" y1="20" x2="12.01" y2="20" strokeWidth="3.5"/>
                  </svg>
                </div>
                <div className="inc-title">High-Speed</div>
                <div className="inc-sub">Wi-Fi</div>
              </div>

              <div className="inc-v-line"></div>

              {/* Item 8: Free Parking */}
              <div className="inc-item">
                <div className="inc-icon-wrap">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 16H9m10 0v3a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H7v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3m16 0L18.5 7A2 2 0 0 0 16.6 5.5H7.4A2 2 0 0 0 5.5 7L3.5 16M7 11h.01M17 11h.01"/>
                  </svg>
                </div>
                <div className="inc-title">Free</div>
                <div className="inc-sub">Parking</div>
              </div>

              <div className="inc-v-line"></div>

              {/* Item 9: Refreshments */}
              <div className="inc-item">
                <div className="inc-icon-wrap">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
                    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
                    <line x1="6" y1="1" x2="6" y2="4"/>
                    <line x1="10" y1="1" x2="10" y2="4"/>
                    <line x1="14" y1="1" x2="14" y2="4"/>
                  </svg>
                </div>
                <div className="inc-title">Complimentary</div>
                <div className="inc-sub">Tea, Coffee &amp;</div>
                <div className="inc-sub">Drinking Water</div>
              </div>
            </div>
          </div>

          {/* Bottom Action Prompt Box */}
          <div className="record-start-card">
            {/* Col 1 */}
            <div className="record-col-heading">
              <h3 className="rec-green-title">READY TO START RECORDING?</h3>
              <p className="rec-subtext">Please let us know:</p>
            </div>

            <div className="record-v-line"></div>

            {/* Col 2 */}
            <div className="record-col-feature">
              <div className="record-icon-bg">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2.2">
                  <circle cx="12" cy="12" r="10"/>
                  <circle cx="12" cy="12" r="6"/>
                  <circle cx="12" cy="12" r="2" fill="#15803d"/>
                </svg>
              </div>
              <div className="record-info-text">
                <div className="rec-bold">What type of shoot are you planning?</div>
                <div className="rec-light">(Podcast, Interview, YouTube Video, Reels, etc.)</div>
              </div>
            </div>

            <div className="record-v-line"></div>

            {/* Col 3 */}
            <div className="record-col-feature">
              <div className="record-icon-bg">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2.2">
                  <rect x="3" y="4" width="18" height="18" rx="3" ry="3"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                  <rect x="7" y="13" width="3" height="3" fill="#15803d" rx="0.5"/>
                  <rect x="14" y="13" width="3" height="3" fill="#15803d" rx="0.5"/>
                </svg>
              </div>
              <div className="record-info-text">
                <div className="rec-bold">Your preferred</div>
                <div className="rec-bold">date and time</div>
              </div>
            </div>

            <div className="record-v-line"></div>

            {/* Col 4 */}
            <div className="record-col-cta">
              <p className="rec-cta-text">
                We'll check availability and help you book your slot right away. 🙂
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Studio Footer Section */}
      <footer className="studio-footer">
        <div className="studio-footer-inner">
          <div className="studio-footer-main">
            {/* Logo & Info */}
            <div className="studio-footer-brand">
              <a 
                href="#hero" 
                className="studio-footer-logo-link"
                onClick={(e) => {
                  e.preventDefault();
                  const heroSection = document.querySelector('.studio-hero') || document.querySelector('.studio-page');
                  if (heroSection) {
                    heroSection.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
              >
                <img 
                  src="/images/studio/mingrow space logo.webp" 
                  alt="Mingrow Space Logo" 
                  className="studio-footer-logo" 
                />
              </a>
              <p className="studio-footer-tagline">
                State-of-the-art studio spaces for podcasts, video shoots, interviews & content creators.
              </p>
              
              {/* Social Media & Website Badges */}
              <div className="studio-footer-socials">
                <a 
                  href="https://www.instagram.com/mingrow_space/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="studio-social-item instagram-btn"
                  aria-label="Instagram @mingrow_space"
                >
                  <div className="studio-social-icon-box">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </div>
                  <div className="studio-social-info">
                    <span className="studio-social-label">Instagram</span>
                    <span className="studio-social-val">@mingrow_space</span>
                  </div>
                </a>

                <a 
                  href="https://space.mingrow.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="studio-social-item website-btn"
                  aria-label="Website space.mingrow.com"
                >
                  <div className="studio-social-icon-box">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                  </div>
                  <div className="studio-social-info">
                    <span className="studio-social-label">Website</span>
                    <span className="studio-social-val">space.mingrow.com</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="studio-footer-col">
              <h4 className="studio-footer-heading">Quick Links</h4>
              <ul className="studio-footer-links">
                <li>
                  <a 
                    href="#hero"
                    onClick={(e) => {
                      e.preventDefault();
                      const heroSection = document.querySelector('.studio-hero') || document.querySelector('.studio-page');
                      if (heroSection) {
                        heroSection.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                  >
                    Studio Home
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={handleOpenBookingModal}
                    className="studio-footer-link-btn"
                  >
                    Book Studio Slot
                  </button>
                </li>
                <li>
                  <a 
                    href="#pricing" 
                    onClick={(e) => { 
                      e.preventDefault(); 
                      document.querySelector('.studio-pricing-section')?.scrollIntoView({ behavior: 'smooth' }); 
                    }}
                  >
                    Pricing & Offers
                  </a>
                </li>
                <li><button type="button" onClick={handleOpenTermsModal} className="studio-footer-link-btn">Terms & Conditions</button></li>
                <li><a href="/">Mingrow Main</a></li>
              </ul>
            </div>

            {/* Contact Details from image */}
            <div className="studio-footer-col studio-footer-contact-col">
              <h4 className="studio-footer-heading">Contact Us</h4>
              <div className="studio-contact-list">
                {/* Our Office */}
                <div className="studio-contact-item">
                  <div className="studio-contact-icon-box">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div className="studio-contact-info">
                    <h5 className="studio-contact-title">Our Office</h5>
                    <p className="studio-contact-text">
                      C-8/270, Second Floor, Above Bank of Baroda,<br />
                      Jankipuram Vistar, Sector 8, Lucknow - 226021
                    </p>
                  </div>
                </div>

                {/* Call Us */}
                <div className="studio-contact-item">
                  <div className="studio-contact-icon-box">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div className="studio-contact-info">
                    <h5 className="studio-contact-title">Call Us</h5>
                    <p className="studio-contact-text">
                      <a href="tel:+918400001637">+91 84000 01637</a><br />
                      <a href="tel:+915224261727">+91 522 4261727</a>
                    </p>
                  </div>
                </div>

                {/* Email Us */}
                <div className="studio-contact-item">
                  <div className="studio-contact-icon-box">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div className="studio-contact-info">
                    <h5 className="studio-contact-title">Email Us</h5>
                    <p className="studio-contact-text">
                      <a href="mailto:info@mingrow.com">info@mingrow.com</a><br />
                      <a href="mailto:hi@mingrow.com">hi@mingrow.com</a>
                    </p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="studio-contact-item">
                  <div className="studio-contact-icon-box studio-whatsapp-box">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12.004 2C6.486 2 2 6.486 2 12.004c0 1.996.587 3.939 1.698 5.603L2 22l4.526-1.644a10.007 10.007 0 0 0 5.478 1.648c5.518 0 10.004-4.486 10.004-10.004C22.008 6.486 17.522 2 12.004 2zm0 18.286c-1.764 0-3.487-.478-4.98-1.382l-.357-.215-2.696.98.995-2.628-.236-.376A8.257 8.257 0 0 1 3.719 12.004C3.719 7.435 7.435 3.719 12.004 3.719c4.569 0 8.285 3.716 8.285 8.285 0 4.569-3.716 8.282-8.285 8.282z" />
                    </svg>
                  </div>
                  <div className="studio-contact-info">
                    <h5 className="studio-contact-title">WhatsApp</h5>
                    <p className="studio-contact-text">
                      <a href="https://wa.me/919598563098" target="_blank" rel="noopener noreferrer" className="studio-whatsapp-link">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="#25D366" style={{ marginRight: '6px', verticalAlign: '-2px' }}>
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z" />
                          <path d="M12.004 2C6.486 2 2 6.486 2 12.004c0 1.996.587 3.939 1.698 5.603L2 22l4.526-1.644a10.007 10.007 0 0 0 5.478 1.648c5.518 0 10.004-4.486 10.004-10.004C22.008 6.486 17.522 2 12.004 2zm0 18.286c-1.764 0-3.487-.478-4.98-1.382l-.357-.215-2.696.98.995-2.628-.236-.376A8.257 8.257 0 0 1 3.719 12.004C3.719 7.435 7.435 3.719 12.004 3.719c4.569 0 8.285 3.716 8.285 8.285 0 4.569-3.716 8.282-8.285 8.282z" />
                        </svg>
                        +91 95985 63098
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="studio-footer-bottom">
            <p className="studio-footer-copy">
              © {new Date().getFullYear()} Mingrow Space. All rights reserved.
            </p>
            <div className="studio-footer-bottom-links">
              <a href="https://space.mingrow.com/" target="_blank" rel="noopener noreferrer">space.mingrow.com</a>
              <span>•</span>
              <a href="https://www.instagram.com/mingrow_space/" target="_blank" rel="noopener noreferrer">@mingrow_space</a>
              <span>•</span>
              <button type="button" onClick={handleOpenTermsModal} className="studio-footer-terms-btn">Terms &amp; Conditions</button>
            </div>
          </div>
        </div>
      </footer>

      {/* Terms & Conditions Modal */}
      {isTermsModalOpen && (
        <div className="studio-modal-overlay" onClick={handleCloseTermsModal}>
          <div className="studio-modal studio-terms-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={handleCloseTermsModal} aria-label="Close Terms & Conditions">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="studio-terms-container">
              <h2 className="studio-terms-title">Terms &amp; Conditions</h2>
              <p className="studio-terms-subtitle">Mingrow Independence Day Special Offer</p>

              <div className="studio-terms-body">
                <p className="studio-terms-intro">
                  Welcome to the Mingrow Independence Day Special Offer. By making a booking under this campaign, you agree to the following Terms &amp; Conditions.
                </p>

                <div className="studio-terms-section">
                  <h3>1. Campaign Overview</h3>
                  <p>
                    Mingrow is running a special Independence Day promotional campaign where eligible customers can participate by making a qualifying booking of ₹2,500.
                  </p>
                  <p>
                    The campaign includes cash prizes, vouchers, and discounts as described below.
                  </p>
                </div>

                <div className="studio-terms-section">
                  <h3>2. Booking &amp; Eligibility</h3>
                  <ul>
                    <li>The qualifying booking amount is ₹2,500.</li>
                    <li>The offer will be activated once a total of 100 eligible bookings are completed.</li>
                    <li>Only successfully completed and eligible bookings will be counted toward the 100-booking target.</li>
                    <li>Cancelled, failed, refunded, duplicate, fraudulent, or otherwise invalid bookings will not be counted.</li>
                    <li>Each eligible customer/booking can participate only once unless Mingrow expressly states otherwise.</li>
                    <li>Mingrow reserves the right to verify booking and participant details before awarding any reward.</li>
                  </ul>
                </div>

                <div className="studio-terms-section">
                  <h3>3. Rewards</h3>
                  <p>Once the campaign reaches 100 eligible bookings, the following rewards will apply:</p>
                  <ul className="studio-rewards-list">
                    <li><strong>🥇 Grand Winner:</strong> ₹10,000 cash prize</li>
                    <li><strong>🥈 1st Runner-Up:</strong> ₹5,000 cash prize</li>
                    <li><strong>🥉 2nd Runner-Up:</strong> ₹5,000 cash prize</li>
                    <li><strong>🎁 Next 10 Eligible Participants:</strong> ₹2,500 Mingrow voucher</li>
                    <li><strong>🎉 Remaining Eligible Participants:</strong> 50% OFF on their next qualifying booking</li>
                  </ul>
                </div>

                <div className="studio-terms-section">
                  <h3>4. Reward Allocation</h3>
                  <ul>
                    <li>There will be 3 cash-prize winners in total.</li>
                    <li>The ₹10,000 prize will be awarded to one Grand Winner.</li>
                    <li>Two participants will receive ₹5,000 each.</li>
                    <li>The next 10 eligible participants, as determined by Mingrow's verified booking records, will receive a ₹2,500 voucher.</li>
                    <li>All other eligible participants will receive a 50% discount on their next qualifying booking.</li>
                    <li>Reward allocation is subject to verification of eligibility and successful completion of the campaign requirements.</li>
                  </ul>
                </div>

                <div className="studio-terms-section">
                  <h3>5. 90-Day Validity</h3>
                  <ul>
                    <li>The ₹2,500 voucher and 50% discount are valid for 90 days from the date the reward is issued, unless otherwise specified by Mingrow.</li>
                    <li>Rewards must be redeemed within the validity period.</li>
                    <li>Expired rewards cannot be extended, transferred, exchanged, or converted into cash unless Mingrow agrees otherwise in writing.</li>
                    <li>The 50% discount applies only to the eligible customer's next qualifying booking.</li>
                  </ul>
                </div>

                <div className="studio-terms-section">
                  <h3>6. Voucher Terms</h3>
                  <ul>
                    <li>The ₹2,500 voucher can only be used toward eligible Mingrow services/bookings.</li>
                    <li>The voucher cannot be exchanged for cash.</li>
                    <li>The voucher cannot be transferred or sold.</li>
                    <li>Any unused voucher balance will be subject to Mingrow's applicable voucher policy.</li>
                    <li>Voucher use may be subject to minimum booking requirements or other service-specific conditions.</li>
                  </ul>
                </div>

                <div className="studio-terms-section">
                  <h3>7. 50% Discount Terms</h3>
                  <ul>
                    <li>The 50% discount applies to the participant's next eligible booking only.</li>
                    <li>The discount is valid for 90 days.</li>
                    <li>The discount cannot be combined with another promotional discount unless specifically permitted by Mingrow.</li>
                    <li>The discount has no cash value.</li>
                    <li>The discount cannot be transferred or sold.</li>
                  </ul>
                </div>

                <div className="studio-terms-section">
                  <h3>8. Cash Prize Terms</h3>
                  <ul>
                    <li>Cash prizes will be awarded only after successful verification of the winners.</li>
                    <li>Winners may be required to provide valid identification and payment details for prize processing.</li>
                    <li>Applicable taxes, deductions, or statutory requirements relating to the prize will be handled in accordance with applicable law.</li>
                    <li>Mingrow may require reasonable documentation before releasing a prize.</li>
                  </ul>
                </div>

                <div className="studio-terms-section">
                  <h3>9. Winner Selection</h3>
                  <ul>
                    <li>Winners will be selected according to the campaign's stated eligibility and winner-selection process.</li>
                    <li>Mingrow will maintain records of eligible bookings for verification.</li>
                    <li>The decision of Mingrow regarding eligibility and reward allocation will be final, subject to applicable law.</li>
                    <li>If a selected winner is found to be ineligible, has provided incorrect information, or has violated these Terms &amp; Conditions, Mingrow may disqualify the participant and select another eligible participant where applicable.</li>
                  </ul>
                </div>

                <div className="studio-terms-section">
                  <h3>10. Cancellation &amp; Refunds</h3>
                  <ul>
                    <li>If a booking is cancelled or refunded, the booking may become ineligible for the campaign.</li>
                    <li>If a participant receives a reward and subsequently receives a refund for the qualifying booking, Mingrow reserves the right to cancel or recover the associated reward, subject to applicable law.</li>
                    <li>Refunds are governed by Mingrow's applicable booking and cancellation policy.</li>
                  </ul>
                </div>

                <div className="studio-terms-section">
                  <h3>11. Fraud &amp; Misuse</h3>
                  <p>Mingrow reserves the right to disqualify any participant suspected of:</p>
                  <ul>
                    <li>Creating multiple or fake accounts to obtain additional benefits.</li>
                    <li>Using fraudulent payment methods.</li>
                    <li>Manipulating bookings or campaign participation.</li>
                    <li>Providing false or misleading information.</li>
                    <li>Attempting to sell, transfer, or misuse campaign rewards.</li>
                    <li>Engaging in any activity intended to unfairly influence the campaign.</li>
                  </ul>
                </div>

                <div className="studio-terms-section">
                  <h3>12. Campaign Changes</h3>
                  <p>
                    Mingrow reserves the right to modify, suspend, extend, or cancel the campaign where necessary due to circumstances beyond its reasonable control, technical issues, fraud, regulatory requirements, or other legitimate reasons.
                  </p>
                  <p>
                    Any significant changes will be communicated through appropriate Mingrow channels.
                  </p>
                </div>

                <div className="studio-terms-section">
                  <h3>13. No Guaranteed Prize</h3>
                  <p>Participation in the campaign does not guarantee a cash prize.</p>
                  <p>Only 3 eligible participants will receive cash prizes:</p>
                  <ul>
                    <li><strong>₹10,000</strong> — Grand Winner</li>
                    <li><strong>₹5,000</strong> — 1st Runner-Up</li>
                    <li><strong>₹5,000</strong> — 2nd Runner-Up</li>
                  </ul>
                  <p>Other eligible participants will receive the applicable voucher or discount described above.</p>
                </div>

                <div className="studio-terms-section">
                  <h3>14. Taxes &amp; Statutory Requirements</h3>
                  <p>
                    Any applicable taxes, withholding, reporting requirements, or other statutory obligations relating to cash prizes or rewards will be handled in accordance with applicable Indian laws.
                  </p>
                  <p>
                    Participants are responsible for providing accurate information required for compliance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Support Purple Card Modal */}
      {isContactModalOpen && (
        <div className="studio-modal-overlay" onClick={handleCloseContactModal}>
          <div className="studio-modal studio-contact-purple-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn light-close-btn" onClick={handleCloseContactModal} aria-label="Close Contact Support">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="studio-purple-card-content">
              {/* Our Office */}
              <div className="studio-purple-item">
                <div className="studio-purple-icon-box">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div className="studio-purple-info">
                  <h4 className="studio-purple-title">Our Office</h4>
                  <p className="studio-purple-text">
                    C-8/270, Second Floor, Above Bank of Baroda,<br />
                    Jankipuram Vistar, Sector 8, Lucknow - 226021
                  </p>
                </div>
              </div>

              {/* Call Us */}
              <div className="studio-purple-item">
                <div className="studio-purple-icon-box">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div className="studio-purple-info">
                  <h4 className="studio-purple-title">Call Us</h4>
                  <p className="studio-purple-text">
                    <a href="tel:+918400001637">+91 84000 01637</a><br />
                    <a href="tel:+915224261727">+91 522 4261727</a>
                  </p>
                </div>
              </div>

              {/* Email Us */}
              <div className="studio-purple-item">
                <div className="studio-purple-icon-box">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div className="studio-purple-info">
                  <h4 className="studio-purple-title">Email Us</h4>
                  <p className="studio-purple-text">
                    <a href="mailto:info@mingrow.com">info@mingrow.com</a><br />
                    <a href="mailto:hi@mingrow.com">hi@mingrow.com</a>
                  </p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="studio-purple-item">
                <div className="studio-purple-icon-box studio-whatsapp-purple-box">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#25D366">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12.004 2C6.486 2 2 6.486 2 12.004c0 1.996.587 3.939 1.698 5.603L2 22l4.526-1.644a10.007 10.007 0 0 0 5.478 1.648c5.518 0 10.004-4.486 10.004-10.004C22.008 6.486 17.522 2 12.004 2zm0 18.286c-1.764 0-3.487-.478-4.98-1.382l-.357-.215-2.696.98.995-2.628-.236-.376A8.257 8.257 0 0 1 3.719 12.004C3.719 7.435 7.435 3.719 12.004 3.719c4.569 0 8.285 3.716 8.285 8.285 0 4.569-3.716 8.282-8.285 8.282z" />
                  </svg>
                </div>
                <div className="studio-purple-info">
                  <h4 className="studio-purple-title">WhatsApp</h4>
                  <p className="studio-purple-text">
                    <a href="https://wa.me/919598563098" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="#25D366">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z" />
                        <path d="M12.004 2C6.486 2 2 6.486 2 12.004c0 1.996.587 3.939 1.698 5.603L2 22l4.526-1.644a10.007 10.007 0 0 0 5.478 1.648c5.518 0 10.004-4.486 10.004-10.004C22.008 6.486 17.522 2 12.004 2zm0 18.286c-1.764 0-3.487-.478-4.98-1.382l-.357-.215-2.696.98.995-2.628-.236-.376A8.257 8.257 0 0 1 3.719 12.004C3.719 7.435 7.435 3.719 12.004 3.719c4.569 0 8.285 3.716 8.285 8.285 0 4.569-3.716 8.282-8.285 8.282z" />
                      </svg>
                      +91 95985 63098
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Multi-Step Booking Modal */}
      {isBookingModalOpen && (
        <BookingModal onClose={handleCloseBookingModal} />
      )}

      {/* Legacy simple contact modal (kept for backward compatibility) */}
      {isModalOpen && (
        <div className="studio-modal-overlay" onClick={handleCloseModal}>
          <div className="studio-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={handleCloseModal}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {!isSubmitted ? (
              <>
                <div className="modal-header">
                  <h3>Book Studio & Win Rewards</h3>
                  <p>Fill out your details to enter the Independence Day Cashback offer.</p>
                </div>

                <form className="studio-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      placeholder="Enter 10-digit mobile number"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="studioCity">Preferred Location</label>
                    <select
                      id="studioCity"
                      name="studioCity"
                      value={formData.studioCity}
                      onChange={handleInputChange}
                    >
                      <option value="Mumbai">Mumbai Studio</option>
                      <option value="Delhi">Delhi NCR Studio</option>
                      <option value="Bengaluru">Bengaluru Studio</option>
                      <option value="Hyderabad">Hyderabad Studio</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="bookingDate">Preferred Date</label>
                    <input
                      type="date"
                      id="bookingDate"
                      name="bookingDate"
                      value={formData.bookingDate}
                      onChange={handleInputChange}
                    />
                  </div>

                  <button type="submit" className="form-submit-btn">
                    Confirm & Reserve Offer
                  </button>
                </form>
              </>
            ) : (
              <div className="success-message">
                <div className="success-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <h4>Studio Booking Initiated!</h4>
                <p>Thank you <strong>{formData.name}</strong>! Your entry has been recorded for the Independence Day Special Cashback offer. Our team will contact you shortly on <strong>{formData.phone}</strong>.</p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>

      {/* Floating Winner Announcement Button — rendered via Portal directly on body
          so it's never trapped inside a CSS stacking context */}
      {ReactDOM.createPortal(
        <button
          type="button"
          className="floating-winner-btn"
          onClick={() => {
            window.location.href = '/announcement';
          }}
          aria-label="Winner Announcement"
        >
          <span className="winner-btn-icon">🏆</span>
          <div className="winner-btn-text-col">
            <span className="winner-btn-line1">Winner</span>
            <span className="winner-btn-line2">Announcement</span>
          </div>
        </button>,
        document.body
      )}
    </>
  );
}
