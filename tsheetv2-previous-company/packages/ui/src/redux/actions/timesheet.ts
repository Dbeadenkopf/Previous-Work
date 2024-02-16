import {toast} from 'react-toastify';

import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import apiRequest, {BaseRoute, Method} from '@util/apiRequest';
import filterSlots from '@util/filterSlots';
import sortSlots from '@util/sortSlots';

import {RootState} from '../store';

export const updateTime = createAction<{
  dateAndTime: string;
  dayOfWeek: keyof Schemas.Time;
  whichTime: 'start' | 'end';
  slotNumber: number;
}>('timesheet/updateTime');

export const updateNote = createAction<{
  dayOfWeek: keyof Schemas.Time;
  note: string;
}>('timesheet/updateNote');

export const getTimesheet = createAsyncThunk(
  'timesheet/getTimesheet',
  async ({createdBy, weekOf}: {createdBy: string; weekOf: string}) => {
    const response = await apiRequest<Schemas.Timesheet[]>(BaseRoute.TIMESHEETS, `/`, {
      method: Method.GET,
      queryParams: {
        createdBy,
        weekOf,
      },
    });

    const {data, error} = response;

    if (error) {
      throw error;
    }

    if (!data.length) {
      throw 'Timesheet not found';
    }

    return data[0];
  }
);

export const getTimesheetById = createAsyncThunk(
  'timesheet/getTimesheetById',
  async (timesheetId: string) => {
    const response = await apiRequest<Schemas.Timesheet>(BaseRoute.TIMESHEETS, `/${timesheetId}`, {
      method: Method.GET,
    });

    const {data, error} = response;

    if (error) {
      throw error;
    }

    return data;
  }
);

export const addSlot = createAction<{
  dayOfWeek: keyof Schemas.Time;
}>('timesheet/addSlot');

export const removeSlot = createAction<{
  dayOfWeek: keyof Schemas.Time;
}>('timesheet/removeSlot');

export const saveTimesheet = createAsyncThunk<Schemas.Timesheet, boolean, {state: RootState}>(
  'timesheet/saveTimesheet',
  async (showToast, {getState}) => {
    let timesheet = getState().timesheet.selected;
    const {time} = sortSlots(timesheet);
    timesheet = filterSlots({...timesheet, time});

    const response = await apiRequest<Schemas.Timesheet>(BaseRoute.TIMESHEETS, '', {
      method: Method.PUT,
      body: {timesheet},
    });

    const {data, error} = response;

    if (error) {
      toast.error(error.message);
      throw error;
    }

    if (showToast) {
      toast.success('Successfully saved timesheet');
    }

    return {...data, time};
  }
);

export const resubmitTimesheet = createAsyncThunk(
  'timesheet/resubmitTimesheet',
  async (request: {timesheetId: string}) => {
    const {timesheetId} = request;

    const response = await apiRequest<Schemas.Timesheet>(BaseRoute.TIMESHEETS, `/${timesheetId}/submitted`, {
      method: Method.PUT,
    });

    const {data, error} = response;

    if (error) {
      const {message} = error;
      toast.error(message);
      throw error;
    }

    toast.success(`Timesheet resubmitted`);
    return data;
  }
);

export const setProject = createAction<{
  project: Schemas.SelectedProject;
  dayOfWeek: keyof Schemas.Time;
  slotNumber: number;
}>('timesheet/setProject');

export const setSubProject = createAction<{
  subProject: Schemas.SelectedProject;
  dayOfWeek: keyof Schemas.Time;
  slotNumber: number;
}>('timesheet/setSubProject');

export const submitDay = createAsyncThunk<Schemas.Timesheet, {day: keyof Schemas.Time}, {state: RootState}>(
  'timesheet/submitDay',
  async ({day}, {getState}) => {
    const id = getState().timesheet.selected._id;
    const response = await apiRequest<Schemas.Timesheet>(
      BaseRoute.TIMESHEETS,
      `/${id}/time/${day}/submitted`,
      {
        method: Method.PUT,
      }
    );

    const {data, error} = response;

    if (error) {
      toast.error(error.message);
      throw error;
    }

    toast.success(`Successfully submitted daily timesheet`);
    return data;
  }
);

export const getTickets = createAsyncThunk('timesheet/getTickets', async (project: string) => {
  const res = await apiRequest<{tickets: string[]}>(BaseRoute.TICKETS, `/`, {
    method: Method.GET,
    queryParams: {
      projectLabel: project,
    },
  });
  const {data, error} = res;

  if (error) {
    throw error;
  }

  return data.tickets;
});

export const setTicket = createAction<{
  ticket: string;
  dayOfWeek: keyof Schemas.Time;
  slotNumber: number;
}>('timesheet/setTicket');

export const setManualTicketInput = createAction<{
  manualTicketInput: string;
  dayOfWeek: keyof Schemas.Time;
  slotNumber: number;
}>('timesheet/setManualTicketInput');

export const clearTimesheet = createAction('timesheet/clearTimesheet');

export const getRejectedTimesheets = createAsyncThunk(
  'timesheet/getRejectedTimesheets',
  async ({createdBy}: {createdBy: string}) => {
    const response = await apiRequest<Schemas.Timesheet[]>(BaseRoute.TIMESHEETS, `/`, {
      method: Method.GET,
      queryParams: {
        createdBy: createdBy,
        status: 'rejected',
      },
    });

    const {data, error} = response;

    if (error) {
      throw error;
    }

    return data;
  }
);
