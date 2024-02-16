import {MongoMemoryServer} from 'mongodb-memory-server';

const globalSetup = async () => {
  const instance = await MongoMemoryServer.create();
  global.TIMESHEET_TEST_DB = instance;
  process.env.TIMESHEET_TEST_DB_URI = instance.getUri();
};

export default globalSetup;
