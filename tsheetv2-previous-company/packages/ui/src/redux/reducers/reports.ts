import * as actions from '@actions/reports';
import {createReducer} from '@reduxjs/toolkit';
import handleError from '@util/handleError';

interface State {
  timesheets: Schemas.Timesheet[];
  getTimesheetsRequest: RequestStatus;
}

export const initialState: State = {
  timesheets: [],
  getTimesheetsRequest: {
    error: '',
    fetching: false,
    success: false,
  },
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.getTimesheets.pending, (state) => {
      state.getTimesheetsRequest = {...initialState.getTimesheetsRequest, fetching: true};
    })
    .addCase(actions.getTimesheets.fulfilled, (state, action) => {
      state.getTimesheetsRequest = {...initialState.getTimesheetsRequest, success: true};
      state.timesheets = action.payload;
    })
    .addCase(actions.getTimesheets.rejected, (state, action) => {
      state.getTimesheetsRequest = {
        ...initialState.getTimesheetsRequest,
        error: handleError(action.error.message),
      };
    });
});

export default reducer;
