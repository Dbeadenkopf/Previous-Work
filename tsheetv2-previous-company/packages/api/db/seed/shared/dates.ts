import getCurrentWeekStart from '../../../util/getCurrentWeekStart';

export const currentWeekStart = getCurrentWeekStart();

export const prevWeekStart = new Date(
  new Date(currentWeekStart).setUTCDate(currentWeekStart.getUTCDate() - 7)
);

export const twoWeeksAgoStart = new Date(
  new Date(currentWeekStart).setUTCDate(currentWeekStart.getUTCDate() - 14)
);

interface Day {
  start: Date;
  end: Date;
}

// assumes weekStart is a monday
const createWeek = (weekStart: Date) => {
  let week = {} as {monday: Day; tuesday: Day; wednesday: Day; thursday: Day; friday: Day};
  ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].forEach((day, i) => {
    const nextDay = new Date(new Date(weekStart).setUTCDate(new Date(weekStart).getUTCDate() + i));
    week = {
      ...week,
      [day]: {
        start: new Date(nextDay.setUTCHours(13, 0, 0, 0)),
        end: new Date(nextDay.setUTCHours(21, 0, 0, 0)),
      },
    };
  });

  return week;
};

export const twoWeeksAgo = createWeek(twoWeeksAgoStart);

export const prevWeek = createWeek(prevWeekStart);

export const currentWeek = createWeek(currentWeekStart);
