const days: (keyof Schemas.Time)[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

/* istanbul ignore next */
export const getTotalDayHours = (day: Schemas.Day, projectID?: string): number => {
  let totalMs = 0;

  day.hours.forEach((h) => {
    if ((!projectID || h.project.label === projectID) && h.project.label !== 'Break') {
      totalMs += new Date(h.end).getTime() - new Date(h.start).getTime();
    }
  });

  const totalMin = Math.round(totalMs / 60000);
  const totalHrs = totalMin / 60;

  return totalHrs;
};

export const getTotalWeekHours = (week: Schemas.Time, projectID?: string): number => {
  let hours = 0;

  days.forEach((d) => {
    hours += getTotalDayHours(week[d], projectID);
  });

  return hours;
};
