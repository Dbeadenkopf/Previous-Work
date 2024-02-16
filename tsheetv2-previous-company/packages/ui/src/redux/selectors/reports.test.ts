import {produce} from 'immer';

import {store} from '../store';

import * as selectors from './reports';

it('Should return timesheets with requested filtering', () => {
  const state = produce(store.getState(), (draft) => {
    draft.reports.timesheets = [{} as Schemas.Timesheet];
  });
  expect(selectors.selectTimesheets(state)).toEqual(state.reports.timesheets);
});
