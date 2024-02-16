import * as actions from '@actions/auth';
import {createReducer} from '@reduxjs/toolkit';
import handleError from '@util/handleError';

interface State {
  loginStatus: RequestStatus;
  logoutStatus: RequestStatus;
  setUserRequest: RequestStatus;
  user: Schemas.User;
  editNotificationsRequest: RequestStatus;
  updateTimezoneRequest: RequestStatus;
}

export const initialState: State = {
  loginStatus: {
    error: '',
    fetching: false,
    success: false,
  },
  logoutStatus: {
    error: '',
    fetching: false,
    success: false,
  },
  setUserRequest: {
    error: '',
    fetching: false,
    success: false,
  },
  editNotificationsRequest: {
    error: '',
    fetching: false,
    success: false,
  },
  updateTimezoneRequest: {
    error: '',
    fetching: false,
    success: false,
  },
  user: {
    approver: {} as Schemas.User,
    created: {
      date: '',
      ip: '',
      user: {} as Schemas.User,
    },
    email: '',
    slackId: '',
    firstName: '',
    lastName: '',
    roles: [],
    title: '',
    supervisor: {} as Schemas.User,
    notifications: {} as Schemas.Notifications,
  },
};

const reducer = createReducer(initialState, (builder) => {
  builder

    // setUser
    .addCase(actions.setUser.pending, (state) => {
      state.setUserRequest = {...initialState.setUserRequest, fetching: true};
    })
    .addCase(actions.setUser.fulfilled, (state, action) => {
      state.setUserRequest = {...initialState.setUserRequest, success: true};
      state.user = action.payload;
    })
    .addCase(actions.setUser.rejected, (state, action) => {
      state.setUserRequest = {
        ...initialState.setUserRequest,
        error: handleError(action.error.message),
      };
    })

    // prod login
    .addCase(actions.login.pending, (state) => {
      state.loginStatus = {...initialState.loginStatus, fetching: true};
    })
    .addCase(actions.login.fulfilled, (state, action) => {
      state.loginStatus = {...initialState.loginStatus, success: true};
      state.user = action.payload;
    })
    .addCase(actions.login.rejected, (state, action) => {
      state.loginStatus = {...initialState.loginStatus, error: handleError(action.error.message)};
    })

    // logout
    .addCase(actions.logout.pending, (state) => {
      state.logoutStatus = {...initialState.logoutStatus, fetching: true};
    })
    .addCase(actions.logout.fulfilled, (state) => {
      state.logoutStatus = {...initialState.logoutStatus, success: true};
      state.user = initialState.user;
    })
    .addCase(actions.logout.rejected, (state, action) => {
      state.logoutStatus = {...initialState.logoutStatus, error: handleError(action.error.message)};
    })

    // notification
    .addCase(actions.updateNotificationSettings.pending, (state) => {
      state.editNotificationsRequest = {...initialState.editNotificationsRequest, fetching: true};
    })
    .addCase(actions.updateNotificationSettings.fulfilled, (state, action) => {
      state.editNotificationsRequest = {...initialState.editNotificationsRequest, success: true};
      state.user = action.payload;
    })
    .addCase(actions.updateNotificationSettings.rejected, (state, action) => {
      state.editNotificationsRequest = {
        ...initialState.editNotificationsRequest,
        error: handleError(action.error.message),
      };
    })

    // updateTimezone
    .addCase(actions.updateTimezone.pending, (state) => {
      state.updateTimezoneRequest = {...initialState.updateTimezoneRequest, fetching: true};
    })
    .addCase(actions.updateTimezone.fulfilled, (state, action) => {
      state.updateTimezoneRequest = {...initialState.updateTimezoneRequest, success: true};
      state.user = action.payload;
    })
    .addCase(actions.updateTimezone.rejected, (state, action) => {
      state.updateTimezoneRequest = {
        ...initialState.updateTimezoneRequest,
        error: handleError(action.error.message),
      };
    });
});

export default reducer;
