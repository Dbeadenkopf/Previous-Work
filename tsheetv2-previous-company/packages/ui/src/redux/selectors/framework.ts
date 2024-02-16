import {RootState} from '../store';

export const selectUsers = (state: RootState) => state.framework.users;
export const selectGetUsersRequest = (state: RootState) => state.framework.getUsersRequest;
export const selectGetArchivedUsersRequest = (state: RootState) => state.framework.getArchivedUsersRequest;
export const selectgetSuperviseesRequest = (state: RootState) => state.framework.getSuperviseesRequest;
export const selectRoles = (state: RootState) => state.framework.roles;
export const selectGetRolesRequest = (state: RootState) => state.framework.getRolesRequest;
export const selectDeleteRoleRequest = (state: RootState) => state.framework.deleteRoleRequest;
export const selectProjects = (state: RootState) => state.framework.projects;
export const selectUpdateProjectStatusRequest = (state: RootState) =>
  state.framework.updateProjectStatusRequest;
export const selectAddProjectRequest = (state: RootState) => state.framework.addProjectRequest;
export const selectProject = (state: RootState) => state.framework.project;
export const selectProjectRequest = (state: RootState) => state.framework.getProjectRequest;
export const selectReviewers = (state: RootState) => state.framework.reviewers;
export const selectGetReviewersRequest = (state: RootState) => state.framework.getReviewersRequest;
export const selectEmployee = (state: RootState) => state.framework.selectedEmployee;
export const selectEmployeeByIdRequest = (state: RootState) => state.framework.getEmployeeByIdRequest;
export const selectAddEmployeeRequest = (state: RootState) => state.framework.addEmployeeRequest;
export const selectAddRoleRequest = (state: RootState) => state.framework.addRoleRequest;
export const selectDeleteSubProjectRequest = (state: RootState) => state.framework.deleteSubProjectRequest;
export const selectAddSubProjectRequest = (state: RootState) => state.framework.addSubProjectRequest;
export const selectUpdateProjectRequest = (state: RootState) => state.framework.updateProjectRequest;
export const selectRemoveEmployeeRequest = (state: RootState) => state.framework.removeEmployeeRequest;
export const selectReactivateEmployeeRequest = (state: RootState) =>
  state.framework.reactivateEmployeeRequest;
export const selectContributorTimesheets = (state: RootState) => state.framework.contributorTimesheets;
export const selectEditRoleRequest = (state: RootState) => state.framework.editRoleRequest;
