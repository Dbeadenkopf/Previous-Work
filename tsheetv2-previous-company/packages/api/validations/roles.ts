import Joi from 'joi';

import {invalidUserID, objectId} from './common';

export const roles_put = {
  body: Joi.object({
    roleId: objectId.message('roleId is invalid'),
    userId: objectId.message(invalidUserID).required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    permissions: Joi.array().required(),
  }),
};

export const roles_remove = {
  params: Joi.object({
    id: objectId.message('RoleId is invalid').required(),
  }),
};
