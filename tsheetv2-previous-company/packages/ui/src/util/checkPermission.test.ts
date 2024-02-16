import checkPermission from './checkPermission';

describe('checkPermission', () => {
  it('Should return false', () => {
    expect(checkPermission(['READ_REPORT'], ['READ_TIMESHEET', 'READ_TIMESHEET'])).toEqual(false);
  });

  it('Should return true', () => {
    expect(checkPermission(['READ_TIMESHEET'], ['READ_TIMESHEET', 'READ_TIMESHEET'])).toEqual(true);
  });
});
