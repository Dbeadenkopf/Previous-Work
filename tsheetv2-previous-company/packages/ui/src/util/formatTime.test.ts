import formatTime from './formatTime';

const UTC_TZ: Intl.DateTimeFormatOptions = {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'UTC',
};

describe('formatTime', () => {
  const exTime = '2022-06-10T21:00:00Z';
  it('Should return formatted time from date or string type', () => {
    expect(formatTime(new Date(exTime).toLocaleDateString([], UTC_TZ))).toEqual('09:00 PM');
  });
});
