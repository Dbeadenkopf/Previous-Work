const FRIENDLY_DATE_FORMAT: Intl.DateTimeFormatOptions = {
  month: '2-digit',
  day: '2-digit',
  year: 'numeric',
};

export const offsetDate = (date: string | Date, offsetDays: number) => {
  const d = new Date(date);
  d.setTime(d.getTime() + 86400000 * offsetDays);
  return d.toLocaleDateString([], FRIENDLY_DATE_FORMAT);
};

const formatDate = (date: string | Date) => new Date(date).toLocaleDateString([], FRIENDLY_DATE_FORMAT);

export default formatDate;
