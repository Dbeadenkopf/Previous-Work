import {toast} from 'react-toastify';

import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import apiRequest, {BaseRoute, Method} from '@util/apiRequest';
import getTimeDiff from '@util/getTimeDiff';

export const updateComment = createAsyncThunk(
  'approvals/updateComment',
  async (request: {timesheetId: string; comment: string}) => {
    const {timesheetId, comment} = request;

    const response = await apiRequest<Schemas.Timesheet>(BaseRoute.TIMESHEETS, `/${timesheetId}/comments`, {
      method: Method.PUT,
      body: {
        comment,
      },
    });

    const {data, error} = response;

    if (error) {
      const {message} = error;
      toast.error(message);
      throw error;
    }

    toast.success('Successfully added new comment');
    return data.comments;
  }
);

export const updateStatus = createAsyncThunk(
  'approvals/updateStatus',
  async (request: {timesheetId: string; status: 'approved' | 'rejected'}) => {
    const {timesheetId, status} = request;

    const response = await apiRequest<Schemas.Timesheet>(BaseRoute.TIMESHEETS, `/${timesheetId}/${status}`, {
      method: Method.PUT,
    });

    const {data, error} = response;

    if (error) {
      const {message} = error;
      toast.error(message);
      throw error;
    }

    toast.success(`Timesheet ${status}`);
    return data;
  }
);

export const getUnapprovedTimesheets = createAsyncThunk(
  'approvals/getUnapprovedTimesheets',
  async (approverId: string) => {
    const response = await apiRequest<Schemas.Timesheet[]>(BaseRoute.TIMESHEETS, '/', {
      method: Method.GET,
      queryParams: {
        status: 'submitted',
      },
    });

    const {data, error} = response;

    if (error) {
      throw error;
    }

    return data.filter(
      (t) =>
        // If a timesheet is not approved within 2 days of submission,
        // the next reviewer in the hierarchy can also approve/reject the timesheet
        (getTimeDiff(t.submitted?.date as string, new Date()) / (1000 * 60 * 60 * 24) > 2 &&
          t.created.user.approver.approver._id === approverId) ||
        t.created.user.approver._id === approverId ||
        t.rejected?.user._id === approverId
    );
  }
);

export const getApprovedTimesheets = createAsyncThunk(
  'approvals/getApprovedTimesheets',
  async ({approvedBy, weekOf}: {approvedBy: string; weekOf: string}) => {
    const response = await apiRequest<Schemas.Timesheet[]>(BaseRoute.TIMESHEETS, `/`, {
      method: Method.GET,
      queryParams: {
        approvedBy,
        weekOf,
      },
    });

    const {data, error} = response;

    if (error) {
      throw error;
    }

    return data;
  }
);

export const resetUpdateStatus = createAction('approvals/resetUpdateStatus');
