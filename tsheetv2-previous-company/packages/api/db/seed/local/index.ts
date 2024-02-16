/* eslint-disable no-console */
import mongoose from 'mongoose';

import Project from '../../../mongoose/models/project';
import Role from '../../../mongoose/models/role';
import Timesheet from '../../../mongoose/models/timesheet';
import User from '../../../mongoose/models/user';
import projectSeed from '../shared/projectSeed';
import roleSeed from '../shared/roleSeed';

import {userIds} from './ids';
import timesheetSeed from './timesheetSeed';
import userSeed from './userSeed';

mongoose
  .connect(process.env.TIMESHEET_DB_URI as string, {
    user: process.env.TIMESHEET_DB_USER,
    pass: process.env.TIMESHEET_DB_PASS,
  })
  .catch((err) => console.log(err));

mongoose.connection.once('connected', async () => {
  console.log('\x1b[36m%s\x1b[0m', 'Connected to mongo');
  try {
    // Remove all documents before seeding
    await Project.deleteMany();
    await Role.deleteMany();
    await Timesheet.deleteMany();
    await User.deleteMany();

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

    console.log('\x1b[32m%s\x1b[0m', 'Successfully seeded Projects');

    for (const role of roleSeed) {
      await role.save();
    }

    console.log('\x1b[32m%s\x1b[0m', 'Successfully seeded Roles');

    for (const timesheet of timesheetSeed) {
      await timesheet.save();
    }

    console.log('\x1b[32m%s\x1b[0m', 'Successfully seeded Timesheets');

    for (const user of userSeed) {
      await user.save();
    }

    console.log('\x1b[32m%s\x1b[0m', 'Successfully seeded Users');

    // Disconnect
    await mongoose.disconnect();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
});

mongoose.connection.once('disconnected', () => {
  console.log('\x1b[36m%s\x1b[0m', 'Disconnected from mongo');
});
