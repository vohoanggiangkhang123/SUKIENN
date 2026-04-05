import { useEffect, useState } from 'react';

const empty = {
  title: '',
  description: '',
  startsAt: '',
  venue: '',
  imageUrl: '',
  status: 'draft',
  isFeatured: false,
  iconKey: 'calendar_month',
  metrics: { totalAttendees: 0, ticketsSoldPercent: 0, revenue: 0 },
};

function toLocalInputValue(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function EventFormModal({ open, initial, onClose, onSubmit }) {
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    if (initial) {
      setForm({
        title: initial.title ?? '',
        description: initial.description ?? '',
        startsAt: toLocalInputValue(initial.startsAt),
        venue: initial.venue ?? '',
        imageUrl: initial.imageUrl ?? '',
        status: initial.status ?? 'draft',
        isFeatured: Boolean(initial.isFeatured),
        iconKey: initial.iconKey ?? 'calendar_month',
        metrics: {
          totalAttendees: initial.metrics?.totalAttendees ?? 0,
          ticketsSoldPercent: initial.metrics?.ticketsSoldPercent ?? 0,
          revenue: initial.metrics?.revenue ?? 0,
        },
      });
    } else {
      setForm(empty);
    }
  }, [open, initial]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('metrics.')) {
      const key = name.split('.')[1];
      setForm((f) => ({
        ...f,
        metrics: { ...f.metrics, [key]: Number(value) || 0 },
      }));
      return;
    }
    setForm((f) => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        startsAt: new Date(form.startsAt).toISOString(),
        lastAdminAction: initial ? 'Đã cập nhật sự kiện' : 'Sự kiện mới được tạo',
      };
      await onSubmit(payload);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="adm-fixed adm-inset-0 adm-z-50 adm-flex adm-items-center adm-justify-center adm-p-4 adm-bg-on-surface/40 adm-backdrop-blur-sm">
      <div
        role="dialog"
        className="adm-bg-surface-container-lowest adm-rounded-2xl adm-shadow-2xl adm-max-w-lg adm-w-full adm-max-h-[90vh] adm-overflow-y-auto adm-border adm-border-outline-variant/30"
      >
        <div className="adm-p-6 adm-border-b adm-border-outline-variant/20 adm-flex adm-justify-between adm-items-center">
          <h3 className="adm-font-headline adm-text-xl adm-font-black">{initial ? 'Sửa sự kiện' : 'Tạo sự kiện'}</h3>
          <button
            type="button"
            onClick={onClose}
            className="adm-p-2 adm-rounded-lg hover:adm-bg-surface-container-high adm-transition-colors"
            aria-label="Đóng"
          >
            <span className="adm-material-symbols adm-text-outline">close</span>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="adm-p-6 adm-space-y-4">
          <div>
            <label className="adm-block adm-text-xs adm-font-bold adm-text-outline adm-mb-1">Tiêu đề *</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="adm-w-full adm-rounded-xl adm-border adm-border-outline-variant/40 adm-bg-surface-container-low adm-px-3 adm-py-2 adm-text-sm focus:adm-ring-2 focus:adm-ring-primary/30"
            />
          </div>
          <div>
            <label className="adm-block adm-text-xs adm-font-bold adm-text-outline adm-mb-1">Mô tả</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="adm-w-full adm-rounded-xl adm-border adm-border-outline-variant/40 adm-bg-surface-container-low adm-px-3 adm-py-2 adm-text-sm focus:adm-ring-2 focus:adm-ring-primary/30"
            />
          </div>
          <div className="adm-grid adm-grid-cols-1 sm:adm-grid-cols-2 adm-gap-4">
            <div>
              <label className="adm-block adm-text-xs adm-font-bold adm-text-outline adm-mb-1">Thời gian *</label>
              <input
                name="startsAt"
                type="datetime-local"
                value={form.startsAt}
                onChange={handleChange}
                required
                className="adm-w-full adm-rounded-xl adm-border adm-border-outline-variant/40 adm-bg-surface-container-low adm-px-3 adm-py-2 adm-text-sm"
              />
            </div>
            <div>
              <label className="adm-block adm-text-xs adm-font-bold adm-text-outline adm-mb-1">Địa điểm *</label>
              <input
                name="venue"
                value={form.venue}
                onChange={handleChange}
                required
                className="adm-w-full adm-rounded-xl adm-border adm-border-outline-variant/40 adm-bg-surface-container-low adm-px-3 adm-py-2 adm-text-sm"
              />
            </div>
          </div>
          <div>
            <label className="adm-block adm-text-xs adm-font-bold adm-text-outline adm-mb-1">URL ảnh</label>
            <input
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              className="adm-w-full adm-rounded-xl adm-border adm-border-outline-variant/40 adm-bg-surface-container-low adm-px-3 adm-py-2 adm-text-sm"
            />
          </div>
          <div className="adm-grid adm-grid-cols-2 adm-gap-4">
            <div>
              <label className="adm-block adm-text-xs adm-font-bold adm-text-outline adm-mb-1">Trạng thái</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="adm-w-full adm-rounded-xl adm-border-none adm-bg-surface-container-low adm-px-3 adm-py-2 adm-text-sm"
              >
                <option value="draft">Draft</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div>
              <label className="adm-block adm-text-xs adm-font-bold adm-text-outline adm-mb-1">Icon thẻ</label>
              <select
                name="iconKey"
                value={form.iconKey}
                onChange={handleChange}
                className="adm-w-full adm-rounded-xl adm-border-none adm-bg-surface-container-low adm-px-3 adm-py-2 adm-text-sm"
              >
                <option value="calendar_month">calendar_month</option>
                <option value="palette">palette</option>
                <option value="restaurant">restaurant</option>
                <option value="campaign">campaign</option>
              </select>
            </div>
          </div>
          <label className="adm-flex adm-items-center adm-gap-2 adm-text-sm adm-font-medium">
            <input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={handleChange} />
            Sự kiện nổi bật (Featured)
          </label>
          <div className="adm-grid adm-grid-cols-3 adm-gap-2 adm-text-xs">
            <div>
              <label className="adm-block adm-text-outline adm-mb-1">Người tham dự</label>
              <input
                name="metrics.totalAttendees"
                type="number"
                min={0}
                value={form.metrics.totalAttendees}
                onChange={handleChange}
                className="adm-w-full adm-rounded-lg adm-border adm-border-outline-variant/30 adm-px-2 adm-py-1"
              />
            </div>
            <div>
              <label className="adm-block adm-text-outline adm-mb-1">% vé bán</label>
              <input
                name="metrics.ticketsSoldPercent"
                type="number"
                min={0}
                max={100}
                value={form.metrics.ticketsSoldPercent}
                onChange={handleChange}
                className="adm-w-full adm-rounded-lg adm-border adm-border-outline-variant/30 adm-px-2 adm-py-1"
              />
            </div>
            <div>
              <label className="adm-block adm-text-outline adm-mb-1">Doanh thu</label>
              <input
                name="metrics.revenue"
                type="number"
                min={0}
                value={form.metrics.revenue}
                onChange={handleChange}
                className="adm-w-full adm-rounded-lg adm-border adm-border-outline-variant/30 adm-px-2 adm-py-1"
              />
            </div>
          </div>
          <div className="adm-flex adm-justify-end adm-gap-3 adm-pt-4">
            <button
              type="button"
              onClick={onClose}
              className="adm-px-4 adm-py-2 adm-rounded-full adm-text-sm adm-font-bold adm-text-on-surface-variant hover:adm-bg-surface-container-high"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={saving}
              className="adm-px-6 adm-py-2 adm-rounded-full adm-bg-primary adm-text-on-primary adm-text-sm adm-font-bold disabled:adm-opacity-50"
            >
              {saving ? 'Đang lưu…' : 'Lưu'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
