import {produce} from 'immer';

import * as actions from '@actions/reports';

import reducer, {initialState} from './reports';

describe('Reports reducer', () => {
  const error = 'error';
  describe('getTimesheets with filtering', () => {
    const args = {
      weekOf: 'test',
      status: 'test',
    };

    it('Should properly handle pending action', () => {
      const getTimesheetsRequest = {...initialState.getTimesheetsRequest, fetching: true};

      const expectedState = produce(initialState, (draft) => {
        draft.getTimesheetsRequest = getTimesheetsRequest;
      });

      const nextState = reducer(initialState, actions.getTimesheets.pending);
      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle fulfilled action', () => {
      const getTimesheetsRequest = {...initialState.getTimesheetsRequest, success: true};

      const expectedState = produce(initialState, (draft) => {
        draft.getTimesheetsRequest = getTimesheetsRequest;
      });

      const nextState = reducer(
        initialState,
        actions.getTimesheets.fulfilled(initialState.timesheets, '', args)
      );
      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle rejected action', () => {
      const getAllTimesheetsRequest = {...initialState.getTimesheetsRequest, error};

      const nextState = reducer(initialState, actions.getTimesheets.rejected(new Error(error), '', args));

      const expectedState = produce(initialState, (draft) => {
        draft.getTimesheetsRequest = getAllTimesheetsRequest;
      });

      expect(nextState).toEqual(expectedState);
    });
  });
});
