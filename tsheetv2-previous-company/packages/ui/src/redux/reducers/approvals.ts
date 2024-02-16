import * as actions from '@actions/approvals';
import {createReducer} from '@reduxjs/toolkit';
import handleError from '@util/handleError';

import {initialState as timesheetState} from './timesheet';

const {selected} = timesheetState;

interface State {
  selected: Schemas.Timesheet;
  timesheets: Schemas.Timesheet[];
  updateCommentStatus: RequestStatus;
  updateStatus: RequestStatus;
  getUnapprovedTimesheetsStatus: RequestStatus;
  getApprovedTimesheetsRequest: RequestStatus;
}

export const initialState: State = {
  updateCommentStatus: {
    error: '',
    fetching: false,
    success: false,
  },
  updateStatus: {
    error: '',
    fetching: false,
    success: false,
  },
  getUnapprovedTimesheetsStatus: {
    error: '',
    fetching: false,
    success: false,
  },
  getApprovedTimesheetsRequest: {
    error: '',
    fetching: false,
    success: false,
  },
  selected,
  timesheets: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.updateComment.pending, (state) => {
      state.updateCommentStatus = {...initialState.updateCommentStatus, fetching: true};
    })
    .addCase(actions.updateComment.fulfilled, (state, action) => {
      state.updateCommentStatus = {...initialState.updateCommentStatus, success: true};
      state.selected.comments = action.payload;
    })
    .addCase(actions.updateComment.rejected, (state, action) => {
      state.updateCommentStatus = {
        ...initialState.updateCommentStatus,
        error: handleError(action.error.message),
      };
    })
    .addCase(actions.updateStatus.pending, (state) => {
      state.updateStatus = {...initialState.updateStatus, fetching: true};
    })
    .addCase(actions.updateStatus.fulfilled, (state, action) => {
      state.updateStatus = {...initialState.updateStatus, success: true};
      state.selected = action.payload;
    })
    .addCase(actions.updateStatus.rejected, (state, action) => {
      state.updateStatus = {
        ...initialState.updateStatus,
        error: handleError(action.error.message),
      };
    })
    .addCase(actions.resetUpdateStatus, (state) => {
      state.updateStatus = initialState.updateStatus;
    })
    .addCase(actions.getUnapprovedTimesheets.pending, (state) => {
      state.getUnapprovedTimesheetsStatus = {...initialState.getUnapprovedTimesheetsStatus, fetching: true};
    })
    .addCase(actions.getUnapprovedTimesheets.fulfilled, (state, action) => {
      state.getUnapprovedTimesheetsStatus = {...initialState.getUnapprovedTimesheetsStatus, success: true};
      state.timesheets = action.payload;
    })
    .addCase(actions.getUnapprovedTimesheets.rejected, (state, action) => {
      state.getUnapprovedTimesheetsStatus = {
        ...initialState.getUnapprovedTimesheetsStatus,
        error: handleError(action.error.message),
      };
    })
    .addCase(actions.getApprovedTimesheets.pending, (state) => {
      state.getApprovedTimesheetsRequest = {...initialState.getApprovedTimesheetsRequest, fetching: true};
    })
    .addCase(actions.getApprovedTimesheets.fulfilled, (state, action) => {
      state.getApprovedTimesheetsRequest = {...initialState.getApprovedTimesheetsRequest, success: true};
      state.timesheets = action.payload;
    })
    .addCase(actions.getApprovedTimesheets.rejected, (state, action) => {
      state.getApprovedTimesheetsRequest = {
        ...initialState.getApprovedTimesheetsRequest,
        error: handleError(action.error.message),
      };
    });
});

export default reducer;
