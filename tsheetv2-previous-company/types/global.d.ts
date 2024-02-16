import {MongoMemoryServer} from 'mongodb-memory-server';

declare global {
  // eslint-disable-next-line no-var
  var TIMESHEET_TEST_DB: MongoMemoryServer;
  interface Window {
    TIMESHEET_API_URL: string;
    TIMESHEET_OAUTH2_CLIENT_ID: string;
  }
}
