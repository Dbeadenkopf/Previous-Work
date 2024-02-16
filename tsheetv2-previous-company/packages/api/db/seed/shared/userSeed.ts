import User from '../../../mongoose/models/user';
import {schedulerId} from '../../../util/job/scheduleJob';
import {prevWeekStart} from '../shared/dates';

export const notifications = {
  email: {
    submission: {on: true, time: {hour: '17', minute: '0', period: 'PM'}},
    approval: false,
    rejection: false,
    comment: false,
    approvalReminder: false,
    resubmission: false,
  },
  slack: {
    submission: {on: true, time: {hour: '17', minute: '0', period: 'PM'}},
    approval: false,
    rejection: false,
    comment: false,
    approvalReminder: false,
    resubmission: false,
  },
};

const scheduler = new User({
  _id: schedulerId,
  approver: schedulerId,
  created: {
    date: prevWeekStart,
    ip: '0.0.0.0',
    user: schedulerId,
  },
  email: '',
  firstName: 'Scheduler',
  lastName: '',
  roles: [],
  title: 'Scheduler',
  supervisor: schedulerId,
  notifications,
});

export default scheduler;
