/* istanbul ignore file */
import {RecurrenceRule, RecurrenceSpecObjLit, scheduleJob, scheduledJobs} from 'node-schedule';

import Timesheet from '../../mongoose/models/timesheet';
import sendMail from '../email/sendEmail';
import getCurrentWeekStart from '../getCurrentWeekStart';
import {getTotalWeekHours} from '../getTotalHours';
import {getSlackIdByEmail, sendMessage} from '../slack';

import addNewTimesheet from './addNewTimesheet';

export const schedulerId = '63456f73b6cb1ec67db344dd';

export const runJob = ({
  rule,
  jobName,
  userInfo,
}: {
  rule: string | RecurrenceRule | RecurrenceSpecObjLit;
  jobName: string;
  userInfo?: {id: string; email: string};
}) => {
  const createMeta = () => ({
    date: new Date(),
    ip: '0.0.0.0',
    user: schedulerId,
  });

  switch (jobName) {
    case 'exampleJob':
      scheduleJob(jobName, rule, () => {
        // eslint-disable-next-line no-console
        console.log(`Hello World`);
      });

      break;
    case 'daily-submission-reminder-email':
      scheduleJob(`${userInfo?.id}-${jobName}`, rule, async () => {
        // daily email submission reminder
        if (userInfo?.email) {
          await sendMail({
            to: userInfo?.email,
            subject: 'Submit Hours Reminder',
            html: '<div><h1>REMINDER</h1><p>Submit your hours by the end of the day</p></div>',
          });
        } else {
          cancelJob(`${userInfo?.id}-${jobName}`);
        }
      });
      break;
    case 'submit-current-week-timesheets':
      scheduleJob(jobName, rule, async () => {
        const weekOf = getCurrentWeekStart('US/Eastern');

        for await (const ts of Timesheet.find({weekOf})) {
          const meta = createMeta();
          await ts.updateOne({submitted: meta, submittedHours: getTotalWeekHours(ts.time), updated: meta});
        }

        addNewTimesheet();
      });

      break;
    case 'daily-submission-reminder-slack':
      scheduleJob(`${userInfo?.id}-${jobName}`, rule, async () => {
        const slackId = await getSlackIdByEmail(userInfo?.email || '');
        if (slackId) {
          await sendMessage('REMINDER: Submit your hours by the end of the day.', slackId);
        } else {
          cancelJob(`${userInfo?.id}-${jobName}`);
        }
      });
      break;
    default:
      scheduleJob(jobName, rule, () => {
        // TODO
      });
      break;
  }
};

export const cancelJob = (jobName: string) => {
  if (scheduledJobs[jobName]) {
    scheduledJobs[jobName].cancel();
  }
};
