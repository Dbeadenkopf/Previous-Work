import getTimeDiff from './getTimeDiff';

describe('getTimeDiff', () => {
  const date = new Date();
  const startTimeDate = new Date(date);
  const endTimeDate = new Date(date);

  it('Should return the difference between given start and end times (end - start) in positive milliseconds', () => {
    startTimeDate.setHours(10);
    endTimeDate.setHours(15);

    expect(getTimeDiff(startTimeDate, endTimeDate)).toEqual(18000000);
  });

  it('Should return the difference between given start and end times (end - start) in negative milliseconds', () => {
    startTimeDate.setHours(15);
    endTimeDate.setHours(10);

    expect(getTimeDiff(startTimeDate, endTimeDate)).toEqual(-18000000);
  });

  it('Should return 0 for invalid params', () => {
    expect(getTimeDiff(startTimeDate, new Date('invalid'))).toEqual(0);
  });
});
