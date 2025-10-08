export function formatDate(value) {
  if (!value) return '';
  if (typeof value === 'string' && value.includes('T')) return value.split('T')[0];
  try {
    const d = new Date(value);
    if (!isNaN(d)) return d.toISOString().split('T')[0];
  } catch (_) {}
  return String(value);
}


