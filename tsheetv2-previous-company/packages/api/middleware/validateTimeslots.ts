import {APIError, APIErrorMessage} from '../errors';
import Project from '../mongoose/models/project';
import Timesheet from '../mongoose/models/timesheet';
import catchAsync from '../util/catchAsync';

const validateTimeslots = catchAsync(async (req, res, next) => {
  const {id, day} = req.params;

  const timesheet = await Timesheet.findById(id);

  if (timesheet) {
    const projects = await Project.find();
    const startEndTimes: Date[][] = [];
    const timeslots = timesheet.time[day as keyof Schemas.Time].hours;

    if (!timeslots.length) {
      next(new APIError(400, APIErrorMessage.TIMESLOT_EMPTY));
    }

    timeslots.map((timeslot) => {
      const startTime = new Date(timeslot.start);
      const endTime = new Date(timeslot.end);

      const project = timeslot.project.label;
      const subProject = timeslot.project.subProject?.label;
      const ticket = timeslot.ticket;
      const otherInput = timeslot.manualTicketInput;

      startTime && endTime && startEndTimes.push([startTime, endTime]);

      if (!startTime.getTime() && (endTime.getTime() || project)) {
        next(new APIError(400, APIErrorMessage.START_TIME_NOT_ENTERED));
      }

      if (!endTime.getTime() && startTime.getTime()) {
        next(new APIError(400, APIErrorMessage.END_TIME_NOT_ENTERED));
      }

      if (startTime.getTime() >= endTime.getTime()) {
        next(new APIError(400, APIErrorMessage.START_TIME_ERROR));
      }

      if (timeslots.length > 1) {
        const prevTimes = startEndTimes.slice(0, -1);

        prevTimes.map((time) => {
          const prevStartTime = time[0];
          const prevEndTime = time[1];

          if (prevEndTime > startTime && prevStartTime < endTime) {
            next(new APIError(400, APIErrorMessage.OVERLAPPING_TIMES));
          }
        });
      }

      if (startTime.getTime() && endTime.getTime() && (project !== 'Break' || 'PTO')) {
        if (!project) {
          next(new APIError(400, APIErrorMessage.PROJECT_NOT_SELECTED));
        }

        projects.map((p) => {
          if (project === p.label && p.subProjects?.length && !subProject) {
            next(new APIError(400, APIErrorMessage.SUBPROJECT_NOT_SELECTED));
          }

          if (
            !['AMS', 'Admin', 'ISP', 'Outing', 'Break', 'PTO'].includes(p.label) &&
            ((project === p.label && p.subProjects?.length && subProject && !ticket) ||
              (project === p.label && !p.subProjects?.length && !ticket))
          ) {
            next(new APIError(400, APIErrorMessage.TICKET_NOT_SELECTED));
          }
        });

        if (ticket === 'Other' && !otherInput) {
          next(new APIError(400, APIErrorMessage.OTHER_NOT_ENTERED));
        }
      }
    });
  }

  next();
});

export default validateTimeslots;
