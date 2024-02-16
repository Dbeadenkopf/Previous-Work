import Joi from 'joi';

export const tickets_get = {
  query: Joi.object({
    projectLabel: Joi.string().required(),
  }),
};
