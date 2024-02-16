import {configureStore} from '@reduxjs/toolkit';

import approvals from './reducers/approvals';
import auth from './reducers/auth';
import framework from './reducers/framework';
import reports from './reducers/reports';
import timesheet from './reducers/timesheet';

export const store = configureStore({
  reducer: {
    timesheet,
    approvals,
    framework,
    auth,
    reports,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
