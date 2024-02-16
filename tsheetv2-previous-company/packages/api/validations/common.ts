import Joi from 'joi';

const mongoObjectIDRegex = /^[a-fA-F0-9]{24}$/;
export const objectId = Joi.string().regex(mongoObjectIDRegex);

export const timesheetStatus = Joi.string().valid('submitted', 'approved', 'rejected', 'unapproved');
export const invalidTimesheetID = 'Timesheet ID is invalid';

export const invalidUserID = 'User ID is invalid';

export const projectStatus = Joi.string().valid('archived', 'active');
export const invalidProjectID = 'Project ID is invalid';

export const invalidNotificationId = 'Notification ID is invalid';
