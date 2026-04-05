import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  createEvent,
  deleteEvent,
  fetchEvents,
  fetchRecentActivities,
  fetchStatsOverview,
  updateEvent,
} from '../api/eventsApi';
import EventFormModal from './EventFormModal';

const TF_MAP = {
  'This Month': 'this_month',
  'Next 3 Months': 'next_3_months',
  'Past Year': 'past_year',
  All: 'all',
};

const STATUS_FILTERS = [
  { id: 'all', label: 'All Events' },
  { id: 'ongoing', label: 'Ongoing' },
  { id: 'draft', label: 'Drafts' },
  { id: 'completed', label: 'Completed' },
];

function formatDateTimeVi(iso) {
  return new Intl.DateTimeFormat('vi-VN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso));
}

function formatCompactAttendees(n) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

function formatMoneyVi(n) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(n || 0);
}

function relativeTimeVi(iso) {
  const s = Math.floor((Date.now() - new Date(iso)) / 1000);
  if (s < 60) return 'Vừa xong';
  if (s < 3600) return `${Math.floor(s / 60)} phút trước`;
  if (s < 86400) return `${Math.floor(s / 3600)} giờ trước`;
  if (s < 172800) return 'Hôm qua';
  return formatDateTimeVi(iso);
}

function statusBadgeClass(status) {
  if (status === 'ongoing') return 'adm-bg-green-500/90 adm-text-white';
  if (status === 'draft') return 'adm-bg-surface-container-high adm-text-on-surface-variant';
  return 'adm-bg-on-surface/10 adm-text-on-surface-variant';
}

function statusLabel(status) {
  if (status === 'ongoing') return 'Ongoing';
  if (status === 'draft') return 'Draft';
  return 'Completed';
}

function iconBoxClass(key) {
  if (key === 'restaurant') return 'adm-bg-purple-100';
  if (key === 'campaign') return 'adm-bg-blue-100';
  return 'adm-bg-surface-container';
}

function iconColorClass(key) {
  if (key === 'restaurant') return 'adm-text-purple-700';
  if (key === 'campaign') return 'adm-text-blue-600';
  return 'adm-text-primary';
}

