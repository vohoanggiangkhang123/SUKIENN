import axios from 'axios';

const base = import.meta.env.VITE_API_URL || '';

const client = axios.create({
  baseURL: `${base}/api/events`,
  headers: { 'Content-Type': 'application/json' },
});

export async function fetchEvents(params) {
  const { data } = await client.get('/', { params });
  return data.data;
}

export async function fetchEvent(id) {
  const { data } = await client.get(`/${id}`);
  return data.data;
}

export async function createEvent(payload) {
  const { data } = await client.post('/', payload);
  return data.data;
}

export async function updateEvent(id, payload) {
  const { data } = await client.put(`/${id}`, payload);
  return data.data;
}

export async function deleteEvent(id) {
  await client.delete(`/${id}`);
}

export async function fetchStatsOverview() {
  const { data } = await client.get('/stats/overview');
  return data.data;
}

export async function fetchRecentActivities(limit = 10) {
  const { data } = await client.get('/activities/recent', { params: { limit } });
  return data.data;
}
