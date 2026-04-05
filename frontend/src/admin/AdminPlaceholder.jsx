import { Link } from 'react-router-dom';

export default function AdminPlaceholder({ title }) {
  return (
    <main className="adm-flex-1 adm-overflow-y-auto adm-bg-surface adm-p-12">
      <p className="adm-text-primary adm-font-bold adm-uppercase adm-text-xs adm-tracking-widest adm-mb-2">Admin</p>
      <h1 className="adm-text-3xl adm-font-black adm-font-headline adm-mb-4 adm-text-on-surface">{title}</h1>
      <p className="adm-text-on-surface-variant adm-mb-6">Trang này dành cho phân hệ khác trong nhóm — bạn có thể mở rộng sau.</p>
      <Link to="/admin/events" className="adm-text-primary adm-font-bold adm-underline">
        ← Quản lý sự kiện
      </Link>
    </main>
  );
}
