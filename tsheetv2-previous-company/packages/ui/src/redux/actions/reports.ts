import {createAsyncThunk} from '@reduxjs/toolkit';
import apiRequest, {BaseRoute, Method} from '@util/apiRequest';

export interface timesheetFilters {
  weekOf?: string;
  status?: string;
  date?: string;
  dayName?: string;
}

// Other filtering will be added to this action
export const getTimesheets = createAsyncThunk('reports/getTimesheets', async (filters: timesheetFilters) => {
  const params = {
    ...(filters.weekOf && {weekOf: filters.weekOf}),
    ...(filters.status && {status: filters.status}),
    ...(filters.date && {date: filters.date}),
    ...(filters.dayName && {dayName: filters.dayName}),
  };

  const response = await apiRequest<Schemas.Timesheet[]>(BaseRoute.TIMESHEETS, '/', {
    method: Method.GET,
    queryParams: params,
  });

  const {data, error} = response;

  if (error) {
    throw error;
  }

  return data;
});
