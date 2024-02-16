import User from '../../../mongoose/models/user';
import {prevWeekStart} from '../shared/dates';
import {roleIds} from '../shared/ids';
import scheduler, {notifications} from '../shared/userSeed';

import {userIds} from './ids';

const userSeed = [
  scheduler,
  new User({
    _id: userIds.peter,
    approver: userIds.peter,
    created: {
      date: prevWeekStart,
      ip: '0.0.0.0',
      user: userIds.peter,
    },
    email: 'peter@t1cg.com',
    firstName: 'Peter',
    lastName: 'Um',
    roles: [
      roleIds.timesheetWriter,
      roleIds.reviewWriter,
      roleIds.employeeWriter,
      roleIds.projectWriter,
      roleIds.roleWriter,
      roleIds.reportReader,
    ],
    title: 'Admin',
    supervisor: userIds.peter,
    notifications,
    timezone: 'America/New_York',
  }),
  new User({
    _id: userIds.jesse,
    approver: userIds.peter,
    created: {
      date: prevWeekStart,
      ip: '0.0.0.0',
      user: userIds.peter,
    },
    email: 'jesse.toula@t1cg.com',
    firstName: 'Jesse',
    lastName: 'Toula',
    roles: [roleIds.timesheetWriter, roleIds.reviewWriter, roleIds.employeeReader, roleIds.projectWriter],
    title: 'Manager',
    supervisor: userIds.peter,
    notifications,
    timezone: 'America/New_York',
  }),
  new User({
    _id: userIds.dicky,
    approver: userIds.peter,
    created: {
      date: prevWeekStart,
      ip: '0.0.0.0',
      user: userIds.peter,
    },
    email: 'nicholas.galantowicz@t1cg.com',
    firstName: 'Nicholas',
    lastName: 'Galantowicz',
    roles: [roleIds.timesheetWriter, roleIds.reviewWriter, roleIds.employeeReader, roleIds.projectWriter],
    title: 'Senior Manager',
    supervisor: userIds.peter,
    notifications,
    timezone: 'America/New_York',
  }),
  new User({
    _id: userIds.ikem,
    approver: userIds.peter,
    created: {
      date: prevWeekStart,
      ip: '0.0.0.0',
      user: userIds.peter,
    },
    email: 'chukwubuikem.okafo@t1cg.com',
    firstName: 'Chukwubuikem',
    lastName: 'Okafo',
    roles: [roleIds.timesheetWriter, roleIds.reviewWriter, roleIds.employeeReader],
    title: 'Lead Technical Analyst / Consultant',
    supervisor: userIds.peter,
    notifications,
    timezone: 'America/New_York',
  }),
  new User({
    _id: userIds.kristine,
    approver: userIds.peter,
    created: {
      date: prevWeekStart,
      ip: '0.0.0.0',
      user: userIds.peter,
    },
    email: 'kristine.petty@t1cg.com',
    firstName: 'Kristine',
    lastName: 'Petty',
    roles: [roleIds.timesheetWriter],
    title: 'Business Analyst',
    supervisor: userIds.peter,
    notifications,
    timezone: 'America/New_York',
  }),
  new User({
    _id: userIds.steve,
    approver: userIds.dicky,
    created: {
      date: prevWeekStart,
      ip: '0.0.0.0',
      user: userIds.dicky,
    },
    email: 'steve.flint@t1cg.com',
    firstName: 'Steve',
    lastName: 'Flint',
    roles: [roleIds.timesheetWriter, roleIds.reviewWriter, roleIds.employeeReader],
    title: 'Lead Technical Analyst / Consultant',
    supervisor: userIds.dicky,
    notifications,
    timezone: 'America/New_York',
  }),
  new User({
    _id: userIds.david,
    approver: userIds.steve,
    created: {
      date: prevWeekStart,
      ip: '0.0.0.0',
      user: userIds.steve,
    },
    email: 'david.beadenkopf@t1cg.com',
    firstName: 'David',
    lastName: 'Beadenkopf',
    roles: [roleIds.timesheetWriter],
    title: 'Junior Programmer Analyst',
    supervisor: userIds.steve,
    notifications,
    timezone: 'America/New_York',
  }),
  new User({
    _id: userIds.sui,
    approver: userIds.steve,
    created: {
      date: prevWeekStart,
      ip: '0.0.0.0',
      user: userIds.steve,
    },
    email: 'sui.san@t1cg.com',
    firstName: 'Sui',
    lastName: 'San',
    roles: [roleIds.timesheetWriter],
    title: 'Junior Programmer Analyst',
    supervisor: userIds.steve,
    notifications,
    timezone: 'America/New_York',
  }),
  new User({
    _id: userIds.ryan,
    approver: userIds.steve,
    created: {
      date: prevWeekStart,
      ip: '0.0.0.0',
      user: userIds.steve,
    },
    email: 'ryan.jaffey@t1cg.com',
    firstName: 'Ryan',
    lastName: 'Jaffey',
    roles: [roleIds.timesheetWriter],
    title: 'Intern Junior Programmer',
    supervisor: userIds.steve,
    notifications,
    timezone: 'America/New_York',
  }),
  new User({
    _id: userIds.cara,
    approver: userIds.dicky,
    created: {
      date: prevWeekStart,
      ip: '0.0.0.0',
      user: userIds.dicky,
    },
    email: 'cara.sunberg@t1cg.com',
    firstName: 'Cara',
    lastName: 'Sunberg',
    roles: [roleIds.timesheetWriter, roleIds.reviewWriter, roleIds.employeeReader],
    title: 'Senior Technical Analyst / Consultant',
    supervisor: userIds.dicky,
    notifications,
    timezone: 'America/New_York',
  }),
  new User({
    _id: userIds.rohan,
    approver: userIds.cara,
    created: {
      date: prevWeekStart,
      ip: '0.0.0.0',
      user: userIds.cara,
    },
    email: 'rohan.more@t1cg.com',
    firstName: 'Rohan',
    lastName: 'More',
    roles: [roleIds.timesheetWriter],
    title: 'Technical Analyst / DevSecOps',
    supervisor: userIds.cara,
    notifications,
    timezone: 'America/New_York',
  }),
  new User({
    _id: userIds.franklin,
    approver: userIds.cara,
    created: {
      date: prevWeekStart,
      ip: '0.0.0.0',
      user: userIds.cara,
    },
    email: 'franklin.wisseh@t1cg.com',
    firstName: 'Franklin',
    lastName: 'Wisseh',
    roles: [roleIds.timesheetWriter],
    title: 'Lead Technical Analyst / Consultant',
    supervisor: userIds.cara,
    notifications,
    timezone: 'America/New_York',
  }),
  new User({
    _id: userIds.yeram,
    approver: userIds.cara,
    created: {
      date: prevWeekStart,
      ip: '0.0.0.0',
      user: userIds.cara,
    },
    email: 'yeram.yoon@t1cg.com',
    firstName: 'Yeram',
    lastName: 'Yoon',
    roles: [roleIds.timesheetWriter],
    title: 'Junior Programmer Analyst',
    supervisor: userIds.cara,
    notifications,
    timezone: 'America/New_York',
  }),
  new User({
    _id: userIds.jackson,
    approver: userIds.ikem,
    created: {
      date: prevWeekStart,
      ip: '0.0.0.0',
      user: userIds.ikem,
    },
    email: 'jackson.styer@t1cg.com',
    firstName: 'Jackson',
    lastName: 'Styer',
    roles: [roleIds.timesheetWriter],
    title: 'Junior Programmer Analyst',
    supervisor: userIds.ikem,
    notifications,
    timezone: 'America/New_York',
  }),
  new User({
    _id: userIds.phillip,
    approver: userIds.jesse,
    created: {
      date: prevWeekStart,
      ip: '0.0.0.0',
      user: userIds.jesse,
    },
    email: 'phillip.shebel@t1cg.com',
    firstName: 'Phillip',
    lastName: 'Shebel',
    roles: [roleIds.timesheetWriter, roleIds.reviewWriter, roleIds.employeeReader],
    title: 'Senior Technical Analyst / Consultant',
    supervisor: userIds.jesse,
    notifications,
    timezone: 'America/New_York',
  }),
  new User({
    _id: userIds.collin,
    approver: userIds.jesse,
    created: {
      date: prevWeekStart,
      ip: '0.0.0.0',
      user: userIds.jesse,
    },
    email: 'collin.woodruff@t1cg.com',
    firstName: 'Collin',
    lastName: 'Woodruff',
    roles: [roleIds.timesheetWriter, roleIds.reviewWriter, roleIds.employeeReader],
    title: 'Senior Technical Analyst / Consultant',
    supervisor: userIds.jesse,
    notifications,
    timezone: 'America/New_York',
  }),
  new User({
    _id: userIds.drew,
    approver: userIds.phillip,
    created: {
      date: prevWeekStart,
      ip: '0.0.0.0',
      user: userIds.phillip,
    },
    email: 'andrew.fleming@t1cg.com',
    firstName: 'Andrew',
    lastName: 'Fleming',
    roles: [roleIds.timesheetWriter],
    title: 'Junior Programmer Analyst',
    supervisor: userIds.phillip,
    notifications,
    timezone: 'America/New_York',
  }),
  new User({
    _id: userIds.zahra,
    approver: userIds.phillip,
    created: {
      date: prevWeekStart,
      ip: '0.0.0.0',
      user: userIds.phillip,
    },
    email: 'zahra.abdulwahab@t1cg.com',
    firstName: 'Zahra',
    lastName: 'Abdulwahab',
    roles: [roleIds.timesheetWriter],
    title: 'Junior Programmer Analyst',
    supervisor: userIds.phillip,
    notifications,
    timezone: 'America/New_York',
  }),
  new User({
    _id: userIds.aaron,
    approver: userIds.collin,
    created: {
      date: prevWeekStart,
      ip: '0.0.0.0',
      user: userIds.collin,
    },
    email: 'aaron.gray@t1cg.com',
    firstName: 'Aaron',
    lastName: 'Gray',
    roles: [roleIds.timesheetWriter],
    title: 'Technical Analyst / Consultant',
    supervisor: userIds.collin,
    notifications,
    timezone: 'America/New_York',
  }),
  new User({
    _id: userIds.samuel,
    approver: userIds.collin,
    created: {
      date: prevWeekStart,
      ip: '0.0.0.0',
      user: userIds.collin,
    },
    email: 'samuel.routt@t1cg.com',
    firstName: 'Samuel',
    lastName: 'Routt',
    roles: [roleIds.timesheetWriter],
    title: 'Technical Analyst / Consultant',
    supervisor: userIds.collin,
    notifications,
    timezone: 'America/New_York',
  }),
  new User({
    _id: userIds.xiu,
    approver: userIds.collin,
    created: {
      date: prevWeekStart,
      ip: '0.0.0.0',
      user: userIds.collin,
    },
    email: 'xiu.wang@t1cg.com',
    firstName: 'Xiu',
    lastName: 'Wang',
    roles: [roleIds.timesheetWriter],
    title: 'Technical Analyst / Consultant',
    supervisor: userIds.collin,
    notifications,
    timezone: 'America/New_York',
  }),
  new User({
    _id: userIds.leonardo,
    approver: userIds.steve,
    created: {
      date: prevWeekStart,
      ip: '0.0.0.0',
      user: userIds.steve,
    },
    email: 'leonardo.conroy@t1cg.com',
    firstName: 'Leonardo',
    lastName: 'Conroy',
    roles: [roleIds.timesheetWriter],
    title: 'Intern Junior Programmer',
    supervisor: userIds.steve,
    notifications,
    timezone: 'America/New_York',
  }),
  new User({
    _id: userIds.nick,
    approver: userIds.peter,
    created: {
      date: prevWeekStart,
      ip: '0.0.0.0',
      user: userIds.peter,
    },
    email: 'nicholas.schleicher@t1cg.com',
    firstName: 'Nicholas',
    lastName: 'Schleicher',
    roles: [roleIds.timesheetWriter, roleIds.reviewWriter, roleIds.employeeReader, roleIds.projectWriter],
    title: 'Manager',
    supervisor: userIds.peter,
    notifications,
    timezone: 'America/New_York',
  }),
];

export default userSeed;
