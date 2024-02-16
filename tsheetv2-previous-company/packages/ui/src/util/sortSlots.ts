const sortSlots = (timesheet: Schemas.Timesheet) => {
  let time = timesheet.time;
  const days: (keyof Schemas.Time)[] = ['fri', 'mon', 'sat', 'sun', 'thu', 'tue', 'wed'];

  days.forEach((day) => {
    time = {
      ...time,
      [day]: {
        ...time[day],
        hours: [...time[day].hours].sort(
          (objA, objB) => new Date(objA.start).getTime() - new Date(objB.start).getTime()
        ),
      },
    };
  });

  return {...timesheet, time};
};

export default sortSlots;