export default function EventManagement() {
  const navigate = useNavigate();
  const location = useLocation();
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState({ totalAttendees: 0, ticketsSoldPercent: 0, revenue: 0 });
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [timeframeLabel, setTimeframeLabel] = useState('All');
  const [search, setSearch] = useState('');
  const [searchDebounced, setSearchDebounced] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setSearchDebounced(search.trim()), 350);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    if (location.state?.openCreate) {
      setEditing(null);
      setModalOpen(true);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, location.pathname, navigate]);

  const load = useCallback(async () => {
    setLoading(true);
    setErr('');
    try {
      const tf = TF_MAP[timeframeLabel] || 'all';
      const [ev, st, act] = await Promise.all([
        fetchEvents({
          status: statusFilter,
          q: searchDebounced || undefined,
          timeframe: tf === 'all' ? undefined : tf,
        }),
        fetchStatsOverview(),
        fetchRecentActivities(12),
      ]);
      setEvents(ev);
      setStats(st);
      setActivities(act);
    } catch (e) {
      setErr(e?.response?.data?.message || e.message || 'Không tải được dữ liệu');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, timeframeLabel, searchDebounced]);

  useEffect(() => {
    load();
  }, [load]);

  const featured = useMemo(() => {
    const f = events.find((e) => e.isFeatured);
    if (f) return f;
    const o = events.find((e) => e.status === 'ongoing');
    return o || events[0];
  }, [events]);

  const listCards = useMemo(() => {
    return events.filter((e) => !featured || String(e._id) !== String(featured._id)).slice(0, 3);
  }, [events, featured]);

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (ev) => {
    setEditing(ev);
    setModalOpen(true);
  };

  const handleSubmitForm = async (payload) => {
    if (editing) {
      await updateEvent(editing._id, payload);
    } else {
      await createEvent(payload);
    }
    await load();
  };

  const handleDeleteFeatured = async () => {
    if (!featured || !window.confirm('Xóa sự kiện nổi bật này?')) return;
    try {
      await deleteEvent(featured._id);
      await load();
    } catch (e) {
      setErr(e?.response?.data?.message || e.message);
    }
  };

  return (
    <>
      <main className="adm-flex-1 adm-overflow-y-auto adm-bg-surface adm-flex adm-flex-col adm-min-h-screen">
        <header className="adm-sticky adm-top-0 adm-z-30 adm-bg-surface/80 adm-backdrop-blur-xl adm-px-6 lg:adm-px-12 adm-py-8 adm-flex adm-flex-wrap adm-gap-4 adm-items-center adm-justify-between">
          <div>
            <p className="adm-text-primary adm-font-bold adm-uppercase adm-tracking-[0.2em] adm-text-[10px] adm-mb-1">
              Administrative Overview
            </p>
            <h2 className="adm-text-3xl sm:adm-text-4xl adm-font-black adm-font-headline adm-tracking-tighter adm-text-on-surface">
              Quản lý sự kiện
            </h2>
          </div>
          <div className="adm-flex adm-items-center adm-gap-4 adm-flex-wrap">
            <div className="adm-bg-surface-container-low adm-flex adm-items-center adm-px-4 adm-py-3 adm-rounded-xl adm-w-full sm:adm-w-80 focus-within:adm-bg-surface-container-high adm-transition-colors">
              <span className="adm-material-symbols adm-text-outline adm-mr-2">search</span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="adm-bg-transparent adm-border-none focus:adm-ring-0 adm-text-sm adm-w-full adm-font-body placeholder:adm-text-outline/60"
                placeholder="Tìm sự kiện, địa điểm..."
              />
            </div>
            <button
              type="button"
              className="adm-bg-surface-container-low adm-p-3 adm-rounded-xl hover:adm-bg-surface-container-high adm-transition-colors adm-relative"
              aria-label="Thông báo"
            >
              <span className="adm-material-symbols">notifications</span>
              <span className="adm-absolute adm-top-2 adm-right-2 adm-w-2 adm-h-2 adm-bg-error adm-rounded-full adm-border-2 adm-border-surface" />
            </button>
            <img
              alt="Admin"
              className="adm-w-12 adm-h-12 adm-rounded-full adm-border-2 adm-border-primary-container adm-object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuACQOsgUKBBQ4Pp1h7JluKaMw8ehBKImIVrS3RYEXEvhMN10BN5Vufh3YhyRrWV5ptxx8XS-QFdENwgl4lXfmBPYSTSBqNfk8rHd18bIf6bGusbFzUkajKbywQNn7u-rJsyNmHkbU7ayWSWwyoHdLS3D-s3s9kDRHMgRfsAoZhRHqo0gf4ECMByH-AvjZdsWraYt3SoCtQvce8VUU_Ri7sy0oQCsrZu9l9BjNbZ9J6AQNOnaizdLp4odwCs-wP8HJ3-GlNskxjcMgPO"
            />
          </div>
        </header>

        {err && (
          <div className="adm-mx-6 lg:adm-mx-12 adm-mb-4 adm-rounded-xl adm-bg-error/10 adm-text-error adm-text-sm adm-px-4 adm-py-3">
            {err}
          </div>
        )}

        <section className="adm-px-6 lg:adm-px-12 adm-pb-8 adm-flex adm-flex-wrap adm-items-center adm-gap-6">
          <div className="adm-flex adm-items-center adm-gap-3 adm-flex-wrap">
            <span className="adm-text-xs adm-font-bold adm-text-outline adm-uppercase adm-tracking-wider">Status</span>
            <div className="adm-flex adm-gap-2 adm-flex-wrap">
              {STATUS_FILTERS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setStatusFilter(s.id)}
                  className={`adm-px-4 adm-py-2 adm-rounded-full adm-text-xs adm-transition-colors ${
                    statusFilter === s.id
                      ? 'adm-bg-secondary-container adm-text-on-secondary-container adm-font-bold'
                      : 'hover:adm-bg-surface-container-low adm-text-on-surface-variant adm-font-medium'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
          <div className="adm-h-6 adm-w-px adm-bg-outline-variant/30 adm-hidden sm:adm-block" />
          <div className="adm-flex adm-items-center adm-gap-3">
            <span className="adm-text-xs adm-font-bold adm-text-outline adm-uppercase adm-tracking-wider">Timeframe</span>
            <select
              value={timeframeLabel}
              onChange={(e) => setTimeframeLabel(e.target.value)}
              className="adm-bg-surface-container-low adm-border-none adm-rounded-lg adm-text-xs adm-font-medium focus:adm-ring-primary/20 adm-text-on-surface-variant adm-py-2 adm-px-4 adm-pr-10"
            >
              <option>This Month</option>
              <option>Next 3 Months</option>
              <option>Past Year</option>
              <option>All</option>
            </select>
          </div>
          <button
            type="button"
            onClick={openCreate}
            className="adm-ml-auto adm-flex adm-items-center adm-gap-2 adm-text-primary adm-font-bold adm-text-sm hover:adm-underline adm-underline-offset-4"
          >
            <span className="adm-material-symbols adm-text-sm">add</span>
            Tạo mới nhanh
          </button>
        </section>

        {loading ? (
          <div className="adm-px-12 adm-py-20 adm-text-center adm-text-on-surface-variant">Đang tải…</div>
        ) : (
          <section className="adm-px-6 lg:adm-px-12 adm-pb-16 adm-grid adm-grid-cols-12 adm-gap-8">
            {featured && (
              <div className="adm-col-span-12 lg:adm-col-span-8 adm-group adm-cursor-pointer adm-bg-surface-container-lowest adm-rounded-[2rem] adm-overflow-hidden adm-flex adm-flex-col md:adm-flex-row adm-transition-all adm-duration-300 hover:adm-bg-surface-container-high">
                <div className="md:adm-w-1/2 adm-h-80 md:adm-h-auto adm-relative adm-overflow-hidden">
                  {featured.imageUrl ? (
                    <img
                      alt={featured.title}
                      className="adm-absolute adm-inset-0 adm-w-full adm-h-full adm-object-cover adm-transition-transform adm-duration-700 adm-group-hover:adm-scale-105"
                      src={featured.imageUrl}
                    />
                  ) : (
                    <div className="adm-absolute adm-inset-0 adm-bg-gradient-to-br adm-from-primary-container adm-to-primary" />
                  )}
                  <div className="adm-absolute adm-top-6 adm-left-6 adm-flex adm-gap-2">
                    {featured.isFeatured && (
                      <span className="adm-bg-primary/90 adm-text-on-primary adm-backdrop-blur-md adm-px-3 adm-py-1 adm-rounded-full adm-text-[10px] adm-font-bold adm-uppercase adm-tracking-widest">
                        Featured
                      </span>
                    )}
                    <span
                      className={`adm-backdrop-blur-md adm-px-3 adm-py-1 adm-rounded-full adm-text-[10px] adm-font-bold adm-uppercase adm-tracking-widest ${statusBadgeClass(featured.status)}`}
                    >
                      {statusLabel(featured.status)}
                    </span>
                  </div>
                </div>
                <div className="md:adm-w-1/2 adm-p-8 lg:adm-p-10 adm-flex adm-flex-col">
                  <div className="adm-mb-4">
                    <span className="adm-text-primary adm-font-bold adm-text-sm">{formatDateTimeVi(featured.startsAt)}</span>
                    <h3 className="adm-text-2xl sm:adm-text-3xl adm-font-black adm-font-headline adm-tracking-tighter adm-mt-1 adm-mb-3">
                      {featured.title}
                    </h3>
                    <p className="adm-text-on-surface-variant adm-text-sm adm-leading-relaxed adm-mb-6">
                      {featured.description || '—'}
                    </p>
                  </div>
                  <div className="adm-mt-auto adm-flex adm-flex-col sm:adm-flex-row sm:adm-items-center sm:adm-justify-between adm-gap-4 adm-pt-6 adm-border-t adm-border-outline-variant/20">
                    <div className="adm-flex adm-items-center adm-gap-2">
                      <span className="adm-material-symbols adm-text-primary">location_on</span>
                      <span className="adm-text-xs adm-font-semibold adm-text-outline">{featured.venue}</span>
                    </div>
                    <div className="adm-flex adm-gap-2">
                      <button
                        type="button"
                        onClick={() => openEdit(featured)}
                        className="adm-text-xs adm-font-bold adm-text-primary hover:adm-underline"
                      >
                        Chỉnh sửa
                      </button>
                      <button
                        type="button"
                        onClick={handleDeleteFeatured}
                        className="adm-text-xs adm-font-bold adm-text-error hover:adm-underline"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="adm-col-span-12 lg:adm-col-span-4 adm-bg-primary-container adm-rounded-[2rem] adm-p-8 lg:adm-p-10 adm-text-on-primary-container adm-flex adm-flex-col adm-justify-between">
              <div>
                <h4 className="adm-font-headline adm-font-black adm-text-2xl adm-mb-6">Quick Overview</h4>
                <div className="adm-space-y-6">
                  <div className="adm-flex adm-justify-between adm-items-center">
                    <span className="adm-text-sm adm-font-medium adm-opacity-80">Tổng người tham dự</span>
                    <span className="adm-text-xl adm-font-black">{formatCompactAttendees(stats.totalAttendees)}</span>
                  </div>
                  <div className="adm-flex adm-justify-between adm-items-center">
                    <span className="adm-text-sm adm-font-medium adm-opacity-80">Vé bán (TB %)</span>
                    <span className="adm-text-xl adm-font-black">{stats.ticketsSoldPercent}%</span>
                  </div>
                  <div className="adm-flex adm-justify-between adm-items-center">
                    <span className="adm-text-sm adm-font-medium adm-opacity-80">Doanh thu</span>
                    <span className="adm-text-xl adm-font-black adm-break-all">{formatMoneyVi(stats.revenue)}</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="adm-mt-8 adm-bg-on-primary-container adm-text-surface-container-lowest adm-py-4 adm-rounded-full adm-font-bold adm-font-headline adm-text-sm adm-flex adm-items-center adm-justify-center adm-gap-2"
              >
                Báo cáo tháng
                <span className="adm-material-symbols adm-text-sm">arrow_forward</span>
              </button>
            </div>

            {listCards.map((ev) => (
              <div
                key={ev._id}
                className="adm-col-span-12 md:adm-col-span-6 lg:adm-col-span-4 adm-group adm-bg-surface-container-lowest adm-rounded-[2rem] adm-p-8 adm-flex adm-flex-col adm-transition-all adm-duration-300 hover:adm-bg-surface-container-high"
              >
                <div className="adm-flex adm-justify-between adm-items-start adm-mb-8">
                  <div
                    className={`adm-w-16 adm-h-16 adm-rounded-2xl adm-flex adm-items-center adm-justify-center ${iconBoxClass(ev.iconKey)}`}
                  >
                    <span className={`adm-material-symbols adm-text-3xl ${iconColorClass(ev.iconKey)}`}>{ev.iconKey}</span>
                  </div>
                  <span
                    className={`adm-px-3 adm-py-1 adm-rounded-full adm-text-[10px] adm-font-bold adm-uppercase adm-tracking-widest ${statusBadgeClass(ev.status)}`}
                  >
                    {statusLabel(ev.status)}
                  </span>
                </div>
                <h3 className="adm-text-xl adm-font-black adm-font-headline adm-tracking-tight adm-mb-2">{ev.title}</h3>
                <p className="adm-text-outline adm-text-xs adm-font-medium adm-mb-6">
                  {formatDateTimeVi(ev.startsAt)} • {ev.venue}
                </p>
                <div className="adm-mt-auto adm-flex adm-items-center adm-justify-between">
                  <button
                    type="button"
                    onClick={() => openEdit(ev)}
                    className="adm-text-xs adm-font-bold adm-text-primary"
                  >
                    Chỉnh sửa
                  </button>
                  <span className="adm-material-symbols adm-text-outline-variant adm-group-hover:adm-text-primary adm-transition-colors">
                    more_horiz
                  </span>
                </div>
              </div>
            ))}

            {!featured && (
              <div className="adm-col-span-12 adm-text-center adm-py-12 adm-text-on-surface-variant">
                Chưa có sự kiện.{' '}
                <button type="button" className="adm-text-primary adm-font-bold" onClick={openCreate}>
                  Tạo sự kiện đầu tiên
                </button>
              </div>
            )}
          </section>
        )}

        <section className="adm-px-6 lg:adm-px-12 adm-pb-20">
          <div className="adm-bg-surface-container-low adm-rounded-[2rem] adm-p-8">
            <div className="adm-flex adm-justify-between adm-items-center adm-mb-8 adm-flex-wrap adm-gap-2">
              <h3 className="adm-font-headline adm-font-black adm-text-2xl">Hoạt động gần đây</h3>
              <button type="button" className="adm-text-sm adm-font-bold adm-text-primary hover:adm-underline">
                Xem tất cả
              </button>
            </div>
            <div className="adm-overflow-x-auto">
              <table className="adm-w-full adm-text-left">
                <thead>
                  <tr className="adm-text-outline adm-uppercase adm-text-[10px] adm-font-black adm-tracking-widest adm-border-b adm-border-outline-variant/10">
                    <th className="adm-pb-4 adm-px-4">Sự kiện</th>
                    <th className="adm-pb-4 adm-px-4">Hành động</th>
                    <th className="adm-pb-4 adm-px-4">Thời gian</th>
                    <th className="adm-pb-4 adm-px-4">Trạng thái</th>
                    <th className="adm-pb-4 adm-px-4 adm-text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="adm-divide-y adm-divide-outline-variant/5">
                  {activities.map((row) => (
                    <tr key={String(row.eventId)} className="hover:adm-bg-surface-container adm-transition-colors adm-group">
                      <td className="adm-py-5 adm-px-4">
                        <p className="adm-font-bold adm-text-sm">{row.eventName}</p>
                        <p className="adm-text-[10px] adm-text-outline">ID: #{String(row.eventId).slice(-5)}</p>
                      </td>
                      <td className="adm-py-5 adm-px-4 adm-text-xs adm-font-medium">{row.action}</td>
                      <td className="adm-py-5 adm-px-4 adm-text-xs adm-font-medium adm-text-outline">
                        {relativeTimeVi(row.updatedAt)}
                      </td>
                      <td className="adm-py-5 adm-px-4">
                        {row.status.key === 'active' && (
                          <span className="adm-flex adm-items-center adm-gap-1.5 adm-text-xs adm-font-bold adm-text-green-600">
                            <span className="adm-w-1.5 adm-h-1.5 adm-rounded-full adm-bg-green-600" /> Active
                          </span>
                        )}
                        {row.status.key === 'draft' && (
                          <span className="adm-flex adm-items-center adm-gap-1.5 adm-text-xs adm-font-bold adm-text-primary">
                            <span className="adm-w-1.5 adm-h-1.5 adm-rounded-full adm-bg-primary" /> Draft
                          </span>
                        )}
                        {row.status.key === 'closed' && (
                          <span className="adm-flex adm-items-center adm-gap-1.5 adm-text-xs adm-font-bold adm-text-on-surface-variant adm-opacity-60">
                            <span className="adm-w-1.5 adm-h-1.5 adm-rounded-full adm-bg-outline" /> Closed
                          </span>
                        )}
                      </td>
                      <td className="adm-py-5 adm-px-4 adm-text-right">
                        <button
                          type="button"
                          className="adm-material-symbols adm-text-outline adm-group-hover:adm-text-primary adm-cursor-pointer adm-bg-transparent adm-border-none"
                          aria-label="Cài đặt"
                          onClick={() => {
                            const ev = events.find((e) => String(e._id) === String(row.eventId));
                            if (ev) openEdit(ev);
                          }}
                        >
                          settings
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {activities.length === 0 && (
                <p className="adm-text-center adm-py-8 adm-text-on-surface-variant adm-text-sm">Chưa có hoạt động.</p>
              )}
            </div>
          </div>
        </section>

        <footer className="adm-w-full adm-mt-auto adm-bg-purple-100 dark:adm-bg-slate-900 adm-flex adm-flex-col md:adm-flex-row adm-justify-between adm-items-center adm-px-6 lg:adm-px-12 adm-py-16">
          <div className="adm-mb-8 md:adm-mb-0">
            <span className="adm-text-lg adm-font-bold adm-text-purple-900 dark:adm-text-purple-100 adm-font-headline">
              The Editorial Architect
            </span>
            <p className="adm-text-purple-800/70 dark:adm-text-purple-300/70 adm-text-sm adm-tracking-wide adm-font-body adm-mt-2">
              © {new Date().getFullYear()} The Editorial Architect. All rights reserved.
            </p>
          </div>
          <div className="adm-flex adm-gap-6 lg:adm-gap-8 adm-flex-wrap adm-justify-center">
            <a className="adm-text-purple-800/70 dark:adm-text-purple-300/70 hover:adm-text-purple-900 dark:hover:adm-text-white adm-font-body adm-text-sm adm-underline adm-decoration-purple-500 adm-underline-offset-4" href="#">
              Privacy Policy
            </a>
            <a className="adm-text-purple-800/70 dark:adm-text-purple-300/70 hover:adm-text-purple-900 dark:hover:adm-text-white adm-font-body adm-text-sm adm-underline adm-decoration-purple-500 adm-underline-offset-4" href="#">
              Terms of Service
            </a>
            <a className="adm-text-purple-800/70 dark:adm-text-purple-300/70 hover:adm-text-purple-900 dark:hover:adm-text-white adm-font-body adm-text-sm adm-underline adm-decoration-purple-500 adm-underline-offset-4" href="#">
              Help Center
            </a>
          </div>
        </footer>
      </main>

      <EventFormModal
        open={modalOpen}
        initial={editing}
        onClose={() => {
          setModalOpen(false);
          setEditing(null);
        }}
        onSubmit={handleSubmitForm}
      />
    </>
  );
}
