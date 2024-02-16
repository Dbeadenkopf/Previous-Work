const getTimesheetStatus = (ts: Schemas.Timesheet) => {
  const {submitted, approved, rejected} = ts;

  if (submitted) {
    if (approved) {
      return 'Approved';
    }
    if (rejected && rejected.date > submitted.date) {
      return 'Rejected';
    }

    return 'Submitted';
  }

  return 'Unsubmitted';
};

export default getTimesheetStatus;
