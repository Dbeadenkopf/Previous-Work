import getTimeDiff from '@util/getTimeDiff';

const days: (keyof Schemas.Time)[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

/* istanbul ignore next */
export const getTotalDayHours = (day: Schemas.Day, projectID?: string): number => {
  let total = 0;

  day.hours.forEach((h) => {
    if ((!projectID || h.project.label === projectID) && h.project.label !== 'Break') {
      total += getTimeDiff(h.start, h.end);
    }
  });

  return total;
};

export const getTotalWeekHours = (week: Schemas.Time, projectID?: string): number => {
  let total = 0;

  days.forEach((d) => {
    total += getTotalDayHours(week[d], projectID);
  });

  return total;
};
