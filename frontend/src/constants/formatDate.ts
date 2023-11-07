export function formatDateAndTime(date: Date): string {
  const formatter = new Intl.DateTimeFormat('en-UK', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
  return formatter.format(date).replace(',', '');
}
