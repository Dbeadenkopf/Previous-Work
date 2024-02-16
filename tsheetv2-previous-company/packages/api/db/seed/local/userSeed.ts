import User from '../../../mongoose/models/user';
import {prevWeekStart} from '../shared/dates';
import {roleIds} from '../shared/ids';
import scheduler, {notifications} from '../shared/userSeed';

import {userIds} from './ids';

const userSeed = [
  scheduler,
  new User({
    _id: userIds.adam,
    approver: userIds.adam,
    created: {
      date: prevWeekStart,
      ip: '0.0.0.0',
      user: userIds.adam,
    },
    email: 'adam.admin@t1cg.com',
    firstName: 'Adam',
    lastName: 'Admin',
    roles: [
      roleIds.timesheetWriter,
      roleIds.reviewWriter,
      roleIds.employeeWriter,
      roleIds.projectWriter,
      roleIds.roleWriter,
      roleIds.reportReader,
    ],
    title: 'Admin',
    supervisor: userIds.adam,
    notifications,
    timezone: 'America/New_York',
  }),
  new User({
    _id: userIds.manny,
    approver: userIds.adam,
    created: {
      date: prevWeekStart,
      ip: '0.0.0.0',
      user: userIds.adam,
    },
    email: 'manny.manager@t1cg.com',
    firstName: 'Manny',
    lastName: 'Manager',
    roles: [roleIds.timesheetWriter, roleIds.reviewWriter, roleIds.employeeReader, roleIds.projectWriter],
    title: 'Manager',
    supervisor: userIds.adam,
    notifications,
    timezone: 'America/New_York',
  }),
  new User({
    _id: userIds.emily,
    approver: userIds.manny,
    created: {
      date: prevWeekStart,
      ip: '0.0.0.0',
      user: userIds.manny,
    },
    email: 'emily.employee@t1cg.com',
    firstName: 'Emily',
    lastName: 'Employee',
    roles: [roleIds.timesheetWriter],
    title: 'Junior Programmer Analyst',
    supervisor: userIds.manny,
    notifications,
    timezone: 'America/New_York',
  }),
];

export default userSeed;
