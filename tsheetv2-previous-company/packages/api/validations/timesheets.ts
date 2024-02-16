import Joi from 'joi';

import {invalidTimesheetID, invalidUserID, objectId, timesheetStatus} from './common';

export const timesheets_id_get = {
  params: Joi.object({id: objectId.message(invalidTimesheetID)}),
};

export const timesheets_id_comment_put = {
  params: Joi.object({
    id: objectId.message(invalidTimesheetID),
  }),
  body: Joi.object({
    userId: objectId.message(invalidUserID).required(),
    comment: Joi.string().min(2).required(),
  }),
};

export const timesheets_id_status_put = {
  params: Joi.object({
    id: objectId.message(invalidTimesheetID),
    status: timesheetStatus,
  }),
  body: Joi.object({
    userId: objectId.message(invalidUserID).required(),
  }),
};

export const timesheets_get = {
  query: Joi.object({
    createdBy: Joi.string(),
    weekOf: [Joi.string(), Joi.array()],
    status: timesheetStatus,
    approvedBy: objectId.message('Approver ID is invalid'),
    projectLabel: Joi.string(),
    date: Joi.string(),
    dayName: Joi.string(),
  }),
};

export const timesheets_put = {
  body: Joi.object({
    timesheet: Joi.object().required(),
    userId: objectId.message(invalidUserID).required(),
  }),
};

export const timesheets_id_time_day_submitted_put = {
  params: Joi.object({
    id: objectId.message(invalidTimesheetID),
    day: Joi.string().valid('mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'),
  }),
  body: Joi.object({
    userId: objectId.message(invalidUserID).required(),
  }),
};
