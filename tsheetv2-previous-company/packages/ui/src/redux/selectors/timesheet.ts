import {RootState} from '../store';

export const selectTime = (state: RootState) => state.timesheet.selected.time;
export const selectTickets = (state: RootState) => state.timesheet.tickets;
export const selectSelected = (state: RootState) => state.timesheet.selected;
export const selectGetTimesheetRequest = (state: RootState) => state.timesheet.getTimesheetRequest;
export const selectSaveTimesheetRequest = (state: RootState) => state.timesheet.saveTimesheetRequest;
export const selectGetTicketsRequest = (state: RootState) => state.timesheet.getTicketsRequest;
export const selectResubmitTimesheetRequest = (state: RootState) => state.timesheet.resubmitTimesheetRequest;
export const selectTimesheets = (state: RootState) => state.timesheet.rejectedTimesheets;
export const selectGetRejectedTimesheetsRequest = (state: RootState) =>
  state.timesheet.getRejectedTimesheetsRequest;
export const selectTimeslotProject = (state: RootState) => state.timesheet.timeslotProject;
