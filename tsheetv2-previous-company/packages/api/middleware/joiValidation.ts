import {NextFunction, Request, Response} from 'express';
import Joi from 'joi';

interface validationType {
  query?: Joi.ObjectSchema;
  body?: Joi.ObjectSchema;
  params?: Joi.ObjectSchema;
}

const joiValidation = (validations: validationType) => (req: Request, res: Response, next: NextFunction) => {
  for (const [key, value] of Object.entries(validations)) {
    const {error} = value.validate(req[key as keyof Request]);
    if (error) {
      return next(error);
    }
  }
  next();
};

export default joiValidation;
