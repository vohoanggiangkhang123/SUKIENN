import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Search, Settings, Ticket } from 'lucide-react';
import './announcements.css';

function Announcements() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  return (
    <div className="ann-container">
      <header className="ann-header container">
        <p className="ann-kicker">NEWS & UPDATES</p>
        <h1 className="ann-title">Thông báo Sự kiện</h1>
        <p className="ann-sub">Luôn cập nhật những tin tức mới nhất, thay đổi lịch trình và các ưu đãi dành riêng cho bạn.</p>
      </header>

      <section className="ann-search container">
        <div className="search-wrapper">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Tìm kiếm thông báo..." />
          </div>
          <div className="pill-group">
            <button type="button" onClick={() => setFilter('all')} className={`pill ${filter === 'all' ? 'active' : ''}`}>Tất cả</button>
            <button type="button" onClick={() => setFilter('system')} className={`pill ${filter === 'system' ? 'active' : ''}`}>Hệ thống</button>
            <button type="button" onClick={() => setFilter('event')} className={`pill ${filter === 'event' ? 'active' : ''}`}>Sự kiện</button>
            <button type="button" onClick={() => setFilter('promo')} className={`pill ${filter === 'promo' ? 'active' : ''}`}>Khuyến mãi</button>
          </div>
        </div>
      </section>

      <section className="ann-main container">
        <div className="ann-grid">
          <div className="ann-left-col">
            {/* Featured Notification */}
            <article className="featured-card">
              <div className="featured-img-wrapper">
                <img src="https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&q=80&w=800" alt="Tech Summit" />
              </div>
              <div className="featured-content">
                <div className="tag tag-event">SỰ KIỆN</div>
                <span className="featured-date">12 Tháng 10, 2024</span>
                <h2>Cập nhật lịch trình: Tech Summit 2024 chuyển sang khán phòng chính</h2>
                <p>Do số lượng đăng ký vượt mong đợi, chúng tôi đã nâng cấp không gian tổ chức lên Grand Hall để đảm bảo trải nghiệm tốt nhất cho mọi thành viên tham dự.</p>
                <NavLink to="#" className="view-detail">Xem chi tiết <span className="arrow">→</span></NavLink>
              </div>
            </article>

            {/* Grid of Two Small Cards */}
            <div className="ann-two-grid">
              <div className="info-card">
                <div className="info-icon icon-maintenance">
                  <div className="icon-bg"></div>
                  <Settings size={20} />
                </div>
                <div className="info-content">
                  <span className="info-time">Hôm qua</span>
                  <h3>Bảo trì hệ thống thanh toán</h3>
                  <p>Cổng thanh toán sẽ được bảo trì định kỳ từ 02:00 đến 04:00 sáng mai. Vui lòng hoàn tất các giao dịch trước thời gian này.</p>
                </div>
              </div>
              <div className="info-card">
                <div className="info-icon icon-ticket">
                  <div className="icon-bg"></div>
                  <Ticket size={20} />
                </div>
                <div className="info-content">
                  <span className="info-time">2 ngày trước</span>
                  <h3>Vé điện tử của bạn đã sẵn sàng</h3>
                  <p>Xác nhận đăng ký cho &quot;Hội thảo Thiết kế Bền vững&quot; đã hoàn tất. Bạn có thể tải mã QR tham dự trong phần Profile.</p>
                </div>
              </div>
            </div>

            {/* List of Compact Notifications */}
            <div className="ann-list">
              <div className="list-item">
                <div className="list-date-box">
                  <span className="day">08</span>
                  <span className="month">THÁNG 10</span>
                </div>
                <div className="list-info">
                  <h3>Mở thêm 50 suất tham dự Workshop Nhiếp ảnh đường phố</h3>
                  <p>Do nhu cầu quá lớn, ban tổ chức quyết định mở thêm một số lượng giới hạn vé bổ sung cho khu vực studio.</p>
                </div>
                <div className="list-arrow">→</div>
              </div>
              <div className="list-item">
                <div className="list-date-box">
                  <span className="day">05</span>
                  <span className="month">THÁNG 10</span>
                </div>
                <div className="list-info">
                  <h3>Cập nhật chính sách hoàn hủy vé 2024</h3>
                  <p>Chúng tôi đã cập nhật các điều khoản mới giúp người dùng linh hoạt hơn trong việc thay đổi thông tin người tham gia.</p>
                </div>
                <div className="list-arrow">→</div>
              </div>
            </div>

            <div className="load-more-wrapper">
              <button type="button" className="btn-load-more">Tải thêm thông báo</button>
            </div>
          </div>

          <aside className="ann-right-col">
            <div className="promo-sidebar-card">
              <div className="promo-badge">ƯU ĐÃI</div>
              <h3>Giảm 25% vé Early Bird cho Triển lãm Nghệ thuật Số</h3>
              <p>Cơ hội cuối cùng để sở hữu vé VIP với mức giá ưu đãi trước khi sự kiện chính thức diễn ra vào tháng tới.</p>
              <div className="promo-code-container">
                <span className="promo-label">MÃ ƯU ĐÃI</span>
                <span className="promo-code">ART2024</span>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

export default Announcements;
