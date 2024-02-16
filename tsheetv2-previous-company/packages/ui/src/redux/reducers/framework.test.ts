import {produce} from 'immer';

import * as actions from '@actions/framework';

import reducer, {initialState} from './framework';

describe('Framework reducer', () => {
  const error = 'test';

  describe('getUsers', () => {
    it('Should properly handle pending action', () => {
      const getUsersRequest = {...initialState.getUsersRequest, fetching: true};

      const expectedState = produce(initialState, (draft) => {
        draft.getUsersRequest = getUsersRequest;
      });

      const nextState = reducer(initialState, actions.getUsers.pending);
      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle fulfilled action', () => {
      const getUsersRequest = {...initialState.getUsersRequest, success: true};

      const expectedState = produce(initialState, (draft) => {
        draft.getUsersRequest = getUsersRequest;
      });

      const nextState = reducer(initialState, actions.getUsers.fulfilled(initialState.users, ''));
      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle rejected action', () => {
      const getUsersRequest = {...initialState.getUsersRequest, error};

      const expectedState = produce(initialState, (draft) => {
        draft.getUsersRequest = getUsersRequest;
      });

      const nextState = reducer(initialState, actions.getUsers.rejected(new Error(error), ''));
      expect(nextState).toEqual(expectedState);
    });
  });

  describe('getArchivedUsers', () => {
    it('Should properly handle pending action', () => {
      const getArchivedUsersRequest = {...initialState.getArchivedUsersRequest, fetching: true};

      const expectedState = produce(initialState, (draft) => {
        draft.getArchivedUsersRequest = getArchivedUsersRequest;
      });

      const nextState = reducer(initialState, actions.getArchivedUsers.pending);
      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle fulfilled action', () => {
      const getArchivedUsersRequest = {...initialState.getArchivedUsersRequest, success: true};

      const expectedState = produce(initialState, (draft) => {
        draft.getArchivedUsersRequest = getArchivedUsersRequest;
      });

      const nextState = reducer(initialState, actions.getArchivedUsers.fulfilled(initialState.users, ''));
      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle rejected action', () => {
      const getArchivedUsersRequest = {...initialState.getArchivedUsersRequest, error};

      const expectedState = produce(initialState, (draft) => {
        draft.getArchivedUsersRequest = getArchivedUsersRequest;
      });

      const nextState = reducer(initialState, actions.getArchivedUsers.rejected(new Error(error), ''));
      expect(nextState).toEqual(expectedState);
    });
  });

  describe('getSupervisees', () => {
    const supervisor = 'test';

    it('Should properly handle pending action', () => {
      const getSuperviseesRequest = {...initialState.getSuperviseesRequest, fetching: true};

      const expectedState = produce(initialState, (draft) => {
        draft.getSuperviseesRequest = getSuperviseesRequest;
      });

      const nextState = reducer(initialState, actions.getSupervisees.pending);
      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle fulfilled action', () => {
      const getSuperviseesRequest = {...initialState.getSuperviseesRequest, success: true};

      const expectedState = produce(initialState, (draft) => {
        draft.getSuperviseesRequest = getSuperviseesRequest;
      });

      const nextState = reducer(
        initialState,
        actions.getSupervisees.fulfilled(initialState.users, '', supervisor)
      );
      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle rejected action', () => {
      const getSuperviseesRequest = {...initialState.getSuperviseesRequest, error};

      const expectedState = produce(initialState, (draft) => {
        draft.getSuperviseesRequest = getSuperviseesRequest;
      });

      const nextState = reducer(
        initialState,
        actions.getSupervisees.rejected(new Error(error), '', supervisor)
      );
      expect(nextState).toEqual(expectedState);
    });
  });

  describe('getRoles', () => {
    it('Should properly handle pending action', () => {
      const getRolesRequest = {...initialState.getRolesRequest, fetching: true};

      const expectedState = produce(initialState, (draft) => {
        draft.getRolesRequest = getRolesRequest;
      });

      const nextState = reducer(initialState, actions.getRoles.pending);
      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle fulfilled action', () => {
      const getRolesRequest = {...initialState.getRolesRequest, success: true};

      const expectedState = produce(initialState, (draft) => {
        draft.getRolesRequest = getRolesRequest;
      });

      const nextState = reducer(initialState, actions.getRoles.fulfilled(initialState.roles, ''));
      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle rejected action', () => {
      const getRolesRequest = {...initialState.getRolesRequest, error};

      const expectedState = produce(initialState, (draft) => {
        draft.getRolesRequest = getRolesRequest;
      });

      const nextState = reducer(initialState, actions.getRoles.rejected(new Error(error), ''));
      expect(nextState).toEqual(expectedState);
    });
  });

  describe('deleteRole', () => {
    const roleId = 'test';

    it('Should properly handle pending action', () => {
      const deleteRoleRequest = {...initialState.deleteRoleRequest, fetching: true};

      const expectedState = produce(initialState, (draft) => {
        draft.deleteRoleRequest = deleteRoleRequest;
      });

      const nextState = reducer(initialState, actions.deleteRole.pending);
      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle fulfilled action', () => {
      const deleteRoleRequest = {...initialState.deleteRoleRequest, success: true};

      const expectedState = produce(initialState, (draft) => {
        draft.deleteRoleRequest = deleteRoleRequest;
      });

      const nextState = reducer(initialState, actions.deleteRole.fulfilled(undefined, '', roleId));
      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle rejected action', () => {
      const deleteRoleRequest = {...initialState.deleteRoleRequest, error};

      const expectedState = produce(initialState, (draft) => {
        draft.deleteRoleRequest = deleteRoleRequest;
      });

      const nextState = reducer(initialState, actions.deleteRole.rejected(new Error(error), '', roleId));
      expect(nextState).toEqual(expectedState);
    });
  });

  describe('getReviewers', () => {
    it('Should properly handle pending action', () => {
      const getReviewersRequest = {...initialState.getReviewersRequest, fetching: true};

      const expectedState = produce(initialState, (draft) => {
        draft.getReviewersRequest = getReviewersRequest;
      });

      const nextState = reducer(initialState, actions.getReviewers.pending);
      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle fulfilled action', () => {
      const getReviewersRequest = {...initialState.getReviewersRequest, success: true};

      const expectedState = produce(initialState, (draft) => {
        draft.getReviewersRequest = getReviewersRequest;
      });

      const nextState = reducer(initialState, actions.getReviewers.fulfilled(initialState.reviewers, ''));
      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle rejected action', () => {
      const getReviewersRequest = {...initialState.getReviewersRequest, error};

      const expectedState = produce(initialState, (draft) => {
        draft.getReviewersRequest = getReviewersRequest;
      });

      const nextState = reducer(initialState, actions.getReviewers.rejected(new Error(error), ''));
      expect(nextState).toEqual(expectedState);
    });
  });

  describe('getProjects', () => {
    it('Should properly handle pending action', () => {
      const getProjectsRequest = {...initialState.getProjectsRequest, fetching: true};

      const expectedState = produce(initialState, (draft) => {
        draft.getProjectsRequest = getProjectsRequest;
      });

      const nextState = reducer(initialState, actions.getProjects.pending);
      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle fulfilled action', () => {
      const getProjectsRequest = {...initialState.getProjectsRequest, success: true};

      const expectedState = produce(initialState, (draft) => {
        draft.getProjectsRequest = getProjectsRequest;
      });

      const nextState = reducer(initialState, actions.getProjects.fulfilled(initialState.projects, ''));
      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle rejected action', () => {
      const getProjectsRequest = {...initialState.getProjectsRequest, error};

      const expectedState = produce(initialState, (draft) => {
        draft.getProjectsRequest = getProjectsRequest;
      });

      const nextState = reducer(initialState, actions.getProjects.rejected(new Error(error), ''));
      expect(nextState).toEqual(expectedState);
    });
  });

  describe('getEmployeeById', () => {
    const supervisor = 'test';

    it('Should properly handle pending action', () => {
      const getUsersRequest = {...initialState.getEmployeeByIdRequest, fetching: true};

      const expectedState = produce(initialState, (draft) => {
        draft.getEmployeeByIdRequest = getUsersRequest;
      });

      const nextState = reducer(initialState, actions.getEmployeeById.pending);
      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle fulfilled action', () => {
      const getUsersRequest = {...initialState.getEmployeeByIdRequest, success: true};

      const expectedState = produce(initialState, (draft) => {
        draft.getEmployeeByIdRequest = getUsersRequest;
      });

      const nextState = reducer(
        initialState,
        actions.getEmployeeById.fulfilled(initialState.selectedEmployee, '', supervisor)
      );
      expect(nextState).toEqual(expectedState);
    });
    it('Should properly handle rejected action', () => {
      const getUsersRequest = {...initialState.getEmployeeByIdRequest, error};

      const expectedState = produce(initialState, (draft) => {
        draft.getEmployeeByIdRequest = getUsersRequest;
      });

      const nextState = reducer(
        initialState,
        actions.getEmployeeById.rejected(new Error(error), '', supervisor)
      );
      expect(nextState).toEqual(expectedState);
    });
  });

  describe('updateProjectStatus', () => {
    const args = {projectId: 'test', userId: 'test', status: 'archived' as const};

    it('Should properly handle pending action', () => {
      const updateProjectStatusRequest = {...initialState.updateProjectStatusRequest, fetching: true};

      const expectedState = produce(initialState, (draft) => {
        draft.updateProjectStatusRequest = updateProjectStatusRequest;
      });

      const nextState = reducer(initialState, actions.updateProjectStatus.pending);
      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle fulfilled action', () => {
      const updateProjectStatusRequest = {...initialState.updateProjectStatusRequest, success: true};

      const expectedState = produce(initialState, (draft) => {
        draft.updateProjectStatusRequest = updateProjectStatusRequest;
      });

      const nextState = reducer(
        initialState,
        actions.updateProjectStatus.fulfilled(initialState.project, '', args)
      );

      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle rejected action', () => {
      const updateProjectStatusRequest = {...initialState.updateProjectStatusRequest, error};

      const expectedState = produce(initialState, (draft) => {
        draft.updateProjectStatusRequest = updateProjectStatusRequest;
      });

      const nextState = reducer(
        initialState,
        actions.updateProjectStatus.rejected(new Error(error), '', args)
      );
      expect(nextState).toEqual(expectedState);
    });
  });

  describe('updateProject', () => {
    const args = {
      projectId: '',
      lead: '',
    };

    it('Should properly handle pending action', () => {
      const updateProjectRequest = {...initialState.updateProjectRequest, fetching: true};

      const expectedState = produce(initialState, (draft) => {
        draft.updateProjectRequest = updateProjectRequest;
      });

      const nextState = reducer(initialState, actions.updateProject.pending);
      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle fulfilled action', () => {
      const updateProjectRequest = {...initialState.updateProjectRequest, success: true};

      const expectedState = produce(initialState, (draft) => {
        draft.updateProjectRequest = updateProjectRequest;
      });

      const nextState = reducer(
        initialState,
        actions.updateProject.fulfilled(initialState.project, '', args)
      );

      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle rejected action', () => {
      const updateProjectRequest = {...initialState.updateProjectRequest, error};

      const expectedState = produce(initialState, (draft) => {
        draft.updateProjectRequest = updateProjectRequest;
      });

      const nextState = reducer(initialState, actions.updateProject.rejected(new Error(error), '', args));
      expect(nextState).toEqual(expectedState);
    });
  });

  it('Should properly handle resetUpdateProjectStatus', () => {
    const updateProjectStatusRequest = initialState.updateProjectStatusRequest;

    const expectedState = produce(initialState, (draft) => {
      draft.updateProjectStatusRequest = updateProjectStatusRequest;
    });

    const nextState = reducer(initialState, actions.resetUpdateProjectStatus);
    expect(nextState).toEqual(expectedState);
  });

  describe('addProject', () => {
    const projectInfo = {
      lead: '',
      label: '',
      name: '',
    };

    it('Should properly handle pending action', () => {
      const addProjectRequest = {...initialState.addProjectRequest, fetching: true};

      const expectedState = produce(initialState, (draft) => {
        draft.addProjectRequest = addProjectRequest;
      });

      const nextState = reducer(initialState, actions.addProject.pending);
      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle fulfilled action', () => {
      const addProjectRequest = {...initialState.addProjectRequest, success: true};
      const newProject = {} as Schemas.Project;

      const expectedState = produce(initialState, (draft) => {
        draft.addProjectRequest = addProjectRequest;
        draft.projects = [newProject];
      });

      const nextState = reducer(initialState, actions.addProject.fulfilled(newProject, '', projectInfo));
      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle rejected action', () => {
      const addProjectRequest = {...initialState.addProjectRequest, error};

      const expectedState = produce(initialState, (draft) => {
        draft.addProjectRequest = addProjectRequest;
      });

      const nextState = reducer(initialState, actions.addProject.rejected(new Error(error), '', projectInfo));
      expect(nextState).toEqual(expectedState);
    });
  });

  describe('addEmployee', () => {
    const args = {
      first: 'Steve',
      last: 'Flint',
      email: 'test@t1cg.com',
      title: 'Test',
      supervisor: 'test',
    };

    it('Should properly handle pending action', () => {
      const addEmployeeRequest = {...initialState.addEmployeeRequest, fetching: true};

      const expectedState = produce(initialState, (draft) => {
        draft.addEmployeeRequest = addEmployeeRequest;
      });

      const nextState = reducer(initialState, actions.addEmployee.pending);
      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle fulfilled action', () => {
      const newMockUser = {} as Schemas.User;

      const addEmployeeRequest = {...initialState.addEmployeeRequest, success: true};

      const expectedState = produce(initialState, (draft) => {
        draft.addEmployeeRequest = addEmployeeRequest;
        draft.users.push(newMockUser);
      });

      const nextState = reducer(initialState, actions.addEmployee.fulfilled(newMockUser, '', args));

      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle rejected action', () => {
      const addEmployeeRequest = {...initialState.addEmployeeRequest, error};

      const expectedState = produce(initialState, (draft) => {
        draft.addEmployeeRequest = addEmployeeRequest;
      });

      const nextState = reducer(initialState, actions.addEmployee.rejected(new Error(error), '', args));
      expect(nextState).toEqual(expectedState);
    });
  });

  describe('getProject', () => {
    it('Should properly handle pending action', () => {
      const getProjectRequest = {...initialState.getProjectRequest, fetching: true};

      const expectedState = produce(initialState, (draft) => {
        draft.getProjectRequest = getProjectRequest;
      });

      const nextState = reducer(initialState, actions.getProject.pending);
      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle fulfilled action', () => {
      const getProjectRequest = {...initialState.getProjectRequest, success: true};

      const expectedState = produce(initialState, (draft) => {
        draft.getProjectRequest = getProjectRequest;
      });

      const nextState = reducer(
        initialState,
        actions.getProject.fulfilled({...initialState.project, subProjects: []}, '', '')
      );
      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle rejected action', () => {
      const getProjectRequest = {...initialState.getProjectRequest, error};

      const expectedState = produce(initialState, (draft) => {
        draft.getProjectRequest = getProjectRequest;
      });

      const nextState = reducer(initialState, actions.getProject.rejected(new Error(error), '', ''));
      expect(nextState).toEqual(expectedState);
    });
  });

  describe('addRole', () => {
    const roleInfo = {
      name: '',
      description: '',
      permissions: [],
      userId: '',
    };

    it('Should properly handle pending action', () => {
      const addRoleRequest = {...initialState.addRoleRequest, fetching: true};

      const expectedState = produce(initialState, (draft) => {
        draft.addRoleRequest = addRoleRequest;
      });

      const nextState = reducer(initialState, actions.addRole.pending);
      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle fulfilled action', () => {
      const addRoleRequest = {...initialState.addRoleRequest, success: true};
      const newRole = {} as Schemas.Role;

      const expectedState = produce(initialState, (draft) => {
        draft.addRoleRequest = addRoleRequest;
        draft.roles = [newRole];
      });

      const nextState = reducer(initialState, actions.addRole.fulfilled(newRole, '', roleInfo));
      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle rejected action', () => {
      const addRoleRequest = {...initialState.addRoleRequest, error};

      const expectedState = produce(initialState, (draft) => {
        draft.addRoleRequest = addRoleRequest;
      });

      const nextState = reducer(initialState, actions.addRole.rejected(new Error(error), '', roleInfo));
      expect(nextState).toEqual(expectedState);
    });
  });

  describe('addSubProject', () => {
    const addSubProjectInfo = {
      projectId: '',
      subLabel: '',
      subName: '',
      action: 'add',
    };

    it('Should properly handle pending action', () => {
      const addSubProjectRequest = {...initialState.addSubProjectRequest, fetching: true};

      const expectedState = produce(initialState, (draft) => {
        draft.addSubProjectRequest = addSubProjectRequest;
      });

      const nextState = reducer(initialState, actions.addSubProject.pending);
      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle fulfilled action', () => {
      const addSubProjectRequest = {...initialState.addSubProjectRequest, success: true};

      const expectedState = produce(initialState, (draft) => {
        draft.addSubProjectRequest = addSubProjectRequest;
      });

      const nextState = reducer(
        initialState,
        actions.addSubProject.fulfilled(initialState.project, '', addSubProjectInfo)
      );

      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle rejected action', () => {
      const addSubProjectRequest = {...initialState.addSubProjectRequest, error};

      const expectedState = produce(initialState, (draft) => {
        draft.addSubProjectRequest = addSubProjectRequest;
      });

      const nextState = reducer(
        initialState,
        actions.addSubProject.rejected(new Error(error), '', addSubProjectInfo)
      );
      expect(nextState).toEqual(expectedState);
    });
  });
  describe('removeEmployee', () => {
    it('Should properly handle pending action', () => {
      const removeEmployeeRequest = {...initialState.removeEmployeeRequest, fetching: true};

      const expectedState = produce(initialState, (draft) => {
        draft.removeEmployeeRequest = removeEmployeeRequest;
      });

      const nextState = reducer(initialState, actions.removeEmployee.pending);
      expect(nextState).toEqual(expectedState);
    });
    it('Should properly handle fulfilled action', () => {
      const removeEmployeeRequest = {...initialState.removeEmployeeRequest, success: true};

      const expectedState = produce(initialState, (draft) => {
        draft.removeEmployeeRequest = removeEmployeeRequest;
      });

      const nextState = reducer(initialState, actions.removeEmployee.fulfilled(undefined, '', ''));
      expect(nextState).toEqual(expectedState);
    });
    it('Should properly handle rejected action', () => {
      const removeEmployeeRequest = {...initialState.removeEmployeeRequest, error};

      const expectedState = produce(initialState, (draft) => {
        draft.removeEmployeeRequest = removeEmployeeRequest;
      });

      const nextState = reducer(initialState, actions.removeEmployee.rejected(new Error(error), '', ''));
      expect(nextState).toEqual(expectedState);
    });
  });

  describe('reactivateEmployee', () => {
    it('Should properly handle pending action', () => {
      const reactivateEmployeeRequest = {...initialState.reactivateEmployeeRequest, fetching: true};

      const expectedState = produce(initialState, (draft) => {
        draft.reactivateEmployeeRequest = reactivateEmployeeRequest;
      });

      const nextState = reducer(initialState, actions.reactivateEmployee.pending);
      expect(nextState).toEqual(expectedState);
    });
    it('Should properly handle fulfilled action', () => {
      const reactivateEmployeeRequest = {...initialState.reactivateEmployeeRequest, success: true};

      const expectedState = produce(initialState, (draft) => {
        draft.reactivateEmployeeRequest = reactivateEmployeeRequest;
      });

      const nextState = reducer(initialState, actions.reactivateEmployee.fulfilled(undefined, '', ''));
      expect(nextState).toEqual(expectedState);
    });
    it('Should properly handle rejected action', () => {
      const reactivateEmployeeRequest = {...initialState.reactivateEmployeeRequest, error};

      const expectedState = produce(initialState, (draft) => {
        draft.reactivateEmployeeRequest = reactivateEmployeeRequest;
      });

      const nextState = reducer(initialState, actions.reactivateEmployee.rejected(new Error(error), '', ''));
      expect(nextState).toEqual(expectedState);
    });
  });

  describe('deleteSubProject', () => {
    const deleteSubProjectInfo = {
      projectId: '',
      subLabel: '',
      subName: '',
      action: 'delete',
    };

    it('Should properly handle pending action', () => {
      const deleteSubProjectRequest = {...initialState.deleteSubProjectRequest, fetching: true};

      const expectedState = produce(initialState, (draft) => {
        draft.deleteSubProjectRequest = deleteSubProjectRequest;
      });

      const nextState = reducer(initialState, actions.deleteSubProject.pending);
      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle fulfilled action', () => {
      const deleteSubProjectRequest = {...initialState.deleteSubProjectRequest, success: true};

      const expectedState = produce(initialState, (draft) => {
        draft.deleteSubProjectRequest = deleteSubProjectRequest;
      });

      const nextState = reducer(
        initialState,
        actions.deleteSubProject.fulfilled(initialState.project, '', deleteSubProjectInfo)
      );
      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle rejected action', () => {
      const deleteSubProjectRequest = {...initialState.deleteSubProjectRequest, error};

      const expectedState = produce(initialState, (draft) => {
        draft.deleteSubProjectRequest = deleteSubProjectRequest;
      });

      const nextState = reducer(
        initialState,
        actions.deleteSubProject.rejected(new Error(error), '', deleteSubProjectInfo)
      );
      expect(nextState).toEqual(expectedState);
    });
  });

  describe('getContributorTimesheets', () => {
    const args = {project: 'test', recent: false};

    it('Should properly handle pending action', () => {
      const getContributorTimesheetsRequest = {
        ...initialState.getContributorTimesheetsRequest,
        fetching: true,
      };

      const expectedState = produce(initialState, (draft) => {
        draft.getContributorTimesheetsRequest = getContributorTimesheetsRequest;
      });

      const nextState = reducer(initialState, actions.getContributorTimesheets.pending);
      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle fulfilled action', () => {
      const getContributorTimesheetsRequest = {
        ...initialState.getContributorTimesheetsRequest,
        success: true,
      };

      const expectedState = produce(initialState, (draft) => {
        draft.getContributorTimesheetsRequest = getContributorTimesheetsRequest;
        draft.contributorTimesheets = [];
      });

      const nextState = reducer(
        initialState,
        actions.getContributorTimesheets.fulfilled(initialState.contributorTimesheets, '', args)
      );
      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle rejected action', () => {
      const getContributorTimesheetsRequest = {...initialState.getContributorTimesheetsRequest, error};

      const expectedState = produce(initialState, (draft) => {
        draft.getContributorTimesheetsRequest = getContributorTimesheetsRequest;
      });

      const nextState = reducer(
        initialState,
        actions.getContributorTimesheets.rejected(new Error(error), '', args)
      );
      expect(nextState).toEqual(expectedState);
    });
  });

  describe('editEmployee', () => {
    const editEmployeeRequestArg = {
      userId: 'fakeUserId',
      title: 'fakeTitle',
      roles: [],
    };
    it('Should properly handle pending action', () => {
      const editEmployeeRequest = {...initialState.editEmployeeRequest, fetching: true};

      const expectedState = produce(initialState, (draft) => {
        draft.editEmployeeRequest = editEmployeeRequest;
      });

      const nextState = reducer(initialState, actions.editEmployee.pending);
      expect(nextState).toEqual(expectedState);
    });
    it('Should properly handle fulfilled action', () => {
      const selectedEmployee = {} as Schemas.User;

      const editEmployeeRequest = {...initialState.editEmployeeRequest, success: true};

      const expectedState = produce(initialState, (draft) => {
        draft.editEmployeeRequest = editEmployeeRequest;
        draft.selectedEmployee = selectedEmployee;
      });

      const nextState = reducer(
        initialState,
        actions.editEmployee.fulfilled(selectedEmployee, '', editEmployeeRequestArg)
      );
      expect(nextState).toEqual(expectedState);
    });
    it('Should properly handle rejected action', () => {
      const editEmployeeRequest = {...initialState.editEmployeeRequest, error};

      const expectedState = produce(initialState, (draft) => {
        draft.editEmployeeRequest = editEmployeeRequest;
      });

      const nextState = reducer(
        initialState,
        actions.editEmployee.rejected(new Error(error), '', editEmployeeRequestArg)
      );
      expect(nextState).toEqual(expectedState);
    });
  });
  it('Should properly handle resetRemoveEmployeeRequest', () => {
    const removeEmployeeRequest = initialState.removeEmployeeRequest;

    const expectedState = produce(initialState, (draft) => {
      draft.removeEmployeeRequest = removeEmployeeRequest;
    });

    const nextState = reducer(initialState, actions.resetRemoveEmployeeRequest);
    expect(nextState).toEqual(expectedState);
  });
  it('Should properly handle resetReactivateEmployeeRequest', () => {
    const reactivateEmployeeRequest = initialState.reactivateEmployeeRequest;

    const expectedState = produce(initialState, (draft) => {
      draft.reactivateEmployeeRequest = reactivateEmployeeRequest;
    });

    const nextState = reducer(initialState, actions.resetReactivateEmployeeRequest);
    expect(nextState).toEqual(expectedState);
  });
  describe('editRole', () => {
    const args = {
      name: 'name',
      description: 'desc',
      permissions: ['permissionString'],
      roleId: 'roleId',
      userId: 'userId',
    };
    const editedRole = {
      name: 'name',
      description: 'desc',
      permissions: ['permissionString'],
      _id: 'roleId',
    };

    it('Should properly handle pending action', () => {
      const editRoleRequest = {...initialState.editRoleRequest, fetching: true};

      const expectedState = produce(initialState, (draft) => {
        draft.editRoleRequest = editRoleRequest;
      });

      const nextState = reducer(initialState, actions.editRole.pending);
      expect(nextState).toEqual(expectedState);
    });
    it('Should properly handle fulfilled action', () => {
      const editRoleRequest = {...initialState.editRoleRequest, success: true};

      const expectedState = produce(initialState, (draft) => {
        draft.editRoleRequest = editRoleRequest;
        draft.roles = [editedRole];
      });

      const nextState = reducer(initialState, actions.editRole.fulfilled(editedRole, '', args));

      expect(nextState).toEqual(expectedState);
    });
    it('Should properly handle rejected action', () => {
      const editRoleRequest = {...initialState.editRoleRequest, error};

      const expectedState = produce(initialState, (draft) => {
        draft.editRoleRequest = editRoleRequest;
      });

      const nextState = reducer(initialState, actions.editRole.rejected(new Error(error), '', args));
      expect(nextState).toEqual(expectedState);
    });
  });
});
