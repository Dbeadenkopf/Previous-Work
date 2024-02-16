const getTimeDiff = (date1: Date | string, date2: Date | string) => {
  const duration = new Date(date2).getTime() - new Date(date1).getTime();

  return isNaN(duration) ? 0 : duration;
};
export default getTimeDiff;
