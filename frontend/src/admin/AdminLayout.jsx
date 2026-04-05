import { NavLink, Outlet } from 'react-router-dom';
import './admin.css';

const navCls = ({ isActive }) =>
  `adm-flex adm-items-center adm-gap-3 adm-px-4 adm-py-3 adm-rounded-xl adm-font-medium adm-transition-all adm-duration-200 ${
    isActive
      ? 'adm-bg-purple-100 adm-text-purple-800 adm-font-bold adm-translate-x-1 dark:adm-bg-purple-900/40 dark:adm-text-purple-200'
      : 'adm-text-purple-900/60 hover:adm-text-purple-900 hover:adm-bg-purple-100/50 dark:adm-text-purple-100/60 dark:hover:adm-text-purple-100'
  }`;

export default function AdminLayout() {
  return (
    <div className="adm-bg-surface adm-text-on-surface adm-antialiased adm-overflow-hidden adm-flex adm-h-screen adm-font-body">
      <aside className="adm-fixed adm-left-0 adm-top-0 adm-h-full adm-w-64 adm-z-40 adm-bg-purple-50 dark:adm-bg-slate-950 adm-flex adm-flex-col adm-py-8 adm-px-4 adm-gap-8">
        <div className="adm-flex adm-flex-col adm-gap-1 adm-px-4">
          <h1 className="adm-text-xl adm-font-black adm-tracking-tighter adm-text-purple-900 dark:adm-text-purple-100 adm-font-headline">
            The Editorial Architect
          </h1>
          <p className="adm-text-xs adm-font-medium adm-text-purple-900/60 dark:adm-text-purple-100/60 adm-uppercase adm-tracking-widest">
            Management Suite
          </p>
        </div>
        <nav className="adm-flex adm-flex-col adm-gap-2 adm-flex-grow adm-overflow-y-auto adm-no-scrollbar">
          <NavLink to="/admin" end className={navCls}>
            <span className="adm-material-symbols">dashboard</span>
            <span className="adm-font-headline adm-tracking-tight">Dashboard</span>
          </NavLink>
          <NavLink to="/admin/events" className={navCls}>
            <span className="adm-material-symbols" style={{ fontVariationSettings: "'FILL' 1" }}>
              calendar_month
            </span>
            <span className="adm-font-headline adm-tracking-tight">Events</span>
          </NavLink>
          <NavLink to="/admin/tickets" className={navCls}>
            <span className="adm-material-symbols">confirmation_number</span>
            <span className="adm-font-headline adm-tracking-tight">Tickets</span>
          </NavLink>
          <NavLink to="/admin/attendees" className={navCls}>
            <span className="adm-material-symbols">group</span>
            <span className="adm-font-headline adm-tracking-tight">Attendees</span>
          </NavLink>
          <NavLink to="/admin/reports" className={navCls}>
            <span className="adm-material-symbols">analytics</span>
            <span className="adm-font-headline adm-tracking-tight">Reports</span>
          </NavLink>
        </nav>
        <div className="adm-mt-auto adm-px-4 adm-py-6 adm-border-t adm-border-purple-100/50 dark:adm-border-purple-900/20">
          <NavLink
            to="/admin/events"
            state={{ openCreate: true }}
            className="adm-block adm-w-full adm-bg-gradient-to-br adm-from-primary adm-to-primary-container adm-text-on-primary adm-py-4 adm-px-6 adm-rounded-full adm-font-bold adm-font-headline adm-flex adm-items-center adm-justify-center adm-gap-2 adm-shadow-lg adm-shadow-primary/20 active:adm-scale-95 adm-transition-transform adm-text-center"
          >
            <span className="adm-material-symbols">add</span>
            <span>Tạo sự kiện</span>
          </NavLink>
        </div>
      </aside>
      <div className="adm-flex-1 adm-ml-64 adm-min-h-screen adm-flex adm-flex-col">
        <Outlet />
      </div>
    </div>
  );
}
