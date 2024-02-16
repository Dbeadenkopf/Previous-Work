import mongoose from 'mongoose';
import {cancelJob, scheduledJobs} from 'node-schedule';

import {userIds} from '../db/seed/local/ids';
import timesheetSeed from '../db/seed/local/timesheetSeed';
import userSeed from '../db/seed/local/userSeed';
import projectSeed from '../db/seed/shared/projectSeed';
import roleSeed from '../db/seed/shared/roleSeed';

beforeAll(async () => {
  await mongoose.connect(process.env.TIMESHEET_TEST_DB_URI as string);

  const {adam} = userIds;

  for (const project of projectSeed({
    aaron: adam,
    dicky: adam,
    jesse: adam,
    peter: adam,
    phillip: adam,
  })) {
    await project.save();
  }

  for (const role of roleSeed) {
    await role.save();
  }

  for (const timesheet of timesheetSeed) {
    await timesheet.save();
  }

  for (const user of userSeed) {
    await user.save();
  }
});

afterAll(async () => {
  for (const job in scheduledJobs) {
    cancelJob(job);
  }
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});
