import {produce} from 'immer';

import * as actions from '@actions/approvals';

import reducer, {initialState} from './approvals';

describe('Approvals reducer', () => {
  const error = 'test';

  describe('updateComment', () => {
    const args = {timesheetId: 'test', comment: 'test'};

    it('Should properly handle pending action', () => {
      const updateCommentStatus = {...initialState.updateCommentStatus, fetching: true};

      const expectedState = produce(initialState, (draft) => {
        draft.updateCommentStatus = updateCommentStatus;
      });

      const nextState = reducer(initialState, actions.updateComment.pending);
      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle fulfilled action', () => {
      const updateCommentStatus = {...initialState.updateCommentStatus, success: true};

      const expectedState = produce(initialState, (draft) => {
        draft.updateCommentStatus = updateCommentStatus;
      });

      const nextState = reducer(
        initialState,
        actions.updateComment.fulfilled(initialState.selected.comments, '', args)
      );
      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle rejected action', () => {
      const updateCommentStatus = {...initialState.updateCommentStatus, error};

      const expectedState = produce(initialState, (draft) => {
        draft.updateCommentStatus = updateCommentStatus;
      });

      const nextState = reducer(initialState, actions.updateComment.rejected(new Error(error), '', args));
      expect(nextState).toEqual(expectedState);
    });
  });

  describe('updateStatus', () => {
    const args = {timesheetId: 'test', status: 'approved' as const};

    it('Should properly handle pending action', () => {
      const updateStatus = {...initialState.updateStatus, fetching: true};

      const expectedState = produce(initialState, (draft) => {
        draft.updateStatus = updateStatus;
      });

      const nextState = reducer(initialState, actions.updateStatus.pending);
      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle fulfilled action', () => {
      const updateStatus = {...initialState.updateStatus, success: true};

      const expectedApprovedState = produce(initialState, (draft) => {
        draft.updateStatus = updateStatus;
      });

      const nextApprovedState = reducer(
        initialState,
        actions.updateStatus.fulfilled(initialState.selected, '', args)
      );

      expect(nextApprovedState).toEqual(expectedApprovedState);
    });

    it('Should properly handle rejected action', () => {
      const updateStatus = {...initialState.updateStatus, error};

      const expectedState = produce(initialState, (draft) => {
        draft.updateStatus = updateStatus;
      });

      const nextState = reducer(initialState, actions.updateStatus.rejected(new Error(error), '', args));
      expect(nextState).toEqual(expectedState);
    });
  });

  it('Should properly handle resetUpdateStatus', () => {
    const updateStatus = initialState.updateStatus;

    const expectedState = produce(initialState, (draft) => {
      draft.updateStatus = updateStatus;
    });

    const nextState = reducer(initialState, actions.resetUpdateStatus);
    expect(nextState).toEqual(expectedState);
  });

  describe('getUnapprovedTimesheets', () => {
    const approverId = 'test';

    it('Should properly handle pending action', () => {
      const getUnapprovedTimesheetsStatus = {...initialState.getUnapprovedTimesheetsStatus, fetching: true};

      const expectedState = produce(initialState, (draft) => {
        draft.getUnapprovedTimesheetsStatus = getUnapprovedTimesheetsStatus;
      });

      const nextState = reducer(initialState, actions.getUnapprovedTimesheets.pending);
      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle fulfilled action', () => {
      const getUnapprovedTimesheetsStatus = {...initialState.getUnapprovedTimesheetsStatus, success: true};

      const expectedApprovedState = produce(initialState, (draft) => {
        draft.getUnapprovedTimesheetsStatus = getUnapprovedTimesheetsStatus;
      });

      const nextApprovedState = reducer(
        initialState,
        actions.getUnapprovedTimesheets.fulfilled(initialState.timesheets, '', approverId)
      );

      expect(nextApprovedState).toEqual(expectedApprovedState);
    });

    it('Should properly handle rejected action', () => {
      const getUnapprovedTimesheetsStatus = {...initialState.getUnapprovedTimesheetsStatus, error};

      const expectedState = produce(initialState, (draft) => {
        draft.getUnapprovedTimesheetsStatus = getUnapprovedTimesheetsStatus;
      });

      const nextState = reducer(
        initialState,
        actions.getUnapprovedTimesheets.rejected(new Error(error), '', approverId)
      );
      expect(nextState).toEqual(expectedState);
    });
  });

  describe('getApprovedTimesheets', () => {
    const args = {approvedBy: 'test', weekOf: 'test'};

    it('Should properly handle pending action', () => {
      const getApprovedTimesheetsRequest = {...initialState.getApprovedTimesheetsRequest, fetching: true};

      const expectedState = produce(initialState, (draft) => {
        draft.getApprovedTimesheetsRequest = getApprovedTimesheetsRequest;
      });

      const nextState = reducer(initialState, actions.getApprovedTimesheets.pending);

      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle fulfilled action', () => {
      const getApprovedTimesheetsRequest = {...initialState.getApprovedTimesheetsRequest, success: true};

      const expectedState = produce(initialState, (draft) => {
        draft.getApprovedTimesheetsRequest = getApprovedTimesheetsRequest;
      });

      const nextState = reducer(
        initialState,
        actions.getApprovedTimesheets.fulfilled(initialState.timesheets, '', args)
      );

      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle rejected action', () => {
      const getApprovedTimesheetsRequest = {...initialState.getApprovedTimesheetsRequest, error};

      const expectedState = produce(initialState, (draft) => {
        draft.getApprovedTimesheetsRequest = getApprovedTimesheetsRequest;
      });

      const nextState = reducer(
        initialState,
        actions.getApprovedTimesheets.rejected(new Error(error), '', args)
      );

      expect(nextState).toEqual(expectedState);
    });
  });
});
