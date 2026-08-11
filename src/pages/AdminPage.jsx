import React, { useState, useEffect, useCallback } from 'react';
import './admin.css';

const API_BASE = import.meta.env.VITE_API_BASE || '/api';

// ── Helpers ──────────────────────────────────────────────────────────
function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatDateTime(dtStr) {
  if (!dtStr) return '—';
  const d = new Date(dtStr);
  return d.toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function formatSlot(slot) {
  if (!slot) return '—';
  const [h, m] = slot.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${m.toString().padStart(2, '0')} ${period}`;
}

function formatAmount(paise) {
  if (!paise && paise !== 0) return '—';
  return `₹${(paise / 100).toLocaleString('en-IN')}`;
}

function useAdminKey() {
  const [adminKey, setAdminKey] = useState(() => sessionStorage.getItem('admin_key') || '');
  const [authed, setAuthed] = useState(false);

  const tryAuth = async (key) => {
    const res = await fetch(`${API_BASE}/admin/stats`, {
      headers: { 'x-admin-key': key },
    });
    return res.ok;
  };

  return { adminKey, setAdminKey, authed, setAuthed, tryAuth };
}

// ── Status Badges ─────────────────────────────────────────────────────
function BookingBadge({ status }) {
  const map = {
    PAID: 'badge-green',
    HELD: 'badge-yellow',
    PENDING: 'badge-yellow',
    CANCELLED: 'badge-red',
    EXPIRED: 'badge-gray',
    REFUNDED: 'badge-blue',
  };
  return <span className={`adm-badge ${map[status] || 'badge-gray'}`}>{status}</span>;
}

function PaymentBadge({ status }) {
  const map = {
    SUCCESS: 'badge-green',
    CREATED: 'badge-purple',
    PENDING: 'badge-yellow',
    FAILED: 'badge-red',
    REFUNDED: 'badge-blue',
  };
  return <span className={`adm-badge ${map[status] || 'badge-gray'}`}>{status || '—'}</span>;
}

// ── Stats Cards ───────────────────────────────────────────────────────
function StatsCards({ stats, activeFilter, onCardClick }) {
  const cards = [
    { id: 'TOTAL', label: 'Total Bookings', value: stats.totalBookings, icon: '📋', color: '#7c3aed', filter: { bookingStatus: 'ALL', paymentStatus: 'ALL', dateFilter: 'ALL' } },
    { id: 'PAID', label: 'Paid Bookings', value: stats.paidBookings, icon: '✅', color: '#16a34a', filter: { bookingStatus: 'PAID', paymentStatus: 'ALL', dateFilter: 'ALL' } },
    { id: 'PENDING', label: 'Pending / Held', value: stats.pendingBookings, icon: '⏳', color: '#d97706', filter: { bookingStatus: 'PENDING', paymentStatus: 'ALL', dateFilter: 'ALL' } },
    { id: 'CANCELLED', label: 'Cancelled', value: stats.cancelledBookings, icon: '❌', color: '#ef4444', filter: { bookingStatus: 'CANCELLED', paymentStatus: 'ALL', dateFilter: 'ALL' } },
    { id: 'TOTAL_REV', label: 'Total Revenue', value: `₹${(stats.totalRevenue || 0).toLocaleString('en-IN')}`, icon: '💰', color: '#059669', filter: { bookingStatus: 'PAID', paymentStatus: 'ALL', dateFilter: 'ALL' } },
    { id: 'TODAY_REV', label: "Today's Revenue", value: `₹${(stats.todayRevenue || 0).toLocaleString('en-IN')}`, icon: '📅', color: '#2563eb', filter: { bookingStatus: 'PAID', paymentStatus: 'ALL', dateFilter: 'TODAY' } },
    { id: 'UPCOMING', label: 'Upcoming Demos', value: stats.upcomingDemos, icon: '🗓️', color: '#7c3aed', filter: { bookingStatus: 'PAID', paymentStatus: 'ALL', dateFilter: 'UPCOMING' } },
    { id: 'MONTH_REV', label: "Month Revenue", value: `₹${(stats.monthRevenue || 0).toLocaleString('en-IN')}`, icon: '📈', color: '#16a34a', filter: { bookingStatus: 'PAID', paymentStatus: 'ALL', dateFilter: 'THIS_MONTH' } },
  ];

  return (
    <div className="adm-stats-grid">
      {cards.map(card => {
        const isActive = activeFilter === card.id;
        return (
          <div 
            key={card.label} 
            className={`adm-stat-card ${isActive ? 'adm-stat-card-active' : ''}`} 
            style={{ '--accent': card.color }}
            onClick={() => onCardClick && onCardClick(card)}
            role="button"
            tabIndex={0}
          >
            <div className="adm-stat-icon">{card.icon}</div>
            <div className="adm-stat-body">
              <div className="adm-stat-value">{card.value ?? '—'}</div>
              <div className="adm-stat-label">{card.label}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Booking Detail Modal ───────────────────────────────────────────────
function BookingDetailModal({ booking, onClose, onCancel }) {
  const [cancelling, setCancelling] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const adminKey = sessionStorage.getItem('admin_key') || '';

  const payment = booking.payments?.[0];

  const handleCancel = async () => {
    setCancelling(true);
    try {
      const res = await fetch(`${API_BASE}/admin/bookings/${booking.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
        body: JSON.stringify({ action: 'CANCEL', reason: cancelReason }),
      });
      if (res.ok) {
        onCancel(booking.id);
        onClose();
      }
    } finally {
      setCancelling(false);
    }
  };

  const canCancel = !['CANCELLED', 'EXPIRED', 'REFUNDED'].includes(booking.status);
  const customer = booking.customers;

  return (
    <div className="adm-overlay" onClick={onClose}>
      <div className="adm-detail-modal" onClick={e => e.stopPropagation()}>
        <div className="adm-detail-header">
          <div>
            <h3>{booking.booking_reference}</h3>
            <div className="adm-detail-badges">
              <BookingBadge status={booking.status} />
              <PaymentBadge status={payment?.status} />
            </div>
          </div>
          <button className="adm-close-btn" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="adm-detail-body">
          {/* Customer */}
          <div className="adm-detail-section">
            <div className="adm-detail-section-title">👤 Customer</div>
            <div className="adm-detail-rows">
              <div className="adm-detail-row"><span>Name</span><strong>{customer?.name}</strong></div>
              <div className="adm-detail-row"><span>Email</span><strong>{customer?.email}</strong></div>
              <div className="adm-detail-row"><span>Phone</span><strong>{customer?.phone}</strong></div>
              {customer?.company_name && <div className="adm-detail-row"><span>Company</span><strong>{customer.company_name}</strong></div>}
              {customer?.website && <div className="adm-detail-row"><span>Website</span><strong><a href={customer.website} target="_blank" rel="noopener noreferrer">{customer.website}</a></strong></div>}
            </div>
          </div>

          {/* Appointment */}
          <div className="adm-detail-section">
            <div className="adm-detail-section-title">📅 Appointment</div>
            <div className="adm-detail-rows">
              <div className="adm-detail-row"><span>Booking ID</span><strong>{booking.booking_reference}</strong></div>
              <div className="adm-detail-row"><span>Date</span><strong>{formatDate(booking.booking_date)}</strong></div>
              <div className="adm-detail-row"><span>Time</span><strong>{formatSlot(booking.time_slot)}</strong></div>
              <div className="adm-detail-row"><span>Status</span><BookingBadge status={booking.status} /></div>
              <div className="adm-detail-row"><span>Created</span><strong>{formatDateTime(booking.created_at)}</strong></div>
              {booking.paid_at && <div className="adm-detail-row"><span>Paid At</span><strong>{formatDateTime(booking.paid_at)}</strong></div>}
            </div>
          </div>

          {/* Payment */}
          {payment && (
            <div className="adm-detail-section">
              <div className="adm-detail-section-title">💳 Payment</div>
              <div className="adm-detail-rows">
                <div className="adm-detail-row"><span>Amount</span><strong>{formatAmount(payment.amount)}</strong></div>
                <div className="adm-detail-row"><span>Currency</span><strong>{payment.currency}</strong></div>
                <div className="adm-detail-row"><span>Provider</span><strong>{payment.provider}</strong></div>
                <div className="adm-detail-row"><span>Order ID</span><strong className="adm-mono">{payment.order_id || '—'}</strong></div>
                <div className="adm-detail-row"><span>Payment ID</span><strong className="adm-mono">{payment.payment_id || '—'}</strong></div>
                <div className="adm-detail-row"><span>Method</span><strong>{payment.payment_method || '—'}</strong></div>
                <div className="adm-detail-row"><span>Status</span><PaymentBadge status={payment.status} /></div>
                <div className="adm-detail-row"><span>Webhook Verified</span><strong>{payment.webhook_verified ? '✅ Yes' : '❌ No'}</strong></div>
              </div>
            </div>
          )}

          {/* Notes */}
          {booking.notes && (
            <div className="adm-detail-section">
              <div className="adm-detail-section-title">📝 Notes</div>
              <p className="adm-notes-text">{booking.notes}</p>
            </div>
          )}

          {/* Timeline */}
          <div className="adm-detail-section">
            <div className="adm-detail-section-title">⏱️ Timeline</div>
            <div className="adm-timeline">
              <div className="adm-timeline-item completed">
                <div className="adm-tl-dot" />
                <div className="adm-tl-content">
                  <strong>Booking Created</strong>
                  <span>{formatDateTime(booking.created_at)}</span>
                </div>
              </div>
              {['HELD', 'PAID'].includes(booking.status) && (
                <div className="adm-timeline-item completed">
                  <div className="adm-tl-dot" />
                  <div className="adm-tl-content">
                    <strong>Slot Reserved</strong>
                    <span>Payment initiated</span>
                  </div>
                </div>
              )}
              {booking.status === 'PAID' && (
                <div className="adm-timeline-item completed">
                  <div className="adm-tl-dot success" />
                  <div className="adm-tl-content">
                    <strong>Payment Successful</strong>
                    <span>{formatDateTime(booking.paid_at)}</span>
                  </div>
                </div>
              )}
              {booking.status === 'CANCELLED' && (
                <div className="adm-timeline-item failed">
                  <div className="adm-tl-dot error" />
                  <div className="adm-tl-content">
                    <strong>Booking Cancelled</strong>
                    <span>Admin action</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        {canCancel && !showCancelConfirm && (
          <div className="adm-detail-actions">
            <button
              className="adm-btn-danger"
              onClick={() => setShowCancelConfirm(true)}
            >
              Cancel Booking
            </button>
          </div>
        )}

        {showCancelConfirm && (
          <div className="adm-cancel-confirm">
            <p>Are you sure you want to cancel this booking?</p>
            <input
              type="text"
              placeholder="Reason for cancellation (optional)"
              value={cancelReason}
              onChange={e => setCancelReason(e.target.value)}
              className="adm-cancel-reason-input"
            />
            <div className="adm-cancel-confirm-actions">
              <button
                className="adm-btn-danger"
                onClick={handleCancel}
                disabled={cancelling}
              >
                {cancelling ? 'Cancelling...' : 'Yes, Cancel'}
              </button>
              <button
                className="adm-btn-secondary"
                onClick={() => setShowCancelConfirm(false)}
              >
                No, Go Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main Admin Page ────────────────────────────────────────────────────
export default function AdminPage() {
  const { adminKey, setAdminKey, authed, setAuthed, tryAuth } = useAdminKey();
  const [loginKey, setLoginKey] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [search, setSearch] = useState('');
  const [bookingStatus, setBookingStatus] = useState('ALL');
  const [paymentStatus, setPaymentStatus] = useState('ALL');
  const [dateFilter, setDateFilter] = useState('ALL');
  const [activeCard, setActiveCard] = useState('TOTAL');

  const [selectedBooking, setSelectedBooking] = useState(null);

  const key = adminKey;

  const handleCardClick = (card) => {
    setActiveCard(card.id);
    setBookingStatus(card.filter.bookingStatus);
    setPaymentStatus(card.filter.paymentStatus);
    setDateFilter(card.filter.dateFilter);
    setPage(1);
  };

  const fetchStats = useCallback(async () => {
    const res = await fetch(`${API_BASE}/admin/stats`, { headers: { 'x-admin-key': key } });
    if (res.ok) {
      const data = await res.json();
      setStats(data);
    }
  }, [key]);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setError('');
    const params = new URLSearchParams({ page, limit: 15 });
    if (search) params.set('search', search);
    if (bookingStatus !== 'ALL') params.set('bookingStatus', bookingStatus);
    if (paymentStatus !== 'ALL') params.set('paymentStatus', paymentStatus);
    if (dateFilter !== 'ALL') params.set('dateFilter', dateFilter);

    const res = await fetch(`${API_BASE}/admin/bookings?${params}`, { headers: { 'x-admin-key': key } });
    if (res.ok) {
      const data = await res.json();
      setBookings(data.bookings || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } else {
      setError('Failed to fetch bookings');
    }
    setLoading(false);
  }, [key, page, search, bookingStatus, paymentStatus, dateFilter]);

  useEffect(() => {
    if (authed) {
      fetchStats();
      fetchBookings();

      // Auto-refresh every 30 seconds so new paid bookings appear without manual reload
      const interval = setInterval(() => {
        fetchStats();
        fetchBookings();
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [authed, fetchStats, fetchBookings]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    const ok = await tryAuth(loginKey);
    if (ok) {
      sessionStorage.setItem('admin_key', loginKey);
      setAdminKey(loginKey);
      setAuthed(true);
    } else {
      setLoginError('Invalid admin key');
    }
    setLoginLoading(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchBookings();
  };

  const handleCancelSuccess = (id) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'CANCELLED' } : b));
    fetchStats();
  };

  // Login screen
  if (!authed) {
    return (
      <div className="adm-login-screen">
        <div className="adm-login-card">
          <div className="adm-login-logo">
            <span className="adm-logo-m">M</span>
            <span>Mingrow Admin</span>
          </div>
          <h2>Bookings Portal</h2>
          <p>Enter your admin key to access the dashboard</p>
          <form onSubmit={handleLogin} className="adm-login-form">
            <input
              type="password"
              placeholder="Admin Key"
              value={loginKey}
              onChange={e => setLoginKey(e.target.value)}
              required
              autoFocus
            />
            {loginError && <p className="adm-login-error">{loginError}</p>}
            <button type="submit" disabled={loginLoading}>
              {loginLoading ? 'Verifying...' : 'Access Dashboard'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="adm-page">
      {/* Header */}
      <div className="adm-header">
        <div className="adm-header-left">
          <div className="adm-logo">
            <span className="adm-logo-m">M</span>
            <span className="adm-logo-text">Mingrow Admin</span>
          </div>
          <span className="adm-header-title">Bookings Dashboard</span>
        </div>
        <button
          className="adm-btn-secondary"
          onClick={() => { sessionStorage.removeItem('admin_key'); setAuthed(false); }}
        >
          Sign Out
        </button>
      </div>

      <div className="adm-content">
        {/* Stats */}
        {stats && <StatsCards stats={stats} activeFilter={activeCard} onCardClick={handleCardClick} />}

        {/* Bookings Table Section */}
        <div className="adm-table-section">
          <div className="adm-table-toolbar">
            <h2 className="adm-table-title">
              All Bookings
              <span className="adm-count-badge">{total}</span>
            </h2>
            <button className="adm-btn-icon" onClick={() => { fetchStats(); fetchBookings(); }} title="Refresh">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
              </svg>
            </button>
          </div>

          {/* Filters */}
          <div className="adm-filters">
            <form className="adm-search-form" onSubmit={handleSearchSubmit}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text"
                placeholder="Search ID, name, email, phone..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <button type="submit">Search</button>
            </form>

            <select value={bookingStatus} onChange={e => { setBookingStatus(e.target.value); setActiveCard(null); setPage(1); }}>
              <option value="ALL">All Booking Statuses</option>
              <option value="PAID">Paid</option>
              <option value="HELD">Held</option>
              <option value="PENDING">Pending</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="EXPIRED">Expired</option>
              <option value="REFUNDED">Refunded</option>
            </select>

            <select value={paymentStatus} onChange={e => { setPaymentStatus(e.target.value); setActiveCard(null); setPage(1); }}>
              <option value="ALL">All Payment Statuses</option>
              <option value="SUCCESS">Success</option>
              <option value="PENDING">Pending</option>
              <option value="FAILED">Failed</option>
              <option value="REFUNDED">Refunded</option>
            </select>

            <select value={dateFilter} onChange={e => { setDateFilter(e.target.value); setActiveCard(null); setPage(1); }}>
              <option value="ALL">All Dates</option>
              <option value="TODAY">Today</option>
              <option value="TOMORROW">Tomorrow</option>
              <option value="UPCOMING">Upcoming</option>
              <option value="THIS_WEEK">This Week</option>
              <option value="THIS_MONTH">This Month</option>
            </select>
          </div>

          {/* Table */}
          {error && <p className="adm-error">{error}</p>}

          <div className="adm-table-wrapper">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Customer</th>
                  <th>Company</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={10} className="adm-table-loading">
                      <div className="adm-spinner" />
                      Loading...
                    </td>
                  </tr>
                ) : bookings.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="adm-table-empty">No bookings found</td>
                  </tr>
                ) : (
                  bookings.map(booking => {
                    const payment = booking.payments?.[0];
                    const customer = booking.customers;
                    return (
                      <tr 
                        key={booking.id} 
                        className="adm-table-row"
                        onClick={() => setSelectedBooking(booking)}
                        style={{ cursor: 'pointer' }}
                      >
                        <td className="adm-ref-cell">{booking.booking_reference}</td>
                        <td>
                          <div className="adm-customer-cell">
                            <strong>{customer?.name}</strong>
                            <span>{customer?.email}</span>
                            <span>{customer?.phone}</span>
                          </div>
                        </td>
                        <td>{customer?.company_name || '—'}</td>
                        <td>{formatDate(booking.booking_date)}</td>
                        <td>{formatSlot(booking.time_slot)}</td>
                        <td><strong>{formatAmount(booking.amount)}</strong></td>
                        <td><PaymentBadge status={payment?.status} /></td>
                        <td><BookingBadge status={booking.status} /></td>
                        <td className="adm-date-cell">{formatDateTime(booking.created_at)}</td>
                        <td>
                          <button
                            className="adm-view-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedBooking(booking);
                            }}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="adm-pagination">
              <button
                className="adm-btn-secondary"
                disabled={page <= 1}
                onClick={() => setPage(p => p - 1)}
              >
                ← Prev
              </button>
              <span>Page {page} of {totalPages}</span>
              <button
                className="adm-btn-secondary"
                disabled={page >= totalPages}
                onClick={() => setPage(p => p + 1)}
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <BookingDetailModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onCancel={handleCancelSuccess}
        />
      )}
    </div>
  );
}
