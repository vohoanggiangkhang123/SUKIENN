import React from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle2, 
  Clock, 
  Download, 
  Plus,
  ArrowRight,
  Ticket
} from 'lucide-react';

const ParticipantList = () => {
  const participants = [
    { name: 'Alexander Thorne', email: 'a.thorne@nexuscorp.com', ticket: 'VIP PASS', status: 'Đã thanh toán', checkin: 'Đã Check-in', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=128&h=128&q=80' },
    { name: 'Sarah Jenkins', email: 'sarah.j@designstudio.io', ticket: 'EARLY BIRD', status: 'Đã thanh toán', checkin: 'Đang chờ', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=128&h=128&q=80' },
    { name: 'Marcus Vane', email: 'mvane@quantum.tech', ticket: 'EXHIBITOR', status: 'Chờ xử lý', checkin: 'Đang chờ', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=128&h=128&q=80' },
    { name: 'Elena Rodriguez', email: 'e.rod@globalfin.com', ticket: 'VIP PASS', status: 'Đã thanh toán', checkin: 'Đã Check-in', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=128&h=128&q=80' },
  ];

  return (
    <div className="page-content">
      <div className="view-header flex-header">
        <div className="header-text">
          <p className="view-subtitle">QUẢN LÝ NGƯỜI DÙNG</p>
          <h2 className="view-title">Danh sách Người tham gia</h2>
          <p className="view-description">Quản lý và giám sát 1.248 người tham gia đã đăng ký cho Global Summit 2024.</p>
        </div>
        <div className="header-actions-group">
          <button className="secondary-btn">
            <Download size={18} />
            <span>Xuất danh sách</span>
          </button>
          <button className="primary-btn">
            <Plus size={18} />
            <span>Thêm người tham gia</span>
          </button>
        </div>
      </div>

      <div className="filters-bar glass">
        <div className="search-input">
          <Search size={18} color="#94a3b8" />
          <input type="text" placeholder="Tìm theo tên, email hoặc mã vé..." />
        </div>
        
        <div className="tab-filters">
          <button className="tab-btn active">TẤT CẢ</button>
          <button className="tab-btn">ĐÃ THANH TOÁN</button>
          <button className="tab-btn">CHỜ XỬ LÝ</button>
        </div>

        <div className="filter-actions">
          <button className="filter-btn">
            <Filter size={18} />
            <span>LOẠI VÉ</span>
          </button>
          <button className="icon-only-btn">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      <div className="table-container glass">
        <table className="participant-table">
          <thead>
            <tr>
              <th>NGƯỜI THAM GIA</th>
              <th>LOẠI VÉ</th>
              <th>TRẠNG THÁI</th>
              <th>TRẠNG THÁI CHECK-IN</th>
              <th>THAO TÁC</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((p, i) => (
              <tr key={i}>
                <td>
                  <div className="user-info">
                    <img src={p.avatar} alt={p.name} className="user-avatar" />
                    <div>
                      <div className="user-name">{p.name}</div>
                      <div className="user-email">{p.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`ticket-badge ${p.ticket.toLowerCase().replace(' ', '-')}`}>
                    {p.ticket}
                  </span>
                </td>
                <td>
                  <div className={`status-text ${p.status === 'Đã thanh toán' ? 'success' : 'pending'}`}>
                    <span className="dot"></span>
                    {p.status}
                  </div>
                </td>
                <td>
                  <div className={`checkin-status ${p.checkin === 'Đã Check-in' ? 'checked' : 'waiting'}`}>
                    {p.checkin === 'Đã Check-in' ? <CheckCircle2 size={16} /> : <Clock size={16} />}
                    <span>{p.checkin}</span>
                  </div>
                </td>
                <td>
                  <button className="icon-only-btn sm">
                    <ArrowRight size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="table-footer">
          <div className="pagination-info">Hiển thị 10 trên 1.248 người</div>
          <div className="pagination-controls">
            <button className="page-nav">&lt;</button>
            <button className="page-num active">1</button>
            <button className="page-num">2</button>
            <button className="page-num">3</button>
            <span className="page-dots">...</span>
            <button className="page-num">125</button>
            <button className="page-nav">&gt;</button>
          </div>
        </div>
      </div>

      <div className="summary-cards">
        <div className="progress-card glass purple-gradient">
          <div className="card-top">
            <h3>Tiến độ Check-in</h3>
            <p>Theo dõi lượng khách tham gia trong thời gian thực cho các phiên họp sáng nay. Hầu hết người tham gia làm thủ tục từ 08:30 đến 09:15.</p>
          </div>
          <div className="card-bottom">
            <div className="progress-value">
              <span className="percentage">72%</span>
              <span className="label">ĐÃ ĐẾN</span>
            </div>
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: '72%' }}></div>
            </div>
          </div>
        </div>

        <div className="stat-card-simple glass">
          <div className="card-icon">
            <Ticket size={24} />
          </div>
          <div className="card-info">
            <span className="label">Vé đã bán</span>
            <div className="value">1,248 / 1,500</div>
            <p className="subtext">Đã đạt 83% tổng công suất. Còn lại 252 vé cho sự kiện chính.</p>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .flex-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .view-description {
          font-size: 14px;
          color: #64748b;
          margin-top: 8px;
          max-width: 500px;
        }

        .header-actions-group {
          display: flex;
          gap: 12px;
        }

        .secondary-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: #f5f3ff;
          color: #7c3aed;
          border-radius: 12px;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.2s;
        }

        .primary-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: #7c3aed;
          color: white;
          border-radius: 12px;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.2s;
          box-shadow: 0 4px 12px rgba(124, 58, 237, 0.2);
        }

        .filters-bar {
          margin-top: 32px;
          padding: 12px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .search-input {
          display: flex;
          align-items: center;
          gap: 12px;
          background: white;
          padding: 10px 16px;
          border-radius: 12px;
          width: 440px;
          border: 1px solid #f1f5f9;
        }

        .search-input input {
          border: none;
          outline: none;
          width: 100%;
          font-size: 14px;
          font-weight: 500;
        }

        .tab-filters {
          display: flex;
          gap: 4px;
          background: #f1f5f9;
          padding: 4px;
          border-radius: 12px;
        }

        .tab-btn {
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 11px;
          font-weight: 700;
          color: #64748b;
          transition: all 0.2s;
        }

        .tab-btn.active {
          background: #7c3aed;
          color: white;
        }

        .filter-actions {
          display: flex;
          gap: 12px;
        }

        .filter-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background: white;
          border: 1px solid #f1f5f9;
          border-radius: 12px;
          color: #1e293b;
          font-size: 12px;
          font-weight: 600;
        }

        .icon-only-btn {
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          border: 1px solid #f1f5f9;
          border-radius: 12px;
          color: #64748b;
        }

        .icon-only-btn.sm {
          width: 32px;
          height: 32px;
        }

        .table-container {
          margin-top: 24px;
          border-radius: 24px;
          overflow: hidden;
        }

        .participant-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .participant-table th {
          padding: 20px 24px;
          background: #f8fafc;
          font-size: 10px;
          font-weight: 700;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .participant-table td {
          padding: 16px 24px;
          border-bottom: 1px solid #f1f5f9;
          vertical-align: middle;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          object-fit: cover;
        }

        .user-name {
          font-size: 14px;
          font-weight: 600;
          color: #1e293b;
        }

        .user-email {
          font-size: 12px;
          color: #94a3b8;
        }

        .ticket-badge {
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 10px;
          font-weight: 700;
        }

        .ticket-badge.vip-pass { background: #f5f3ff; color: #7c3aed; }
        .ticket-badge.early-bird { background: #eff6ff; color: #3b82f6; }
        .ticket-badge.exhibitor { background: #fff1f2; color: #e11d48; }

        .status-text {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 500;
        }

        .status-text.success { color: #10b981; }
        .status-text.pending { color: #e11d48; }

        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: currentColor;
        }

        .checkin-status {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 500;
          color: #94a3b8;
        }

        .checkin-status.checked { color: #10b981; }

        .table-footer {
          padding: 20px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #f8fafc;
        }

        .pagination-info {
          font-size: 12px;
          color: #94a3b8;
        }

        .pagination-controls {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .page-nav, .page-num {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          color: #64748b;
          border: 1px solid #e2e8f0;
          background: white;
        }

        .page-num.active {
          background: #7c3aed;
          color: white;
          border-color: #7c3aed;
        }

        .page-dots {
          color: #94a3b8;
          font-size: 12px;
        }

        .summary-cards {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 24px;
          margin-top: 32px;
        }

        .purple-gradient {
          background: linear-gradient(135deg, #ddd6fe 0%, #ede9fe 100%);
          border: none;
        }

        .progress-card {
          padding: 32px;
          border-radius: 32px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
        }

        .progress-card::after {
          content: "";
          position: absolute;
          right: -20px;
          bottom: -20px;
          width: 150px;
          height: 150px;
          background-image: url('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=QLSK&color=7c3aed&bgcolor=00000000');
          opacity: 0.05;
          transform: rotate(-15deg);
        }

        .progress-card h3 {
          font-size: 24px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 12px;
        }

        .progress-card p {
          font-size: 14px;
          color: #64748b;
          max-width: 400px;
          line-height: 1.6;
        }

        .card-bottom {
          margin-top: 40px;
          display: flex;
          align-items: flex-end;
          gap: 24px;
        }

        .progress-value {
          display: flex;
          flex-direction: column;
        }

        .percentage {
          font-size: 40px;
          font-weight: 700;
          color: #1e293b;
          line-height: 1;
        }

        .progress-value .label {
          font-size: 12px;
          font-weight: 700;
          color: #94a3b8;
          margin-top: 4px;
        }

        .progress-bar-container {
          flex: 1;
          height: 12px;
          background: white;
          border-radius: 10px;
          margin-bottom: 8px;
        }

        .progress-bar {
          height: 100%;
          background: #7c3aed;
          border-radius: 10px;
        }

        .stat-card-simple {
          padding: 32px;
          border-radius: 32px;
          background: #f5f3ff;
          border: none;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .card-icon {
          width: 48px;
          height: 48px;
          background: white;
          border-radius: 16px;
          color: #7c3aed;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-sm);
        }

        .card-info .label {
          font-size: 14px;
          font-weight: 600;
          color: #64748b;
        }

        .card-info .value {
          font-size: 28px;
          font-weight: 700;
          color: #4338ca;
          margin-top: 4px;
        }

        .card-info .subtext {
          font-size: 12px;
          color: #94a3b8;
          margin-top: 8px;
          line-height: 1.5;
        }
      `}} />
    </div>
  );
};

export default ParticipantList;
