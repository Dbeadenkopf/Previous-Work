import {RootState} from '../store';

export const selectTimesheets = (state: RootState) => state.reports.timesheets;
