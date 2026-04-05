import React from 'react';
import { Bell, Settings, Search, Plus } from 'lucide-react';

const Header = () => {
  return (
    <header className="header">
      <div className="search-bar">
        <Search size={18} color="#94a3b8" />
        <input type="text" placeholder="Tìm kiếm sự kiện, người tham gia..." />
      </div>

      <nav className="top-nav">
        <a href="#analysis" className="nav-link active">Phân tích</a>
        <a href="#logistics" className="nav-link">Hậu cần</a>
        <a href="#support" className="nav-link">Hỗ trợ</a>
      </nav>

      <div className="header-actions">
        <div className="icon-group">
          <div className="icon-btn">
            <Bell size={20} />
            <span className="notification-dot"></span>
          </div>
          <div className="icon-btn">
            <Settings size={20} />
          </div>
        </div>

        <button className="create-event-btn">
          <span>Tạo sự kiện</span>
          <Plus size={18} />
        </button>

        <div className="user-profile">
          <div className="avatar">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Avatar" />
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .header {
          height: var(--header-height);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          margin-left: 0;
          background: transparent;
          width: 100%;
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .search-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #f1f5f9;
          padding: 10px 18px;
          border-radius: 12px;
          width: 380px;
        }

        .search-bar input {
          border: none;
          background: transparent;
          outline: none;
          width: 100%;
          color: #1e293b;
          font-size: 14px;
          font-weight: 500;
        }

        .search-bar input::placeholder {
          color: #94a3b8;
        }

        .top-nav {
          display: flex;
          gap: 32px;
        }

        .nav-link {
          text-decoration: none;
          color: #64748b;
          font-size: 14px;
          font-weight: 500;
          transition: color 0.2s;
        }

        .nav-link.active {
          color: var(--primary-purple);
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .icon-group {
          display: flex;
          gap: 12px;
        }

        .icon-btn {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          background: white;
          color: #64748b;
          position: relative;
          cursor: pointer;
          transition: all 0.2s;
          border: 1px solid #f1f5f9;
        }

        .icon-btn:hover {
          background: #f8fafc;
          color: var(--primary-purple);
        }

        .notification-dot {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 6px;
          height: 6px;
          background: #ef4444;
          border-radius: 50%;
          border: 1px solid white;
        }

        .create-event-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: var(--primary-purple);
          color: white;
          border-radius: 12px;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.2s;
          box-shadow: 0 4px 12px rgba(124, 58, 237, 0.2);
        }

        .create-event-btn:hover {
          background: #6d28d9;
          transform: translateY(-1px);
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
        }

        .avatar {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          overflow: hidden;
          background: #e2e8f0;
          border: 2px solid white;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }

        .avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}} />
    </header>
  );
};

export default Header;
