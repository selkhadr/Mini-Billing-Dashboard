const API_URL = 'http://localhost:8000/api';

async function safeJson(res) {
  try {
    return await res.json();
  } catch (_) {
    return null;
  }
}

export async function fetchStats() {
  const res = await fetch(`${API_URL}/dashboard/stats`, {
    headers: { Accept: 'application/json' },
    cache: 'no-store',
  });
  if (!res.ok) return {};
  const data = await safeJson(res);
  return data || {};
}

export async function fetchCustomers() {
  const res = await fetch(`${API_URL}/customers`, {
    headers: { Accept: 'application/json' },
    cache: 'no-store',
  });
  if (!res.ok) return [];
  const data = await safeJson(res);
  return Array.isArray(data) ? data : [];
}

export async function fetchInvoices() {
  const res = await fetch(`${API_URL}/invoices`, {
    headers: { Accept: 'application/json' },
    cache: 'no-store',
  });
  if (!res.ok) return [];
  const data = await safeJson(res);
  return Array.isArray(data) ? data : [];
}

export async function upsertEntity(type, id, payload) {
  const endpoint = type === 'customer' ? 'customers' : 'invoices';
  const method = id ? 'PUT' : 'POST';
  const url = id ? `${API_URL}/${endpoint}/${id}` : `${API_URL}/${endpoint}`;
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await safeJson(res);
    throw err || new Error('Request failed');
  }
  return await safeJson(res);
}

export async function deleteEntity(type, id) {
  const endpoint = type === 'customer' ? 'customers' : 'invoices';
  const res = await fetch(`${API_URL}/${endpoint}/${id}`, {
    method: 'DELETE',
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) {
    const err = await safeJson(res);
    throw err || new Error('Delete failed');
  }
  return true;
}


