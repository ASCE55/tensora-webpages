import { format, parseISO, isValid } from 'date-fns';

export const formatDate = (dateString, formatStr = 'dd MMM yyyy') => {
  if (!dateString) return '—';
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : new Date(dateString);
    if (!isValid(date)) return dateString;
    return format(date, formatStr);
  } catch {
    return dateString;
  }
};

export const formatDateTime = (dateString) => {
  return formatDate(dateString, 'dd MMM yyyy, hh:mm a');
};

export const formatTime = (dateString) => {
  return formatDate(dateString, 'hh:mm a');
};
