import Timesheet from '../../mongoose/models/timesheet';
import Users from '../../mongoose/models/user';

const addNewTimesheet = async () => {
  const userIds = await Users.find({firstName: {$ne: 'Scheduler'}}, '_id');

  const nextMonday = new Date();
  nextMonday.setUTCDate(nextMonday.getDate() + ((1 + 7 - nextMonday.getDay()) % 7));
  nextMonday.setUTCHours(0, 0, 0, 0);
  nextMonday.toISOString();

  const newTimesheet = {
    created: {},
    submittedHours: 0,
    time: {
      fri: {
        hours: [],
      },
      mon: {
        hours: [],
      },
      sat: {
        hours: [],
      },
      sun: {
        hours: [],
      },
      thu: {
        hours: [],
      },
      tue: {
        hours: [],
      },
      wed: {
        hours: [],
      },
    },
    weekOf: new Date(nextMonday),
  };

  userIds.forEach(async (userId) => {
    await Timesheet.updateOne(
      {'created.user': userId, weekOf: nextMonday},
      {$setOnInsert: {...newTimesheet, created: {date: new Date(), ip: '0.0.0.0', user: userId}}},
      {upsert: true}
    );
  });
};

export default addNewTimesheet;
