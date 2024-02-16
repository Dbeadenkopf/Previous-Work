const filterSlots = (timesheet: Schemas.Timesheet, projects?: string[]) => {
  let time = timesheet.time;
  const days: (keyof Schemas.Time)[] = ['fri', 'mon', 'sat', 'sun', 'thu', 'tue', 'wed'];

  days.forEach((day) => {
    let hours = time[day].hours.filter((timeslot) => timeslot.start && timeslot.end);

    if (projects) {
      hours = time[day].hours.filter((timeslot) => !projects.includes(timeslot.project.label));
    }

    time = {
      ...time,
      [day]: {
        ...time[day],
        hours,
      },
    };
  });

  return {...timesheet, time};
};

export default filterSlots;
