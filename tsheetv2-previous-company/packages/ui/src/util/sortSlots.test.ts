import produce from 'immer';

import {initialState} from '../redux/reducers/timesheet';

import sortSlots from './sortSlots';

describe('sortSlots', () => {
  it('Should reorder slots', () => {
    const startDate0 = new Date('2022-07-29T17:00:00.285Z').toISOString();
    const endDate0 = new Date('2022-07-29T20:00:00.380Z').toISOString();

    const startDate1 = new Date('2022-07-30T00:00:00.134Z').toISOString();
    const endDate1 = new Date('2022-07-30T01:00:00.051Z').toISOString();

    const startDate2 = new Date('2022-07-29T14:00:00.885Z').toISOString();
    const endDate2 = new Date('2022-07-29T16:00:00.781Z').toISOString();

    const timesheet = produce(initialState.selected, (draft) => {
      draft.time.fri.hours[0] = {...draft.time.fri.hours[0], start: startDate0, end: endDate0};
      draft.time.fri.hours[1] = {...draft.time.fri.hours[0], start: startDate1, end: endDate1};
      draft.time.fri.hours[2] = {...draft.time.fri.hours[0], start: startDate2, end: endDate2};
    });

    const friday = {
      hours: [
        {
          end: '2022-07-29T16:00:00.781Z',
          project: {
            label: '',
          },
          start: '2022-07-29T14:00:00.885Z',
          ticket: '',
        },
        {
          end: '2022-07-29T20:00:00.380Z',
          project: {
            label: '',
          },
          start: '2022-07-29T17:00:00.285Z',
          ticket: '',
        },
        {
          end: '2022-07-30T01:00:00.051Z',
          project: {
            label: '',
          },
          start: '2022-07-30T00:00:00.134Z',
          ticket: '',
        },
      ],
    };

    const emptyDay = {hours: [{end: '', project: {label: ''}, start: '', ticket: ''}]};

    const filtered = produce(timesheet, (draft) => {
      draft.time = {
        ...draft.time,
        fri: friday,
        mon: emptyDay,
        sat: emptyDay,
        sun: emptyDay,
        thu: emptyDay,
        tue: emptyDay,
        wed: emptyDay,
      };
    });

    expect(sortSlots(timesheet)).toEqual(filtered);
  });
});
