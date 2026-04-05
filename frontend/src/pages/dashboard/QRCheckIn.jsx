import React from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  History, 
  ArrowUpRight, 
  Waves,
  UserCheck,
  Users
} from 'lucide-react';

const QRCheckIn = () => {
  const recentScans = [
    { name: 'Alexander Sterling', type: 'VIP Toàn quyền • Đã quét 2 phút trước', status: 'success' },
    { name: 'Elena Rodriguez', type: 'Đại biểu Phổ thông • Đã quét 5 phút trước', status: 'success' },
    { name: 'Unknown QR Code', type: 'Mã không hợp lệ • Đã quét 8 phút trước', status: 'error' },
  ];

  return (
    <div className="page-content">
      <div className="view-header">
        <p className="view-subtitle">HOẠT ĐỘNG TRỰC TIẾP</p>
        <h2 className="view-title">Cổng Check-in QR</h2>
      </div>

      <div className="dashboard-grid">
        <div className="main-section">
          <div className="scanner-card glass">
            <div className="scanner-viewport">
              <div className="scan-overlay">
                <div className="scan-line"></div>
                <div className="scan-frame"></div>
              </div>
              <div className="scanner-indicator">
                <span className="pulse-dot"></span>
                <span>MÁY QUÉT ĐANG HOẠT ĐỘNG</span>
              </div>
              <p className="scanner-instruction">Đặt mã QR vào trong khung</p>
            </div>
          </div>

          <div className="scans-section">
            <div className="section-header">
              <h3>Lượt quét gần đây</h3>
              <button className="view-history">
                <span>Xem lịch sử</span>
                <ArrowUpRight size={16} />
              </button>
            </div>

            <div className="scans-list">
              {recentScans.map((scan, index) => (
                <div key={index} className="scan-card glass">
                  <div className={`status-icon ${scan.status}`}>
                    {scan.status === 'success' ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
                  </div>
                  <div className="scan-details">
                    <h4>{scan.name}</h4>
                    <p>{scan.type}</p>
                  </div>
                  <div className={`status-badge ${scan.status}`}>
                    {scan.status === 'success' ? 'THÀNH CÔNG' : 'LỖI'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="side-section">
          <div className="stats-panel glass">
            <div className="panel-header">
              <div className="panel-icon stats">
                <Waves size={20} />
              </div>
              <h3>Số lượng tham gia trực tiếp</h3>
            </div>

            <div className="stat-group">
              <div className="stat-label">TỔNG ĐĂNG KÝ</div>
              <div className="stat-value">2,500</div>
              <div className="stat-underline silver"></div>
            </div>

            <div className="stat-group">
              <div className="stat-label primary-text">ĐÃ CHECK-IN</div>
              <div className="stat-value lg primary-text">1,842</div>
              <div className="stat-underline primary"></div>
              <div className="stat-progress-text">74% khách tham gia đã đến</div>
            </div>

            <div className="stat-group">
              <div className="stat-label muted">CÒN LẠI</div>
              <div className="stat-value secondary-text">658</div>
              <div className="stat-underline muted"></div>
            </div>

            <div className="alert-card">
              <div className="alert-icon">
                <ArrowUpRight size={18} />
              </div>
              <div className="alert-content">
                <h4>Cảnh báo giờ cao điểm</h4>
                <p>Tỷ lệ khách đến cao hơn 20% so với dự kiến cho khung giờ này. Đảm bảo tất cả 5 trạm quét đều đang hoạt động.</p>
              </div>
            </div>
          </div>

          <div className="staff-panel glass">
            <h3>Nhân viên trực ca</h3>
            <div className="staff-avatars">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=128&h=128&q=80" alt="S1" />
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=128&h=128&q=80" alt="S2" />
              <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=128&h=128&q=80" alt="S3" />
              <div className="staff-more">+2</div>
            </div>
            <button className="manage-staff-btn">QUẢN LÝ ĐỘI NGŨ</button>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .view-header {
          margin-bottom: 30px;
          margin-top: 10px;
        }

        .view-subtitle {
          font-size: 11px;
          font-weight: 700;
          color: #7c3aed;
          letter-spacing: 0.1em;
          margin-bottom: 4px;
        }

        .view-title {
          font-size: 32px;
          font-weight: 700;
          color: #1e293b;
          letter-spacing: -0.02em;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 32px;
        }

        .main-section {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .scanner-card {
          border-radius: 32px;
          overflow: hidden;
          background: #000;
          position: relative;
        }

        .scanner-viewport {
          height: 400px;
          background: radial-gradient(circle at center, #0f172a 0%, #000 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .scan-overlay {
          width: 220px;
          height: 220px;
          border-radius: 20px;
          border: 2px solid rgba(124, 58, 237, 0.4);
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(124, 58, 237, 0.05);
          box-shadow: 0 0 40px rgba(124, 58, 237, 0.1);
        }

        .scan-line {
          position: absolute;
          width: 90%;
          height: 2px;
          background: #8b5cf6;
          box-shadow: 0 0 15px #8b5cf6;
          animation: scan 2.5s infinite ease-in-out;
          z-index: 2;
        }

        @keyframes scan {
          0%, 100% { top: 10%; }
          50% { top: 90%; }
        }

        .scan-frame {
          width: 80%;
          height: 80%;
          border: 1px dashed rgba(255,255,255,0.2);
          border-radius: 12px;
          background-image: url('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=QLSK-DEMO&color=ffffff&bgcolor=00000000');
          background-size: contain;
          opacity: 0.15;
          filter: blur(1px);
        }

        .scanner-indicator {
          position: absolute;
          top: 24px;
          left: 24px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 16px;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 30px;
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.05em;
        }

        .pulse-dot {
          width: 8px;
          height: 8px;
          background: #10b981;
          border-radius: 50%;
          box-shadow: 0 0 10px #10b981;
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }

        .scanner-instruction {
          margin-top: 24px;
          color: #94a3b8;
          font-size: 14px;
          font-weight: 500;
        }

        .scans-section {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .section-header h3 {
          font-size: 18px;
          font-weight: 600;
          color: #1e293b;
        }

        .view-history {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #7c3aed;
          font-size: 13px;
          font-weight: 600;
        }

        .scans-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .scan-card {
          padding: 16px 24px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          transition: transform 0.2s;
        }

        .scan-card:hover {
          transform: translateX(4px);
          border-color: rgba(124, 58, 237, 0.2);
        }

        .status-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .status-icon.success {
          background: #ecfdf5;
          color: #10b981;
        }

        .status-icon.error {
          background: #fef2f2;
          color: #ef4444;
        }

        .scan-details {
          flex: 1;
        }

        .scan-details h4 {
          font-size: 15px;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 2px;
        }

        .scan-details p {
          font-size: 12px;
          color: #64748b;
          font-weight: 400;
        }

        .status-badge {
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 10px;
          font-weight: 700;
        }

        .status-badge.success {
          background: #f0fdf4;
          color: #10b981;
          border: 1px solid #d1fae5;
        }

        .status-badge.error {
          background: #fef2f2;
          color: #ef4444;
          border: 1px solid #fee2e2;
        }

        .stats-panel {
          padding: 28px;
          border-radius: 28px;
          display: flex;
          flex-direction: column;
          gap: 32px;
          background: #f5f3ff;
          border: none;
        }

        .panel-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .panel-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          color: var(--primary-purple);
          box-shadow: var(--shadow-sm);
        }

        .panel-header h3 {
          font-size: 15px;
          font-weight: 700;
          color: #1e293b;
          line-height: 1.3;
        }

        .stat-group {
          display: flex;
          flex-direction: column;
        }

        .stat-label {
          font-size: 11px;
          font-weight: 600;
          color: #94a3b8;
          margin-bottom: 4px;
        }

        .stat-label.primary-text {
          color: #7c3aed;
        }

        .stat-value {
          font-size: 24px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 8px;
        }

        .stat-value.lg {
          font-size: 32px;
        }

        .stat-value.primary-text {
          color: #4338ca;
        }

        .stat-underline {
          height: 6px;
          border-radius: 10px;
          width: 100%;
        }

        .silver { background: #e2e8f0; }
        .primary { background: #8b5cf6; }

        .stat-progress-text {
          font-size: 11px;
          font-weight: 500;
          color: #64748b;
          margin-top: 6px;
        }

        .muted { color: #94a3b8; }
        .secondary-text { color: #64748b; }

        .alert-card {
          background: white;
          padding: 20px;
          border-radius: 20px;
          display: flex;
          gap: 12px;
          box-shadow: var(--shadow-sm);
        }

        .alert-icon {
          color: #7c3aed;
          margin-top: 2px;
        }

        .alert-content h4 {
          font-size: 13px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 6px;
        }

        .alert-content p {
          font-size: 11px;
          color: #64748b;
          line-height: 1.5;
        }

        .staff-panel {
          margin-top: 24px;
          padding: 24px;
          border-radius: 24px;
          background: #fdfcff;
          border: 1px solid #f1f5f9;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .staff-panel h3 {
          font-size: 15px;
          font-weight: 700;
          color: #1e293b;
        }

        .staff-avatars {
          display: flex;
          align-items: center;
          margin-left: 8px;
        }

        .staff-avatars img {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 2px solid white;
          margin-left: -8px;
          object-fit: cover;
        }

        .staff-more {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #ede9fe;
          color: #7c3aed;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          border: 2px solid white;
          margin-left: -8px;
        }

        .manage-staff-btn {
          padding: 14px;
          background: #f5f3ff;
          color: #7c3aed;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 700;
          transition: all 0.2s;
        }

        .manage-staff-btn:hover {
          background: #ede9fe;
        }
      `}} />
    </div>
  );
};

export default QRCheckIn;
