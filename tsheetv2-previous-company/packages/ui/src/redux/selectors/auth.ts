import {RootState} from '../store';

export const selectUser = (state: RootState) => state.auth.user;
export const selectLogoutStatus = (state: RootState) => state.auth.logoutStatus;
export const selectPermissions = (state: RootState) => [
  ...new Set(state.auth.user.roles.flatMap(({permissions: p}) => p)),
];
