import Role from '../../../mongoose/models/role';

import {roleIds} from './ids';

const roleSeed = [
  new Role({
    _id: roleIds.timesheetWriter,
    name: 'Timesheet Writer',
    description: 'View and edit your own timesheet.',
    permissions: ['READ_TIMESHEET', 'WRITE_TIMESHEET'],
  }),
  new Role({
    _id: roleIds.reviewWriter,
    name: 'Review Writer',
    description: "View and review your direct report's timesheets.",
    permissions: ['READ_REVIEW', 'WRITE_REVIEW'],
  }),
  new Role({
    _id: roleIds.employeeReader,
    name: 'Employee Reader',
    description: 'View employee data.',
    permissions: ['READ_EMPLOYEE'],
  }),
  new Role({
    _id: roleIds.employeeWriter,
    name: 'Employee Writer',
    description: 'View and edit employees.',
    permissions: ['READ_EMPLOYEE', 'WRITE_EMPLOYEE'],
  }),
  new Role({
    _id: roleIds.projectWriter,
    name: 'Project Writer',
    description: 'View and edit projects.',
    permissions: ['READ_PROJECT', 'WRITE_PROJECT'],
  }),
  new Role({
    _id: roleIds.roleWriter,
    name: 'Role Writer',
    description: 'View and edit user roles.',
    permissions: ['READ_ROLE', 'WRITE_ROLE'],
  }),
  new Role({
    _id: roleIds.reportReader,
    name: 'Report Reader',
    description: 'View report data.',
    permissions: ['READ_REPORT'],
  }),
];

export default roleSeed;
