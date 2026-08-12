import React, { useState, useEffect, useCallback } from 'react';

// ───────────────────────────────────────────────────────────────────────────
// CONFIGURATION
// ───────────────────────────────────────────────────────────────────────────
const API_BASE = import.meta.env.VITE_API_BASE || '/api';

// ───────────────────────────────────────────────────────────────────────────
// HELPERS
// ───────────────────────────────────────────────────────────────────────────
function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

function formatSlot(slot) {
  if (!slot) return '';
  const [h, m] = slot.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${m.toString().padStart(2, '0')} ${period}`;
}

function formatAmount(paise) {
  return `₹${(paise / 100).toLocaleString('en-IN')}`;
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
  return /^[+]?[\d\s\-().]{7,15}$/.test(phone.trim());
}

function loadRazorpay() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

// ───────────────────────────────────────────────────────────────────────────
// STEP INDICATOR
// ───────────────────────────────────────────────────────────────────────────
function StepIndicator({ currentStep }) {
  const steps = ['Details', 'Schedule', 'Review', 'Payment'];
  return (
    <div className="bk-step-indicator">
      {steps.map((label, i) => {
        const stepNum = i + 1;
        const isActive = stepNum === currentStep;
        const isCompleted = stepNum < currentStep;
        return (
          <React.Fragment key={label}>
            <div className={`bk-step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
              <div className="bk-step-circle">
                {isCompleted ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <span>{stepNum}</span>
                )}
              </div>
              <span className="bk-step-label">{label}</span>
            </div>
            {i < steps.length - 1 && <div className={`bk-step-connector ${isCompleted ? 'completed' : ''}`} />}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// STEP 1 — CUSTOMER DETAILS
