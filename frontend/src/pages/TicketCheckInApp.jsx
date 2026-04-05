import { useState } from 'react';
import TicketListSidebar from '../components/Sidebar.jsx';
import ScannerPage from './ScannerPage.jsx';
import TicketsPage from './TicketsPage.jsx';

function DashboardPlaceholder() {
  return (
    <div className="dashboard-placeholder">
      <p className="dashboard-placeholder__eyebrow">OVERVIEW</p>
      <h1 className="dashboard-placeholder__title">Dashboard</h1>
      <p className="dashboard-placeholder__text">Tổng quan sự kiện và lượt check-in sẽ hiển thị tại đây.</p>
    </div>
  );
}

export default function TicketCheckInApp() {
  const [activeView, setActiveView] = useState('tickets');

  const mainModeClass =
    activeView === 'scanner' ? 'main-content--scanner-light' : 'main-content--tickets-dark';

  const renderContent = () => {
    switch (activeView) {
      case 'scanner':
        return <ScannerPage onDashboardClick={() => setActiveView('dashboard')} />;
      case 'dashboard':
        return <DashboardPlaceholder />;
      case 'tickets':
        return <TicketsPage setActiveView={setActiveView} />;
      case 'analytics':
        return (
          <div className="dashboard-placeholder">
            <p className="dashboard-placeholder__eyebrow">ANALYTICS</p>
            <h1 className="dashboard-placeholder__title">Analytics</h1>
            <p className="dashboard-placeholder__text">Báo cáo chi tiết đang được phát triển.</p>
          </div>
        );
      default:
        return <TicketsPage setActiveView={setActiveView} />;
    }
  };

  return (
    <div className="app-container ticket-check-in-app">
      <TicketListSidebar activeView={activeView} setActiveView={setActiveView} />
      <main className={`main-content ${mainModeClass}`}>{renderContent()}</main>
    </div>
  );
}
