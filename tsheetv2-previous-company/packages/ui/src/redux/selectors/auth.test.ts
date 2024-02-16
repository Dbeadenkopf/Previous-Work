import {produce} from 'immer';

import {store} from '../store';

import * as selectors from './auth';

describe('Auth selectors', () => {
  it('Should return the auth user', () => {
    const state = produce(store.getState(), (draft) => {
      draft.auth.user.email = 'test@t1cg.com';
    });
    expect(selectors.selectUser(state)).toEqual(state.auth.user);
  });

  it('Should return the logout status', () => {
    const state = produce(store.getState(), (draft) => {
      draft.auth.logoutStatus.error = 'test';
    });
    expect(selectors.selectLogoutStatus(state)).toEqual(state.auth.logoutStatus);
  });

  it("Should return the user's permissions", () => {
    const state = produce(store.getState(), (draft) => {
      draft.auth.user.roles = [
        {name: 'role1', permissions: ['perm1', 'perm2']},
        {name: 'role2', permissions: ['perm2', 'perm3']},
      ];
    });
    expect(selectors.selectPermissions(state)).toEqual(['perm1', 'perm2', 'perm3']);
  });
});
