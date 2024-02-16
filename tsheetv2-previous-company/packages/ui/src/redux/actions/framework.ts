import {toast} from 'react-toastify';

import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import apiRequest, {BaseRoute, Method, QueryParams} from '@util/apiRequest';
import getCurrentMonday from '@util/getCurrentMonday';
import getPrevMonday from '@util/getPrevMonday';

import {RootState} from '../store';

export const getUsers = createAsyncThunk('framework/getUsers', async () => {
  const response = await apiRequest<{users: Schemas.User[]}>(BaseRoute.USERS, ``, {
    method: Method.GET,
  });

  const {data, error} = response;

  if (error) {
    throw error;
  }

  return data.users;
});

export const getArchivedUsers = createAsyncThunk('framework/getArchivedUsers', async () => {
  const response = await apiRequest<{users: Schemas.User[]}>(BaseRoute.USERS, ``, {
    method: Method.GET,
    queryParams: {
      status: 'removed',
    },
  });

  const {data, error} = response;

  if (error) {
    throw error;
  }

  return data.users;
});

export const getSupervisees = createAsyncThunk('framework/getSupervisees', async (supervisor: string) => {
  const response = await apiRequest<{users: Schemas.User[]}>(BaseRoute.USERS, `/`, {
    method: Method.GET,
    queryParams: {
      supervisor,
    },
  });

  const {data, error} = response;

  if (error) {
    throw error;
  }

  return data.users;
});

export const getReviewers = createAsyncThunk('framework/getReviewers', async () => {
  const response = await apiRequest<{users: Schemas.User[]}>(BaseRoute.USERS, '', {
    method: Method.GET,
  });

  const {data, error} = response;

  if (error) {
    throw error;
  }

  return data.users.filter((u) => u.roles.some((r) => r.name === 'Timesheet Reviewer'));
});

export const getRoles = createAsyncThunk('framework/getRoles', async () => {
  const response = await apiRequest<{roles: Schemas.Role[]}>(BaseRoute.ROLES, '', {
    method: Method.GET,
  });

  const {data, error} = response;

  if (error) {
    throw error;
  }

  return data.roles;
});

export const getProjects = createAsyncThunk('framework/getProjects', async () => {
  const res = await apiRequest<{projects: Schemas.Project[]}>(BaseRoute.PROJECTS, '', {
    method: Method.GET,
  });

  const {data, error} = res;

  if (error) {
    throw error;
  }

  return data.projects;
});

export const getEmployeeById = createAsyncThunk('framework/getEmployeeById', async (userId: string) => {
  const response = await apiRequest<Schemas.User>(BaseRoute.USERS, `/${userId}`, {
    method: Method.GET,
  });

  const {data, error} = response;

  if (error) {
    throw error;
  }

  return data;
});

export const addProject = createAsyncThunk<
  Schemas.Project,
  {name: string; label: string; lead: string; projectId?: string},
  {state: RootState}
>('framework/addProject', async ({name, label, lead, projectId}) => {
  const response = await apiRequest<Schemas.Project>(BaseRoute.PROJECTS, '', {
    method: Method.PUT,
    body: {name, label, lead, projectId},
  });

  const {data, error} = response;

  if (error) {
    toast.error(error.message);
    throw error;
  }

  toast.success('Successfully added project');
  return data;
});

export const updateProject = createAsyncThunk<Schemas.Project, {projectId: string; lead: string}>(
  'framework/updateProject',
  async ({projectId, lead}) => {
    const {data, error} = await apiRequest<Schemas.Project>(BaseRoute.PROJECTS, `/${projectId}`, {
      method: Method.PUT,
      body: {
        lead,
      },
    });

    if (error) {
      toast.error(error.message);
      throw error;
    }

    toast.success('Successfully updated project');
    return data;
  }
);

export const getProject = createAsyncThunk('framework/getProject', async (projectId: string) => {
  const res = await apiRequest<Schemas.Project>(BaseRoute.PROJECTS, `/${projectId}`, {
    method: Method.GET,
  });

  const {data, error} = res;
  const subProjects = data?.subProjects?.sort((objA, objB) => objA.label.localeCompare(objB.label));

  if (error) {
    toast.error(error.message);
    throw error;
  }

  return {...data, subProjects: subProjects};
});

export const addEmployee = createAsyncThunk(
  'framework/register',
  async (request: {first: string; last: string; title: string; email: string; supervisor: string}) => {
    const {first, last, title, email, supervisor} = request;

    const response = await apiRequest<Schemas.User>(BaseRoute.USERS, '/register', {
      method: Method.POST,
      body: {
        first,
        last,
        title,
        email,
        supervisor,
      },
    });

    const {data, error} = response;

    if (error) {
      const {message} = error;
      toast.error(message);
      throw error;
    }

    toast.success(`User successfully added`);

    return data;
  }
);

export const updateProjectStatus = createAsyncThunk(
  'framework/updateProjectStatus',
  async ({projectId, userId, status}: {projectId: string; userId: string; status: 'archived' | 'active'}) => {
    const response = await apiRequest<Schemas.Project>(BaseRoute.PROJECTS, `/${projectId}/${status}`, {
      method: Method.PUT,
      body: {
        userId,
      },
    });

    const {data, error} = response;

    if (error) {
      toast.error(error.message);
      throw error;
    }

    toast.success(`Project ${status === 'archived' ? 'archived' : 'activated'}`);
    return data;
  }
);

