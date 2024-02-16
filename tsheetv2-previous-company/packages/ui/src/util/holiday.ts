import moment from 'moment';

import getWeek from './getWeek';

// Add zero as padding
const pad = (d: number) => (d < 10 ? `0${d.toString()}` : d.toString());

// Returns date of the nth day of nth week from the given date
const getNthDayOfNthWeek = (date: Date, whichDay: number, whichWeek: number) => {
  const dayOfWeek = date.getDay();
  const num =
    (whichWeek - 1) * 7 + 1 + (((whichWeek - 1 === 0 ? 1 : whichWeek - 1) * 7 + whichDay - dayOfWeek) % 7);
  return `${pad(date.getMonth() + 1)}-${pad(num)}`;
};

// Returns date of the last given day from the given moment
export const getLastNthDayFromMoment = (mo: moment.Moment, day: number): string => {
  if (mo.day() === day) {
    return mo.format('MM-DD');
  }
  return getLastNthDayFromMoment(mo.subtract(1, 'day'), day);
};

// Returns the observed day if the holiday falls on a weekend
export const getObservedDay = (holiday: string, year: number): string => {
  const mo = moment(`${holiday}-${year}`, 'MM-DD-YYYY');
  switch (mo.day()) {
    case 0: {
      return mo.add(1, 'day').format('MM-DD');
    }
    case 6: {
      return mo.subtract(1, 'day').format('MM-DD');
    }
    default:
      return holiday;
  }
};

// Returns all the holidays in the month of the given date
export const getHolidaysInMonth = (date: Date): string[] => {
  const year = date.getFullYear();
  switch (date.getMonth()) {
    case 0:
      // NewYearsDay, MLKDay
      return [getObservedDay('01-01', year), getNthDayOfNthWeek(new Date(year, 0, 1), 1, 3)];
    case 1:
      // PresidentsDay
      return [getNthDayOfNthWeek(new Date(year, 1, 1), 1, 3)];
    case 4:
      // MemorialDay
      return [getLastNthDayFromMoment(moment(`${year}`).add(4, 'months').endOf('month'), 1)];
    case 5:
      // Juneteenth
      return [getObservedDay('06-19', year)];
    case 6:
      // IndependenceDay
      return [getObservedDay('07-04', year)];
    case 8:
      // LaborDay
      return [getNthDayOfNthWeek(new Date(year, 8, 1), 1, 1)];
    case 9:
      // ColumbusDay
      return [getNthDayOfNthWeek(new Date(year, 9, 1), 1, 2)];
    case 10:
      // VeteransDay, ThanksgivingDay
      return [getObservedDay('11-11', year), getNthDayOfNthWeek(new Date(year, 10, 1), 4, 4)];
    case 11:
      // ChristmasDay
      return [getObservedDay('12-25', year)];
    default:
      return [];
  }
};

// Returns all the holidays in the given week
const getHolidaysInWeek = (startDate: Date, endDate: Date): string[] => {
  const sd = startDate;
  const ed = endDate;
  const holidays =
    sd.getMonth() === ed.getMonth()
      ? getHolidaysInMonth(sd)
      : [...getHolidaysInMonth(sd), ...getHolidaysInMonth(ed)];
  const holidaysInWeek = [];
  for (let i = moment(startDate); i.isBefore(moment(endDate)); i.add(1, 'days')) {
    if (holidays.includes(i.format('MM-DD'))) {
      holidaysInWeek.push(i.toString());
    }
  }
  return holidaysInWeek;
};

export const fillHoliday = (week: string | number | Date) => {
  week = new Date(week);
  week.setDate(week.getDate() + 1);

  const startDate = getWeek(week)[0];
  const endDate = getWeek(week)[6];

  const holidays = getHolidaysInWeek(startDate, endDate);
  let holiday = '';
  holidays.map((h) => {
    holiday = h;
  });

  const dayAbbreviation = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const day = dayAbbreviation[new Date(holiday).getDay()] as keyof Schemas.Time;

  const sd = new Date(holiday);
  sd.setHours(9);
  const ed = new Date(holiday);
  ed.setHours(17);

  if (holidays.length) {
    return {day: day, sd: sd.toString(), ed: ed.toString()};
  }

  return {};
};
