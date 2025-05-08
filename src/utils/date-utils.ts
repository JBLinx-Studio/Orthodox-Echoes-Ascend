
// Date formatting and manipulation utilities
import { format, isToday, isYesterday, formatDistanceToNow } from 'date-fns';

export function formatDate(date: Date | string | number): string {
  const dateObj = new Date(date);
  if (isToday(dateObj)) {
    return `Today at ${format(dateObj, 'h:mm a')}`;
  } else if (isYesterday(dateObj)) {
    return `Yesterday at ${format(dateObj, 'h:mm a')}`;
  } else {
    return format(dateObj, 'MMM d, yyyy');
  }
}

export function formatRelativeTime(date: Date | string | number): string {
  const dateObj = new Date(date);
  return formatDistanceToNow(dateObj, { addSuffix: true });
}

export function formatLiturgicalDate(date: Date | string | number): string {
  const dateObj = new Date(date);
  return format(dateObj, "EEEE, MMMM d, yyyy");
}

export function getDayOfWeek(date: Date | string | number): string {
  const dateObj = new Date(date);
  return format(dateObj, 'EEEE');
}
