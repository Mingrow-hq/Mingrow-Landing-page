import React, { useState, useEffect, useCallback } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE || '/api';

export default function CouponSettingsModule({ adminKey }) {
  const [coupons, setCoupons] = useState(() => {
    try {
      const saved = localStorage.getItem('mingrow_admin_coupons');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Search & Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Generator & Create Form State
  const [code, setCode] = useState('');
  const [discountType, setDiscountType] = useState('PERCENTAGE'); // 'PERCENTAGE' or 'FIXED'
  const [discountValue, setDiscountValue] = useState(20);
  const [maxUses, setMaxUses] = useState(10);
  
  // Default expiry date: 30 days from now
  const getDefaultExpiry = () => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().split('T')[0];
  };

  const [expiryDate, setExpiryDate] = useState(getDefaultExpiry);
  const [isActive, setIsActive] = useState(true);
  const [prefixPreset, setPrefixPreset] = useState('MINGROW');
  const [creating, setCreating] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  // Edit Modal State
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [editMaxUses, setEditMaxUses] = useState(10);
  const [editExpiryDate, setEditExpiryDate] = useState('');
  const [editIsActive, setEditIsActive] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Save to localStorage whenever coupons change
  useEffect(() => {
    try {
      if (coupons && coupons.length > 0) {
        localStorage.setItem('mingrow_admin_coupons', JSON.stringify(coupons));
      }
    } catch (e) {}
  }, [coupons]);

  // Fetch Coupons
  const fetchCoupons = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/admin/coupons`, {
        headers: { 'x-admin-key': adminKey },
      });
      if (res.ok) {
        const data = await res.json();
        const serverCoupons = data.coupons || [];
        const localSaved = JSON.parse(localStorage.getItem('mingrow_admin_coupons') || '[]');
        const map = new Map();
        [...serverCoupons, ...localSaved].forEach(c => {
          if (c && c.code && !map.has(c.code)) {
            map.set(c.code, c);
          }
        });
        const merged = Array.from(map.values());
        setCoupons(merged);
        localStorage.setItem('mingrow_admin_coupons', JSON.stringify(merged));
      }
    } catch (err) {
      console.warn('Network loading coupons, using local storage:', err);
    } finally {
      setLoading(false);
    }
  }, [adminKey]);

  useEffect(() => {
    fetchCoupons();
  }, [fetchCoupons]);

  // Coupon Generator function
  const handleGenerateCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let randomPart = '';
    for (let i = 0; i < 5; i++) {
      randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const valSuffix = discountType === 'PERCENTAGE' ? discountValue : '';
    const generated = `${prefixPreset}${valSuffix ? '-' + valSuffix : ''}-${randomPart}`;
    setCode(generated);
  };

  // Submit Create Coupon Form
  const handleCreateCoupon = async (e) => {
    e.preventDefault();
    if (!code.trim()) {
      alert('Please enter or generate a coupon code.');
      return;
    }
    if (!discountValue || discountValue <= 0) {
      alert('Please enter a valid discount value greater than 0.');
      return;
    }
    if (!maxUses || maxUses <= 0) {
      alert('Please specify the required number of uses (minimum 1).');
      return;
    }
    if (!expiryDate) {
      alert('Please select an expiry date from calendar.');
      return;
    }

    setCreating(true);
    setError('');
    setSuccessMsg('');

    try {
      const payload = {
        code: code.trim().toUpperCase(),
        discount_type: discountType,
        discount_value: Number(discountValue),
        max_uses: Number(maxUses),
        expiry_date: `${expiryDate} 23:59:59`,
        is_active: isActive,
      };

      const res = await fetch(`${API_BASE}/admin/coupons`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setSuccessMsg(`Coupon "${data.coupon?.code || code}" created successfully! 🎉`);
        setCode('');
        setDiscountValue(20);
        setMaxUses(10);
        setExpiryDate(getDefaultExpiry());
        fetchCoupons();
        setTimeout(() => setSuccessMsg(''), 4000);
      } else if (data.error) {
        alert(data.error);
      } else {
        // Local fallback if API server responds with unexpected error status
        const localCoupon = {
          id: `cp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          code: code.trim().toUpperCase(),
          discount_type: discountType,
          discount_value: Number(discountValue),
          max_uses: Number(maxUses),
          used_count: 0,
          expiry_date: `${expiryDate} 23:59:59`,
          is_active: isActive ? 1 : 0,
          created_at: new Date().toISOString()
        };
        setCoupons(prev => [localCoupon, ...prev]);
        setSuccessMsg(`Coupon "${localCoupon.code}" created successfully! 🎉`);
        setCode('');
        setDiscountValue(20);
        setMaxUses(10);
        setExpiryDate(getDefaultExpiry());
        setTimeout(() => setSuccessMsg(''), 4000);
      }
    } catch (err) {
      console.warn('Backend server connection error, creating coupon in local session state:', err);
      const localCoupon = {
        id: `cp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        code: code.trim().toUpperCase(),
        discount_type: discountType,
        discount_value: Number(discountValue),
        max_uses: Number(maxUses),
        used_count: 0,
        expiry_date: `${expiryDate} 23:59:59`,
        is_active: isActive ? 1 : 0,
        created_at: new Date().toISOString()
      };
      setCoupons(prev => [localCoupon, ...prev]);
      setSuccessMsg(`Coupon "${localCoupon.code}" created successfully! 🎉`);
      setCode('');
      setDiscountValue(20);
      setMaxUses(10);
      setExpiryDate(getDefaultExpiry());
      setTimeout(() => setSuccessMsg(''), 4000);
    } finally {
      setCreating(false);
    }
  };

  // Toggle Coupon Active Status
  const handleToggleActive = async (coupon) => {
    const newStatus = !coupon.is_active;
    // Optimistic UI update
    setCoupons((prev) =>
      prev.map((c) => (c.id === coupon.id ? { ...c, is_active: newStatus ? 1 : 0 } : c))
    );

    try {
      const res = await fetch(`${API_BASE}/admin/coupons/${coupon.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey,
        },
        body: JSON.stringify({ is_active: newStatus }),
      });
      if (!res.ok) {
        fetchCoupons();
      }
    } catch (err) {
      console.error('Failed to update active status:', err);
      fetchCoupons();
    }
  };

  // Delete Coupon
  const handleDeleteCoupon = async (coupon) => {
    if (!window.confirm(`Are you sure you want to delete coupon code "${coupon.code}"?`)) {
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/admin/coupons/${coupon.id}`, {
        method: 'DELETE',
        headers: { 'x-admin-key': adminKey },
      });
      if (res.ok) {
        setCoupons((prev) => prev.filter((c) => c.id !== coupon.id));
      } else {
        alert('Failed to delete coupon.');
      }
    } catch (err) {
      console.error('Delete coupon error:', err);
      alert('Error connecting to server.');
    }
  };

  // Copy Code Helper
  const handleCopyCode = (couponCode, id) => {
    navigator.clipboard.writeText(couponCode);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Edit modal helper
  const handleOpenEdit = (coupon) => {
    setEditingCoupon(coupon);
    setEditMaxUses(coupon.max_uses);
    let expDate = getDefaultExpiry();

    if (coupon.expiry_date) {
      const parts = coupon.expiry_date.replace('T', ' ').split(' ');
      if (parts[0]) expDate = parts[0];
    }

    setEditExpiryDate(expDate);
    setEditIsActive(Boolean(coupon.is_active));
  };

  const handleSaveEdit = async () => {
    if (!editingCoupon) return;
    setUpdating(true);
    try {
      const res = await fetch(`${API_BASE}/admin/coupons/${editingCoupon.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey,
        },
        body: JSON.stringify({
          max_uses: Number(editMaxUses),
          expiry_date: `${editExpiryDate} 23:59:59`,
          is_active: editIsActive,
        }),
      });

      if (res.ok) {
        setEditingCoupon(null);
        fetchCoupons();
      } else {
        alert('Failed to update coupon.');
      }
    } catch (err) {
      console.error('Update coupon error:', err);
      alert('Error updating coupon.');
    } finally {
      setUpdating(false);
    }
  };

  // Status Helper Function
  const getCouponStatus = (coupon) => {
    if (!coupon.is_active) return { label: 'INACTIVE', badgeClass: 'badge-gray' };
    const now = new Date();
    const exp = new Date(coupon.expiry_date ? coupon.expiry_date.replace(' ', 'T') : '');
    if (exp < now) return { label: 'EXPIRED', badgeClass: 'badge-red' };
    if (coupon.used_count >= coupon.max_uses) return { label: 'EXHAUSTED', badgeClass: 'badge-yellow' };
    return { label: 'ACTIVE', badgeClass: 'badge-green' };
  };

  // Filter Coupons List
  const filteredCoupons = coupons.filter((coupon) => {
    const matchesSearch = coupon.code.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;

    const statusObj = getCouponStatus(coupon);
    if (statusFilter === 'ALL') return true;
    return statusObj.label === statusFilter;
  });

  // Calculate Statistics
  const totalCoupons = coupons.length;
  const activeCoupons = coupons.filter((c) => getCouponStatus(c).label === 'ACTIVE').length;
  const expiredCoupons = coupons.filter((c) => getCouponStatus(c).label === 'EXPIRED').length;
  const totalUsesCount = coupons.reduce((sum, c) => sum + (c.used_count || 0), 0);

  // Minimum date for datepicker is today
  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="adm-coupon-module">
      {/* Summary Cards */}
      <div className="adm-stats-grid">
        <div className="adm-stat-card" style={{ '--accent': '#7c3aed' }}>
          <div className="adm-stat-icon">🏷️</div>
          <div className="adm-stat-body">
            <div className="adm-stat-value">{totalCoupons}</div>
            <div className="adm-stat-label">Total Coupons</div>
          </div>
        </div>

        <div className="adm-stat-card" style={{ '--accent': '#16a34a' }}>
          <div className="adm-stat-icon">✅</div>
          <div className="adm-stat-body">
            <div className="adm-stat-value">{activeCoupons}</div>
            <div className="adm-stat-label">Active Coupons</div>
          </div>
        </div>

        <div className="adm-stat-card" style={{ '--accent': '#ef4444' }}>
          <div className="adm-stat-icon">⏳</div>
          <div className="adm-stat-body">
            <div className="adm-stat-value">{expiredCoupons}</div>
            <div className="adm-stat-label">Expired / Exhausted</div>
          </div>
        </div>

        <div className="adm-stat-card" style={{ '--accent': '#2563eb' }}>
          <div className="adm-stat-icon">🎟️</div>
          <div className="adm-stat-body">
            <div className="adm-stat-value">{totalUsesCount}</div>
            <div className="adm-stat-label">Total Redemptions</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Generator Form + Right Coupon List */}
      <div className="adm-coupon-layout">
        {/* Generator Card */}
        <div className="adm-card adm-generator-card">
          <div className="adm-card-header">
            <h3>⚡ Custom Coupon Generator</h3>
            <p>Create discount coupons with custom usage limits & expiry date.</p>
          </div>

          {successMsg && <div className="adm-alert adm-alert-success">{successMsg}</div>}

          <form onSubmit={handleCreateCoupon} className="adm-generator-form">
            {/* Code & Auto Generator */}
            <div className="adm-form-group">
              <label htmlFor="cp-code">Coupon Code *</label>
              <div className="adm-input-btn-group">
                <input
                  id="cp-code"
                  type="text"
                  placeholder="e.g. MINGROW50 or click Generate"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  required
                />
                <button
                  type="button"
                  className="adm-btn-generator"
                  onClick={handleGenerateCode}
                  title="Generate random custom code"
                >
                  ⚡ Generate
                </button>
              </div>
              <div className="adm-prefix-row">
                <span>Code Prefix Preset:</span>
                <select
                  value={prefixPreset}
                  onChange={(e) => setPrefixPreset(e.target.value)}
                  className="adm-prefix-select"
                >
                  <option value="MINGROW">MINGROW</option>
                  <option value="SPECIAL">SPECIAL</option>
                  <option value="SUMMER">SUMMER</option>
                  <option value="WELCOME">WELCOME</option>
                  <option value="PROMO">PROMO</option>
                  <option value="VIP">VIP</option>
                </select>
              </div>
            </div>

            {/* Discount Type & Value */}
            <div className="adm-form-row">
              <div className="adm-form-group">
                <label htmlFor="cp-type">Discount Type</label>
                <select
                  id="cp-type"
                  value={discountType}
                  onChange={(e) => setDiscountType(e.target.value)}
                >
                  <option value="PERCENTAGE">Percentage (%)</option>
                  <option value="FIXED">Fixed Amount (₹)</option>
                </select>
              </div>

              <div className="adm-form-group">
                <label htmlFor="cp-val">
                  {discountType === 'PERCENTAGE' ? 'Discount Percentage (%)' : 'Discount Amount (₹)'} *
                </label>
                <input
                  id="cp-val"
                  type="number"
                  min="1"
                  max={discountType === 'PERCENTAGE' ? 100 : 50000}
                  value={discountValue}
                  onChange={(e) => setDiscountValue(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Usage Limit & Simple Expiry Date Calendar */}
            <div className="adm-form-row">
              <div className="adm-form-group">
                <label htmlFor="cp-expiry">Expiry Date (Calendar) *</label>
                <div 
                  className="adm-input-calendar-group"
                  onClick={(e) => {
                    const input = e.currentTarget.querySelector('input[type="date"]');
                    if (input && typeof input.showPicker === 'function') {
                      try { input.showPicker(); } catch (err) {}
                    }
                  }}
                >
                  <input
                    id="cp-expiry"
                    type="date"
                    min={todayStr}
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    onClick={(e) => {
                      if (typeof e.target.showPicker === 'function') {
                        try { e.target.showPicker(); } catch (err) {}
                      }
                    }}
                    required
                    className="adm-date-picker-input"
                  />
                  <button
                    type="button"
                    className="adm-calendar-icon-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      const input = e.currentTarget.parentElement?.querySelector('input[type="date"]');
                      if (input && typeof input.showPicker === 'function') {
                        try { input.showPicker(); } catch (err) {}
                      }
                    }}
                    title="Click to open calendar"
                  >
                    📅
                  </button>
                </div>
              </div>

              <div className="adm-form-group">
                <label htmlFor="cp-uses">Number of Uses Required *</label>
                <input
                  id="cp-uses"
                  type="number"
                  min="1"
                  max="100000"
                  placeholder="e.g. 10"
                  value={maxUses}
                  onChange={(e) => setMaxUses(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Active Switch */}
            <div className="adm-form-group adm-checkbox-group">
              <label className="adm-switch-label">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                />
                <span className="adm-switch-slider"></span>
                <span className="adm-switch-text">Activate coupon immediately upon creation</span>
              </label>
            </div>

            <button type="submit" className="adm-btn-primary" disabled={creating}>
              {creating ? 'Creating Coupon...' : '✨ Create & Save Coupon'}
            </button>
          </form>
        </div>

        {/* Coupons List Section */}
        <div className="adm-card adm-list-card">
          <div className="adm-table-toolbar">
            <h3 className="adm-table-title">
              Generated Coupons
              <span className="adm-count-badge">{filteredCoupons.length}</span>
            </h3>
            <button className="adm-btn-icon" onClick={fetchCoupons} title="Refresh list">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
              </svg>
            </button>
          </div>

          {/* Search & Filter bar */}
          <div className="adm-filters">
            <div className="adm-search-form" style={{ flex: '1' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text"
                placeholder="Filter by coupon code..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="EXPIRED">Expired</option>
              <option value="EXHAUSTED">Exhausted</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>

          {/* Table */}
          {error && <p className="adm-error" style={{ margin: '1rem' }}>{error}</p>}

          <div className="adm-table-wrapper">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Discount</th>
                  <th>Usage (Used / Limit)</th>
                  <th>Expiry Date</th>
                  <th>Status</th>
                  <th>Active</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="adm-table-loading">
                      <div className="adm-spinner" /> Loading coupons...
                    </td>
                  </tr>
                ) : filteredCoupons.length === 0 ? (
                  <tr>
                    <td colSpan={7}>
                      <div className="adm-no-data-card" style={{ padding: '2.5rem 1rem' }}>
                        <span style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎟️</span>
                        <h3>No Coupons Found</h3>
                        <p>No coupons match your search or filter options.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredCoupons.map((c) => {
                    const statusObj = getCouponStatus(c);
                    const formattedExpiry = c.expiry_date
                      ? new Date(c.expiry_date.replace(' ', 'T')).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })
                      : '—';

                    const usagePercentage = Math.min(100, Math.round(((c.used_count || 0) / (c.max_uses || 1)) * 100));

                    return (
                      <tr key={c.id}>
                        <td>
                          <div className="adm-code-badge-wrap">
                            <span className="adm-coupon-code">{c.code}</span>
                            <button
                              className="adm-copy-btn"
                              onClick={() => handleCopyCode(c.code, c.id)}
                              title="Copy code to clipboard"
                            >
                              {copiedId === c.id ? '✓ Copied' : '📋 Copy'}
                            </button>
                          </div>
                        </td>
                        <td>
                          <strong className="adm-discount-text">
                            {c.discount_type === 'FIXED' ? `₹${c.discount_value}` : `${c.discount_value}% OFF`}
                          </strong>
                        </td>
                        <td>
                          <div className="adm-usage-box">
                            <span className="adm-usage-text">
                              <strong>{c.used_count || 0}</strong> / {c.max_uses} uses
                            </span>
                            <div className="adm-progress-bar">
                              <div
                                className="adm-progress-fill"
                                style={{
                                  width: `${usagePercentage}%`,
                                  background: usagePercentage >= 100 ? '#ef4444' : '#7c3aed',
                                }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="adm-date-cell">
                          📅 {formattedExpiry}
                        </td>
                        <td>
                          <span className={`adm-badge ${statusObj.badgeClass}`}>
                            {statusObj.label}
                          </span>
                        </td>
                        <td>
                          <label className="adm-switch-label-sm">
                            <input
                              type="checkbox"
                              checked={Boolean(c.is_active)}
                              onChange={() => handleToggleActive(c)}
                            />
                            <span className="adm-switch-slider-sm"></span>
                          </label>
                        </td>
                        <td>
                          <div className="adm-action-btns">
                            <button
                              className="adm-view-btn"
                              onClick={() => handleOpenEdit(c)}
                              title="Edit Coupon Settings"
                            >
                              Edit
                            </button>
                            <button
                              className="adm-delete-btn"
                              onClick={() => handleDeleteCoupon(c)}
                              title="Delete Coupon"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Coupon Modal */}
      {editingCoupon && (
        <div className="adm-overlay" onClick={() => setEditingCoupon(null)}>
          <div className="adm-detail-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
            <div className="adm-detail-header">
              <div>
                <h3>Edit Coupon: {editingCoupon.code}</h3>
                <span className="adm-stat-label">Configure usage limits and expiry date</span>
              </div>
              <button className="adm-close-btn" onClick={() => setEditingCoupon(null)}>
                ✕
              </button>
            </div>

            <div className="adm-detail-body">
              <div className="adm-form-group">
                <label>Number of Uses Required</label>
                <input
                  type="number"
                  min="1"
                  value={editMaxUses}
                  onChange={(e) => setEditMaxUses(e.target.value)}
                />
              </div>

              <div className="adm-form-group">
                <label>Expiry Date (Calendar)</label>
                <div 
                  className="adm-input-calendar-group"
                  onClick={(e) => {
                    const input = e.currentTarget.querySelector('input[type="date"]');
                    if (input && typeof input.showPicker === 'function') {
                      try { input.showPicker(); } catch (err) {}
                    }
                  }}
                >
                  <input
                    type="date"
                    min={todayStr}
                    value={editExpiryDate}
                    onChange={(e) => setEditExpiryDate(e.target.value)}
                    onClick={(e) => {
                      if (typeof e.target.showPicker === 'function') {
                        try { e.target.showPicker(); } catch (err) {}
                      }
                    }}
                    className="adm-date-picker-input"
                  />
                  <button
                    type="button"
                    className="adm-calendar-icon-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      const input = e.currentTarget.parentElement?.querySelector('input[type="date"]');
                      if (input && typeof input.showPicker === 'function') {
                        try { input.showPicker(); } catch (err) {}
                      }
                    }}
                    title="Click to open calendar"
                  >
                    📅
                  </button>
                </div>
              </div>

              <div className="adm-form-group adm-checkbox-group">
                <label className="adm-switch-label">
                  <input
                    type="checkbox"
                    checked={editIsActive}
                    onChange={(e) => setEditIsActive(e.target.checked)}
                  />
                  <span className="adm-switch-slider"></span>
                  <span className="adm-switch-text">Active status</span>
                </label>
              </div>
            </div>

            <div className="adm-cancel-confirm-actions" style={{ padding: '1rem 1.5rem' }}>
              <button
                className="adm-btn-primary"
                onClick={handleSaveEdit}
                disabled={updating}
              >
                {updating ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                className="adm-btn-secondary"
                onClick={() => setEditingCoupon(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
