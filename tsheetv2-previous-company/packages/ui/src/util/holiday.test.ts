import moment from 'moment';

import {fillHoliday, getHolidaysInMonth, getLastNthDayFromMoment, getObservedDay} from '@util/holiday';

describe('Holiday Util', () => {
  describe('getLastNthDayFromMoment()', () => {
    it('should return the last day', () => {
      const mo = moment('05-31-2021', 'MM-DD-YYYY');
      expect(getLastNthDayFromMoment(mo, 1)).toEqual('05-31');
    });

    it('should recurse', () => {
      const mo = moment('05-31-2020', 'MM-DD-YYYY');
      expect(getLastNthDayFromMoment(mo, 1)).toEqual('05-25');
    });
  });

  describe('getObservedDay()', () => {
    it('should return monday date', () => {
      expect(getObservedDay('12-19', 2021)).toEqual('12-20');
    });

    it('should return friday date', () => {
      expect(getObservedDay('12-18', 2021)).toEqual('12-17');
    });

    it('should return the same date', () => {
      expect(getObservedDay('12-20', 2021)).toEqual('12-20');
    });
  });

  describe('getHolidaysInMonth()', () => {
    it('should return January holidays', () => {
      expect(getHolidaysInMonth(new Date(2021, 0))).toEqual(['01-01', '01-18']);
    });

    it('should return February holidays', () => {
      expect(getHolidaysInMonth(new Date(2021, 1))).toEqual(['02-15']);
    });

    it('should return May holidays', () => {
      expect(getHolidaysInMonth(new Date(2021, 4))).toEqual(['05-31']);
    });

    it('should return June holidays', () => {
      expect(getHolidaysInMonth(new Date(2021, 5))).toEqual(['06-18']);
    });

    it('should return July holidays', () => {
      expect(getHolidaysInMonth(new Date(2021, 6))).toEqual(['07-05']);
    });

    it('should return September holidays', () => {
      expect(getHolidaysInMonth(new Date(2021, 8))).toEqual(['09-06']);
    });

    it('should return October holidays', () => {
      expect(getHolidaysInMonth(new Date(2021, 9))).toEqual(['10-11']);
    });

    it('should return November holidays', () => {
      expect(getHolidaysInMonth(new Date(2021, 10))).toEqual(['11-11', '11-25']);
    });

    it('should return December holidays', () => {
      expect(getHolidaysInMonth(new Date(2021, 11))).toEqual(['12-24']);
    });

    it('should return no holidays', () => {
      expect(getHolidaysInMonth(new Date(2021, 2))).toEqual([]);
    });
  });

  describe('fillHoliday()', () => {
    it('should return false', () => {
      const date = new Date('12/1/2022');
      expect(fillHoliday(date)).toEqual({});
    });

    it('should return true', () => {
      expect(fillHoliday(new Date('11/24/2022'))).toEqual({
        day: 'thu',
        sd: new Date('Thu Nov 24 2022 09:00:00').toString(),
        ed: new Date('Thu Nov 24 2022 17:00:00').toString(),
      });
    });
  });
});
