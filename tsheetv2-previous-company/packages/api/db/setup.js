/* eslint-disable no-undef */

db = db.getSiblingDB('timesheetDB');

db.createUser({
  user: 'timesheetRead',
  pwd: 'iamatimesheetreader',
  roles: [
    {
      role: 'read',
      db: 'timesheetDB',
    },
  ],
});

db.createUser({
  user: 'timesheetWrite',
  pwd: 'iamatimesheetwriter',
  roles: [
    {
      role: 'readWrite',
      db: 'timesheetDB',
    },
  ],
});
