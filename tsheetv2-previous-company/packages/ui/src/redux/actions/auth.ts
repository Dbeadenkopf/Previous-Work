import {toast} from 'react-toastify';

import {createAsyncThunk} from '@reduxjs/toolkit';
import apiRequest, {BaseRoute, Method} from '@util/apiRequest';

import {RootState} from '../store';

export const setUser = createAsyncThunk('auth/setUser', async (userId: string | null) => {
  const response = await apiRequest<Schemas.User>(BaseRoute.USERS, `/${userId}`, {
    method: Method.GET,
  });

  const {data, error} = response;

  if (error) {
    throw error;
  }

  return data;
});

export const login = createAsyncThunk('auth/login', async (credential: string) => {
  const response = await apiRequest<{
    user: Schemas.User;
    exp: string;
    signature: string;
  }>(BaseRoute.USERS, '/login', {
    method: Method.POST,
    body: {
      credential,
    },
  });

  const {data, error} = response;

  if (error) {
    toast.error(error.message);
    throw error;
  }

  const {signature, exp, user} = data;
  const items = {signature, exp, userId: user._id as string};
  Object.keys(items).forEach((item) => localStorage.setItem(item, items[item as keyof typeof items]));

  return user;
});

export const logout = createAsyncThunk('auth/logout', async () => {
  const response = await apiRequest<APIMessage>(BaseRoute.USERS, '/logout', {
    method: Method.POST,
  });

  const {data, error} = response;

  if (error) {
    toast.error(error.message);
    throw error;
  }

  localStorage.clear();

  return data;
});

export const updateNotificationSettings = createAsyncThunk(
  'auth/updateNotificationSettings',
  async (request: {notifications: Schemas.Notifications; email?: string; set?: boolean}, {getState}) => {
    const {notifications, email, set} = request;
    const timezone = (getState() as RootState).auth.user.timezone;

    const response = await apiRequest<Schemas.User>(BaseRoute.USERS, `/notifications`, {
      method: Method.PUT,
      body: {
        notifications,
        email,
        timezone,
      },
    });

    const {data, error} = response;

    if (error) {
      toast.error(error.message);
      throw error;
    }

    if (set) {
      toast.success(`Notification time successfully updated`);
    }

    return data;
  }
);

export const cancelNotification = createAsyncThunk('auth/cancelNotification', async (jobName: string) => {
  const response = await apiRequest<Schemas.User>(BaseRoute.JOBS, `/cancel`, {
    method: Method.PUT,
    body: {
      jobName,
    },
  });

  const {data, error} = response;

  if (error) {
    toast.error(error.message);
    throw error;
  }

  return data;
});

export const updateTimezone = createAsyncThunk(
  'auth/updateTimezone',
  async (request: {notifications: Schemas.Notifications; timezone: string}) => {
    const {notifications, timezone} = request;

    const response = await apiRequest<Schemas.User>(BaseRoute.USERS, `/timezone`, {
      method: Method.PUT,
      body: {
        notifications,
        timezone,
      },
    });

    const {data, error} = response;

    if (error) {
      toast.error(error.message);
      throw error;
    }

    return data;
  }
);
