import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import Header from './Header.jsx';

export default function StaffDashboardLayout() {
  return (
    <div className="layout-wrapper">
      <Sidebar />
      <div className="main-container">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
