/* istanbul ignore file */
const getCurrentWeekStart = (timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone) => {
  const timeNow = new Date(new Date(new Date().toLocaleDateString('en-US', {timeZone})).setUTCHours(0));

  return new Date(
    new Date(timeNow).setUTCDate(
      timeNow.getUTCDate() - (timeNow.getUTCDay() + (!timeNow.getUTCDay() ? 6 : -1))
    )
  );
};

export default getCurrentWeekStart;
