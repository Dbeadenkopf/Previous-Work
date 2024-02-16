import {NextFunction, Request, Response} from 'express';
import {ValidationError} from 'joi';
import {JsonWebTokenError} from 'jsonwebtoken';
import {MongoServerError} from 'mongodb';
import {Error as MongooseError} from 'mongoose';

import errors, {APIError, APIErrorMessage} from '../errors';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  const {code, message} =
    err instanceof APIError
      ? err
      : err instanceof JsonWebTokenError
      ? errors.INVALID_CREDENTIALS
      : err instanceof MongooseError || err instanceof MongoServerError
      ? new APIError(400, err.message as APIErrorMessage)
      : err instanceof ValidationError
      ? new APIError(422, err.details[0].message as APIErrorMessage)
      : errors.INTERNAL_SERVER_ERR;
  res.status(code).json({message});
};

export default errorHandler;
