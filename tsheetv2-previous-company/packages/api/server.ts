/* eslint-disable no-console */

import mongoose from 'mongoose';

import app from './app';
import Users from './mongoose/models/user';
import {runJob} from './util/job/scheduleJob';

// mongo connection
mongoose
  .connect(process.env.TIMESHEET_DB_URI as string, {
    user: process.env.TIMESHEET_DB_USER,
    pass: process.env.TIMESHEET_DB_PASS,
  })
  .catch((err) => console.log(err));
mongoose.connection.once('connected', async () => {
  console.log('\x1b[36mTimesheet app connected to mongo\x1b[0m');

  try {
    const rule = {dayOfWeek: 0, hour: 23, minute: 59, tz: 'US/Eastern'};

    // run weekly submit on sundays at 11:59pm
    // add empty timesheet for new week
    runJob({
      rule,
      jobName: 'submit-current-week-timesheets',
    });

    // run daily slack and email reminders to fill out timesheet
    for await (const u of Users.find()) {
      const slackSubNotification = u.notifications.slack.submission.on;
      const emailSubNotification = u.notifications.email.submission.on;
      const userName = u.firstName.toUpperCase() + '_' + u.lastName.toUpperCase();

      if (slackSubNotification && userName !== 'SCHEDULER_' && u.email) {
        runJob({
          rule: {
            minute: u.notifications.slack.submission.time.minute,
            dayOfWeek: [1, 2, 3, 4, 5],
            hour: u.notifications.slack.submission.time.hour,
            tz: u.timezone,
          },
          jobName: 'daily-submission-reminder-slack',
          userInfo: {id: u._id, email: u.email},
        });
      }
      if (emailSubNotification && userName !== 'SCHEDULER_' && u.email) {
        runJob({
          rule: {
            minute: u.notifications.email.submission.time.minute,
            dayOfWeek: [1, 2, 3, 4, 5],
            hour: u.notifications.email.submission.time.hour,
            tz: u.timezone,
          },
          jobName: 'daily-submission-reminder-email',
          userInfo: {id: u._id, email: u.email},
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
});
mongoose.connection.on('error', (err) => console.log(err));

const port = 2001;
app.listen(port, () => {
  console.log(`Timesheet app listening on port ${port}`);
});
