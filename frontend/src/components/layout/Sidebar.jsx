import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutGrid, 
  QrCode, 
  Users, 
  ShieldCheck, 
  MapPin, 
  HelpCircle, 
  LogOut,
  ChevronRight
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: <LayoutGrid size={20} />, label: 'BẢNG ĐIỀU KHIỂN', path: '/dashboard' },
    { icon: <QrCode size={20} />, label: 'QUÉT MÃ QR', path: '/qr-scan' },
    { icon: <Users size={20} />, label: 'NGƯỜI THAM GIA', path: '/participants' },
    { icon: <ShieldCheck size={20} />, label: 'QUẢN LÝ NHÂN VIÊN', path: '/staff' },
    { icon: <MapPin size={20} />, label: 'ĐỊA ĐIỂM', path: '/location' },
  ];

  return (
    <aside className="sidebar">
      <div className="logo-container">
        <h1 className="logo-text">QLSK</h1>
      </div>

      <div className="event-info">
        <div className="event-avatar">GS</div>
        <div className="event-details">
          <h3>Hội nghị Toàn cầu 2024</h3>
          <p>BẢNG ĐIỀU KHIỂN QUẢN TRỊ</p>
        </div>
      </div>

      <nav className="nav-menu">
        {menuItems.map((item, index) => (
          <NavLink 
            key={index}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="export-btn">XUẤT BÁO CÁO</button>
        
        <div className="footer-links">
          <div className="footer-link">
            <HelpCircle size={18} />
            <span>TRUNG TÂM TRỢ GIÚP</span>
          </div>
          <div className="footer-link logout">
            <LogOut size={18} />
            <span>ĐĂNG XUẤT</span>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .sidebar {
          width: var(--sidebar-width);
          height: 100vh;
          background: var(--bg-sidebar);
          border-right: 1px solid #f1f5f9;
          position: fixed;
          left: 0;
          top: 0;
          display: flex;
          flex-direction: column;
          padding: 24px 20px;
          z-index: 100;
        }

        .logo-text {
          font-size: 24px;
          font-weight: 800;
          color: #4338ca;
          margin-bottom: 40px;
          padding-left: 10px;
        }

        .event-info {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          margin-bottom: 30px;
        }

        .event-avatar {
          width: 40px;
          height: 40px;
          background: #4338ca;
          border-radius: 10px;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 14px;
        }

        .event-details h3 {
          font-size: 14px;
          font-weight: 600;
          color: #1e293b;
          line-height: 1.2;
        }

        .event-details p {
          font-size: 10px;
          font-weight: 500;
          color: #94a3b8;
          text-transform: uppercase;
          margin-top: 2px;
        }

        .nav-menu {
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 1;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 12px;
          text-decoration: none;
          color: #64748b;
          transition: all 0.2s ease;
          font-size: 13px;
          font-weight: 500;
        }

        .nav-item:hover {
          background: var(--nav-hover);
          color: var(--primary-purple);
        }

        .nav-item.active {
          background: #f5f3ff;
          color: var(--primary-purple);
        }

        .nav-icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sidebar-footer {
          margin-top: 30px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .export-btn {
          width: 100%;
          padding: 14px;
          background: #f1f5f9;
          border-radius: 12px;
          color: #64748b;
          font-size: 12px;
          font-weight: 600;
          transition: all 0.2s ease;
        }

        .export-btn:hover {
          background: #e2e8f0;
          color: #1e293b;
        }

        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding-left: 4px;
        }

        .footer-link {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #94a3b8;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: color 0.2s;
        }

        .footer-link:hover {
          color: var(--primary-purple);
        }

        .logout {
          color: #94a3b8;
        }

        .logout:hover {
          color: #ef4444;
        }
      `}} />
    </aside>
  );
};

export default Sidebar;
