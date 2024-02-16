import produce from 'immer';

import {initialState} from '../redux/reducers/timesheet';

import filterSlots from './filterSlots';

describe('filterSlots', () => {
  it('Should filter out empty slots', () => {
    const date = new Date().toISOString();
    const timesheet = produce(initialState.selected, (draft) => {
      draft.time.fri.hours[0] = {...draft.time.fri.hours[0], start: date, end: date};
    });

    const emptyDay = {hours: []};
    const filtered = produce(timesheet, (draft) => {
      draft.time = {
        ...draft.time,
        mon: emptyDay,
        sat: emptyDay,
        sun: emptyDay,
        thu: emptyDay,
        tue: emptyDay,
        wed: emptyDay,
      };
    });

    expect(filterSlots(timesheet)).toEqual(filtered);
  });

  it('Should filter out slots for a given project', () => {
    const date = new Date().toISOString();
    const timesheet = produce(initialState.selected, (draft) => {
      draft.time.fri.hours[0] = {
        ...draft.time.fri.hours[0],
        start: date,
        end: date,
        project: {label: 'Break'},
      };
    });

    const emptyDay = {hours: []};
    const filtered = produce(timesheet, (draft) => {
      draft.time = {
        ...draft.time,
        fri: emptyDay,
      };
    });

    expect(filterSlots(timesheet, ['Break'])).toEqual(filtered);
  });
});
