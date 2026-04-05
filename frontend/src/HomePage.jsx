import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  Music, Monitor, GraduationCap, Palette,
  Search, MapPin, ArrowRight, CalendarDays
} from 'lucide-react';
import './index.css';

function HomePage() {
  return (
    <>
      <header className="container">
        <nav className="navbar">
          <Link to="/" className="logo">QLSK</Link>
          <div className="nav-links">
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : undefined)}>
              Home
            </NavLink>
            <NavLink to="/dat-ve" className={({ isActive }) => (isActive ? 'active' : undefined)}>
              Đặt vé
            </NavLink>
            <NavLink to="/thong-bao" className={({ isActive }) => (isActive ? 'active' : undefined)}>
              Thông báo
            </NavLink>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </div>
          <div className="nav-actions">
            <button type="button" className="btn-login">Login</button>
            <button type="button" className="btn-signup">Sign Up</button>
          </div>
        </nav>
      </header>

      <main>
        <section className="container hero">
          <div className="hero-content">
            <h1 className="hero-title">
              Kiến Tạo Những <span>Sự Kiện</span> Mang Tầm Vóc Nghệ Thuật.
            </h1>
            <div className="search-bar">
              <div className="search-input-group">
                <Search size={20} />
                <input type="text" placeholder="Tìm tên sự kiện..." />
              </div>
              <div className="search-divider"></div>
              <div className="search-input-group">
                <MapPin size={20} />
                <input type="text" placeholder="Hà Nội, HCM..." />
              </div>
              <button type="button" className="btn-search">Tìm kiếm</button>
            </div>
          </div>
          <div className="hero-images">
            <img
              src="https://images.unsplash.com/photo-1549451371-64aa98a6f660?auto=format&fit=crop&q=80&w=800"
              alt="Concert Stage Lights"
              className="hero-img-main"
            />
            <img
              src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=400"
              alt="Crowd cheering"
              className="hero-img-small"
            />
          </div>
        </section>

        <section className="container categories-section">
          <h2 className="section-title">Khám Phá Theo Danh Mục</h2>
          <div className="categories-grid">
            <div className="category-card">
              <div className="category-icon">
                <Music size={24} />
              </div>
              <div className="category-info">
                <h3>Âm nhạc</h3>
                <p>124 Sự kiện sắp tới</p>
              </div>
            </div>
            <div className="category-card">
              <div className="category-icon">
                <Monitor size={24} />
              </div>
              <div className="category-info">
                <h3>Công nghệ</h3>
                <p>90 Sự kiện sắp tới</p>
              </div>
            </div>
            <div className="category-card">
              <div className="category-icon">
                <GraduationCap size={24} />
              </div>
              <div className="category-info">
                <h3>Giáo dục</h3>
                <p>52 Sự kiện sắp tới</p>
              </div>
            </div>
            <div className="category-card">
              <div className="category-icon">
                <Palette size={24} />
              </div>
              <div className="category-info">
                <h3>Nghệ thuật</h3>
                <p>41 Sự kiện sắp tới</p>
              </div>
            </div>
          </div>
        </section>

        <section className="events-section">
          <div className="container">
            <p className="section-subtitle">Selected For You</p>
            <div className="events-header">
              <h2>Sự Kiện Nổi Bật</h2>
              <Link to="/dat-ve" className="view-all">
                Đặt vé mẫu <ArrowRight size={18} />
              </Link>
            </div>

            <div className="events-grid">
              <div className="event-card card-large">
                <img
                  src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=1200"
                  alt="Lễ Hội Âm Nhạc"
                  className="card-large-bg"
                />
                <div className="card-content">
                  <div className="card-tags">
                    <span className="tag tag-primary">Âm Nhạc</span>
                    <span className="tag tag-secondary">Sắp diễn ra</span>
                  </div>
                  <h3>Lễ Hội Âm Nhạc Grand Symphony 2024</h3>
                  <div className="card-meta">
                    <span><CalendarDays size={16} /> 15/06/2024</span>
                    <span><MapPin size={16} /> Sân Vận Động Mỹ Đình, Hà Nội</span>
                  </div>
                </div>
              </div>

              <div className="event-card card-medium">
                <img
                  src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=600"
                  alt="Hội Thảo AI"
                  className="card-medium-img"
                />
                <div className="card-medium-content">
                  <span className="tag">Công Nghệ</span>
                  <h3>Hội Thảo AI & Tương Lai Ngành Sáng Tạo</h3>
                  <div className="card-meta">
                    <span><CalendarDays size={16} /> 09:00 - 17:00</span>
                    <span><MapPin size={16} /> Trung tâm Hôi nghị QG, Hà Nội</span>
                  </div>
                </div>
              </div>

              <div className="event-card card-medium">
                <img
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=600"
                  alt="Diễn Đàn Giáo Dục"
                  className="card-medium-img"
                />
                <div className="card-medium-content">
                  <span className="tag">Giáo Dục</span>
                  <h3>Diễn Đàn Giáo Dục 4.0: Thách Thức Và Cơ Hội</h3>
                  <div className="card-meta">
                    <span><CalendarDays size={16} /> 20/06/2024</span>
                    <span><MapPin size={16} /> ĐH Ngoại Thương, Hà Nội</span>
                  </div>
                </div>
              </div>

              <div className="event-card card-horizontal">
                <img
                  src="https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&q=80&w=1200"
                  alt="Triển Lãm Nghệ Thuật"
                  className="card-large-bg"
                />
                <div className="card-content">
                  <div className="card-tags">
                    <span className="tag tag-secondary" style={{ color: '#fff', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}>Triển Lãm</span>
                  </div>
                  <h3>Sắc Màu Đô Thị: Triển Lãm Nghệ Thuật Đương Đại</h3>
                  <p>Khám phá góc nhìn mới về vẻ đẹp văn hóa, nghệ thuật đường phố qua lăng kính của 15 nghệ sĩ trẻ tài năng đến từ Việt Nam.</p>
                  <div className="card-meta">
                    <span><MapPin size={16} /> Lotte Tower Contemporary Arts Center</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container cta-section">
          <div className="cta-box">
            <h2>Bạn có ý tưởng cho một sự kiện?</h2>
            <div className="cta-buttons">
              <button type="button" className="btn-white">Tạo sự kiện ngay</button>
              <button type="button" className="btn-outline">Liên hệ tư vấn</button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default HomePage;
