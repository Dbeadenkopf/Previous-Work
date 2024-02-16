import {NextFunction, Request, Response} from 'express';

/* istanbul ignore file */
const catchAsync =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) =>
    fn(req, res, next).catch(next);

export default catchAsync;
