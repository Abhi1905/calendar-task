import { auth } from './firebase';

const API_URL = import.meta.env.VITE_API_URL;

async function getAuthHeaders() {
  const token = await auth.currentUser?.getIdToken();
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}

export async function fetchEvents() {
  const headers = await getAuthHeaders();
  const response = await fetch(`${API_URL}/api/events`, { headers });
  if (!response.ok) throw new Error('Failed to fetch events');
  return response.json();
}

export async function createEvent(eventData: any) {
  const headers = await getAuthHeaders();
  const response = await fetch(`${API_URL}/api/events`, {
    method: 'POST',
    headers,
    body: JSON.stringify(eventData),
  });
  if (!response.ok) throw new Error('Failed to create event');
  return response.json();
}