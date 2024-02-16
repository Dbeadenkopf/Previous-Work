import Joi from 'joi';

import {invalidProjectID, invalidUserID, objectId, projectStatus} from './common';

export const projects_put = {
  body: Joi.object({
    projectId: Joi.string(),
    userId: objectId.message(invalidUserID).required(),
    label: Joi.string().required(),
    name: Joi.string().required(),
    lead: Joi.string().required(),
  }),
};

export const projects_id_status_put = {
  params: Joi.object({
    id: objectId.message(invalidProjectID),
    status: projectStatus,
  }),
  body: Joi.object({
    userId: objectId.message(invalidUserID).required(),
  }),
};

export const projects_id_put = {
  params: Joi.object({
    id: objectId.message(invalidProjectID),
  }),
  body: Joi.object({
    userId: objectId.message(invalidUserID).required(),
    name: Joi.string(),
    label: Joi.string(),
    lead: objectId.message(invalidUserID),
  }),
};
