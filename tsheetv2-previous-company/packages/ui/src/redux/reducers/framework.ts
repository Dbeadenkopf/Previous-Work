import * as actions from '@actions/framework';
import {createReducer} from '@reduxjs/toolkit';
import handleError from '@util/handleError';

interface State {
  users: Schemas.User[];
  getUsersRequest: RequestStatus;
  getArchivedUsersRequest: RequestStatus;
  getSuperviseesRequest: RequestStatus;
  roles: Schemas.Role[];
  getRolesRequest: RequestStatus;
  reviewers: Schemas.User[];
  getReviewersRequest: RequestStatus;
  deleteRoleRequest: RequestStatus;
  projects: Schemas.Project[];
  getProjectsRequest: RequestStatus;
  selectedEmployee: Schemas.User;
  getEmployeeByIdRequest: RequestStatus;
  updateProjectStatusRequest: RequestStatus;
  updateProjectRequest: RequestStatus;
  addProjectRequest: RequestStatus;
  getProjectRequest: RequestStatus;
  project: Schemas.Project;
  addEmployeeRequest: RequestStatus;
  addRoleRequest: RequestStatus;
  addSubProjectRequest: RequestStatus;
  deleteSubProjectRequest: RequestStatus;
  removeEmployeeRequest: RequestStatus;
  reactivateEmployeeRequest: RequestStatus;
  editEmployeeRequest: RequestStatus;
  contributorTimesheets: Schemas.Timesheet[];
  getContributorTimesheetsRequest: RequestStatus;
  editRoleRequest: RequestStatus;
}

