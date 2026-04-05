import axios from 'axios';

const base = import.meta.env.VITE_API_URL || '';

const client = axios.create({
  baseURL: `${base}/api/ticket-types`,
  headers: { 'Content-Type': 'application/json' },
});

export async function fetchTicketTypes(eventId) {
  const { data } = await client.get('/', { params: { eventId } });
  return data.data;
}

export async function createTicketType(payload) {
  const { data } = await client.post('/', payload);
  return data.data;
}

export async function updateTicketType(id, payload) {
  const { data } = await client.put(`/${id}`, payload);
  return data.data;
}

export async function deleteTicketType(id) {
  await client.delete(`/${id}`);
}
