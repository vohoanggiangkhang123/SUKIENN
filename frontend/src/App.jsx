import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './HomePage.jsx';
import TicketBooking from './TicketBooking.jsx';
import CheckoutPayment from './CheckoutPayment.jsx';
import Announcements from './Announcements.jsx';
import PaymentStep from './PaymentStep.jsx';
import AdminLayout from './admin/AdminLayout.jsx';
import AdminDashboard from './admin/AdminDashboard.jsx';
import EventManagement from './admin/EventManagement.jsx';
import AdminPlaceholder from './admin/AdminPlaceholder.jsx';
import TicketManagement from './admin/TicketManagement.jsx';
import StaffDashboardLayout from './components/layout/StaffDashboardLayout.jsx';
import QRCheckIn from './pages/dashboard/QRCheckIn.jsx';
import ParticipantList from './pages/dashboard/ParticipantList.jsx';
import TicketCheckInApp from './pages/TicketCheckInApp.jsx';

function StaffComingSoon({ title }) {
  return (
    <main style={{ padding: '2rem', maxWidth: 640 }}>
      <h1 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>{title}</h1>
      <p style={{ color: '#64748b' }}>Trang đang được phát triển.</p>
    </main>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/thong-bao" element={<Announcements />} />
      <Route path="/dat-ve" element={<TicketBooking />} />
      <Route path="/thanh-toan" element={<CheckoutPayment />} />
      <Route path="/thanh-toan-dem-nguoc" element={<PaymentStep />} />
      <Route path="/danh-sach-ve-quet-qr" element={<TicketCheckInApp />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="events" element={<EventManagement />} />
        <Route path="tickets" element={<TicketManagement />} />
        <Route path="attendees" element={<AdminPlaceholder title="Người tham dự" />} />
        <Route path="reports" element={<AdminPlaceholder title="Báo cáo" />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>
      <Route element={<StaffDashboardLayout />}>
        <Route path="dashboard" element={<QRCheckIn />} />
        <Route path="qr-scan" element={<QRCheckIn />} />
        <Route path="participants" element={<ParticipantList />} />
        <Route path="staff" element={<StaffComingSoon title="Quản lý nhân viên" />} />
        <Route path="location" element={<StaffComingSoon title="Địa điểm" />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