export const initialState: State = {
  users: [],
  getUsersRequest: {
    error: '',
    fetching: false,
    success: false,
  },
  getArchivedUsersRequest: {
    error: '',
    fetching: false,
    success: false,
  },
  getSuperviseesRequest: {
    error: '',
    fetching: false,
    success: false,
  },
  reviewers: [],
  getReviewersRequest: {
    error: '',
    fetching: false,
    success: false,
  },
  roles: [] as Schemas.Role[],
  getRolesRequest: {
    error: '',
    fetching: false,
    success: false,
  },
  deleteRoleRequest: {
    error: '',
    fetching: false,
    success: false,
  },
  projects: [] as Schemas.Project[],
  getProjectsRequest: {
    error: '',
    fetching: false,
    success: false,
  },
  selectedEmployee: {
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
  getEmployeeByIdRequest: {
    error: '',
    fetching: false,
    success: false,
  },
  updateProjectStatusRequest: {
    error: '',
    fetching: false,
    success: false,
  },
  updateProjectRequest: {
    error: '',
    fetching: false,
    success: false,
  },
  addProjectRequest: {error: '', fetching: false, success: false},
  getProjectRequest: {
    error: '',
    fetching: false,
    success: false,
  },
  addEmployeeRequest: {
    error: '',
    fetching: false,
    success: false,
  },
  project: {
    created: {
      date: '',
      ip: '',
      user: {} as Schemas.User,
    },
    label: '',
    lead: {} as Schemas.User,
    name: '',
    subProjects: [],
  },
  addRoleRequest: {
    error: '',
    fetching: false,
    success: false,
  },
  addSubProjectRequest: {
    error: '',
    fetching: false,
    success: false,
  },
  removeEmployeeRequest: {
    error: '',
    fetching: false,
    success: false,
  },
  reactivateEmployeeRequest: {
    error: '',
    fetching: false,
    success: false,
  },
  deleteSubProjectRequest: {
    error: '',
    fetching: false,
    success: false,
  },
  contributorTimesheets: [],
  getContributorTimesheetsRequest: {
    error: '',
    fetching: false,
    success: false,
  },
  editEmployeeRequest: {
    error: '',
    fetching: false,
    success: false,
  },
  editRoleRequest: {
    error: '',
    fetching: false,
    success: false,
  },
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.getUsers.pending, (state) => {
      state.getUsersRequest = {...initialState.getUsersRequest, fetching: true};
    })
    .addCase(actions.getUsers.fulfilled, (state, action) => {
      state.getUsersRequest = {...initialState.getUsersRequest, success: true};

      state.users = action.payload;
    })
    .addCase(actions.getUsers.rejected, (state, action) => {
      state.getUsersRequest = {
        ...initialState.getUsersRequest,
        error: handleError(action.error.message),
      };
    })
    .addCase(actions.getArchivedUsers.pending, (state) => {
      state.getArchivedUsersRequest = {...initialState.getArchivedUsersRequest, fetching: true};
    })
    .addCase(actions.getArchivedUsers.fulfilled, (state, action) => {
      state.getArchivedUsersRequest = {...initialState.getArchivedUsersRequest, success: true};

      state.users = action.payload;
    })
    .addCase(actions.getArchivedUsers.rejected, (state, action) => {
      state.getArchivedUsersRequest = {
        ...initialState.getArchivedUsersRequest,
        error: handleError(action.error.message),
      };
    })
    .addCase(actions.getSupervisees.pending, (state) => {
      state.getSuperviseesRequest = {...initialState.getSuperviseesRequest, fetching: true};
    })
    .addCase(actions.getSupervisees.fulfilled, (state, action) => {
      state.getSuperviseesRequest = {...initialState.getSuperviseesRequest, success: true};

      state.users = action.payload;
    })
    .addCase(actions.getSupervisees.rejected, (state, action) => {
      state.getSuperviseesRequest = {
        ...initialState.getSuperviseesRequest,
        error: handleError(action.error.message),
      };
    })
    .addCase(actions.getRoles.pending, (state) => {
      state.getRolesRequest = {...initialState.getRolesRequest, fetching: true};
    })
    .addCase(actions.getRoles.fulfilled, (state, action) => {
      state.getRolesRequest = {...initialState.getRolesRequest, success: true};

      state.roles = action.payload;
    })
    .addCase(actions.getRoles.rejected, (state, action) => {
      state.getRolesRequest = {
        ...initialState.getRolesRequest,
        error: handleError(action.error.message),
      };
    })

    .addCase(actions.getReviewers.pending, (state) => {
      state.getReviewersRequest = {...initialState.getReviewersRequest, fetching: true};
    })
    .addCase(actions.getReviewers.fulfilled, (state, action) => {
      state.getReviewersRequest = {...initialState.getReviewersRequest, success: true};

      state.reviewers = action.payload;
    })
    .addCase(actions.getReviewers.rejected, (state, action) => {
      state.getReviewersRequest = {
        ...initialState.getReviewersRequest,
        error: handleError(action.error.message),
      };
    })

    .addCase(actions.deleteRole.pending, (state) => {
      state.deleteRoleRequest = {...initialState.deleteRoleRequest, fetching: true};
    })
    .addCase(actions.deleteRole.fulfilled, (state) => {
      state.deleteRoleRequest = {...initialState.deleteRoleRequest, success: true};
    })
    .addCase(actions.deleteRole.rejected, (state, action) => {
      state.deleteRoleRequest = {
        ...initialState.deleteRoleRequest,
        error: handleError(action.error.message),
      };
    })
    .addCase(actions.getProjects.pending, (state) => {
      state.getProjectsRequest = {...initialState.getProjectsRequest, fetching: true};
    })
    .addCase(actions.getProjects.fulfilled, (state, action) => {
      state.getProjectsRequest = {...initialState.getProjectsRequest, success: true};

      state.projects = action.payload;
    })
    .addCase(actions.getProjects.rejected, (state, action) => {
      state.getProjectsRequest = {
        ...initialState.getProjectsRequest,
        error: handleError(action.error.message),
      };
    })
    .addCase(actions.updateProjectStatus.pending, (state) => {
      state.updateProjectStatusRequest = {...initialState.updateProjectStatusRequest, fetching: true};
    })
    .addCase(actions.updateProjectStatus.fulfilled, (state, action) => {
      state.updateProjectStatusRequest = {...initialState.updateProjectStatusRequest, success: true};
      state.project = action.payload;
    })
    .addCase(actions.updateProjectStatus.rejected, (state, action) => {
      state.updateProjectStatusRequest = {
        ...initialState.updateProjectStatusRequest,
        error: handleError(action.error.message),
      };
    })
    .addCase(actions.updateProject.pending, (state) => {
      state.updateProjectRequest = {...initialState.updateProjectRequest, fetching: true};
    })
    .addCase(actions.updateProject.fulfilled, (state, action) => {
      state.updateProjectRequest = {...initialState.updateProjectRequest, success: true};
      state.project = action.payload;
    })
    .addCase(actions.updateProject.rejected, (state, action) => {
      state.updateProjectRequest = {
        ...initialState.updateProjectRequest,
        error: handleError(action.error.message),
      };
    })
    .addCase(actions.resetUpdateProjectStatus, (state) => {
      state.updateProjectStatusRequest = initialState.updateProjectStatusRequest;
    })
    .addCase(actions.getEmployeeById.pending, (state) => {
      state.getEmployeeByIdRequest = {...initialState.getEmployeeByIdRequest, fetching: true};
    })
    .addCase(actions.getEmployeeById.fulfilled, (state, action) => {
      state.getEmployeeByIdRequest = {...initialState.getEmployeeByIdRequest, success: true};
      state.selectedEmployee = action.payload;
    })
    .addCase(actions.getEmployeeById.rejected, (state, action) => {
      state.getEmployeeByIdRequest = {
        ...initialState.getEmployeeByIdRequest,
        error: handleError(action.error.message),
      };
    })
    .addCase(actions.addProject.pending, (state) => {
      state.addProjectRequest = {...initialState.addProjectRequest, fetching: true};
    })
    .addCase(actions.addProject.fulfilled, (state, action) => {
      state.addProjectRequest = {...initialState.addProjectRequest, success: true};

      state.projects.push(action.payload);
    })
    .addCase(actions.addProject.rejected, (state, action) => {
      state.addProjectRequest = {
        ...initialState.addProjectRequest,
        error: handleError(action.error.message),
      };
    })
    .addCase(actions.getProject.pending, (state) => {
      state.getProjectRequest = {...initialState.getProjectRequest, fetching: true};
    })
    .addCase(actions.getProject.fulfilled, (state, action) => {
      state.getProjectRequest = {...initialState.getProjectRequest, success: true};
      state.project = action.payload;
    })
    .addCase(actions.getProject.rejected, (state, action) => {
      state.getProjectRequest = {
        ...initialState.getProjectRequest,
        error: handleError(action.error.message),
      };
    })

    .addCase(actions.addEmployee.pending, (state) => {
      state.addEmployeeRequest = {...initialState.addEmployeeRequest, fetching: true};
    })
    .addCase(actions.addEmployee.fulfilled, (state, action) => {
      state.addEmployeeRequest = {...initialState.addEmployeeRequest, success: true};
      state.users.push(action.payload);
    })
    .addCase(actions.addEmployee.rejected, (state, action) => {
      state.addEmployeeRequest = {
        ...initialState.addEmployeeRequest,
        error: handleError(action.error.message),
      };
    })
    .addCase(actions.addRole.pending, (state) => {
      state.addRoleRequest = {...initialState.addRoleRequest, fetching: true};
    })
    .addCase(actions.addRole.fulfilled, (state, action) => {
      state.addRoleRequest = {...initialState.addRoleRequest, success: true};

      state.roles.push(action.payload);
    })
    .addCase(actions.addRole.rejected, (state, action) => {
      state.addRoleRequest = {
        ...initialState.addRoleRequest,
        error: handleError(action.error.message),
      };
    })
    .addCase(actions.addSubProject.pending, (state) => {
      state.addSubProjectRequest = {...initialState.addSubProjectRequest, fetching: true};
    })
    .addCase(actions.addSubProject.fulfilled, (state, action) => {
      state.addSubProjectRequest = {...initialState.addSubProjectRequest, success: true};

      state.project = action.payload;
    })
    .addCase(actions.addSubProject.rejected, (state, action) => {
      state.addSubProjectRequest = {
        ...initialState.addSubProjectRequest,
        error: handleError(action.error.message),
      };
    })
    .addCase(actions.deleteSubProject.pending, (state) => {
      state.deleteSubProjectRequest = {...initialState.deleteSubProjectRequest, fetching: true};
    })
    .addCase(actions.deleteSubProject.fulfilled, (state) => {
      state.deleteSubProjectRequest = {...initialState.deleteSubProjectRequest, success: true};
    })
    .addCase(actions.deleteSubProject.rejected, (state, action) => {
      state.deleteSubProjectRequest = {
        ...initialState.deleteSubProjectRequest,
        error: handleError(action.error.message),
      };
    })
    .addCase(actions.removeEmployee.pending, (state) => {
      state.removeEmployeeRequest = {...initialState.removeEmployeeRequest, fetching: true};
    })
    .addCase(actions.removeEmployee.fulfilled, (state) => {
      state.removeEmployeeRequest = {...initialState.removeEmployeeRequest, success: true};
    })
    .addCase(actions.removeEmployee.rejected, (state, action) => {
      state.removeEmployeeRequest = {
        ...initialState.removeEmployeeRequest,
        error: handleError(action.error.message),
      };
    })
    .addCase(actions.reactivateEmployee.pending, (state) => {
      state.reactivateEmployeeRequest = {...initialState.reactivateEmployeeRequest, fetching: true};
    })
    .addCase(actions.reactivateEmployee.fulfilled, (state) => {
      state.reactivateEmployeeRequest = {...initialState.reactivateEmployeeRequest, success: true};
    })
    .addCase(actions.reactivateEmployee.rejected, (state, action) => {
      state.reactivateEmployeeRequest = {
        ...initialState.reactivateEmployeeRequest,
        error: handleError(action.error.message),
      };
    })
    .addCase(actions.editEmployee.pending, (state) => {
      state.editEmployeeRequest = {...initialState.editEmployeeRequest, fetching: true};
    })
    .addCase(actions.editEmployee.fulfilled, (state, action) => {
      state.editEmployeeRequest = {...initialState.editEmployeeRequest, success: true};
      state.selectedEmployee = action.payload;
    })
    .addCase(actions.editEmployee.rejected, (state, action) => {
      state.editEmployeeRequest = {
        ...initialState.editEmployeeRequest,
        error: handleError(action.error.message),
      };
    })
    .addCase(actions.resetRemoveEmployeeRequest, (state) => {
      state.removeEmployeeRequest = initialState.removeEmployeeRequest;
    })
    .addCase(actions.resetReactivateEmployeeRequest, (state) => {
      state.reactivateEmployeeRequest = initialState.reactivateEmployeeRequest;
    })
    .addCase(actions.getContributorTimesheets.pending, (state) => {
      state.getContributorTimesheetsRequest = {
        ...initialState.getContributorTimesheetsRequest,
        fetching: true,
      };
    })
    .addCase(actions.getContributorTimesheets.fulfilled, (state, action) => {
      state.getContributorTimesheetsRequest = {
        ...initialState.getContributorTimesheetsRequest,
        success: true,
      };
      state.contributorTimesheets = action.payload;
    })
    .addCase(actions.getContributorTimesheets.rejected, (state, action) => {
      state.getContributorTimesheetsRequest = {
        ...initialState.getContributorTimesheetsRequest,
        error: handleError(action.error.message),
      };
    })
    .addCase(actions.editRole.pending, (state) => {
      state.editRoleRequest = {...initialState.editRoleRequest, fetching: true};
    })
    .addCase(actions.editRole.fulfilled, (state, action) => {
      state.editRoleRequest = {...initialState.editRoleRequest, success: true};

      state.roles = [...state.roles, action.payload];
    })
    .addCase(actions.editRole.rejected, (state, action) => {
      state.editRoleRequest = {
        ...initialState.editRoleRequest,
        error: handleError(action.error.message),
      };
    });
});

export default reducer;
