import React, { useMemo, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Building2,
  CreditCard,
  Lock,
  QrCode,
  Shield,
  User,
  Wallet,
} from 'lucide-react';
import './index.css';
import './booking.css';
import './checkout.css';

function formatVnd(value) {
  return `${Math.round(value).toLocaleString('vi-VN')} VND`;
}

const DEFAULT_ORDER = {
  eventTitle: 'The Nightfall Symphony',
  eventImage:
    'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=320',
  ticketLine: '1x VIP Experience',
  subtotal: 2_450_000,
  serviceFee: 50_000,
  vat: 0,
  total: 2_500_000,
};

const STEPS = [
  { id: 1, label: 'CHỌN VÉ', to: '/dat-ve', hash: null },
  { id: 2, label: 'THÔNG TIN', to: null, hash: '#checkout-customer' },
  { id: 3, label: 'THANH TOÁN', to: null, hash: null },
];

function CheckoutPayment() {
  const location = useLocation();
  const navigate = useNavigate();
  const passed = location.state?.order;

  const order = useMemo(() => {
    if (!passed) return DEFAULT_ORDER;
    return {
      eventTitle: passed.eventTitle ?? DEFAULT_ORDER.eventTitle,
      eventImage: passed.eventImage ?? DEFAULT_ORDER.eventImage,
      ticketLine: passed.ticketLine ?? DEFAULT_ORDER.ticketLine,
      subtotal: passed.subtotal ?? DEFAULT_ORDER.subtotal,
      serviceFee: passed.serviceFee ?? DEFAULT_ORDER.serviceFee,
      vat: passed.vat ?? DEFAULT_ORDER.vat,
      total: passed.total ?? DEFAULT_ORDER.total,
    };
  }, [passed]);

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('card');

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleConfirm(e) {
    e.preventDefault();
    navigate('/');
  }

  return (
    <div className="checkout-page">
      <header className="booking-container checkout-header">
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
            <button type="button" className="checkout-btn-host">Host Event</button>
          </div>
        </nav>
      </header>

      <div className="booking-container checkout-stepper-wrap">
        <ol className="checkout-stepper" aria-label="Tiến trình đặt vé">
          {STEPS.map((s) => {
            const isActive = s.id === 3;
            const isDone = s.id < 3;
            let content;
            if (s.to) {
              content = (
                <Link to={s.to} className="checkout-step-link">
                  <span className={`checkout-step-circle ${isDone ? 'done' : ''} ${isActive ? 'active' : ''}`}>
                    {isDone ? '✓' : s.id}
                  </span>
                  <span className={`checkout-step-label ${isActive ? 'active' : ''}`}>{s.label}</span>
                </Link>
              );
            } else if (s.hash) {
              content = (
                <a href={s.hash} className="checkout-step-link">
                  <span className={`checkout-step-circle ${isDone ? 'done' : ''} ${isActive ? 'active' : ''}`}>
                    {isDone ? '✓' : s.id}
                  </span>
                  <span className={`checkout-step-label ${isActive ? 'active' : ''}`}>{s.label}</span>
                </a>
              );
            } else {
              content = (
                <span className="checkout-step-static">
                  <span className={`checkout-step-circle ${isActive ? 'active' : ''}`}>{s.id}</span>
                  <span className={`checkout-step-label ${isActive ? 'active' : ''}`}>{s.label}</span>
                </span>
              );
            }
            return (
              <li key={s.id} className="checkout-step-item">
                {content}
                {s.id < 3 && <span className="checkout-step-connector" aria-hidden />}
              </li>
            );
          })}
        </ol>
      </div>

      <main className="booking-container checkout-main">
        <p className="checkout-kicker">CHECKOUT JOURNEY</p>
        <h1 className="checkout-title">Thanh toán</h1>

        <div className="checkout-layout">
          <form id="checkout-form" className="checkout-col checkout-col--form" onSubmit={handleConfirm}>
            <section id="checkout-customer" className="checkout-panel" aria-labelledby="customer-heading">
              <h2 id="customer-heading" className="checkout-section-title">
                <User size={22} className="checkout-section-icon" aria-hidden />
                Thông tin khách hàng
              </h2>
              <div className="checkout-fields">
                <label className="checkout-label" htmlFor="fullName">Họ và tên</label>
                <input
                  id="fullName"
                  className="checkout-input"
                  type="text"
                  autoComplete="name"
                  placeholder="Nguyễn Văn A"
                  value={form.fullName}
                  onChange={(e) => updateField('fullName', e.target.value)}
                />
                <label className="checkout-label" htmlFor="email">Email</label>
                <input
                  id="email"
                  className="checkout-input"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => updateField('email', e.target.value)}
                />
                <label className="checkout-label" htmlFor="phone">Số điện thoại</label>
                <input
                  id="phone"
                  className="checkout-input"
                  type="tel"
                  autoComplete="tel"
                  placeholder="09xx xxx xxx"
                  value={form.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                />
              </div>
            </section>

            <section className="checkout-panel" aria-labelledby="pay-heading">
              <h2 id="pay-heading" className="checkout-section-title">
                <CreditCard size={22} className="checkout-section-icon" aria-hidden />
                Phương thức thanh toán
              </h2>
              <div className="checkout-pay-grid" role="radiogroup" aria-label="Chọn phương thức">
                <button
                  type="button"
                  role="radio"
                  aria-checked={paymentMethod === 'card'}
                  className={`checkout-pay-card ${paymentMethod === 'card' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <CreditCard size={28} strokeWidth={1.5} />
                  <span className="checkout-pay-title">Thẻ Quốc Tế</span>
                  <span className="checkout-pay-sub">Visa / Mastercard</span>
                </button>
                <button
                  type="button"
                  role="radio"
                  aria-checked={paymentMethod === 'bank'}
                  className={`checkout-pay-card ${paymentMethod === 'bank' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('bank')}
                >
                  <Building2 size={28} strokeWidth={1.5} />
                  <span className="checkout-pay-title">Chuyển khoản</span>
                  <span className="checkout-pay-sub">QR ngân hàng</span>
                </button>
                <button
                  type="button"
                  role="radio"
                  aria-checked={paymentMethod === 'ewallet'}
                  className={`checkout-pay-card ${paymentMethod === 'ewallet' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('ewallet')}
                >
                  <Wallet size={28} strokeWidth={1.5} />
                  <span className="checkout-pay-title">Ví điện tử</span>
                  <span className="checkout-pay-sub">Momo, ZaloPay…</span>
                </button>
              </div>

              {paymentMethod === 'bank' && (
                <div className="checkout-qr-block">
                  <div className="checkout-qr-placeholder" role="img" aria-label="Mã QR thanh toán">
                    <QrCode size={56} strokeWidth={1} />
                    <span>QR CODE PLACEHOLDER</span>
                  </div>
                  <p className="checkout-qr-hint">
                    Vui lòng quét mã QR này bằng ứng dụng ngân hàng của bạn để hoàn tất chuyển khoản. Nội dung
                    chuyển khoản ghi mã đơn hàng.
                  </p>
                </div>
              )}

              {paymentMethod === 'card' && (
                <p className="checkout-pay-note">
                  Thanh toán qua cổng thẻ an toàn. Thông tin thẻ được mã hóa theo chuẩn PCI DSS.
                </p>
              )}

              {paymentMethod === 'ewallet' && (
                <p className="checkout-pay-note">
                  Bạn sẽ được chuyển sang ứng dụng ví để xác nhận thanh toán sau khi bấm nút bên dưới.
                </p>
              )}
            </section>
          </form>

          <aside className="checkout-col checkout-col--summary">
            <div className="checkout-summary-card">
              <h2 className="checkout-summary-heading">Chi tiết đơn hàng</h2>
              <div className="checkout-order-row">
                <div className="checkout-order-thumb">
                  <img src={order.eventImage} alt="" width={72} height={72} />
                </div>
                <div className="checkout-order-text">
                  <p className="checkout-order-ticket">{order.ticketLine}</p>
                  <p className="checkout-order-event">{order.eventTitle}</p>
                </div>
              </div>
              <ul className="checkout-breakdown">
                <li>
                  <span>Tạm tính</span>
                  <span>{formatVnd(order.subtotal)}</span>
                </li>
                <li>
                  <span>Phí dịch vụ</span>
                  <span>{formatVnd(order.serviceFee)}</span>
                </li>
                <li>
                  <span>VAT (0%)</span>
                  <span>{formatVnd(order.vat)}</span>
                </li>
              </ul>
              <div className="checkout-summary-divider" />
              <div className="checkout-grand-total">
                <span className="checkout-grand-label">TỔNG CỘNG</span>
                <span className="checkout-grand-value">{formatVnd(order.total)}</span>
              </div>
              <button type="submit" form="checkout-form" className="checkout-confirm-btn">
                Xác nhận &amp; Thanh toán
                <ArrowRight size={20} />
              </button>
              <p className="checkout-secure-line">
                <Shield size={16} />
                <Lock size={16} />
                <span>THANH TOÁN BẢO MẬT</span>
              </p>
            </div>
          </aside>
        </div>
      </main>

      <footer className="booking-footer checkout-footer">
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

export default CheckoutPayment;
