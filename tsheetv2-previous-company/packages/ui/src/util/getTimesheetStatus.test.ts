import getTimesheetStatus from './getTimesheetStatus';

describe('getTimesheetStatus ', () => {
  const submittedDate = '2022-10-10T00:00:00.000Z';
  const rejectedDate = '2022-10-17T00:00:00.000Z';
  const submitted = {submitted: {}} as Schemas.Timesheet;
  const approved = {approved: {}, submitted: {}} as Schemas.Timesheet;
  const rejected = {
    rejected: {date: rejectedDate},
    submitted: {date: submittedDate},
  } as Schemas.Timesheet;

  it('Should return unsubmitted', () => {
    expect(getTimesheetStatus({} as Schemas.Timesheet)).toEqual('Unsubmitted');
  });

  it('Should return submitted', () => {
    expect(getTimesheetStatus(submitted)).toEqual('Submitted');
  });

  it('Should return approved', () => {
    expect(getTimesheetStatus(approved)).toEqual('Approved');
  });

  it('Should return rejected with rejected is greater than submitted time', () => {
    expect(getTimesheetStatus(rejected)).toEqual('Rejected');
  });
});
