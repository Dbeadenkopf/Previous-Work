const globalTeardown = async () => {
  await global.TIMESHEET_TEST_DB.stop();
};

export default globalTeardown;
