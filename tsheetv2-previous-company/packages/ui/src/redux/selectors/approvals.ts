import {RootState} from '../store';

export const selectUpdateCommentStatus = (state: RootState) => state.approvals.updateCommentStatus;
export const selectUpdateStatus = (state: RootState) => state.approvals.updateStatus;
export const selectGetUnapprovedTimesheetsStatus = (state: RootState) =>
  state.approvals.getUnapprovedTimesheetsStatus;
export const selectTimesheets = (state: RootState) => state.approvals.timesheets;
