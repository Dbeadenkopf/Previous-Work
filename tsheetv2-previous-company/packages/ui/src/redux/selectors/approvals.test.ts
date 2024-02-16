import {produce} from 'immer';

import {store} from '../store';

import * as selectors from './approvals';

describe('Approval selectors', () => {
  it('Should return the comment submission status', () => {
    const state = produce(store.getState(), (draft) => {
      draft.approvals.updateCommentStatus.error = 'test';
    });
    expect(selectors.selectUpdateCommentStatus(state)).toEqual(state.approvals.updateCommentStatus);
  });

  it('Should return approval submission status', () => {
    const state = produce(store.getState(), (draft) => {
      draft.approvals.updateStatus.error = 'test';
    });
    expect(selectors.selectUpdateStatus(state)).toEqual(state.approvals.updateStatus);
  });

  it('Should return get unapproved timesheets status', () => {
    const state = produce(store.getState(), (draft) => {
      draft.approvals.getUnapprovedTimesheetsStatus.error = 'test';
    });
    expect(selectors.selectGetUnapprovedTimesheetsStatus(state)).toEqual(
      state.approvals.getUnapprovedTimesheetsStatus
    );
  });

  it('Should return timesheet data', () => {
    const state = produce(store.getState(), (draft) => {
      draft.approvals.timesheets = [{} as Schemas.Timesheet];
    });

    expect(selectors.selectTimesheets(state)).toEqual(state.approvals.timesheets);
  });
});
