import getCurrentMonday from './getCurrentMonday';
import getWeek from './getWeek';

describe('getWeek', () => {
  it('Should return proper week data for the current week', () => {
    const currentWeek = getWeek();
    const currentMonday = new Date(getCurrentMonday());

    expect(currentWeek.length).toEqual(7);
    expect(currentWeek[0].toDateString()).toEqual(currentMonday.toDateString());
  });

  it('should return proper week data for the specified date', () => {
    const mockDate = new Date('2022-07-18T04:00:00.000Z');
    const specifiedWeek = getWeek(mockDate);

    const mockMonday = new Date('2022-07-18T04:00:00.000Z');
    const mockSunday = new Date('2022-07-24T04:00:00.000Z');

    expect(specifiedWeek.length).toEqual(7);
    expect(specifiedWeek[0]).toEqual(mockMonday);
    expect(specifiedWeek[6]).toEqual(mockSunday);
  });
});
