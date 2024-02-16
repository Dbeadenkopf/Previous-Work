const FRIENDLY_TIME_FORMAT: Intl.DateTimeFormatOptions = {
  hour: '2-digit',
  minute: '2-digit',
};

const formatTime = (date: Date | string) => new Date(date).toLocaleTimeString([], FRIENDLY_TIME_FORMAT);

export default formatTime;
