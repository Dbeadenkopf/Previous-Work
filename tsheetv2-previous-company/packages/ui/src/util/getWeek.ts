const getWeek = (date = new Date()): Date[] => {
  const week: Date[] = [];

  /* istanbul ignore next */
  while (week.length !== 7) {
    week.push(
      new Date(date.setDate(date.getDate() - date.getDay() + week.length + 1 - (!date.getDay() ? 7 : 0)))
    );
  }

  return week;
};

export default getWeek;
