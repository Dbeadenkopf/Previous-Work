const FRIENDLY_DATE_FORMAT: Intl.DateTimeFormatOptions = {
  month: '2-digit',
  day: '2-digit',
  year: 'numeric',
  timeZone: 'UTC',
};

export const offsetDate = (s: string, offsetDays: number) => {
  const d = new Date(s);
  d.setTime(d.getTime() + 86400000 * offsetDays);
  return d.toLocaleDateString([], FRIENDLY_DATE_FORMAT);
};

const formatDate = (s: string | Date) => new Date(s).toLocaleDateString([], FRIENDLY_DATE_FORMAT);

export default formatDate;
