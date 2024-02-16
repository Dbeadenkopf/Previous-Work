import Joi from 'joi';

import {invalidNotificationId, invalidUserID, objectId} from './common';

export const users_get = {
  query: Joi.object({
    supervisor: objectId.message('Supervisor is invalid'),
    status: Joi.string().valid('removed'),
  }),
};

export const users_notifications_put = {
  body: Joi.object({
    notifications: Joi.object({
      email: Joi.object({
        submission: Joi.object({
          on: Joi.boolean(),
          time: Joi.object({
            hour: Joi.string(),
            minute: Joi.string(),
            period: Joi.string().valid('AM', 'PM', ''),
          }),
        }),
        approval: Joi.boolean(),
        rejection: Joi.boolean(),
        comment: Joi.boolean(),
        approvalReminder: Joi.boolean(),
        resubmission: Joi.boolean(),
      }).required(),
      slack: Joi.object({
        submission: Joi.object({
          on: Joi.boolean(),
          time: Joi.object({
            hour: Joi.string(),
            minute: Joi.string(),
            period: Joi.string().valid('AM', 'PM', ''),
          }),
        }),
        approval: Joi.boolean(),
        rejection: Joi.boolean(),
        comment: Joi.boolean(),
        approvalReminder: Joi.boolean(),
        resubmission: Joi.boolean(),
      }).required(),
    }),
    email: Joi.string(),
    userId: objectId.message(invalidUserID).required(),
    timezone: Joi.string(),
  }),
};

export const users_id_get = {
  params: Joi.object({id: objectId.message(invalidUserID)}),
};

export const users_login_post = {
  body: Joi.object({
    credential: Joi.string(),
  }),
};

export const users_remove = {
  params: Joi.object({
    id: objectId.message('UserId is invalid'),
    status: Joi.string().valid('removed', 'active'),
  }),
  body: Joi.object({
    userId: objectId.message(invalidUserID).required(),
  }),
};

export const users_put = {
  params: Joi.object({
    id: objectId.message(invalidUserID),
  }),
  body: Joi.object({
    title: Joi.string().allow(''),
    roles: Joi.array(),
    userId: objectId.message(invalidUserID).required(),
  }),
};

export const users_timezone_put = {
  body: Joi.object({
    notifications: Joi.object({
      email: Joi.object({
        submission: Joi.object({
          on: Joi.boolean(),
          time: Joi.object({
            hour: Joi.string(),
            minute: Joi.string(),
            period: Joi.string().valid('AM', 'PM', ''),
          }),
        }),
        approval: Joi.boolean(),
        rejection: Joi.boolean(),
        comment: Joi.boolean(),
        approvalReminder: Joi.boolean(),
        resubmission: Joi.boolean(),
      }).required(),
      slack: Joi.object({
        submission: Joi.object({
          on: Joi.boolean(),
          time: Joi.object({
            hour: Joi.string(),
            minute: Joi.string(),
            period: Joi.string().valid('AM', 'PM', ''),
          }),
        }),
        approval: Joi.boolean(),
        rejection: Joi.boolean(),
        comment: Joi.boolean(),
        approvalReminder: Joi.boolean(),
        resubmission: Joi.boolean(),
      }).required(),
      _id: objectId.message(invalidNotificationId),
    }),
    timezone: Joi.string().required(),
    userId: objectId.message(invalidUserID).required(),
  }),
};