export const resetUpdateProjectStatus = createAction('framework/resetUpdateProjectStatus');

export const addSubProject = createAsyncThunk(
  'framework/addSubProject',
  async ({
    projectId,
    subLabel,
    subName,
    action,
  }: {
    projectId: string;
    subLabel: string;
    subName: string;
    action: string;
  }) => {
    const response = await apiRequest<Schemas.Project>(BaseRoute.PROJECTS, `/${projectId}/subprojects`, {
      method: Method.PUT,
      body: {
        subLabel,
        subName,
        action,
      },
    });

    const {data, error} = response;

    if (error) {
      toast.error(error.message);
      throw error;
    }

    toast.success(`Subproject successfully added`);
    return data;
  }
);

export const deleteSubProject = createAsyncThunk(
  'framework/deleteSubProject',
  async ({
    projectId,
    subLabel,
    subName,
    action,
  }: {
    projectId: string;
    subLabel: string;
    subName: string;
    action: string;
  }) => {
    const response = await apiRequest<Schemas.Project>(BaseRoute.PROJECTS, `/${projectId}/subprojects`, {
      method: Method.PUT,
      body: {
        subLabel,
        subName,
        action,
      },
    });

    const {data, error} = response;

    if (error) {
      toast.error(error.message);
      throw error;
    }

    toast.success(`Subproject successfully deleted`);
    return data;
  }
);

export const addRole = createAsyncThunk<
  Schemas.Role,
  {name: string; description: string; permissions: string[]; roleId?: string},
  {state: RootState}
>('framework/addRole', async ({name, description, permissions, roleId}) => {
  const response = await apiRequest<Schemas.Role>(BaseRoute.ROLES, '', {
    method: Method.PUT,
    body: {name, description, permissions, roleId},
  });

  const {data, error} = response;

  if (error) {
    toast.error(error.message);
    throw error;
  }

  toast.success('Successfully added role');
  return data;
});

export const deleteRole = createAsyncThunk('framework/deleteRole', async (roleId: string) => {
  const res = await apiRequest<Schemas.Role>(BaseRoute.ROLES, `/${roleId}`, {
    method: Method.DELETE,
  });

  const {error} = res;

  if (error) {
    toast.error(error.message);
    throw error;
  }

  toast.success('Successfully deleted role');
});

export const getContributorTimesheets = createAsyncThunk(
  'framework/getContributorTimesheets',
  async ({project, recent}: {project: string; recent: boolean}) => {
    let queryParams: QueryParams = {projectLabel: project};

    if (recent) {
      queryParams = {
        ...queryParams,
        weekOf: [
          new Date(getPrevMonday()).setUTCHours(0, 0, 0, 0).toString(),
          new Date(getCurrentMonday()).setUTCHours(0, 0, 0, 0).toString(),
        ],
      };
    }

    const res = await apiRequest<Schemas.Timesheet[]>(BaseRoute.TIMESHEETS, `/`, {
      method: Method.GET,
      queryParams,
    });

    const {data, error} = res;

    if (error) {
      throw error;
    }

    return data;
  }
);

export const removeEmployee = createAsyncThunk('framework/removeEmployee', async (userId: string) => {
  const response = await apiRequest<Schemas.User>(BaseRoute.USERS, `/${userId}/removed`, {
    method: Method.PUT,
  });

  const {error} = response;

  if (error) {
    toast.error(error.message);
    throw error;
  }

  toast.success('Successfully removed employee');
});

export const reactivateEmployee = createAsyncThunk('framework/reactivateEmployee', async (userId: string) => {
  const response = await apiRequest<Schemas.User>(BaseRoute.USERS, `/${userId}/removed`, {
    method: Method.PUT,
    queryParams: {
      status: 'active',
    },
  });

  const {error} = response;

  if (error) {
    toast.error(error.message);
    throw error;
  }

  toast.success('Successfully activated employee');
});

export const editEmployee = createAsyncThunk(
  'framework/editEmployee',
  async (request: {userId: string; title?: string; roles?: Schemas.Role[]}) => {
    const {userId, title, roles} = request;

    const response = await apiRequest<Schemas.User>(BaseRoute.USERS, `/${userId}`, {
      method: Method.PUT,
      body: {title, roles},
    });

    const {data, error} = response;

    if (error) {
      toast.error(error.message);
      throw error;
    }
    toast.success('Successfully updated user');
    return data;
  }
);

export const editRole = createAsyncThunk(
  'framework/editRole',
  async (request: {name: string; description: string; permissions: string[]; roleId?: string}) => {
    const response = await apiRequest<Schemas.Role>(BaseRoute.ROLES, '', {
      method: Method.PUT,
      body: request,
    });

    const {data, error} = response;

    if (error) {
      toast.error(error.message);
      throw error;
    }
    toast.success('Successfully updated user');
    return data;
  }
);

export const resetRemoveEmployeeRequest = createAction('framework/resetRemoveEmployeeRequest');
export const resetReactivateEmployeeRequest = createAction('framework/resetReactivateEmployeeRequest');
