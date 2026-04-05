import React, { useMemo, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  CalendarDays,
  Check,
  Headphones,
  Lock,
  MapPin,
  Minus,
  Plus,
  Shield,
} from 'lucide-react';
import './index.css';
import './booking.css';

const TAX_RATE = 0.05;

function formatVnd(value) {
  return `${Math.round(value).toLocaleString('vi-VN')} VND`;
}

const EVENT = {
  title: 'Kiến Trúc Nội Dung 2024',
  dateLabel: '24 Tháng 12, 2024',
  venue: 'Bitexco Financial Tower, Quận 1',
  image:
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=640',
};

const TICKETS = [
  {
    id: 'standard',
    name: 'Standard Access',
    badge: 'PHỔ BIẾN',
    badgeClass: 'booking-badge booking-badge--popular',
    description: 'Includes tea-break & materials',
    price: 1_250_000,
  },
  {
    id: 'vip',
    name: 'VIP Experience',
    badge: 'PREMIUM',
    badgeClass: 'booking-badge booking-badge--premium',
    description: 'Includes Networking Dinner & Premium seating',
    price: 2_500_000,
  },
];

function TicketBooking() {
  const navigate = useNavigate();
  const [qty, setQty] = useState({ standard: 1, vip: 0 });

  const { lineItems, subtotal, tax, total } = useMemo(() => {
    const items = [];
    let sub = 0;
    TICKETS.forEach((t) => {
      const q = qty[t.id] ?? 0;
      if (q > 0) {
        const line = q * t.price;
        sub += line;
        items.push({ label: `${q}x ${t.name}`, amount: line });
      }
    });
    const fee = sub * TAX_RATE;
    return {
      lineItems: items,
      subtotal: sub,
      tax: fee,
      total: sub + fee,
    };
  }, [qty]);

  function setQuantity(id, next) {
    const n = Math.max(0, Math.min(99, next));
    setQty((prev) => ({ ...prev, [id]: n }));
  }

  function goToCheckout() {
    if (subtotal <= 0) return;
    const ticketLine =
      lineItems.map((row) => row.label).join(' · ') || '—';
    navigate('/thanh-toan', {
      state: {
        order: {
          eventTitle: EVENT.title,
          eventImage: EVENT.image,
          ticketLine,
          subtotal,
          serviceFee: tax,
          vat: 0,
          total,
        },
      },
    });
  }

  return (
    <div className="booking-page">
      <header className="booking-container booking-header">
        <nav className="booking-nav">
          <Link to="/" className="booking-logo">QLSK</Link>
          <div className="booking-nav-links">
            <a href="#">Discover</a>
            <a href="#">Venues</a>
            <a href="#">Schedule</a>
            <NavLink to="/dat-ve" className={({ isActive }) => (isActive ? 'active' : undefined)}>
              My Bookings
            </NavLink>
          </div>
          <div className="booking-nav-actions">
            <a href="#" className="booking-host">Host Event</a>
            <button type="button" className="booking-btn-signin">Sign In</button>
          </div>
        </nav>
      </header>

      <main className="booking-container booking-main">
        <p className="booking-kicker">TRÌNH TỰ ĐẶT VÉ</p>
        <h1 className="booking-title">Chọn Vé</h1>

        <div className="booking-layout">
          <div className="booking-col booking-col--main">
            <article className="booking-event-card">
              <div className="booking-event-media">
                <img src={EVENT.image} alt="" width={200} height={200} />
              </div>
              <div className="booking-event-body">
                <h2 className="booking-event-title">{EVENT.title}</h2>
                <p className="booking-event-meta">
                  <CalendarDays size={18} aria-hidden />
                  {EVENT.dateLabel}
                </p>
                <p className="booking-event-meta">
                  <MapPin size={18} aria-hidden />
                  {EVENT.venue}
                </p>
              </div>
            </article>

            <section className="booking-tickets-section" aria-labelledby="ticket-types-heading">
              <h2 id="ticket-types-heading" className="booking-section-heading">
                Phân loại vé
              </h2>
              <ul className="booking-ticket-list">
                {TICKETS.map((t) => {
                  const q = qty[t.id] ?? 0;
                  return (
                    <li key={t.id} className="booking-ticket-card">
                      <div className="booking-ticket-top">
                        <span className={t.badgeClass}>{t.badge}</span>
                        <p className="booking-ticket-price">{formatVnd(t.price)}</p>
                      </div>
                      <h3 className="booking-ticket-name">{t.name}</h3>
                      <p className="booking-ticket-desc">
                        <Check size={16} strokeWidth={3} className="booking-check" aria-hidden />
                        {t.description}
                      </p>
                      <div className="booking-qty" role="group" aria-label={`Số lượng ${t.name}`}>
                        <button
                          type="button"
                          className="booking-qty-btn"
                          onClick={() => setQuantity(t.id, q - 1)}
                          disabled={q <= 0}
                          aria-label="Giảm"
                        >
                          <Minus size={18} />
                        </button>
                        <span className="booking-qty-value">{q}</span>
                        <button
                          type="button"
                          className="booking-qty-btn"
                          onClick={() => setQuantity(t.id, q + 1)}
                          aria-label="Tăng"
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          </div>

          <aside className="booking-col booking-col--aside">
            <div className="booking-summary">
              <h2 className="booking-summary-title">Tạm tính</h2>
              <ul className="booking-summary-lines">
                {lineItems.length === 0 ? (
                  <li className="booking-summary-empty">Chưa chọn vé</li>
                ) : (
                  lineItems.map((row) => (
                    <li key={row.label}>
                      <span>{row.label}</span>
                      <span>{formatVnd(row.amount)}</span>
                    </li>
                  ))
                )}
                <li>
                  <span>Thuế &amp; Phí dịch vụ (5%)</span>
                  <span>{formatVnd(tax)}</span>
                </li>
              </ul>
              <div className="booking-summary-divider" />
              <div className="booking-summary-total">
                <span className="booking-total-label">TỔNG CỘNG</span>
                <span className="booking-total-value">{formatVnd(total)}</span>
              </div>
              <button
                type="button"
                className="booking-checkout"
                disabled={subtotal <= 0}
                onClick={goToCheckout}
              >
                Thanh toán
                <ArrowRight size={20} />
              </button>
              <div className="booking-trust">
                <div className="booking-trust-item">
                  <Shield size={16} />
                  <span>SECURE</span>
                </div>
                <div className="booking-trust-item">
                  <Lock size={16} />
                  <span>ENCRYPTED</span>
                </div>
                <div className="booking-trust-item">
                  <Headphones size={16} />
                  <span>24/7 HELP</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <footer className="booking-footer">
        <div className="booking-container booking-footer-inner">
          <div className="booking-footer-brand">
            <span className="booking-logo booking-logo--footer">QLSK</span>
            <span className="booking-copyright">© {new Date().getFullYear()} QLSK. All rights reserved.</span>
          </div>
          <nav className="booking-footer-links" aria-label="Footer">
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Contact Support</a>
            <a href="#">Press Kit</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export default TicketBooking;
