const validateTimeslots = (timeslots: Schemas.Timeslot[], projects: Schemas.Project[]) =>
  timeslots.reduce((acc, {start, end, project, ticket, manualTicketInput}, i, arr) => {
    const projectLabel = project.label;
    const subProjectLabel = project.subProject?.label;

    if (!i && !start && !end && !projectLabel) {
      return 'Timeslot is empty.';
    }

    if (!start && (end || projectLabel)) {
      return 'Please enter a start time.';
    }

    if (!end && start) {
      return 'Please enter an end time.';
    }

    if (start && end) {
      if (start >= end) {
        return 'Please enter a start time that is before the end time.';
      }

      if (arr.some((timeslot, j) => j !== i && timeslot.end > start && timeslot.start < end)) {
        return 'Timeslots contain overlapping times.';
      }

      if (!projectLabel) {
        return 'Please select a project.';
      }

      if (projects.some((p) => p.label === projectLabel && p.subProjects?.length && !subProjectLabel)) {
        return 'Please select a sub-project.';
      }

      if (!['AMS', 'Admin', 'ISP', 'Outing', 'Break', 'PTO'].includes(projectLabel) && !ticket) {
        return 'Please select a ticket.';
      }

      if (ticket === 'Other' && !manualTicketInput) {
        return "Please enter a description for 'Other'.";
      }
    }

    return acc;
  }, '');

export default validateTimeslots;
