import {produce} from 'immer';

import * as actions from '@actions/auth';

import reducer, {initialState} from './auth';

describe('Auth reducer', () => {
  const error = 'test';

  describe('setUser', () => {
    it('Should properly handle pending action', () => {
      const setUserRequest = {...initialState.setUserRequest, fetching: true};

      const expectedState = produce(initialState, (draft) => {
        draft.setUserRequest = setUserRequest;
      });

      const nextState = reducer(initialState, actions.setUser.pending);
      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle fulfilled action', () => {
      const setUserRequest = {...initialState.setUserRequest, success: true};

      const expectedStae = produce(initialState, (draft) => {
        draft.setUserRequest = setUserRequest;
      });

      const nextState = reducer(initialState, actions.setUser.fulfilled(initialState.user, '', ''));
      expect(nextState).toEqual(expectedStae);
    });
    it('Should properly handle rejected action', () => {
      const setUserRequest = {...initialState.setUserRequest, error};

      const expectedState = produce(initialState, (draft) => {
        draft.setUserRequest = setUserRequest;
      });

      const nextState = reducer(initialState, actions.setUser.rejected(new Error(error), '', ''));
      expect(nextState).toEqual(expectedState);
    });
  });

  // login
  describe('login', () => {
    it('Should properly handle login pending action', () => {
      const loginStatus = {...initialState.loginStatus, fetching: true};

      const expectedState = produce(initialState, (draft) => {
        draft.loginStatus = loginStatus;
      });

      const nextState = reducer(initialState, actions.login.pending);
      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle login fulfilled action', () => {
      const loginStatus = {...initialState.loginStatus, success: true};

      const user = {_id: 'test', email: 'test@t1cg.com'} as Schemas.User;

      const args = 'test@t1cg.com';

      const expectedState = produce(initialState, (draft) => {
        draft.loginStatus = loginStatus;
        draft.user = user;
      });

      const nextState = reducer(initialState, actions.login.fulfilled(user, '', args));
      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle login rejected action', () => {
      const loginStatus = {...initialState.loginStatus, error};

      const expectedState = produce(initialState, (draft) => {
        draft.loginStatus = loginStatus;
      });

      const nextState = reducer(initialState, actions.login.rejected(new Error(error), '', ''));
      expect(nextState).toEqual(expectedState);
    });
  });

  // logout
  describe('logout', () => {
    it('Should properly handle logout pending action', () => {
      const logoutStatus = {...initialState.logoutStatus, fetching: true};

      const expectedState = produce(initialState, (draft) => {
        draft.logoutStatus = logoutStatus;
      });

      const nextState = reducer(initialState, actions.logout.pending);
      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle logout fulfilled action', () => {
      const logoutStatus = {...initialState.logoutStatus, success: true};

      const expectedState = produce(initialState, (draft) => {
        draft.logoutStatus = logoutStatus;
        draft.user = initialState.user;
      });

      const nextState = reducer(initialState, actions.logout.fulfilled);
      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle logout rejected action', () => {
      const logoutStatus = {...initialState.logoutStatus, error};

      const expectedState = produce(initialState, (draft) => {
        draft.logoutStatus = logoutStatus;
      });

      const nextState = reducer(initialState, actions.logout.rejected(new Error(error), ''));
      expect(nextState).toEqual(expectedState);
    });
  });
  describe('updateNotificationSettings', () => {
    const notificationsActionsParam = {
      notifications: {
        email: {
          submission: {
            on: false,
            time: {
              hour: '10',
              minute: '30',
              period: 'AM',
            },
          },
          approval: false,
          rejection: false,
          comment: false,
          approvalReminder: false,
          resubmission: false,
        },
        slack: {
          submission: {
            on: false,
            time: {
              hour: '10',
              minute: '30',
              period: 'AM',
            },
          },
          approval: false,
          rejection: false,
          comment: false,
          approvalReminder: false,
          resubmission: false,
        },
      },
      email: 'fakeEmail@fakeEmail.com',
    };

    it('Should properly handle pending action', () => {
      const editNotificationsRequest = {...initialState.editNotificationsRequest, fetching: true};

      const expectedState = produce(initialState, (draft) => {
        draft.editNotificationsRequest = editNotificationsRequest;
      });

      const nextState = reducer(initialState, actions.updateNotificationSettings.pending);
      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle fulfilled action', () => {
      const selectedEmployee = {} as Schemas.User;

      const editNotificationsRequest = {...initialState.editNotificationsRequest, success: true};

      const expectedState = produce(initialState, (draft) => {
        draft.editNotificationsRequest = editNotificationsRequest;
        draft.user = selectedEmployee;
      });

      const nextState = reducer(
        initialState,
        actions.updateNotificationSettings.fulfilled(selectedEmployee, '', notificationsActionsParam)
      );
      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle rejected action', () => {
      const editNotificationsRequest = {...initialState.editNotificationsRequest, error};

      const expectedState = produce(initialState, (draft) => {
        draft.editNotificationsRequest = editNotificationsRequest;
      });

      const nextState = reducer(
        initialState,
        actions.updateNotificationSettings.rejected(new Error(error), '', notificationsActionsParam)
      );
      expect(nextState).toEqual(expectedState);
    });
  });
  describe('updateTimezone', () => {
    const timezoneArg = 'example time zone';
    const updateTimezoneArg = {
      email: {
        submission: {
          on: false,
          time: {
            hour: '10',
            minute: '30',
            period: 'AM',
          },
        },
        approval: false,
        rejection: false,
        comment: false,
        approvalReminder: false,
        resubmission: false,
      },
      slack: {
        submission: {
          on: false,
          time: {
            hour: '10',
            minute: '30',
            period: 'AM',
          },
        },
        approval: false,
        rejection: false,
        comment: false,
        approvalReminder: false,
        resubmission: false,
      },
    };

    const args = {notifications: updateTimezoneArg, timezone: timezoneArg};

    const selectedEmployee = {} as Schemas.User;

    it('Should properly handle pending action', () => {
      const updateTimezoneRequest = {...initialState.updateTimezoneRequest, fetching: true};

      const expectedState = produce(initialState, (draft) => {
        draft.updateTimezoneRequest = updateTimezoneRequest;
      });

      const nextState = reducer(initialState, actions.updateTimezone.pending);
      expect(nextState).toEqual(expectedState);
    });
    it('Should properly handle fulfilled action', () => {
      const updateTimezoneRequest = {...initialState.updateTimezoneRequest, success: true};

      const expectedState = produce(initialState, (draft) => {
        draft.updateTimezoneRequest = updateTimezoneRequest;
        draft.user = selectedEmployee;
      });

      const nextState = reducer(initialState, actions.updateTimezone.fulfilled(selectedEmployee, '', args));
      expect(nextState).toEqual(expectedState);
    });
    it('Should properly handle rejected action', () => {
      const updateTimezoneRequest = {...initialState.updateTimezoneRequest, error};

      const expectedState = produce(initialState, (draft) => {
        draft.updateTimezoneRequest = updateTimezoneRequest;
      });

      const nextState = reducer(initialState, actions.updateTimezone.rejected(new Error(error), '', args));
      expect(nextState).toEqual(expectedState);
    });
  });
});
