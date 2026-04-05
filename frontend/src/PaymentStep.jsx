import React, { useState, useEffect } from 'react';
import { Info, CreditCard, Wallet, ArrowRight } from 'lucide-react';
import './payment.css';

const PaymentStep = () => {
  const [timeLeft, setTimeLeft] = useState(594); // 9:54 in seconds
  const [paymentMethod, setPaymentMethod] = useState('card');

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (timeLeft / 600) * 100;

  return (
    <div className="payment-page">
      <div className="container">
        {/* Stepper */}
        <div className="stepper-container">
          <div className="step visited">
            <div className="step-number">1</div>
            <div className="step-label">CHỌN VÉ</div>
          </div>
          <div className="step-line active"></div>
          <div className="step active">
            <div className="step-number">2</div>
            <div className="step-label">THANH TOÁN</div>
          </div>
          <div className="step-line"></div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-label">HOÀN TẤT</div>
          </div>
        </div>

        <div className="payment-layout">
          {/* Main Content (Left) */}
          <div className="payment-main">
            <div className="timer-section">
              <p className="timer-label">THỜI GIAN THANH TOÁN CÒN LẠI</p>
              <h1 className="timer-display">{formatTime(timeLeft)}</h1>
              <p className="timer-subtext">
                Vui lòng hoàn tất giao dịch trước khi hết thời gian để giữ chỗ của bạn.
              </p>
              <div className="progress-container">
                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
              </div>
            </div>

            <div className="info-alert">
              <div className="info-icon">
                <Info size={20} />
              </div>
              <div className="info-text">
                <h3>Giữ vé & Thanh toán</h3>
                <p>Vé của bạn đang được giữ tạm thời. Sau khi thanh toán thành công, vé điện tử sẽ được gửi trực tiếp qua email đã đăng ký.</p>
              </div>
            </div>

            <div className="user-info-row">
              <div className="info-field">
                <label>HỌ & TÊN</label>
                <div className="field-value">Nguyen Van A</div>
              </div>
              <div className="info-field">
                <label>EMAIL</label>
                <div className="field-value">v****a@gmail.com</div>
              </div>
            </div>

            <div className="payment-methods">
              <h2>Phương thức thanh toán</h2>
              <div className="methods-list">
                <label className={`method-item ${paymentMethod === 'card' ? 'active' : ''}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    checked={paymentMethod === 'card'} 
                    onChange={() => setPaymentMethod('card')} 
                  />
                  <div className="method-radio-custom"></div>
                  <span className="method-name">Thẻ nội địa / Quốc tế (Visa, Mastercard)</span>
                  <CreditCard size={20} className="method-icon" />
                </label>
                <label className={`method-item ${paymentMethod === 'wallet' ? 'active' : ''}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    checked={paymentMethod === 'wallet'} 
                    onChange={() => setPaymentMethod('wallet')} 
                  />
                  <div className="method-radio-custom"></div>
                  <span className="method-name">Ví điện tử (Momo, ZaloPay)</span>
                  <Wallet size={20} className="method-icon" />
                </label>
              </div>
            </div>
          </div>

          {/* Sidebar (Right) */}
          <aside className="payment-sidebar">
            <div className="summary-card-wrapper">
              <div className="summary-card-header">
                <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800" alt="Symphony Hall" />
                <div className="header-overlay"></div>
              </div>
              <div className="summary-card-body">
                <div className="event-info">
                  <p className="section-label">THÔNG TIN SỰ KIỆN</p>
                  <h2>The Symphony of Tech & Art 2024</h2>
                  <p className="event-date">
                    <span className="calendar-icon">📅</span> Thứ 7, 15 Tháng 10, 2024
                  </p>
                </div>
                
                <div className="summary-divider"></div>
                
                <div className="price-details">
                  <div className="price-row">
                    <div className="price-label">
                      <strong>Vé VIP - Zone A</strong>
                      <span>Hàng ghế: 02</span>
                    </div>
                    <div className="price-value">4.000.000đ</div>
                  </div>
                  <div className="price-row">
                    <div className="price-label">Phí dịch vụ</div>
                    <div className="price-value">40.000đ</div>
                  </div>
                </div>

                <div className="total-section">
                  <div className="total-row">
                    <div className="total-label">
                      <p>TỔNG CỘNG</p>
                      <h1>4.040.000đ</h1>
                    </div>
                    <div className="vat-label">ĐÃ BAO GỒM VAT</div>
                  </div>
                </div>

                <button className="btn-pay-now">
                  Thanh toán ngay <ArrowRight size={20} />
                </button>

                <p className="legal-text">
                  Bằng cách nhấn thanh toán, bạn đồng ý với <a href="#">điều khoản dịch vụ</a> và <a href="#">chính sách bảo mật</a> của The Digital Curator.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default PaymentStep;
