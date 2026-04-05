import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <main className="adm-flex-1 adm-overflow-y-auto adm-bg-surface adm-p-12">
      <h1 className="adm-text-3xl adm-font-black adm-font-headline adm-mb-2 adm-text-on-surface">Dashboard</h1>
      <p className="adm-text-on-surface-variant adm-mb-8">Tổng quan hệ thống quản lý sự kiện.</p>
      <Link
        to="/admin/events"
        className="adm-inline-flex adm-items-center adm-gap-2 adm-bg-primary adm-text-on-primary adm-px-6 adm-py-3 adm-rounded-full adm-font-bold"
      >
        Mở Quản lý sự kiện
      </Link>
    </main>
  );
}