// ───────────────────────────────────────────────────────────────────────────
function StepDetails({ formData, onChange, onNext, appliedCoupon, onApplyCoupon, onRemoveCoupon }) {
  const [errors, setErrors] = useState({});
  const [couponInput, setCouponInput] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponErr, setCouponErr] = useState('');

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!validateEmail(formData.email)) errs.email = 'Enter a valid email address';
    if (!formData.phone.trim()) errs.phone = 'Mobile number is required';
    else if (!validatePhone(formData.phone)) errs.phone = 'Enter a valid phone number';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onNext();
  };

  const handleChange = (field, value) => {
    onChange(field, value);
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleApplyCoupon = async () => {
    const codeToTest = couponInput.trim();
    if (!codeToTest) {
      setCouponErr('Please enter a coupon code');
      return;
    }
    setCouponLoading(true);
    setCouponErr('');

    try {
      // 1. Try server API verify endpoint
      const res = await fetch(`${API_BASE}/coupons/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: codeToTest }),
      });
      
      const data = await res.json();
      if (res.ok && data.valid && data.coupon) {
        onApplyCoupon(data.coupon);
        setCouponInput('');
        setCouponLoading(false);
        return;
      }

      // 2. Client-side fallback to admin coupons saved in localStorage if API server fails or offline
      const localCoupons = JSON.parse(localStorage.getItem('mingrow_admin_coupons') || '[]');
      const matched = localCoupons.find(c => c.code.toUpperCase() === codeToTest.toUpperCase());
      
      if (matched) {
        if (!matched.is_active) {
          setCouponErr('This coupon is no longer active');
        } else if (matched.expiry_date && new Date(matched.expiry_date) < new Date()) {
          setCouponErr('This coupon has expired');
        } else if (matched.max_uses && matched.used_count >= matched.max_uses) {
          setCouponErr('Coupon usage limit reached');
        } else {
          onApplyCoupon({
            id: matched.id,
            code: matched.code,
            discount_type: matched.discount_type || 'PERCENTAGE',
            discount_value: parseInt(matched.discount_value, 10),
          });
          setCouponInput('');
          setCouponErr('');
        }
      } else {
        setCouponErr(data.error || 'Invalid coupon code');
      }
    } catch (err) {
      // Fallback check against localStorage in case of network issue
      const localCoupons = JSON.parse(localStorage.getItem('mingrow_admin_coupons') || '[]');
      const matched = localCoupons.find(c => c.code.toUpperCase() === codeToTest.toUpperCase());
      
      if (matched && matched.is_active) {
        onApplyCoupon({
          id: matched.id,
          code: matched.code,
          discount_type: matched.discount_type || 'PERCENTAGE',
          discount_value: parseInt(matched.discount_value, 10),
        });
        setCouponInput('');
        setCouponErr('');
      } else {
        setCouponErr('Invalid or expired coupon code');
      }
    } finally {
      setCouponLoading(false);
    }
  };

  return (
    <form className="bk-form" onSubmit={handleSubmit} noValidate>
      <div className="bk-form-header">
        <h3>Your Details</h3>
        <p>Tell us a bit about yourself to get started</p>
      </div>

      <div className="bk-fields">
        <div className={`bk-field ${errors.name ? 'error' : ''}`}>
          <label htmlFor="bk-name">Full Name <span className="required">*</span></label>
          <input
            type="text"
            id="bk-name"
            autoComplete="name"
            placeholder="e.g. Rahul Sharma"
            value={formData.name}
            onChange={e => handleChange('name', e.target.value)}
          />
          {errors.name && <span className="bk-error-msg">{errors.name}</span>}
        </div>

        <div className={`bk-field ${errors.email ? 'error' : ''}`}>
          <label htmlFor="bk-email">Email Address <span className="required">*</span></label>
          <input
            type="email"
            id="bk-email"
            autoComplete="email"
            placeholder="you@company.com"
            value={formData.email}
            onChange={e => handleChange('email', e.target.value)}
          />
          {errors.email && <span className="bk-error-msg">{errors.email}</span>}
        </div>

        <div className={`bk-field ${errors.phone ? 'error' : ''}`}>
          <label htmlFor="bk-phone">Mobile Number <span className="required">*</span></label>
          <input
            type="tel"
            id="bk-phone"
            autoComplete="tel"
            placeholder="+91 98765 43210"
            value={formData.phone}
            onChange={e => handleChange('phone', e.target.value)}
          />
          {errors.phone && <span className="bk-error-msg">{errors.phone}</span>}
        </div>

        {/* ── Coupon Code Section (Step 1 - After Mobile Number) ── */}
        <div className="bk-field bk-coupon-section">
          <label htmlFor="bk-coupon">Coupon Code <span className="optional">(optional)</span></label>
          
          {appliedCoupon ? (
            <div className="bk-coupon-applied-box">
              <div className="bk-coupon-badge">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
                  <line x1="7" y1="7" x2="7.01" y2="7"/>
                </svg>
                <span>
                  <strong>{appliedCoupon.code}</strong> ({appliedCoupon.discount_type === 'FIXED' ? `₹${appliedCoupon.discount_value}` : `${appliedCoupon.discount_value}%`} OFF applied)
                </span>
              </div>
              <button
                type="button"
                className="bk-coupon-remove-btn"
                onClick={onRemoveCoupon}
              >
                Remove
              </button>
            </div>
          ) : (
            <div className="bk-coupon-input-group">
              <input
                type="text"
                id="bk-coupon"
                placeholder="Enter coupon code (e.g. MINGROW20)"
                value={couponInput}
                onChange={e => {
                  setCouponInput(e.target.value.toUpperCase());
                  setCouponErr('');
                }}
              />
              <button
                type="button"
                className="bk-coupon-apply-btn"
                onClick={handleApplyCoupon}
                disabled={couponLoading || !couponInput.trim()}
              >
                {couponLoading ? 'Checking...' : 'Apply'}
              </button>
            </div>
          )}

          {couponErr && <span className="bk-error-msg">{couponErr}</span>}
        </div>

        <div className="bk-field">
          <label htmlFor="bk-notes">Additional Requirements <span className="optional">(optional)</span></label>
          <textarea
            id="bk-notes"
            placeholder="Let us know anything specific you need for your session..."
            rows={3}
            value={formData.notes}
            onChange={e => handleChange('notes', e.target.value)}
          />
        </div>
      </div>

      <button type="submit" className="bk-btn-primary">
        Continue to Schedule
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
        </svg>
      </button>
    </form>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// STEP 2 — DATE & TIME SLOT
// ───────────────────────────────────────────────────────────────────────────
function StepSchedule({ selectedDate, selectedSlot, onDateChange, onSlotChange, onNext, onBack }) {
  const [availableDates, setAvailableDates] = useState([]);
  const [allSlots, setAllSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]); // PAID slots → show as "Booked"
  const [pastSlots, setPastSlots] = useState([]);     // Past-time slots for today → greyed out
  const [loadingDates, setLoadingDates] = useState(true);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [error, setError] = useState('');
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const d = new Date();
    return { year: d.getFullYear(), month: d.getMonth() };
  });

  // Load available dates
  useEffect(() => {
    setLoadingDates(true);
    fetch(`${API_BASE}/bookings/availability`)
      .then(r => r.json())
      .then(data => {
        setAvailableDates(data.availableDates || []);
        setLoadingDates(false);
      })
      .catch(() => {
        // Fallback: generate Mon–Sat for next 90 days client-side starting today
        const dates = [];
        const cursor = new Date();
        for (let i = 0; i < 90; i++) {
          const day = cursor.getDay();
          if (day >= 1 && day <= 6) {
            const y = cursor.getFullYear();
            const m = String(cursor.getMonth() + 1).padStart(2, '0');
            const d = String(cursor.getDate()).padStart(2, '0');
            dates.push(`${y}-${m}-${d}`);
          }
          cursor.setDate(cursor.getDate() + 1);
        }
        setAvailableDates(dates);
        setLoadingDates(false);
      });
  }, []);

  // Load slots when date changes + auto-refresh every 5 seconds to reflect live bookings
  useEffect(() => {
    if (!selectedDate) {
      setAllSlots([]);
      setBookedSlots([]);
      setPastSlots([]);
      return;
    }

    let isMounted = true;

    const DEFAULT_ALL_SLOTS = [
      '09:00','10:00','11:00','12:00','13:00','14:00',
      '15:00','16:00','17:00','18:00','19:00','20:00','21:00'
    ];

    const computeSlotStates = (all, booked, date) => {
      const now = new Date();
      const [sy, sm, sd] = date.split('-').map(Number);
      const isToday = (
        now.getFullYear() === sy &&
        now.getMonth() === (sm - 1) &&
        now.getDate() === sd
      );

      const bookedSet = new Set(booked);
      const past = [];

      // Compute past slots for today only
      if (isToday) {
        for (const slot of all) {
          if (bookedSet.has(slot)) continue; // booked takes priority over past display
          const [h, min] = slot.split(':').map(Number);
          const slotTime = new Date(sy, sm - 1, sd, h, min, 0, 0);
          if (slotTime <= now) {
            past.push(slot);
          }
        }
      }

      return { past };
    };

    const loadSlots = (showLoading = false) => {
      if (showLoading) setLoadingSlots(true);
      fetch(`${API_BASE}/bookings/availability?date=${selectedDate}`)
        .then(r => r.json())
        .then(data => {
          if (!isMounted) return;

          const all = data.allSlots || DEFAULT_ALL_SLOTS;
          // bookedSlots from API are PAID slots only (as per availability.js)
          const booked = data.bookedSlots || [];

          const { past } = computeSlotStates(all, booked, selectedDate);

          setAllSlots(all);
          setBookedSlots(booked);
          setPastSlots(past);

          if (showLoading) setLoadingSlots(false);

          // If previously selected slot is now booked or past, deselect it
          const bookedSet = new Set(booked);
          const pastSet = new Set(past);
          if (selectedSlot && (bookedSet.has(selectedSlot) || pastSet.has(selectedSlot))) {
            onSlotChange('');
          }

          // Check if any slots are actually available (not booked, not past)
          const bookedSetFull = new Set(booked);
          const pastSetFull = new Set(past);
          const anyAvailable = all.some(s => !bookedSetFull.has(s) && !pastSetFull.has(s));

          if (!anyAvailable) {
            setError('No slots available for this date. Please choose another day.');
          } else {
            setError('');
          }
        })
        .catch(() => {
          if (!isMounted) return;
          // Fallback: generate slots and filter past ones for today
          const now = new Date();
          const [sy, sm, sd] = selectedDate.split('-').map(Number);
          const isToday = new Date(sy, sm - 1, sd).toDateString() === now.toDateString();
          const past = [];

          const slots = DEFAULT_ALL_SLOTS.filter(slotStr => {
            const [h] = slotStr.split(':').map(Number);
            if (isToday) {
              const slotTime = new Date(sy, sm - 1, sd, h, 0, 0, 0);
              if (slotTime <= now) {
                past.push(slotStr);
                return true; // keep in all, but mark past
              }
            }
            return true;
          });

          setAllSlots(slots);
          setBookedSlots([]);
          setPastSlots(past);
          if (showLoading) setLoadingSlots(false);

          const anyAvailable = slots.some(s => !past.includes(s));
          if (!anyAvailable) {
            setError('No slots available for this date. Please choose another day.');
          } else {
            setError('');
          }
        });
    };

    loadSlots(true);

    const interval = setInterval(() => {
      loadSlots(false);
    }, 5000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [selectedDate, selectedSlot, onSlotChange]);

  // Calendar rendering
  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const { year, month } = calendarMonth;
  const totalDays = daysInMonth(year, month);
  const startDay = firstDayOfMonth(year, month);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const availableSet = new Set(availableDates);

  const isDateAvailable = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return availableSet.has(dateStr);
  };

  const isDatePast = (day) => {
    const d = new Date(year, month, day);
    return d < today;
  };

  const handleDateClick = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    if (!isDateAvailable(day)) return;
    onDateChange(dateStr);
    onSlotChange('');
  };

  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  const prevMonth = () => {
    setCalendarMonth(prev => {
      if (prev.month === 0) return { year: prev.year - 1, month: 11 };
      return { year: prev.year, month: prev.month - 1 };
    });
  };

  const nextMonth = () => {
    setCalendarMonth(prev => {
      if (prev.month === 11) return { year: prev.year + 1, month: 0 };
      return { year: prev.year, month: prev.month + 1 };
    });
  };

  // Prevent navigating to past months
  const canGoPrev = () => {
    const currentDate = new Date();
    return !(year === currentDate.getFullYear() && month <= currentDate.getMonth());
  };

  const canProceed = selectedDate && selectedSlot;

  // Build slot state sets for rendering
  const bookedSet = new Set(bookedSlots);
  const pastSet = new Set(pastSlots);

  return (
    <div className="bk-schedule">
      <div className="bk-form-header">
        <h3>Choose Your Slot</h3>
        <p>Pick a date and time that works for you</p>
      </div>

      {/* Calendar */}
      <div className="bk-calendar">
        <div className="bk-cal-header">
          <button
            type="button"
            className="bk-cal-nav"
            onClick={prevMonth}
            disabled={!canGoPrev()}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <span className="bk-cal-month">{monthNames[month]} {year}</span>
          <button type="button" className="bk-cal-nav" onClick={nextMonth}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        <div className="bk-cal-grid">
          {dayNames.map(d => (
            <div key={d} className="bk-cal-day-name">{d}</div>
          ))}
          {/* Empty cells for start of month */}
          {Array.from({ length: startDay }, (_, i) => (
            <div key={`empty-${i}`} className="bk-cal-cell empty" />
          ))}
          {/* Day cells */}
          {Array.from({ length: totalDays }, (_, i) => {
            const day = i + 1;
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isPast = isDatePast(day);
            const isAvail = isDateAvailable(day);
            const isSelected = selectedDate === dateStr;
            const isToday = new Date(year, month, day).toDateString() === today.toDateString();

            return (
              <button
                key={day}
                type="button"
                className={`bk-cal-cell ${isSelected ? 'selected' : ''} ${isPast || !isAvail || loadingDates ? 'disabled' : 'available'} ${isToday ? 'today' : ''}`}
                onClick={() => handleDateClick(day)}
                disabled={isPast || !isAvail || loadingDates}
              >
                {day}
              </button>
            );
          })}
        </div>

        {loadingDates && (
          <div className="bk-loading">
            <div className="bk-spinner" />
            <span>Loading availability...</span>
          </div>
        )}
      </div>

      {/* Time Slots */}
      {selectedDate && (
        <div className="bk-slots-section">
          <div className="bk-slots-header">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
            <span>Time Slots — {formatDate(selectedDate)}</span>
          </div>

          {loadingSlots ? (
            <div className="bk-loading">
              <div className="bk-spinner" />
              <span>Loading time slots...</span>
            </div>
          ) : allSlots.length === 0 ? (
            <p className="bk-slots-error">No slots configured for this date. Please choose another day.</p>
          ) : (
            <>
              <div className="bk-slots-grid">
                {allSlots.map(slot => {
                  const isBooked = bookedSet.has(slot);
                  const isPast = pastSet.has(slot);
                  const isSelected = selectedSlot === slot;
                  const isDisabled = isBooked || isPast;

                  let slotClass = 'bk-slot';
                  if (isSelected) slotClass += ' selected';
                  if (isBooked) slotClass += ' booked';
                  else if (isPast) slotClass += ' past';
                  else slotClass += ' available';

                  return (
                    <button
                      key={slot}
                      type="button"
                      className={slotClass}
                      onClick={() => !isDisabled && onSlotChange(slot)}
                      disabled={isDisabled}
                      title={isBooked ? 'This slot is already booked' : isPast ? 'This time has passed' : `Book ${formatSlot(slot)}`}
                    >
                      <span className="bk-slot-time">{formatSlot(slot)}</span>
                      {isBooked && <span className="bk-slot-status-label">Booked</span>}
                      {isPast && !isBooked && <span className="bk-slot-status-label">Past</span>}
                    </button>
                  );
                })}
              </div>

              {error && <p className="bk-slots-error bk-slots-error-inline">{error}</p>}
            </>
          )}
        </div>
      )}

      <div className="bk-actions">
        <button type="button" className="bk-btn-secondary" onClick={onBack}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
          </svg>
          Back
        </button>
        <button
          type="button"
          className="bk-btn-primary"
          disabled={!canProceed}
          onClick={onNext}
        >
          Review Booking
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// Centralized price calculation helper used across StepReview & Payment gateway order creation
const BASE_STUDIO_FEE_PAISE = 250000;

function computeFinalAmount(coupon) {
  if (!coupon || !coupon.discount_value || coupon.discount_value <= 0) {
    return {
      basePaise: BASE_STUDIO_FEE_PAISE,
      finalPaise: BASE_STUDIO_FEE_PAISE,
      discountLabel: '',
      isDiscounted: false,
    };
  }

  let finalPaise = BASE_STUDIO_FEE_PAISE;
  let discountLabel = '';

  if (coupon.discount_type === 'FIXED') {
    const fixedPaise = coupon.discount_value * 100;
    finalPaise = Math.max(0, BASE_STUDIO_FEE_PAISE - fixedPaise);
    discountLabel = `-₹${coupon.discount_value} OFF`;
  } else {
    // Default: PERCENTAGE
    const pct = coupon.discount_value;
    const discountPaise = Math.round((BASE_STUDIO_FEE_PAISE * pct) / 100);
    finalPaise = Math.max(0, BASE_STUDIO_FEE_PAISE - discountPaise);
    discountLabel = `-${pct}% OFF`;
  }

  return {
    basePaise: BASE_STUDIO_FEE_PAISE,
    finalPaise,
    discountLabel,
    isDiscounted: true,
  };
}

// ───────────────────────────────────────────────────────────────────────────
// STEP 3 — REVIEW BOOKING
// ───────────────────────────────────────────────────────────────────────────
function StepReview({ formData, selectedDate, selectedSlot, appliedCoupon, onBack, onProceed, loading }) {
  const priceInfo = computeFinalAmount(appliedCoupon);
  const finalFeePaise = priceInfo.finalPaise;
  const discountLabel = priceInfo.discountLabel;

  return (
    <div className="bk-review">
      <div className="bk-form-header">
        <h3>Review Your Booking</h3>
        <p>Please confirm your details before payment</p>
      </div>

      <div className="bk-review-card">
        <div className="bk-review-section">
          <div className="bk-review-section-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
            Customer Details
          </div>
          <div className="bk-review-rows">
            <div className="bk-review-row"><span>Name</span><strong>{formData.name}</strong></div>
            <div className="bk-review-row"><span>Email</span><strong>{formData.email}</strong></div>
            <div className="bk-review-row"><span>Phone</span><strong>{formData.phone}</strong></div>
            {formData.companyName && <div className="bk-review-row"><span>Company</span><strong>{formData.companyName}</strong></div>}
          </div>
        </div>

        <div className="bk-review-divider" />

        <div className="bk-review-section">
          <div className="bk-review-section-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            Appointment
          </div>
          <div className="bk-review-rows">
            <div className="bk-review-row"><span>Date</span><strong>{formatDate(selectedDate)}</strong></div>
            <div className="bk-review-row"><span>Time</span><strong>{formatSlot(selectedSlot)}</strong></div>
            <div className="bk-review-row"><span>Duration</span><strong>1 Hour Session</strong></div>
          </div>
        </div>

        <div className="bk-review-divider" />

        <div className="bk-review-amount">
          <span>Studio Booking Fee</span>
          <div className="bk-review-price">
            {appliedCoupon ? (
              <div className="bk-price-discount-container">
                <div className="bk-price-strike-row">
                  <span className="bk-original-price-strike">{formatAmount(priceInfo.basePaise)}</span>
                  <span className="bk-coupon-tag-badge">{discountLabel}</span>
                </div>
                <strong className="bk-discounted-price">{formatAmount(finalFeePaise)}</strong>
              </div>
            ) : (
              <strong>{formatAmount(priceInfo.basePaise)}</strong>
            )}
            <span className="bk-review-gst">+ GST (if applicable)</span>
          </div>
        </div>
      </div>

      <div className="bk-hold-notice">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        Your slot is temporarily held for <strong>10 minutes</strong>. Complete payment to confirm.
      </div>

      <div className="bk-actions">
        <button type="button" className="bk-btn-secondary" onClick={onBack} disabled={loading}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
          </svg>
          Back
        </button>
        <button type="button" className="bk-btn-primary bk-btn-pay" onClick={() => onProceed(finalFeePaise)} disabled={loading}>
          {loading ? (
            <>
              <div className="bk-spinner small" />
              Processing...
            </>
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
              </svg>
              Pay {formatAmount(finalFeePaise)}
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// STEP 4 — SUCCESS SCREEN
// ───────────────────────────────────────────────────────────────────────────
function StepSuccess({ confirmationData, onClose }) {
  return (
    <div className="bk-success">
      <div className="bk-success-icon">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h3>Studio Booked!</h3>
      <p className="bk-success-sub">Your booking is confirmed. See you at the studio!</p>

      <div className="bk-success-ref">
        <span>Booking ID</span>
        <strong>{confirmationData.bookingReference}</strong>
      </div>

      <div className="bk-success-details">
        <div className="bk-success-row">
          <span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            Date
          </span>
          <strong>{formatDate(confirmationData.bookingDate)}</strong>
        </div>
        <div className="bk-success-row">
          <span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            Time
          </span>
          <strong>{formatSlot(confirmationData.timeSlot)}</strong>
        </div>
        <div className="bk-success-row">
          <span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
            Email
          </span>
          <strong>{confirmationData.customerEmail}</strong>
        </div>
        <div className="bk-success-row">
          <span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
            </svg>
            Payment
          </span>
          <strong className="bk-paid-badge">
            {formatAmount(confirmationData.amount)} — PAID ✓
          </strong>
        </div>
      </div>

      <p className="bk-success-email-note">
        📧 A confirmation has been sent to your email.
      </p>

      <button type="button" className="bk-btn-primary" onClick={onClose}>
        Done
      </button>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// PAYMENT FAILURE SCREEN
// ───────────────────────────────────────────────────────────────────────────
function PaymentFailed({ error, onRetry, onClose }) {
  return (
    <div className="bk-failed">
      <div className="bk-failed-icon">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
        </svg>
      </div>
      <h3>Payment Failed</h3>
      <p className="bk-failed-msg">
        {error || 'Your payment could not be processed. Your slot reservation will expire shortly if payment is not completed.'}
      </p>
      <div className="bk-actions bk-actions-col">
        <button type="button" className="bk-btn-primary" onClick={onRetry}>
          Try Again
        </button>
        <button type="button" className="bk-btn-ghost" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// MAIN BOOKING MODAL
// ───────────────────────────────────────────────────────────────────────────
export default function BookingModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    website: '',
    notes: '',
  });
  const [appliedCoupon, setAppliedCoupon] = useState(null); // { id, code, discount_type, discount_value }
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [loading, setLoading] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const [confirmationData, setConfirmationData] = useState(null);
  const [paymentError, setPaymentError] = useState('');
  const [screenState, setScreenState] = useState('form'); // 'form' | 'success' | 'failed'

  const handleFieldChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleProceedToPayment = async (customAmountPaise) => {
    setLoading(true);
    setPaymentError('');

    // Single source of truth for final payment amount
    const priceCalculation = computeFinalAmount(appliedCoupon);
    const finalAmountToPayPaise = customAmountPaise || priceCalculation.finalPaise;

    try {
      // Step 1: Create booking (slot reservation)
      const bookingRes = await fetch(`${API_BASE}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim(),
          companyName: formData.companyName.trim() || undefined,
          website: formData.website.trim() || undefined,
          notes: formData.notes.trim() || undefined,
          bookingDate: selectedDate,
          timeSlot: selectedSlot,
          couponCode: appliedCoupon ? appliedCoupon.code : undefined,
          amount: finalAmountToPayPaise,
        }),
      });

      const safeFetchJson = async (res) => {
        const text = await res.text();
        const contentType = res.headers.get('content-type') || '';
        if (contentType.includes('text/html') || text.trim().startsWith('<')) {
          throw new Error(`API endpoint returned HTML (200 OK index page) instead of JSON. Ensure the backend API server/serverless functions are deployed and VITE_API_BASE is configured.`);
        }
        try {
          return text ? JSON.parse(text) : {};
        } catch {
          throw new Error(`Server returned invalid response (${res.status}). Please verify server backend connectivity.`);
        }
      };

      const bookingData = await safeFetchJson(bookingRes);

      if (!bookingRes.ok) {
        if (bookingRes.status === 409 || bookingData.code === 'SLOT_TAKEN') {
          // Slot was just booked by someone else — go back to slot picker
          setSelectedSlot('');
          setStep(2);
          setLoading(false);
          throw new Error('This time slot is no longer available as it has just been booked. Please pick another slot.');
        }
        throw new Error(bookingData.error || 'Failed to reserve slot');
      }

      const currentBookingId = bookingData.bookingId;
      setBookingId(currentBookingId);

      // Step 2: Create Razorpay order (pass exact single-source final amount)
      const orderRes = await fetch(`${API_BASE}/payments/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId: currentBookingId, amount: finalAmountToPayPaise }),
      });

      const orderData = await safeFetchJson(orderRes);

      if (!orderRes.ok) {
        if (orderRes.status === 409 || orderData.code === 'SLOT_TAKEN') {
          setSelectedSlot('');
          setStep(2);
          setLoading(false);
          throw new Error('This time slot was just booked by another customer. Please pick another slot.');
        }
        throw new Error(orderData.error || 'Failed to create payment order');
      }

      // Step 3: Load Razorpay and open checkout
      const razorpayLoaded = await loadRazorpay();
      if (!razorpayLoaded) {
        throw new Error('Failed to load Razorpay. Please check your internet connection.');
      }

      setLoading(false);

      const rzpOptions = {
        key: orderData.keyId,
        amount: orderData.amount || finalAmountToPayPaise,
        currency: orderData.currency,
        name: 'Mingrow Studio',
        description: `Studio Booking — ${formatDate(selectedDate)} ${formatSlot(selectedSlot)}`,
        order_id: orderData.orderId,
        prefill: orderData.prefill,
        theme: { color: '#7c3aed' },
        modal: {
          ondismiss: () => {
            setScreenState('failed');
            setPaymentError('Payment was cancelled. Your slot is held for a few more minutes. You can try again.');
          },
        },
        handler: async (response) => {
          // Payment completed on Razorpay side — verify on backend
          setLoading(true);
          try {
            const verifyRes = await fetch(`${API_BASE}/payments/verify`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
                bookingId: currentBookingId,
              }),
            });

            const verifyData = await verifyRes.json();

            if (!verifyRes.ok || !verifyData.success) {
              throw new Error(verifyData.error || 'Payment verification failed');
            }

            // Payment verified → slot is now marked PAID on backend
            // Show success screen with full confirmation details
            setConfirmationData(verifyData);
            setScreenState('success');
          } catch (verifyErr) {
            setPaymentError(verifyErr.message || 'Payment verification failed. Please contact support.');
            setScreenState('failed');
          } finally {
            setLoading(false);
          }
        },
      };

      const rzp = new window.Razorpay(rzpOptions);
      rzp.on('payment.failed', (resp) => {
        setPaymentError(resp.error?.description || 'Payment failed. Please try again.');
        setScreenState('failed');
      });
      rzp.open();

    } catch (err) {
      setLoading(false);
      if (screenState !== 'form') return; // already navigated away
      setPaymentError(err.message || 'Something went wrong. Please try again.');
      setScreenState('failed');
    }
  };

  const handleRetry = () => {
    setScreenState('form');
    setPaymentError('');
    // Reset back to review step if we have a bookingId (slot may still be held)
    if (bookingId) {
      setStep(3);
    } else {
      setStep(1);
    }
  };

  return (
    <div className="bk-overlay" onClick={onClose}>
      <div
        className="bk-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Book Studio"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bk-modal-header">
          <h2 className="bk-modal-title">Mingrow Studio Book Form</h2>
          <button
            type="button"
            className="bk-close-btn"
            onClick={onClose}
            aria-label="Close booking"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Step indicator (only show during form steps) */}
        {screenState === 'form' && <StepIndicator currentStep={step} />}

        {/* Content */}
        <div className="bk-modal-body">
          {screenState === 'success' && confirmationData && (
            <StepSuccess confirmationData={confirmationData} onClose={onClose} />
          )}
          {screenState === 'failed' && (
            <PaymentFailed error={paymentError} onRetry={handleRetry} onClose={onClose} />
          )}
          {screenState === 'form' && (
            <>
              {step === 1 && (
                <StepDetails
                  formData={formData}
                  onChange={handleFieldChange}
                  onNext={() => setStep(2)}
                  appliedCoupon={appliedCoupon}
                  onApplyCoupon={c => setAppliedCoupon(c)}
                  onRemoveCoupon={() => setAppliedCoupon(null)}
                />
              )}
              {step === 2 && (
                <StepSchedule
                  selectedDate={selectedDate}
                  selectedSlot={selectedSlot}
                  onDateChange={setSelectedDate}
                  onSlotChange={setSelectedSlot}
                  onNext={() => setStep(3)}
                  onBack={() => setStep(1)}
                />
              )}
              {step === 3 && (
                <StepReview
                  formData={formData}
                  selectedDate={selectedDate}
                  selectedSlot={selectedSlot}
                  appliedCoupon={appliedCoupon}
                  onBack={() => setStep(2)}
                  onProceed={handleProceedToPayment}
                  loading={loading}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
