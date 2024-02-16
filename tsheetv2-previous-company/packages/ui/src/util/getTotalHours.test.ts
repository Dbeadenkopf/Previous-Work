import formatMs from './formatMs';
import {getTotalWeekHours} from './getTotalHours';

describe('getTotalWeekHours', () => {
  const date = new Date();

  const startDate = new Date(date);
  startDate.setHours(10);

  const endDate = new Date(date);
  endDate.setHours(15);

  const time: Schemas.Time = {
    mon: {
      hours: [
        {
          start: startDate.toString(),
          end: endDate.toString(),
          project: {
            label: 'ISP',
            subProject: {
              label: 'CDX',
            },
          },
          ticket: 'ISPC-1000',
        },
      ],
    },
    tue: {
      hours: [
        {
          start: startDate.toString(),
          end: endDate.toString(),
          project: {
            label: 'ISP',
            subProject: {
              label: 'CDX',
            },
          },
          ticket: 'ISPC-1000',
        },
      ],
    },
    wed: {
      hours: [],
    },
    thu: {
      hours: [],
    },
    fri: {
      hours: [],
    },
    sat: {
      hours: [],
    },
    sun: {
      hours: [],
    },
  };

  it('Should return the total hours worked in a week', () => {
    expect(formatMs(getTotalWeekHours(time))).toEqual('10:00');
  });
});
