import {produce} from 'immer';

import {store} from '../store';

import * as selectors from './framework';

describe('Framework selectors', () => {
  it('Should return the user data', () => {
    const state = produce(store.getState(), (draft) => {
      draft.framework.users = [{} as Schemas.User];
    });
    expect(selectors.selectUsers(state)).toEqual(state.framework.users);
  });

  it('Should return the getUsersRequest status', () => {
    const state = produce(store.getState(), (draft) => {
      draft.framework.getUsersRequest.error = 'test';
    });
    expect(selectors.selectGetUsersRequest(state)).toEqual(state.framework.getUsersRequest);
  });

  it('Should return the getArchivedUsers status', () => {
    const state = produce(store.getState(), (draft) => {
      draft.framework.getArchivedUsersRequest.error = 'test';
    });
    expect(selectors.selectGetArchivedUsersRequest(state)).toEqual(state.framework.getArchivedUsersRequest);
  });

  it('Should return the getSuperviseesRequest status', () => {
    const state = produce(store.getState(), (draft) => {
      draft.framework.getSuperviseesRequest.error = 'test';
    });
    expect(selectors.selectgetSuperviseesRequest(state)).toEqual(state.framework.getSuperviseesRequest);
  });

  it('Should return the role data', () => {
    const state = produce(store.getState(), (draft) => {
      draft.framework.roles = [{} as Schemas.Role];
    });
    expect(selectors.selectRoles(state)).toEqual(state.framework.roles);
  });

  it('Should return the getRolesRequest status', () => {
    const state = produce(store.getState(), (draft) => {
      draft.framework.getRolesRequest.error = 'test';
    });
    expect(selectors.selectGetRolesRequest(state)).toEqual(state.framework.getRolesRequest);
  });

  it('Should return only the users who are reviewers', () => {
    const state = produce(store.getState(), (draft) => {
      draft.framework.reviewers = [{} as Schemas.User];
    });
    expect(selectors.selectReviewers(state)).toEqual(state.framework.reviewers);
  });

  it('Should return the getReviewersRequest status', () => {
    const state = produce(store.getState(), (draft) => {
      draft.framework.getReviewersRequest.error = 'test';
    });
    expect(selectors.selectGetReviewersRequest(state)).toEqual(state.framework.getReviewersRequest);
  });

  it('Should return the deleteRolesRequest status', () => {
    const state = produce(store.getState(), (draft) => {
      draft.framework.deleteRoleRequest.error = 'test';
    });
    expect(selectors.selectDeleteRoleRequest(state)).toEqual(state.framework.deleteRoleRequest);
  });

  it('Should return the project data', () => {
    const state = produce(store.getState(), (draft) => {
      draft.framework.projects = [{} as Schemas.Project];
    });
    expect(selectors.selectProjects(state)).toEqual(state.framework.projects);
  });

  it('Should return the employee data', () => {
    const state = produce(store.getState(), (draft) => {
      draft.framework.selectedEmployee = {} as Schemas.User;
    });
    expect(selectors.selectEmployee(state)).toEqual(state.framework.selectedEmployee);
  });

  it('Should return the getEmployeeByIdRequest status', () => {
    const state = produce(store.getState(), (draft) => {
      draft.framework.getEmployeeByIdRequest.error = 'test';
    });
    expect(selectors.selectEmployeeByIdRequest(state)).toEqual(state.framework.getEmployeeByIdRequest);
  });

  it('Should return the updateProjectStatusRequest status', () => {
    const state = produce(store.getState(), (draft) => {
      draft.framework.updateProjectStatusRequest.error = 'test';
    });
    expect(selectors.selectUpdateProjectStatusRequest(state)).toEqual(
      state.framework.updateProjectStatusRequest
    );
  });

  it('Should return the updateProjectRequest status', () => {
    const state = produce(store.getState(), (draft) => {
      draft.framework.updateProjectRequest.error = 'test';
    });
    expect(selectors.selectUpdateProjectRequest(state)).toEqual(state.framework.updateProjectRequest);
  });

  it('Should return the addProjectRequest status', () => {
    const state = produce(store.getState(), (draft) => {
      draft.framework.addProjectRequest.error = 'test';
    });
    expect(selectors.selectAddProjectRequest(state)).toEqual(state.framework.addProjectRequest);
  });

  it('Should return the project data', () => {
    const state = produce(store.getState(), (draft) => {
      draft.framework.project = {} as Schemas.Project;
    });
    expect(selectors.selectProject(state)).toEqual(state.framework.project);
  });

  it('Should return the getProject status', () => {
    const state = produce(store.getState(), (draft) => {
      draft.framework.getProjectRequest.error = 'test';
    });
    expect(selectors.selectProjectRequest(state)).toEqual(state.framework.getProjectRequest);
  });

  it('Should return the addEmployeeRequest status', () => {
    const state = produce(store.getState(), (draft) => {
      draft.framework.addEmployeeRequest.error = 'test';
    });
    expect(selectors.selectAddEmployeeRequest(state)).toEqual(state.framework.addEmployeeRequest);
  });

  it('Should return the addRoleRequest status', () => {
    const state = produce(store.getState(), (draft) => {
      draft.framework.addRoleRequest.error = 'test';
    });
    expect(selectors.selectAddRoleRequest(state)).toEqual(state.framework.addRoleRequest);
  });

  it('Should return the addSubProjectRequest status', () => {
    const state = produce(store.getState(), (draft) => {
      draft.framework.addSubProjectRequest.error = 'test';
    });
    expect(selectors.selectAddSubProjectRequest(state)).toEqual(state.framework.addSubProjectRequest);
  });

  it('Should return the deleteSubProjectRequest status', () => {
    const state = produce(store.getState(), (draft) => {
      draft.framework.deleteSubProjectRequest.error = 'test';
    });
    expect(selectors.selectDeleteSubProjectRequest(state)).toEqual(state.framework.deleteSubProjectRequest);
  });
  it('Should return the removeEmployeeRequest status', () => {
    const state = produce(store.getState(), (draft) => {
      draft.framework.removeEmployeeRequest.error = 'test';
    });
    expect(selectors.selectRemoveEmployeeRequest(state)).toEqual(state.framework.removeEmployeeRequest);
  });
  it('Should return the reactivateEmployeeRequest status', () => {
    const state = produce(store.getState(), (draft) => {
      draft.framework.reactivateEmployeeRequest.error = 'test';
    });
    expect(selectors.selectReactivateEmployeeRequest(state)).toEqual(
      state.framework.reactivateEmployeeRequest
    );
  });
  it('should return the getRejectedTimesheets status', () => {
    const state = produce(store.getState(), (draft) => {
      draft.framework.contributorTimesheets = [{} as Schemas.Timesheet];
    });
    expect(selectors.selectContributorTimesheets(state)).toEqual(state.framework.contributorTimesheets);
  });
  it('Should return the editRoleRequest status', () => {
    const state = produce(store.getState(), (draft) => {
      draft.framework.editRoleRequest.error = 'test';
    });
    expect(selectors.selectEditRoleRequest(state)).toEqual(state.framework.editRoleRequest);
  });
});
