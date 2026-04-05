import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchEvents } from '../api/eventsApi';
import {
  createTicketType,
  deleteTicketType,
  fetchTicketTypes,
  updateTicketType,
} from '../api/ticketTypesApi';
import { deleteOrderAdmin, fetchAdminOrders, updateOrderStatus } from '../api/ordersAdminApi';
import TicketTypeFormModal from './TicketTypeFormModal';

function formatMoneyVi(n) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(n || 0);
}

function formatDateTimeVi(iso) {
  if (!iso) return '—';
  return new Intl.DateTimeFormat('vi-VN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso));
}

const ORDER_STATUS_OPTS = [
  { value: 'all', label: 'Tất cả' },
  { value: 'pending', label: 'Chờ thanh toán' },
  { value: 'paid', label: 'Đã thanh toán' },
  { value: 'cancelled', label: 'Đã hủy' },
];

export default function TicketManagement() {
  const [events, setEvents] = useState([]);
  const [eventId, setEventId] = useState('');
  const [types, setTypes] = useState([]);
  const [orders, setOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const [typeModal, setTypeModal] = useState(false);
  const [editingType, setEditingType] = useState(null);

  const loadEvents = useCallback(async () => {
    try {
      const list = await fetchEvents({ status: 'all' });
      setEvents(list);
      setEventId((prev) => {
        if (prev && list.some((e) => String(e._id) === String(prev))) return prev;
        return list[0]?._id ? String(list[0]._id) : '';
      });
    } catch (e) {
      setErr(e?.response?.data?.message || e.message || 'Không tải được sự kiện');
    }
  }, []);

  const loadTicketsAndOrders = useCallback(async () => {
    if (!eventId) {
      setTypes([]);
      setOrders([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setErr('');
    try {
      const [t, o] = await Promise.all([
        fetchTicketTypes(eventId),
        fetchAdminOrders({ eventId, status: orderStatus }),
      ]);
      setTypes(t);
      setOrders(o);
    } catch (e) {
      setErr(e?.response?.data?.message || e.message || 'Lỗi tải dữ liệu vé');
    } finally {
      setLoading(false);
    }
  }, [eventId, orderStatus]);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  useEffect(() => {
    loadTicketsAndOrders();
  }, [loadTicketsAndOrders]);

  const selectedEvent = useMemo(
    () => events.find((e) => String(e._id) === String(eventId)),
    [events, eventId]
  );

  const orderStats = useMemo(() => {
    let pending = 0;
    let paidRev = 0;
    let paidQty = 0;
    orders.forEach((o) => {
      if (o.status === 'pending') pending += 1;
      if (o.status === 'paid') {
        paidRev += o.totalPrice || 0;
        paidQty += o.ticketQuantity || 0;
      }
    });
    return { pending, paidRev, paidQty, totalOrders: orders.length };
  }, [orders]);

  const openNewType = () => {
    setEditingType(null);
    setTypeModal(true);
  };

  const openEditType = (t) => {
    setEditingType(t);
    setTypeModal(true);
  };

  const handleSubmitType = async (payload) => {
    if (editingType) {
      await updateTicketType(editingType._id, {
        name: payload.name,
        description: payload.description,
        price: payload.price,
        capacity: payload.capacity,
        sortOrder: payload.sortOrder,
        isActive: payload.isActive,
      });
    } else {
      await createTicketType(payload);
    }
    await loadTicketsAndOrders();
  };

  const handleDeleteType = async (t) => {
    if (!window.confirm(`Xóa loại vé "${t.name}"?`)) return;
    try {
      await deleteTicketType(t._id);
      await loadTicketsAndOrders();
    } catch (e) {
      setErr(e?.response?.data?.message || e.message);
    }
  };

  const handleOrderStatusChange = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status);
      await loadTicketsAndOrders();
    } catch (e) {
      setErr(e?.response?.data?.message || e.message);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm('Xóa đơn hàng này?')) return;
    try {
      await deleteOrderAdmin(orderId);
      await loadTicketsAndOrders();
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
              Quản lý vé
            </h2>
          </div>
          <div className="adm-flex adm-items-center adm-gap-3 adm-flex-wrap">
            <label className="adm-text-xs adm-font-bold adm-text-outline adm-uppercase adm-tracking-wider adm-whitespace-nowrap">
              Sự kiện
            </label>
            <select
              value={eventId}
              onChange={(e) => setEventId(e.target.value)}
              className="adm-bg-surface-container-low adm-border-none adm-rounded-xl adm-text-sm adm-font-medium adm-py-3 adm-px-4 adm-min-w-[200px] adm-max-w-[320px]"
            >
              {events.length === 0 && <option value="">— Chưa có sự kiện —</option>}
              {events.map((e) => (
                <option key={e._id} value={e._id}>
                  {e.title}
                </option>
              ))}
            </select>
          </div>
        </header>

        {err && (
          <div className="adm-mx-6 lg:adm-mx-12 adm-mb-4 adm-rounded-xl adm-bg-error/10 adm-text-error adm-text-sm adm-px-4 adm-py-3">
            {err}
          </div>
        )}

        {selectedEvent && (
          <p className="adm-px-6 lg:adm-px-12 adm-pb-4 adm-text-sm adm-text-on-surface-variant">
            {selectedEvent.venue} · {formatDateTimeVi(selectedEvent.startsAt)}
          </p>
        )}

        <section className="adm-px-6 lg:adm-px-12 adm-pb-8 adm-grid adm-grid-cols-1 sm:adm-grid-cols-3 adm-gap-4">
          <div className="adm-bg-surface-container-lowest adm-rounded-2xl adm-p-6 adm-border adm-border-outline-variant/10">
            <p className="adm-text-xs adm-font-bold adm-text-outline adm-uppercase adm-mb-1">Loại vé</p>
            <p className="adm-text-2xl adm-font-black adm-font-headline">{types.length}</p>
          </div>
          <div className="adm-bg-surface-container-lowest adm-rounded-2xl adm-p-6 adm-border adm-border-outline-variant/10">
            <p className="adm-text-xs adm-font-bold adm-text-outline adm-uppercase adm-mb-1">Đơn chờ / Tổng đơn</p>
            <p className="adm-text-2xl adm-font-black adm-font-headline">
              {orderStats.pending} / {orderStats.totalOrders}
            </p>
          </div>
          <div className="adm-bg-primary-container adm-rounded-2xl adm-p-6 adm-text-on-primary-container">
            <p className="adm-text-xs adm-font-bold adm-opacity-80 adm-uppercase adm-mb-1">Doanh thu (đã thanh toán)</p>
            <p className="adm-text-xl adm-font-black adm-leading-tight">{formatMoneyVi(orderStats.paidRev)}</p>
            <p className="adm-text-xs adm-mt-1 adm-opacity-80">{orderStats.paidQty} vé</p>
          </div>
        </section>

        <section className="adm-px-6 lg:adm-px-12 adm-pb-12">
          <div className="adm-flex adm-items-center adm-justify-between adm-mb-4 adm-flex-wrap adm-gap-3">
            <h3 className="adm-font-headline adm-text-xl adm-font-black">Loại vé theo sự kiện</h3>
            <button
              type="button"
              onClick={openNewType}
              disabled={!eventId}
              className="adm-inline-flex adm-items-center adm-gap-2 adm-bg-primary adm-text-on-primary adm-px-5 adm-py-2.5 adm-rounded-full adm-text-sm adm-font-bold disabled:adm-opacity-40"
            >
              <span className="adm-material-symbols adm-text-lg">add</span>
              Thêm loại vé
            </button>
          </div>
          <div className="adm-bg-surface-container-low adm-rounded-[2rem] adm-overflow-hidden adm-border adm-border-outline-variant/10">
            {loading && !types.length ? (
              <p className="adm-p-8 adm-text-center adm-text-on-surface-variant">Đang tải…</p>
            ) : (
              <div className="adm-overflow-x-auto">
                <table className="adm-w-full adm-text-left adm-text-sm">
                  <thead>
                    <tr className="adm-text-outline adm-uppercase adm-text-[10px] adm-font-black adm-tracking-wider adm-border-b adm-border-outline-variant/10 adm-bg-surface-container-lowest/80">
                      <th className="adm-p-4">Tên</th>
                      <th className="adm-p-4">Giá</th>
                      <th className="adm-p-4">Đã bán / Sức chứa</th>
                      <th className="adm-p-4">Trạng thái</th>
                      <th className="adm-p-4 adm-text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="adm-divide-y adm-divide-outline-variant/5">
                    {types.map((t) => (
                      <tr key={t._id} className="hover:adm-bg-surface-container-lowest/60">
                        <td className="adm-p-4">
                          <p className="adm-font-bold adm-text-on-surface">{t.name}</p>
                          <p className="adm-text-xs adm-text-outline adm-mt-0.5">{t.description || '—'}</p>
                        </td>
                        <td className="adm-p-4 adm-font-medium">{formatMoneyVi(t.price)}</td>
                        <td className="adm-p-4">
                          <span className="adm-font-bold">{t.sold ?? 0}</span>
                          <span className="adm-text-outline"> / {t.capacity}</span>
                        </td>
                        <td className="adm-p-4">
                          <span
                            className={`adm-text-xs adm-font-bold adm-px-2 adm-py-1 adm-rounded-full ${
                              t.isActive ? 'adm-bg-green-500/15 adm-text-green-700' : 'adm-bg-on-surface/10 adm-text-on-surface-variant'
                            }`}
                          >
                            {t.isActive ? 'Mở bán' : 'Tạm dừng'}
                          </span>
                        </td>
                        <td className="adm-p-4 adm-text-right adm-space-x-2">
                          <button
                            type="button"
                            onClick={() => openEditType(t)}
                            className="adm-text-primary adm-font-bold adm-text-xs hover:adm-underline"
                          >
                            Sửa
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteType(t)}
                            className="adm-text-error adm-font-bold adm-text-xs hover:adm-underline"
                          >
                            Xóa
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {types.length === 0 && !loading && (
                  <p className="adm-p-8 adm-text-center adm-text-on-surface-variant adm-text-sm">
                    Chưa có loại vé. Thêm loại để gắn với đặt vé (ticketTypeId).
                  </p>
                )}
              </div>
            )}
          </div>
        </section>

        <section className="adm-px-6 lg:adm-px-12 adm-pb-20">
          <div className="adm-flex adm-items-center adm-justify-between adm-mb-4 adm-flex-wrap adm-gap-3">
            <h3 className="adm-font-headline adm-text-xl adm-font-black">Đơn đặt vé</h3>
            <select
              value={orderStatus}
              onChange={(e) => setOrderStatus(e.target.value)}
              className="adm-bg-surface-container-low adm-border-none adm-rounded-lg adm-text-xs adm-font-medium adm-py-2 adm-px-4"
            >
              {ORDER_STATUS_OPTS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <div className="adm-bg-surface-container-low adm-rounded-[2rem] adm-overflow-hidden adm-border adm-border-outline-variant/10">
            <div className="adm-overflow-x-auto">
              <table className="adm-w-full adm-text-left adm-text-sm">
                <thead>
                  <tr className="adm-text-outline adm-uppercase adm-text-[10px] adm-font-black adm-tracking-wider adm-border-b adm-border-outline-variant/10 adm-bg-surface-container-lowest/80">
                    <th className="adm-p-4">Mã / User</th>
                    <th className="adm-p-4">Loại vé</th>
                    <th className="adm-p-4">Số lượng</th>
                    <th className="adm-p-4">Tổng tiền</th>
                    <th className="adm-p-4">TT thanh toán</th>
                    <th className="adm-p-4">Trạng thái</th>
                    <th className="adm-p-4 adm-text-right">Xóa</th>
                  </tr>
                </thead>
                <tbody className="adm-divide-y adm-divide-outline-variant/5">
                  {orders.map((o) => (
                    <tr key={o._id} className="hover:adm-bg-surface-container-lowest/60">
                      <td className="adm-p-4">
                        <p className="adm-font-mono adm-text-xs adm-text-outline">#{String(o._id).slice(-8)}</p>
                        <p className="adm-text-xs adm-font-medium adm-mt-1">{String(o.userId).slice(-8)}</p>
                      </td>
                      <td className="adm-p-4">
                        {o.ticketTypeName || (o.ticketTypeId?.name ?? 'Chung')}
                      </td>
                      <td className="adm-p-4 adm-font-bold">{o.ticketQuantity}</td>
                      <td className="adm-p-4">{formatMoneyVi(o.totalPrice)}</td>
                      <td className="adm-p-4 adm-text-xs">{o.paymentMethod}</td>
                      <td className="adm-p-4">
                        <select
                          value={o.status}
                          onChange={(e) => handleOrderStatusChange(o._id, e.target.value)}
                          className="adm-bg-surface-container-lowest adm-border adm-border-outline-variant/30 adm-rounded-lg adm-text-xs adm-py-1.5 adm-px-2 adm-font-bold"
                        >
                          <option value="pending">pending</option>
                          <option value="paid">paid</option>
                          <option value="cancelled">cancelled</option>
                        </select>
                      </td>
                      <td className="adm-p-4 adm-text-right">
                        <button
                          type="button"
                          onClick={() => handleDeleteOrder(o._id)}
                          className="adm-text-error adm-text-xs adm-font-bold hover:adm-underline"
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {orders.length === 0 && !loading && (
                <p className="adm-p-8 adm-text-center adm-text-on-surface-variant adm-text-sm">
                  Không có đơn hàng cho bộ lọc này.
                </p>
              )}
            </div>
          </div>
        </section>
      </main>

      <TicketTypeFormModal
        open={typeModal}
        eventId={eventId}
        initial={editingType}
        onClose={() => {
          setTypeModal(false);
          setEditingType(null);
        }}
        onSubmit={handleSubmitType}
      />
    </>
  );
}
