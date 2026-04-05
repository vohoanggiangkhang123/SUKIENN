import { useEffect, useState } from 'react';

const empty = {
  name: '',
  description: '',
  price: '',
  capacity: '',
  sortOrder: 0,
  isActive: true,
};

export default function TicketTypeFormModal({ open, eventId, initial, onClose, onSubmit }) {
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    if (initial) {
      setForm({
        name: initial.name ?? '',
        description: initial.description ?? '',
        price: String(initial.price ?? ''),
        capacity: String(initial.capacity ?? ''),
        sortOrder: initial.sortOrder ?? 0,
        isActive: initial.isActive !== false,
      });
    } else {
      setForm(empty);
    }
  }, [open, initial]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === 'checkbox' ? checked : name === 'sortOrder' ? Number(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSubmit({
        eventId,
        name: form.name.trim(),
        description: form.description.trim(),
        price: Number(form.price),
        capacity: Number(form.capacity),
        sortOrder: Number(form.sortOrder) || 0,
        isActive: form.isActive,
      });
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="adm-fixed adm-inset-0 adm-z-50 adm-flex adm-items-center adm-justify-center adm-p-4 adm-bg-on-surface/40 adm-backdrop-blur-sm">
      <div className="adm-bg-surface-container-lowest adm-rounded-2xl adm-shadow-2xl adm-max-w-md adm-w-full adm-max-h-[90vh] adm-overflow-y-auto adm-border adm-border-outline-variant/30">
        <div className="adm-p-6 adm-border-b adm-border-outline-variant/20 adm-flex adm-justify-between adm-items-center">
          <h3 className="adm-font-headline adm-text-xl adm-font-black">{initial ? 'Sửa loại vé' : 'Thêm loại vé'}</h3>
          <button
            type="button"
            onClick={onClose}
            className="adm-p-2 adm-rounded-lg hover:adm-bg-surface-container-high"
            aria-label="Đóng"
          >
            <span className="adm-material-symbols adm-text-outline">close</span>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="adm-p-6 adm-space-y-4">
          <div>
            <label className="adm-block adm-text-xs adm-font-bold adm-text-outline adm-mb-1">Tên loại vé *</label>
            <input
              name="name"
              value={form.name}
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
              rows={2}
              className="adm-w-full adm-rounded-xl adm-border adm-border-outline-variant/40 adm-bg-surface-container-low adm-px-3 adm-py-2 adm-text-sm"
            />
          </div>
          <div className="adm-grid adm-grid-cols-2 adm-gap-3">
            <div>
              <label className="adm-block adm-text-xs adm-font-bold adm-text-outline adm-mb-1">Giá (VND) *</label>
              <input
                name="price"
                type="number"
                min={0}
                value={form.price}
                onChange={handleChange}
                required
                className="adm-w-full adm-rounded-xl adm-border adm-border-outline-variant/40 adm-bg-surface-container-low adm-px-3 adm-py-2 adm-text-sm"
              />
            </div>
            <div>
              <label className="adm-block adm-text-xs adm-font-bold adm-text-outline adm-mb-1">Sức chứa *</label>
              <input
                name="capacity"
                type="number"
                min={1}
                value={form.capacity}
                onChange={handleChange}
                required
                className="adm-w-full adm-rounded-xl adm-border adm-border-outline-variant/40 adm-bg-surface-container-low adm-px-3 adm-py-2 adm-text-sm"
              />
            </div>
          </div>
          <div>
            <label className="adm-block adm-text-xs adm-font-bold adm-text-outline adm-mb-1">Thứ tự hiển thị</label>
            <input
              name="sortOrder"
              type="number"
              value={form.sortOrder}
              onChange={handleChange}
              className="adm-w-full adm-rounded-xl adm-border adm-border-outline-variant/40 adm-bg-surface-container-low adm-px-3 adm-py-2 adm-text-sm"
            />
          </div>
          <label className="adm-flex adm-items-center adm-gap-2 adm-text-sm">
            <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} />
            Đang mở bán
          </label>
          <div className="adm-flex adm-justify-end adm-gap-3 adm-pt-2">
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
