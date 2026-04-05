import axios from 'axios';

const base = import.meta.env.VITE_API_URL || '';

export async function fetchAdminOrders(params) {
  const { data } = await axios.get(`${base}/api/orders/admin/list`, { params });
  return data.data;
}

export async function updateOrderStatus(id, status) {
  const { data } = await axios.put(`${base}/api/orders/${id}`, { status });
  return data;
}

export async function deleteOrderAdmin(id) {
  await axios.delete(`${base}/api/orders/${id}`);
}
